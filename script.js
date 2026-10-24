/* =====================================================================
   1) VOS TEXTES — modifiez tout ici, en français, entre les guillemets
   ===================================================================== */
const CONTENU = {
  noms: "Mr & Mme Eko",
  initiales: "E & E",
  sceauLettre: "E",
  hashtag: "#MariageEko2026",
  dateCourte: "19 · 12 · 2026",
  dateLongue: "Samedi 19 décembre 2026",
  // Date et heure du compte à rebours (heure du Cameroun = +01:00)
  dateJourJ: "2026-12-19T10:00:00+01:00",

  boutonOuvrir: "Ouvrir notre invitation",
  heroIntro: "Nous nous marions",
  heroPhrase: "Avec joie, nous vous invitons à partager le plus beau jour de notre vie.",

  histoireSur: "Notre histoire",
  histoireTitre: "Comment tout a commencé",
  histoire: [
    { date: "La rencontre", titre: "Nos regards se croisent", texte: "Écrivez ici le lieu, l’année et l’histoire de votre première rencontre." },
    { date: "Le premier rendez-vous", titre: "Une soirée qui change tout", texte: "Racontez en quelques lignes votre premier rendez-vous et ce que vous avez ressenti." },
    { date: "La demande", titre: "Il a dit : « Veux-tu m’épouser ? »", texte: "Décrivez le moment de la demande en mariage, et sa réponse." }
  ],

  galerieSur: "Galerie",
  galerieTitre: "Quelques instants de nous",
  // Mettez vos photos dans le dossier « photos » avec ces noms (ou changez les noms ici)
  galerie: ["photos/mr-portrait.jpg", "photos/mme-portrait.jpg", "photos/mr.jpg", "photos/mme.jpg"],

  programmeSur: "Le programme",
  programmeTitre: "Le déroulé de la journée",
  programme: [
    { heure: "09h00", titre: "Accueil des invités", texte: "Installation devant la mairie de Pété." },
    { heure: "10h00", titre: "Cérémonie civile", texte: "Mairie de Pété, Bandjoun." },
    { heure: "12h00", titre: "Séance photos", texte: "Moments avec la famille et les amis." },
    { heure: "14h00", titre: "Repas de fête", texte: "Foyer culturel et social de Yom III." },
    { heure: "18h00", titre: "Remerciements", texte: "Un mot de nous pour vous, avant la danse." }
  ],

  lieuSur: "Le lieu",
  lieuTitre: "Où nous retrouver",
  lieux: [
    { label: "Cérémonie", nom: "Mairie de Pété", ville: "Bandjoun" },
    { label: "Réception", nom: "Foyer culturel et social de Yom III", ville: "Bandjoun" }
  ],
  // Lieu affiché sur la carte et utilisé pour l’itinéraire
  recherchePlan: "Foyer culturel et social de Yom III, Bandjoun, Cameroun",
  boutonItineraire: "Ouvrir l’itinéraire",

  tenueSur: "Tenue",
  tenueTitre: "Le code vestimentaire",
  tenueTexte: "Élégance en blanc et or. Nous vous invitons à vous habiller en blanc et or, les couleurs de notre palette.",
  pastilles: [
    { nom: "Blanc", couleur: "#fffdf8" },
    { nom: "Or", couleur: "#c9a24b" },
    { nom: "Champagne", couleur: "#ecdcb0" }
  ],

  rsvpSur: "Confirmer ma présence",
  rsvpTitre: "Serez-vous des nôtres ?",
  rsvpTexte: "Merci de nous répondre pour que nous puissions préparer chaque place avec soin.",
  rsvpLimiteLabel: "Réponse avant le",
  rsvpLimite: "30 novembre 2026",
  boutonRsvp: "Répondre à l’invitation",
  // Collez ici le lien de votre formulaire (Google Forms) ou de votre WhatsApp : https://wa.me/237XXXXXXXXX
  rsvpLien: "https://forms.gle/RGVdC124EF3wm6N76",

  merci: "Merci de faire partie de notre histoire"
};
/* ===================== FIN DES TEXTES À MODIFIER ===================== */


const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);

/* ---- Remplissage des textes ---- */
document.querySelectorAll("[data-t]").forEach(el => { el.textContent = CONTENU[el.dataset.t] ?? ""; });

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
const safe = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

