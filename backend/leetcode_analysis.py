# leetcode_analysis.py

import os
import json
import re
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

def analyze_quiz(quiz_data, max_retries=3):
    # Use a valid model name
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0, openai_api_key=api_key)

    # Prepare quiz responses as a string
    quiz_responses = ""
    for response in quiz_data:
        quiz_responses += (
            f"Question: {response['question']}\n"
            f"User Answer: {response['answer']}\n\n"
        )

    print("Formatted quiz responses:")
    print(quiz_responses)  # Debugging print

    # Define the prompt template with escaped curly braces
    prompt_template = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(
            "You are an expert software engineering instructor."
        ),
        HumanMessagePromptTemplate.from_template(
            "Given the following quiz responses:\n{quiz_responses}\n\n"
            "Analyze the user's performance and provide the following information for each topic:\n"
            "- Name of the topic.\n"
            "- Description of the user's understanding of the topic.\n\n"
            "Provide the output as a JSON object with a key 'topics' that maps to an array of objects, "
            "each containing 'name' and 'description' fields for all identified topics. Ensure the JSON is valid and properly formatted.\n\n"
            "Example:\n"
            "{{\n"
            '  "topics": [\n'
            "    {{\n"
            '      "name": "Arrays",\n'
            '      "description": "The user demonstrates a strong understanding of arrays, including reversing elements."\n'
            "    }},\n"
            "    {{\n"
            '      "name": "Hashmaps",\n'
            '      "description": "The user lacks understanding of hashmaps, needing to focus on the basics."\n'
            "    }}\n"
            "  ]\n"
            "}}\n\n"
            "Do not include any additional labels or arrays outside of the 'topics' key.\n"
            "**Remember, output only the JSON object and nothing else.**\n"
        )
    ])

    # Retry logic
    for attempt in range(1, max_retries + 1):
        try:
            # Format the messages
            messages = prompt_template.format_messages(
                quiz_responses=quiz_responses
            )

            print("Formatted messages for LLM:")
            print(messages)  # Debugging print

            # Call the LLM
            response = llm(messages)
            print("LLM Response:")
            print(response.content)  # Debugging print

            # Extract JSON from the response
            json_match = re.search(r'\{[\s\S]*\}', response.content)
            if json_match:
                json_str = json_match.group()
                analysis = json.loads(json_str)
                return analysis
            else:
                print("No JSON object found in LLM response.")
                raise ValueError("No JSON object found in LLM response.")

        except (json.JSONDecodeError, ValueError) as e:
            print(f"Attempt {attempt} failed: {e}")
            if attempt < max_retries:
                print("Retrying...")
            else:
                print("Max retries reached. Returning empty analysis.")
                return {}
        except Exception as e:
            print(f"Unexpected error on attempt {attempt}: {e}")
            if attempt < max_retries:
                print("Retrying...")
            else:
                print("Max retries reached due to an unexpected error.")
                return {}

def main():
    with open('quiz-responses.json', 'r') as f:
        quiz_data = json.load(f)

    analysis = analyze_quiz(quiz_data)

    with open('analysis_output.json', 'w') as f:
        json.dump(analysis, f, indent=4)

    print(json.dumps(analysis, indent=4))

if __name__ == "__main__":
    main()
