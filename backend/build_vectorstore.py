import os
from langchain.vectorstores import Chroma
from langchain_community.embeddings.ollama import OllamaEmbeddings
from backend.process_csv import process_csv

def build_vectorstore(documents, persist_directory='vectorstore'):
    # Initialize embeddings
    embeddings = OllamaEmbeddings(model="nomic-embed-text")

    # Create or load the vector store
    if os.path.exists(persist_directory):
        print("Loading existing vector store...")
        vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    else:
        print("Creating new vector store...")
        vectorstore = Chroma.from_documents(documents, embeddings, persist_directory=persist_directory)
        vectorstore.persist()
    return vectorstore

if __name__ == "__main__":
    # Process CSV and get documents
    file_path = 'backend/csv/leetcode_questions.csv'
    documents = process_csv(file_path)

    # Build vector store
    vectorstore = build_vectorstore(documents)
    print("Vector store built successfully.")
