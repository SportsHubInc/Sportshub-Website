document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const emailInput = document.getElementById("signup-email");
  const emailValue = emailInput.value.trim();
  // Improved email validation regex
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(emailValue)) {
    emailInput.style.borderColor = "#fc5c2c";
    alert("Please enter a valid email address.");
    return;
  }
  // Create one FormData object with all fields
  const formData = new FormData(event.target);
  formData.set("email", emailValue); // Ensure email is trimmed and correct
  formData.append('userAgent', navigator.userAgent);
  formData.append('referrer', document.referrer);

  try {
    const response = await fetch(event.target.action, {
      method: "POST",
      body: formData
    });
    if (response.ok) {
      const text = await response.text();
      if (text === "Duplicate") {
        showToast('This email is already registered.');
        return;
      }
      event.target.reset();
      document.getElementById('thankyou-modal').style.display = 'block';
      // Save email to localStorage to prevent duplicates
      const submittedEmails = JSON.parse(localStorage.getItem('submittedEmails') || '[]');
      submittedEmails.push(emailValue.toLowerCase());
      localStorage.setItem('submittedEmails', JSON.stringify(submittedEmails));
    } else {
      alert("Could not submit. Try again later.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
});