-- より緩い条件での検索関数（閾値なし）
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