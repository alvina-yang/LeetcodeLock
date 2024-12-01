import os
import json
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

def summary_analysis(quiz_data, max_retries=3):
    # Initialize the LLM
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0, openai_api_key=api_key)

    # Define the response schema
    response_schemas = [
        ResponseSchema(
            name="analysis",
            description=(
                "A list where each item contains the category (e.g., Arrays), "
                "percentage of correctness (0 to 100), and a description that first mentions something you did well, then something you need to work on, using 'you'."
            )
        )
    ]

    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
    format_instructions = output_parser.get_format_instructions()

    # Prepare quiz responses as a string
    quiz_responses = ""
    for response in quiz_data["responses"]:
        quiz_responses += (
            f"Question ID: {response['question_id']}\n"
            f"Category: {response['category']}\n"
            f"Question: {response['question']}\n"
            f"User Answer: {response['user_answer']}\n"
            f"Correct Answer: {response['correct_answer']}\n\n"
        )

    # Create the prompt template
    prompt_template = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(
            "You are an expert software engineering instructor."
        ),
        HumanMessagePromptTemplate.from_template(
            "Given the following quiz responses:\n{quiz_responses}\n\n"
            "Analyze the user's performance and for each category, provide:\n"
            "- The category name.\n"
            "- The percentage of correctness (from 0 to 100).\n"
            "- A description that first mentions something you did well, then something you need to work on, using 'you'. For example, 'You did X well but you should work on Y.'\n\n"
            "Provide the output in JSON format with the following key 'analysis', which is a list of items with keys: 'category', 'percentage', 'description'.\n\n"
            "{format_instructions}"
        )
    ])

    # Retry logic
    for attempt in range(1, max_retries + 1):
        # Format the messages
        messages = prompt_template.format_messages(
            quiz_responses=quiz_responses,
            format_instructions=format_instructions
        )

        try:
            # Get the LLM response
            response = llm(messages)

            # Parse the response
            parsed_response = output_parser.parse(response.content)
            return parsed_response  # Successfully parsed

        except Exception as e:
            print(f"Attempt {attempt} failed: {e}")

            if attempt < max_retries:
                print("Retrying...")
                continue
            else:
                print("Max retries reached. Returning empty analysis.")
                return {"analysis": []}

def main():
    # Load the quiz responses
    with open('backend/json/quiz-responses.json', 'r') as f:
        quiz_data = json.load(f)

    # Analyze the quiz
    analysis = summary_analysis(quiz_data)

    # Output the analysis to a JSON file
    with open('analysis_output.json', 'w') as f:
        json.dump(analysis, f, indent=2)

    # Print the analysis
    print(json.dumps(analysis, indent=2))

if __name__ == "__main__":
    main()
