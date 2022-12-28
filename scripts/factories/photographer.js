function photographerFactory(data) {
  const {
    city,
    country,
    price,
    name,
    portrait,
    tagline,
    id,
    totalLikes
  } = data;

  const picture = `assets/photographers/${portrait}`;


 // pour l'index
  function getUserCardDOM() {
    const article = document.createElement('article');


    // Link to each photographer page with ID
    const link = document.createElement("a");
    link.setAttribute("href", "photographer.html?id=" + data.id);
    link.setAttribute("aria-label", name);

    const articleDescription = document.createElement("article");
    articleDescription.setAttribute("tabindex", "0");

    const img = document.createElement('img');
    img.setAttribute("src", picture)
    img.setAttribute("alt", name)

    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.setAttribute("aria-label", name)

    const location = document.createElement('span');
    location.setAttribute("class", "location")
    location.textContent = city + ", " + country
    location.setAttribute("aria-label", city + ", " + country)

    const lineSpan = document.createElement('span');
    lineSpan.setAttribute("class", "line")
    lineSpan.textContent = tagline
    lineSpan.setAttribute("aria-label", tagline)

    const priceSpan = document.createElement('span');
    priceSpan.setAttribute("class", "price")
    priceSpan.textContent = price + " € par jour"
    priceSpan.setAttribute("aria-label", priceSpan)


    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(articleDescription);

    articleDescription.appendChild(location);
    articleDescription.appendChild(lineSpan);
    articleDescription.appendChild(priceSpan);

    return (article);
  }
// pour la page de chaque photographe
  function getUserHeaderDOM() {
    // Create HTML elements
    const photographerDescription = document.createElement('div');
    const photographerImgContainer = document.createElement('div');
    const photographerImg = document.createElement('img');
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');

    // Set classes
    photographerDescription.classList.add('photograph-header-description');
    photographerImg.classList.add('photograph-header-img');
    photographerName.classList.add('photograph-header-name');
    photographerCity.classList.add('photograph-header-city');
    photographerTagline.classList.add('photograph-header-tagline');

    // Set text content
    console.log(name, "headerdom")
    photographerName.textContent = name;
    photographerCity.textContent = city;
    photographerTagline.textContent = tagline;

    // Set attributes
    photographerImg.setAttribute('src', picture);
    photographerImg.setAttribute('alt', `${name}`);

    // Append html children elements to main element
    photographerDescription.appendChild(photographerName);
    photographerDescription.appendChild(photographerCity);
    photographerDescription.appendChild(photographerTagline);
    photographerImgContainer.appendChild(photographerImg);

    // Return main elements
    return {
      photographerDescription,
      photographerImgContainer
    };
  }

// pour la page de chaque photographe, display du prix et  total likes
  function getUserInfoBarDOM() {
    // Create HTML elements
    const infoBar = document.createElement('div');
    const photographerLikes = document.createElement('span');
    const photographerPrice = document.createElement('span');
    const infoBarLeft = document.createElement('div');
    const heart = document.createElement('i');

    // Set classes
    infoBar.classList.add('info-bar');
    infoBarLeft.classList.add('info-bar-eft');
    photographerLikes.classList.add('info-bar-likes');
    photographerPrice.classList.add('info-bar-price');
    heart.classList.add('fa-solid');
    heart.classList.add('fa-heart');

    // Set text content
    photographerLikes.textContent = totalLikes;
    photographerPrice.textContent = `${price}€/jour`;

    // Append html children elements to main element
    infoBar.appendChild(infoBarLeft);
    infoBarLeft.appendChild(photographerLikes);
    infoBarLeft.appendChild(heart);
    infoBar.appendChild(photographerPrice);

    // Return main element
    return infoBar;
  }




  return {
    name,
    picture,
    getUserCardDOM,
    getUserHeaderDOM,
    getUserInfoBarDOM
  }
}


function mediaFactory(data) {

  function getUserMediaDOM() {
    // Create section

    const mediaSection = document.createElement('section');
    mediaSection.classList.add('media-section');

    data.forEach((item) => {
      const {
        // id,
        // photographerId,
        photographerName,
        title,
        image,
        video,
        likes,
        // date,
        // price,
      } = item;

      const mediaPath = `assets/photos/${photographerName.split(' ')[0]}/${
              item.image ? image : video
            }`;

      // Create HTML elements
      const mediaCard = document.createElement('article');
      const mediaThumbnail = document.createElement('div');
      const media = document.createElement(`${item.image ? 'img' : 'video'}`);
      const mediaDescription = document.createElement('div');
      const mediaTitle = document.createElement('h2');
      const mediaLikes = document.createElement('span');
      const mediaHeartBtn = document.createElement('span');
      const mediaHeart = document.createElement('i');

      // Video play icon overlay
      if (item.video) {
        const playIcon = document.createElement('i');
        playIcon.classList.add('fa-solid');
        playIcon.classList.add('fa-circle-play');
        mediaThumbnail.insertAdjacentElement('afterbegin', playIcon);
      }

      // Set classes
      mediaCard.classList.add('media-card');
      mediaThumbnail.classList.add('media-card-img');
      mediaDescription.classList.add('media-card-description');
      mediaTitle.classList.add('media-card-title');
      mediaLikes.classList.add('media-card-likes');
      mediaHeartBtn.classList.add('media-card-heart-btn');
      mediaHeart.classList.add('fa-solid');
      mediaHeart.classList.add('fa-heart');

      // Set text content
      mediaTitle.textContent = title;
      mediaLikes.textContent = likes;

      // Set attributes
      media.setAttribute('src', mediaPath);
      media.setAttribute(
        item.video ? 'aria-label' : 'alt',
        `${title}, closeup view`
      );
      media.setAttribute('tabindex', '0');
      mediaHeartBtn.setAttribute('aria-label', 'likes');

      // Append html children elements to main card element
      mediaSection.appendChild(mediaCard);
      mediaCard.appendChild(mediaDescription);
      mediaCard.insertAdjacentElement('afterbegin', mediaThumbnail);
      mediaThumbnail.appendChild(media);
      mediaDescription.appendChild(mediaTitle);
      mediaHeartBtn.appendChild(mediaLikes);
      mediaHeartBtn.appendChild(mediaHeart);
      mediaDescription.appendChild(mediaHeartBtn);
    });
    // Return main element

    return mediaSection;
  }
  return {
    getUserMediaDOM
  };
}