# process_csv.py

import pandas as pd
from langchain.schema import Document

def process_csv(file_path):
    df = pd.read_csv(file_path)

    df = df[df['Question Text'].notna() & df['Topic Tagged text'].notna()]

    documents = []
    for index, row in df.iterrows():
        # Create content that includes only the necessary fields
        content = f"Question ID: {row['Question ID']}\n"
        content += f"Title: {row['Question Title']}\n"
        content += f"Text: {row['Question Text']}\n"
        content += f"Topics: {row['Topic Tagged text']}\n"

        doc = Document(
            page_content=content,
            metadata={
                'Question ID': row['Question ID'],
                'Title': row['Question Title'],
                'Topics': row['Topic Tagged text']
            }
        )
        documents.append(doc)

    return documents

# Example usage:
if __name__ == "__main__":
    file_path = 'backend/csv/leetcode_questions.csv' 
    documents = process_csv(file_path)
    print(f"Processed {len(documents)} documents.")
