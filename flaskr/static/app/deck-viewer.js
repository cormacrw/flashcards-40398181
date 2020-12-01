class DeckViewer {
  constructor() {
    this.questions = []
    this.activeQuestionIndex = 0
    this.bindings()
    this.init()
  }
  
  bindings() {
    this.$nextBtn = $('.j_next')
    this.$prevBtn = $('.j_prev')
    this.$favouriteBtn = $('.j_favourite')
    this.$unfavouriteBtn = $('.j_unfavourite')
    this.$frontTxt = $('.front-card p')
    this.$backTxt = $('.back-card p')
    this.$nextBtn.on('click', () => this.nextCard())
    this.$prevBtn.on('click', () => this.prevCard())
    this.$favouriteBtn.on('click', () => this.favouriteDeck())
    this.$unfavouriteBtn.on('click', () => this.unfavouriteDeck())

    try {
      this.questions = JSON.parse($('#cards').val())
    } catch (e) {
      console.log('invalid questions!')
    }
  }

  init() {
    this.changeQuestion()

    let deckId = this.questions[0]['c_d_id']
    console.log(deckId)
    let favouriteDecks = localStorage.getItem('favourite_deck_ids')
    if(favouriteDecks === null) {
      this.$unfavouriteBtn.hide()
    } else {
      favouriteDecks = JSON.parse(favouriteDecks)
      if(favouriteDecks.findIndex((item) => item === deckId) > -1) {
        this.$favouriteBtn.hide()
      } else {
        this.$unfavouriteBtn.hide()
      }
    }


  }

  nextCard() {
    this.togglePrevBtn(false)
    this.activeQuestionIndex++
    this.changeQuestion()
    if(this.activeQuestionIndex + 1 === this.questions.length) {
      this.toggleNextBtn(true)
    }
  }
  
  prevCard() {
    this.toggleNextBtn(false)
    this.activeQuestionIndex--
    this.changeQuestion()
    if(this.activeQuestionIndex === 0) {
      this.togglePrevBtn(true)
    }
  }

  toggleNextBtn(disable) {
    if(disable) {
      this.$nextBtn.addClass('disabled')
    } else {
      this.$nextBtn.removeClass('disabled')
    }
  }
  
  togglePrevBtn(disable) {
    if(disable) {
      this.$prevBtn.addClass('disabled')
    } else {
      this.$prevBtn.removeClass('disabled')
    }
  }

  changeQuestion() {
    const question = this.questions[this.activeQuestionIndex]
    this.$frontTxt.html(question.c_question)
    this.$backTxt.html(question.c_answer)

    // progress bar
    const percentage = ((this.activeQuestionIndex + 1
      ) / this.questions.length) * 100
    $('.fg-bar').attr('style', `width: ${percentage}%;`)
  }

  favouriteDeck() {
    let deckId = this.questions[0]['c_d_id']
    let favouriteDecks = localStorage.getItem('favourite_deck_ids')
    if(favouriteDecks === null) {
      favouriteDecks = []
    } else {
      favouriteDecks = JSON.parse(favouriteDecks)
    }

    favouriteDecks.push(deckId)

    localStorage.setItem('favourite_deck_ids', JSON.stringify(favouriteDecks))
    this.$favouriteBtn.hide()
    this.$unfavouriteBtn.show()
  }

  unfavouriteDeck() {
    let deckId = this.questions[0]['c_d_id']
    let favouriteDecks = JSON.parse(localStorage.getItem('favourite_deck_ids'))

    const newFavouriteDecks = favouriteDecks.filter(id => id !== deckId)

    localStorage.setItem('favourite_deck_ids', JSON.stringify(newFavouriteDecks))
    this.$unfavouriteBtn.hide()
    this.$favouriteBtn.show()
  }
}

console.log('hello world!')
$(() => {
  $('#card').flip({
    trigger: 'manual'
  })
  $('.j_flip').on('click', () => {
    $('#card').flip('toggle')
  })
  new DeckViewer()
})