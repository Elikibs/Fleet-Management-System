# Fleet Management System 

FleetSense is a web application designed to streamline the management of fleets of vehicles. It allows users to efficiently manage routes, track matatus, and monitor member activity. This README provides an overview of the application, installation instructions, and usage guidelines.

# Features
1. User authentication: Users can sign up, log in, and manage their accounts securely.
2. Route management: Create, view, update, and delete routes for your fleet.
3. Matatu management: Add new matatu, assign them to routes, and track their activity.
4. Member management: Manage member information and track member activity.
5. Token-based authentication: Secure authentication using JWT tokens with token blacklist     	functionality.

# Installation
To run FleetSense locally, follow these steps:

## Clone the repository:
git clone https://github.com/your-username/fleetsense.git

## Navigate to the project directory:
cd < project directory>

## Install dependencies using pip:
pip install -r requirements.txt

## Set up the database:
python app.py create_db

## Run the application:
python app.py runserver

# Usage
## User Authentication
- Register: Create a new account by providing a username, email, and password.
- Login: Log in with your username and password.
- Logout: Log out of your account.

##Route Management
- View Routes: See a list of all routes.
- Add Route: Create a new route by providing a name and price.
- Update Route: Edit route details such as name and price.
- Delete Route: Remove a route from the system.

## Matatu Management
- Add matatu: Register a new matatu by providing member information, matatu details, and route assignment.
- Update matatus: Edit matatu details or change the assigned route.
- Delete matatu: Remove a matatu from the system.

## Member Management
- Add member: Register a new member by providing member information.
- Update member: Edit member details.
- Delete member: Remove a member from the system.

## Token-Based Authentication
FleetSense uses token-based authentication to secure user sessions. JWT tokens are issued upon successful login and must be included in subsequent requests to access protected endpoints. Tokens expire after a specified duration and can be blacklisted to revoke access.

## Contributing
Contributions to FleetSense are welcome! Please follow the <contribution guidelines for instructions> on how to contribute to the project.

## License
This project is licensed under the 'MIT License' - see the LICENSE file for details.

## Acknowledgments
This project was inspired by the need for efficient fleet management solutions.
Special thanks to the Flask and SQLAlchemy communities for providing excellent tools for web development.


