from flask import render_template
from flaskr.data.datasource import Datasource
from flaskr.data.queries.select import select

class FavouriteDecksView:
  def render(self, deck_ids):
    db = Datasource().get_db()
    decks_sql = 'SELECT * FROM deck WHERE d_id in (%s)' % ','.join('?'*len(deck_ids))
    decks = select(db, decks_sql, deck_ids)

    return render_template('deck-browser/index.html', decks=decks, page_title='Favourite Decks')