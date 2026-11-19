document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. TYPEWRITER EFFECT
    // =========================================
    const textElement = document.getElementById('type-text');
    const phrases = [
        "Full-Stack Developer.",
        "Embedded Systems Engineer.",
        "C++ & C# Programmer.",
        "Web UI Designer."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);

    // =========================================
    // 2. CHAT BOT LOGIC
    // =========================================
    const chatBubble = document.getElementById('chatBubble');
    const chatPanel = document.getElementById('chatPanel');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');

    chatBubble.addEventListener('click', () => {
        chatPanel.classList.toggle('open');
    });

    closeChat.addEventListener('click', () => {
        chatPanel.classList.remove('open');
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);

        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            
            const lowerText = text.toLowerCase();
            if (lowerText.includes('project')) {
                botMsg.textContent = "You can check out my projects in the 'Projects' section above! I just launched Orixia.";
            } else if (lowerText.includes('contact') || lowerText.includes('email')) {
                botMsg.textContent = "You can reach Ronney directly at mochinaronney099@gmail.com or use the contact form below.";
            } else if (lowerText.includes('hire') || lowerText.includes('job')) {
                botMsg.textContent = "Ronney is currently open to internships and graduate roles! Send him a message via the form.";
            } else {
                botMsg.textContent = "Thanks for your message! For a real response, please use the contact form below or email Ronney.";
            }

            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }

    sendChat.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // =========================================
    // 3. CONTACT FORM AJAX SUBMISSION
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = "Message sent successfully! Ronney will get back to you soon.";
                formStatus.style.color = "#00ffcc";
                contactForm.reset();
            } else {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
                formStatus.style.color = "#e94f4f";
            }
        }).catch(error => {
            formStatus.textContent = "Oops! There was a problem submitting your form.";
            formStatus.style.color = "#e94f4f";
        });
    });
});
