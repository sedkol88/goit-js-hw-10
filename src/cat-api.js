import axios from 'axios';
import { loader, error, breedSelect, catInfo } from './index.js';

export function fetchBreeds() {
  loader.style.display = 'block';
  error.style.display = 'none';
  breedSelect.style.display = 'none';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      loader.style.display = 'none';
      breedSelect.style.display = 'block';

      return breeds;
    })
    .catch(error => {
      showError();
    });
}

export function fetchCatByBreed(breedId) {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const cat = response.data[0];
      const catInfoHTML = `
    <img src="${cat.url}" alt="Cat" width=300>
    <div>
    <p style="font-size: 28px;"><b>${cat.breeds[0].name}</b></p>
    <p>${cat.breeds[0].description}</p>
    <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
    </div>
    `;
      catInfo.innerHTML = catInfoHTML;

      loader.style.display = 'none';
      catInfo.style.display = 'flex';

      return cat;
    })
    .catch(error => {
      showError();
    });
}

function showError() {
  error.style.display = 'block';
  loader.style.display = 'none';
}
