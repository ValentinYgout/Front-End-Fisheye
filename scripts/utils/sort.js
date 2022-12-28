const popularity = document.querySelector(".pop");
const date = document.querySelector(".date");
const title = document.querySelector(".titre");
const menuSelect = document.querySelector('.menuSelect');
const dropdown = document.querySelector('.dropdown');




function sortMedia(data, factor) {

  
    if (factor === "popularity") {
        console.log(data,'date')
        data = data.sort((a, b) => (a.likes <= b.likes ? 1 : -1));
    } else if (factor === "date") {
        console.log(data,'date')
        data = data.sort((a, b) => (a.date <= b.date ? 1 : -1));
    } else if (factor === "title") {
        data= data.sort((a, b) =>
        a.title.toLowerCase() >= b.title.toLowerCase() ? 1 : -1
        );
        }
  // Display new order
  const mediaSection = document.querySelector('.media-section');
  mediaSection.innerHTML = '';
  data.forEach((el) => mediaSection.appendChild(el.html));
  // Update displayedMedia
  displayedMedia = data.map((item) => item.html);
}
