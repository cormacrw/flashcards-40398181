$(() => {
  let myDecks = localStorage.getItem('my_deck_ids')
  if(myDecks !== null) {
    $('#my-decks').attr('href', '/decks/my?ids=' + myDecks)
  }

  let favouriteDecks = localStorage.getItem('favourite_deck_ids')
  if(favouriteDecks !== null) {
    $('#favourite-decks').attr('href', '/decks/favourites?ids=' + favouriteDecks)
  }
})