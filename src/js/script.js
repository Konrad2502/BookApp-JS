/*Cwiczenie 1*/

const bookList = document.querySelector('.books-list');

const templates = Handlebars.compile(document.querySelector('#template-book').innerHTML);

function render() {
  for(const elem in dataSource.books) {
    const generatredHtml = templates(dataSource.books[elem]);
    console.log(generatredHtml);
    const element = utils.createDOMFromHTML(generatredHtml);
    bookList.appendChild(element);
    console.log(element);
    const ratingBgc = determineRatingBgc(dataSource.books[elem].rating);
    element.querySelector('.book__rating__fill').style.background = ratingBgc;
    
  }
}
render();


// Cwiczenie 2 oraz 3

// const favoriteBooks = [];
// // const filters = [];

// function initActions() {

//   const bookImages = document.querySelectorAll('.book__image');
//   console.log(bookImages);

//   for(let bookImage of bookImages) {
//     console.log(bookImage);
//     bookImage.addEventListener('dblclick', function(event) {
//       event.preventDefault();
//       const bookId = bookImage.getAttribute('data-id');
//       console.log(bookId);
//       if(!favoriteBooks.includes(bookId)) {
//         bookImage.classList.add('favorite');
//         favoriteBooks.push(bookId);
//       } else {
//         bookImage.classList.remove('favorite');
//         favoriteBooks.pop(bookId);
//       }
//     });
//   }
//   //   // const formID = document.querySelector('.filters');

// formID.addEventListener('click', function(e) {
//   const target = e.target;
//   if (target.matches('input')) {
//     console.log(target.value);
//     if(input.checked) {
      
//     }
//   }
// });
// }
// initActions();

// Cwiczenie 4,5

const favoriteBooks = [];
const filters = [];
const formId = document.querySelector('.filters');

function initActions() {
  const clickedelement = document.querySelector('.books-list');
  console.log(clickedelement);
  clickedelement.addEventListener('dblclick', function(event) {

    if(event.target.offsetParent.classList.contains('book__image')) {
      console.log(event.target);
      event.preventDefault();
      const bookID = event.target.offsetParent.getAttribute('data-id');
      console.log(bookID);
      if(!favoriteBooks.includes(bookID)) {
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookID);
      } else {
        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.pop(bookID);
      }
    }
  });

  formId.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
      console.log(event.target.value);
    
      if (event.target.checked)  {
        filters.push(event.target.value);
      } else {
        filters.pop(event.target);
      }
      console.log(filters);
      
    }
    filterBooks();
  });
 
}

initActions();

// function filterBooks() {
//   let shouldBeHidden = false;
//   for(const element in dataSource.books) {
//     for(const filter of filters) {
//       if(!element.details[filter]) {
//         console.log(element.details[filter]);
//         shouldBeHidden = true;
//         break;
//       }
//       if (shouldBeHidden) {
//         element.contains('book___image').classList.add('hidden');
//       } else {
//         element.contains('book__image').classList.remove('hidden');
//       }
//     }
//   }
// }

function filterBooks() {
  document.querySelectorAll('.book__image').forEach((el) => el.classList.remove('hidden'));
  for (const book of dataSource.books) {
    for (const filter of filters) {
      console.log(book.details[filter]);
      if (!book.details[filter]) {
        const bookId = book.id;
        document.querySelector(`.book__image[data-id='${bookId}']`).classList.add('hidden');
        break;
      }
    }
  }
}

// Cwiczenie 6

function determineRatingBgc(rating) {
  if(rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if(rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if(rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
}
