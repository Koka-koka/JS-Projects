import ElementsPositions from "./ElementsPositions.js";

class DragDrop {
  /**
   * Initializes a new instance of the DragDrop class.
   * Sets up the elements positions, selected item, and points.
   * Also sets up drag and drop events and image change functionality.
   */

  constructor() {
    this.elementsPositions = new ElementsPositions();
    this.selected = null;
    this.points = {
      correct: 0,
      wrong: 0,
    };

    this.dragDropEvents();
    this.changeImage();
  }

  /**
   * Sets up the drag and drop events for the puzzle items and cells.
   * When an item is dragged and dropped into a cell, the item is appended to the cell.
   * If the item is in the correct position, the points are incremented.
   * If the item is in the wrong position, the points are decremented.
   * Checks if the game is over and displays the modal with the final score.
   * @param {Event} e - The event object.
   */
  dragDropEvents() {
    const {
      cells,
      dragableItems,
      modal,
      modalText,
      modalBtn,
      attempt,
      itemsAmount,
    } = this.elementsPositions.elements;

    dragableItems.forEach((item, i) => {
      item.addEventListener("dragstart", (e) => {
        this.selected = e.target;
        e.target.classList.add("puzzle__item--dragging");
      });

      cells[i].addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      cells[i].addEventListener("drop", (e) => {
        if (cells[i].children.length === 0) {
          this.selected.style.top = null;
          this.selected.style.left = null;
          this.selected.style.border = "none";

          cells[i].append(this.selected);

          if (this.selected.dataset.index === i.toString()) {
            this.points.correct = 0;
            cells.forEach((cell) => {
              cell.firstElementChild &&
                cell.dataset.index === cell.firstElementChild.dataset.index &&
                this.points.correct++;
            });
          } else {
            this.points.wrong++;
          }

          // Check if the game is over win case.
          if (this.points.correct === itemsAmount) {
            modal.style.cssText = "visibility: visible; opacity: 1;";
            attempt.textContent = this.points.wrong;
            modalBtn.addEventListener("click", () => {
              location.reload();
            });
          }

          const found = cells.find((div) => !div.firstElementChild);

          // Check if the game is over lose case.
          if (!found && this.points.correct < itemsAmount) {
            modal.style.cssText = "visibility: visible; opacity: 1;";
            modalText.textContent = "You Lost 😒 Please Try Again";
            modalBtn.addEventListener("click", () => {
              location.reload();
            });
          }
        }
      });

      cells[i].addEventListener("dragenter", (e) => {
        cells[i].classList.add("active");
      });

      cells[i].addEventListener("dragleave", (e) => {
        cells[i].classList.remove("active");
      });

      item.addEventListener("dragend", (e) => {
        e.target.classList.remove("puzzle__item--dragging");
      });
    });
  }

  /**
   * Sets up event listeners for changing the puzzle image.
   * The function allows users to change the puzzle image either by clicking
   * the "Get Random Image" button, which fetches a random image from the web,
   * or by uploading an image file via an input file element.
   * Updates the background image of the puzzle and all draggable items.
   * Resets the points to zero when a new image is uploaded.
   */

  changeImage() {
    const { puzzleImg, inputFile, dragableItems, randomImgBtn } =
      this.elementsPositions.elements;

    randomImgBtn.addEventListener("click", () => {
      loader.style.display = "flex";

      fetch("https://picsum.photos/1920/1080?random")
        .then((res) => res.blob())
        .then((blob) => {
          const imgUrl = URL.createObjectURL(blob);
          puzzleImg.style.backgroundImage = `url(${imgUrl})`;
          dragableItems.forEach((item) => {
            item.style.backgroundImage = `url(${imgUrl})`;
          });
        })
        .catch((error) => {
          puzzleImg.textContent = `Image fetch failed: ${error}`;
        })
        .finally(() => {
          loader.style.display = "none";
        });
    });

    inputFile.addEventListener("change", () => {
      const imgUrl = URL.createObjectURL(inputFile.files[0]);

      puzzleImg.style.backgroundImage = `url(${imgUrl})`;

      dragableItems.forEach((item) => {
        item.style.backgroundImage = `url(${imgUrl})`;
      });

      this.points = {
        correct: 0,
        wrong: 0,
      };
    });
  }
}

export default DragDrop;
