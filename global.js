function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileOverlay');
    const logo = document.querySelector('.logo');
    const isOpen = menu.classList.contains('active');

    if (!isOpen) {
      menu.classList.add('active');
      overlay.classList.add('active');
      logo.classList.add('animate-logo');
      document.addEventListener('click', handleOutsideClick);
    } else {
      closeMenu();
    }
  }

    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('active');
      document.getElementById('mobileOverlay').classList.remove('active');
      document.querySelector('.logo').classList.remove('animate-logo');
      document.removeEventListener('click', handleOutsideClick);
    }

  
    function handleOutsideClick(event) {
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('hamburgerIcon');
  
      if (!menu.contains(event.target) && !icon.contains(event.target)) {
        closeMenu();
      }
    }


// Add this to global.js
const quizData = [
  {
    hide: 'axo hide.png',
    reveal: 'axo reveal.png',
    correctAnswer: 'Axolotl',
    choices: ['Axolotl', 'Salamander', 'Newt', 'Lizard']
  },
  {
    hide: 'all hide.png',
    reveal: 'all reveal.png',
    correctAnswer: 'Alligator',
    choices: ['Alligator', 'Crocodile', 'Lizard', 'Turtle']
  },
  {
    hide: 'croc hide.png',
    reveal: 'croc reveal.png',
    correctAnswer: 'Crocodile',
    choices: ['Crocodile', 'Alligator', 'Lizard', 'Snake']
  },
  {
    hide: 'gir hide.png',
    reveal: 'gir reveal.png',
    correctAnswer: 'Giraffe',
    choices: ['Giraffe', 'Deer', 'Camel', 'Horse']
  },
  {
    hide: 'hor hide.png',
    reveal: 'hor reveal.png',
    correctAnswer: 'Horse',
    choices: ['Horse', 'Donkey', 'Zebra', 'Cow']
  },
  {
    hide: 'nar hide.png',
    reveal: 'nar reveal.png',
    correctAnswer: 'Narwhal',
    choices: ['Narwhal', 'Beluga Whale', 'Dolphin', 'Seal']
  },
  {
    hide: 'pan hide.png',
    reveal: 'pan reveal.png',
    correctAnswer: 'Panda',
    choices: ['Panda', 'Bear', 'Raccoon', 'Dog']
  },
  {
    hide: 'plat hide.png',
    reveal: 'plat reveal.png',
    correctAnswer: 'Platypus',
    choices: ['Platypus', 'Beaver', 'Otter', 'Mole']
  },
  {
    hide: 'squ hide.png',
    reveal: 'squ reveal.png',
    correctAnswer: 'Squid',
    choices: ['Squid', 'Octopus', 'Jellyfish', 'Starfish']
  },
  {
    hide: 'tar hide.png',
    reveal: 'tar reveal.png',
    correctAnswer: 'Tarsier',
    choices: ['Tarsier', 'Lemur', 'Monkey', 'Cat']
  }
];

// Shuffle function to randomize the quizData array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function initializeQuiz() {
  const quizForm = document.getElementById('quizForm');
  const currentImage = document.getElementById('currentImage');
  const confirmBtn = document.getElementById('confirmBtn');
  
  // Clear previous choices
  quizForm.innerHTML = '';
  
  // Set current image
  currentImage.src = `src/A Wild Guess/${quizData[currentQuestion].hide}`;
  
  shuffleArray(quizData[currentQuestion].choices);

  // Create radio buttons
  quizData[currentQuestion].choices.forEach((choice, index) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'choice-item';
    wrapper.innerHTML = `
    <label class="choice-label">
      <input type="radio" name="animal" id="choice${index}" value="${choice}">
      <span>${choice}</span>
    </label>
  `;
    
    wrapper.querySelector('input').addEventListener('change', (e) => {
      document.querySelectorAll('.choice-item').forEach(item => {
        item.classList.remove('selected');
      });
      if (e.target.checked) {
        wrapper.classList.add('selected');
        confirmBtn.disabled = false;
      }
    });
    
    quizForm.appendChild(wrapper);
  });

  // Update question number
  document.querySelector('h2').textContent = `${currentQuestion + 1} of 10`;
}

function showResult(isCorrect) {
  const resultMessage = document.getElementById('resultMessage');
  resultMessage.textContent = isCorrect ? 'Correct! 🎉' : 'Wrong answer 😢';
  resultMessage.style.color = isCorrect ? '#4CAF50' : '#ff4444';

  // Add the active class to make it visible
  resultMessage.classList.add('active');

  // Show correct answer and highlight the selected choice
  document.querySelectorAll('.choice-item').forEach(item => {
    const input = item.querySelector('input');
    const value = input.value;

    if (value === quizData[currentQuestion].correctAnswer) {
      item.classList.add('correct');
    } else if (input.checked) {
      item.classList.add('incorrect');
    }

    input.disabled = true;
  });

  document.getElementById('confirmBtn').disabled = true;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    initializeQuiz();
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('confirmBtn').disabled = true;
  } else {
    showFinalResults();
  }
}

function showFinalResults() {
  const modal = document.getElementById('resultModal');
  document.getElementById('finalScore').textContent = score;
  modal.style.display = 'block';

  document.body.classList.add('body-no-scroll');

}

function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
  document.body.classList.remove('body-no-scroll');
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  
  // Shuffle the quizData array
  shuffleArray(quizData);
  
  const resultMessage = document.getElementById('resultMessage');
  resultMessage.textContent = ''; // Clear the text
  resultMessage.classList.remove('active'); // Remove the active class

  closeModal();
  initializeQuiz();
}

// Shuffle the quizData array on page load
shuffleArray(quizData);

// Initialize first question
initializeQuiz();

// Confirm button handler
document.getElementById('confirmBtn').addEventListener('click', () => {
  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn.disabled) return; // Prevent multiple clicks

  const selected = document.querySelector('input[name="animal"]:checked');
  if (!selected) return;

  const isCorrect = selected.value === quizData[currentQuestion].correctAnswer;
  if (isCorrect) score++;
  
  // Show result
  showResult(isCorrect);
  
  // Fade image transition
  const image = document.getElementById('currentImage');
  image.style.opacity = 0;
  setTimeout(() => {
    image.src = `src/A Wild Guess/${quizData[currentQuestion].reveal}`;
    image.style.opacity = 1;
  }, 500);

  // Proceed after delay
  setTimeout(nextQuestion, 2000);
});