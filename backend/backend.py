import openai
import json
import os
from flask import Flask, jsonify, request

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
    responses = request.json
    
    # Load existing session data (to avoid overwriting any existing data)
    session_data = read_session()

    # Update session data with the new responses (key-value pairs are preserved as-is)
    session_data.update(responses)

    # Write the updated session data to the file
    write_session(session_data)
    print('hello')
    print('Received responses:', responses)

    return jsonify({'status': 'success'}), 200

# Route to check stored responses
@app.route('/get_responses', methods=['GET'])
def get_responses():
    session_data = read_session()  # Read from the file

    print(f"Retrieved responses: {session_data}")

    return jsonify(session_data), 200

if __name__ == "__main__":
    app.run(debug=True)
