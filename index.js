// load data from API 
const loadBooks=()=>{
    const searchInput = document.getElementById('search-text');
    const searchText = searchInput.value ;
    if(searchText !== ''){
        const url = ` http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        .catch(err => console.log(err))
        searchInput.value = '';
        toggleSpinner('block')
    }else{
        alert('Please! Enter Book Name')
    }
}
// display data on UI 
const displayBooks=(books)=>{
const allBooks = books.docs;

const bookContainer =document.getElementById('book-container');
bookContainer.textContent = '';
allBooks.forEach(book =>{
    const div = document.createElement('div');
    div.classList.add('col-md-6');
    div.innerHTML=`
    <div class="card h-100 display-style">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="card-title">Book Name : ${book.title}</h2>
        <p>Author Name : ${book.author_name}</p>
        <p>Publisher Name : ${book.publisher}</p>
        <p> first publish : ${book.first_publish_year}</p>
      </div>
      </div>
    `;
    bookContainer.appendChild(div);
  const countDiv=document.getElementById('result-count')
  countDiv.textContent = '';
  countDiv.innerHTML =`
    <h5 class="text-center mt-5"> Total result found :<span class="text-info"> ${books.numFound} </span></h5>
    `;
})
toggleSpinner('none')
}

const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display =displayStyle;
}