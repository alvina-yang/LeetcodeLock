import os
import json
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

    # Process each topic in the analysis
    for topic in topics:
        topic_name = topic.get("name", "Unknown Topic")
        description = topic.get("description", "No description provided.")
        
        print(f"Processing topic: {topic_name}")
        
        # Generate query
        query = generate_query(topic_name, description)
        print(f"Generated query: {query}")

        # Retrieve top 5 similar questions
        docs = query_vectorstore(query, vectorstore, top_k=5)

        # Store results for this topic
        topic_results = {
            "category": topic_name,
            "problems": []
        }

        for doc in docs:
            topic_results["problems"].append({
                "problem_name": doc.metadata.get("Title", "Unknown Problem"),
                "problem_text": clean_problem_text(doc.page_content)
            })

        results.append(topic_results)

    # Save results to a JSON file
    with open(output_file, "w") as f:
        json.dump(results, f, indent=4)

    print(f"Results saved to {output_file}")

if __name__ == "__main__":
    main()
