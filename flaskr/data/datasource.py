import sqlite3
from flask import g
from flaskr.data.tables.cardtable import create_card_table
from flaskr.data.tables.decktable import create_deck_table

DB_PATH = './flaskr/db/db.db'

class Datasource:
  def get_db(self):
    db = getattr(g, '_db', None)
    if db is None:
        db = g._db = sqlite3.connect(DB_PATH)
    return db

  def init_db(self):
    db = g._db
    create_card_table(db)
    create_deck_table(db)
    db.row_factory = sqlite3.Row