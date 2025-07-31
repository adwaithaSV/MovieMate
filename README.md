## MovieMate - Your Personal Movie & TV Show Tracker
MovieMate is a simple web app designed to help you easily keep track of all the movies and TV shows you watch, want to watch, or have already finished. It's like your personal entertainment diary!

# Features
MovieMate offers these cool features:

Your Account:

Sign Up: Create your own private account with your email and password.

Log In: Get into your personal MovieMate space anytime.

Stay Logged In: It remembers you so you don't have to log in every time.

Manage Your Entertainment:

Add Anything: Easily add new movies or TV shows. You can include:

Title: The name of the movie or show.

Director: Who directed it.

Genre: What kind of story it is (like "Action" or "Comedy").

Where to Watch: Which platform it's on (Netflix, Prime, etc.).

Type: Is it a 'Movie' or a 'TV Show'?

Episodes Watched: For TV shows, you can track your progress.

Your Status: Mark it as 'Wishlist' (want to watch), 'Watching' (currently enjoying), or 'Completed' (finished!).

Rate & Review: If you've 'Completed' something, give it a rating (1-10) and add your own comments.

See Your List: All your added movies and shows appear in a clear list on your main screen.

Change Details: Easily update any information for your entries.

Delete Entries: Remove items from your list if you no longer need them.

Easy to Use:

Friendly Look: A welcoming screen that says "Welcome, [Your Name]!"

Simple Navigation: Clear buttons to "Add Collection" and "Logout" centered in the bar.


# Setup
Want to run MovieMate on your own computer? Here's how to set it up:

What You Need First:
Python 3.8 or newer: Make sure you have this installed.

Node.js and npm: These are tools for running web projects.

1. Setting Up the Backend (The Server Part)
This is the part that stores your data and handles your account.

Go to the backend folder:
Open your command line (like PowerShell or Terminal) and go into the backend folder:

cd moviemate/backend

Create a "Python Sandbox": This keeps your project's Python tools separate.

python -m venv venv

Enter the Sandbox: You need to do this every time you open a new command line window for the backend.

On Windows (PowerShell):

.\venv\Scripts\Activate

On Windows (Command Prompt):

venv\Scripts\activate.bat

On Mac/Linux:

source venv/bin/activate

You'll see (venv) in your command line, meaning it's active.

Install Backend Tools: Get all the necessary Python libraries:

pip install Flask Flask-SQLAlchemy Werkzeug Flask-CORS PyJWT

Prepare the Database:
MovieMate uses a simple file (moviemate.db) for data. If you've changed how data is organized (like adding "director"), you MUST delete the old moviemate.db file so a new one can be created correctly.

Go to your moviemate/backend/ folder in your computer's file explorer.

Find and delete moviemate.db if it's there.

Start the Backend Server:
Keep this command line window open while running the app.

flask --app app run

Your backend server will be running at http://127.0.0.1:5000.

2. Setting Up the Frontend (The Website Part)
This is what you see and interact with in your browser.

Open a New Command Line Window: Don't close the one running your backend!

Go to the frontend folder:

cd moviemate/frontend

Install Frontend Tools: Get all the necessary JavaScript libraries:

npm install
 Or, if you prefer Yarn:
 yarn install

Start the Frontend Website:
This will open MovieMate in your web browser.

npm start
 Or, if you prefer Yarn:
 yarn start

Your MovieMate website will open automatically at http://localhost:3000.


📁 Project Structure 
moviemate/
├── backend/
│   ├── app.py              # Main Flask application file
│   ├── models.py           # Database models (User, Movie)
│   ├── routes.py           # API endpoints (Auth, Movie CRUD)
│   ├── .flaskenv           # Flask environment variables
│   ├── moviemate.db        # SQLite database file (generated)
│   └── venv/               # Python virtual environment
├── frontend/
│   ├── public/             # Static assets (like index.html)
│   ├── src/
│   │   ├── App.js          # Root React component, handles routing
│   │   ├── index.js        # React app entry point
│   │   ├── components/     # Reusable React UI components
│   │   │   ├── Auth.js         # User signup/login
│   │   │   ├── MovieDashboard.js # Displays movie list
│   │   │   ├── MovieForm.js    # Add/Edit movie form
│   │   │   ├── MovieList.js    # Renders movie items
│   │   │   └── NavBar.js       # Navigation bar
│   │   ├── services/       # Connects to backend API
│   │   │   └── api.js      # API call functions
│   │   └── styles/         # CSS for components
│   │       ├── App.css
│   │       ├── Auth.css
│   │       ├── MovieDashboard.css
│   │       ├── MovieForm.css
│   │       ├── MovieList.css
│   │       └── NavBar.css
│   ├── package.json        # Frontend dependencies
└── README.md               # This documentation file
