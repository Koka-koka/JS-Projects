// Select the tabs container
const tabs = document.querySelector(".tabs");

// Select all the tab content elements
const tabsContent = document.querySelectorAll(".tabs__content");

// Add event listener for click event on the tabs container
tabs.addEventListener("click", function (e) {
  // Check if the clicked element has the class "tabs-btn"
  if (e.target.classList.contains("tabs-btn")) {
    // Get the data-id attribute value from the clicked element
    const id = e.target.dataset.id;
    // If the data-id attribute value exists
    if (id) {
      // Find and remove the "active" class from the previously active button
      const activeBtn = tabs.querySelector(".tabs-btn.active");
      if (activeBtn) {
        activeBtn.classList.remove("active");
      }
      // Add the "active" class to the clicked button
      e.target.classList.add("active");

      // Remove the "active" class from all tab content elements
      tabsContent.forEach(function (article) {
        article.classList.remove("active");
      });
      // Find the element with the corresponding id and add the "active" class to it
      const element = document.getElementById(id);
      if (element) {
        element.classList.add("active");
      }
    }
  }
});
