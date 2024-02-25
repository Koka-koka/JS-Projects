// Select all buttons with the class "btns button"
const btns = document.querySelectorAll(".btns button");

// Select the element with the class "cat"
const cat = document.querySelector(".cat");

// Iterate over each button and add a click event listener
btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // If the button has a "data-add" attribute, update the class of the cat element
    if (this.getAttribute("data-add")) {
      cat.setAttribute("class", "");
      cat.classList.add(this.getAttribute("data-add"));
    }
  });
});
