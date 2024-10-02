# Express Handlebars Boilerplate

This is a boilerplate for building a web application using Express and Handlebars as the view engine. It includes several features and best practices to help you get started with your project.

## Project Structure

The project structure is organized as follows:

- .env
- .gitignore
- combined.log
- error.log
- eslint.config.mjs
- package-lock.json
- package.json
- sessions
  - sessions.db
- src
  - app.js
  - config
    - database.js
    - express.js
    - logger.js
  - controllers
    - index.js
  - middleware
    - errorHandler.js
  - models
  - public
    - css
      - styles.css
    - img
    - js
      - main.js
  - routes
    - index.js
  - server.js
  - views
    - error.handlebars
    - home.handlebars
    - layouts
      - main.handlebars
    - partials
      - footer.handlebars
      - header.handlebars
    - products.handlebars
    - users.handlebars
  - `__tests__`
    - app.test.js
- webpack.config.js`

1.  **`.env`**: This file contains the environment variables used by the application, such as the session secret and the port number.
2.  **`.gitignore`**: This file specifies which files and directories should be ignored by Git.
3.  **`combined.log`** and **`error.log`**: These files are used by the Winston logger to store logs.
4.  **`eslint.config.mjs`**: This file contains the configuration for the ESLint linter.
5.  **`package-lock.json`** and **`package.json`**: These files manage the project dependencies.
6.  **`sessions`**: This directory contains the SQLite3 session store database file.
7.  **`src`**: This is the main directory for the application source code.
    - **`app.js`**: This is the main Express application file.
    - **`config`**: This directory contains configuration files for Express, the database, and the logger.
    - **`controllers`**: This directory contains the controller functions for handling routes.
    - **`middleware`**: This directory contains middleware functions, such as the error handler.
    - **`models`**: This directory is intended for database models, but it's currently empty.
    - **`public`**: This directory contains static files, such as CSS, JavaScript, and images.
    - **`routes`**: This directory contains the route definitions for the application.
    - **`server.js`**: This file sets up the HTTP server and starts the application.
    - **`views`**: This directory contains the Handlebars template files for rendering the application's views.
    - **`__tests__`**: This directory contains the Jest test files for the application.
8.  **`webpack.config.js`**: This file contains the Webpack configuration for bundling the application.

## Getting Started

1.  Clone the repository: `git clone https://github.com/your-username/express-handlebars-boilerplate.git`
2.  Install dependencies: `npm install`
3.  Set up the environment variables in the `.env` file.
4.  Start the development server: `npm run dev`
5.  Build the production bundle: `npm run build`
6.  Run the production server: `npm start`
