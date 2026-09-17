import os
import io
import PyPDF2
import chromadb
from sentence_transformers import SentenceTransformer
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Config
DATA_DIR = r"D:\uday\SIH108\datab"
CHROMA_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chroma_db")
COLLECTION_NAME = "indian_standards"
CHUNK_SIZE = 500  # Words per chunk
OVERLAP = 50      # Word overlap

def get_is_number_from_filename(filename: str) -> str:
    """Extract standard number from filename like is.2062.2011.pdf"""
    if filename.lower().startswith("is."):
        parts = filename.split('.')
        if len(parts) >= 3:
            return f"IS {parts[1]}"
    if filename.lower().startswith("is"):
        return filename.split('_')[0].upper()
    return filename.split('.')[0].upper()

def extract_text_from_pdf(filepath: str) -> str:
    try:
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text
    except Exception as e:
        logger.error(f"Failed to read {filepath}: {e}")
        return ""

def chunk_text(text: str, chunk_size: int, overlap: int):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks

def main():
    logger.info("Initializing embedding model (this may take a moment to download)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    logger.info(f"Initializing ChromaDB at {CHROMA_DB_PATH}...")
    client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
    
    # Create or get collection
    try:
        collection = client.get_collection(name=COLLECTION_NAME)
        logger.info("Found existing collection. Overwriting...")
        client.delete_collection(name=COLLECTION_NAME)
        collection = client.create_collection(name=COLLECTION_NAME)
    except Exception:
        collection = client.create_collection(name=COLLECTION_NAME)

    pdf_files = [f for f in os.listdir(DATA_DIR) if f.endswith(".pdf")]
    logger.info(f"Found {len(pdf_files)} PDF files in {DATA_DIR}.")

    total_chunks = 0
    for filename in pdf_files:
        filepath = os.path.join(DATA_DIR, filename)
        logger.info(f"Processing {filename}...")
        
        text = extract_text_from_pdf(filepath)
        if not text.strip():
            logger.warning(f"No text extracted from {filename}.")
            continue
            
        chunks = chunk_text(text, CHUNK_SIZE, OVERLAP)
        
        is_number = get_is_number_from_filename(filename)
        
        documents = []
        metadatas = []
        ids = []
        
        for i, chunk in enumerate(chunks):
            chunk_id = f"{filename}_chunk_{i}"
            documents.append(chunk)
            metadatas.append({
                "source": filename,
                "is_number": is_number,
                "chunk_index": i
            })
            ids.append(chunk_id)
        
        if documents:
            logger.info(f"  Generated {len(documents)} chunks. Computing embeddings...")
            embeds = model.encode(documents, show_progress_bar=False).tolist()
            
            logger.info(f"  Adding to ChromaDB...")
            collection.add(
                documents=documents,
                embeddings=embeds,
                metadatas=metadatas,
                ids=ids
            )
            total_chunks += len(documents)

    logger.info(f"Ingestion complete. Total chunks stored: {total_chunks}")

if __name__ == "__main__":
    main()
