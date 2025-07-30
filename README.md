# MovieMate - A Personal Movie/TV Show Tracker
MovieMate is a robust web application designed to empower users in efficiently tracking and managing their personal movie and TV show collections. It offers a comprehensive platform to record content they plan to watch, are currently enjoying, or have already completed. Users can enrich their entries with a variety of details, including genre, streaming platform, and director. For completed content, the application allows for personal ratings and comments, while TV shows benefit from episode progress tracking.

# Features
MovieMate provides a rich set of functionalities to enhance your media tracking experience:

User Authentication:

Secure Registration: Create a new personal account with a unique email, name, and password.

Seamless Login: Access your personalized dashboard using your registered email and password.

Session Management: Utilizes JSON Web Tokens (JWT) for secure and persistent user sessions.

Comprehensive Content Management:

Add New Entries: Easily add movies or TV shows to your collection through an intuitive form.

Title: The name of the movie or TV show (required).

Director: The director(s) of the content.

Genre: Categorize your content (e.g., Action, Drama, Comedy, Sci-Fi).

Platform: Specify where you watch or plan to watch the content from a predefined list (Netflix, Amazon Prime, Jio Hotstar, Sonyliv, etc.).

Content Type: Clearly distinguish between a 'Movie' or a 'TV Show' using radio buttons.

Episode Tracking (for TV Shows): If 'TV Show' is selected, a dedicated field appears to log the number of episodes you've watched.

Status: Categorize your content's progress: 'Wishlist' (for future viewing), 'Watching' (currently in progress), or 'Completed' (finished watching).

Rating & Comments (for Completed Content): When 'Completed' status is selected, additional fields become available to rate the content on a scale of 1-10 and add personal comments or reviews.

Dynamic List Display: View all your added movies and TV shows in a clear, organized list on your dashboard.

Edit Functionality: Update any detail of an existing entry with a dedicated "Edit" button for each item.

Delete Functionality: Remove entries from your collection with a simple "Delete" button.

Intuitive User Interface:

Personalized Dashboard: A welcoming screen displaying "MovieMate" as the heading and a personalized "Welcome, [Username]!" message.

Clean Navigation: A simple and attractive navigation bar with prominent "Add Collection" and "Logout" tabs.

Yellow Theme: Key UI elements and headings are styled with a vibrant yellow theme, providing a clean, simple, and visually appealing user experience.

🚀 Getting Started
Follow these detailed instructions to get a copy of the MovieMate project up and running on your local machine for development and testing purposes.

# Prerequisites
Before you begin, ensure you have the following installed on your system:

Python 3.8 or higher:

Download from python.org.

Verify installation: python --version or python3 --version

Node.js (LTS recommended) and npm (Node Package Manager):

Download from nodejs.org.

npm is installed automatically with Node.js.

Verify installation: node --version and npm --version


# 1. Backend Setup (Flask & SQLite)
The backend handles all data storage, user authentication, and API logic.

Navigate to the backend directory:
Open your terminal or command prompt and change your current directory to the backend folder within your moviemate project:

cd moviemate/backend

Create a Python Virtual Environment:
It's highly recommended to use a virtual environment to manage project dependencies separately from your global Python installation.

python -m venv venv

Activate the Virtual Environment:
You must activate the virtual environment in each new terminal session before working on the backend.

On Windows (PowerShell):

.\venv\Scripts\Activate

On Windows (Command Prompt):

venv\Scripts\activate.bat

On macOS/Linux:

source venv/bin/activate

You should see (venv) at the beginning of your terminal prompt, indicating the environment is active.

Install Backend Dependencies:
Install all required Python packages. If you have a requirements.txt file, use that. Otherwise, install them manually.

If you have a requirements.txt file (recommended):
pip install -r requirements.txt

If you don't have requirements.txt, install manually:
pip install Flask Flask-SQLAlchemy Werkzeug Flask-CORS PyJWT

Initialize the Database:
The SQLite database file (moviemate.db) will be created automatically when the Flask application starts for the first time.
CRITICAL STEP: If you have previously run the Flask server and made changes to your backend/models.py (e.g., adding the director column), you must delete any existing moviemate.db file to ensure the database schema is updated.

