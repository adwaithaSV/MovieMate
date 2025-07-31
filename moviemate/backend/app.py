from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os

from database import db, init_db

from models import User, Movie 

app = Flask(__name__)
CORS(app) 
init_db(app) 


from routes import *

if __name__ == '__main__':
    app.run(debug=True)
