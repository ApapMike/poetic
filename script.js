// Login Page Logic
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value.toLowerCase();
    const errorMessage = document.getElementById('errorMessage');

    // The password is the last word of the poem: "too"
    if (passwordInput === "08/13") {
        window.location.href = "success.html"; // Redirect to success page
    } else {
        errorMessage.classList.remove('hidden');
    }
}


let selectedPiece = null;

// Function to handle piece selection and swapping
function selectPiece(piece) {
    if (!selectedPiece) {
        // Select the first piece
        selectedPiece = piece;
        piece.classList.add('selected');
    } else {
        // Swap the selected piece with the clicked piece
        if (selectedPiece === piece) {
            // Deselect if the same piece is clicked again
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
        } else {
            // Swap the data-order attributes
            const tempOrder = selectedPiece.getAttribute('data-order');
            selectedPiece.setAttribute('data-order', piece.getAttribute('data-order'));
            piece.setAttribute('data-order', tempOrder);

            // Swap the inner text (optional, if you want to display numbers)
            const tempText = selectedPiece.textContent;
            selectedPiece.textContent = piece.textContent;
            piece.textContent = tempText;

            // Deselect both pieces
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
        }
    }
}

// Add click event listeners to puzzle pieces
document.querySelectorAll('.puzzle-piece').forEach(piece => {
    piece.addEventListener('click', () => selectPiece(piece));
});

// Puzzle Validation Logic
function checkPuzzle() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const puzzleMessage = document.getElementById('puzzleMessage');
    const blurredPhoto = document.getElementById('blurredPhoto');

    let isCorrect = true;
    puzzlePieces.forEach((piece, index) => {
        if (piece.getAttribute('data-order') != index + 1) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        blurredPhoto.style.filter = 'blur(0)'; // Unblur the image
        puzzleMessage.textContent = "Perfect! The image is now clear.";
        puzzleMessage.classList.remove('hidden');

        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        puzzleMessage.textContent = "Incorrect arrangement. Try again!";
        puzzleMessage.classList.remove('hidden');
    }
}
// Music Controls
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeToggleBtn = document.getElementById('volumeToggleBtn');
const volumeSliderContainer = document.getElementById('volumeSliderContainer');
const volumeControl = document.getElementById('volumeControl');

// Play/Pause Button
playPauseBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        bgMusic.pause();
        playPauseBtn.textContent = '▶️';
    }
});

// Volume Toggle Button
volumeToggleBtn.addEventListener('click', () => {
    volumeSliderContainer.classList.toggle('visible');
});

// Volume Control
volumeControl.addEventListener('input', () => {
    bgMusic.volume = volumeControl.value;
});


// Function to create a heart
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    // Randomize horizontal position
    const randomLeft = Math.random() * window.innerWidth;
    heart.style.left = `${randomLeft}px`;

    // Randomize animation duration (5s to 15s)
    const randomDuration = 5 + Math.random() * 10;
    heart.style.animationDuration = `${randomDuration}s`;

    // Append the heart to the hearts container
    document.querySelector('.hearts').appendChild(heart);

    // Remove the heart after the animation ends
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Function to generate hearts at intervals
function generateHearts() {
    setInterval(createHeart, 1000); // Create a new heart every 1 second
}

// Start generating hearts when the page loads
window.addEventListener('load', () => {
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('hearts');
    document.body.appendChild(heartsContainer);
    generateHearts();
});



// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add the 'visible' class to lines in the viewport
function animateLines() {
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        if (isInViewport(line)) {
            line.classList.add('visible');
        }
    });
}

// Add event listener for scroll
window.addEventListener('scroll', animateLines);

// Trigger the animation on page load
window.addEventListener('load', animateLines);