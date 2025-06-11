import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const fields = [
  { label: "First Name", key: "firstName", editable: true },
  { label: "Last Name", key: "lastName", editable: true },
  { label: "Email Address", key: "email", editable: false },
  { label: "Contact Number", key: "contactNumber", editable: true },
];

const UserProfileSettings = () => {
  const { updateUserSettings } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const username = `${parsedUser.first_name} ${parsedUser.last_name}`;
        const userEmail = `${parsedUser.email}`;
        const contactNumber = `${parsedUser.contact_number}`;
        setName(username);
        setEmail(userEmail);
        setContact(contactNumber);

        setUserData({
          firstName: parsedUser.first_name || "",
          lastName: parsedUser.last_name || "",
          email: parsedUser.email || "",
          contactNumber: parsedUser.contact_number || "",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const openModal = (field) => {
    if (!field.editable) return;

    setCurrentField(field.key);
    setTempValue(userData[field.key]);
    setModalOpen(true);
  };

  const saveChange = () => {
    setUserData((prev) => ({ ...prev, [currentField]: tempValue }));
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    const result = await updateUserSettings(
      userData.firstName,
      userData.lastName,
      userData.contactNumber
    );

    if (result.success) {
      alert("Profile Updated!");
      navigate("/user-dashboard/");
    } else {
      alert("Failed to update profile.");
    }
  };

  const getDisplayValue = (fieldKey) => {
    switch (fieldKey) {
      case "firstName":
        return userData.firstName || "Not Set";
      case "lastName":
        return userData.lastName || "Not Set";
      case "email":
        return userData.email || "Not Set";
      case "contactNumber":
        return userData.contactNumber || "Not Set";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-main-white p-8">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="italic font-playfair-display font-bold text-[#162c5f] text-4xl md:text-5xl">Bookly</h1>
        <h1 className="font-playfair-display text-main-color text-xl md:text-2xl">Book wih Ease, Stay in Peace</h1>
      </div>
      <div className="flex items-start flex-col lg:flex-row justify-center gap-8 px-8 py-16 w-full">
        <div className="bg-secondary-white shadow-lg rounded-xl w-full lg:w-1/4 flex-col lg:flex-row flex items-center py-6 px-6">
          <div className="rounded-full bg-gray-400 w-32 h-32 mr-4"></div>
          <div className="text-left">
            <p className="font-medium font-quicksand">
              Display Name: <strong>{name}</strong>
            </p>
            <p className="font-medium font-quicksand">
              Email: <strong>{email}</strong>
            </p>
            <p className="font-medium font-quicksand">
              Phone: <strong>{contact}</strong>
            </p>
          </div>
        </div>

        <div className="w-full lg:max-w-screen-md bg-secondary-white shadow-lg rounded-xl p-6">
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex items-center justify-between border-b px-4 py-4 text-sm md:text-base"
            >
              <div className="flex flex-col">
                <span className="text-main-color font-quicksand font-medium">
                  {field.label}
                </span>
                <span className="font-medium text-base">
                  {getDisplayValue(field.key)}
                </span>
              </div>
              <button
                className={`text-black-900 font-medium ${
                  field.editable
                    ? "hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => openModal(field)}
              >
                {field.editable
                  ? userData[field.key]
                    ? "Edit"
                    : "Add"
                  : "Read only"}
              </button>
            </div>
          ))}

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/user-dashboard/")}
              className="flex-1 py-3 bg-teal-500 hover:bg-teal-400 font-quicksand text-white rounded-md transition-colors font-semibold"
            >
              Back
            </button>

            <button
              onClick={handleSaveChanges}
              className="flex-1 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors font-semibold font-quicksand"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Edit {currentField}</h2>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-400 font-quicksand text-main-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={saveChange}
                className="px-4 py-2 rounded bg-blue-900 font-quicksand text-main-white font-semibold hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSettings;
