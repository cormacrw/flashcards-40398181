import json
from flask import Flask, request
from flaskr.views.home import HomeView
from flaskr.views.viewdeck import ViewDeckView
from flaskr.views.createdeck import CreateDeckView
from flaskr.views.mydecks import MyDecksView
from flaskr.views.favouritedecks import FavouriteDecksView
from flaskr.data.datasource import Datasource
from flaskr.handlers.deckhandler import create_deck

app = Flask(__name__)


with app.app_context():
  datasource = Datasource()
  datasource.get_db()
  datasource.init_db()


##                   ##
## ROUTE DEFINITIONS ##
##                   ##

@app.route('/')
def home():
  home_view = HomeView()
  
  return home_view.render()

@app.route('/deck/create', methods=['GET', 'POST'])
def handle_create_deck():
  if request.method == 'POST':
    print('test')
    return create_deck(request.json)

  deck_creator_view = CreateDeckView()
  
  return deck_creator_view.render()
    
@app.route('/deck/<int:deck_id>')
def view_deck(deck_id):
  view_deck_view = ViewDeckView()

  return view_deck_view.render(deck_id)

@app.route('/decks/my')
def view_my_decks():
  my_decks_view = MyDecksView()
  ids_str = request.args.get('ids')
  deck_ids = []
  if ids_str != None:
    deck_ids = json.loads(ids_str)

  return my_decks_view.render(deck_ids)

@app.route('/decks/favourites')
def view_favourite_decks():
  favourite_decks_view = FavouriteDecksView()
  ids_str = request.args.get('ids')
  deck_ids = []
  if ids_str != None:
    deck_ids = json.loads(ids_str)

  return favourite_decks_view.render(deck_ids)


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
