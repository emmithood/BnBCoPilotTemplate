import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Handle GET requests to /api/documents/list
export async function GET(request: NextRequest) {
  try {
    // Query documents from Supabase
    const { data, error } = await supabase
      .from('documents')
      .select('id, title, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching documents:', error);
      return NextResponse.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      );
    }

    // Return document list
    return NextResponse.json({
      documents: data || [],
    });
  } catch (error: any) {
    console.error('Error in document list:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}