CONTENU.histoire.forEach(h => {
  $("#timeline").appendChild(el("div", "tl-item reveal",
    `<span class="tl-date">${safe(h.date)}</span><h3>${safe(h.titre)}</h3><p>${safe(h.texte)}</p>`));
});
CONTENU.galerie.forEach((src, i) => {
  const t = el("div", "tile reveal");
  const p = el("div", "ph");
  p.style.backgroundImage = `url("${src}")`;
  p.dataset.speed = (0.06 + (i % 3) * 0.04).toFixed(2);
  t.appendChild(p);
  $("#gallery").appendChild(t);
});
CONTENU.programme.forEach(p => {
  $("#program").appendChild(el("li", "reveal",
    `<span class="p-time">${safe(p.heure)}</span><div><h3>${safe(p.titre)}</h3><p>${safe(p.texte)}</p></div>`));
});
CONTENU.lieux.forEach(l => {
  $("#places").appendChild(el("div", "place",
    `<h3>${safe(l.label)}</h3><p>${safe(l.nom)}<br>${safe(l.ville)}</p>`));
});
CONTENU.pastilles.forEach(c => {
  $("#swatches").appendChild(el("div", "sw", `<i style="background:${safe(c.couleur)}"></i>${safe(c.nom)}`));
});
const q = encodeURIComponent(CONTENU.recherchePlan);
$("#mapFrame").src = `https://www.google.com/maps?q=${q}&output=embed`;
$("#routeBtn").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
$("#rsvpBtn").href = CONTENU.rsvpLien;

/* ---- Titres révélés mot par mot ---- */
document.querySelectorAll(".words").forEach(t => {
  const mots = t.textContent.trim().split(/\s+/);
  t.setAttribute("aria-label", t.textContent.trim());
  t.innerHTML = mots.map((m, i) =>
    `<span class="w" aria-hidden="true"><span style="transition-delay:${i * 0.14}s">${safe(m)}</span></span>`
  ).join(" ");
});

/* ---- Apparition au défilement ---- */
const obs = "IntersectionObserver" in window ? new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
}, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }) : null;
document.querySelectorAll(".reveal,.words").forEach(e => obs ? obs.observe(e) : e.classList.add("in"));

/* ---- Compte à rebours ---- */
const cible = new Date(CONTENU.dateJourJ).getTime();
const p2 = n => String(n).padStart(2, "0");
function tic() {
  let d = Math.max(0, cible - Date.now());
  const j = Math.floor(d / 864e5); d %= 864e5;
  const h = Math.floor(d / 36e5); d %= 36e5;
  const m = Math.floor(d / 6e4);
  const s = Math.floor((d % 6e4) / 1e3);
  $("#cd-d").textContent = p2(j); $("#cd-h").textContent = p2(h);
  $("#cd-m").textContent = p2(m); $("#cd-s").textContent = p2(s);
}
tic(); setInterval(tic, 1000);

/* ---- Défilement : frise qui se dessine + profondeur de la galerie ---- */
const fill = $("#tlFill"), tl = $("#timeline");
const phs = [...document.querySelectorAll(".ph")];
let tick = false;
function scrollFx() {
  tick = false;
  const vh = innerHeight;
  const r = tl.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
  tl.style.setProperty("--p", p.toFixed(3));
  if (reduit) return;
  phs.forEach(ph => {
    const b = ph.parentElement.getBoundingClientRect();
    if (b.bottom < -100 || b.top > vh + 100) return;
    const d = (b.top + b.height / 2 - vh / 2) * parseFloat(ph.dataset.speed);
    ph.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`;
  });
}
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(scrollFx); } }, { passive: true });
addEventListener("resize", scrollFx);

/* ---- Ouverture de l'enveloppe ---- */
const intro = $("#intro"), site = $("#site");
function montrerSite() {
  intro.classList.add("out");
  site.classList.add("ready");
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);
  setTimeout(() => { intro.style.display = "none"; scrollFx(); }, 1800);
}
$("#openBtn").addEventListener("click", () => {
  $("#openBtn").disabled = true;
  intro.classList.add("opening");
  if (reduit) { montrerSite(); return; }
  setTimeout(montrerSite, 3300); // rabat 1,1 s → carte sort → fondu vers le site
});
