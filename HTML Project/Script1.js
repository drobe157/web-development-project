document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Simple submission (email) validation
    if (name === '' || email === '') {
        alert('Please fill in all fields');
        return;
    }

    // Display a success message if given proper email
    const responseDiv = document.getElementById('formResponse');
    responseDiv.textContent = `Thank you for contacting us, ${name}!`;
    responseDiv.classList.remove('hidden');

    // Clears form
    document.getElementById('contactForm').reset();
});