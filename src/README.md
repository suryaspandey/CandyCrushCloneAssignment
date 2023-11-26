# Project Structure

The project follows a typical React application structure with specific folders for different aspects of the application.

## Folders and Files

- **`public/`**: Contains static assets like images and audio files
- **`src/`**: Main source code directory

  - **`Components/`**: Reusable React components
  - **`Pages/`**: React components representing Home page
  - **`Redux/`**: Redux reducers
  - **`App.js`**: Main component where the app is initialized
  - **`main.js`**: Entry point for the React application

  ## Key Files

- **`Components/Candy`**: Contains the structure of each grid cell which has candy images
- **`Components/CandyGrid`**: Contains the structure of the complete grid of size 10 X 10 used to populate candies
- **`Components/GameModal`**: Contains the structure of modal used to display the game result(won/lost)
- **`Pages/HomePg`**: Used to display global states such as total games played, number of games won, number of games lost
