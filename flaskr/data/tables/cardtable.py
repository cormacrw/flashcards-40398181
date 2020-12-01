def create_card_table(db):
  db.execute('''
    CREATE TABLE IF NOT EXISTS card (
      c_id INTEGER PRIMARY KEY,
      c_d_id INTEGER NOT NULL,
      c_question TEXT NOT NULL,
      c_answer TEXT NOT NULL,
      c_dt_created DATETIME NOT NULL
    )
  ''')