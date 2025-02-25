document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let dob = document.getElementById("dob").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let gender = document.getElementById("gender").value;

    if (name === "" || email === "" || password === "" || dob === "" || phone === "" || gender === "") {
        alert("All fields are required!");
        return;
    }
    
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    
    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return;
    }
    
    document.getElementById("registerPopup").style.display = "flex";
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    let re = /^[0-9]{10}$/;
    return re.test(phone);
}

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("registerPopup").style.display = "none";
    window.location.href = "index.html"; // Redirect to home page
});
