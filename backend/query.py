
import os
from langchain.vectorstores import Chroma
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def generate_query(topic_name, description):
    # Initialize the LLM
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)
    
    # Create a prompt template
    prompt_template = PromptTemplate(
        input_variables=["topic_name", "description"],
        template=(
            "Given the topic name '{topic_name}' and the description '{description}', "
            "generate a concise search query to find relevant LeetCode questions."
        )
    )
    
    chain = LLMChain(llm=llm, prompt=prompt_template)
    query = chain.run(topic_name=topic_name, description=description)
    return query.strip()

def query_vectorstore(query, vectorstore, top_k=5):
    # Perform similarity search
    results = vectorstore.similarity_search(query, k=top_k)

    return results

def main():
    # Load vector store
    persist_directory = 'vectorstore'
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

    # Example topic and description
    topic_name = "Arrays"
    description = (
        "Understands basic operations like traversing and sorting but struggles with "
        "advanced operations like dynamic array resizing."
    )

    # Generate query
    query = generate_query(topic_name, description)
    print(f"Generated Query: {query}\n")

    # Retrieve top 5 similar questions
    docs = query_vectorstore(query, vectorstore, top_k=5)

    # Output the results
    for idx, doc in enumerate(docs, 1):
        print(f"Result {idx}:")
        print(f"Title: {doc.metadata.get('Title')}")
        print(f"Content:\n{doc.page_content}")
        print("=" * 80)

if __name__ == "__main__":
    main()
