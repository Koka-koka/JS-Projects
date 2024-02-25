// Selecting DOM elements
const sliderWrapper = document.querySelector(".slider__wrapper"); // Selecting the slider wrapper element
const sliderFrame = document.querySelector(".slider__frame"); // Selecting the slider frame element
const sliderItems = document.querySelectorAll(".slider__item"); // Selecting all slider item elements
const prevBtn = document.querySelector(".slider_nav-prev"); // Selecting the previous button element
const nextBtn = document.querySelector(".slider_nav-next"); // Selecting the next button element
const pagination = document.querySelector(".slider__pagination"); // Selecting the pagination element

// Initializing variables
let sliderWrapperWidth = sliderWrapper.getBoundingClientRect().width; // Getting the width of the slider wrapper element
let index = 0; // Initializing the index for slide tracking

// Function to change the slide
function changeSlide(i) {
  sliderFrame.style.transform = `translateX(-${i * sliderWrapperWidth}px)`; // Adjusting the slide position based on the index
}

// Creating pagination dots
for (let i = 0; i < sliderItems.length; i++) {
  const div = document.createElement("div");
  div.className = "dot";
  pagination.appendChild(div);
}

// Selecting all pagination dots
const dots = document.querySelectorAll(".slider__pagination .dot");

// Function to update the pagination dots
function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index); // Toggling the active class based on the index
  });
}

updateDots(index); // Updating the pagination dots initially

// Event listener for next button click
nextBtn.addEventListener("click", () => {
  index = (index + 1) % sliderItems.length; // Updating the index for the next slide
  changeSlide(index);
  updateDots(index);
});

// Event listener for previous button click
prevBtn.addEventListener("click", () => {
  index = (index - 1 + sliderItems.length) % sliderItems.length; // Updating the index for the previous slide
  changeSlide(index);
  updateDots(index);
});

// Event listener for pagination click
pagination.addEventListener("click", (event) => {
  if (event.target.classList.contains("dot")) {
    const newIndex = Array.from(dots).indexOf(event.target); // Getting the index of the clicked dot
    index = newIndex; // Updating the index based on the clicked dot
    changeSlide(index);
    updateDots(index);
  }
});

// Event listener for window resize
window.addEventListener("resize", () => {
  sliderWrapperWidth = sliderWrapper.getBoundingClientRect().width; // Updating the slider wrapper width on window resize
  changeSlide(index);
  updateDots(index);
});
