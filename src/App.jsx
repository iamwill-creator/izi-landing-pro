import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Clock,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Zap,
  MapPin,
  PackageCheck,
  Activity,
  Radio,
  Sparkles,
  ChevronRight,
  Send,
  PhoneCall,
  Layers,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   BOUTON MAGNÉTIQUE RÉUTILISABLE (Micro-interaction scale 1.03 + couche glissante)
   ========================================================================== */
function MagneticButton({
  children,
  onClick,
  href,
  variant = 'accent',
  className = '',
  type = 'button'
}) {
  const styles = {
    accent: {
      base: 'bg-[#CC5833] text-[#F2F0E9] shadow-[0_14px_34px_-10px_rgba(204,88,51,0.55)]',
      slide: 'bg-[#2E4036]'
    },
    primary: {
      base: 'bg-[#2E4036] text-[#F2F0E9] shadow-[0_14px_34px_-10px_rgba(46,64,54,0.45)]',
      slide: 'bg-[#CC5833]'
    },
    cream: {
      base: 'bg-[#F2F0E9] text-[#1A1A1A] border border-[#2E4036]/15',
      slide: 'bg-[#CC5833]'
    },
    outlineLight: {
      base: 'bg-white/10 text-[#F2F0E9] border border-[#F2F0E9]/25 backdrop-blur-md',
      slide: 'bg-[#CC5833]'
    }
  };

  const current = styles[variant] || styles.accent;
  const content = (
    <>
      <span className={`btn-slide rounded-full ${current.slide}`} />
      <span className="relative z-10 inline-flex items-center gap-2.5 font-display font-semibold tracking-tight">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`btn-magnetic inline-flex items-center justify-center rounded-full px-7 py-4 text-sm md:text-base ${current.base} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-magnetic inline-flex items-center justify-center rounded-full px-7 py-4 text-sm md:text-base ${current.base} ${className}`}
    >
      {content}
    </button>
  );
}

/* ==========================================================================
   CARTE 1 — "MÉLANGEUR DIAGNOSTIQUE" (Argument 1 : Livraison rapide)
   3 cartes superposées qui cyclent verticalement via array.unshift(array.pop())
   toutes les 3 secondes avec transition rebond élastique cubic-bezier(0.34, 1.56, 0.64, 1)
   ========================================================================== */
