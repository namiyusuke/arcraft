-- ベクトル拡張を有効化（pgvector）
create extension if not exists vector;

-- ドキュメント保存用テーブル
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  metadata jsonb default '{}',
  embedding vector(1536), -- OpenAI埋め込みのサイズ
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- インデックスを作成（検索パフォーマンス向上）
create index if not exists documents_embedding_idx 
on documents using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- 全文検索用インデックス
create index if not exists documents_content_idx 
on documents using gin (to_tsvector('english', content));

-- RLS（Row Level Security）の設定
alter table documents enable row level security;

-- 匿名ユーザーが読み取り可能にする（必要に応じて調整）
create policy "Documents are viewable by everyone"
on documents for select
using (true);

-- サービスロールのみ挿入・更新・削除可能
create policy "Service role can insert documents"
on documents for insert
with check (auth.role() = 'service_role');

create policy "Service role can update documents"
on documents for update
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Service role can delete documents"
on documents for delete
using (auth.role() = 'service_role');

-- 更新日時を自動更新する関数
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- トリガーを設定
create trigger handle_documents_updated_at
  before update on documents
  for each row
  execute function handle_updated_at();