import { useEffect, useRef, useState, useCallback, useId } from "react";

import hero from "./assets/hero.jpg";
import retrato from "./assets/retrato.jpg";
import flor1 from "./assets/flor1.jpg";
import flor2 from "./assets/flor2.jpg";
import flor3 from "./assets/flor3.jpg";
import claqueta from "./assets/claqueta.jpg";
import edicion from "./assets/edicion.jpg";
import evento from "./assets/evento.jpg";
import setImg from "./assets/set.jpg";
import grabacion from "./assets/grabacion.jpg";
import camara from "./assets/camara.jpg";
import telecafe from "./assets/telecafe.jpg";
import campesino from "./assets/campesino.jpg";
import visor from "./assets/visor.jpg";
import nado1 from "./assets/nado1.jpg";
import nado2 from "./assets/nado2.jpg";
import vCocina from "./assets/videos/cocina.mp4";
import vGrabacion from "./assets/videos/kubik.mp4";
import vRueda from "./assets/videos/rueda-prensa.mp4";
import vTelecafe from "./assets/videos/telecafe.mp4";

/* ------------------------------------------------------------------ */
/* Contenido (tomado del PDF)                                          */
/* ------------------------------------------------------------------ */

const NAV = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#que-se-hacer", label: "Qué sé hacer" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

const SKILLS = [
  "Comunicación estratégica",
  "Entrevistas",
  "Investigación periodística",
  "Comunicación interna y externa",
  "Creación de mensajes",
  "Comunicación organizacional",
  "Planeación de contenido",
  "Guiones",
  "Gestión de redes sociales",
  "Storytelling",
  "Redacción de noticias y artículos",
  "Manejo de públicos y audiencias",
  "Comunicación de marca",
];

const ENFOQUE = ["Investigación", "creatividad", "estrategia", "narrativa"];

const AREAS = [
  {
    id: "fotografia",
    title: "Fotografía",
    text: "Composición y creación de contenido visual: retrato, producto y deporte, cuidando la luz y el encuadre.",
    photos: [
      {
        src: campesino,
        alt: "Retrato de un hombre mayor con gorra en un entorno rural",
        wide: false,
      },
      {
        src: visor,
        alt: "Manos sosteniendo una cámara que muestra un retrato en la pantalla",
        wide: false,
      },
      {
        src: nado1,
        alt: "Nadador con gafas avanzando en una piscina",
        wide: true,
      },
      {
        src: nado2,
        alt: "Nadadora en plena brazada dentro de la piscina",
        wide: true,
      },
    ],
  },
  {
    id: "marcas",
    title: "Colaboraciones con marcas",
    text: "Creación de contenido y comunicación para redes sociales junto a marcas y negocios locales.",
    photos: [
      {
        src: setImg,
        video: vCocina,
        alt: "Grabación detrás de cámaras en la cocina de un restaurante",
      },
      {
        src: grabacion,
        video: vGrabacion,
        alt: "Dos creadoras grabando contenido para redes sociales",
      },
    ],
  },
  {
    id: "prensa",
    title: "Prensa",
    text: "Investigación, redacción y construcción de narrativas periodísticas, también en cubrimiento de eventos.",
    photos: [
      {
        src: evento,
        alt: "Nicol posando frente a un muro de prensa en un evento deportivo",
      },
      {
        src: camara,
        video: vRueda,
        alt: "Cámara lista para una rueda de prensa",
      },
    ],
  },
  {
    id: "television",
    title: "Televisión",
    text: "Participación en las dinámicas de producción audiovisual de un medio de comunicación.",
    photos: [
      {
        src: edicion,
        alt: "Nicol operando equipo de producción en un set oscuro",
        wide: false,
      },
      {
        src: telecafe,
        video: vTelecafe,
        alt: "Grabación con el Canal Telecafé en una cafetería",
      },
      {
        src: claqueta,
        alt: "Claqueta de rodaje con el nombre de Nicol Bedoya",
        wide: false,
      },
    ],
  },
];

