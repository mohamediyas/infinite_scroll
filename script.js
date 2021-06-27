const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []
let ready = false;
let imagesLoaded = 0;
let totalImages = 0
// unsplash api
const count = 30;
const apiKey = 'gpL1pSHUz3C0V7QfXl4b-OrDlToOoK9b2DkEVbxwjbQ'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}
&count=${count}`;

// step 4
// check image loaded
function imageLoaded(){
   console.log('image loaded')
   imagesLoaded++;
   if(imagesLoaded === totalImages){
       ready = true;
       loader.hidden = true
       console.log(ready)
   }
}

// helper function for set attribute
function setAttributes(element,attributes){
   for(const key in attributes){
       element.setAttribute(key,attributes[key])
   }
}




// create element and diaplay photo
// step 3
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log(totalImages)
    photosArray.map((photo)=>{
    //   create link to unsplash
    const item = document.createElement('a')
    // item.setAttribute('href',photo.links.html)
    // item.setAttribute('target','_blank')
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank',

    }) 


    // create image
    const img = document.createElement('img')
    // img.setAttribute('src',photo.urls.regular)
    // img.setAttribute('alt',photo.alt_description)
    // img.setAttribute('title',photo.alt_description)
    setAttributes(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description
    })

    // event listener finished loading

    img.addEventListener('load',imageLoaded)

    // put image inside <a> <image>
    item.appendChild(img)
    imageContainer.appendChild(item)

    })
}





// get photo from unsplash api
// step 2
async function getPhotos(){
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {
        console.log(error)
    }


}

//check if scrolling 
window.addEventListener('scroll',()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready = false
        getPhotos()
    }
})

// step 1
// on load
getPhotos()