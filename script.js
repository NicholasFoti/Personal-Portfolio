// Toggle Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
const sendButton = document.getElementById('send-button');
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

        // Show loading spinner
        sendButton.innerHTML = '<span class="spinner"></span>';
        sendButton.disabled = true;

    // Collect form data
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        from_name: document.getElementById('name').value
    };

    // Send email using EmailJS
    emailjs.send('service_1j3hi3i', 'template_cabh7lo', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            sendButton.innerHTML = 'Send Message';
            sendButton.disabled = false;
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

    // Add flip functionality
    document.querySelectorAll('.flip-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            card.classList.toggle('flipped');
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
        const sectionTop = section.offsetTop - 250;
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

document.addEventListener('DOMContentLoaded', function() {
    const skillsSlider = document.querySelector('.skills-slider');

    if (window.innerWidth <= 1200) {
        skillsSlider.addEventListener('wheel', (e) => {
            e.preventDefault();
            skillsSlider.scrollLeft += e.deltaY;
        });
    }
});