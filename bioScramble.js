function generateScrambledLetters(answer) {
    // Get letters without spaces for scrambling
    const answerLetters = answer.toUpperCase().replace(/\s/g, '').split('');
    const extraLettersCount = Math.max(3, Math.floor(answerLetters.length * 0.4));
    const commonLetters = ['A','E','I','O','U','S','T','N','R','D','L','C','M','P'];
  
    const extraLetters = [];
    for (let i = 0; i < extraLettersCount; i++) {
      const randomLetter = commonLetters[Math.floor(Math.random() * commonLetters.length)];
      extraLetters.push(randomLetter);
    }
  
    const allLetters = [...answerLetters, ...extraLetters];
    
    // Shuffle the letters
    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }
  
    return allLetters;
  }

// Game data
const questions = [
  {
    answer: "BIODIVERSITY",
    images: [
      "src/scramble/biodiversity/istockphoto-539675480-1024x1024.jpg",
      "src/scramble/biodiversity/istockphoto-1136053333-1024x1024.jpg",
      "src/scramble/biodiversity/istockphoto-1300080105-1024x1024.jpg",
      "src/scramble/biodiversity/istockphoto-1445720558-1024x1024.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "BIOSAFETY",
    images: [
      "src/scramble/biosafety/istockphoto-1173376974-1024x1024.jpg",
      "src/scramble/biosafety/istockphoto-1203788642-1024x1024.jpg",
      "src/scramble/biosafety/istockphoto-1211986569-1024x1024.jpg",
      "src/scramble/biosafety/istockphoto-1310182640-1024x1024.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "BIOTECH",
    images: [
      "src/scramble/biotech/360_F_962990767_zzuzVekYPobTpOc4DIVZ7IyCH7G2gncq.jpg",
      "src/scramble/biotech/360_F_979422306_2gDer0iMRnKU5COnjzp4Oy57iM9D0mpV.jpg",
      "src/scramble/biotech/biotechnology-picture-id169999232.jpg",
      "src/scramble/biotech/close-up-picture-of-microscope-in-the-laboratory.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "CLIMATE CHANGE",
    images: [
      "src/scramble/climate-change/360_F_431934985_OSfhQfnhUWUG5TqiYaJFPgrN6RR3byXq.jpg",
      "src/scramble/climate-change/change-of-scene.jpg",
      "src/scramble/climate-change/images_of_change.jpg",
      "src/scramble/climate-change/polar-bear-on-pack-ice.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "ECOSYSTEM",
    images: [
      "src/scramble/ecosystem/1334534_t.jpg",
      "src/scramble/ecosystem/1729613_t.jpg",
      "src/scramble/ecosystem/1744534_t.jpg",
      "src/scramble/ecosystem/1813784_t.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "FERTILIZER",
    images: [
      "src/scramble/fertilizer/360_F_80825892_QZQfqCUoAQLfNNyarQd3RA0JQS9ANWse.jpg",
      "src/scramble/fertilizer/applying-fertilizer.jpg",
      "src/scramble/fertilizer/fertilizer-spreader-with-pellets-spraying-on-grass.jpg",
      "src/scramble/fertilizer/riding-spreader-applying-fertilizer-and-weed-control.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "GENETICS",
    images: [
      "src/scramble/genetics/gettyimages-151060183-612x612.jpg",
      "src/scramble/genetics/gettyimages-645381867-612x612.jpg",
      "src/scramble/genetics/gettyimages-1367124795-612x612.jpg",
      "src/scramble/genetics/gettyimages-1703790414-612x612.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "IMMUNE SYSTEM",
    images: [
      "src/scramble/immune-system/360_F_332404488_zIUoVF7sHTLNkxbR9hgguNg5C4oZLglA.jpg",
      "src/scramble/immune-system/body-defense.jpg",
      "src/scramble/immune-system/happy-woman-in-fall.jpg",
      "src/scramble/immune-system/virus-attack-defend-from-the-virus-concept.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "MALNUTRITION",
    images: [
      "src/scramble/malnutrition/360_F_547372960_wG3ZSHFKvM2fSS5NPWHjIejdPyiTs8a9.jpg",
      "src/scramble/malnutrition/360_F_643704522_Tt2T8Q6EFnWrQ6fC51WZJCqhRKWa4f5X.jpg",
      "src/scramble/malnutrition/360_F_1230501417_zQTiWD31Cb8zJcp4IpWVQ8CYAODPNETt.jpg",
      "src/scramble/malnutrition/african-kid.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },

  {
    answer: "NUTRITION",
    images: [
      "src/scramble/nutrition/360_F_1247144629_qV7R6LxQObnUBK0O0PuDKrfsfb6Wbd6S.jpg",
      "src/scramble/nutrition/healthy-balanced-nutrition-concept-food-plate-stethoscope-blue-wall-top-view_114106-1851.jpg",
      "src/scramble/nutrition/researching-vegetables.jpg",
      "src/scramble/nutrition/smoothie-3697014_640.jpg",
    ],
    scrambledLetters: [], // Will be auto-generated
  },
  // Add more questions here...
];

let currentQuestion = 0;
let score = 0;
let usedLetters = [];
let answerBlocks = [];

// Initialize the game
function initGame() {
  // Set the total questions count
  document.getElementById("totalQuestions").textContent = questions.length;
  displayQuestion();
  setupEventListeners();
}

// Display current question
function displayQuestion() {
  const question = questions[currentQuestion];

  // Generate scrambled letters if not already done
  if (question.scrambledLetters.length === 0) {
    question.scrambledLetters = generateScrambledLetters(question.answer);
  }

  // Update question counter
  document.querySelector(".awg-top h2").textContent = `${
    currentQuestion + 1
  } of ${questions.length}`;

  // Update images
  const images = document.querySelectorAll(".frPicImg");
  images.forEach((img, index) => {
    img.src = question.images[index % question.images.length];
  });

  // Create answer blocks
  createAnswerBlocks(question.answer);

  // Create scrambled letters
  createScrambledLetters(question.scrambledLetters);
}

function createAnswerBlocks(answer) {
    const answerBlocksRow1 = document.getElementById('answerBlocksRow1');
    answerBlocksRow1.innerHTML = '';
    answerBlocks = [];
  
    const words = answer.split(' ');
    const totalLetters = answer.replace(/\s/g, '').length;
  
    // Update letter count (excluding spaces)
    document.querySelector('.letter-count').textContent = `0/${totalLetters}`;
  
    // Create blocks for each character with spaces
    let charIndex = 0;
    words.forEach((word, wordIndex) => {
      // Add word letters
      for (let i = 0; i < word.length; i++) {
        const block = document.createElement('div');
        block.className = 'answer-block';
        block.dataset.index = charIndex++;
        block.addEventListener('click', () => removeLetterFromBlock(block));
        answerBlocksRow1.appendChild(block);
        answerBlocks.push(block);
      }
  
      // Add space between words (except after last word)
      if (wordIndex < words.length - 1) {
        const space = document.createElement('div');
        space.className = 'answer-block space';
        space.textContent = ' '; // Visual space
        answerBlocksRow1.appendChild(space);
        answerBlocks.push(space);
      }
    });
  }

function createScrambledLetters(letters) {
  const scrambledLettersContainer =
    document.querySelector(".scrambled-letters");
  scrambledLettersContainer.innerHTML = "";

  letters.forEach((letter, index) => {
    const letterElement = document.createElement("div");
    letterElement.className = "scrambled-letter";
    letterElement.textContent = letter;
    letterElement.dataset.index = index;
    letterElement.addEventListener("click", () => selectLetter(letterElement));
    scrambledLettersContainer.appendChild(letterElement);
  });

  usedLetters = [];
}

// Handle letter selection from scrambled letters
function selectLetter(letterElement) {
    if (letterElement.classList.contains('used')) return;
  
    // Find first empty non-space block
    const emptyBlock = answerBlocks.find(block => 
      !block.textContent && !block.classList.contains('space')
    );
  
    if (emptyBlock) {
      emptyBlock.textContent = letterElement.textContent;
      emptyBlock.classList.add('filled');
      letterElement.classList.add('used');
      usedLetters.push({letterElement, block: emptyBlock});
      updateLetterCount();
    }
  }

// Handle removing letter from answer block
function removeLetterFromBlock(block) {
  if (!block.textContent || block.classList.contains("space")) return;

  const letter = block.textContent;
  block.textContent = "";
  block.classList.remove("filled");

  // Find and restore the used letter
  const usedLetterIndex = usedLetters.findIndex((item) => item.block === block);
  if (usedLetterIndex !== -1) {
    usedLetters[usedLetterIndex].letterElement.classList.remove("used");
    usedLetters.splice(usedLetterIndex, 1);
  }

  updateLetterCount();
}

// Update letter count
function updateLetterCount() {
    const filledCount = answerBlocks.filter(block => 
      block.textContent && !block.classList.contains('space')
    ).length;
  
    const totalCount = questions[currentQuestion].answer.replace(/\s/g, '').length;
    document.querySelector('.letter-count').textContent = `${filledCount}/${totalCount}`;
    document.getElementById('confirmBtn').disabled = filledCount !== totalCount;
  }

// Setup event listeners
function setupEventListeners() {
  // Backspace key support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      const filledBlocks = answerBlocks.filter(
        (block) => block.textContent && !block.classList.contains("space")
      );

      if (filledBlocks.length > 0) {
        removeLetterFromBlock(filledBlocks[filledBlocks.length - 1]);
      }
    }
  });

  // Confirm button
  document
    .getElementById("confirmBtn")
    .addEventListener("click", confirmAnswer);
}

// Confirm answer
// Confirm answer
function confirmAnswer() {
  // Build user answer including spaces
  let userAnswer = '';
  answerBlocks.forEach(block => {
    if (block.classList.contains('space')) {
      userAnswer += ' ';
    } else {
      userAnswer += block.textContent;
    }
  });

  const correctAnswer = questions[currentQuestion].answer;
  const resultMessage = document.getElementById('resultMessage');
  const wrongAnswerPopup = document.getElementById('wrongAnswerPopup');

  if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
    // Correct answer handling
    resultMessage.textContent = 'Correct!';
    resultMessage.style.color = 'green';
    score++;
    
    setTimeout(() => {
      resultMessage.textContent = '';
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        endGame();
      }
    }, 1500);
  } else {
    // Wrong answer handling
    resultMessage.textContent = '';
    wrongAnswerPopup.classList.add('show');
    
    // Hide the popup after 2 seconds (matches the CSS animation duration)
    setTimeout(() => {
      wrongAnswerPopup.classList.remove('show');
    }, 2000);
  }
}

// End game and show results
function endGame() {
  document.getElementById("finalScore").textContent = score;
  document.getElementById("totalQuestions").textContent = questions.length;
  document.getElementById("resultModal").style.display = "block";
}

// Restart game
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("wrongAnswerPopup").classList.remove("show");
  displayQuestion();
}

// Initialize the game when page loads
window.onload = initGame;
