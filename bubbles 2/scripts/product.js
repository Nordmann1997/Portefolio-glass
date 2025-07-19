const menuButton = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        menuButton.classList.remove('active');
        dropdownMenu.classList.remove('active');
    }
});

