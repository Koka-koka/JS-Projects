// Get all iamges.
const images = [...document.querySelectorAll('.image')];

const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');
const popupImage = document.querySelector('.popup__image');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Track current image.
let index = 0;

// Open popup and show clicked image.
images.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage(i);
        popup.classList.toggle('active');
    })
})

// Set current image.
const updateImage = (i) => {
    let path = `images/img${i+1}.jpg`;
    popupImage.src = path;
    index = i;
}

// Close popup
closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

// Show previous image and start again when images is over.
leftArrow.addEventListener('click', () => {
    if(index > 0){
        updateImage(index - 1);
    }else if(index <= 0) {
        index = images.length - 1;
        updateImage(index);
    }
})

// Show next image and start again when images is over.
rightArrow.addEventListener('click', () => {
    if(index < images.length - 1){
        updateImage(index + 1);
    }else if(index >= images.length - 1) {
        index = 0;
        updateImage(index);
    }
})