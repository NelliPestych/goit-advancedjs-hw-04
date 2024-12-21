/**
 * Функція для створення HTML-розмітки зображень
 * @param {Array} images - масив зображень
 * @returns {string} HTML-розмітка
 */
export const renderImages = (images) => {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a class='gallery-item' href='${largeImageURL}'>
          <img src='${webformatURL}' alt='${tags}' loading='lazy' />
          <div class='info'>
            <div class='info-item'>Likes<p> ${likes}</p></div>
            <div class='info-item'>Views<p> ${views}</p></div>
            <div class='info-item'>Comments<p> ${comments}</p></div>
            <div class='info-item'>Downloads<p> ${downloads}</p></div>
          </div>
        </a>
      `,
    )
    .join('');
};

/**
 * Функція для оновлення галереї зображень
 * @param {HTMLElement} galleryContainer - DOM-елемент галереї
 * @param {string} markup - HTML-розмітка
 * @param {boolean} append - чи додавати нові елементи до галереї (true) або перезаписувати (false)
 */
export const updateGallery = (galleryContainer, markup, append = false) => {
  if (!append) {
    galleryContainer.innerHTML = markup; // Повне оновлення галереї
  } else {
    galleryContainer.insertAdjacentHTML('beforeend', markup); // Додати до існуючих
  }
};

/**
 * Функція для виводу повідомлень
 * @param {string} message - Текст повідомлення
 * @param {HTMLElement} container - DOM-елемент, де показати повідомлення
 */
export const showMessage = (message, container) => {
  container.innerHTML = `<p class='message'>${message}</p>`;
};