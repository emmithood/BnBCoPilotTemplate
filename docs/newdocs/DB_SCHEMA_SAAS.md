# STR AI Dashboard SaaS Platform - Database Schema

## Overview

This document outlines the proposed database schema for transforming the STR AI Dashboard into a scalable SaaS platform that leverages Clerk for user authentication and Supabase for data storage. The schema is designed to support multi-tenancy, role-based access control, and the core features of the platform.

## Authentication Integration

The platform will use Clerk for authentication and user management, while storing application data in Supabase. We'll implement a synchronization mechanism to keep user data consistent between the two systems.

### Clerk Integration

- Clerk will handle:
  - User registration and authentication
  - Social logins
  - MFA
  - Session management
  - User profiles

- Supabase will store:
  - User references (with Clerk user IDs)
  - Application-specific user data
  - Relationships to other entities

## Core Database Schema

### Tables

#### 1. organizations

```sql
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  primary_color text default '#6B46C1',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  subscription_tier text default 'free',
  subscription_status text default 'active',
  subscription_id text,
  max_users integer default 5,
  max_documents integer default 100,
  max_agents integer default 3,
  settings jsonb default '{}'::jsonb
);
```

#### 2. users

```sql
create table users (
  id uuid primary key default uuid_generate_v4(),
  clerk_id text unique not null,
  email text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  last_login_at timestamp with time zone,
  settings jsonb default '{}'::jsonb
);
```

#### 3. organization_users

```sql
create table organization_users (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'member', -- 'owner', 'admin', 'member'
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (organization_id, user_id)
);
```

#### 4. properties

```sql
create table properties (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  description text,
  address text,
  city text,
  state text,
  zip text,
  country text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  settings jsonb default '{}'::jsonb,
  metadata jsonb default '{}'::jsonb -- For additional property data
);
```

#### 5. documents

```sql
create table documents (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  name text not null,
  content text,
  file_type text not null,
  file_size integer not null,
  file_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  created_by uuid references users(id) on delete set null,
  is_template boolean default false
);
```

#### 6. document_chunks

```sql
create table document_chunks (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null references documents(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  content text not null,
  token_count integer not null,
  chunk_order integer not null,
  embedding vector(1536), -- For OpenAI embeddings
  created_at timestamp with time zone default now()
);
```

#### 7. agents

```sql
create table agents (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  icon_name text,
  workflow_id text, -- N8N workflow ID
  webhook_url text, -- N8N webhook URL
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  created_by uuid references users(id) on delete set null,
  is_template boolean default false,
  settings jsonb default '{}'::jsonb,
  unique (organization_id, slug)
);
```

#### 8. agent_executions

```sql
create table agent_executions (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  property_id uuid references properties(id) on delete set null,
  status text not null default 'pending', -- 'pending', 'running', 'completed', 'failed'
  input jsonb default '{}'::jsonb,
  output jsonb default '{}'::jsonb,
  error text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  duration_ms integer,
  created_at timestamp with time zone default now()
);
```

#### 9. chat_conversations

```sql
create table chat_conversations (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  title text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### 10. chat_messages

```sql
create table chat_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references chat_conversations(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  role text not null, -- 'user', 'assistant', 'system'
  content text not null,
  created_at timestamp with time zone default now(),
  tokens_used integer default 0,
  referenced_documents jsonb default '[]'::jsonb -- Array of document IDs used
);
```

#### 11. metrics

```sql
create table metrics (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  metric_type text not null, -- 'tasks_completed', 'time_saved', 'accuracy', etc.
  value numeric not null,
  period_start timestamp with time zone not null,
  period_end timestamp with time zone not null,
  created_at timestamp with time zone default now()
);
```

#### 12. invitations

```sql
create table invitations (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  email text not null,
  role text not null default 'member',
  token text not null unique,
  invited_by uuid references users(id) on delete set null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now(),
  accepted_at timestamp with time zone,
  unique (organization_id, email)
);
```

## Row Level Security (RLS) Policies

To ensure data isolation between organizations, we'll set up Row Level Security policies:

```sql
-- Example RLS policy for the documents table
create policy "Organizations can only access their own documents"
on documents
for all
using (organization_id = auth.jwt() -> 'organization_id'::text::uuid);
```

Similar policies should be created for all tables to ensure proper data isolation.

## Indexes

```sql
-- Example indexes for performance optimization
create index on organization_users (organization_id);
create index on organization_users (user_id);
create index on documents (organization_id);
create index on document_chunks (document_id);
create index on document_chunks (organization_id);
create index on document_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index on agent_executions (agent_id);
create index on agent_executions (organization_id);
create index on chat_messages (conversation_id);
create index on chat_messages (organization_id);
```

## Functions for Semantic Search

```sql
-- Function to search documents by embedding similarity
create or replace function search_documents(
  query_embedding vector(1536),
  match_threshold float8,
  match_count int,
  org_id uuid
)
returns table (
  id uuid,
  content text,
  document_id uuid,
  title text,
  similarity float8
)
language sql stable
as $$
  select
    dc.id,
    dc.content,
    dc.document_id,
    d.name as title,
    1 - (dc.embedding <=> query_embedding) as similarity
  from document_chunks dc
  join documents d on d.id = dc.document_id
  where dc.organization_id = org_id
  and 1 - (dc.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

## Database Extensions

Ensure these extensions are enabled:

```sql
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "vector";
```

## Data Migration Strategy

For existing single-tenant deployments:

1. Create an organization record for each existing client
2. Migrate existing data with appropriate organization IDs
3. Set up user accounts in Clerk and link them to Supabase users
4. Create initial admin users for each organization

## Webhooks for Clerk Integration

Set up webhooks from Clerk to Supabase to keep user data synchronized:

1. User Create/Update events: Update the users table
2. User Delete events: Remove or anonymize user data
3. Session events: Track user activity and last login

## Subscription Tier Enforcement

Logic for subscription tier enforcement:

1. Check tier limits before document uploads, agent creation, etc.
2. Create middleware to validate requests against subscription limits
3. Implement usage tracking and alerting when approaching limits

## Next Steps

1. Review the schema with the development team
2. Create migration scripts from the existing database
3. Set up test environments with sample data
4. Begin implementing the authentication flow with Clerk
5. Develop organization management UI