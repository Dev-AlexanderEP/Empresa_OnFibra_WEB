export function initContactForm() {
  if (typeof document === "undefined") return; // 🚨 Previene ejecución en SSR

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form) return;

    let emailjsModPromise: Promise<any> | null = null;
    const loadEmailJS = () => {
      if (!emailjsModPromise) {
        emailjsModPromise = import("@emailjs/browser").then((mod) => {
          const emailjs = mod.default || mod;
          emailjs.init("oqAnIa3GmsqHuor-w"); // Public Key
          return emailjs;
        });
      }
      return emailjsModPromise;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const telInput = form.querySelector<HTMLInputElement>('input[name="numero"]');
      if (telInput) {
        const value = telInput.value.trim();
        if (!/^\d{9}$/.test(value)) {
          alert("El número de contacto debe tener exactamente 9 dígitos.");
          telInput.focus();
          return;
        }
      }

      try {
        const emailjs = await loadEmailJS();
        await emailjs.sendForm("service_lpuo854", "template_rpq0f2m", form);
        alert("✅ Mensaje enviado correctamente. Nos pondremos en contacto contigo.");
        form.reset();
      } catch (error: any) {
        alert("❌ Error al enviar: " + (error?.text || JSON.stringify(error)));
      }
    });
  });
}

// No ejecutar en SSR
if (typeof window !== "undefined") {
  initContactForm();
}
