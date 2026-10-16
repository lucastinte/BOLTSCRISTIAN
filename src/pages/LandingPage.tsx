import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle, PlayCircle, MapPin, Plus } from "lucide-react";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/big-shoulders-display/900";
import "@fontsource/archivo/400";
import "@fontsource/archivo/500";
import "@fontsource/archivo/700";
import { supabase } from "../lib/supabase";
import { Logo } from "../components/Logo";
import heroImage from "../assets/wosniak-hero.jpeg";
import aboutImage from "../assets/wosniak-about.png";
import transformacion1 from "../assets/transformacion-1.png";
import transformacion2 from "../assets/transformacion-2.png";
import transformacion3 from "../assets/transformacion-3.png";
import promoVideo from "../assets/reconstruirte-promo.mp4";

const WHATSAPP_NUMBER = "5493884384713";
const wa = (message?: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

const MAPS_URL = "https://maps.app.goo.gl/H9NsG7NBUkYqkRow6";

const gymPhotos = Object.entries(
    import.meta.glob<string>("../assets/gym/arias-*.jpeg", { eager: true, import: "default", query: "?url" })
)
    .filter(([path]) => !/arias-(1|2|3)\.jpeg$/.test(path))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);

const navItems = [
    { label: "Planes", target: "planes" },
    { label: "Resultados", target: "resultados" },
    { label: "Sobre mí", target: "sobre-mi" },
    { label: "Sede", target: "sede" },
    { label: "Preguntas", target: "preguntas" },
];

const principles = [
    {
        title: "Estética de poder",
        text: "Un físico construido con densidad y propósito, que se nota en cómo te parás y cómo te movés.",
    },
    {
        title: "Disciplina innegociable",
        text: "El trabajo se hace, sin excusas. Si no dominás tu cuerpo, no dominás tu vida.",
    },
    {
        title: "Seguimiento que no te suelta",
        text: "Reportás tu avance y te corrijo cada semana. No te dejo caer.",
    },
    {
        title: "Verdad brutal",
        text: "Nada de promesas vacías: estrategia respaldada por resultados reales, en vivo y en video.",
    },
];

type Plan = {
    name: string;
    modality: string;
    description: string;
    includes: string[];
    message: string;
    video?: string;
};

const plans: Plan[] = [
    {
        name: "Coaching online",
        modality: "Online, desde donde estés",
        description:
            "Cristian es tu entrenador personal a través del teléfono. El plan se adapta a lo que tengas: gimnasio completo o casa sin equipamiento.",
        includes: [
            "Evaluación inicial",
            "Plan de entrenamiento adaptado a tu equipamiento",
            "Plan de alimentación con ajustes semanales",
            "Corrección técnica por video y chat directo",
        ],
        message: "Hola Cristian, quiero consultar por el Coaching Online.",
    },
    {
        name: "Personalizado",
        modality: "Presencial, 5 cupos",
        description: "Entrenás uno a uno con Cristian en la sede, con supervisión directa de postura, cargas e intensidad.",
        includes: [
            "Entrenamiento directo con Cristian",
            "Plan de alimentación 100% personalizado",
            "Grupo premium exclusivo",
            "Seguimiento real y constante",
        ],
        message: "Hola Cristian, quiero consultar por el plan Personalizado presencial.",
    },
    {
        name: "Semipersonalizado",
        modality: "Presencial, 10 cupos",
        description: "Grupo reducido en la sede, con las rutinas y el Método CW de Cristian.",
        includes: [
            "Rutinas exclusivas de Cristian Wosniak",
            "Plan de alimentación",
            "Asistente IA personalizado 24/7",
            "Método CW",
        ],
        message: "Hola Cristian, quiero consultar por el plan Semipersonalizado.",
    },
    {
        name: "Reto 30 días",
        modality: "Desafío intensivo",
        description:
            "Un mes concentrado para romper la inercia: acelerar el metabolismo, tonificar y cambiar tus hábitos.",
        includes: [
            "Evaluación física inicial",
            "Plan de entrenamiento adaptado",
            "Plan de alimentación para 30 días",
            "Soporte y comunidad activa",
        ],
        message: "Hola Cristian, me interesa inscribirme en el Reto 30 días.",
    },
    {
        name: "Reconstruirte 90 días",
        modality: "Presencial o semipresencial",
        description:
            "Noventa días para reconstruirte física y mentalmente. También es el programa para volver a entrenar después de una lesión.",
        includes: [
            "Programación de entrenamiento",
            "Plan de alimentación personalizado",
            "Seguimiento diario",
            "Acompañamiento técnico post-lesión",
        ],
        message: "Hola Cristian, me interesa el programa Reconstruirte 90 días.",
        video: promoVideo,
    },
];

