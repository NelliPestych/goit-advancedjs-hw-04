// pixabay-api.js
import axios from 'axios';

const API_KEY = '16588925-02413834d9828552035921ade'; // Замініть на ваш реальний ключ
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApi {
  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 15; // Завантажуємо 15 зображень за запит
  }

  async fetchImages() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: this.perPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  setQuery(newQuery) {
    this.query = newQuery;
  }
}
