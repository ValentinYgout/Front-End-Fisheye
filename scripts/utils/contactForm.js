function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    displayName()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

async function displayName(){const title = document.querySelector('.modal h2');
const photographer = await getPhotographer(id);
title.innerHTML = `Contactez-moi</br>${photographer.photographer.name}`;
}


let firstName = document.querySelector('#first')
let lastName = document.querySelector('#last')
let email = document.querySelector('#email')
let message = document.querySelector('#message')
let form = document.querySelector('form')
let formData = {};




form.addEventListener('submit', (e) => {
    e.preventDefault();
    formData={}
    let inputElements=[firstName,lastName,email,message]
    console.log(inputElements)
    inputElements.forEach((element) => {
      formData[element.name] = element.value;
    });
    console.log(formData);
    closeModal();
    form.reset()
  });





