import sqlite3

def insert(db, query, params):
  db.row_factory = sqlite3.Row
  cur = db.cursor()
  cur.execute(query, params)
  db.commit()
  cur.close()

  return cur.lastrowid