const results = [
    {
        name: "Juan P.",
        result: "15 kg menos en 3 meses",
        quote:
            "Increíble el cambio, tanto físico como mental. Cristian me ayudó a crear hábitos que ahora son parte de mi vida.",
        image: transformacion1,
    },
    {
        name: "María G.",
        result: "8 kg de músculo",
        quote: "Nunca pensé que podría lograr este nivel de fuerza y definición. El seguimiento es impecable.",
        image: transformacion2,
    },
    {
        name: "Lucía G.",
        result: "Volvió a entrenar después de una lesión",
        quote:
            "Después de mi lesión pensé que no volvería a entrenar. El programa Reconstruirte me devolvió la confianza y la fuerza.",
        image: transformacion3,
    },
];

const faqs = [
    {
        q: "¿El plan es realmente personalizado?",
        a: "Sí. Cada plan se arma según tu objetivo, tu nivel actual, el tiempo que tenés y el equipamiento disponible. No hay dos planes iguales.",
    },
    {
        q: "¿Cómo funciona el seguimiento online?",
        a: "Recibís tu plan semanal, me mandás videos de los ejercicios y te devuelvo correcciones. Hablamos por WhatsApp para resolver dudas durante la semana.",
    },
    {
        q: "¿Necesito equipamiento?",
        a: "Para el online adaptamos el plan a lo que tengas, incluso si entrenás en casa sin equipamiento. En la sede tenés todo lo necesario.",
    },
    {
        q: "¿Incluye plan de alimentación?",
        a: "Sí, todos los planes incluyen plan de alimentación. En los personalizados se ajusta semana a semana según tu avance.",
    },
    {
        q: "¿Puedo entrenar desde otra ciudad o país?",
        a: "Sí. El coaching online está pensado para que entrenes donde estés: en casa, en tu gimnasio o de viaje.",
    },
];

const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/blacktrainingcwlife" },
    { name: "TikTok", href: "https://www.tiktok.com/@blacktrainingcwlife" },
    { name: "Facebook", href: "https://www.facebook.com/blacktrainingcwlife" },
    { name: "X", href: "https://www.x.com/blacktrainingcwlife" },
];

