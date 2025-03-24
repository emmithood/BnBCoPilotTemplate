import axios from 'axios';
import { supabase } from './supabase';

// Map agent names to webhook URLs
const WEBHOOK_MAP = {
  'listing-rewrite': process.env.N8N_WEBHOOK_LISTING_REWRITE || 'http://localhost:5678/webhook/listing1',
  'review-insights': process.env.N8N_WEBHOOK_REVIEW_INSIGHTS || 'http://localhost:5678/webhook/reviews1',
  'owner-report': process.env.N8N_WEBHOOK_OWNER_REPORT || 'http://localhost:5678/webhook/owner1',
};

export type AgentPayload = {
  property_id: string;
  additional_notes?: string;
  agent: keyof typeof WEBHOOK_MAP;
  [key: string]: any; // Allow additional fields
};

export async function executeAgentWebhook(
  agentName: keyof typeof WEBHOOK_MAP, 
  payload: AgentPayload
) {
  try {
    // Get the webhook URL for this agent
    const webhookUrl = WEBHOOK_MAP[agentName];
    
    if (!webhookUrl) {
      throw new Error(`No webhook URL configured for agent: ${agentName}`);
    }
    
    // Make the webhook request to N8N
    const response = await axios.post(webhookUrl, payload);
    
    // Log the execution to Supabase
    await logAgentExecution(agentName, payload, response.data);
    
    return response.data;
  } catch (error: any) {
    console.error(`Error executing agent webhook: ${error.message}`);
    
    // Log the failed execution
    await logAgentExecution(agentName, payload, { error: error.message }, false);
    
    throw error;
  }
}

async function logAgentExecution(
  agentName: string,
  payload: AgentPayload,
  response: any,
  success: boolean = true
) {
  try {
    await supabase.from('agent_logs').insert({
      agent_name: agentName,
      payload,
      response,
      success,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to log agent execution:', error);
    // Don't throw here - logging failure shouldn't break the main flow
  }
}