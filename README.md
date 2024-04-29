# Unique Wares - A place to sell unique pieces foraged and found

## Overview

This is an E-Commerce app with React frontend, Node backend, MongoDB database and Express to serve the data. 

The project is split into two parts: the server and the client. The server has been written in JavaScript using Express to route data from the MongoDB database which models data using Mongoose. Bcrypt and JSON Web Token allow for encryption of user data and authentication.

The client is written in TypeScript with React to create  reactive components and Tailwind for seamless layout and design. Tailwind was also very useful in creating mobile-responsive components that scale with screen size.

This project proved tricky because my MERN skills are all but non-existent. It's taken months from ideation, to lots of failures, to eventually getting it off the ground (nearly).

## How to Install

Clone the project onto your machine.

### Run the Server
Navigate to the server directory and install the dependencies with ```npm i```

With the dependencies downloaded create .env file to hold the variables: PORT, DB_USER, DB_PASSWORD, DB_NAME, and SECRET_TOKEN. These variables are necessary to running the server so be certain to create them.

Run the server with ```npm run dev```, this will run the server on a port defined in the previous step.

### Run the Client

Navigate to the client directory and install the dependencies with npm i.

Run the client with ```npm run dev```, which runs on http://localhost:5173/ by default.

## Technologies
### Frontend
- Axios
- React
- React Dom
- React Icons
- React Router Dom
- Tailwind
- TypeScript

### Backend
- Bcrypt
- Cloudinary
- Cors
- Dotenv
- Express
- JSON Web Token
- MongoDB
- Mongoose
- Multer
- Nodemon
- UUID

## License
[MIT](https://tldrlegal.com/license/mit-license)