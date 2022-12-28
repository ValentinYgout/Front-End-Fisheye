async function getPhotographers() {
    // on récupère les données de tous les photographes  à partir d'un fichier Json et on les met dans la variable photographers

    const res = await fetch('data/photographers.json')
    let photographers = await res.json();

    return photographers
}



async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    
    //on envoie les données de chaque photographe à la factory afin de créer une card pour chacun d'entre eux, puis on l'introduit dans la Section désirée.
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const {
        photographers
    } = await getPhotographers();
    displayData(photographers);
};

init();