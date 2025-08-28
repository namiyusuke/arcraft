-- LangChain SupabaseVectorStore用の正しいマッチング関数
-- この関数はLangChainが期待するパラメータ形式に合わせています

create or replace function match_documents (
  filter jsonb default '{}',
  match_count int default 5,
  query_embedding vector(1536) default null
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.embedding is not null
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- 代替案: より厳密な類似度フィルタリング付き
create or replace function match_documents_with_threshold (
  filter jsonb default '{}',
  match_count int default 5,
  query_embedding vector(1536) default null,
  match_threshold float default 0.5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.embedding is not null
    and 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;