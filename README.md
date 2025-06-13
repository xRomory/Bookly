# Bookly
Database Systems final project COM232 <br>

# Main Features
- Users can list their properties
- Users can book a room
- Real-time Maps Location
- Admin Dashboard can see every transaction, cancel bookings, or simply delete them.
- They also have access to property listing. Admins can delete a property
- Search Filter Function

# How to install:
- Make sure you have Node.js on your device
- Once installed, git clone this branch to your terminal: <br> git clone -b bookly-frontend https://github.com/xRomory/Bookly-CTFDBMSL.git
- Then, navigate to bookly directory. You can now install React packages: <br> npm install
- After installing you successfully installed this React project. <br> *NOTE: YOU STILL NEED TO INSTALL THE DEPENDENCIES, AND MAKE SURE YOU CLONE THE RIGHT BRANCH* <br>

# Dependencies used in this Project:
***Please take the time to read the documentations*** <br><br> **For tailwind, this is not required. I personally use it because it makes my styling faster. I provided two versions because I'm not sure which version worked for me.**
- Tailwind v4: <br> https://tailwindcss.com/docs/installation/using-vite
- Tailwind v3 (Please skip step 1. I've already done this part): <br> https://v3.tailwindcss.com/docs/guides/vite
- Leaflet JS and React Leaflet: <br> npm i leaflet <br> npm i react-leaflet <br> https://leafletjs.com/
- Sass/SCSS (just do the npm install part): <br> https://sass-lang.com/install/ <br> *If you see an error, just install it using npm. I forgot the command, sorry.*
- React Icons: <br> npm i react-icons <br> https://react-icons.github.io/react-icons/
- Date Picker: <br> npm i react-datepicker <br> https://www.npmjs.com/package/react-datepicker
- React Router: <br> npm i react-router-dom <br> https://www.npmjs.com/package/react-router-dom

# Backend Setup (Django):
***Make sure your Python uses the updated version***
- First Clone this branch. If there's no virtual environment, see *Create Virtual Environment section (this is important)*
- Create Virtual Environment: <br> python -m venv bookly-env
- Once created, use this command to turn on virtual environment: <br> django-env\Scripts\activate <br><br>
**Install the following dependencies:**
- Django: <br> pip install django
- Rest Framework: <br> pip install djangorestframework
- Cors Headers: <br> pip install django-cors-headers
- Pillow (to handle images): <br> pip install pillow
<br><br>
***Read Django Documentation:***<br>
https://docs.djangoproject.com/en/5.2/intro/tutorial01/<br>
https://docs.djangoproject.com/en/5.2/
