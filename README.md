# MNNIT IGNOU Study Center Website

The MNNIT IGNOU Study Center Website is a web application designed to facilitate seamless communication and coordination between students and the study center administration. It provides a centralized platform where students can access important announcements, notifications, and submit their assignments, while the administrators can manage and oversee the entire process.

## Features

### For Students

- **Announcements and Notifications**: Students can view all the latest announcements and notifications posted by the study center administration.
- **Assignment Submission**: Students can upload their assignments through the website, ensuring timely and organized submission.
- **User Dashboard**: Students have access to a personalized dashboard where they can track their submitted assignments and view their submission history.

### For Administrators

- **Announcement Management**: Administrators can easily create, edit, and publish announcements and notifications for the students.
- **Assignment Management**: Administrators can view and manage submitted assignments, providing feedback or grades if necessary.
- **User Management**: Administrators have the ability to manage student accounts, ensuring proper access control and data privacy.

## Technologies Used

- **Front-end**: React.js, Material-UI
- **Back-end**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **File Storage**: IPFS, Pinata

## Getting Started

### Prerequisites

- Node.js and NPM installed on your machine
- PostgreSQL installed and running

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/mnnit-ignou-website.git
```

2. Navigate to the project directory:
```
cd mnnit-ignou-website
```

3. Install the dependencies for the server:
```
npm install
```

4. Install the dependencies for the client:
```
cd client
npm install
```

5. Create a `.env` file in the root directory and provide the necessary environment variables (e.g., PostgreSQL connection string, JWT secret, Nodemailer credentials, IPFS/Pinata credentials).

### Running the Application

1. Start the server:
```
npm start
```

2. Start the client in a separate terminal:
```
cd client
npm start
```

3. The application will be accessible at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Web Tokens](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/)
- [IPFS](https://ipfs.io/)
- [Pinata](https://www.pinata.cloud/)
