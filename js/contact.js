(function() {
    emailjs.init("W6z-f_nbHSrrhFapR");
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    emailjs.send("service_z0zv4gm", "template_vflko8k", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        reply_to: document.getElementById("email").value
    })
    .then(function (response) {
        showToast("Message Sent Successfully! ✅", "success");
        document.getElementById("contact-form").reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, function (error) {
        showToast("Failed to send message. ❌ Please try again.", "error");
        console.error("EmailJS Error:", error);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});