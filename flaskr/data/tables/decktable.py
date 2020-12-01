def create_deck_table(db):
  db.execute('''
    CREATE TABLE IF NOT EXISTS deck (
      d_id INTEGER PRIMARY KEY,
      d_title TEXT NOT NULL,
      d_desc TEXT NOT NULL,
      d_author TEXT NOT NULL,
      d_dt_created DATETIME NOT NULL
    )
  ''')