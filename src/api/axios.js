import axios from "axios";
import { getCookie } from "./cookies.js";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use (
    (config) => {
        const csrfToken = getCookie("csrftoken");

        const authToken = localStorage.getItem("authToken") || getCookie("authToken");

        if(csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }

        if(authToken) {
            config.headers.Authorization = `Token ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 403 && error.response.data?.detail?.includes("CSRF")) {
            try {
                await axios.get("http://localhost:8000/api/users/csrf/token/", {
                    withCredentials: true
                });

                const newCsrfToken = getCookie("csrfToken");

                originalRequest.headers["X-CSRFToken"] = newCsrfToken;

                return api(originalRequest);
            } catch (csrfToken) {
                window.location.href = "/login";
                return Promise.reject(csrfToken);
            }
        }
        return Promise.reject(error);
    }
);

export default api;