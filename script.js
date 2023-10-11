function createCard(image, title, price) {
  const colDiv = document.createElement('div')
  colDiv.className = 'col col-12 col-sm-6 col-md-4 col-lg-3 my-2'

  const cardDiv = document.createElement('div')
  cardDiv.className = 'card h-100 align-items-center'

  const img = document.createElement('img')
  img.src = image
  img.className = 'card-img-top h-75'
  img.alt = 'Immagine'

  const cardBodyDiv = document.createElement('div')
  cardBodyDiv.className =
    'card-body w-100 d-flex flex-column justify-content-between'

  const cardTitle = document.createElement('h5')
  cardTitle.className = 'card-title'
  cardTitle.textContent = title

  const bookPrice = document.createElement('h5')
  bookPrice.textContent = `${price} €`

  const buttonsDiv = document.createElement('div')
  buttonsDiv.className = 'd-flex justify-content-between'

  const discard = document.createElement('a')
  discard.href = '#'
  discard.className = 'btn btn-danger d-flex px-4 discard'
  discard.textContent = 'Discard'

  const buyNow = document.createElement('a')
  buyNow.href = '#'
  buyNow.className = 'btn btn-success d-flex px-4 buynow'
  buyNow.textContent = 'Add to card'

  cardBodyDiv.appendChild(cardTitle)
  cardBodyDiv.appendChild(bookPrice)
  cardBodyDiv.appendChild(buttonsDiv)
  buttonsDiv.appendChild(discard)
  buttonsDiv.appendChild(buyNow)
  cardDiv.appendChild(img)
  cardDiv.appendChild(cardBodyDiv)
  colDiv.appendChild(cardDiv)

  return colDiv
}

const container = document.querySelector('.container .row')

fetch('https://striveschool-api.herokuapp.com/books')
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      if (res.status === 404) {
        throw new Error('404 - Not Found')
      } else if (res.status === 500) {
        throw new Error('500 - Internal Server Error')
      } else {
        throw new Error('Generic Error')
      }
    }
  })
  .then((books) => {
    console.log('books', books)

    books.forEach((book) => {
      const card = createCard(book.img, book.title, book.price)
      container.appendChild(card)
    })

    const discardButtons = document.querySelectorAll('.discard')
    discardButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault()
        const cardElement =
          this.parentElement.parentElement.parentElement.parentElement
        cardElement.remove()
      })
    })
  })
  .catch((error) => {
    console.error('Errore nella fetch:', error)
  })
