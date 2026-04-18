const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));

const contactForm = document.querySelector(".contact-form");
const formHelper = document.querySelector("#form-helper");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = new FormData(contactForm);
    const projectType = fields.get("projectType");
    const budget = fields.get("budget");
    const message = [
      "Bonjour HYPNOSE, je souhaite discuter d'un projet.",
      "",
      `Nom : ${fields.get("name") || "Non renseigné"}`,
      `Entreprise : ${fields.get("company") || "Non renseigné"}`,
      `Email : ${fields.get("email") || "Non renseigné"}`,
      `Téléphone : ${fields.get("phone") || "Non renseigné"}`,
      `Type de projet : ${projectType && projectType !== "Type de projet" ? projectType : "Non renseigné"}`,
      `Budget : ${budget && budget !== "Budget estimatif" ? budget : "Non renseigné"}`,
      `Recontact WhatsApp : ${fields.get("whatsappPreference") ? "Oui" : "Non"}`,
      "",
      `Message : ${fields.get("message") || "Non renseigné"}`,
    ].join("\n");

    if (formHelper) {
      formHelper.textContent = "Ouverture de WhatsApp avec votre demande préremplie...";
    }

    window.open(
      `https://wa.me/224621633035?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
}
