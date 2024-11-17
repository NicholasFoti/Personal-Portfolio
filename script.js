// Toggle Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const sendButton = document.getElementById('send-button');
    const modal = document.getElementById('myModal');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        sendButton.innerHTML = '<span class="spinner"></span>';
        sendButton.disabled = true;

        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        try {
            const response = await fetch('/.netlify/functions/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(templateParams),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                modal.style.display = "block";
                contactForm.reset();
            } else {
                console.error('Error:', result.error);
                alert('Failed to send the email. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            sendButton.innerHTML = 'Send Message';
            sendButton.disabled = false;
        }
    });
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typewriter-text');
    const text = textElement.textContent;
    const typingSpeed = 99;

    let index = 0;
    textElement.textContent = '';

    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    typeWriter();
});

// Smooth Scroll for Anchor Links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (hash !== '') {
            e.preventDefault();

            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            });

            // Update the URL hash without jumping
            history.pushState(null, null, hash);

            // Close mobile menu after click (if applicable)
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Filter and show/hide cards using CSS classes
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});


document.querySelectorAll('.navigation-dots .dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Add scroll event listener to highlight the active section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 250; // Adjust this value to trigger sooner
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('.navigation-dots .dot').forEach(dot => {
                dot.classList.remove('active');
                if (document.querySelector(dot.getAttribute('href')) === section) {
                    dot.classList.add('active');
                }
            });
        }
    });
});