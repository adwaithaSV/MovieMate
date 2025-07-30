from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os

# Import db and the initialization function from your database.py
from database import db, init_db

# IMPORTANT: Import your models *before* initializing the database
# so that db.create_all() knows about them when it runs.
from models import User, Movie # <--- THIS LINE MUST BE HERE

app = Flask(__name__)
CORS(app) # Enable CORS for React frontend

# Initialize the database with the app instance.
# This will set up the database URI and create tables if they don't exist.
init_db(app) # <--- init_db is called AFTER models are imported

# Import routes after the app and db are initialized, as routes will use db and models.
from routes import *

if __name__ == '__main__':
    app.run(debug=True)