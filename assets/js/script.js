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
      // Show a custom success modal instead of redirect
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(35,31,30,0.96)";
      modal.style.zIndex = "9999";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.innerHTML = `
        <div style="max-width:520px;background:linear-gradient(135deg,#fc5c2c 0%,#231f1e 100%);padding:44px 32px 36px 32px;border-radius:22px;color:#fff;box-shadow:0 4px 32px rgba(252,92,44,0.22);text-align:center;position:relative;">
          <div style="font-size:3rem;margin-bottom:10px;">🏆</div>
          <h2 style="color:#fff;font-size:2.2rem;margin-bottom:14px;letter-spacing:1px;text-shadow:0 2px 12px #fc5c2c;">You're On The List!</h2>
          <p style="font-size:1.25rem;margin-bottom:18px;opacity:0.95;">
            Thanks for joining the Sports Hub waitlist.<br>
            You’ll be first to know when we launch in your city.<br>
            <span style="color:#fc5c2c;font-weight:700;">Get ready to play!</span>
          </p>
          <div style="margin-bottom:18px;">
            <span style="display:inline-block;background:#fff;color:#fc5c2c;font-weight:700;padding:8px 18px;border-radius:999px;font-size:1.1rem;box-shadow:0 2px 8px rgba(252,92,44,0.12);margin:0 6px;">Early Access Confirmed</span>
            <span style="display:inline-block;background:#fc5c2c;color:#fff;font-weight:700;padding:8px 18px;border-radius:999px;font-size:1.1rem;box-shadow:0 2px 8px rgba(252,92,44,0.12);margin:0 6px;">Founders Perks Unlocked</span>
          </div>
          <p style="font-size:1.1rem;color:#fff;margin-bottom:18px;">
            Follow us for updates, sneak peeks, and exclusive invites:
          </p>
          <div style="margin-bottom:18px;display:flex;justify-content:center;gap:18px;">
            <a href="https://instagram.com/thesportshubinc" target="_blank" rel="noopener" style="background:#fff;color:#fc5c2c;padding:10px 18px;border-radius:12px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:8px;">
              <img src="assets/img/instagram.png" alt="Instagram" style="width:28px;height:28px;border-radius:6px;"> Instagram
            </a>
            <a href="https://tiktok.com/@sportshubinc" target="_blank" rel="noopener" style="background:#fff;color:#fc5c2c;padding:10px 18px;border-radius:12px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:8px;">
              <img src="assets/img/tiktok.png" alt="TikTok" style="width:28px;height:28px;border-radius:6px;"> TikTok
            </a>
            <a href="https://twitter.com/SportsHubInc25" target="_blank" rel="noopener" style="background:#fff;color:#fc5c2c;padding:10px 18px;border-radius:12px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:8px;">
              <img src="assets/img/twitter.png" alt="Twitter/X" style="width:28px;height:28px;border-radius:6px;"> X
            </a>
          </div>
          <div style="margin-bottom:12px;">
            <span style="font-size:1.1rem;color:#fff;opacity:0.85;">We can't wait to see you on the court!</span>
          </div>
          <button id="close-thankyou-modal" style="position:absolute;top:18px;right:18px;background:linear-gradient(135deg,#fc5c2c,#ff7e5f);color:#fff;border:none;border-radius:12px;padding:8px 18px;font-size:1rem;font-weight:700;box-shadow:0 2px 8px rgba(252,92,44,0.18);cursor:pointer;">Close</button>
          <div style="position:absolute;bottom:-18px;left:-18px;opacity:0.10;pointer-events:none;font-size:7rem;">🏀</div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById("close-thankyou-modal").onclick = function() {
        modal.remove();
      };
    } else {
      alert("Could not submit. Try again later.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
});