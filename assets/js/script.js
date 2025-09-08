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
      // Show the thank you modal by displaying the existing HTML modal
      const thankyouModal = document.getElementById("thankyou-modal");
      if (thankyouModal) {
        thankyouModal.style.display = "block";
        document.getElementById("close-thankyou").onclick = function() {
          thankyouModal.style.display = "none";
        };
      } else {
        alert("Thank you for signing up!");
      }
    } else {
      alert("Could not submit. Try again later.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
});