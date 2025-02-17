const textElement = document.querySelector(".typing-text");
const texts = [
    "Software Developer!",
    "Frontend Developer!",
    "Java Programmer!",
    "Graphics Designer!"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 400; // Speed of typing (lower = faster)
let deletingSpeed = 5; // Speed of deleting
let pauseTime = 1500; // Pause before deleting

function typeEffect() {
    let currentText = texts[textIndex];

    if (!isDeleting) {
        textElement.innerHTML = currentText.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime); // Pause before deleting
            return;
        }
    } else {
        charIndex--;
        textElement.innerHTML = currentText.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to next text
        }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);
