from flask import render_template
from flaskr.data.datasource import Datasource
from flaskr.data.queries.select import select

class HomeView:
  def render(self):
    db = Datasource().get_db()
    decks = select(db, 'SELECT * FROM deck')


    return render_template('deck-browser/index.html', decks=decks, page_title='Decks')