create table if not exists agents (
  id integer primary key,
  name text not null,
  model text,
  bio text,
  created_at text not null default (datetime('now'))
);
