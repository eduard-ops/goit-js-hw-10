import Notiflix from 'notiflix';

import murkupListCountries from '../templates/countries.hbs';

import murkupInfoCountries from '../templates/info-countries.hbs';

import fetchCountries from './api-countries';

const _debounce = require('lodash.debounce');

const inputEl = document.querySelector('#search-box');

const cityListEl = document.querySelector('.country-list');

const cityInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', _debounce(onInputChange, 400));

function onInputChange(e) {
  const target = e.target.value.trim();
  if (target === '') {
    cityListEl.innerHTML = '';
    cityInfoEl.innerHTML = '';
    return;
  }
  fetchCountries(target)
    .then(name => {
      createElemenst(name);
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function createElemenst(name) {
  if (name.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    console.log(name);
  } else if (name.length >= 2 && name.length < 10) {
    cityListEl.innerHTML = murkupListCountries(name);
    cityInfoEl.innerHTML = '';
  } else {
    cityInfoEl.innerHTML = murkupInfoCountries(name);
    cityListEl.innerHTML = '';
    console.log(name);
  }
}