Navigate to moviemate/backend/ in your file explorer.

Locate and delete the moviemate.db file if it exists.

Run the Flask Backend Server:
With your virtual environment activated and the moviemate.db file deleted (if necessary), start the Flask server:

flask --app app run

The backend will typically run on http://127.0.0.1:5000. Keep this terminal window open and running.

# 2. Frontend Setup (React)
The frontend provides the user interface and communicates with the backend API.

Open a New Terminal/Command Prompt Window:
Do not close the terminal running your Flask backend. Open a new terminal or command prompt.

Navigate to the Frontend Directory:
Change your current directory to the frontend folder within your moviemate project:

cd moviemate/frontend

Install Frontend Dependencies:
Install all required Node.js packages for the React application.

npm install
 or if you use Yarn:
 yarn install

Run the React Development Server:
Start the React application development server:

npm start
 or if you use Yarn:
yarn start

This will compile the React application and usually open it automatically in your default web browser at http://localhost:3000.

🖥️ Usage
Access the Application: Open your web browser and navigate to http://localhost:3000.

Register or Log In:

If you're a new user, click on the "Sign Up here" link to create an account with your name, email, and password.

If you already have an account, enter your email and password to log in.

Explore the Dashboard:

Upon successful login, you'll be redirected to your personalized MovieMate dashboard.

You'll see a "Welcome, [Your Username]!" message.

The main content area will display your collection of movies and TV shows. Initially, this list will be empty.

Add New Content:

Click the "Add Collection" tab in the navigation bar.

Fill out the form with details like Title, Director, Genre, Platform, Content Type (Movie/TV Show), Episodes Watched (if TV Show), Status (Wishlist/Watching/Completed), Rating (if Completed), and Comments.

Click "Add Movie" (or "Update Movie" if editing) to save your entry. You will be redirected back to the dashboard.

Edit Entries:

On the dashboard, locate the movie or TV show you wish to edit.

Click the "Edit" button next to the entry.

The form will pre-populate with the existing data, allowing you to make changes.

Click "Update Movie" to save your modifications.

Delete Entries:

On the dashboard, locate the entry you want to remove.

Click the "Delete" button next to it. The entry will be removed from your collection.

📁 Project Structure
moviemate/
├── backend/
│   ├── app.py              # Flask app entry point, initializes db and registers blueprints
│   ├── database.py         # Handles SQLAlchemy db instance and initialization (db.create_all())
│   ├── models.py           # Defines User and Movie database models (SQLAlchemy ORM)
│   ├── routes.py           # Defines all RESTful API endpoints (authentication, movie CRUD)
│   ├── .flaskenv           # Flask environment variables (e.g., FLASK_APP, FLASK_ENV)
│   ├── moviemate.db        # SQLite database file (automatically generated on first run)
│   └── venv/               # Python virtual environment for backend dependencies
├── frontend/
│   ├── public/             # Static assets (e.g., index.html, favicon.ico)
│   │   └── index.html      # The main HTML file for the React app
│   ├── src/
│   │   ├── App.js          # Root React component, sets up routing and global state
│   │   ├── index.js        # React application entry point (ReactDOM rendering)
│   │   ├── components/     # Contains individual React UI components
│   │   │   ├── Auth.js         # Handles user signup and login forms
│   │   │   ├── MovieDashboard.js # Displays user's movie collection and controls
│   │   │   ├── MovieForm.js    # Form for adding/editing movie/TV show details (includes director)
│   │   │   ├── MovieList.js    # Renders the list of movie/TV show items
│   │   │   └── NavBar.js       # Navigation bar with Add/Logout links
│   │   ├── services/       # Contains service files for API interactions
│   │   │   └── api.js      # Functions for making HTTP requests to the Flask backend
│   │   └── styles/         # Contains CSS stylesheets for components
│   │       ├── App.css
│   │       ├── Auth.css
│   │       ├── MovieDashboard.css
│   │       ├── MovieForm.css
│   │       ├── MovieList.css
│   │       └── NavBar.css
│   ├── package.json        # Frontend project metadata and npm/yarn dependencies
│                 
└── README.md               # This documentation file



