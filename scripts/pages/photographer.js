//Mettre le code JavaScript lié à la page photographer.html



const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));
let displayedMedia;


console.log(id)



async function getPhotographers() {
  let photographers;

  const res = await fetch('data/photographers.json')

  photographers = await res.json();

  console.log(photographers)
  return photographers
}


async function getPhotographer() {
  const photographers = await getPhotographers();
  const photographer = photographers.photographers.find(
    (item) => item.id === id
  );

  const media = photographers.media.filter(
    (element) => element.photographerId === id
  );
  // Add totalLikes to photographer data
  photographer.totalLikes = media.reduce(
    (total, currentItem) => total + currentItem.likes,
    0
  );

  // Add photographerName to media data
  media.forEach((item) => (item.photographerName = photographer.name));
  // Add userHasLiked to media data for like functionality
  media.forEach((item) => (item.userHasLiked = false));
  return {
    photographer: photographer,
    media: [...media]
  };
}

function displayHeader(photographer) {

  const photographerHeader = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const {
    photographerDescription,
    photographerImgContainer
} = photographerModel.getUserHeaderDOM();

  photographerHeader.insertAdjacentElement('afterbegin',photographerDescription);
  photographerHeader.insertAdjacentElement('beforeend', photographerImgContainer);
}



function displayMedia(media) {

  const mediaModel = mediaFactory(media);
  const mediaElement = mediaModel.getUserMediaDOM();
  document
    .querySelector('#main')
    .insertAdjacentElement('beforeend', mediaElement);
  displayedMedia = [...mediaElement.children];

  console.log(mediaElement, 'mediaelement')
  console.log(displayedMedia, 'displayed media')
  console.log(typeof (media), 'type')

  // element HTML vers l'objet, pour faciliter la réorganisation
  media.forEach((el, i) => (el.html = displayedMedia[i]));


}

function displayInfoBar(photographer) {
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoBarDOM();
  document.querySelector('#main').appendChild(infoBarElement);
}



function listenForMediaClick() {
  document.querySelectorAll('.media-card-img').forEach((item, index) => {
    ['click', 'keydown'].forEach((event) => {
      item.addEventListener(event, (event) => {
        if (event.type === 'keydown' && event.code !== 'Enter') return;

        // reset index in case sorting modified it, to display the right picture
        index = displayedMedia.indexOf(item.parentNode);

        openLightbox(index);
      });
    });
  });

}

function listenForLikes(photographer) {
  const hearts = document.querySelectorAll('.media-card-heart-btn');
  hearts.forEach((heart, index) => {
    heart.addEventListener('click', () => {
      toggleLike(photographer.media[index], index);
      updateTotalLikes(photographer);
    });
  });
}

function toggleLike(media, index) {
  const likesElement = document.querySelectorAll('.media-card-likes')[index];
  // Update data
  if (!media.userHasLiked) {
    media.userHasLiked = true;
    media.likes += 1;
  } else {
    media.userHasLiked = false;
    media.likes -= 1;
  }
  // Update DOM values with new DATA
  likesElement.innerHTML = media.likes;
}

function updateTotalLikes(photographer) {
  // Update data
  photographer.photographer.totalLikes = [...photographer.media]
    .map((media) => media.likes)
    .reduce((prev, current) => prev + current, 0);
  // Update DOM values with new DATA
  document.querySelector('.info-bar-likes').innerText =
    photographer.photographer.totalLikes;
}



///////////// /LIGHTBOX/ ////////////////////////////

let currentMediaIndex;

// DOM elements
const lightbox = document.querySelector('#lightbox');
const lightboxMedia = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const rightArrow = lightbox.querySelector('#right-arrow');
const leftArrow = lightbox.querySelector('#left-arrow');

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  const lightboxIsOpen = lightbox.style.display === 'flex';
  if (lightboxIsOpen) {
    if (event.code === 'ArrowLeft') {
      previousMedia();
    }
    if (event.code === 'ArrowRight') {
      nextMedia();
    }
    if (event.code === 'Escape') {
      closeLightbox();
    }
  }
});

// Lightbox functionalities

// affichage de la lightbox, et du media correspondant, en version zoomée
function openLightbox(mediaIndex) {
  if (lightbox.style.display !== 'flex') lightbox.style.display = 'flex';
  lightboxMedia.innerHTML = '';
  lightboxMedia.insertAdjacentElement(
    'afterbegin',
    createZoomedMediaElement(displayedMedia[mediaIndex].querySelector('img, video'))
  );
  const mediaTitle =
    displayedMedia[mediaIndex].querySelector('.media-card-title').textContent;
  lightboxTitle.textContent = mediaTitle;
  currentMediaIndex = mediaIndex;

}

function closeLightbox() {
  if (lightbox.style.display !== 'none') lightbox.style.display = 'none';
}

// Generate the zoomed-in clone of media  HTML element from the clicked element
function createZoomedMediaElement(mediaElement) {
  mediaElement = mediaElement.cloneNode();
  mediaElement.removeAttribute('tabindex');

  //si il s'agit d'une video
  if (mediaElement.nodeName === 'VIDEO') {
    mediaElement.setAttribute('autoplay', '');
    mediaElement.setAttribute('controls', '');
    mediaElement.ariaLabel = mediaElement.ariaLabel.split(', closeup')[0];
    //sinon
  } else {
    mediaElement.alt = mediaElement.alt.split(', closeup')[0];
  }
  return mediaElement;
}

function nextMedia() {

  //  affiche le média suivant dans la lightbox, s'il existe. 
  if (currentMediaIndex === displayedMedia.length - 1) return;
  openLightbox(currentMediaIndex + 1);
}

function previousMedia() {

  //affiche le média précédent dans la lightbox, s'il existe
  if (!currentMediaIndex) return;
  openLightbox(currentMediaIndex - 1);
}




async function init() {

  // Get photograph data
  let photographer = await getPhotographer();
  let media = photographer.media
  console.log(photographer, "after")



  // Display data
  displayHeader(photographer.photographer);
  displayInfoBar(photographer.photographer);
  displayMedia(media);




  //listen for clicks
  listenForLikes(photographer);
  listenForMediaClick(photographer)


  //sorting


  const sortingMenu = document.querySelector('.dropdown');



  let SelectedFilter = document.querySelector('.dropdown').value
  sortMedia(media, SelectedFilter);
  sortingMenu.addEventListener('change', () => {
    SelectedFilter = sortingMenu.value
    sortMedia(media, SelectedFilter);
  });




}



init();