# backend.py

import os
import json
from flask import Flask, jsonify, request
from leetcode_analysis import analyze_quiz

app = Flask(__name__)

SESSION_FILE = "session_data.json"

# Helper function to read data from the JSON file
def read_session():
    try:
        with open(SESSION_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}  # Return an empty dictionary if the file doesn't exist or is empty

# Helper function to write data to the JSON file
def write_session(data):
    with open(SESSION_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Route to receive the questionnaire responses
@app.route('/submit_responses', methods=['POST'])
def submit_responses():
    responses = request.json  # Expecting a list of question-answer dicts
    
    # Analyze the quiz using the responses
    analysis = analyze_quiz(responses)
    
    # Save the analysis to a file or database if needed
    with open('analysis_output.json', 'w') as f:
        json.dump(analysis, f, indent=2)
    
    # Return the analysis as a response
    return jsonify(analysis), 200

if __name__ == "__main__":
    app.run(debug=True)
