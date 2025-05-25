import ElementsPositions from "./ElementsPositions.js";

class DragDrop {
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

  changeImage() {
    const { puzzleImg, inputFile, dragableItems, randomImgBtn } =
      this.elementsPositions.elements;

    randomImgBtn.addEventListener("click", (e) => {
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

    inputFile.addEventListener("change", (e) => {
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
