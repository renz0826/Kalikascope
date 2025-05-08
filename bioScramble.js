// Function to generate scrambled letters
function generateScrambledLetters(answer) {
        const answerLetters = answer.replace(/\s/g, '').toUpperCase().split('');
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
                "src/scramble/biodiversity/istockphoto-539675480-1024x1024.jpg",
                "src/scramble/biodiversity/istockphoto-1136053333-1024x1024.jpg",
                "src/scramble/biodiversity/istockphoto-1300080105-1024x1024.jpg",
                "src/scramble/biodiversity/istockphoto-1445720558-1024x1024.jpg"
            ],
            scrambledLetters: [] // Will be auto-generated
        },

        {
                answer: "BIOSAFETY",
                images: [
                    "src/A Wild Guess/axo hide.png",
                    "src/A Wild Guess/axo hide.png",
                    "src/A Wild Guess/axo hide.png",
                    "src/A Wild Guess/axo hide.png"
                ],
                scrambledLetters: [] // Will be auto-generated
            },

            {
                answer: "BIOTECH",
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
        // Set the total questions count
        document.getElementById('totalQuestions').textContent = questions.length;
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
        document.querySelector('.awg-top h2').textContent = `${currentQuestion + 1} of ${questions.length}`;
        
        // Update images
        const images = document.querySelectorAll('.frPicImg');
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
        const isMultiWord = words.length > 1;
        const totalLetters = answer.replace(/\s/g, '').length; // Count letters excluding spaces
        
        // Update the letter count display
        document.querySelector('.letter-count').textContent = `0/${totalLetters}`;
        
        // Create blocks for each character
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
                answerBlocksRow1.appendChild(space);
            }
        });
    }
    
    function createScrambledLetters(letters) {
        const scrambledLettersContainer = document.querySelector('.scrambled-letters');
        scrambledLettersContainer.innerHTML = '';
        
        letters.forEach((letter, index) => {
            const letterElement = document.createElement('div');
            letterElement.className = 'scrambled-letter';
            letterElement.textContent = letter;
            letterElement.dataset.index = index;
            letterElement.addEventListener('click', () => selectLetter(letterElement));
            scrambledLettersContainer.appendChild(letterElement);
        });
        
        usedLetters = [];
    }
    
    // Handle letter selection from scrambled letters
    function selectLetter(letterElement) {
        if (letterElement.classList.contains('used')) return;
        
        // Find first empty answer block
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
        if (!block.textContent || block.classList.contains('space')) return;
        
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
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace') {
                const filledBlocks = answerBlocks.filter(block => 
                    block.textContent && !block.classList.contains('space')
                );
                
                if (filledBlocks.length > 0) {
                    removeLetterFromBlock(filledBlocks[filledBlocks.length - 1]);
                }
            }
        });
        
        // Confirm button
        document.getElementById('confirmBtn').addEventListener('click', confirmAnswer);
    }
    
    // Confirm answer
    function confirmAnswer() {
        const userAnswer = answerBlocks
            .filter(block => !block.classList.contains('space'))
            .map(block => block.textContent)
            .join('');
        
        const correctAnswer = questions[currentQuestion].answer.replace(/\s/g, '');
        const resultMessage = document.getElementById('resultMessage');
        const wrongAnswerPopup = document.getElementById('wrongAnswerPopup');
        
        if (userAnswer === correctAnswer) {
            resultMessage.textContent = "Correct!";
            resultMessage.style.color = "green";
            score++;
            
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
        } else {
            // Show wrong answer popup
            wrongAnswerPopup.classList.add('show');
            
            // Hide after 2 seconds
            setTimeout(() => {
                wrongAnswerPopup.classList.remove('show');
            }, 2000);
            
            // Also show in result message
            resultMessage.textContent = `Incorrect! The answer was ${questions[currentQuestion].answer}`;
            resultMessage.style.color = "red";
            
            // Clear the message after 3 seconds
            setTimeout(() => {
                resultMessage.textContent = "";
            }, 3000);
        }
    }
    
    // End game and show results
    function endGame() {
        document.getElementById('finalScore').textContent = score;
        document.getElementById('totalQuestions').textContent = questions.length;
        document.getElementById('resultModal').style.display = "block";
    }
    
    // Restart game
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('resultModal').style.display = "none";
        document.getElementById('wrongAnswerPopup').classList.remove('show');
        displayQuestion();
    }
    
    // Initialize the game when page loads
    window.onload = initGame;