document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.send("service_z0zv4gm", "template_vflko8k", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        reply_to: document.getElementById("email").value
    })
        .then(function (response) {
            alert("Message Sent Successfully! ✅");
            document.getElementById("contact-form").reset(); // Clear form
        }, function (error) {
            alert("Failed to send message. ❌ Please try again.");
        });
});

