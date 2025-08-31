(function () {
  if (typeof document === "undefined") return;

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    // Inicializar EmailJS directamente desde window
    emailjs.init("oqAnIa3GmsqHuor-w"); // 👈 Public Key de EmailJS

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validar número de contacto (9 dígitos)
      const telInput = form.querySelector('input[name="numero"]');
      if (telInput) {
        const value = telInput.value.trim();
        if (!/^\d{9}$/.test(value)) {
          alert("El número de contacto debe tener exactamente 9 dígitos.");
          telInput.focus();
          return;
        }
      }

      try {
        await emailjs.sendForm("service_lpuo854", "template_rpq0f2m", form);
        alert("✅ Mensaje enviado correctamente. Nos pondremos en contacto contigo.");
        form.reset();
      } catch (error) {
        alert("❌ Error al enviar: " + (error?.text || JSON.stringify(error)));
      }
    });
  });
})();
