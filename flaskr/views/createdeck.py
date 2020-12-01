from flask import render_template
from flaskr.data.datasource import Datasource
from flaskr.data.queries.select import select

class CreateDeckView:
  def render(self):
    db = Datasource().get_db()

    return render_template('deck-creator/index.html')