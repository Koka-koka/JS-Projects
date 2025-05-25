import Elements from "./Elements.js";

class ElementsPositions {
  /**
   * Initializes an instance of the ElementsPositions class.
   * Sets up the elements and predefined positions for the puzzle items.
   * Invokes the addDraggableItems method to append and position the items.
   */

  constructor() {
    this.elements = new Elements();
    this.leftPositions = [0, 8, 16, 24, 32];
    this.topPositions = [0, 6, 12, 18];

    this.addDraggableItems();
  }

  /**
   * Shuffles the elements in the given array using a random sorting algorithm.
   * This method rearranges the array elements in a random order.
   * @param {Array} array - The array to be shuffled.
   * @returns {Array} - The shuffled array.
   */
  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  /**
   * Generates an array of positions for the background image.
   * The array is composed of subarrays, each containing the top and left positions of the background image.
   * The top positions are taken from the topPositions array, and the left positions are taken from the leftPositions array.
   * The positions are flattened from a 2D array to a 1D array.
   * @returns {Array} - An array of positions for the background image.
   */
  bgPositions() {
    return this.topPositions.flatMap((topPosition) =>
      this.leftPositions.map((leftPosition) => [topPosition, leftPosition])
    );
  }

  /**
   * Returns an array of positions for the background image, shuffled randomly.
   * The positions are shuffled from the array of positions returned by the bgPositions() method.
   * @returns {Array} - An array of positions for the background image.
   */
  shufflePositions() {
    return this.shuffle(this.bgPositions());
  }

  /**
   * Appends the dragable items to the puzzle items container and positions them at a random position.
   * The position of the background image is set to the positions of the BG image.
   * The top and left positions of each item are set to a random value from the shuffled positions array.
   */
  addDraggableItems() {
    const { puzzleItems, dragableItems } = this.elements;
    const shuffledPositions = this.shufflePositions();
    const bgPositions = this.bgPositions();

    dragableItems.forEach((item, i) => {
      puzzleItems.append(item);
      item.style.backgroundImage = `url('images/img-1.jpg')`;
      item.style.backgroundPosition = `-${bgPositions[i][1]}vw -${bgPositions[i][0]}vw`;
      item.style.top = `${shuffledPositions[i][0]}vw`;
      item.style.left = `${shuffledPositions[i][1]}vw`;
    });
  }
}

export default ElementsPositions;