function DiagnosticShufflerCard() {
  const [cards, setCards] = useState([
    {
      id: 'cotonou-core',
      code: 'BEN-CTN-01',
      title: 'Corridor Express Cotonou',
      metric: '28 MIN',
      sub: 'Akpakpa → Ganhi → Haie Vive',
      status: 'VÉLOCITÉ OPTIMALE',
      badgeColor: 'bg-[#2E4036] text-[#F2F0E9]'
    },
    {
      id: 'calavi-link',
      code: 'BEN-ABM-02',
      title: 'Liaison Rapide Calavi & Ouidah',
      metric: '44 MIN',
      sub: 'Godomey → Abomey-Calavi → Pahou',
      status: 'FLUX PRIORITAIRE',
      badgeColor: 'bg-[#CC5833] text-[#F2F0E9]'
    },
    {
      id: 'porto-axis',
      code: 'BEN-PTN-03',
      title: 'Pont Interurbain Porto-Novo',
      metric: '52 MIN',
      sub: 'Sèmè-Podji → Ouando → Centre Administratif',
      status: 'TRANSIT DIRECT',
      badgeColor: 'bg-[#1A1A1A] text-[#F2F0E9]'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const copy = [...prev];
        copy.unshift(copy.pop());
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feature-card group relative flex flex-col justify-between rounded-[2.25rem] border border-[#2E4036]/15 bg-[#F2F0E9] p-7 md:p-8 shadow-[0_24px_60px_-20px_rgba(26,26,26,0.12)]">
      {/* En-tête micro-interface */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-3.5 py-1.5 font-mono text-xs font-medium text-[#2E4036]">
            <Zap className="h-3.5 w-3.5 text-[#CC5833]" />
            01 / VÉLOCITÉ CHRONOMÉTRÉE
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#1A1A1A]/50">
            CYCLE AUTO • 3.0S
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A]">
          Livraison Rapide Multi-Corridors
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">
          Routage prédictif par secteur urbain et périurbain au Bénin. Nos coursiers évitent les goulots d&apos;étranglement en temps réel.
        </p>
      </div>

      {/* Mélangeur Diagnostique — Pile 3 cartes */}
      <div className="relative my-8 h-[264px] w-full select-none">
        {cards.map((card, index) => {
          const translateY = (2 - index) * 34;
          const scale = 1 - index * 0.045;
          const opacity = 1 - index * 0.14;
          const zIndex = 30 - index * 10;

          return (
            <div
              key={card.id}
              style={{
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'all 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              className="absolute inset-x-0 top-0 rounded-[1.75rem] border border-[#2E4036]/15 bg-white p-5 shadow-[0_18px_40px_-12px_rgba(46,64,54,0.18)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#2E4036]/75">
                  {card.code}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${card.badgeColor}`}
                >
                  {card.status}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="font-display text-base font-bold text-[#1A1A1A]">
                    {card.title}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#1A1A1A]/60">
                    {card.sub}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-[#CC5833]">
                    {card.metric}
                  </span>
                  <span className="block font-mono text-[10px] text-[#1A1A1A]/45">
                    DÉLAI MOYEN
                  </span>
                </div>
              </div>

              {/* Barre de progression organique */}
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F2F0E9]">
                <div
                  className="h-full rounded-full bg-[#2E4036] transition-all duration-700"
                  style={{ width: index === 0 ? '92%' : index === 1 ? '76%' : '64%' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pied de carte */}
      <div className="flex items-center justify-between border-t border-[#2E4036]/10 pt-4 font-mono text-xs text-[#2E4036]">
        <span>CADENCE : 98.7% À L&apos;HEURE</span>
        <button
          type="button"
          onClick={() =>
            setCards((prev) => {
              const copy = [...prev];
              copy.unshift(copy.pop());
              return copy;
            })
          }
          className="link-lift font-semibold text-[#CC5833] hover:underline"
        >
          Permuter le corridor →
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   CARTE 2 — "MACHINE À ÉCRIRE TÉLÉMÉTRIE" (Argument 2 : Service professionnel)
   Flux de texte monospace en direct caractère par caractère avec curseur
   clignotant couleur accent et label "Flux en Direct" avec point pulsant.
   ========================================================================== */
const TELEMETRY_MESSAGES = [
  '>> PROTOCOLE QUALITÉ : Scellé inviolable #BEN-884 vérifié à Cadjèhoun.',
  '>> AGENT CERTIFIÉ : Coursier K. Mensah (Badge Pro Niv.4) assigné au pli diplomatique.',
  '>> MANUTENTION CLINIQUE : Colis fragile stabilisé • Capteur choc 0.02G OK.',
  '>> PREUVE DE REMISE : Signature biométrique + Code OTP validés à Ganhi.',
  '>> ASSURANCE INTÉGRALE : Garantie marchandise active sur tout le territoire béninois.'
];

function TelemetryTypewriterCard() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [history, setHistory] = useState([
    '>> INITIALISATION TERMINAL LIVREXPRESS PRO v4.2...',
    '>> AUDIT CONFORMITÉ : 100% DES AGENTS EN TENUE & BADGÉS.'
  ]);

  useEffect(() => {
    const currentMessage = TELEMETRY_MESSAGES[msgIndex];

    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 28);
      return () => clearTimeout(timeout);
    } else {
      const pauseTimeout = setTimeout(() => {
        setHistory((prev) => [...prev.slice(-2), currentMessage]);
        setCharIndex(0);
        setMsgIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
      }, 1700);
      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, msgIndex]);

  const activeText = TELEMETRY_MESSAGES[msgIndex].slice(0, charIndex);

  return (
    <div className="feature-card group relative flex flex-col justify-between rounded-[2.25rem] border border-[#2E4036]/15 bg-[#F2F0E9] p-7 md:p-8 shadow-[0_24px_60px_-20px_rgba(26,26,26,0.12)]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-3.5 py-1.5 font-mono text-xs font-medium text-[#2E4036]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#CC5833]" />
            02 / STANDARD PROFESSIONNEL
          </span>

          {/* Label "Flux en Direct" avec point pulsant */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-3 py-1 font-mono text-[11px] font-medium text-[#F2F0E9]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CC5833] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CC5833]" />
            </span>
            Flux en Direct
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A]">
          Service Professionnel Certifié
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">
          Traçabilité de bout en bout, coursiers formés aux protocoles d&apos;entreprise, remise contre code OTP et assurance marchandise systématique.
        </p>
      </div>

      {/* Console Télémétrique Monospace */}
      <div className="my-8 flex h-56 flex-col justify-between rounded-[1.75rem] border border-[#2E4036]/20 bg-[#1A1A1A] p-5 text-[#F2F0E9] shadow-inner">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#CC5833]" />
            <span className="font-mono text-xs tracking-wider text-[#F2F0E9]/80">
              TELEMETRY.BENIN.PRO
            </span>
          </div>
          <span className="rounded bg-[#2E4036] px-2 py-0.5 font-mono text-[10px] text-[#F2F0E9]">
            ISO-LOGISTIQUE
          </span>
        </div>

        <div className="my-auto space-y-2.5 overflow-hidden py-2 font-mono text-xs leading-relaxed">
          {history.map((line, i) => (
            <p key={i} className="truncate text-[#F2F0E9]/45">
              {line}
            </p>
          ))}
          <p className="text-[#F2F0E9] font-medium">
            {activeText}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#CC5833]" />
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 font-mono text-[11px] text-[#F2F0E9]/60">
          <span>OTP + SIGNATURE NUMÉRIQUE</span>
          <span className="text-[#CC5833]">INTÉGRITÉ : 100%</span>
        </div>
      </div>

      {/* Pied de carte */}
      <div className="flex items-center justify-between border-t border-[#2E4036]/10 pt-4 font-mono text-xs text-[#2E4036]">
        <span>COURSIERS BADGÉS &amp; ASSURÉS</span>
        <span className="font-semibold text-[#2E4036]">ZÉRO PERTE</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   CARTE 3 — "PLANIFICATEUR PROTOCOLE CURSEUR" (Argument 3 : Disponibilité 24h/24h)
   Grille hebdomadaire (L M M J V S D) où un curseur SVG animé se déplace
   vers une cellule de jour, clique (scale 0.95), active le jour (surlignage accent),
   puis se déplace vers un bouton "Sauvegarder" avant de disparaître.
   ========================================================================== */
const DAYS = [
  { key: 'L', label: 'Lun', slot: '00:00 - 24:00' },
  { key: 'Ma', label: 'Mar', slot: '00:00 - 24:00' },
  { key: 'Me', label: 'Mer', slot: '00:00 - 24:00' },
  { key: 'J', label: 'Jeu', slot: '00:00 - 24:00' },
  { key: 'V', label: 'Ven', slot: '00:00 - 24:00' },
  { key: 'S', label: 'Sam', slot: '00:00 - 24:00' },
  { key: 'D', label: 'Dim', slot: '00:00 - 24:00' }
];

function CursorProtocolSchedulerCard() {
  const [activeDays, setActiveDays] = useState([0, 1, 2, 3, 4]);
  const [pressedDay, setPressedDay] = useState(null);
  const [savePressed, setSavePressed] = useState(false);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [cursorState, setCursorState] = useState({
    x: 24,
    y: 28,
    opacity: 0
  });

  useEffect(() => {
    let isMounted = true;
    const targetSequence = [5, 6, 2, 4];
    let stepIdx = 0;

    const runCycle = () => {
      if (!isMounted) return;
      const dayIndex = targetSequence[stepIdx % targetSequence.length];
      stepIdx += 1;

      // Coordonnées relatives de la cellule dans la grille 7 colonnes
      const cellX = 14 + dayIndex * 38;
      const cellY = 48;

      // 1. Apparition et déplacement vers la cellule du jour
      setSaveConfirmed(false);
      setCursorState({ x: cellX, y: cellY, opacity: 1 });

      // 2. Clic visuel sur la cellule (scale 0.95) + activation accent
      setTimeout(() => {
        if (!isMounted) return;
        setPressedDay(dayIndex);
        setActiveDays((prev) =>
          prev.includes(dayIndex) ? prev : [...prev, dayIndex]
        );
      }, 750);

      // 3. Relâchement cellule et déplacement vers le bouton "Sauvegarder"
      setTimeout(() => {
        if (!isMounted) return;
        setPressedDay(null);
        setCursorState({ x: 215, y: 142, opacity: 1 });
      }, 1150);

      // 4. Clic sur le bouton "Sauvegarder"
      setTimeout(() => {
        if (!isMounted) return;
        setSavePressed(true);
        setSaveConfirmed(true);
      }, 1750);

      // 5. Disparition du curseur SVG
      setTimeout(() => {
        if (!isMounted) return;
        setSavePressed(false);
        setCursorState((prev) => ({ ...prev, opacity: 0 }));
      }, 2150);
    };

    runCycle();
    const interval = setInterval(runCycle, 3400);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="feature-card group relative flex flex-col justify-between rounded-[2.25rem] border border-[#2E4036]/15 bg-[#F2F0E9] p-7 md:p-8 shadow-[0_24px_60px_-20px_rgba(26,26,26,0.12)]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-3.5 py-1.5 font-mono text-xs font-medium text-[#2E4036]">
            <Clock className="h-3.5 w-3.5 text-[#CC5833]" />
            03 / PERMANENCE CONTINUE
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#CC5833]">
            24H/24 • 7J/7
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A]">
          Disponibilité 24h/24 &amp; Astreinte Nuit
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">
          Collecte et distribution ininterrompues, y compris les week-ends, jours fériés et urgences nocturnes pharmaceutiques ou industrielles.
        </p>
      </div>

      {/* Grille Hebdomadaire Interactive avec Curseur SVG Animé */}
      <div className="relative my-8 h-56 rounded-[1.75rem] border border-[#2E4036]/15 bg-white p-5 shadow-[0_16px_35px_-12px_rgba(46,64,54,0.12)] overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#2E4036]">
            PLANIFICATEUR ASTREINTE 24/7
          </span>
          <span className="rounded-full bg-[#2E4036]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#2E4036]">
            GARDE ACTIVE
          </span>
        </div>

        {/* Grille L M M J V S D */}
        <div className="grid grid-cols-7 gap-1.5 my-4">
          {DAYS.map((day, idx) => {
            const isActive = activeDays.includes(idx);
            const isPressed = pressedDay === idx;
            return (
              <button
                key={day.key}
                type="button"
                onClick={() =>
                  setActiveDays((prev) =>
                    prev.includes(idx)
                      ? prev.filter((d) => d !== idx)
                      : [...prev, idx]
                  )
                }
                style={{
                  transform: isPressed ? 'scale(0.95)' : 'scale(1)'
                }}
                className={`flex flex-col items-center justify-center rounded-2xl py-3 transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#CC5833] text-[#F2F0E9] border-[#CC5833] shadow-sm'
                    : 'bg-[#F2F0E9] text-[#1A1A1A] border-[#2E4036]/10'
                }`}
              >
                <span className="font-mono text-xs font-bold">
                  {day.key.charAt(0)}
                </span>
                <span className="mt-1 font-mono text-[9px] opacity-80">
                  24h
                </span>
              </button>
            );
          })}
        </div>

        {/* Barre inférieure avec bouton Sauvegarder */}
        <div className="mt-5 flex items-center justify-between border-t border-[#2E4036]/10 pt-3.5">
          <div className="font-mono text-[11px] text-[#1A1A1A]/65">
            <span>Créneau : </span>
            <strong className="text-[#2E4036]">00h00 → 23h59</strong>
          </div>

          <button
            type="button"
            onClick={() => setSaveConfirmed(true)}
            style={{
              transform: savePressed ? 'scale(0.95)' : 'scale(1)'
            }}
            className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all duration-200 ${
              saveConfirmed
                ? 'bg-[#2E4036] text-[#F2F0E9]'
                : 'bg-[#1A1A1A] text-[#F2F0E9]'
            }`}
          >
            {saveConfirmed ? '✓ Sauvegarder' : 'Sauvegarder'}
          </button>
        </div>

        {/* Curseur SVG animé */}
        <div
          style={{
            transform: `translate3d(${cursorState.x}px, ${cursorState.y}px, 0)`,
            opacity: cursorState.opacity,
            transition:
              'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease'
          }}
          className="pointer-events-none absolute left-0 top-0 z-30 drop-shadow-md"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 3L11.5 20L14.2 13.8L20.5 11.2L4 3Z"
              fill="#1A1A1A"
              stroke="#F2F0E9"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Pied de carte */}
      <div className="flex items-center justify-between border-t border-[#2E4036]/10 pt-4 font-mono text-xs text-[#2E4036]">
        <span>DISPATCH NOCTURNE &amp; FÉRIÉS</span>
        <span className="font-semibold text-[#CC5833]">365 JOURS / AN</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPOSANT PRINCIPAL — App.jsx
   ========================================================================== */
export default function App() {
  const rootRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    company: '',
    phone: '',
    pickup: 'Cotonou — Ganhi / Haie Vive',
    dropoff: 'Abomey-Calavi / Porto-Novo',
    urgency: 'Express Immédiat (< 45 min)',
    notes: ''
  });

  /* Morphing de la Navbar ("L'Île Flottante") via IntersectionObserver sur le Hero */
  useEffect(() => {
    const heroEl = heroSectionRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.12
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  /* Animations GSAP (Hero fade-up stagger, Fonctionnalités, Philosophie SplitText, Protocole Sticky Pin) */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animation d'entrée de la section Hero
      gsap.fromTo(
        '.hero-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15
        }
      );

      // 2. Animation des cartes Fonctionnalités
      gsap.fromTo(
        '.feature-card',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#fonctionnalites',
            start: 'top 78%'
          }
        }
      );

      // 3. Philosophie — Révélation mot par mot style SplitText + parallaxe texture
      gsap.fromTo(
        '.manifesto-word',
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#philosophie',
            start: 'top 72%'
          }
        }
      );

      gsap.to('.manifesto-parallax-bg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '#philosophie',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // 4. Protocole — Archive Empilée Sticky (scale 0.9, blur 20px, opacity 0.5)
      const protocolWrappers = gsap.utils.toArray('.protocol-card-wrapper');
      protocolWrappers.forEach((wrapper, idx) => {
        const cardInner = wrapper.querySelector('.protocol-card-inner');
        const nextWrapper = protocolWrappers[idx + 1];

        if (nextWrapper && cardInner) {
          gsap.to(cardInner, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(20px)',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: nextWrapper,
              start: 'top 85%',
              end: 'top 18%',
              scrub: true
            }
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleOpenQuote = (presetUrgency) => {
    if (presetUrgency) {
      setQuoteForm((prev) => ({ ...prev, urgency: presetUrgency }));
    }
    setQuoteSubmitted(false);
    setQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  const manifestoStatementOne =
    'La plupart des sociétés de messagerie se concentrent sur : le transport approximatif sans délai garanti.'.split(
      ' '
    );

  return (
    <div ref={rootRef} className="min-h-screen bg-[#F2F0E9] text-[#1A1A1A]">
      {/* ====================================================================
          A. NAVBAR — "L'ÎLE FLOTTANTE"
          Conteneur fixed en forme de pilule, centré horizontalement.
          ==================================================================== */}
      <header className="fixed inset-x-0 top-4 sm:top-5 z-50 flex justify-center px-3 sm:px-4">
        <nav
          aria-label="Navigation principale"
          className={`flex w-full max-w-5xl items-center justify-between gap-3 sm:gap-5 rounded-full px-3.5 py-2.5 sm:px-5 sm:py-3 transition-all duration-500 ${
            isScrolled
              ? 'bg-[#F2F0E9]/75 text-[#1A1A1A] backdrop-blur-xl border border-[#2E4036]/15 shadow-[0_18px_50px_-15px_rgba(26,26,26,0.18)]'
              : 'bg-[#1A1A1A]/25 text-[#F2F0E9] backdrop-blur-md border border-[#F2F0E9]/15'
          }`}
        >
          {/* Logo en texte */}
          <a
            href="#hero"
            className="link-lift flex shrink-0 items-center gap-2 sm:gap-2.5 font-display text-base sm:text-lg md:text-xl font-extrabold tracking-tight"
          >
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#2E4036] text-[#F2F0E9] font-mono text-[11px] sm:text-xs font-bold">
              LX
            </span>
            <span className="flex flex-col leading-none sm:flex-row sm:items-center">
              <span>LivrExpress</span>
              <span className="mt-1 sm:mt-0 sm:ml-1.5 w-fit rounded-full bg-[#CC5833]/20 px-1.5 py-0.5 sm:px-2 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#CC5833]">
                Bénin
              </span>
            </span>
          </a>

          {/* Liens de navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#fonctionnalites"
              className="link-lift opacity-85 hover:opacity-100 hover:text-[#CC5833]"
            >
              Système
            </a>
            <a
              href="#philosophie"
              className="link-lift opacity-85 hover:opacity-100 hover:text-[#CC5833]"
            >
              Manifeste
            </a>
            <a
              href="#protocole"
              className="link-lift opacity-85 hover:opacity-100 hover:text-[#CC5833]"
            >
              Protocole
            </a>
            <a
              href="#tarification"
              className="link-lift opacity-85 hover:opacity-100 hover:text-[#CC5833]"
            >
              Formules
            </a>
          </div>

          {/* Bouton CTA (couleur accent) */}
          <MagneticButton
            variant="accent"
            onClick={() => handleOpenQuote('Express Immédiat (< 45 min)')}
            className="shrink-0 whitespace-nowrap !px-3.5 !py-2 sm:!px-5 sm:!py-2.5 !text-[11px] sm:!text-xs md:!text-sm"
          >
            <span>Demander un devis</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </MagneticButton>
        </nav>
      </header>

      {/* ====================================================================
          B. SECTION HERO — "LE PLAN D'OUVERTURE"
          100dvh, image Unsplash livreur à moto, gradient primaire-vers-noir,
          contenu poussé dans le tiers inférieur gauche.
          ==================================================================== */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden px-6 pb-14 pt-32 md:px-14 md:pb-20"
      >
        {/* Image de fond plein cadre Unsplash (Livreur à moto en déplacement) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=2000&q=85"
            alt="Coursier LivrExpress à moto effectuant une livraison rapide"
            className="h-full w-full object-cover object-center scale-105"
          />
          {/* Overlay gradient lourd primaire (#2E4036) vers noir (#1A1A1A) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#2E4036]/75 to-[#1A1A1A]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/85 via-[#1A1A1A]/40 to-transparent" />
        </div>

        {/* Contenu poussé vers le tiers inférieur gauche */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            {/* Télémétrie d'en-tête */}
            <div className="hero-reveal mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-[#F2F0E9]/20 bg-[#1A1A1A]/50 px-4 py-2 backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#CC5833] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F2F0E9]">
                RÉSEAU LOGISTIQUE ACTIF • COTONOU • CALAVI • PORTO-NOVO • PARAKOU
              </span>
            </div>

            {/* Pattern titre hero Preset A : "[Nom concept] est le" (Sans Gras) / "[Mot puissant]." (Serif Italique Massif) */}
            <h1 className="text-[#F2F0E9]">
              <span className="hero-reveal block font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F2F0E9]/90">
                LivrExpress est le
              </span>
              <span className="hero-reveal mt-1 block font-serif italic font-semibold text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] leading-[0.92] tracking-tight text-[#F2F0E9]">
                Réflexe Vital<span className="text-[#CC5833]">.</span>
              </span>
            </h1>

            {/* Sous-titre objectif marque */}
            <p className="hero-reveal mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[#F2F0E9]/80">
              L&apos;infrastructure de livraison rapide au Bénin conçue comme un laboratoire de précision : acheminement express, service professionnel certifié et permanence opérationnelle{' '}
              <span className="font-mono font-semibold text-[#F2F0E9]">
                24h/24
              </span>
              .
            </p>

            {/* Boutons CTA & Indicateurs */}
            <div className="hero-reveal mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <MagneticButton
                variant="accent"
                onClick={() => handleOpenQuote('Express Immédiat (< 45 min)')}
                className="!px-8 !py-4 !text-base"
              >
                <span>Demander un devis</span>
                <ArrowUpRight className="h-5 w-5" />
              </MagneticButton>

              <MagneticButton
                variant="outlineLight"
                href="#fonctionnalites"
                className="!px-7 !py-4 !text-base"
              >
                <span>Explorer la télémétrie</span>
              </MagneticButton>
            </div>

            {/* Barre de métriques temps réel */}
            <div className="hero-reveal mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl rounded-[2rem] border border-[#F2F0E9]/15 bg-[#1A1A1A]/55 p-5 backdrop-blur-xl">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F2F0E9]/55">
                  DÉLAI URBAIN MOYEN
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#F2F0E9]">
                  32 <span className="text-sm text-[#CC5833]">min</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F2F0E9]/55">
                  COUVERTURE NATIONALE
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#F2F0E9]">
                  12 <span className="text-sm text-[#CC5833]">départements</span>
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F2F0E9]/55">
                  PERMANENCE DISPATCH
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#F2F0E9]">
                  24h/24 <span className="text-sm text-[#CC5833]">• 7j/7</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          C. FONCTIONNALITÉS — "ARTEFACTS FONCTIONNELS INTERACTIFS"
          3 micro-interfaces logicielles dérivées des 3 arguments de vente
          ==================================================================== */}
      <section
        id="fonctionnalites"
        className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#2E4036]">
              <Activity className="h-3.5 w-3.5 text-[#CC5833]" />
              INSTRUMENTATION LOGISTIQUE
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A]">
              Trois piliers d&apos;exécution{' '}
              <span className="font-serif italic font-normal text-[#CC5833]">
                sans friction.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#1A1A1A]/70">
            Chaque expédition au Bénin est pilotée par notre architecture de dispatch : vélocité mesurée à la minute, rigueur professionnelle et permanence 24h/24.
          </p>
        </div>

        {/* Grille des 3 Artefacts Interactifs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DiagnosticShufflerCard />
          <TelemetryTypewriterCard />
          <CursorProtocolSchedulerCard />
        </div>
      </section>

      {/* ====================================================================
          D. PHILOSOPHIE — "LE MANIFESTE"
          Section pleine largeur fond sombre (#1A1A1A), texture organique parallaxe,
          deux déclarations contrastantes avec révélation GSAP mot par mot.
          ==================================================================== */}
      <section
        id="philosophie"
        className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] mx-3 md:mx-6 bg-[#1A1A1A] px-6 py-28 md:px-16 md:py-36 text-[#F2F0E9]"
      >
        {/* Image parallaxe d'un livreur remettant un colis au client */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
          <img
            src="https://images.pexels.com/photos/6869055/pexels-photo-6869055.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Livreur LivrExpress remettant un colis au client"
            className="manifesto-parallax-bg h-[125%] w-full object-cover object-[center_22%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/40 to-[#1A1A1A]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#F2F0E9]/15 bg-[#2E4036]/50 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#F2F0E9]">
            <span>LE MANIFESTE LIVREXPRESS BÉNIN</span>
          </div>

          {/* Déclaration 1 — Neutre, plus petite */}
          <p className="max-w-3xl font-display text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-[#F2F0E9]/60">
            {manifestoStatementOne.map((word, index) => (
              <span
                key={index}
                className="manifesto-word mr-2 inline-block"
              >
                {word}
              </span>
            ))}
          </p>

          {/* Déclaration 2 — Massive, serif italique dramatique, mot-clé coloré en accent */}
          <h2 className="mt-10 font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-[#F2F0E9]">
            <span className="manifesto-word mr-3 inline-block not-italic font-display font-bold text-2xl sm:text-3xl md:text-4xl align-middle text-[#F2F0E9]/85">
              Nous nous concentrons sur :
            </span>
            <span className="manifesto-word mr-3 inline-block">
              la précision
            </span>
            <span className="manifesto-word mr-3 inline-block text-[#CC5833]">
              chronométrique
            </span>
            <span className="manifesto-word inline-block">
              24h/24 au Bénin.
            </span>
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#F2F0E9]/15 pt-10">
            <div>
              <p className="font-mono text-xs text-[#CC5833]">01 / ZÉRO ATTENTE</p>
              <p className="mt-2 text-sm text-[#F2F0E9]/75">
                Assignation instantanée du coursier le plus proche par maillage GPS sur Cotonou, Abomey-Calavi et Porto-Novo.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#CC5833]">02 / RIGUEUR CLINIQUE</p>
              <p className="mt-2 text-sm text-[#F2F0E9]/75">
                Du pli confidentiel bancaire aux échantillons médicaux et colis e-commerce : chaque envoi suit un protocole scellé.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#CC5833]">03 / VEILLE PERMANENTE</p>
              <p className="mt-2 text-sm text-[#F2F0E9]/75">
                Une flotte de jour comme de nuit pour que votre entreprise ne s&apos;arrête jamais de livrer ses clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          E. PROTOCOLE — "ARCHIVE EMPILÉE STICKY"
          3 cartes plein écran qui s'empilent au scroll avec animations SVG uniques.
          ==================================================================== */}
      <section id="protocole" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#2E4036]">
            <Layers className="h-3.5 w-3.5 text-[#CC5833]" />
            PROTOCOLE OPÉRATIONNEL
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            L&apos;anatomie d&apos;une course{' '}
            <span className="font-serif italic font-normal text-[#2E4036]">
              haute-précision.
            </span>
          </h2>
        </div>

        <div className="relative space-y-12">
          {/* CARTE PROTOCOLE 01 — Motif géométrique en rotation lente */}
          <div className="protocol-card-wrapper sticky top-24 z-10">
            <div className="protocol-card-inner grid grid-cols-1 lg:grid-cols-12 items-center gap-8 rounded-[2.5rem] border border-[#2E4036]/20 bg-[#2E4036] p-8 md:p-14 text-[#F2F0E9] shadow-[0_30px_80px_-20px_rgba(46,64,54,0.45)] min-h-[440px]">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#F2F0E9]/10 px-4 py-1.5 font-mono text-xs text-[#F2F0E9]">
                  <span className="text-[#CC5833] font-bold">ÉTAPE 01</span>
                  <span>• ACQUISITION &amp; CALIBRAGE</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Géolocalisation &amp; Collecte en 15 Minutes
                </h3>
                <p className="max-w-xl text-base md:text-lg leading-relaxed text-[#F2F0E9]/80">
                  Dès validation de votre devis ou appel d&apos;urgence, notre algorithme verrouille l&apos;agent LivrExpress le plus proche de votre point de ramassage et génère un bordereau numérique scellé.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-[#F2F0E9]/75">
                  <span className="rounded-full border border-[#F2F0E9]/20 px-3.5 py-1.5">
                    RAMASSAGE EXPRESS
                  </span>
                  <span className="rounded-full border border-[#F2F0E9]/20 px-3.5 py-1.5">
                    BORDEREAU QR SCELLÉ
                  </span>
                </div>
              </div>

              {/* Animation SVG 1 : Motif géométrique concentrique en rotation lente */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative flex h-64 w-64 md:h-72 md:w-72 items-center justify-center rounded-[2rem] border border-[#F2F0E9]/15 bg-[#1A1A1A]/40 p-6">
                  <svg
                    viewBox="0 0 240 240"
                    className="h-full w-full"
                    fill="none"
                  >
                    <g className="animate-orbit-slow origin-center">
                      <circle
                        cx="120"
                        cy="120"
                        r="96"
                        stroke="#F2F0E9"
                        strokeOpacity="0.25"
                        strokeWidth="1.5"
                        strokeDasharray="8 8"
                      />
                      <polygon
                        points="120,28 200,166 40,166"
                        stroke="#CC5833"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="120" cy="28" r="5" fill="#CC5833" />
                      <circle cx="200" cy="166" r="5" fill="#F2F0E9" />
                      <circle cx="40" cy="166" r="5" fill="#F2F0E9" />
                    </g>
                    <g className="animate-orbit-reverse origin-center">
                      <circle
                        cx="120"
                        cy="120"
                        r="64"
                        stroke="#CC5833"
                        strokeOpacity="0.6"
                        strokeWidth="1.5"
                        strokeDasharray="14 6"
                      />
                      <rect
                        x="76"
                        y="76"
                        width="88"
                        height="88"
                        rx="16"
                        stroke="#F2F0E9"
                        strokeOpacity="0.4"
                        strokeWidth="1.5"
                      />
                    </g>
                    <circle
                      cx="120"
                      cy="120"
                      r="16"
                      fill="#CC5833"
                    />
                  </svg>
                  <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest text-[#F2F0E9]/60">
                    RADAR.COTONOU.01
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARTE PROTOCOLE 02 — Ligne laser horizontale de balayage sur grille de points */}
          <div className="protocol-card-wrapper sticky top-28 z-20">
            <div className="protocol-card-inner grid grid-cols-1 lg:grid-cols-12 items-center gap-8 rounded-[2.5rem] border border-[#2E4036]/20 bg-[#1A1A1A] p-8 md:p-14 text-[#F2F0E9] shadow-[0_30px_80px_-20px_rgba(26,26,26,0.6)] min-h-[440px]">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#F2F0E9]/10 px-4 py-1.5 font-mono text-xs text-[#F2F0E9]">
                  <span className="text-[#CC5833] font-bold">ÉTAPE 02</span>
                  <span>• ACHEMINEMENT SOUS TÉLÉMÉTRIE</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Scan Continu &amp; Routage Anti-Congestion
                </h3>
                <p className="max-w-xl text-base md:text-lg leading-relaxed text-[#F2F0E9]/80">
                  Votre colis traverse les axes urbains ou interurbains sous surveillance GPS active. Vous suivez l&apos;avancement en direct avec recalcul dynamique d&apos;itinéraire à chaque carrefour stratégique.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-[#F2F0E9]/75">
                  <span className="rounded-full border border-[#F2F0E9]/20 px-3.5 py-1.5">
                    SUIVI GPS TEMPS RÉEL
                  </span>
                  <span className="rounded-full border border-[#F2F0E9]/20 px-3.5 py-1.5">
                    CAISSONS SÉCURISÉS
                  </span>
                </div>
              </div>

              {/* Animation SVG 2 : Grille de points/cellules avec ligne laser horizontale de balayage */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative flex h-64 w-64 md:h-72 md:w-72 items-center justify-center overflow-hidden rounded-[2rem] border border-[#F2F0E9]/15 bg-[#2E4036]/30 p-6">
                  {/* Grille de 6x6 cellules */}
                  <div className="grid h-full w-full grid-cols-6 grid-rows-6 place-items-center">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          i % 7 === 0
                            ? 'bg-[#CC5833] shadow-[0_0_10px_#CC5833]'
                            : 'bg-[#F2F0E9]/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Ligne laser horizontale de balayage */}
                  <div className="animate-laser-scan pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#CC5833] to-transparent shadow-[0_0_20px_4px_rgba(204,88,51,0.85)]" />

                  <span className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest text-[#CC5833]">
                    SCAN.MATRICIEL.ACTIF
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARTE PROTOCOLE 03 — Forme d'onde pulsante style ECG (stroke-dashoffset) */}
          <div className="protocol-card-wrapper sticky top-32 z-30">
            <div className="protocol-card-inner grid grid-cols-1 lg:grid-cols-12 items-center gap-8 rounded-[2.5rem] border border-[#2E4036]/25 bg-[#F2F0E9] p-8 md:p-14 text-[#1A1A1A] shadow-[0_30px_80px_-20px_rgba(26,26,26,0.22)] min-h-[440px]">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#2E4036]/10 px-4 py-1.5 font-mono text-xs text-[#2E4036]">
                  <span className="text-[#CC5833] font-bold">ÉTAPE 03</span>
                  <span>• REMISE CERTIFIÉE &amp; PREUVE OTP</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A]">
                  Validation Biométrique &amp; Accusé Instantané
                </h3>
                <p className="max-w-xl text-base md:text-lg leading-relaxed text-[#1A1A1A]/75">
                  La remise en main propre est verrouillée par code OTP unique ou signature numérique horodatée. Vous recevez instantanément le rapport de livraison complet sur WhatsApp et par e-mail.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-[#2E4036]">
                  <span className="rounded-full border border-[#2E4036]/25 px-3.5 py-1.5">
                    VALIDATION OTP
                  </span>
                  <span className="rounded-full border border-[#2E4036]/25 px-3.5 py-1.5">
                    RAPPORT INSTANTANÉ
                  </span>
                </div>
              </div>

              {/* Animation SVG 3 : Forme d'onde pulsante ECG utilisant stroke-dashoffset */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative flex h-64 w-64 md:h-72 md:w-72 flex-col items-center justify-center rounded-[2rem] border border-[#2E4036]/15 bg-[#1A1A1A] p-6">
                  <svg
                    viewBox="0 0 260 120"
                    className="w-full"
                    fill="none"
                  >
                    {/* Ligne de fond */}
                    <path
                      d="M 10 60 L 60 60 L 75 40 L 90 85 L 110 18 L 130 102 L 148 48 L 162 60 L 250 60"
                      stroke="#2E4036"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Onde ECG animée */}
                    <path
                      d="M 10 60 L 60 60 L 75 40 L 90 85 L 110 18 L 130 102 L 148 48 L 162 60 L 250 60"
                      stroke="#CC5833"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-ecg-wave"
                    />
                  </svg>
                  <div className="mt-4 flex w-full items-center justify-between font-mono text-[11px] text-[#F2F0E9]/70">
                    <span>POULS LOGISTIQUE</span>
                    <span className="text-[#CC5833] font-semibold">100% LIVRÉ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          F. ADHÉSION / TARIFICATION
          Grille à 3 niveaux : "Essentiel", "Performance" (carte du milieu en primaire + CTA accent), "Entreprise"
          ==================================================================== */}
      <section
        id="tarification"
        className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#2E4036]">
            CALIBRAGE TARIFAIRE &amp; CONTRATS
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            Des formules taillées pour votre{' '}
            <span className="font-serif italic font-normal text-[#CC5833]">
              cadence.
            </span>
          </h2>
          <p className="mt-4 text-base text-[#1A1A1A]/70">
            Que vous expédiiez un pli urgent à Cotonou ou gériez 500 livraisons e-commerce par semaine à travers le Bénin, obtenez un devis précis en quelques minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Niveau 1 : Essentiel */}
          <div className="flex flex-col justify-between rounded-[2.25rem] border border-[#2E4036]/15 bg-white p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,26,26,0.1)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2E4036]">
                  01 / ESSENTIEL
                </span>
                <span className="rounded-full bg-[#F2F0E9] px-3 py-1 font-mono text-xs font-medium text-[#1A1A1A]">
                  À la course
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#1A1A1A]">
                Course Express Urbaine
              </h3>
              <p className="mt-2 text-sm text-[#1A1A1A]/70">
                Idéal pour les envois ponctuels urgents, plis administratifs et colis particuliers à Cotonou et Calavi.
              </p>

              <div className="my-7 border-y border-[#2E4036]/10 py-5">
                <span className="font-mono text-xs uppercase text-[#1A1A1A]/55">
                  TARIF INDICATIF DÈS
                </span>
                <p className="mt-1 font-mono text-3xl font-bold text-[#1A1A1A]">
                  1 000 FCFA{' '}
                  <span className="text-sm font-normal text-[#1A1A1A]/60">
                    / course
                  </span>
                </p>
              </div>

              <ul className="space-y-3.5 text-sm text-[#1A1A1A]/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E4036] mt-0.5" />
                  <span>Collecte rapide en moins de 25 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E4036] mt-0.5" />
                  <span>Livraison directe Cotonou &amp; Abomey-Calavi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E4036] mt-0.5" />
                  <span>Confirmation de remise par code OTP</span>
                </li>
              </ul>
            </div>

            <div className="mt-9">
              <MagneticButton
                variant="primary"
                onClick={() => handleOpenQuote('Essentiel — Course Ponctuelle')}
                className="w-full"
              >
                <span>Demander un devis</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Niveau 2 : Performance (Carte du milieu en couleur primaire #2E4036 + bouton accent #CC5833) */}
          <div className="relative flex flex-col justify-between rounded-[2.5rem] bg-[#2E4036] p-8 md:p-10 text-[#F2F0E9] ring-2 ring-[#CC5833] shadow-[0_30px_70px_-15px_rgba(46,64,54,0.5)] lg:-translate-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#CC5833]">
                  02 / PERFORMANCE
                </span>
                <span className="rounded-full bg-[#CC5833] px-3 py-1 font-mono text-[11px] font-semibold text-[#F2F0E9]">
                  Recommandé PME &amp; E-Commerce
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#F2F0E9]">
                Flotte Dédiée &amp; Flux Prioritaire
              </h3>
              <p className="mt-2 text-sm text-[#F2F0E9]/80">
                Conçu pour les marchands, pharmacies, banques et PME exigeant des livraisons quotidiennes rapides et un encaissement sécurisé.
              </p>

              <div className="my-7 border-y border-[#F2F0E9]/15 py-5">
                <span className="font-mono text-xs uppercase text-[#F2F0E9]/60">
                  FORFAIT MENSUEL OU CARNET
                </span>
                <p className="mt-1 font-mono text-3xl font-bold text-[#F2F0E9]">
                  Sur-Mesure{' '}
                  <span className="text-sm font-normal text-[#CC5833]">
                    • -25% / course
                  </span>
                </p>
              </div>

              <ul className="space-y-3.5 text-sm text-[#F2F0E9]/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#CC5833] mt-0.5" />
                  <span>Priorité absolue sur le dispatch 24h/24 &amp; 7j/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#CC5833] mt-0.5" />
                  <span>Encaissement à la livraison (Mobile Money / Cash) reversé J+0</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#CC5833] mt-0.5" />
                  <span>Couverture Cotonou, Calavi, Porto-Novo, Ouidah &amp; Parakou</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#CC5833] mt-0.5" />
                  <span>Gestionnaire de compte dédié &amp; reporting hebdomadaire</span>
                </li>
              </ul>
            </div>

            <div className="mt-9">
              <MagneticButton
                variant="accent"
                onClick={() => handleOpenQuote('Performance — Flotte PME / E-Commerce')}
                className="w-full"
              >
                <span>Demander un devis</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Niveau 3 : Entreprise */}
          <div className="flex flex-col justify-between rounded-[2.25rem] border border-[#2E4036]/15 bg-white p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,26,26,0.1)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2E4036]">
                  03 / ENTREPRISE
                </span>
                <span className="rounded-full bg-[#F2F0E9] px-3 py-1 font-mono text-xs font-medium text-[#1A1A1A]">
                  Logistique 24/7
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-[#1A1A1A]">
                Infrastructure Critique &amp; Nationale
              </h3>
              <p className="mt-2 text-sm text-[#1A1A1A]/70">
                Externalisation complète de votre logistique dernier kilomètre, navettes inter-agences et astreinte nocturne garantie par SLA.
              </p>

              <div className="my-7 border-y border-[#2E4036]/10 py-5">
                <span className="font-mono text-xs uppercase text-[#1A1A1A]/55">
                  CONTRAT CADRE ANNUEL
                </span>
                <p className="mt-1 font-mono text-3xl font-bold text-[#1A1A1A]">
                  SLA 99.4%{' '}
                  <span className="text-sm font-normal text-[#1A1A1A]/60">
                    garanti
                  </span>
                </p>
              </div>

              <ul className="space-y-3.5 text-sm text-[#1A1A1A]/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E4036] mt-0.5" />
                  <span>Coursiers et véhicules badgés aux couleurs de votre marque</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E4036] mt-0.5" />
                  <span>Astreinte médicale, bancaire et industrielle 24h/24</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E4036] mt-0.5" />
                  <span>Assurance ad valorem intégrale &amp; facturation mensuelle</span>
                </li>
              </ul>
            </div>

            <div className="mt-9">
              <MagneticButton
                variant="primary"
                onClick={() => handleOpenQuote('Entreprise — Contrat Cadre 24h/24')}
                className="w-full"
              >
                <span>Demander un devis</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          G. PIED DE PAGE
          Fond couleur sombre profond (#1A1A1A), rounded-t-[4rem], grille + statut "Système Opérationnel"
          ==================================================================== */}
      <footer className="mt-12 rounded-t-[4rem] bg-[#1A1A1A] px-6 pb-14 pt-20 text-[#F2F0E9] md:px-14">
        <div className="mx-auto max-w-7xl">
          {/* Bandeau supérieur CTA rapide */}
          <div className="mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-[2.5rem] border border-[#F2F0E9]/15 bg-[#2E4036] p-8 md:p-12">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CC5833]">
                DISPATCH IMMÉDIAT AU BÉNIN
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2F0E9]">
                Prêt à expédier avec une précision chirurgicale ?
              </h3>
              <p className="mt-2 text-sm md:text-base text-[#F2F0E9]/80">
                Recevez votre estimation chiffrée en moins de 10 minutes. Notre centre de contrôle est ouvert 24h/24.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="accent"
                onClick={() => handleOpenQuote('Express Immédiat (< 45 min)')}
              >
                <span>Demander un devis</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Grille principale du pied de page */}
          <div className="grid grid-cols-1 gap-12 border-b border-[#F2F0E9]/10 pb-14 md:grid-cols-12">
            {/* Marque + Slogan */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E4036] font-mono text-sm font-bold text-[#F2F0E9]">
                  LX
                </span>
                <span className="font-display text-2xl font-extrabold tracking-tight">
                  LivrExpress <span className="text-[#CC5833]">Bénin</span>
                </span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#F2F0E9]/70">
                Entreprise de livraison rapide et logistique de précision au Bénin. Service professionnel certifié, traçabilité temps réel et disponibilité permanente 24h/24.
              </p>

              {/* Indicateur de statut "Système Opérationnel" avec point vert pulsant */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#F2F0E9]/15 bg-[#F2F0E9]/5 px-4 py-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-medium tracking-wider text-[#F2F0E9]">
                    Système Opérationnel • 24h/24 BÉNIN
                  </span>
                </div>
              </div>
            </div>

            {/* Colonne Navigation */}
            <div className="md:col-span-2 space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#CC5833]">
                Architecture
              </p>
              <ul className="space-y-2.5 text-sm text-[#F2F0E9]/75">
                <li>
                  <a href="#hero" className="link-lift hover:text-[#F2F0E9]">
                    Ouverture
                  </a>
                </li>
                <li>
                  <a
                    href="#fonctionnalites"
                    className="link-lift hover:text-[#F2F0E9]"
                  >
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a
                    href="#philosophie"
                    className="link-lift hover:text-[#F2F0E9]"
                  >
                    Le Manifeste
                  </a>
                </li>
                <li>
                  <a
                    href="#protocole"
                    className="link-lift hover:text-[#F2F0E9]"
                  >
                    Protocole
                  </a>
                </li>
                <li>
                  <a
                    href="#tarification"
                    className="link-lift hover:text-[#F2F0E9]"
                  >
                    Formules &amp; Devis
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne Zones Couvertes */}
            <div className="md:col-span-3 space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#CC5833]">
                Corridors Bénin
              </p>
              <ul className="space-y-2.5 text-sm text-[#F2F0E9]/75">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#CC5833]" />
                  <span>Cotonou (Ganhi, Haie Vive, Akpakpa)</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#CC5833]" />
                  <span>Abomey-Calavi &amp; Godomey</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#CC5833]" />
                  <span>Porto-Novo &amp; Sèmè-Podji</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#CC5833]" />
                  <span>Ouidah, Bohicon &amp; Parakou</span>
                </li>
              </ul>
            </div>

            {/* Colonne Contact & Légal */}
            <div className="md:col-span-2 space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#CC5833]">
                Direct &amp; Légal
              </p>
              <ul className="space-y-2.5 text-sm text-[#F2F0E9]/75">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenQuote('Urgence 24h/24')}
                    className="link-lift text-left hover:text-[#CC5833]"
                  >
                    Ligne Directe 24/7
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/2290197899933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-lift font-mono text-xs text-[#F2F0E9]/80 hover:text-[#CC5833]"
                    title="Contacter LivrExpress Bénin sur WhatsApp"
                  >
                    +229 01 97 89 99 33 (WhatsApp)
                  </a>
                </li>
                <li>
                  <a
                    href="#tarification"
                    className="link-lift hover:text-[#F2F0E9]"
                  >
                    Conditions SLA
                  </a>
                </li>
                <li>
                  <a
                    href="#protocole"
                    className="link-lift hover:text-[#F2F0E9]"
                  >
                    Assurance Transport
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bas de pied de page */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#F2F0E9]/50">
            <p>© {new Date().getFullYear()} LivrExpress Bénin. Tous droits réservés.</p>
            <p>PRESET A : TECH ORGANIQUE • TÉLÉMÉTRIE LOGISTIQUE 24H/24</p>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          MODALE INTERACTIVE — "DEMANDER UN DEVIS"
          Permet aux visiteurs d'exécuter l'action principale immédiatement.
          ==================================================================== */}
      {quoteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="devis-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/75 p-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-xl rounded-[2.5rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-7 md:p-10 text-[#1A1A1A] shadow-2xl">
            <button
              type="button"
              onClick={() => setQuoteModalOpen(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#2E4036]/15 bg-white text-[#1A1A1A] hover:bg-[#CC5833] hover:text-[#F2F0E9] transition-colors"
              aria-label="Fermer la fenêtre de devis"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#2E4036]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#2E4036]">
              <span className="h-2 w-2 rounded-full bg-[#CC5833]" />
              DISPATCH LIVREXPRESS BÉNIN • 24H/24
            </div>

            <h3
              id="devis-modal-title"
              className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight"
            >
              Demander un devis sur-mesure
            </h3>
            <p className="mt-1 text-sm text-[#1A1A1A]/70">
              Réponse chiffrée en moins de 10 minutes par notre cellule de régulation à Cotonou.
            </p>

            {quoteSubmitted ? (
              <div className="mt-6 rounded-[2rem] border border-[#2E4036]/20 bg-[#2E4036] p-7 text-[#F2F0E9]">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-7 w-7 text-[#CC5833]" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#CC5833]">
                      DOSSIER TRANSMIS • #BEN-{Math.floor(1000 + Math.random() * 9000)}
                    </p>
                    <h4 className="font-display text-xl font-bold">
                      Votre demande de devis est en cours de calibrage
                    </h4>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#F2F0E9]/80 leading-relaxed">
                  Un régulateur LivrExpress vous contacte au{' '}
                  <strong className="font-mono text-[#F2F0E9]">
                    {quoteForm.phone || '+229'}
                  </strong>{' '}
                  pour confirmer la prise en charge sur le corridor{' '}
                  <strong className="text-[#F2F0E9]">{quoteForm.pickup}</strong> →{' '}
                  <strong className="text-[#F2F0E9]">{quoteForm.dropoff}</strong>.
                </p>
                <div className="mt-6 flex justify-end">
                  <MagneticButton
                    variant="accent"
                    onClick={() => setQuoteModalOpen(false)}
                  >
                    <span>Fermer le terminal</span>
                  </MagneticButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase text-[#2E4036] mb-1.5">
                      Nom / Entreprise
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pharmacie Camp Guézo"
                      value={quoteForm.company}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, company: e.target.value })
                      }
                      className="w-full rounded-2xl border border-[#2E4036]/20 bg-white px-4 py-3 text-sm focus:border-[#CC5833] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase text-[#2E4036] mb-1.5">
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+229 01 97 XX XX XX"
                      value={quoteForm.phone}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, phone: e.target.value })
                      }
                      className="w-full rounded-2xl border border-[#2E4036]/20 bg-white px-4 py-3 text-sm focus:border-[#CC5833] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase text-[#2E4036] mb-1.5">
                      Zone de Collecte
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.pickup}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, pickup: e.target.value })
                      }
                      className="w-full rounded-2xl border border-[#2E4036]/20 bg-white px-4 py-3 text-sm focus:border-[#CC5833] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-semibold uppercase text-[#2E4036] mb-1.5">
                      Destination
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.dropoff}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, dropoff: e.target.value })
                      }
                      className="w-full rounded-2xl border border-[#2E4036]/20 bg-white px-4 py-3 text-sm focus:border-[#CC5833] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-[#2E4036] mb-1.5">
                    Protocole &amp; Cadence
                  </label>
                  <select
                    value={quoteForm.urgency}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, urgency: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#2E4036]/20 bg-white px-4 py-3 text-sm focus:border-[#CC5833] focus:outline-none"
                  >
                    <option>Express Immédiat (&lt; 45 min)</option>
                    <option>Essentiel — Course Ponctuelle</option>
                    <option>Performance — Flotte PME / E-Commerce</option>
                    <option>Entreprise — Contrat Cadre 24h/24</option>
                    <option>Urgence 24h/24 (Nuit / Week-end)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-[#2E4036] mb-1.5">
                    Nature des colis / Volume estimé
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: 15 colis e-commerce par jour avec encaissement Mobile Money..."
                    value={quoteForm.notes}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, notes: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#2E4036]/20 bg-white px-4 py-3 text-sm focus:border-[#CC5833] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <MagneticButton
                    type="submit"
                    variant="accent"
                    className="w-full"
                  >
                    <Send className="h-4 w-4" />
                    <span>Transmettre ma demande de devis</span>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
