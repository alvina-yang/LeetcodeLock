# query.py

import os
import json
import pandas as pd  # Import pandas to handle CSV operations
from langchain.vectorstores import Chroma
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def generate_query(topic_name, description):
    """
    Generate a concise query for searching based on topic name and description.
    """
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)
    prompt_template = PromptTemplate(
        input_variables=["topic_name", "description"],
        template=(
            "Given the topic name '{topic_name}' and the description '{description}', "
            "generate a concise search query to find relevant LeetCode questions."
        )
    )
    chain = LLMChain(llm=llm, prompt=prompt_template)
    return chain.run(topic_name=topic_name, description=description).strip()

def query_vectorstore(query, vectorstore, top_k=5):
    """
    Perform similarity search in the vector store and return the top-k results.
    """
    return vectorstore.similarity_search(query, k=top_k)

def clean_problem_text(text):
    """
    Clean the problem text by removing unnecessary metadata like topics.
    """
    # Split by "Text: " and remove lines starting with "Topics:"
    if "Text: " in text:
        text = text.split("Text: ", 1)[-1]
    cleaned_lines = [
        line for line in text.splitlines() if not line.startswith("Topics:")
    ]
    return " ".join(cleaned_lines).strip()

def load_difficulty_mapping(csv_file_path):
    """
    Load the CSV file and create a mapping from Question Title to Difficulty Level.
    """
    if not os.path.exists(csv_file_path):
        print(f"Error: CSV file {csv_file_path} not found.")
        return {}
    
    df = pd.read_csv(csv_file_path)
    
    # Ensure that 'Question Title' and 'Difficulty Level' columns exist
    if 'Question Title' not in df.columns or 'Difficulty Level' not in df.columns:
        print("Error: CSV file must contain 'Question Title' and 'Difficulty Level' columns.")
        return {}
    
    # Drop rows with missing values in 'Question Title' or 'Difficulty Level'
    df = df.dropna(subset=['Question Title', 'Difficulty Level'])
    
    # Create a dictionary mapping from Question Title to Difficulty Level
    title_to_difficulty = pd.Series(df['Difficulty Level'].values,index=df['Question Title']).to_dict()
    
    return title_to_difficulty

def main():
    # Load the vector store
    persist_directory = 'vectorstore'
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

    # Load the analysis JSON file
    analysis_file = "backend/json/gpt-analysis.json"
    output_file = "query_results.json"

    if not os.path.exists(analysis_file):
        print(f"Error: {analysis_file} not found.")
        return

    with open(analysis_file, "r") as f:
        analysis_data = json.load(f)

    topics = analysis_data.get("topics", [])
    results = []

    # Load the difficulty mapping from CSV
    csv_file_path = 'backend/csv/leetcode_questions.csv'
    title_to_difficulty = load_difficulty_mapping(csv_file_path)
    
    if not title_to_difficulty:
        print("Warning: Difficulty mapping is empty. All difficulties will be set to 'Unknown'.")

    # Process each topic in the analysis
    for topic in topics:
        topic_name = topic.get("name", "Unknown Topic")
        description = topic.get("description", "No description provided.")
        
        print(f"\nProcessing topic: {topic_name}")
        
        # Generate query
        query = generate_query(topic_name, description)
        print(f"Generated query: {query}")

        # Retrieve top 5 similar questions
        docs = query_vectorstore(query, vectorstore, top_k=5)
        print(f"Retrieved {len(docs)} documents for topic '{topic_name}'.")

        # Store results for this topic
        topic_results = {
            "category": topic_name,
            "problems": []
        }

        for doc in docs:
            problem_name = doc.metadata.get("Title", "Unknown Problem")
            problem_text = clean_problem_text(doc.page_content)
            # Fetch difficulty from the mapping
            problem_difficulty = title_to_difficulty.get(problem_name, "Unknown")

            # Debugging: Print metadata keys and values
            print(f"\nProblem Name: {problem_name}")
            print(f"Problem Difficulty: {problem_difficulty}")
            print(f"Metadata Keys: {list(doc.metadata.keys())}")

            # Ensure difficulty is valid
            if problem_difficulty not in ["Easy", "Medium", "Hard"]:
                problem_difficulty = "Unknown"

            topic_results["problems"].append({
                "problem_name": problem_name,
                "problem_text": problem_text,
                "problem_difficulty": problem_difficulty
            })

        results.append(topic_results)

    # Save results to a JSON file
    with open(output_file, "w") as f:
        json.dump(results, f, indent=4)

    print(f"\nResults saved to {output_file}")

if __name__ == "__main__":
    main()
