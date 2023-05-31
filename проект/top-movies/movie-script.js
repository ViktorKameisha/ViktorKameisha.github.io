const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";


const modalEl = document.querySelector(".modal");
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id');


openModal(filmId);

async function openModal(id) {
  
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  console.log(respData)
  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
      <div class="modal__movie-info">
      <div class="modal__movie-title">${respData.nameRu}</div>
      <div class="modal__movie-release-year">год - ${respData.year}</div>
        <div class="loader"></div>
        <div class="modal__movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</div>
        ${respData.filmLength ? `<div class="modal__movie-runtime">Время - ${respData.filmLength} минут</div>` : ''}
        <div class="modal__movie-overview">Описание - ${respData.description}</div>
        <div>Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${respData.webUrl}</a></div>
      </div>
    </div>
  `
}


const btn = document.querySelector(".btn-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}
btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});
