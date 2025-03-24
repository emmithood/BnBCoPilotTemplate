import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

// Initialize Azure OpenAI client for embeddings
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY || "placeholder-key",
  baseURL: process.env.AZURE_OPENAI_ENDPOINT || "https://placeholder.openai.azure.com",
  defaultQuery: { "api-version": "2023-05-15" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY || "placeholder-key" },
});

// Function to get embeddings for document content
async function getEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error getting embedding:', error);
    throw error;
  }
}

// Helper function to chunk text into smaller segments if needed
function chunkText(text: string, maxChunkSize: number = 4000): string[] {
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  let currentChunk = "";
  
  // Split by paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed the max chunk size,
    // save the current chunk and start a new one
    if (currentChunk.length + paragraph.length + 2 > maxChunkSize) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }
      currentChunk = paragraph;
    } else {
      // Add paragraph to current chunk
      currentChunk += (currentChunk.length > 0 ? "\n\n" : "") + paragraph;
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

// Handle POST requests to /api/documents/upload
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { title, content, filename } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // For simplicity, we'll just upload a single document with the full content
    // In a production app, you might want to chunk large documents
    const chunks = chunkText(content);
    
    // Get embedding for the content
    const embedding = await getEmbedding(content);

    // Insert document into Supabase
    const { data, error } = await supabase
      .from('documents')
      .insert({
        title,
        content,
        embedding,
        created_at: new Date().toISOString(),
      })
      .select('id');

    if (error) {
      console.error('Error inserting document:', error);
      return NextResponse.json(
        { error: 'Failed to upload document' },
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json({
      success: true,
      documentId: data[0]?.id,
      message: 'Document uploaded successfully',
    });
  } catch (error: any) {
    console.error('Error in document upload:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to upload document' },
      { status: 500 }
    );
  }
}