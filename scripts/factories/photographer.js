function photographerFactory(data) {
    const { city,country,price,name, portrait,tagline,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const link = document.createElement("a");
        link.setAttribute("href", "photographer.html?id="+data.id);
        link.setAttribute("aria-label", name);

        const articleDescription = document.createElement("article");
        articleDescription.setAttribute("tabindex", "0");

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", name)

        const location= document.createElement( 'span' );
        location.setAttribute("class", "location")
        location.textContent=city+", "+country
        location.setAttribute("aria-label", city+", "+country)

        const lineSpan= document.createElement( 'span' );
        lineSpan.setAttribute("class", "line")
        lineSpan.textContent=tagline
        lineSpan.setAttribute("aria-label",tagline)

        const priceSpan= document.createElement( 'span' );
        priceSpan.setAttribute("class", "price")
        priceSpan.textContent=price+" € par jour"
        priceSpan.setAttribute("aria-label",priceSpan)


        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(articleDescription);

        articleDescription.appendChild(location);
        articleDescription.appendChild(lineSpan);
        articleDescription.appendChild(priceSpan);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}