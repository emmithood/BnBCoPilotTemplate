import { NextRequest, NextResponse } from 'next/server';
import { executeAgentWebhook, AgentPayload } from '@/lib/n8n';

// Handle POST requests to /api/agent/[agent]
export async function POST(
  request: NextRequest,
  { params }: { params: { agent: string } }
) {
  try {
    // Get the agent name from the URL
    const agentName = params.agent;
    
    // Valid agent types based on our documentation
    const validAgents = ['listing-rewrite', 'review-insights', 'owner-report'];
    
    // Check if the agent is valid
    if (!validAgents.includes(agentName)) {
      return NextResponse.json(
        { error: `Invalid agent type: ${agentName}` },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const body: AgentPayload = await request.json();
    
    // Add the agent name to the payload if not already present
    body.agent = agentName as any;
    
    // Execute the agent webhook
    const result = await executeAgentWebhook(agentName as any, body);
    
    // Return the result
    return NextResponse.json(result);
  } catch (error: any) {
    console.error(`Agent execution error:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to execute agent' },
      { status: 500 }
    );
  }
}