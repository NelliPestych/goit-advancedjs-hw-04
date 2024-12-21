import PixabayApi from "./js/pixabay-api.js";
import { renderImages, updateGallery, showMessage } from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector("#search-form");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const messageContainer = document.querySelector(".message-container");
const loader = document.querySelector(".loader");

const pixabayApi = new PixabayApi();
const lightbox = new SimpleLightbox(".gallery a");

// Показати завантажувач
const showLoader = () => loader.classList.add("visible");

// Приховати завантажувач
const hideLoader = () => loader.classList.remove("visible");

// Скидання пошуку
const resetSearch = () => {
  pixabayApi.resetPage();
  loadMoreBtn.classList.add("hidden");
  loader.classList.add("hidden");
  messageContainer.innerHTML = ""; // Прибираємо повідомлення
  galleryContainer.innerHTML = ""; // Очищуємо галерею
};

// Обробка форми пошуку
const handleSearch = async (e) => {
  e.preventDefault();

  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (!searchQuery) return;

  resetSearch();
  pixabayApi.setQuery(searchQuery);

  await fetchAndRenderImages();
};

// Завантаження та рендеринг зображень
const fetchAndRenderImages = async () => {
  showLoader(); // Показуємо завантажувач

  try {
    const { hits, totalHits } = await pixabayApi.fetchImages();

    if (hits.length === 0 && pixabayApi.page === 1) {
      // Якщо перший запит не повернув жодного зображення
      showMessage("No images found. Please try a different search query.", messageContainer);
      return;
    }

    const markup = renderImages(hits);
    updateGallery(galleryContainer, markup, pixabayApi.page > 1);

    lightbox.refresh();

    // Якщо досягнуто кінця колекції
    if (pixabayApi.page * pixabayApi.perPage >= totalHits) {
      loadMoreBtn.classList.add("hidden"); // Приховуємо кнопку
      messageContainer.innerHTML = `
        <p class="end-message">We're sorry, but you've reached the end of search results.</p>
      `; // Виводимо повідомлення
    } else {
      loadMoreBtn.classList.remove("hidden"); // Показуємо кнопку "Load More"
    }

    // Прокрутка сторінки
    if (pixabayApi.page > 1) {
      const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }
  } catch (error) {
    console.error("Error fetching images:", error);

    // Якщо сталася помилка
    messageContainer.innerHTML = `
      <p class="error-message">Something went wrong. Please try again later.</p>
    `;
  } finally {
    hideLoader(); // Приховуємо завантажувач
  }
};

// Обробка кнопки "Load More"
const handleLoadMore = async () => {
  pixabayApi.incrementPage();
  await fetchAndRenderImages();
};

// Слухачі подій
searchForm.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);
