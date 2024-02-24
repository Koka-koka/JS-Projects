// Select the accordion element
const accordion = document.querySelector(".accordion");

// Select all the item headers within the accordion
const itemHeaders = accordion.querySelectorAll(".accordion__item-header");

// Select the currently open item header within the accordion
const openItemHeader = accordion.querySelector(
  ".accordion__item-header.active"
);

// Set the maximum height of the open item's body to its scroll height
openItemHeader.nextElementSibling.style.maxHeight =
  openItemHeader.nextElementSibling.scrollHeight + "px";

// Add a click event listener to the accordion
if (accordion) {
  accordion.addEventListener("click", (event) => {
    // Check if the clicked element is an item header
    if (event.target.classList.contains("accordion__item-header")) {
      // Get the target header and its corresponding body
      const targetHeader = event.target;
      const accordionItemBody = targetHeader.nextElementSibling;

      // Close other item bodies
      itemHeaders.forEach((itemHeader) => {
        if (itemHeader == event.target) {
          return;
        }
        itemHeader.classList.remove("active");
        itemHeader.nextElementSibling.style.maxHeight = 0;
      });

      // Toggle the active class and adjust the max height of the clicked item
      if (targetHeader.classList.contains("active")) {
        targetHeader.classList.remove("active");
        accordionItemBody.style.maxHeight = 0;
      } else {
        targetHeader.classList.add("active");
        accordionItemBody.style.maxHeight =
          accordionItemBody.scrollHeight + "px";
      }
    }
  });
}

/*
 * Accordion code for behavior when one item opens and others also stay opened.
 */

// const accordion = document.querySelector(".accordion");
// const openItemHeader = accordion.querySelector(
//   ".accordion__item-header.active"
// );
// openItemHeader.nextElementSibling.style.maxHeight =
//   openItemHeader.nextElementSibling.scrollHeight + "px";

// if (accordion) {
//   accordion.addEventListener("click", (event) => {
//     if (event.target.classList.contains("accordion__item-header")) {
//       const targetHeader = event.target;

//       const accordionItemBody = targetHeader.nextElementSibling;

//       if (targetHeader.classList.contains("active")) {
//         targetHeader.classList.remove("active");
//         accordionItemBody.style.maxHeight = 0;
//       } else {
//         targetHeader.classList.add("active");
//         accordionItemBody.style.maxHeight =
//           accordionItemBody.scrollHeight + "px";
//       }
//     }
//   });
// }
