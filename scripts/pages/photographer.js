//Mettre le code JavaScript lié à la page photographer.html



const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));

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
    console.log(photographer,'photographer')
  // Add photographerName to media data
  media.forEach((item) => (item.photographerName = photographer.name));
  // Add userHasLiked to media data for like functionality
  media.forEach((item) => (item.userHasLiked = false));
  return { photographer: photographer, media: [...media] };
}

  function displayHeader(photographer) {
    console.log(photographer,"header")
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographer);
    const { photographerDescription, photographerImgContainer } =
      photographerModel.getUserHeaderDOM();
    photographerHeader.insertAdjacentElement(
      'afterbegin',
      photographerDescription
    );
    photographerHeader.insertAdjacentElement(
      'beforeend',
      photographerImgContainer
    );
  }



  function displayMedia(photographer) {
    console.log(photographer,"media")
    const mediaModel = mediaFactory(photographer);
    const mediaElement = mediaModel.getUserMediaDOM();
    document
      .querySelector('#main')
      .insertAdjacentElement('beforeend', mediaElement);
  }
  
function displayInfoBar(photographer) {
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoBarDOM();
  document.querySelector('#main').appendChild(infoBarElement);
}



function listenForLikes(photographer) {
    const hearts = document.querySelectorAll('.media-card-heart-btn');
    hearts.forEach((heart, index) => {
      heart.addEventListener('click', () => {
        console.log("test")
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




  async function init() {

    // Get photograph data
    const photographer = await getPhotographer();
    console.log(photographer,"after")

    

    // Display data
    console.log(photographer.photographer,'display')
    displayHeader(photographer.photographer);
    displayInfoBar(photographer.photographer);
    displayMedia(photographer);

    //listen for clicks
    listenForLikes(photographer);

  }

  init();
  