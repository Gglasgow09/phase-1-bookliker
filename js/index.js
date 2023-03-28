const baseUrl = 'http://localhost:3000/'
const booksUrl = baseUrl + 'books/'
const userUrl = baseUrl + 'users/'

let users = []

function fetchBook() {
    console.log('fetchBook')
    fetch(booksUrl)
    .then(response => response.json())
    //take the parameter to do the arrow function we are 
    //taking the entire data and running a forEach on it to map through 
    //and pass back each element(book) to the render list function
    .then(data => data.forEach(el => renderList(el)))
    //.then(data => console.log(data))
}

function fetchUsers () {
    fetch (userUrl)
    .then (response => response.json())
    .then (userData => {
        users = [...userData]
        console.log(users)
    })
}

fetchBook()
fetchUsers()

function renderList(book) {
    
    const renderBookList = document.getElementById("list")

    const bookList = document.createElement('li')
    bookList.textContent = book.title
    renderBookList.append(bookList)

    bookList.addEventListener('click', () => clickTitle(book))
    //another way to do this 
    //bookList.onclick = ( ) => showBookInformation(book)
    
    
}
// this function shows the event of clicking the title
function clearHTMLElement ( element ) {
    while (element.firstChild)
    element.firstChild.remove()
}
function clickTitle(book) {
    //console.log(book)

        const fullBookDescription = document.getElementById('show-panel')
        clearHTMLElement(fullBookDescription)

        let bookThumbnail = document.createElement('img')
        bookThumbnail.src= book.img_url
        fullBookDescription.appendChild(bookThumbnail)
        
        const nameOfBook = document.createElement('h5')
        nameOfBook.textContent = book.title
        fullBookDescription.appendChild(nameOfBook)
            
        if(book.subtitle) {
        let bookSubtitle = document.createElement('h5')
        bookSubtitle.textContent = book.subtitle
        fullBookDescription.appendChild(bookSubtitle)
        }

        let bookAuthor = document.createElement('h5')
        bookAuthor.textContent =  'By: ' + book.author
        fullBookDescription.appendChild(bookAuthor)

        let bookDescription = document.createElement('p')
        bookDescription.textContent = book.description
        fullBookDescription.appendChild(bookDescription)

        let userUl = document.createElement('ul')
        bookDescription.appendChild (userUl)

        book.users.forEach (user => renderUserLi (user, userUl))

        let br = document.createElement('br')
        bookDescription.appendChild(br)

        //Display a Like button along with the book details
        let likeButton = document.createElement('button')
        likeButton.textContent = 'Like'
        likeButton.type ='button'
        fullBookDescription.appendChild(likeButton)
        
        //add event listener
        likeButton.addEventListener ('click', () => {
        clickToLikeBook (book)
        })
    }

    function renderUserLi (user, userUl) {
        let userLi = document.createElement('li')
        userUl.appendChild(userLi)
        userLi.textContent = user.username
    }

//A user can like a book by clicking on the Like button, then send a patch request
const clickToLikeBook = (book) => {

    let currentUser = users.find(user => user.id === 10)
    // console.log(currentUser)
    
        let updatedUsersForBook = [...book.users, currentUser]
        let updatedBook = {users: updatedUsersForBook}

        let postRequest = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( updatedBook )
        }


        fetch( booksUrl + book.id, postRequest )
        .then( response => response.json() )
        .then( updatedBookData => clickTitle( updatedBookData ) )
        }
    
    