export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState<string | null>(null);
    const [session, setSession] = useState<unknown>(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
        const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
        return () => data.subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!videoOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideoOpen(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [videoOpen]);

    const goTo = (id: string) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const accountLabel = session ? "Mi panel" : "Ingresar";
    const goAccount = () => navigate(session ? "/dashboard" : "/login");

    return (
        <div className="cw-landing min-h-screen bg-hierro text-tiza font-body antialiased">
            {/* NAV */}
            <header className="fixed inset-x-0 top-0 z-40 border-b border-plomo bg-hierro/85 backdrop-blur-md">
                <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Principal">
                    <button onClick={() => goTo("inicio")} aria-label="CW Life, ir al inicio" className="-ml-1">
                        <Logo variant="header" className="scale-[0.85] origin-left" />
                    </button>

                    <div className="hidden items-center gap-7 lg:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.target}
                                onClick={() => goTo(item.target)}
                                className="text-[15px] text-acero transition-colors hover:text-tiza"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button onClick={() => navigate("/shop")} className="text-[15px] text-acero transition-colors hover:text-tiza">
                            Tienda
                        </button>
                        <span className="h-5 w-px bg-plomo" aria-hidden="true" />
                        <button onClick={goAccount} className="text-[15px] font-medium text-tiza hover:underline underline-offset-4">
                            {accountLabel}
                        </button>
                        <a
                            href={wa("Hola Cristian, quiero empezar a entrenar con vos.")}
                            className="inline-flex items-center gap-2 bg-tiza px-4 py-2 text-[15px] font-bold text-hierro transition-colors hover:bg-white"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            WhatsApp
                        </a>
                    </div>

                    <button
                        className="p-2 text-tiza lg:hidden"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuOpen}
                        aria-controls="menu-movil"
                    >
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </nav>

                {menuOpen && (
                    <div id="menu-movil" className="border-t border-plomo bg-hierro px-4 pb-6 pt-2 lg:hidden">
                        {navItems.map((item) => (
                            <button
                                key={item.target}
                                onClick={() => goTo(item.target)}
                                className="block w-full border-b border-plomo py-4 text-left font-display text-2xl font-extrabold uppercase"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => navigate("/shop")}
                            className="block w-full border-b border-plomo py-4 text-left font-display text-2xl font-extrabold uppercase"
                        >
                            Tienda
                        </button>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button onClick={goAccount} className="border border-tiza py-3 font-medium">
                                {accountLabel}
                            </button>
                            <a href={wa("Hola Cristian, quiero empezar a entrenar con vos.")} className="bg-tiza py-3 text-center font-bold text-hierro">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {/* HERO */}
                <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[68svh] md:inset-y-0 md:left-auto md:h-full md:w-[56%]">
                        <img
                            src={heroImage}
                            alt="Cristian Wosniak entrenando en su gimnasio"
                            className="h-full w-full object-cover object-[50%_18%]"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-hierro via-hierro/30 to-hierro/40 md:bg-gradient-to-r md:from-hierro md:via-hierro/10 md:to-transparent" />
                    </div>

                    <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-12 pt-[46svh] sm:px-6 md:justify-center md:pb-16 md:pt-28 lg:px-8">
                        <h1 className="font-display font-black uppercase leading-[0.86] tracking-[-0.01em] text-tiza text-[clamp(4.25rem,19vw,11rem)] md:text-[clamp(6rem,12vw,11rem)]">
                            <span className="cw-rise block">Dominá</span>
                            <span className="cw-rise block [animation-delay:120ms]">tu realidad</span>
                        </h1>

                        <div className="cw-rise mt-8 max-w-[34rem] [animation-delay:260ms]">
                            <p className="text-lg leading-relaxed text-tiza/85 md:text-xl">
                                Entrenamiento y alimentación personalizados con Cristian Wosniak. Presencial en San Salvador
                                de Jujuy u online, estés donde estés.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={wa("Hola Cristian, quiero empezar a entrenar con vos.")}
                                    className="inline-flex items-center justify-center gap-2.5 bg-tiza px-7 py-4 text-base font-bold text-hierro transition-colors hover:bg-white"
                                >
                                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                    Escribirle a Cristian
                                </a>
                                <button
                                    onClick={() => goTo("planes")}
                                    className="inline-flex items-center justify-center border border-tiza/60 px-7 py-4 text-base font-medium transition-colors hover:border-tiza hover:bg-tiza/5"
                                >
                                    Ver planes
                                </button>
                            </div>

                            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-plomo pt-6 text-sm">
                                <div>
                                    <dt className="text-acero">Personas entrenadas</dt>
                                    <dd className="mt-1 font-display text-3xl font-extrabold text-tiza">4000+</dd>
                                </div>
                                <div>
                                    <dt className="text-acero">Sede central</dt>
                                    <dd className="mt-1 leading-snug text-tiza">
                                        Triunvirato 516,
                                        <br />
                                        Coronel Arias, Jujuy
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                {/* MÉTODO */}
                <section className="border-t border-plomo px-4 py-24 sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <h2 className="font-display text-6xl font-black uppercase leading-[0.85] md:text-7xl">
                                Disciplina sin filtros. Resultados sin excusas.
                            </h2>
                            <p className="mt-8 max-w-md text-lg leading-relaxed text-acero">
                                El Método CW no es un programa más: es un código de conducta que separa a quienes van al
                                gimnasio de quienes dominan su realidad.
                            </p>
                        </div>
                        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                            {principles.map((p) => (
                                <div key={p.title} className="border-t border-tiza pt-5">
                                    <h3 className="font-display text-3xl font-extrabold uppercase">{p.title}</h3>
                                    <p className="mt-3 leading-relaxed text-acero">{p.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PLANES */}
                <section id="planes" className="scroll-mt-16 border-t border-plomo px-4 py-24 sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <h2 className="font-display text-7xl font-black uppercase leading-[0.85] md:text-8xl">Planes</h2>
                            <p className="max-w-md text-lg leading-relaxed text-acero">
                                Todos incluyen plan de alimentación. Escribile a Cristian con el plan que te interesa y te
                                cuenta precios y disponibilidad.
                            </p>
                        </div>

                        <ol className="mt-14 border-b border-plomo">
                            {plans.map((plan) => (
                                <li key={plan.name} className="grid gap-6 border-t border-plomo py-10 md:grid-cols-12 md:gap-8">
                                    <div className="md:col-span-4">
                                        <h3 className="font-display text-4xl font-black uppercase leading-none md:text-5xl">
                                            {plan.name}
                                        </h3>
                                        <p className="mt-3 text-acero">{plan.modality}</p>
                                    </div>
                                    <div className="md:col-span-5">
                                        <p className="max-w-[60ch] leading-relaxed text-tiza/90">{plan.description}</p>
                                        <ul className="mt-5 space-y-2 text-[15px] text-acero">
                                            {plan.includes.map((item) => (
                                                <li key={item} className="flex gap-3">
                                                    <Plus className="mt-1 h-3.5 w-3.5 flex-none text-tiza" aria-hidden="true" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-3 md:col-span-3 md:items-stretch">
                                        <a
                                            href={wa(plan.message)}
                                            className="inline-flex items-center justify-center gap-2 bg-tiza px-5 py-3.5 font-bold text-hierro transition-colors hover:bg-white"
                                        >
                                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                                            Consultar por WhatsApp
                                        </a>
                                        {plan.video && (
                                            <button
                                                onClick={() => setVideoOpen(plan.video!)}
                                                className="inline-flex items-center justify-center gap-2 border border-plomo px-5 py-3.5 font-medium transition-colors hover:border-tiza"
                                            >
                                                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                                                Ver el video
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* RESULTADOS */}
                <section id="resultados" className="scroll-mt-16 border-t border-plomo px-4 py-24 sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="font-display text-7xl font-black uppercase leading-[0.85] md:text-8xl">Resultados</h2>
                        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
                            {results.map((r) => (
                                <figure key={r.name}>
                                    <img
                                        src={r.image}
                                        alt={`Antes y después de ${r.name}`}
                                        loading="lazy"
                                        className="aspect-square w-full object-cover"
                                    />
                                    <p className="mt-6 font-display text-3xl font-extrabold uppercase leading-none">{r.result}</p>
                                    <blockquote className="mt-4 leading-relaxed text-acero">“{r.quote}”</blockquote>
                                    <figcaption className="mt-4 text-sm font-medium">{r.name}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SOBRE MÍ */}
                <section id="sobre-mi" className="scroll-mt-16 border-t border-plomo px-4 py-24 sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12">
                        <img
                            src={aboutImage}
                            alt="Cristian Wosniak"
                            loading="lazy"
                            className="w-full max-w-md grayscale md:col-span-5"
                        />
                        <div className="md:col-span-6 md:col-start-7">
                            <h2 className="font-display text-6xl font-black uppercase leading-[0.85] md:text-7xl">
                                Soy Cristian Wosniak
                            </h2>
                            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-tiza/85">
                                <p>
                                    Entrenador personal y coach de alto rendimiento. Dirijo mi sede de entrenamiento en Jujuy y
                                    guío de forma online a personas de todo el país y del exterior.
                                </p>
                                <p>
                                    Llevo más de 4000 personas entrenadas. Mi enfoque combina técnica biomecánica, nutrición
                                    estructurada y la disciplina que te permite dominar tu cuerpo y tu mente.
                                </p>
                            </div>
                            <blockquote className="mt-10 border-l-2 border-tiza pl-5 font-display text-3xl font-extrabold uppercase leading-tight">
                                “La mediocridad no es una opción en mi trinchera.”
                            </blockquote>
                            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                                {socialLinks.map((s) => (
                                    <li key={s.name}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-acero underline decoration-plomo underline-offset-4 transition-colors hover:text-tiza hover:decoration-tiza"
                                        >
                                            {s.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SEDE */}
                <section id="sede" className="scroll-mt-16 border-t border-plomo py-24 md:py-32">
                    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
                        <div className="md:col-span-5">
                            <h2 className="font-display text-7xl font-black uppercase leading-[0.85] md:text-8xl">La sede</h2>
                            <p className="mt-8 flex gap-3 text-xl leading-snug">
                                <MapPin className="mt-1 h-5 w-5 flex-none" aria-hidden="true" />
                                <span>
                                    Triunvirato 516, Barrio Coronel Arias
                                    <span className="block text-acero">San Salvador de Jujuy</span>
                                </span>
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={wa("Hola Cristian, quiero reservar un turno presencial en la sede.")}
                                    className="inline-flex items-center justify-center gap-2 bg-tiza px-5 py-3.5 font-bold text-hierro transition-colors hover:bg-white"
                                >
                                    Reservar turno
                                </a>
                                <a
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center border border-plomo px-5 py-3.5 font-medium transition-colors hover:border-tiza"
                                >
                                    Cómo llegar
                                </a>
                            </div>
                        </div>
                        <div className="h-72 md:col-span-7 md:h-auto md:min-h-[22rem]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3638.761668622178!2d-65.2654065!3d-24.2151253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x67516b52bfc5ba41%3A0xf069aca9c87d63da!2sCW%20LIFE%20-%20Cristian%20Wosniak!5e0!3m2!1ses-419!2sar!4v1771007641589!5m2!1ses-419!2sar"
                                className="h-full w-full border border-plomo grayscale"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa de la sede CW Life"
                            />
                        </div>
                    </div>

                    {gymPhotos.length > 0 && (
                        <div
                            className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8"
                            role="region"
                            aria-label="Fotos del gimnasio"
                            tabIndex={0}
                        >
                            {gymPhotos.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Gimnasio CW Life, foto ${i + 1}`}
                                    loading="lazy"
                                    className="h-64 w-auto flex-none snap-start object-cover md:h-80"
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* COMUNIDAD */}
                <section className="border-t border-plomo px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] md:text-6xl">
                                Material gratis para la comunidad
                            </h2>
                            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-acero">
                                Masterclasses, guías en PDF y rutinas express que no publico en redes. Creá tu cuenta y
                                accedé al instante.
                            </p>
                        </div>
                        <div className="md:col-span-4 md:col-start-9">
                            <button
                                onClick={goAccount}
                                className="w-full border border-tiza px-6 py-4 font-bold transition-colors hover:bg-tiza hover:text-hierro"
                            >
                                {session ? "Ir a mi panel" : "Crear mi cuenta gratis"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* PREGUNTAS */}
                <section id="preguntas" className="scroll-mt-16 border-t border-plomo px-4 py-24 sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
                        <h2 className="font-display text-6xl font-black uppercase leading-[0.85] md:col-span-4 md:text-7xl">
                            Preguntas
                        </h2>
                        <div className="border-b border-plomo md:col-span-8">
                            {faqs.map((f) => (
                                <details key={f.q} className="group border-t border-plomo">
                                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium md:text-xl">
                                        {f.q}
                                        <Plus
                                            className="h-5 w-5 flex-none transition-transform duration-200 group-open:rotate-45"
                                            aria-hidden="true"
                                        />
                                    </summary>
                                    <p className="max-w-[62ch] pb-7 leading-relaxed text-acero">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CIERRE */}
                <section id="contacto" className="cw-invert bg-tiza px-4 py-24 text-hierro sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="font-display font-black uppercase leading-[0.82] text-[clamp(3.25rem,16vw,11rem)]">
                            ¿Empezamos?
                        </h2>
                        <div className="mt-10 grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-6">
                                <p className="max-w-[44ch] text-xl leading-relaxed">
                                    Escribile a Cristian y contale tu objetivo. Te responde en menos de 24 horas con el plan
                                    que mejor te sirve.
                                </p>
                                <a
                                    href={wa("Hola Cristian, quiero empezar a entrenar con vos.")}
                                    className="mt-8 inline-flex items-center gap-2.5 bg-hierro px-8 py-4 text-lg font-bold text-tiza transition-colors hover:bg-plomo"
                                >
                                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                    Escribir por WhatsApp
                                </a>
                            </div>
                            <dl className="grid gap-6 text-lg sm:grid-cols-2 md:col-span-5 md:col-start-8">
                                <div>
                                    <dt className="text-sm text-hierro/60">Teléfono</dt>
                                    <dd>
                                        <a href="tel:+5493884384713" className="underline underline-offset-4">
                                            +54 9 388 438-4713
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-hierro/60">Email</dt>
                                    <dd>
                                        <a href="mailto:jujuyentrena@gmail.com" className="break-all underline underline-offset-4">
                                            jujuyentrena@gmail.com
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-hierro/60">Comunidad</dt>
                                    <dd>
                                        <a
                                            href="https://chat.whatsapp.com/ByALBirqxwD7Kd2HJl3ii6"
                                            className="underline underline-offset-4"
                                        >
                                            Grupo de novedades
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-hierro/60">Tienda CW Life</dt>
                                    <dd>
                                        <button onClick={() => navigate("/shop")} className="underline underline-offset-4">
                                            Suplementos e indumentaria
                                        </button>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <Logo variant="header" className="scale-[0.85] origin-left" />
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-acero">
                        <li>
                            <button onClick={() => navigate("/business")} className="hover:text-tiza">
                                Asesoría para empresas
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/terms")} className="hover:text-tiza">
                                Términos
                            </button>
                        </li>
                        {socialLinks.map((s) => (
                            <li key={s.name}>
                                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-tiza">
                                    {s.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-plomo pt-6 text-sm text-acero sm:flex-row sm:justify-between">
                    <p>© {new Date().getFullYear()} CW Life. Todos los derechos reservados.</p>
                    <p>
                        Diseño:{" "}
                        <a href="https://instagram.com/lucastinte" target="_blank" rel="noreferrer" className="text-tiza hover:underline">
                            @lucastinte
                        </a>
                    </p>
                </div>
            </footer>

            {videoOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-hierro/95 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Video de Reconstruirte 90 días"
                    onClick={() => setVideoOpen(null)}
                >
                    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setVideoOpen(null)}
                            className="absolute -top-12 right-0 p-2 text-tiza"
                            aria-label="Cerrar video"
                            autoFocus
                        >
                            <X className="h-7 w-7" />
                        </button>
                        <video src={videoOpen} className="aspect-video w-full bg-hierro" controls autoPlay />
                    </div>
                </div>
            )}
        </div>
    );
}
