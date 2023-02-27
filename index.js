import AwesomeBook from './modules/classBook.js';
import luxon from './modules/luxon.js';

const nav = document.querySelectorAll('.nav-link li');
const AddBookBtn = document.querySelector('#AddBookBtn');
const newAwesome = new AwesomeBook();

// function to update book list

const update = () => {
  const bookListElem = document.querySelector('.book-collection');
  bookListElem.innerHTML = '';

  for (let i = 0; i < newAwesome.bookList.length; i += 1) {
    bookListElem.innerHTML += `<ul class="single-book">
            <li class="item">"${newAwesome.bookList[i].title}" by "${newAwesome.bookList[i].author}"</li>
            <button class ='btnr remove-btn' id='${i}' type="button">Remove</button>
            </ul>`;
  }
  const removeBtn = document.querySelectorAll('.remove-btn');
  removeBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      newAwesome.removeBookAwes(e.target.id);
      update();
    });
  });
};

nav.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.innerText === 'List') {
      document.querySelector('.book-container').classList.remove('hide');
      document.querySelector('.add-new-book').classList.add('hide');
      document.querySelector('.contact-me').classList.add('hide');
    } else if (e.target.innerText === 'Add') {
      document.querySelector('.book-container').classList.add('hide');
      document.querySelector('.add-new-book').classList.remove('hide');
      document.querySelector('.contact-me').classList.add('hide');
    } else if (e.target.innerText === 'Contact') {
      document.querySelector('.book-container').classList.add('hide');
      document.querySelector('.add-new-book').classList.add('hide');
      document.querySelector('.contact-me').classList.remove('hide');
    }
  });
});

AddBookBtn.addEventListener('click', () => {
  const titleInput = document.querySelector('#booktitle');
  const authorInput = document.querySelector('#bookauth');
  newAwesome.addBookAwes(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
  update();
});

const currentDate = document.getElementById('clock');

function showTime() {
  currentDate.innerHTML = luxon.DateTime.now().toLocaleString(
    luxon.DateTime.DATETIME_FULL_WITH_SECONDS,
  );
}

// update the time and date every second
setInterval(showTime, 1000);
window.onload = () => update();
