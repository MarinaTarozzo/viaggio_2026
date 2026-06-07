-- ============================================================
-- VIAGGIO — Script de configuração do banco de dados Supabase
-- Cole este script no "SQL Editor" do seu projeto Supabase
-- e clique em "Run" (▶).
-- ============================================================

-- 1. Tabela de sugestões
create table if not exists public.suggestions (
  id         text primary key,
  nome       text    not null,
  categoria  text    not null,
  cidade_id  text    not null,
  quem       text    not null,
  motivo     text    default '',
  link       text    default '',
  visitado   boolean default false,
  created_at timestamptz default now()
);

-- 2. Tabela de votos (um voto por pessoa por sugestão)
create table if not exists public.votes (
  suggestion_id text not null references public.suggestions(id) on delete cascade,
  user_name     text not null,
  created_at    timestamptz default now(),
  primary key (suggestion_id, user_name)
);

-- 3. Tabela de avaliações por estrelas
create table if not exists public.ratings (
  item_key   text    not null,
  user_name  text    not null,
  value      integer not null check (value between 1 and 5),
  updated_at timestamptz default now(),
  primary key (item_key, user_name)
);

-- 4. Políticas de acesso (permite tudo sem login — app familiar privado)
alter table public.suggestions enable row level security;
alter table public.votes        enable row level security;
alter table public.ratings      enable row level security;

drop policy if exists "allow_all_suggestions" on public.suggestions;
drop policy if exists "allow_all_votes"        on public.votes;
drop policy if exists "allow_all_ratings"      on public.ratings;

create policy "allow_all_suggestions" on public.suggestions for all to anon using (true) with check (true);
create policy "allow_all_votes"        on public.votes        for all to anon using (true) with check (true);
create policy "allow_all_ratings"      on public.ratings      for all to anon using (true) with check (true);

-- 5. Dados iniciais — sugestões da família
insert into public.suggestions (id, nome, categoria, cidade_id, quem, motivo, link, visitado) values
  ('s1','Banhos Termais Széchenyi','Experiência',     'budapeste','Ana Paula','Os maiores banhos termais da Europa, lindos ao entardecer.','https://www.szechenyibath.hu/',false),
  ('s2','Aperitivo nos Navigli',   'Experiência',     'milao',    'Fernando', 'Spritz à beira do canal antes do jantar. Clima de verão italiano.','',false),
  ('s3','Postojna Cave',           'Passeio ao ar livre','liubliana','Pedro','Caverna gigante com trenzinho — já reservamos!','https://www.youtube.com/watch?v=CW6XmnLG3_0',false),
  ('s4','Palácio de Schönbrunn',   'Museu',           'viena',    'Mariana', 'Os jardins e o labirinto valem a manhã inteira.','',false),
  ('s5','Café Central',            'Café / doce',     'viena',    'Ana Paula','Café histórico com Sachertorte. Levar a vovó.','',false),
  ('s6','Terraços do Duomo',       'Vista bonita',    'milao',    'Marina',  'Subir no terraço entre as agulhas de mármore.','',false),
  ('s7','Lago di Alleghe ao pôr do sol','Vista bonita','caprile', 'Fernando','As Dolomitas refletidas na água. Foto da viagem.','',false),
  ('s8','Mercado Central de Budapeste','Loja',         'budapeste','Marina',  'Páprica, lembrancinhas e lángos no andar de cima.','',false)
on conflict (id) do nothing;

-- 6. Votos iniciais (simulando os votos do protótipo)
insert into public.votes (suggestion_id, user_name) values
  ('s1','Ana Paula'),('s1','Fernando'),('s1','Mariana'),('s1','Pedro'),('s1','Marina'),
  ('s2','Ana Paula'),('s2','Fernando'),('s2','Pedro'),('s2','Marina'),('s2','Mariana'),
  ('s3','Pedro'),('s3','Mariana'),('s3','Fernando'),('s3','Marina'),
  ('s4','Mariana'),('s4','Ana Paula'),('s4','Marina'),('s4','Pedro'),
  ('s5','Ana Paula'),('s5','Mariana'),('s5','Marina'),
  ('s6','Marina'),('s6','Fernando'),('s6','Pedro'),
  ('s7','Fernando'),('s7','Ana Paula'),
  ('s8','Marina'),('s8','Mariana')
on conflict do nothing;
