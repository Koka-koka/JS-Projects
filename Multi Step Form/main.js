// Selecting Dom elements
const nextBtn = document.querySelector(".btn--next"); // Selecting the next button
const prevBtn = document.querySelector(".btn--prev"); // Selecting the previous button
const submitBtn = document.querySelector(".btn--submit"); // Selecting the submit button
const progressSteps = document.querySelectorAll(".progress__step"); // Selecting the progress steps
const separators = document.querySelectorAll(".separator"); // Selecting the separators
const formSteps = document.querySelectorAll(".form__step"); // Selecting the form steps

// Initializing the active form step
let activeFormStep = 0;

// Initializing the active progress step
let activeProgressStep = 1;

// Initializing the active separator
let activeSeparator = 0;

// Disabling the submit button
submitBtn.disabled = true;

/**
 * Update form, progressbar and separator when next button is clicked
 */
nextBtn.addEventListener("click", () => {
  activeFormStep++;
  activeProgressStep++;
  activeSeparator++;
  if (activeFormStep >= formSteps.length - 1) {
    activeFormStep = formSteps.length - 1;
    activeProgressStep = progressSteps.length;
    nextBtn.disabled = true;
    submitBtn.disabled = false;
  }
  updateForm();
  updateProgress();
  updateSeparator();
  prevBtn.disabled = false;
});

/**
 * Update form, progressbar and separator when previous button is clicked
 */
prevBtn.addEventListener("click", () => {
  activeFormStep--;
  activeProgressStep--;
  activeSeparator--;
  if (activeFormStep === 0) {
    activeFormStep = 0;
    activeProgressStep = 1;
    prevBtn.disabled = true;
  }
  nextBtn.disabled = false;
  submitBtn.disabled = true;
  updateForm();
  updateProgress();
  updateSeparator();
});

/**
 * Update form based on activeFormStep
 */
function updateForm() {
  formSteps.forEach((formStep, index) => {
    formStep.classList.remove("active");
    if (index === activeFormStep) {
      formStep.classList.add("active");
    }
  });
}

/**
 * Update progressbar based on activeProgressStep
 */
function updateProgress() {
  progressSteps.forEach((progressStep, index) => {
    progressStep.classList.remove("active");
    if (index < activeProgressStep || index === 0) {
      progressStep.classList.add("active");
    }
  });
}

/**
 * Update separator based on activeSeparator
 */
function updateSeparator() {
  separators.forEach((sep, index) => {
    sep.classList.remove("active");
    if (index < activeSeparator) {
      sep.classList.add("active");
    }
  });
}
