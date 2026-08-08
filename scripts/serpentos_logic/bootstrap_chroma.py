import logging
from serpent_genai import setup_logging

logger = setup_logging(__name__)

def main():
    try:
        import chromadb
        client = chromadb.HttpClient(host='localhost', port=8000)
        query = "video generation veo showreel"

        logger.info("=== CHROMADB SEMANTIC SEARCH ===")
        for col_name in ["memory", "serpent_memories"]:
            try:
                col = client.get_collection(col_name)
                results = col.query(query_texts=[query], n_results=3)
                logger.info(f"Collection: {col_name}")
                if results and results.get('documents') and results['documents'][0]:
                    for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
                        logger.info(f"- Fact: {doc} (metadata: {meta})")
                else:
                    logger.info("- No relevant facts found.")
            except Exception as e:
                logger.warning(f"Error querying {col_name}: {e}")
    except Exception as e:
        logger.error(f"Failed to run bootstrap_chroma: {e}")

if __name__ == "__main__":
    main()

