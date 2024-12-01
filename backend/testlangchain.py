import os
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv  # Import the dotenv library

# Load environment variables from the .env file
load_dotenv()

# Get the OpenAI API Key from environment variable
openai_api_key = os.getenv("OPENAI_API_KEY")

# Check if the API key is loaded correctly
if openai_api_key is None:
    raise ValueError("OpenAI API key is not set in the environment variables.")

# Define a prompt template
prompt = PromptTemplate(
    input_variables=["question"],
    template="You are a helpful assistant. Answer the question: {question}"
)

# Initialize the GPT model (using GPT-4)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7, openai_api_key=openai_api_key)

# Create the LLM chain with the prompt template
llm_chain = LLMChain(llm=llm, prompt=prompt)

# Example input
question = "What is the capital of China?"

# Generate the response
response = llm_chain.run(question)

# Print the result
print(response)
