// Function to generate scrambled letters
function generateScrambledLetters(answer) {
    const answerLetters = answer.toUpperCase().split('');
    const extraLettersCount = Math.max(3, Math.floor(answerLetters.length * 0.4));
    const commonLetters = ['A', 'E', 'I', 'O', 'U', 'S', 'T', 'N', 'R', 'D', 'L', 'C', 'M', 'P'];
    
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
        "src/A Wild Guess/axo hide.png",
        "src/A Wild Guess/axo hide.png",
        "src/A Wild Guess/axo hide.png",
        "src/A Wild Guess/axo hide.png"
      ],
      scrambledLetters: [] // Will be auto-generated
    }
    // Add more questions here...
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let usedLetters = [];
  let answerBlocks = [];
  
  // Initialize the game
  function initGame() {
    displayQuestion();
    setupInputField();
  }
  
  // ... (keep previous code until createAnswerBlocks function)

function createAnswerBlocks() {
    const answerBlocksRow1 = document.getElementById('answerBlocksRow1');
    const answerBlocksRow2 = document.getElementById('answerBlocksRow2');
    answerBlocksRow1.innerHTML = '';
    answerBlocksRow2.innerHTML = '';
    answerBlocksRow2.style.display = 'none';
    answerBlocks = [];
    
    const answer = questions[currentQuestion].answer;
    const words = answer.split(' ');
    const isTwoWords = words.length > 1;
    
    // Create blocks for first word
    words[0].split('').forEach((_, i) => {
      const block = createAnswerBlock(i);
      answerBlocksRow1.appendChild(block);
      answerBlocks.push(block);
    });
    
    // If two words, create space and second word
    if (isTwoWords) {
      // Add space indicator
      const space = document.createElement('div');
      space.className = 'answer-block space';
      answerBlocksRow1.appendChild(space);
      
      // Create blocks for second word
      words[1].split('').forEach((_, i) => {
        const block = createAnswerBlock(i + words[0].length + 1); // +1 for space
        answerBlocksRow1.appendChild(block);
        answerBlocks.push(block);
      });
    }
    
    document.querySelector('.letter-count').textContent = `0/${answer.replace(/\s/g, '').length}`;
  }
  
  function createAnswerBlock(index) {
    const block = document.createElement('div');
    block.className = 'answer-block';
    block.dataset.index = index;
    block.addEventListener('click', () => removeLetterFromBlock(block));
    return block;
  }
  
  // ... (keep previous code until displayQuestion function)
  
  // Initialize the game with the exact layout
function displayQuestion() {
    const question = questions[currentQuestion];
    
    // Generate scrambled letters if not already done
    if (question.scrambledLetters.length === 0) {
      question.scrambledLetters = generateScrambledLetters(question.answer);
    }
  
    // Update images
    const images = document.querySelectorAll('.quiz-image');
    images.forEach((img, index) => {
      img.src = question.images[index % question.images.length];
    });
  
    // Create answer blocks
    createAnswerBlocks(question.answer);
    
    // Create scrambled letters
    createScrambledLetters(question.scrambledLetters);
  }
  
  function createAnswerBlocks(answer) {
    const answerBlocksRow = document.getElementById('answerBlocksRow');
    answerBlocksRow.innerHTML = '';
    answerBlocks = [];
    
    // Split answer into words if it contains spaces
    const words = answer.split(' ');
    const isMultiWord = words.length > 1;
    
    // Create blocks for each character
    let charIndex = 0;
    words.forEach((word, wordIndex) => {
      // Add word letters
      for (let i = 0; i < word.length; i++) {
        const block = document.createElement('div');
        block.className = 'answer-block';
        block.dataset.index = charIndex++;
        block.addEventListener('click', () => removeLetterFromBlock(block));
        answerBlocksRow.appendChild(block);
        answerBlocks.push(block);
      }
      
      // Add space between words (except after last word)
      if (wordIndex < words.length - 1) {
        const space = document.createElement('div');
        space.className = 'answer-block space';
        answerBlocksRow.appendChild(space);
      }
    });
    
    document.querySelector('.letter-count').textContent = `0/${answer.replace(/\s/g, '').length}`;
  }
  
  function createScrambledLetters(letters) {
    const scrambledLettersRow = document.getElementById('scrambledLettersRow');
    scrambledLettersRow.innerHTML = '';
    
    letters.forEach((letter, index) => {
      const letterElement = document.createElement('div');
      letterElement.className = 'scrambled-letter';
      letterElement.textContent = letter;
      letterElement.dataset.index = index;
      letterElement.addEventListener('click', () => selectLetter(letterElement));
      scrambledLettersRow.appendChild(letterElement);
    });
    
    usedLetters = [];
  }
  
  // Rest of your JavaScript remains the same...
  
  // ... (keep the rest of the code the same)
  
  // Handle letter selection from scrambled letters
  function selectLetter(letterElement) {
    if (letterElement.classList.contains('used')) return;
    
    // Find first empty answer block
    const emptyBlock = answerBlocks.find(block => !block.textContent);
    if (!emptyBlock) return;
    
    emptyBlock.textContent = letterElement.textContent;
    emptyBlock.classList.add('filled');
    letterElement.classList.add('used');
    usedLetters.push({letterElement, block: emptyBlock});
    
    updateLetterCount();
  }
  
  // Handle removing letter from answer block
  function removeLetterFromBlock(block) {
    if (!block.textContent) return;
    
    const letter = block.textContent;
    block.textContent = '';
    block.classList.remove('filled');
    
    // Find and restore the used letter
    const usedLetterIndex = usedLetters.findIndex(item => item.block === block);
    if (usedLetterIndex !== -1) {
      usedLetters[usedLetterIndex].letterElement.classList.remove('used');
      usedLetters.splice(usedLetterIndex, 1);
    }
    
    updateLetterCount();
  }
  
  // Update letter count
  function updateLetterCount() {
    const filledCount = answerBlocks.filter(block => block.textContent).length;
    const totalCount = answerBlocks.length;
    document.querySelector('.letter-count').textContent = `${filledCount}/${totalCount}`;
    document.getElementById('confirmBtn').disabled = filledCount !== totalCount;
  }
  
  // Setup keyboard input
  function setupInputField() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace') {
        // Find last filled block
        const filledBlocks = answerBlocks.filter(block => block.textContent);
        if (filledBlocks.length > 0) {
          removeLetterFromBlock(filledBlocks[filledBlocks.length - 1]);
        }
      }
    });
  }
  
  // Confirm answer
  document.getElementById('confirmBtn').addEventListener('click', function() {
    const userAnswer = answerBlocks.map(block => block.textContent).join('');
    const correctAnswer = questions[currentQuestion].answer;
    const resultMessage = document.getElementById('resultMessage');
    
    if (userAnswer === correctAnswer) {
      resultMessage.textContent = "Correct!";
      resultMessage.style.color = "green";
      score++;
    } else {
      resultMessage.textContent = `Incorrect! The answer was ${correctAnswer}`;
      resultMessage.style.color = "red";
    }
    
    // Move to next question or end game
    setTimeout(() => {
      resultMessage.textContent = "";
      currentQuestion++;
      
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        endGame();
      }
    }, 1500);
  });
  
  // End game and show results
  function endGame() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('resultModal').style.display = "block";
  }
  
  // Restart game
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('resultModal').style.display = "none";
    displayQuestion();
  }
  
  // Initialize the game when page loads
  window.onload = initGame;