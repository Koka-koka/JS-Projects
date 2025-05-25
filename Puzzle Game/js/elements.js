class Elements {
  /**
   * Initializes the Elements class by selecting various DOM elements and setting up initial configurations.
   * This includes selecting puzzle items, cells, modal elements, image input, and setting the number of items.
   * It also initializes arrays for cells and draggable items, and calls the method to create these items.
   */

  constructor() {
    this.puzzleItems = document.querySelector(".puzzle__items");
    this.puzzleCells = document.querySelector(".puzzle__cells");
    this.modal = document.querySelector(".modal");
    this.modalText = document.querySelector(".modal__text");
    this.modalBtn = document.querySelector(".modal__btn");
    this.attempt = document.querySelector(".attempt");
    this.puzzleImg = document.querySelector(".puzzle__img");
    this.inputFile = document.querySelector("#input-file");
    this.randomImgBtn = document.querySelector(".random-btn");
    this.itemsAmount = 20;
    this.cells = [];
    this.dragableItems = [];

    this.createItems();
  }

  /**
   * Creates the items and cells in the puzzle game.
   * It creates this.itemsAmount number of cells and draggable items.
   * Each cell is appended to the puzzle__cells element and each draggable item is stored in the dragableItems array.
   */
  createItems() {
    for (let i = 0; i < this.itemsAmount; i++) {
      const item = document.createElement("div");
      item.classList.add("puzzle__cell");
      item.dataset.index = i;

      this.cells.push(item);

      const draggableItem = document.createElement("div");
      draggableItem.classList.add("puzzle__item");
      draggableItem.dataset.index = i;
      draggableItem.setAttribute("draggable", true);

      this.dragableItems.push(draggableItem);
    }
    this.puzzleCells.append(...this.cells);
  }
}

export default Elements;
