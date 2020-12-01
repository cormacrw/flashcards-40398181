import json
from flask import render_template
from flaskr.data.datasource import Datasource
from flaskr.data.queries.select import select

class ViewDeckView:
  def render(self, deckid):
    db = Datasource().get_db()
    deck_result = select(db, 'SELECT * FROM deck WHERE d_id = ?', [deckid])
    card_results = select(db, 'SELECT * FROM card WHERE c_d_id = ?', [deckid])
    if len(deck_result) == 0 or len(card_results) == 0:
      return '401 bad request'

    deck = deck_result[0]
    cards = json.dumps(card_results)

    return render_template('deck-viewer/index.html', deck=deck, cards=cards)