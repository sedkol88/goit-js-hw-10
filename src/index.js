import axios from 'axios';

export const breedSelect = document.querySelector('.breed-select');
export const loader = document.querySelector('.loader');
export const error = document.querySelector('.error');
export const catInfo = document.querySelector('.cat-info');

import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_b0YdOabwcv6Luh4dhWKXNltRCdt6MTv6kmuB1jM5dlaQaJqs5ruTneNrzWEKdDrS';

document.addEventListener('DOMContentLoaded', function () {
  fetchBreeds();
});

breedSelect.addEventListener('change', function () {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId);
  }
});
