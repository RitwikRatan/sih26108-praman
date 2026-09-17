from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.vector_engine import get_collection, get_model
import random

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    query: str
    standard_id: str = None # Optional: if they are querying a specific standard

class Citation(BaseModel):
    source: str
    is_number: str
    chunk_index: int
    text: str

class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation]

@router.post("/", response_model=ChatResponse)
async def chat_with_knowledge_base(request: ChatRequest):
    collection = get_collection()
    if not collection:
        return ChatResponse(
            answer="The RAG pipeline is not initialized yet. Please run the ingestion script.",
            citations=[]
        )
        
    model = get_model()
    query_embed = model.encode([request.query]).tolist()
    
    # Optional filtering
    where_clause = None
    if request.standard_id:
        where_clause = {"is_number": request.standard_id}
        
    results = collection.query(
        query_embeddings=query_embed,
        n_results=3,
        where=where_clause
    )
    
    if not results['documents'][0]:
        return ChatResponse(
            answer="I couldn't find any relevant information in the standards knowledge base.",
            citations=[]
        )
        
    citations = []
    for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
        citations.append(Citation(
            source=meta.get("source", "Unknown"),
            is_number=meta.get("is_number", "Unknown"),
            chunk_index=meta.get("chunk_index", 0),
            text=doc
        ))
        
    # Simulate LLM Response generation from retrieved chunks for the hackathon MVP
    best_chunk = citations[0].text
    templates = [
        f"Based on the knowledge base, here is what I found: {best_chunk[:150]}... This is explicitly stated in the standard.",
        f"According to {citations[0].is_number}, the requirement details that {best_chunk[:150]}...",
        f"I retrieved this from the standards database: {best_chunk[:150]}..."
    ]
    answer = random.choice(templates)
    
    return ChatResponse(
        answer=answer,
        citations=citations
    )
