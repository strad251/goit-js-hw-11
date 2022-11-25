const axios = require('axios').default;

export default class PixabayApi {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '31497264-8254871d687ec8d5b65884355';

  constructor() {
    this.page = null;
    this.searchQuery = null;
    this.perPage = 40;
  }

  async fetchPhoto() {

    const searchParams = {
      params: {
        q: this.searchQuery,
        key: this.#API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.page
      },
    };

    try {
      const response = await axios.get(
        `${this.#BASE_URL}`, searchParams);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}