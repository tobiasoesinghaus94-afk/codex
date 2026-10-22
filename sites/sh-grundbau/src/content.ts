// Quellen: Unternehmensprofil und bestätigte Angaben im Chat; Logo-PDF;
// Telefonnummer aus dem Briefkopf des bereitgestellten Angebots.
// TODO: Freigegebene Baustellenbilder und ggf. Hausschrift ergänzen.
// Keine Angaben der rechtlich eigenständigen S+H Spezialtiefbau GmbH verwenden.
export const company = {
  legalName: "S + H Grundbau GmbH",
  email: "info@sh-grundbau.de",
  phone: "02683 2120",
  phoneHref: "tel:+4926832120",
  street: "Werner-Heisenberg-Straße 4",
  postcode: "53577",
  city: "Neustadt-Fernthal",
  contacts: [
    {
      name: "Dipl.-Ing. Michael Streit",
      role: "Geschäftsführer",
      email: "michael.streit@sh-grundbau.de",
    },
    {
      name: "Tobias Oesinghaus, M.Sc.",
      role: "Projektleiter",
      email: "tobias.oesinghaus@sh-grundbau.de",
    },
  ],
};

export const services = [
  {
    id: "verpressanker",
    number: "01",
    title: "Verpressanker",
    type: "anchor" as const,
    description:
      "Temporäre und dauerhafte Verpressanker leiten Zugkräfte über einen verpressten Verankerungskörper in tragfähige Bodenschichten oder Fels ein.",
    uses: "Rückverankerte Baugruben und Stützkonstruktionen",
    benefit:
      "Rückverankerungen können innere Aussteifungen reduzieren und so Arbeitsraum in der Baugrube erhalten.",
  },
  {
    id: "mikropfaehle",
    number: "02",
    title: "Mikropfähle",
    type: "pile" as const,
    description:
      "Kleinbohrverpresspfähle übertragen Zug- oder Druckkräfte in den Baugrund. Ihre Ausbildung richtet sich nach Lasten, Baugrund und Einbausituation.",
    uses: "Gründungsverstärkungen, Unterfangungen und Bestandsbau",
    benefit:
      "Eine mögliche Gründungslösung auch dort, wo Platz und Zugang die Ausführung begrenzen.",
  },
  {
    id: "rohrverpresspfaehle",
    number: "03",
    title: "Rohrverpresspfähle",
    type: "tube" as const,
    description:
      "Rohrförmige Stahltragglieder wirken mit einem Verpresskörper zusammen, um Bauwerkslasten in geeignete Baugrundschichten einzuleiten.",
    uses: "Gründungen und Gründungsverstärkungen im Hoch- und Ingenieurbau",
    benefit:
      "Lastabtragung mit einem auf die Einbausituation und die statischen Anforderungen abgestimmten Pfahlsystem.",
  },
  {
    id: "hangvernagelungen",
    number: "04",
    title: "Hangvernagelungen",
    type: "nail" as const,
    description:
      "Bodennägel bewehren den anstehenden Boden. Zusammen mit einer geplanten Oberflächensicherung können sie Böschungen und Geländesprünge sichern.",
    uses: "Hangsicherungen, Böschungen und Geländesprünge",
    benefit:
      "Eine mögliche Sicherungslösung bei abschnittsweiser Herstellung und entsprechendem Standsicherheitsnachweis.",
  },
];

export const fields = [
  ["Baugruben", "Rückverankerung von Verbau- und Stützkonstruktionen."],
  [
    "Bauen im Bestand",
    "Gründungsverstärkungen und Unterfangungen an vorhandenen Bauwerken.",
  ],
  ["Hänge & Stützwände", "Sicherung von Böschungen und Geländesprüngen."],
  [
    "Ingenieur- & Industriebau",
    "Anker- und Pfahlarbeiten für Brücken, Anlagen und Ingenieurbauwerke.",
  ],
];
