// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // EVENT HANDLING SECTION
    // ======================
    
    // Button click event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickOutput.classList.add('bounce');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            clickOutput.classList.remove('bounce');
        }, 500);
    });
    
    // Hover effect
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Hover detected! Welcome!';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
    });
    
    // Keypress detection
    const keypressOutput = document.getElementById('keypress-output');
    
    document.addEventListener('keydown', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // Secret double-click action
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = '🎉 You found the secret! Double click magic!';
        this.style.backgroundColor = '#ffeb3b';
        
        // Reset after 2 seconds
        setTimeout(() => {
            secretOutput.textContent = '🤫';
            this.style.backgroundColor = '';
        }, 2000);
    });
    
    // ======================
    // INTERACTIVE ELEMENTS
    // ======================
    
    // Color changing button
    const colorBtn = document.getElementById('color-btn');
    const clickCount = document.getElementById('click-count');
    let count = 0;
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];
    
    colorBtn.addEventListener('click', function() {
        count++;
        clickCount.textContent = count;
        
        // Change to a random color from our array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.backgroundColor = randomColor;
        
        // Add animation
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 500);
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    }, 3000);
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Close all other accordion items
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current item
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
    
    // ======================
    // FORM VALIDATION
    // ======================
    const form = document.getElementById('demo-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.getElementById('strength-text');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 400);
            return false;
        }
        nameError.textContent = '';
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 400);
            return false;
        }
        emailError.textContent = '';
        return true;
    }
    
    function validatePassword() {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        }
        passwordError.textContent = '';
        
        // Calculate password strength
        const strength = calculatePasswordStrength(passwordInput.value);
        updateStrengthMeter(strength);
        
        return true;
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length contributes up to 50 points
        strength += Math.min(50, (password.length / 12) * 50);
        
        // Character variety
        if (/[A-Z]/.test(password)) strength += 10;
        if (/[a-z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        return Math.min(100, strength);
    }
    
    function updateStrengthMeter(strength) {
        const meter = strengthMeter;
        meter.style.width = `${strength}%`;
        
        if (strength < 40) {
            meter.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
        } else if (strength < 70) {
            meter.style.backgroundColor = '#f39c12';
            strengthText.textContent = 'Moderate';
        } else {
            meter.style.backgroundColor = '#2ecc71';
            strengthText.textContent = 'Strong';
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formStatus.textContent = 'Form submitted successfully!';
            formStatus.style.backgroundColor = '#d4edda';
            formStatus.style.color = '#155724';
            
            // In a real app, you would send data to server here
            console.log('Form data:', {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                formStatus.textContent = '';
                formStatus.style.backgroundColor = '';
                formStatus.style.color = '';
                strengthMeter.style.width = '0';
                strengthText.textContent = 'Password strength';
            }, 2000);
        } else {
            formStatus.textContent = 'Please fix the errors above';
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.style.color = '#721c24';
        }
    });
});