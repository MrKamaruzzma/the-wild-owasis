# Project Title: The Wild Oasis

## Description
The Wild Oasis is a responsive web application designed to provide users with a seamless experience in managing cabin rentals. The platform allows users to view, edit, and book cabins, as well as manage their user profiles. Built with modern web technologies, the app emphasizes user experience, performance, and ease of use.

## Features
- **User Authentication**: Sign up, log in, and log out functionalities with password management.
- **Profile Management**: Users can update their personal information, including passwords and avatar images.
- **Cabin Management**: Users can view available cabins, edit cabin details, and manage bookings.
- **Responsive Design**: The application is fully responsive, providing a great experience on mobile and desktop devices.
- **Real-time Updates**: Use of React Query to fetch and manage data efficiently.
- **Error Handling**: Comprehensive error handling and user feedback through toast notifications.

## Tech Stack
- **Frontend**: 
  - React.js
  - React Router
  - React Hook Form
  - React Query
  - Supabase for backend services

- **Backend**: 
  - Supabase for authentication and database management

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MrKamaruzzma/TheWildOasis.git
   ```

2. Navigate to the project directory:
   ```bash
   cd TheWildOasis
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up your Supabase project and replace the configuration in the `supabase.js` file.

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage
1. **Sign Up / Log In**: Users can create a new account or log in with existing credentials.
2. **View Cabins**: After logging in, users can view a list of available cabins.
3. **Edit Cabin Details**: Users can edit cabin information, such as name, description, and images.
4. **Manage Profile**: Users can update their personal details, including changing their password and uploading an avatar image.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to [Supabase](https://supabase.io/) for providing the backend services.
- Thanks to the open-source community for the tools and libraries used in this project.

