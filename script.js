// Select elements
const addBtn = document.getElementById('add-btn');
const passwordList = document.getElementById('password-list');
const searchInput = document.getElementById('search');

// Add a new password
addBtn.addEventListener('click', () => {
    const siteName = document.getElementById('site-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (siteName && username && password) {
        const passwordItem = document.createElement('div');
        passwordItem.classList.add('password-item');

        passwordItem.innerHTML = `
            <span><strong>${siteName}</strong><br>${username}</span>
            <span>
                <input type="password" value="${password}" readonly>
                <button onclick="toggleVisibility(this)">Show</button>
                <button onclick="copyToClipboard(this)">Copy</button>
                <button onclick="deletePassword(this)">Delete</button>
            </span>
        `;

        passwordList.appendChild(passwordItem);

        // Clear input fields
        document.getElementById('site-name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
});

// Toggle password visibility
function toggleVisibility(button) {
    const passwordInput = button.previousElementSibling;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        button.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        button.textContent = 'Show';
    }
}

// Copy password to clipboard
function copyToClipboard(button) {
    const passwordInput = button.previousElementSibling.previousElementSibling;
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
}

// Delete password
function deletePassword(button) {
    const passwordItem = button.parentElement.parentElement;
    passwordList.removeChild(passwordItem);
}

// Search functionality
searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const passwordItems = passwordList.getElementsByClassName('password-item');

    Array.from(passwordItems).forEach((item) => {
        const siteName = item.querySelector('strong').textContent.toLowerCase();
        if (siteName.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
