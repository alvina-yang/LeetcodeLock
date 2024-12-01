
import os
import json
from flask import Flask, jsonify, request
from summary import summary_analysis
from flask_cors import CORS
from leetcode_analysis import analyze_quiz
from query import process_analysis  # Import the process_analysis function


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for development

SESSION_FILE = "session_data.json"
ANALYSIS_FILE = "analysis_output.json"
LEETCODE_FILE = "leetcode_file.json"

# Helper function to read data from the JSON file
def read_session():
    try:
        with open(SESSION_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []  # Return an empty list if the file doesn't exist or is empty

# Helper function to write data to the JSON file
def write_session(data):
    with open(SESSION_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Helper function to write analysis
def write_analysis(data):
    with open(ANALYSIS_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Helper function to write leetcode
def write_leetcode(data):
    with open(LEETCODE_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Helper function to read analysis
def read_analysis():
    try:
        with open(ANALYSIS_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading analysis file: {e}")
        return {}  

# Helper function to read leetcode
def read_leetcode():
    try:
        with open(LEETCODE_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading analysis file: {e}")
        return {}  

# Route to receive the questionnaire responses
@app.route('/submit_responses', methods=['POST'])
def submit_responses():
    responses = request.json  # Expecting a list of question-answer dicts

    if not responses or not isinstance(responses, list):
        return jsonify({'error': 'Invalid responses format.'}), 400

    # Save the responses to session_data.json
    write_session(responses)
    print(f"Saved responses: {responses}")

    # Perform analysis
    
    analysis = summary_analysis(responses)
    print(f"Analysis result: {analysis}")

    # Save the analysis to analysis_output.json
    write_analysis(analysis)
    print("Analysis saved to analysis_output.json")

    # Leetcode thing
    leetcode = analyze_quiz(responses)
    print(f"RESPONSES!!!!!!", responses)
    print(f"Saved Leetcode Analysis: {leetcode}")
    write_leetcode(leetcode)

    # Return the analysis as a response
    return jsonify(analysis), 200

# Route to get the analysis of the responses
@app.route('/get_analysis', methods=['GET'])
def get_analysis():
    # Load the stored analysis
    analysis = read_analysis()

    if not analysis or 'analysis' not in analysis:
        return jsonify({'error': 'No analysis found.'}), 400

    print(f"Analysis: {analysis}")

    # Return the analysis as a response
    return jsonify(analysis), 200

# New Route to get Query Results
@app.route('/get_query_results', methods=['GET'])
def get_query_results():
    # Load the stored analysis
    leetcode = read_leetcode()
    print(leetcode)

    if not leetcode:
        return jsonify({'error': 'No analysis found.'}), 400

    print(f"Processing query results based on analysis: {leetcode}")

    try:
        # Process the analysis data to get query results
        query_results = process_analysis(leetcode)
        print(query_results)
        print(f"Query Results: {query_results}")

        # Return the query results as JSON
        return jsonify(query_results), 200
    except Exception as e:
        print(f"Error processing query results: {e}")
        return jsonify({'error': 'Failed to process query results.'}), 500

if __name__ == "__main__":
    app.run(debug=True)
