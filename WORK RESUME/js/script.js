const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

navSlide();

// Typing effect
const typing = document.querySelector('.typing');
const words = ["Specialist", "Engineer", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);

    typing.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 200);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 100);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1200);
    }
}

type();

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = '✅ Thanks, I’ll get back to you soon!';
                formStatus.className = 'success-message';
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.innerHTML = responseData.errors.map(error => error.message).join(', ');
                } else {
                    formStatus.innerHTML = '❌ Oops! There was a problem submitting your form. Please check your input.';
                }
                formStatus.className = 'error-message';
            }
        } catch (error) {
            formStatus.innerHTML = '❌ Oops! There was a problem submitting your form.';
            formStatus.className = 'error-message';
        }
    });
}