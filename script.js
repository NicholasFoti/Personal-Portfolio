// Toggle Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('myModal');
const closeButton = document.querySelector('.close-button');

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        from_name: document.getElementsById('name').value
    };

    // Send email using EmailJS
    emailjs.send('service_1j3hi3i', 'template_cabh7lo', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            modal.style.display = "block";
            contactForm.reset();      
        }, function(error) {
            console.log('FAILED...', error);
            alert('An error occurred while sending your message. Please try again later.');
        });
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typewriter-text');
    const text = textElement.textContent;
    const typingSpeed = 99;

    let index = 0;
    textElement.textContent = ''; // Clear the text content

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
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;

            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after click
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

            // First fade out all project cards
            projectCards.forEach(card => {
                card.classList.add('hidden'); // Add hidden class for fade out
            });

            // Wait for the fade out transition to complete (match transition duration in CSS)
            setTimeout(() => {
                // Now filter and show the appropriate project cards
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden'); // Remove hidden to fade in
                        card.style.display = 'block'; // Show matching cards
                    } else {
                        card.style.display = 'none'; // Hide non-matching cards after fade-out
                    }
                });
            }, 500); // 500ms delay matches the fade-out duration
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