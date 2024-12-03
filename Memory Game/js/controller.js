import Elements from "./elements.js";

class Controller {
    /**
     * Initializes the game with a given number of cards.
     *
     * @param {Number} cardsNumber - The number of cards in the game.
     */
    constructor(cardsNumber) {
        this.elements = new Elements(cardsNumber);
        this.prevCard = null;
        this.startClock = true;
        this.time;
        this.clickCard();
    }


    /**
     * Sets up event listeners on each card element. When a card is clicked
     * it toggles the "active" class on the card, sets the timer, and
     * increments the number of clicks. If two cards have been clicked, it
     * checks if the indices of the two cards match and either adds the
     * "stop" class to both cards or removes the "active" class after a
     * delay. If the number of correct attempts equals the number of cards
     * divided by two, the game is over and the modal is displayed.
     */
    clickCard(){
        const {cards, attempts} = this.elements;

        cards.forEach(card => {
            card.addEventListener("click", (e) => {
                e.preventDefault();
                this.startClock && this.setTime();
                card.classList.toggle("active");
                attempts.click++;

                if(attempts.click === 2){
                   cards.forEach(card => {
                       card.classList.add("pause");
                       setTimeout(() => {
                           card.classList.remove("pause");
                       }, 1000)
                   })
                   if(this.prevCard){
                       if(this.prevCard.dataset.index === card.dataset.index){
                           attempts.correct++;
                           card.classList.add("stop");
                           this.prevCard.classList.add("stop");
                       }else {
                           attempts.wrong++;
                           setTimeout(() => {
                            card.classList.remove("active");
                            this.prevCard.classList.remove("active");
                           }, 1000);
                       }
                   }
                   attempts.click = 0;
                   this.endGame(attempts);
                }else {
                    this.prevCard = card;
                }
                this.startClock = false;
            })
        })
    }

    /**
     * Ends the game if the number of correct attempts equals half of the total
     * number of cards. If the game is over, it displays the modal, stops the
     * timer, and sets up a reload button.
     *
     * @param {Object} {correct} - An object with one property, "correct", the
     * number of correct attempts.
     */
    endGame({correct}) {
        const {cardsNumber, modal, modalBtn, wrong, attempts, timer, modalTime} = this.elements;

        if(correct === cardsNumber / 2){
            this.startClock = true;
            this.stopTime();
            modal.style.cssText = "visibility: visible; opacity: 1;";
            const timerClone = timer.cloneNode(true);
            modalTime.append(timerClone);
            wrong.textContent = attempts.wrong;
            modalBtn.addEventListener("click", () => {
                location.reload();
            }) 
        } else {
            console.log("Game Not Over");
        }
    }

    /**
     * Starts the timer and increments the time by one second every second.
     * Updates the timer element in the DOM with the current time.
     * @private
     */
    setTime() {
        let int = 1;
        const {timer} = this.elements;
        this.time = setInterval(() => {
            const seconds = int % 60;
            timer.children[1].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
            const minutes = Math.floor(int / 60);
            timer.children[0].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
            int++;
        }, 1000)
    }

    /**
     * Stops the timer by clearing the interval set by setTime.
     * This prevents the timer from incrementing further.
     */
    stopTime() {
        clearInterval(this.time);
    }
}

export default Controller;