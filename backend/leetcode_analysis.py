import os
import json
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
# from langchain.output_parsers import StructuredOutputParser, ResponseSchema

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

def analyze_quiz(quiz_data, max_retries=3):
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0, openai_api_key=api_key)

    quiz_responses = ""
    for response in quiz_data:
        quiz_responses += (
            f"Question: {response['question']}\n"
            f"User Answer: {response['answer']}\n\n"
        )

    prompt_template = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(
            "You are an expert software engineering instructor."
        ),
        HumanMessagePromptTemplate.from_template(
            "Given the following quiz responses:\n{quiz_responses}\n\n"
            "Analyze the user's performance and provide the following information for each topic:\n"
            "- Name of the topic.\n"
            "- Description of the user's understanding of the topic.\n\n"
            "Provide the output as repeated pairs of 'name' and 'description' for all topics identified. "
            "Each 'name' and 'description' pair should represent one topic and describe the user's understanding clearly.\n\n"
            "Example:\n"
            "name: Arrays\n"
            "description: The user demonstrates a strong understanding of arrays, including reversing elements.\n"
            "name: Hashmaps\n"
            "description: The user lacks understanding of hashmaps, needing to focus on the basics.\n\n"
            "Do not wrap the output in any additional labels or arrays.\n"
        )
    ])

    # Retry logic
    for attempt in range(1, max_retries + 1):
        # Format the messages
        messages = prompt_template.format_messages(
            quiz_responses=quiz_responses
        )

        try:
            response = llm(messages)

            return response.content.strip() 

        except Exception as e:
            print(f"Attempt {attempt} failed: {e}")

            if attempt < max_retries:
                print("Retrying...")
                continue
            else:
                print("Max retries reached. Returning empty analysis.")
                return ""

def main():
    with open('quiz-responses.json', 'r') as f:
        quiz_data = json.load(f)

    analysis = analyze_quiz(quiz_data)

    with open('analysis_output.txt', 'w') as f:
        f.write(analysis)

    print(analysis)

if __name__ == "__main__":
    main()
