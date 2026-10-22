type GraphicType = "anchor" | "pile" | "tube" | "nail";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

// Abstrakte, selbst erstellte Prinzipgrafik; keine Ausführungsplanung oder Gerätedarstellung.
export function GroundGraphic() {
  return (
    <div className="ground-graphic">
      <div className="drawing-top">
        <span>UNTER DER OBERFLÄCHE.</span>
        <span>PRINZIPDARSTELLUNG</span>
      </div>
      <svg viewBox="0 0 600 570" aria-hidden="true" className="ground-svg">
        <defs>
          <pattern
            id="grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M36 0H0V36"
              fill="none"
              stroke="#acc9a0"
              strokeOpacity=".11"
            />
          </pattern>
          <pattern
            id="hatch"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <path d="M0 0v9" stroke="#b8c5af" strokeOpacity=".18" />
          </pattern>
        </defs>
        <rect width="600" height="570" fill="url(#grid)" />
        <path d="M28 181H276V290H572V540H28Z" fill="url(#hatch)" />
        <path
          d="M28 181H276V290H572"
          stroke="#c4d2bd"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M28 371c115-24 210 44 319 21s152-7 225 8M28 460c110-30 219 17 335-7s149-22 209 5"
          stroke="#91a589"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 7"
        />
        <path d="M267 164v272h17V164Z" fill="#b2c1a9" />
        <path
          d="m268 221-139 103m142-24L134 401"
          stroke="var(--brand-green)"
          strokeWidth="5"
        />
        <path
          d="m176 291-47 33m51 43-46 34"
          stroke="var(--brand-green)"
          strokeWidth="18"
          opacity=".4"
        />
        <path
          d="m259 210 18 24m-18 55 18 24"
          stroke="#edf0df"
          strokeWidth="5"
        />
        <path
          d="M388 265v235m29-235v235"
          stroke="var(--brand-green)"
          strokeWidth="5"
        />
        <path
          d="M402 329v171"
          stroke="var(--brand-green)"
          strokeWidth="34"
          opacity=".22"
        />
        <path d="M365 253h76v17h-76z" fill="#c0cbb5" />
        <path
          d="M402 208v29m-8-10 8 10 8-10"
          stroke="var(--brand-green)"
          fill="none"
          strokeWidth="2"
        />
        <circle cx="222" cy="255" r="4" fill="var(--lime)" />
        <path
          d="M222 255V103H102"
          stroke="var(--brand-green)"
          strokeWidth="1"
          fill="none"
        />
        <text x="50" y="91" fill="#e5eddb" fontSize="12" letterSpacing="1.4">
          ZUGKRÄFTE AUFNEHMEN
        </text>
        <circle cx="417" cy="406" r="4" fill="var(--lime)" />
        <path
          d="M417 406h104v83"
          stroke="var(--brand-green)"
          strokeWidth="1"
          fill="none"
        />
        <text x="373" y="516" fill="#e5eddb" fontSize="12" letterSpacing="1.4">
          LASTEN ABTRAGEN
        </text>
        <path
          d="M40 43h18m-9-9v18M548 539h18m-9-9v18"
          stroke="var(--brand-green)"
        />
      </svg>
      <div className="drawing-bottom">
        <span>ANKER- & PFAHLTECHNIK</span>
        <span>SCHEMATISCH · NICHT MASSSTÄBLICH</span>
      </div>
    </div>
  );
}

export function ServiceGraphic({ type }: { type: GraphicType }) {
  const paths = {
    anchor: (
      <>
        <path d="M21 11v46M17 24l33 23M42 42l10 7" />
        <path d="m14 28 7-10" />
      </>
    ),
    pile: (
      <>
        <path d="M18 17h29v7H18zM28 24v33m9-33v33M23 57h20" />
        <path d="M32 3v10m-4-4 4 4 4-4" />
      </>
    ),
    tube: (
      <>
        <path d="M23 12h18v45H23zM28 17v34m8-34v34M18 25h5m18 8h5M18 43h5m18 8h5" />
      </>
    ),
    nail: (
      <>
        <path d="M12 12h20l-4 15 9 15-5 15h20M30 21l21 10m-19 4 20 10m-18 4 16 8" />
      </>
    ),
  };
  return (
    <svg
      className="service-icon"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}