const CONTACT = {
  email: "bedoyan471@gmail.com",
  phone: "3117599645",
  place: "Circasia, Quindío",
  school: "Universidad del Quindío",
};

/* ------------------------------------------------------------------ */
/* Hooks de efectos                                                    */
/* ------------------------------------------------------------------ */

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Desplaza su contenido según el scroll: speed 0.2 = se mueve a 20% de la velocidad. */
function Parallax({ speed = 0.2, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    let raf = 0;
    const update = () => {
      const parent = el.parentElement.getBoundingClientRect();
      const offset =
        (parent.top + parent.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return p;
}

/* ------------------------------------------------------------------ */
/* Piezas decorativas                                                  */
/* ------------------------------------------------------------------ */

/** Flecha punteada que se "dibuja" al entrar en pantalla (como en el PDF). */
function DashedArrow({ d, head, className = "", delay = 0, width = 2 }) {
  const id = useId().replace(/:/g, "");
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 100"
      fill="none"
      aria-hidden="true"
      className={`draw ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      <defs>
        <mask id={id}>
          <path
            className="mask-path"
            d={d}
            stroke="white"
            strokeWidth={width + 6}
            pathLength="1"
            strokeLinecap="round"
          />
        </mask>
      </defs>
      <path
        d={d}
        mask={`url(#${id})`}
        stroke="currentColor"
        strokeWidth={width}
        strokeDasharray="5 8"
        strokeLinecap="round"
      />
      {head && (
        <path
          d={head}
          stroke="currentColor"
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: `${delay + 1700}ms` }}
        />
      )}
    </svg>
  );
}

function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-ember/30 bg-ember py-4 text-cream"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl font-semibold italic tracking-tight md:text-3xl"
          >
            {s}
            <span className="font-script text-3xl font-normal opacity-80">
              ✻
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Secciones                                                           */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Modo noche                                                          */
/* ------------------------------------------------------------------ */

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  /** Cambia el tema con un círculo que se expande desde el botón. */
  const toggle = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition || prefersReduced())
      return setTheme(next);
    const x = e.clientX || window.innerWidth - 40;
    const y = e.clientY || 40;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const t = document.startViewTransition(() => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    });
    t.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(.6,0,.2,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };
  return [theme, toggle];
}

