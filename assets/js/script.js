document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const emailInput = document.getElementById("signup-email");
  const emailValue = emailInput.value.trim();
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    emailInput.style.borderColor = "#fc5c2c";
    alert("Please enter a valid email address.");
    return;
  }
  const formData = new FormData();
  formData.append("email", emailValue);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyifxP14ranqAiFU1XXiofrF8YrkduexLYsjiq8MDzH_2w5yXLGWiS0U_HfSixyhcj1/exec", {
      method: "POST",
      body: formData
    });
    const text = await response.text();
    if (response.ok && text.includes("Success")) {
      document.getElementById("signup-form").reset();
      alert("✅ Thanks for signing up! You'll hear from us soon.");
    } else {
      alert("Could not submit. Try again later.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
});