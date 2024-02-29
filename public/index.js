// Your code here

window.onload = () => {

    const h1 = document.createElement('h1');
    const img = document.createElement('img');

    h1.innerHTML = 'Kitten Pic';
    getRandomCatPicture().then(data => {
        img.setAttribute('src', data[0].url);
    }).catch(error => {
        img.setAttribute('src', 'https://placehold.co/600x400/png');
    });

    document.body.appendChild(h1);
    document.body.appendChild(img);
}

const getRandomCatPicture = () => {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search';
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            });
    });
}
