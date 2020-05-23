import '../style/style.scss';

const fetchBtn = document.querySelector('.fetch');
const xmlBtn = document.querySelector('.xml');
const errorModal = document.querySelector('.error');

const fillContent = (state) => {
  const contentList = document.querySelector('.contentList');

  const content = state.map(
    (el) =>
      `
    <figure class="card">
          <img
            class="card__avatar"
            src="${el.avatar}"
          />
          <figcaption class="card__description">
            <h3 class="card__descriptione">${el.first_name} ${el.last_name}</h3>
            <p class="card__description">${el.email}</p>
          </figcaption>
        </figure>
    `
  );

  contentList.innerHTML = content.join('');
};

const errorModalToggle = () => {
  errorModal.classList.toggle('error--visible');
};

const fetchAPI = () => {
  fetch(`https://reqres.in/api/users?page=1`)
    .then((response) => response.json())
    .then((response) => {
      fillContent(response.data);
    })
    .catch((error) => {
      errorModalToggle();
    });
};

const fetchXML = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      fillContent(JSON.parse(xhr.responseText).data);
    }
  };
  xhr.open('GET', 'https://reqres.in/api/users?page=2');
  xhr.send();
};

fetchBtn && fetchBtn.addEventListener('click', fetchAPI);
xmlBtn && xmlBtn.addEventListener('click', fetchXML);
errorModal.addEventListener('click', errorModalToggle);
