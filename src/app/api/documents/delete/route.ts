import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Handle POST requests to /api/documents/delete
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    // Delete document from Supabase
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting document:', error);
      return NextResponse.json(
        { error: 'Failed to delete document' },
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error: any) {
    console.error('Error in document delete:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to delete document' },
      { status: 500 }
    );
  }
}