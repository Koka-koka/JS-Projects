class Elements {
    /**
     * Initializes the Elements class.
     * @param {number} cardsNumber - The number of cards in the game.
     */
    constructor(cardsNumber) {
        this.cardsNumber = cardsNumber;
        this.playground = document.querySelector(".playground");
        this.cardIndex = [];
        this.createCards();

        this.cards = document.querySelectorAll(".card");
        this.attempts = {
            correct: 0,
            wrong: 0,
            click: 0
        }

        this.modal = document.querySelector(".modal");
        this.modalBtn = document.querySelector(".modal__btn");
        this.wrong = document.querySelector(".wrong");
        this.restartBtn = document.querySelector(".restart-btn");
        this.timer = document.querySelector(".timer");
        this.modalTime = document.querySelector(".modal__time");

        this.restartGame();
    }

    /**
     * Populates the cardIndex array with pairs of indices.
     * Each value between 1 and cardsNumber/2 is duplicated
     * to create pairs of indices for a matching game.
     */
    doubleIndex() {
        for (let i = 1; i <= this.cardsNumber; i++) {
            i <= this.cardsNumber / 2 ? this.cardIndex.push(i) : this.cardIndex.push(i - this.cardsNumber / 2);
        }
    }

    /**
     * Shuffles the elements in the given array using a random sorting algorithm.
     * This method rearranges the array elements in a random order.
     * 
     * @param {Array} array - The array to be shuffled.
     * @returns {Array} - The shuffled array.
     */
    shuffleIndexes(array) {
        return  array.sort(() => Math.random() - 0.5);
    }

    /**
     * Creates the cards in the playground element.
     * The method populates the cardIndex array with pairs of indices and shuffles the array.
     * Then it creates the HTML elements for the cards and appends them to the playground element.
     * The method also sets the grid template rows and columns of the playground element to arrange the cards in a grid.
     */
    createCards() {
        this.playground.style.gridTemplateRows = `repeat(${Math.sqrt(this.cardsNumber)}, 1fr)`;
        this.playground.style.gridTemplateColumns = `repeat(${Math.sqrt(this.cardsNumber)}, 1fr)`;
        
        this.doubleIndex();
        this.cardIndex = this.shuffleIndexes(this.cardIndex);
        this.cardIndex.forEach((index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            const img = document.createElement("img");
            img.src = `images/icon-${index}.png`;
            card.appendChild(img);
            this.playground.appendChild(card);
        })
    }

    /**
     * Event listener for the restart button.
     * When the button is clicked, a modal will pop up asking the user if they want to quit the game.
     * If the user clicks the "Yes" button, the page will be reloaded.
     * If the user clicks the "No" button, the modal will be closed.
     */
    restartGame() {
        this.restartBtn.onclick = () => {
            this.modal.style.cssText = "visibility: visible; opacity: 1; transition: opacity 0.5s ease-in-out;";
            const modalContent = this.modal.firstElementChild;
            modalContent.innerHTML = "<h2 class='modal__text'>Do you want to quit the game?</h2><div class='modal__btns'><button class='btn yes-btn'>Yes</button><button class='btn cancel-btn'>No</button></div>";
            modalContent.querySelector(".cancel-btn").addEventListener("click", () => {
                this.modal.style.cssText = "visibility: hidden; opacity: 0; transition: opacity 0.5s ease-in-out;";
            })
            modalContent.querySelector(".yes-btn").addEventListener("click", () => {
                location.reload();
            })
        }
    }
}

export default Elements;