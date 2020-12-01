import sqlite3

def select(db, query, args=()):
  db.row_factory = sqlite3.Row
  cur = db.cursor()
  cur.execute(query, args)
  rv = cur.fetchall()
  cur.close()

  def to_dict(row):
    return dict(row)

  return list(map(to_dict, rv))