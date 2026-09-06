// ════════════════════════════════════════
// CAPITAL DETAIL — booking.js
// Form handling for booking.html
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('bookingForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const data = {
      name:    form.name.value.trim(),
      phone:   form.phone.value.trim(),
      email:   form.email.value.trim(),
      vehicle: form.vehicle.value.trim(),
      service: form.service.value,
      message: form.message.value.trim(),
    };

    // Basic validation
    if (!data.name || !data.phone || !data.email || !data.vehicle) {
      return;
    }

    // ── REPLACE THIS BLOCK WITH YOUR PREFERRED FORM SERVICE ──
    // Options: Formspree, Netlify Forms, EmailJS, etc.
    // Example Formspree usage:
    //
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(res => {
    //   if (res.ok) showSuccess();
    // });
    //
    // For now, simulate success on submit:

    showSuccess();
  });

  function showSuccess() {
    form.style.display = 'none';
    successMsg.classList.add('visible');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

});
