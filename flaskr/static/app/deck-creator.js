class DeckCreator {
  constructor() {
    this.bindings()
  }
  
  bindings() {
    this.$newRowBtn = $('.j_new_row')
    this.$saveBtn = $('.j_save')
    this.$rowContainer = $('.card-row-container')

    this.$saveBtn.on('click', () => this.saveDeck())
    this.$newRowBtn.on('click', () => this.createRow())
  }

  createRow() {
    const template = $('#card-row-template').html()
    this.$rowContainer.append(template)
  }

  gatherData() {
    let questions = []
    $('.card-row').each((i, el) => {
      console.log(el)
      const $el = $(el)
      const question = $el.find('textarea[name=question]').val()
      const answer = $el.find('textarea[name=answer]').val()
      questions.push({
        question,
        answer
      })
    })

    return {
      title: $('input[name=title]').val(),
      description: $('textarea[name=description]').val(),
      author: $('input[name=author]').val(),
      questions
    }
  }

  saveDeck() {
    const data = this.gatherData()
    console.log(data);
    $.ajax('/deck/create', {
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(data),
      success: (res) => {
        console.log(res)
        this.updateMyDecks(res.deck_id)
        window.location = '/'
      }
    })
  }

  updateMyDecks(deckId) {
    let deckIds = localStorage.getItem('my_deck_ids')
    if(deckIds === null) {
      deckIds = []
    } else {
      deckIds = JSON.parse(deckIds)
    }

    deckIds.push(deckId)
    localStorage.setItem('my_deck_ids', JSON.stringify(deckIds))
  }
}

$(() => {
  new DeckCreator()
})