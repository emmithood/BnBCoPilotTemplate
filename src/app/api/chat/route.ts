import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

// Initialize Azure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY || "placeholder-key",
  baseURL: process.env.AZURE_OPENAI_ENDPOINT || "https://placeholder.openai.azure.com",
  defaultQuery: { "api-version": "2023-05-15" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY || "placeholder-key" },
});

const DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4-turbo";

// Function to search for relevant documents
async function searchDocuments(query: string, limit: number = 3) {
  try {
    // This assumes we have a function in Supabase that searches for similar documents
    // based on the vector embeddings
    const { data, error } = await supabase.rpc('search_documents', {
      query_embedding: await getEmbedding(query),
      match_threshold: 0.7,
      match_count: limit
    });

    if (error) {
      console.error('Error searching documents:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching documents:', error);
    return [];
  }
}

// Function to get embeddings for a query
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

// Create the chat completion prompt with context
function createChatCompletionPrompt(query: string, documents: any[]) {
  // Extract content from documents
  const documentChunks = documents.map(doc => 
    `Document: ${doc.title}\n${doc.content}`
  ).join('\n\n');

  // Create system message with context
  const systemPrompt = `You are a helpful assistant for a property manager. Use ONLY the context below to answer.

Context:
${documentChunks}`;

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: query }
  ];
}

// Handle POST requests to /api/chat
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Search for relevant documents
    const documents = await searchDocuments(query);

    // Create the chat completion messages
    const messages = createChatCompletionPrompt(query, documents);

    // Get the chat completion
    const completion = await openai.chat.completions.create({
      model: DEPLOYMENT_NAME,
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 800,
    });

    // Return the response
    return NextResponse.json({
      answer: completion.choices[0].message.content,
      documents: documents.map(doc => ({ title: doc.title, id: doc.id }))
    });
  } catch (error: any) {
    console.error('Error in chat route:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    );
  }
}