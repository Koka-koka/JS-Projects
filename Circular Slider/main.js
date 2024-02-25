// Get all the slider items and content boxes
const sliderItems = document.querySelectorAll(".slider__item");
const contentBoxes = document.querySelectorAll(".content__box");

// Add event listener to each slider item
sliderItems.forEach(function (item) {
  item.addEventListener("mousemove", function () {
    // Remove active class from all slider items
    sliderItems.forEach(function (item) {
      item.classList.remove("active");
    });

    // Add active class to the current slider item
    this.classList.add("active");

    // Remove active class from all content boxes
    contentBoxes.forEach(function (box) {
      box.classList.remove("active");
    });

    // Get the id of the content associated with the current slider item
    let contentId = this.dataset.id;
    // Get the content element by id
    let content = document.getElementById(contentId);
    // Add active class to the content element
    content.classList.add("active");
  });
});
