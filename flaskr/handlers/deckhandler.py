import json
from flaskr.data.datasource import Datasource
from flaskr.data.queries.insert import insert

def create_deck(deck):
  db = Datasource().get_db()
  deck_insert_sql = '''
    INSERT INTO deck
    (d_title, d_desc, d_author, d_dt_created)
    VALUES(?, ?, ?, datetime('now'));
  '''
  deck_id = insert(db, deck_insert_sql, [deck['title'], deck['description'], deck['author']])  
  print(deck_id)
  card_insert_sql = '''
    INSERT INTO card
    (c_d_id, c_question, c_answer, c_dt_created)
    VALUES(?, ?, ?, datetime('now'));
  '''
  questions = deck['questions']
  for question in questions:
    insert(db, card_insert_sql, [deck_id, question['question'], question['answer']])

  return {'deck_id': deck_id}, 200