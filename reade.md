# Application Launcher

## Overview

This application allows users to manage and launch various applications directly from a web interface. It provides functionalities to add, remove, and launch applications, with a user-friendly interface.

-[Demo][(URL)](https://www.loom.com/share/9caa1599552b4b0c961af8fea01c4b3b)


## Features

- **Home Page**: Displays a list of available applications with icons. Users can click on an app icon to launch the application.
- **Settings Page**: Allows users to add or remove applications. The settings page is accessible from the home page.
- **Responsive Design**: The application features a responsive layout for both desktop and mobile views.
- **Dynamic Application Management**: Supports adding applications dynamically by uploading executable files.

## Technologies Used

- **Frontend**: React, React Router, Axios, React Icons
- **Backend**: Node.js, Express, Multer
- **Database**: JSON files for storage
- **Styling**: CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Backend Setup

1. **Navigate to the server directory**:
   
   cd path/to/your/server
Install dependencies:


### npm install
Start the server:


## node server.js
The server will run on http://localhost:2354.

## Frontend Setup
Navigate to the client directory:


cd path/to/your/client
Install dependencies:


## npm install
Start the React application:


## npm start
The React application will run on http://localhost:5173 (or a port specified in your package.json).

## API Endpoints
- GET /apps: Retrieve the list of applications.
- POST /launch: Launch an application. Requires appName in the request body.
- POST /quit: Quit an application. Requires appName in the request body.
- POST /add-app: Add a new application. Requires file upload.
- POST /remove-app: Remove an application. Requires appName in the request body.
## Adding and Removing Applications
- Adding an Application
- Go to the Settings page.
- Use the file input to select an executable file.
- Click the "Add Application" button to upload and add the application.
## Removing an Application
- Go to the Settings page.
- Click the "Remove" button next to the application you want to delete.
## Troubleshooting
- Application Not Launching: Ensure the application path is correct and the executable is accessible.
- File Upload Issues: Verify the file type and path are correctly set in the server configuration.
## Contributing
- Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License
- This project is licensed under the MIT License.

- Feel free to modify the paths, server setup, or any other details according to your specific environment and needs.