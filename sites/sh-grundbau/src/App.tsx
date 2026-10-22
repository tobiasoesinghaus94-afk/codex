import { useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import { Arrow, GroundGraphic, ServiceGraphic } from "./components/Graphics";
import { company, fields, services } from "./content";

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState("");
  return (
    <>
      <a href="#inhalt" className="skip-link">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt">
        <section id="start" className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="status-dot" /> S+H GRUNDBAU GMBH · SPEZIALTIEFBAU
            </p>
            <h1 id="hero-title">
              Anker setzen.
              <br />
              <span>Lasten abtragen.</span>
            </h1>
            <p className="hero-description">
              Verpressanker, Mikropfähle, Rohrverpresspfähle und
              Hangvernagelungen für den Hoch-, Tief- und Ingenieurbau.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#kontakt">
                Projekt anfragen <Arrow diagonal />
              </a>
              <a className="text-link light-link" href="#leistungen">
                Leistungen ansehen <Arrow />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="cross">+</span>
              <p>
                Bohr-, Verpress-, Spann- und Prüfleistungen.
                <br />
                Auf die jeweilige Ausführungsaufgabe abgestimmt.
              </p>
            </div>
          </div>
          <GroundGraphic />
        </section>
        <div className="region-bar">
          <span className="region-label">UNSER EINSATZSCHWERPUNKT</span>
          <p>
            Nordrhein-Westfalen <span aria-hidden="true">/</span>{" "}
            Rheinland-Pfalz <span aria-hidden="true">/</span> Hessen
          </p>
          <span className="region-extra">& angrenzende Regionen</span>
        </div>

        <section
          id="leistungen"
          className="section services-section"
          aria-labelledby="services-title"
        >
          <SectionLabel number="01">UNSERE LEISTUNGEN</SectionLabel>
          <div className="section-intro">
            <h2 id="services-title">
              Im Baugrund beginnt
              <br />
              die passende Lösung.
            </h2>
            <p>
              Vier Schwerpunkte. Unterschiedliche Aufgaben.
              <br />
              Wir richten den Blick auf die Anforderungen Ihres Bauvorhabens.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="card-top">
                  <span className="card-number">{service.number} /</span>
                  <ServiceGraphic type={service.type} />
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-detail">
                  <h4>Typische Einsatzbereiche</h4>
                  <p>{service.uses}</p>
                </div>
                <div className="service-detail">
                  <h4>Ihr Nutzen</h4>
                  <p>{service.benefit}</p>
                </div>
                <a
                  href="#kontakt"
                  className="service-cta"
                  onClick={() => setSelectedService(service.title)}
                >
                  {service.title} anfragen <Arrow diagonal />
                </a>
              </article>
            ))}
          </div>
          <p className="technical-note">
            <span aria-hidden="true">
              <Arrow />
            </span>{" "}
            Die Eignung des Verfahrens, die Gerätetechnik und die Ausführung
            sind anhand von Planung, Baugrundunterlagen und
            Baustellenbedingungen projektbezogen zu prüfen.
          </p>
        </section>

        <section className="approach-section" aria-labelledby="approach-title">
          <div className="approach-title">
            <SectionLabel number="02">WARUM S+H GRUNDBAU</SectionLabel>
            <h2 id="approach-title">
              Ein klarer Fokus.
              <br />
              <span>Für Ihre Bauaufgabe.</span>
            </h2>
            <p>
              Anker- und Pfahlarbeiten sind unser fachlicher Schwerpunkt. Hinzu
              kommen die zugehörigen Bohr-, Verpress-, Spann- und
              Prüfleistungen.
            </p>
            <a href="#kontakt" className="text-link light-link">
              Bauvorhaben besprechen <Arrow diagonal />
            </a>
          </div>
          <div className="approach-list">
            <article>
              <span>01</span>
              <div>
                <h3>Spezialisierte Leistungen</h3>
                <p>
                  Ein abgegrenztes Leistungsspektrum für Gründung,
                  Rückverankerung und Hangsicherung.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Die Ausführung im Blick</h3>
                <p>
                  Lasten, Baugrund und Zugänglichkeit bestimmen das Verfahren.
                  LV, Planung und Ausführungsbedingungen bilden die Grundlage
                  der Projektprüfung.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Regionaler Schwerpunkt</h3>
                <p>
                  Nordrhein-Westfalen, Rheinland-Pfalz und Hessen sowie
                  angrenzende Regionen stehen im Mittelpunkt unserer Tätigkeit.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          id="unternehmen"
          className="section about-section"
          aria-labelledby="about-title"
        >
          <SectionLabel number="03">DAS UNTERNEHMEN</SectionLabel>
          <div className="about-grid">
            <div>
              <h2 id="about-title">
                Spezialtiefbau.
                <br />
                Konkret ausgerichtet.
              </h2>
              <p className="large-copy">
                S+H Grundbau GmbH steht für Anker- und Pfahlarbeiten sowie
                Hangvernagelungen.
              </p>
            </div>
            <div className="about-copy">
              <p>
                Unsere Leistungen richten sich an Bau- und Projektleiter,
                Kalkulatoren, Einkäufer und Planer sowie an Generalunternehmer
                und ausführende Unternehmen im Hoch-, Tief- und Ingenieurbau.
              </p>
              <p>
                Für die Beurteilung einer Bauaufgabe zählen die Unterlagen
                ebenso wie die Bedingungen vor Ort: von den vorgesehenen Lasten
                bis zu Arbeitsraum und Zufahrt. So lässt sich der angefragte
                Leistungsumfang konkret einordnen.
              </p>
              <aside className="identity-note">
                <span aria-hidden="true">S+H</span>
                <p>
                  <strong>Eigenständig. Eindeutig zugeordnet.</strong>Sie
                  befinden sich auf der Website der S+H Grundbau GmbH. Die S+H
                  Spezialtiefbau GmbH ist ein rechtlich eigenständiges
                  Unternehmen.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="section fields-section"
          aria-labelledby="fields-title"
        >
          <SectionLabel number="04">EINSATZFELDER</SectionLabel>
          <div className="section-intro">
            <h2 id="fields-title">
              Dort, wo der Baugrund
              <br />
              zur Aufgabe wird.
            </h2>
            <p>
              Typische Bedarfssituationen für unsere Leistungen.
              <br />
              Die technische Eignung bleibt projektbezogen zu prüfen.
            </p>
          </div>
          <div className="fields-list">
            {fields.map(([title, description], i) => (
              <article key={title}>
                <span className="field-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="field-cross" aria-hidden="true">
                  +
                </span>
              </article>
            ))}
          </div>
          <p className="section-caption">
            Die genannten Einsatzfelder sind keine Referenzprojekte. Auch bei
            beengten Baufeldern sind Zugang, Arbeitsraum und Verfahren im
            Einzelfall zu bewerten.
          </p>
        </section>

        <section
          id="kontakt"
          className="section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-intro">
            <SectionLabel number="05">PROJEKT ANFRAGEN</SectionLabel>
            <h2 id="contact-title">
              Ihr Vorhaben.
              <br />
              Der nächste Schritt.
            </h2>
            <p>
              Sie planen Anker-, Pfahl- oder Hangsicherungsarbeiten? Bereiten
              Sie die Eckdaten Ihres Bauvorhabens und die verfügbaren Unterlagen
              vor.
            </p>
            <div className="document-list">
              <h3>Für eine Projektprüfung hilfreich</h3>
              <ul>
                <li>Leistungsverzeichnis und Planungsstand</li>
                <li>Lageplan, Schnitte und Baugrundgutachten</li>
                <li>Angaben zu Lasten, Zugang und Arbeitsraum</li>
                <li>Ausführungsort und geplanter Zeitraum</li>
              </ul>
            </div>
            <div className="direct-contact">
              <span className="tiny-label">ANFRAGEN &amp; KONTAKT</span>
              <a className="contact-email" href={`mailto:${company.email}`}>
                {company.email}
                <Arrow diagonal />
              </a>
              <a className="contact-phone" href={company.phoneHref}>
                {company.phone}
              </a>
              <address>
                <strong>{company.legalName}</strong>
                <br />
                {company.street}
                <br />
                {company.postcode} {company.city}
              </address>
            </div>
            <div className="people">
              <h3>Ihre Ansprechpartner</h3>
              {company.contacts.map((person) => (
                <article className="person" key={person.email}>
                  <p className="person-role">{person.role}</p>
                  <h4>{person.name}</h4>
                  <a href={`mailto:${person.email}`}>
                    {person.email}
                    <Arrow diagonal />
                  </a>
                </article>
              ))}
            </div>
          </div>
          <ContactForm selectedService={selectedService} />
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <a
            href="#start"
            className="footer-brand"
            aria-label="S + H Grundbau GmbH – Startseite"
          >
            <img
              src="/brand/sh-grundbau-logo-640.webp"
              alt="S + H Grundbau GmbH"
              width="640"
              height="452"
              loading="lazy"
            />
          </a>
          <address className="footer-address">
            <strong>{company.legalName}</strong>
            <br />
            {company.street}
            <br />
            {company.postcode} {company.city}
            <br />
            <a href={company.phoneHref}>{company.phone}</a>
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
          <p className="footer-region">
            Anker- und Pfahltechnik.
            <br />
            Nordrhein-Westfalen · Rheinland-Pfalz · Hessen
          </p>
          <a href="#start" className="back-top">
            Nach oben{" "}
            <span aria-hidden="true">
              <Arrow />
            </span>
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName}
          </span>
          <div>
            <a href="/impressum.html">Impressum</a>
            <a href="/datenschutz.html">Datenschutz</a>
          </div>
        </div>
      </footer>
    </>
  );
}