function ThemeToggle({ theme, onToggle, light }) {
  const dark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Activar modo día" : "Activar modo noche"}
      title={dark ? "Modo día" : "Modo noche"}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
        light
          ? "border-cream/40 text-cream hover:bg-cream/10"
          : "border-ember/40 text-ember hover:bg-ember/10"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

function Nav({ theme, onToggleTheme }) {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const scrolled = progress > 0.02;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-paper/85 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#inicio"
          className={`font-script text-3xl transition-colors duration-500 ${scrolled || open ? "text-ember" : "text-cream"}`}
        >
          Nicol Bedoya
        </a>
        <ul className="ml-auto hidden gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`group relative font-sans text-sm font-semibold transition-colors duration-500 ${
                  scrolled ? "text-cocoa" : "text-cream"
                }`}
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2 md:ml-8">
          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
            light={!(scrolled || open)}
          />
          <button
            onClick={() => setOpen((o) => !o)}
            className={`md:hidden ${scrolled || open ? "text-cocoa" : "text-cream"}`}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`grid overflow-hidden transition-all duration-500 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="min-h-0 px-5">
          {NAV.map((n) => (
            <li key={n.href} className="border-t border-ember/20">
              <a
                href={n.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-xl font-extrabold text-cocoa"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="h-[2px] origin-left bg-ember"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (prefersReduced()) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };
  const words = ["NICOL", "DAJANA", "BEDOYA"];
  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex h-[100svh] min-h-[560px] items-end overflow-hidden bg-[#2a150b]"
    >
      <div
        className="absolute -inset-6 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${tilt.x * -18}px, ${tilt.y * -12}px, 0)`,
        }}
      >
        <img
          src={hero}
          alt=""
          className="h-full w-full animate-kenburns object-cover object-[60%_35%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a150b] via-[#2a150b]/40 to-[#2a150b]/10" />

      <div
        className="relative z-10 w-full px-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] md:px-12 md:pb-16"
        style={{
          transform: `translate3d(${tilt.x * 10}px, ${tilt.y * 6}px, 0)`,
        }}
      >
        <p className="mb-3 animate-fadein font-sans text-xs font-semibold tracking-[0.18em] text-cream/90 [animation-delay:600ms] md:text-sm">
          Estudiante de Comunicación Social y Periodismo
        </p>
        <h1 className="font-display font-black leading-[0.82] tracking-tight text-ember [font-size:clamp(3.2rem,11vw,10rem)]">
          <span className="sr-only">Nicol Dajana Bedoya</span>
          <span aria-hidden="true" className="flex flex-wrap gap-x-[0.25em]">
            {words.map((w, i) => (
              <span
                key={w}
                className="inline-block overflow-hidden pb-[0.06em]"
              >
                <span
                  className="inline-block animate-rise"
                  style={{ animationDelay: `${300 + i * 140}ms` }}
                >
                  {w}
                </span>
              </span>
            ))}
          </span>
        </h1>
        <p
          aria-hidden="true"
          className="-mt-[0.35em] ml-[18%] animate-write font-script leading-none text-cream [animation-delay:1100ms] [font-size:clamp(3.5rem,10vw,8.5rem)]"
        >
          portfolio
        </p>
      </div>

      <a
        href="#sobre-mi"
        className="absolute bottom-6 right-6 z-10 hidden animate-fadein flex-col items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-cream/80 [animation-delay:2s] md:flex"
      >
        Desliza
        <span className="relative h-12 w-px overflow-hidden bg-cream/30">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-cream" />
        </span>
      </a>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}

function About() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (prefersReduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };
  return (
    <section id="sobre-mi" className="relative overflow-hidden py-24 md:py-36">
      <Parallax speed={0.25} className="absolute -inset-y-40 inset-x-0">
        <img
          src={flor1}
          alt=""
          className="h-full w-full object-cover opacity-70 blur-[2px] dark:opacity-25"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/30" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.25fr_1fr] md:px-8">
        <div>
          <Reveal
            as="h2"
            className="font-display font-black leading-[0.9] text-ember [font-size:clamp(3rem,8vw,6.5rem)]"
          >
            Sobre mí
          </Reveal>
          <div className="mt-8 max-w-[38rem] space-y-5 text-lg leading-relaxed md:text-xl">
            <Reveal as="p" delay={100}>
              Soy Nicol Dajana Bedoya Ocampo, tengo 21 años y soy estudiante de
              décimo semestre de Comunicación Social y Periodismo.
            </Reveal>
            <Reveal as="p" delay={200}>
              Me apasiona la comunicación como una herramienta para contar
              historias, construir ideas y conectar marcas y personas. Durante
              mi formación he desarrollado habilidades en creación de
              contenidos, comunicación estratégica, producción audiovisual,
              redacción y manejo de redes sociales.
            </Reveal>
            <Reveal as="p" delay={300}>
              Me considero una persona creativa, curiosa, proactiva y
              comprometida, siempre interesada en encontrar nuevas maneras de
              comunicar una idea y convertirla en algo que genere impacto.
            </Reveal>
          </div>
        </div>

        <Reveal
          delay={200}
          className="mx-auto w-full max-w-sm [perspective:1000px]"
        >
          <div
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="group relative transition-transform duration-300 ease-out"
            style={{
              transform: `rotateY(${tilt.x * 10}deg) rotateX(${tilt.y * -10}deg)`,
            }}
          >
            <div className="absolute -inset-3 -rotate-3 border-2 border-dashed border-ember/60 transition-transform duration-500 group-hover:rotate-2" />
            <img
              src={retrato}
              alt="Retrato de Nicol Bedoya sosteniendo un teléfono antiguo"
              className="relative aspect-[2/3] w-full object-cover shadow-[0_30px_60px_-20px_rgba(74,36,18,0.55)]"
              loading="lazy"
            />
            {/* <span className="absolute -bottom-8 -left-6 font-script text-6xl text-ember drop-shadow-sm">21 años</span> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Etiquetas que se acercan al cursor como si fueran imanes. */
function MagneticTag({ children, pointer }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!pointer || !ref.current) return setOffset({ x: 0, y: 0 });
    const r = ref.current.getBoundingClientRect();
    const dx = pointer.x - (r.left + r.width / 2);
    const dy = pointer.y - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const radius = 160;
    if (dist > radius) return setOffset({ x: 0, y: 0 });
    const pull = (1 - dist / radius) * 0.35;
    setOffset({ x: dx * pull, y: dy * pull });
  }, [pointer]);
  return (
    <li
      ref={ref}
      className="border border-ember px-3 py-1.5 text-sm text-rust transition-[transform,background-color,color] duration-300 ease-out hover:bg-ember hover:text-cream md:text-base"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </li>
  );
}

function Skills() {
  const [pointer, setPointer] = useState(null);
  const onMove = (e) => {
    if (prefersReduced() || e.pointerType !== "mouse") return;
    setPointer({ x: e.clientX, y: e.clientY });
  };
  const top = SKILLS.slice(0, 6);
  const bottom = SKILLS.slice(6);
  return (
    <section
      id="que-se-hacer"
      onPointerMove={onMove}
      onPointerLeave={() => setPointer(null)}
      className="relative overflow-hidden bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ul className="flex max-w-3xl flex-wrap gap-3">
          {top.map((s) => (
            <MagneticTag key={s} pointer={pointer}>
              {s}
            </MagneticTag>
          ))}
        </ul>

        <div className="relative my-14 flex items-center justify-center md:my-10">
          <DashedArrow
            className="absolute -left-2 top-1/2 hidden w-40 -translate-y-1/2 text-ember md:block lg:left-16"
            d="M10 70 C 40 20, 90 20, 120 55 S 170 80, 190 50"
            head="M178 46 L190 50 L184 61"
          />
          <Reveal
            as="h2"
            className="text-center font-display font-black leading-[0.85] text-ember [font-size:clamp(3.2rem,10vw,8rem)]"
          >
            ¿Qué sé
            <br />
            hacer?
          </Reveal>
          <DashedArrow
            className="absolute -right-2 top-[60%] hidden w-36 text-ember md:block lg:right-20"
            d="M10 40 C 60 70, 120 70, 185 45"
            head="M172 38 L186 45 L176 56"
            delay={400}
          />
        </div>

        <ul className="ml-auto flex max-w-3xl flex-wrap justify-end gap-3">
          {bottom.map((s) => (
            <MagneticTag key={s} pointer={pointer}>
              {s}
            </MagneticTag>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContentQuote() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 py-28">
      <Parallax speed={0.35} className="absolute -inset-y-48 inset-x-0">
        <img
          src={flor2}
          alt=""
          className="h-full w-full scale-110 object-cover blur-[3px]"
          loading="lazy"
        />
      </Parallax>
      <div className="absolute inset-0 bg-[#fff1e2]/45 dark:bg-[#1e130d]/55" />
      <div className="relative max-w-4xl text-center">
        <Reveal
          as="h2"
          className="font-script leading-none text-cream drop-shadow-[0_2px_18px_rgba(74,36,18,0.45)] [font-size:clamp(3.6rem,11vw,9rem)]"
        >
          Creación de contenido
        </Reveal>
        <Reveal
          as="p"
          delay={250}
          className="mx-auto mt-6 max-w-2xl font-display text-2xl italic leading-snug text-cream drop-shadow-[0_1px_10px_rgba(74,36,18,0.6)] md:text-3xl"
        >
          La audiencia de la generación actual valora la autenticidad. Quieren
          historias reales contadas por personas reales.
        </Reveal>
      </div>
    </section>
  );
}

function Enfoque() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.4 });
  useEffect(() => {
    if (!inView || prefersReduced()) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % ENFOQUE.length),
      1600,
    );
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section ref={ref} className="relative bg-blush/50 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div>
          <Reveal className="inline-block bg-ember px-5 py-2 font-sans text-lg font-semibold text-cream">
            Mi enfoque
          </Reveal>
          <p className="mt-8 font-display font-extrabold leading-[1.05] [font-size:clamp(2rem,4.6vw,3.6rem)]">
            {ENFOQUE.map((w, i) => (
              <span key={w}>
                <span
                  className={`relative inline-block transition-colors duration-500 ${active === i ? "text-ember" : "text-cocoa/35"}`}
                >
                  {w}
                  <span
                    className={`absolute -bottom-1 left-0 h-[3px] bg-ember transition-all duration-700 ${active === i ? "w-full" : "w-0"}`}
                  />
                </span>
                {i < ENFOQUE.length - 1 && (
                  <span className="text-cocoa/35"> + </span>
                )}
              </span>
            ))}
          </p>
          <Reveal
            as="p"
            delay={150}
            className="mt-8 max-w-md text-lg leading-relaxed md:text-xl"
          >
            Combino las herramientas del periodismo con la creatividad de la
            comunicación para desarrollar contenidos que informan, cuentan
            historias y conectan con diferentes audiencias.
          </Reveal>
        </div>

        <div className="relative mx-auto grid w-full max-w-lg grid-cols-[0.8fr_1.2fr] gap-4">
          <div className="flex flex-col gap-4 pt-10">
            <Reveal delay={100}>
              <img
                src={claqueta}
                alt="Claqueta de rodaje"
                loading="lazy"
                className="aspect-[3/4] w-full -rotate-2 object-cover shadow-xl transition-transform duration-500 hover:rotate-0 hover:scale-105"
              />
            </Reveal>
            <Reveal delay={250}>
              <img
                src={edicion}
                alt="Nicol en un set de producción"
                loading="lazy"
                className="aspect-[3/4] w-full rotate-1 object-cover shadow-xl transition-transform duration-500 hover:rotate-0 hover:scale-105"
              />
            </Reveal>
          </div>
          <Reveal delay={180}>
            <img
              src={evento}
              alt="Nicol en un evento de prensa deportivo"
              loading="lazy"
              className="aspect-[3/4.4] w-full object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Portada del video: al pasar el mouse se reproduce en silencio como avance. */
function VideoPreview({ src, poster }) {
  const ref = useRef(null);
  const play = () => {
    if (prefersReduced()) return;
    const v = ref.current;
    v.muted = true;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = ref.current;
    v.pause();
    v.currentTime = 0;
  };
  return (
    <span
      className="block h-full w-full"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-[#8E3A0C] shadow-lg">
          <svg width="18" height="18" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2.5 1l6.5 4-6.5 4z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </span>
  );
}

function Lightbox({ photos, index, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);
  const p = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.video ? "Video" : "Foto ampliada"}
      className="fixed inset-0 z-[70] flex animate-fadein items-center justify-center bg-[#1b0f08]/90 p-4 [animation-duration:300ms]"
      onClick={onClose}
    >
      {p.video ? (
        <video
          key={p.video}
          src={p.video}
          poster={p.src}
          controls
          autoPlay
          playsInline
          onClick={(e) => e.stopPropagation()}
          className="max-h-[82svh] max-w-full animate-fadein bg-black shadow-2xl [animation-duration:400ms]"
          aria-label={p.alt}
        />
      ) : (
        <img
          key={p.src}
          src={p.src}
          alt={p.alt}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85svh] max-w-full animate-fadein object-contain shadow-2xl [animation-duration:400ms]"
        />
      )}
      <p className="absolute inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] text-center text-lg text-cream/80">
        {p.alt}{" "}
        <span className="ml-2 font-sans text-sm">
          {index + 1} / {photos.length}
        </span>
      </p>
      {photos.length > 1 && (
        <>
          <button
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-4xl text-cream/80 hover:text-cream"
          >
            ‹
          </button>
          <button
            aria-label="Foto siguiente"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-4xl text-cream/80 hover:text-cream"
          >
            ›
          </button>
        </>
      )}
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute right-4 top-[calc(1rem+env(safe-area-inset-top,0px))] p-2 text-3xl text-cream/80 hover:text-cream"
      >
        ×
      </button>
    </div>
  );
}

function Projects() {
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const area = AREAS[tab];
  const step = useCallback(
    (d) =>
      setLightbox((i) => (i + d + area.photos.length) % area.photos.length),
    [area.photos.length],
  );
  const close = useCallback(() => setLightbox(null), []);

  return (
    <section id="proyectos" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-end">
          <Reveal
            as="h2"
            className="font-display font-black leading-[0.9] text-ember [font-size:clamp(2.6rem,6vw,5rem)]"
          >
            Proyectos y experiencias
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="max-w-[40rem] text-lg leading-relaxed"
          >
            Algunos de los proyectos y experiencias que he desarrollado durante
            mi formación en Comunicación Social y Periodismo. Cada uno
            representa una parte de mi proceso y de las diferentes maneras en
            las que he aprendido a contar, crear y comunicar.
          </Reveal>
        </div>

        <div
          role="tablist"
          aria-label="Áreas de trabajo"
          className="mt-14 flex flex-wrap gap-2 border-b border-ember/25"
        >
          {AREAS.map((a, i) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`relative -mb-px px-4 py-3 font-sans text-base font-semibold transition-colors md:text-lg ${
                tab === i ? "text-ember" : "text-cocoa/60 hover:text-cocoa"
              }`}
            >
              {a.title}
              <span
                className={`absolute inset-x-0 bottom-0 h-[3px] bg-ember transition-transform duration-500 ${tab === i ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          ))}
        </div>

        <div
          key={area.id}
          role="tabpanel"
          className="animate-fadein [animation-duration:600ms]"
        >
          <p className="mt-6 max-w-2xl font-display text-xl italic leading-relaxed text-rust md:text-2xl">
            {area.text}
          </p>
          {(() => {
            const tall = area.photos.filter((p) => !p.wide);
            const wide = area.photos.filter((p) => p.wide);
            const cols = {
              1: "max-w-sm grid-cols-1",
              2: "max-w-2xl grid-cols-2",
              3: "grid-cols-2 md:grid-cols-3",
              4: "grid-cols-2 md:grid-cols-4",
            };
            const tile = (p, i) => {
              const idx = area.photos.indexOf(p);
              return (
                <button
                  key={p.src}
                  onClick={() => setLightbox(idx)}
                  aria-label={`${p.video ? "Reproducir video" : "Ampliar foto"}: ${p.alt}`}
                  className={`group relative overflow-hidden bg-blush text-left ${p.wide ? "aspect-[16/9]" : "aspect-[3/4]"}`}
                  style={{
                    animation: `liftin .8s cubic-bezier(.2,.8,.2,1) ${idx * 90}ms both`,
                  }}
                >
                  {p.video ? (
                    <VideoPreview src={p.video} poster={p.src} />
                  ) : (
                    <img
                      src={p.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                    />
                  )}
                  {p.video && (
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#1b0f08]/60 px-2.5 py-1 font-sans text-xs font-semibold text-cream backdrop-blur-sm">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                      >
                        <path d="M2 1l7 4-7 4z" fill="currentColor" />
                      </svg>
                      Video
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-[#2a150b]/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-sans text-sm font-semibold text-cream">
                      {p.video ? "Ver video" : "Ver foto"}
                    </span>
                  </span>
                </button>
              );
            };
            return (
              <div className="mt-8 space-y-4">
                {tall.length > 0 && (
                  <div
                    className={`grid gap-4 ${cols[Math.min(tall.length, 4)]}`}
                  >
                    {tall.map(tile)}
                  </div>
                )}
                {wide.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {wide.map(tile)}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          photos={area.photos}
          index={lightbox}
          onClose={close}
          onStep={step}
        />
      )}
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };
  const items = [
    { label: "Lugar de residencia", value: CONTACT.place },
    {
      label: "Correo electrónico",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      label: "Teléfono",
      value: CONTACT.phone,
      href: `tel:+57${CONTACT.phone}`,
    },
    { label: "Formación académica", value: CONTACT.school },
  ];
  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-24 text-cream md:py-32"
    >
      <Parallax speed={0.3} className="absolute -inset-y-48 inset-x-0">
        <img
          src={flor3}
          alt=""
          className="h-full w-full object-cover blur-[2px]"
          loading="lazy"
        />
      </Parallax>
      <div className="absolute inset-0 bg-[#3b1a0b]/55" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal
          as="h2"
          className="text-center font-display font-black leading-[0.95] [font-size:clamp(2.6rem,7vw,5.5rem)]"
        >
          Información personal
        </Reveal>
        <dl className="mx-auto mt-14 grid max-w-3xl gap-x-12 gap-y-10 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 100}>
              <dt className="inline-block bg-ember px-4 py-1.5 font-sans text-sm font-semibold">
                {it.label}
              </dt>
              <dd className="mt-3 break-words font-display text-2xl md:text-[1.7rem]">
                {it.href ? (
                  <a
                    href={it.href}
                    className="underline decoration-cream/40 decoration-1 underline-offset-[6px] transition hover:decoration-cream"
                  >
                    {it.value}
                  </a>
                ) : (
                  it.value
                )}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal
          delay={300}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <a
            href={`https://wa.me/57${CONTACT.phone}`}
            target="_blank"
            rel="noreferrer"
            className="bg-cream px-6 py-3 font-sans font-semibold text-[#8E3A0C] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Escribir por WhatsApp
          </a>
          <button
            onClick={copy}
            className="border border-cream px-6 py-3 font-sans font-semibold transition hover:-translate-y-0.5 hover:bg-cream/10"
            aria-live="polite"
          >
            {copied ? "Correo copiado" : "Copiar correo"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Thanks() {
  return (
    <section className="relative overflow-hidden bg-paper px-5 py-28 md:py-40">
      <DashedArrow
        className="absolute left-2 top-10 w-40 text-ember md:left-16 md:w-56"
        d="M8 60 C 40 10, 80 90, 120 40 S 170 30, 190 40"
        head="M178 33 L190 40 L180 50"
      />
      <DashedArrow
        className="absolute bottom-10 right-2 w-40 rotate-180 text-ember md:right-16 md:w-56"
        d="M8 60 C 50 90, 90 10, 130 45 S 175 70, 190 45"
        head="M178 40 L190 45 L182 56"
        delay={500}
      />
      <div className="relative text-center">
        <Reveal
          as="p"
          className="font-display font-black text-cocoa [font-size:clamp(3.5rem,12vw,9rem)]"
        >
          ¡Gracias!
        </Reveal>
        <Reveal
          as="p"
          delay={300}
          className="mt-2 font-script text-5xl text-ember md:text-6xl"
        >
          Nicol Bedoya
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="grain">
      <a
        href="#sobre-mi"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-paper focus:p-3"
      >
        Saltar al contenido
      </a>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <ContentQuote />
        <Enfoque />
        <Marquee items={AREAS.map((a) => a.title)} />
        <Projects />
        <Contact />
        <Thanks />
      </main>
      <footer className="border-t border-ember/20 bg-paper py-6 text-center font-sans text-sm text-cocoa/60">
        © {new Date().getFullYear()} Nicol Dajana Bedoya Ocampo
      </footer>
    </div>
  );
}
