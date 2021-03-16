const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photoArrays = [];


// unsplash api
let count = 5;
const apiKey = 'tA04vwTPUjMoV4GBaB3jpXMBmSXv6oJdSDwEBagtw3A';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready =true;
        loader.hidden=true;
        count =30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// create a helper function
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// create elements for links
function displayPhotos() {
    imagesLoaded = 0;
    totalImages= photoArrays.length;
    photoArrays.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //create <img> for photos
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener , check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put img inside item, and item inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// get photos from Unsplash Api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArrays = await response.json();
        displayPhotos();
    } catch (error) {
        // show error
    }
    
}

// check if scrolling near of bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        getPhotos();
        ready=false;
    }
});

// on load
getPhotos();