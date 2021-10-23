/* eslint-disable */

import * as data from './data.js';

const cardTemplate = document.querySelector('#card').content;
let popupTemplate = cardTemplate.querySelector('.popup');



let offer = data.getOffers();

let title = offer[0].offer.title;
let address = offer[0].offer.address;
let price = offer[0].offer.price;
let type = offer[0].offer.type;
let rooms = offer[0].offer.rooms;
let guests = offer[0].offer.guests;
let features = offer[0].offer.features;
let description = offer[0].offer.description;
let photos = offer[0].offer.photos;
let avatar = offer[0].author.avatar;


let popupClone = popupTemplate.cloneNode(true);

popupClone.children[1].textContent = title;
popupClone.children[2].textContent = address;
popupClone.children[3].textContent = price;
popupClone.children[4].textContent = type;
popupClone.children[5].textContent = rooms;
popupClone.children[6].textContent = guests;
popupClone.children[7].textContent = features;
popupClone.children[8].textContent = description;
popupClone.children[9].textContent = photos;
popupClone.children[0].textContent = avatar




console.log(offer);
console.log(popupTemplate);
console.log(title);
console.log(popupTemplate.children)
console.log(popupClone);





























//const getLog = function() {

//};

//export {getLog};
