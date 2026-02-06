import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    MessageCircle,
    Mail,
    Phone,
    Star,
    ChevronDown,
    Instagram,
    Facebook,
    Twitter,
    Music2,
    MapPin,
    Users,
    LayoutDashboard,
    PlayCircle,
    FileText,
    Dumbbell,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import heroImage from "../assets/wosniak-hero.jpeg";
import aboutImage from "../assets/wosniak-about.png";
import transformacion1 from "../assets/transformacion-1.png";
import transformacion2 from "../assets/transformacion-2.png";
import transformacion3 from "../assets/transformacion-3.png";
import cvLogo from "../assets/cv-logo.svg";
import black90Dias from "../assets/black-90-dias.jpeg";
import { GymSection } from "../components/GymSection";
import evolution1 from "../assets/evolution-1.mp4";
import evolution2 from "../assets/evolution-2.mp4";
import evolution3 from "../assets/evolution-3.mp4";
import evolution4 from "../assets/evolution-4.mp4";

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [session, setSession] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const socialLinks = [
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@cristianwosniakoficial",
            icon: Music2,
        },
        {
            name: "Facebook",
            href: "https://www.facebook.com/cristianwosniakoficial",
            icon: Facebook,
        },
        { name: "X", href: "http://www.x.com/cristianwosniak", icon: Twitter },
        {
            name: "Instagram",
            href: "http://instagram.com/cristianwosniakoficial",
            icon: Instagram,
        },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    const buildWhatsAppLink = (message: string) =>
        `https://wa.me/5493884384713?text=${encodeURIComponent(message)}`;

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <img src={cvLogo} alt="CV Life" className="w-28 h-auto" />
                        </div>

                        <div className="hidden md:flex gap-8 items-center">
                            {["Inicio", "Sobre Mí", "Programas", "Sedes", "Precios", "Contacto"].map(
                                (item) => (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                                        }
                                        className="text-gray-300 hover:text-yellow-500 transition-colors"
                                    >
                                        {item}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() => navigate(session ? "/dashboard" : "/login")}
                                className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full transition-all transform hover:scale-105 text-sm flex items-center gap-2"
                            >
                                {session ? (
                                    <>
                                        <LayoutDashboard className="w-4 h-4" />
                                        Mi Panel
                                    </>
                                ) : (
                                    "Ingresar"
                                )}
                            </button>
                        </div>

                        <button
                            className="md:hidden text-yellow-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-black border-t border-yellow-500/20">
                        <div className="px-4 py-4 space-y-3">
                            {["Inicio", "Sobre Mí", "Programas", "Sedes", "Precios", "Contacto"].map(
                                (item) => (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                                        }
                                        className="block w-full text-left text-gray-300 hover:text-yellow-500 transition-colors py-2"
                                    >
                                        {item}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() => navigate(session ? "/dashboard" : "/login")}
                                className="block w-full text-center mt-4 px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                {session ? (
                                    <>
                                        <LayoutDashboard className="w-4 h-4" />
                                        Mi Panel
                                    </>
                                ) : (
                                    "Ingresar"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <section
                id="inicio"
                className="relative pt-24 pb-20 px-4 overflow-hidden scroll-smooth"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full animate-pulse-glow"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
                <div className="max-w-7xl mx-auto relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-2">
                                <h2 className="text-yellow-500 font-black tracking-[0.3em] text-sm md:text-base animate-fade-in uppercase">
                                    CRISTIAN WOSNIAK <span className="text-white/40 mx-2">|</span> CV LIFE STANDARD
                                </h2>
                                <h1 className="text-5xl md:text-8xl font-black leading-tight text-center md:text-left tracking-tighter italic">
                                    DOMINÁ TU <br />
                                    <span className="text-yellow-500 text-glow-yellow">REALIDAD</span>
                                </h1>
                            </div>
                            <p className="text-xl text-gray-400 text-center md:text-left max-w-xl mx-auto md:mx-0">
                                No cuento repeticiones. Destruyo tus limitaciones. Coaching de Élite para hombres y mujeres que no aceptan la mediocridad como estándar.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <a
                                    href="https://wa.me/5493884384713"
                                    className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_30px_rgba(234,179,8,0.3)]"
                                >
                                    <MessageCircle className="w-5 h-5 font-black" />
                                    TOMAR MI LUGAR
                                </a>
                                <button
                                    onClick={() => scrollToSection("programas")}
                                    className="px-8 py-4 border-2 border-yellow-500/50 text-white hover:bg-yellow-500/10 font-black rounded-lg transition-all"
                                >
                                    DEFINIR CAMPO DE BATALLA
                                </button>
                            </div>
                            <div className="text-sm text-yellow-500 font-black tracking-widest uppercase border-l-4 border-yellow-500 pl-4 py-1 mx-auto md:mx-0">
                                “DISCIPLINA SIN FILTROS. RESULTADOS SIN EXCUSAS.”
                            </div>

                            <div className="mt-3 w-full sm:w-auto">
                                <div className="inline-flex w-full sm:w-auto items-center gap-3 px-4 py-3 rounded-2xl glass-card-yellow shadow-[0_12px_40px_rgba(234,179,8,0.12)]">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-500/15 border border-yellow-500/50 text-yellow-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="text-left leading-tight">
                                        <div className="text-sm font-semibold text-white">
                                            Sajama 471 – Barrio Malvinas
                                        </div>
                                        <div className="text-xs text-gray-300">
                                            San Salvador de Jujuy
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group animate-float">
                            <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full group-hover:bg-yellow-500/30 transition-all duration-700 animate-pulse-glow"></div>
                            <img
                                src={heroImage}
                                alt="Cristian Wosniak | Estratega"
                                className="relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full h-[600px] object-cover border-b-4 border-yellow-500 grayscale-[20%] hover:grayscale-0 transition-all duration-500 box-glow-yellow"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-black/90 backdrop-blur-xl border-2 border-yellow-500/50 rounded-2xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                                        <Star className="w-8 h-8 text-black fill-current" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-yellow-500 tracking-tighter">
                                            4000+
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                                            Vidas Transformadas
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-20">
                        {[
                            {
                                title: "CÓDIGO CV LIFE",
                                desc: "Entrenamiento de Élite diseñado para destruir debilidades.",
                            },
                            {
                                title: "VIGILANCIA 24/7",
                                desc: "No te dejo caer. Mi sistema de reporte es tu seguro de éxito.",
                            },
                            {
                                title: "VERDAD BRUTAL",
                                desc: "Sin filtros. Solo resultados irrefutables verificables.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-6 glass-card-yellow border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-all hover:translate-y-[-4px] hover-glow-yellow"
                            >
                                <h3 className="text-xl font-bold text-yellow-500 mb-2 text-glow-yellow">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 bg-black relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-500/5 to-black opacity-50"></div>
                <div className="max-w-5xl mx-auto rounded-2xl glass-card border-yellow-500/20 p-8 md:p-12 space-y-6 relative z-10 box-glow-yellow">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <p className="text-sm uppercase tracking-[0.25em] text-yellow-500">
                                Estándar CV Life
                            </p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            La vara con la que medimos la excelencia
                        </h2>
                        <p className="text-gray-300">
                            No es solo un programa: es un código de conducta que separa a
                            quienes asisten del que domina su realidad.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 text-gray-200">
                        <div className="space-y-2">
                            <div className="text-yellow-500 font-semibold">
                                1. Estética de Poder
                            </div>
                            <p className="text-sm text-gray-300">
                                Presencia y autoridad con un físico construido con densidad y
                                propósito.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-yellow-500 font-semibold">
                                2. Disciplina Innegociable
                            </div>
                            <p className="text-sm text-gray-300">
                                El trabajo se hace, sin excusas. Si no dominás tu cuerpo, no
                                dominás tu vida.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-yellow-500 font-semibold">
                                3. Verdad Brutal
                            </div>
                            <p className="text-sm text-gray-300">
                                Nada falso: estrategia respaldada por resultados reales, en vivo
                                y en video.
                            </p>
                        </div>
                    </div>
                    <div className="border-l-2 border-yellow-500/60 pl-4 text-gray-200 italic">
                        “La mediocridad no es una opción en mi trinchera.”
                    </div>
                </div>
            </section>

            <section
                id="sobre-mí"
                className="py-20 px-4 bg-gradient-to-b from-black to-yellow-500/5"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative group animate-float">
                            <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] rounded-full group-hover:bg-yellow-500/20 transition-all duration-700 animate-pulse-glow"></div>
                            <img
                                src={aboutImage}
                                alt="Cristian Wosniak"
                                className="relative rounded-2xl shadow-2xl border-2 border-yellow-500/30 grayscale-[10%] hover:grayscale-0 transition-all duration-500 box-glow-yellow"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black italic">
                                <span className="text-yellow-500">CRISTIAN WOSNIAK</span>
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed font-medium">
                                No busco ser tu amigo. Busco ser el motor de tu transformación. Mi carrera se basa en la conquista de obstáculos y en la construcción de fortalezas donde antes había dudas.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                He liderado a más de 4000 personas hacia su mejor versión. Mi enfoque no es la "motivación" pasajera, es la disciplina inquebrantable que te permite dominar tu cuerpo y tu mente para siempre.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map(({ name, href, icon: Icon }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-yellow-500 hover:bg-yellow-500/10 transition-all hover:scale-105 hover-glow-yellow"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm font-semibold">{name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Community Section */}
            <section className="py-24 px-4 bg-yellow-500 relative overflow-hidden premium-gradient">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse-glow"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-black space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 border border-black/20 font-bold text-sm">
                                <Users className="w-4 h-4" />
                                <span>Comunidad Exclusiva</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">
                                Únete al Área de <br />
                                Miembros <span className="text-white drop-shadow-lg">Gratis</span>
                            </h2>
                            <p className="text-xl font-medium opacity-90">
                                Accede a contenido de valor que no publico en redes. Masterclasses, guías en PDF y rutinas express para llevar tu entrenamiento al siguiente nivel.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-3 p-4 bg-black/5 rounded-xl border border-black/10">
                                    <div className="w-10 h-10 bg-black text-yellow-500 rounded-lg flex items-center justify-center">
                                        <PlayCircle className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold">Masterclasses</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-black/5 rounded-xl border border-black/10">
                                    <div className="w-10 h-10 bg-black text-yellow-500 rounded-lg flex items-center justify-center">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold">Guías PDF</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(session ? "/dashboard" : "/login")}
                                className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-stone-900 font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-lg"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                {session ? "IR A MI CUARTEL" : "UNIRSE AL ESCUADRÓN (GRATIS)"}
                            </button>
                            <p className="text-sm font-black text-black tracking-tighter italic">
                                * ACCESO INMEDIATO. ACCIÓN INMEDIATA.
                            </p>
                        </div>

                        <div className="relative hidden md:block">
                            <div className="absolute inset-0 bg-black/20 blur-3xl rounded-full transform rotate-12"></div>
                            <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transform rotate-2 hover:rotate-0 transition-all duration-500 box-glow-yellow">
                                <div className="flex items-center justify-between mb-8 border-b border-gray-800/50 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center font-bold text-black shadow-lg shadow-yellow-500/20">B</div>
                                        <span className="font-bold text-white tracking-tight">BLACK COMMUNITY</span>
                                    </div>
                                    <div className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-black tracking-widest rounded-full border border-yellow-500/20 uppercase">
                                        MIEMBRO
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: "Guía de Hipertrofia.pdf", icon: FileText, type: "PDF", size: "2.4 MB" },
                                        { title: "Técnica de Sentadilla", icon: PlayCircle, type: "VIDEO", duration: "12:05" },
                                        { title: "Rutina Express Pecho", icon: Dumbbell, type: "RUTINA", intensity: "ALTA" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 glass-card rounded-xl border-white/5 hover:border-yellow-500/30 transition-all group/item">
                                            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 group-hover/item:bg-yellow-500 group-hover/item:text-black transition-colors">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-bold text-sm">{item.title}</div>
                                                <div className="text-gray-500 text-[10px] font-medium tracking-wide">{(item as any).size || (item as any).duration || (item as any).intensity} • {item.type}</div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center group-hover/item:border-yellow-500/50 transition-colors">
                                                <ChevronDown className="w-4 h-4 text-gray-500 -rotate-90 group-hover/item:text-yellow-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="programas" className="py-20 px-4 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
                            DEFINÍ TU <span className="text-yellow-500">CAMPO DE BATALLA</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-bold">
                            Elegí la modalidad para tu reconstrucción total
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Coaching Online",
                                desc: "Entrena desde cualquier lugar del mundo con seguimiento personalizado y feedback por video.",
                                features: [
                                    "Plan personalizado",
                                    "Videos demostrativos",
                                    "Seguimiento semanal",
                                    "Chat directo",
                                ],
                            },
                            {
                                title: "Presencial",
                                desc: "Sesiones individuales en San Salvador de Jujuy para maximizar tu rendimiento con atención 100% dedicada.",
                                features: [
                                    "Atención personalizada",
                                    "San Salvador de Jujuy",
                                    "Equipamiento completo",
                                    "Resultados más rápidos",
                                ],
                            },
                            {
                                title: "Reconstruirte",
                                desc: "Programa especializado de recuperación post-lesión para volver más fuerte que antes.",
                                features: [
                                    "Post-lesión",
                                    "Plan adaptado",
                                    "Acompañamiento técnico",
                                    "Vuelta segura",
                                ],
                            },
                        ].map((program, i) => (
                            <div
                                key={i}
                                className="group p-8 glass-card-yellow border-yellow-500/10 rounded-2xl hover:border-yellow-500 transition-all transform hover:-translate-y-2 hover-glow-yellow"
                            >
                                <h3 className="text-2xl font-bold text-yellow-500 mb-4 text-glow-yellow">
                                    {program.title}
                                </h3>
                                <p className="text-gray-300 mb-6">{program.desc}</p>
                                <ul className="space-y-3 mb-6">
                                    {program.features.map((feature, j) => (
                                        <li
                                            key={j}
                                            className="flex items-center gap-3 text-gray-400"
                                        >
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="https://wa.me/5493884384713"
                                    className="block w-full py-4 bg-yellow-500 text-black border border-yellow-500 rounded-lg text-center font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-yellow-400 shadow-[0_5px_15px_rgba(234,179,8,0.2)]"
                                >
                                    INGRESAR AL FRENTE
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="sedes" className="py-20 px-4 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Nuestras <span className="text-yellow-500">Sedes</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Encuéntranos en San Salvador de Jujuy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Sede Central",
                                subtitle: "Black Training GYM",
                                address: "Antenor Sajama 471",
                                city: "San Salvador de Jujuy",
                                highlight: true,
                            },
                            {
                                title: "Sede Entrenamiento Funcional",
                                subtitle: "Black Training Funcional",
                                address: "Mejías 412",
                                city: "San Salvador de Jujuy",
                                highlight: false,
                            },
                        ].map((sede, i) => (
                            <div
                                key={i}
                                className={`relative p-8 rounded-2xl transition-all transform hover:-translate-y-2 ${sede.highlight
                                    ? "glass-card-yellow border-yellow-500/40 shadow-[0_15px_50px_rgba(234,179,8,0.15)]"
                                    : "glass-card border-white/5"
                                    } hover:border-yellow-500/60 hover-glow-yellow`}
                            >
                                {sede.highlight && (
                                    <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-black text-xs font-extrabold rounded-full shadow-lg shadow-yellow-500/30">
                                        PRINCIPAL
                                    </span>
                                )}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`h-14 w-14 flex items-center justify-center rounded-xl ${sede.highlight
                                        ? "bg-yellow-500/20 border-2 border-yellow-500/50"
                                        : "bg-yellow-500/10 border border-yellow-500/30"
                                        }`}>
                                        <MapPin className={`w-7 h-7 ${sede.highlight ? "text-yellow-500" : "text-yellow-500/80"
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-2xl font-bold mb-1 ${sede.highlight ? "text-yellow-500" : "text-yellow-400"
                                            }`}>
                                            {sede.title}
                                        </h3>
                                        <p className="text-gray-300 font-semibold mb-4">
                                            {sede.subtitle}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                                <span className="text-lg">{sede.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <div className="w-1.5 h-1.5 bg-yellow-500/60 rounded-full"></div>
                                                <span>{sede.city}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${sede.address}, ${sede.city}`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-full py-3 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-black border border-yellow-500 rounded-lg text-center font-bold transition-all mt-6"
                                >
                                    Ver en Google Maps
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gradient-to-b from-black to-yellow-500/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-yellow-500">Transformaciones</span> Reales
                        </h2>
                        <p className="text-xl text-gray-400">
                            Resultados que hablan por sí mismos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Juan P.",
                                result: "-15kg en 3 meses",
                                review:
                                    "Increíble el cambio, tanto físico como mental. Cristian me ayudó a crear hábitos que ahora son parte de mi vida.",
                                image: transformacion1,
                            },
                            {
                                name: "María G.",
                                result: "Ganó 8kg músculo",
                                review:
                                    "Nunca pensé que podría lograr este nivel de fuerza y definición. El seguimiento es impecable.",
                                image: transformacion2,
                            },
                            {
                                name: "Lucía G.",
                                result: "Ganó músculo",
                                review:
                                    "Después de mi lesión pensé que no volvería a entrenar. El programa Reconstruirte me devolvió la confianza y la fuerza.",
                                image: transformacion3,
                            },
                        ].map((testimonial, i) => (
                            <div
                                key={i}
                                className="p-6 glass-card border-white/5 rounded-xl hover:border-yellow-500/50 transition-all hover:translate-y-[-4px] hover-glow-yellow"
                            >
                                <div className="mb-4 overflow-hidden rounded-lg border border-yellow-500/20">
                                    <img
                                        src={testimonial.image}
                                        alt={`Transformación de ${testimonial.name}`}
                                        className="w-full h-56 object-cover"
                                    />
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star
                                            key={j}
                                            className="w-5 h-5 text-yellow-500 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4 italic">
                                    "{testimonial.review}"
                                </p>
                                <div className="pt-4 border-t border-yellow-500/20">
                                    <div className="font-bold text-yellow-500">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {testimonial.result}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN ANTES Y DESPUÉS (VIDEOS) --- */}
            <section id="resultados" className="py-24 px-4 bg-black relative overflow-hidden">
                {/* Decoración de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                            RESULTADOS <span className="text-yellow-500">IRREFUTABLES</span>
                        </h2>
                        <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
                        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                            No son solo cambios físicos, son reconstrucciones totales de mentalidad y disciplina.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* Bloque 1 - Evolución Entrenador */}
                        <div className="group relative">
                            <div className="absolute -top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full">
                                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Proceso I | Cristian Wosniak</span>
                            </div>
                            <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 aspect-[9/16] md:aspect-video flex items-center justify-center group-hover:border-yellow-500/30 transition-all duration-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <PlayCircle className="w-16 h-16 text-white/20 mb-4 group-hover:text-yellow-500/50 transition-colors" />
                                </div>
                                <video
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                    }}
                                >
                                    <source src={evolution1} type="video/mp4" />
                                </video>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute -top-4 left-4 z-20 bg-yellow-500 px-4 py-1 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                <span className="text-xs font-bold tracking-widest text-black uppercase">Proceso II | Cristian Wosniak</span>
                            </div>
                            <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-yellow-500/5 aspect-[9/16] md:aspect-video flex items-center justify-center group-hover:border-yellow-500/50 transition-all duration-500 box-glow-yellow">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <Star className="w-16 h-16 text-yellow-500 mb-4" />
                                </div>
                                <video
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                    }}
                                >
                                    <source src={evolution2} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 grid md:grid-cols-2 gap-8 md:gap-12 border-t border-white/5 pt-20">
                        {/* Bloque 2 - Evolución Entrenador */}
                        <div className="group relative">
                            <div className="absolute -top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full">
                                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Proceso III | Cristian Wosniak</span>
                            </div>
                            <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 aspect-[9/16] md:aspect-video flex items-center justify-center group-hover:border-yellow-500/30 transition-all duration-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <PlayCircle className="w-16 h-16 text-white/20 mb-4 group-hover:text-yellow-500/50 transition-colors" />
                                </div>
                                <video
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                    }}
                                >
                                    <source src={evolution3} type="video/mp4" />
                                </video>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute -top-4 left-4 z-20 bg-yellow-500 px-4 py-1 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                <span className="text-xs font-bold tracking-widest text-black uppercase">Resultado Final | Cristian Wosniak</span>
                            </div>
                            <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-yellow-500/5 aspect-[9/16] md:aspect-video flex items-center justify-center group-hover:border-yellow-500/50 transition-all duration-500 box-glow-yellow">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 blur-lg bg-yellow-500/20 rounded-full animate-pulse"></div>
                                        <Star className="w-16 h-16 text-yellow-500 mb-4 relative z-10" />
                                    </div>
                                    <p className="text-yellow-500 font-bold tracking-widest uppercase">Evolución Máxima</p>
                                </div>
                                <video
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                    }}
                                >
                                    <source src={evolution4} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>

                    {/* Boton de Llamado a la acción rápido */}
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => scrollToSection('precios')}
                            className="px-8 py-4 bg-white text-black font-black text-sm tracking-widest uppercase hover:bg-yellow-500 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Quiero mi cambio ahora
                        </button>
                    </div>
                </div>
            </section>

            <section id="precios" className="py-20 px-4 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter">
                            ARMAMENTO <span className="text-yellow-500">ESTRATÉGICO</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-bold">
                            Seleccioná el nivel de compromiso que vas a sostener
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "BLACK | Training",
                                subtitle: "SEMI-PERSONALIZADO",
                                badge: "PREVENTA",
                                description: "SEMIPERSONALIZADO (10 cupos)",
                                features: [
                                    "Planes de alimentación",
                                    "Acceso IA personalizada 24/7",
                                    "Rutinas exclusivas de Cristian Wosniak",
                                    "Método BLACK",
                                    "Ingresás el 15 de Enero",
                                ],
                                location: "Sajama 471 – Barrio Malvinas, San Salvador de Jujuy",
                                message: "Hola, quiero reservar la preventa semipersonalizado.",
                            },
                            {
                                title: "Método CV Life Online",
                                subtitle: "Online personalizado",
                                badge: null,
                                description:
                                    "Plan de entrenamiento personalizado 100% online. Rutinas adaptadas a tu objetivo, seguimiento constante y asesoría nutricional. Entrená donde quieras, como quieras.",
                                features: [
                                    "Evaluación inicial",
                                    "Plan de entrenamiento adaptado",
                                    "Plan de alimentación personalizado",
                                    "Seguimiento y soporte constante",
                                    "Flexibilidad de horarios (avisando y sujeto a disponibilidad)",
                                ],
                                location: null,
                                message: "Hola, me interesa el plan Método CV Life Online.",
                            },
                            {
                                title: "BLACK | Training",
                                subtitle: "PRESENCIAL",
                                badge: "PREVENTA",
                                description: "PERSONALIZADO (5 cupos)",
                                features: [
                                    "Entrenás directo con Cristian Wosniak",
                                    "Planes de alimentación 100% personalizados",
                                    "Acceso a grupo premium exclusivo",
                                    "Seguimiento real y constante",
                                    "Método BLACK",
                                    "Ingresás el 15 de Enero",
                                ],
                                location: "Sajama 471 – Barrio Malvinas, San Salvador de Jujuy",
                                message: "Hola, quiero la preventa presencial BLACK.",
                            },
                            {
                                highlight: true,
                                title: "90 DÍAS BLACK",
                                subtitle: "Edición élite",
                                price: "⚡️ Exclusivo",
                                description:
                                    "El estándar BLACK está llegando. 90 días sin excusas para reconstruirte física y mentalmente.",
                                features: [
                                    "Programación de entrenamiento (online o presencial)",
                                    "Plan de alimentación personalizado",
                                    "Seguimiento diario y mindset de acero",
                                    "Solo para quienes están listos para reconstruirse",
                                ],
                                message:
                                    "Hola, quiero ser de los primeros en 90 DÍAS BLACK. Avísame cuando abra.",
                                image: black90Dias,
                            },
                        ].map((plan, i) =>
                            plan.highlight ? (
                                <div
                                    key={i}
                                    className="relative p-1 rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-[0_15px_50px_rgba(234,179,8,0.25)] lg:col-start-2 lg:row-start-2 lg:max-w-md lg:mx-auto"
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={plan.image}
                                            alt={plan.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/75 to-black/85"></div>
                                    </div>
                                    <div className="relative p-6 flex flex-col h-full backdrop-blur-[4px]">
                                        <div className="flex items-center justify-between mb-5">

                                        </div>
                                        <div className="mb-4 space-y-1">
                                            <p className="text-[10px] text-yellow-500 uppercase tracking-[0.25em] font-black">
                                                {plan.subtitle}
                                            </p>
                                            <h3 className="text-4xl font-black text-white leading-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
                                                {plan.title}
                                            </h3>
                                            {plan.price && (
                                                <p className="text-xl text-yellow-400 mt-1 font-bold text-glow-yellow">
                                                    {plan.price}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-gray-200 text-sm leading-relaxed mb-6 font-medium">
                                            {plan.description}
                                        </p>
                                        <div className="grid gap-2 text-xs text-gray-100 mb-8">
                                            {plan.features.map((feature, j) => (
                                                <div
                                                    key={j}
                                                    className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md shadow-xl"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
                                                    <span className="font-bold tracking-tight">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => navigate('/black-training')}
                                            className="mt-auto block w-full py-4 rounded-xl text-center font-black uppercase text-xs tracking-[0.2em] transition-all bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_10px_30px_rgba(234,179,8,0.4)] transform hover:scale-[1.02]"
                                        >
                                            CONOCER MÁS
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={i}
                                    className="relative p-8 rounded-2xl transition-all transform hover:-translate-y-2 glass-card-yellow border-yellow-500/10 hover:border-yellow-500/40 hover-glow-yellow"
                                >
                                    <div className="flex flex-col items-center text-center mb-6 gap-3">
                                        {plan.badge && (
                                            <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black tracking-widest shadow-lg shadow-yellow-500/30 uppercase">
                                                {plan.badge}
                                            </span>
                                        )}
                                        <div className="text-yellow-500 font-black text-2xl mb-0 text-glow-yellow tracking-tight">
                                            {plan.title}
                                        </div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold">
                                            {plan.subtitle}
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-8 text-sm leading-relaxed text-center font-medium">
                                        {plan.description}
                                    </p>
                                    <ul className="space-y-4 mb-10">
                                        {plan.features.map((feature, j) => (
                                            <li
                                                key={j}
                                                className="flex items-start gap-3 text-gray-300 text-sm"
                                            >
                                                <div className="w-1.5 h-1.5 mt-1.5 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                                                <span className="font-medium tracking-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.location && (
                                        <div className="text-[10px] text-gray-500 mb-8 text-center border-t border-white/5 pt-5 leading-relaxed tracking-wide">
                                            <div className="font-black text-yellow-500/80 uppercase tracking-[0.15em] mb-1">
                                                Ubicación
                                            </div>
                                            <div className="font-medium">{plan.location}</div>
                                        </div>
                                    )}
                                    <a
                                        href={buildWhatsAppLink(plan.message)}
                                        className="block w-full py-5 rounded-xl text-center font-black uppercase tracking-[0.2em] text-xs transition-all bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_12px_25px_rgba(234,179,8,0.3)] transform hover:scale-[1.02]"
                                    >
                                        EJECUTAR AHORA
                                    </a>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            <GymSection />

            <section className="py-20 px-4 bg-gradient-to-b from-black to-yellow-500/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Preguntas <span className="text-yellow-500">Frecuentes</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "¿El plan es realmente personalizado?",
                                a: "Sí, cada plan se diseña específicamente según tus objetivos, nivel actual, disponibilidad de tiempo y equipamiento. No hay dos planes iguales.",
                            },
                            {
                                q: "¿Cómo funciona el seguimiento?",
                                a: "Recibes un plan semanal que vas ejecutando. Me envías videos de tus ejercicios y te doy feedback. Tenemos comunicación constante por WhatsApp para resolver dudas.",
                            },
                            {
                                q: "¿Necesito equipamiento especial?",
                                a: "Depende de tu modalidad. Para online, adaptamos el plan a lo que tengas disponible (incluso si entrenas en casa sin equipamiento). Para presencial, mi gimnasio tiene todo lo necesario.",
                            },
                            {
                                q: "¿Incluye plan de nutrición?",
                                a: "Los planes de 2 y 3 meses incluyen guías nutricionales. El plan de 3 meses incluye un plan nutricional completo y personalizado.",
                            },
                            {
                                q: "¿Puedo entrenar desde cualquier lugar?",
                                a: "Absolutamente. El coaching online está diseñado para que puedas entrenar desde donde estés, ya sea en casa, en un gimnasio o viajando.",
                            },
                        ].map((faq, i) => (
                            <div
                                key={i}
                                className="glass-card border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all box-glow-yellow"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 flex justify-between items-center text-left hover:bg-yellow-500/5 transition-colors"
                                >
                                    <span className="font-bold text-lg">{faq.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-yellow-500 transition-transform ${openFaq === i ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 text-gray-400">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contacto" className="py-24 px-4 bg-black relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full animate-pulse-glow"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase italic leading-none tracking-tighter">
                        ¿LISTO PARA <span className="text-yellow-500 text-glow-yellow">RESURGIR?</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-16 font-medium max-w-2xl mx-auto">
                        Dejá de negociar con tu mediocridad. El cambio empieza con una orden.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {[
                            { icon: MessageCircle, label: "WhatsApp", sub: "Atención Inmediata", href: "https://wa.me/5493884384713" },
                            { icon: Mail, label: "Email", sub: "jujuyentrena@gmail.com", href: "mailto:jujuyentrena@gmail.com" },
                            { icon: Phone, label: "Teléfono", sub: "+54 9 3884 384713", href: "tel:+5493884384713" },
                            { icon: Users, label: "Comunidad", sub: "Novedades y Soporte", href: "https://chat.whatsapp.com/ByALBirqxwD7Kd2HJl3ii6" }
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                className="p-8 glass-card border-white/5 rounded-2xl hover:border-yellow-500/50 transition-all group hover:-translate-y-1"
                            >
                                <item.icon className="w-12 h-12 text-yellow-500 mx-auto mb-5 group-hover:scale-110 group-hover:text-glow-yellow transition-all duration-300" />
                                <div className="font-bold text-white mb-2 tracking-tight">{item.label}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.sub}</div>
                            </a>
                        ))}
                    </div>

                    <div className="p-10 glass-card-yellow border-yellow-500/20 rounded-3xl shadow-2xl">
                        <p className="text-lg text-gray-300 font-medium">
                            <span className="text-yellow-500 font-black uppercase tracking-widest mr-2">
                                Compromiso 24/7.
                            </span>
                            Nuestro equipo responderá en menos de 24 horas.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="relative overflow-hidden py-20 px-4 bg-gradient-to-b from-black via-[#050505] to-black border-t border-white/5">
                <div className="absolute -top-24 left-10 h-64 w-64 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" />
                <div className="absolute -bottom-28 right-0 h-72 w-72 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid gap-16 mb-16 md:grid-cols-12 items-start">
                        <div className="md:col-span-5 space-y-6">
                            <div className="flex items-center gap-2">
                                <img src={cvLogo} alt="CV Life" className="h-10 w-auto" />
                            </div>
                            <p className="text-gray-400 leading-relaxed font-medium">
                                Transformando vidas a través del fitness y el coaching de élite personalizado.
                            </p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                                <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">
                                    Disciplina sin filtros. Resultados sin excusas.
                                </span>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <h3 className="font-bold text-yellow-500 mb-4">Enlaces Rápidos</h3>
                            <div className="space-y-2">
                                {["Inicio", "Programas", "Sedes", "Precios", "Contacto"].map((link) => (
                                    <button
                                        key={link}
                                        onClick={() => scrollToSection(link.toLowerCase())}
                                        className="block text-gray-400 hover:text-yellow-500 transition-colors"
                                    >
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-4">
                            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Sígueme</h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map(({ name, href, icon: Icon }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-gray-300 hover:text-yellow-500 hover:border-yellow-500/50 transition-all hover:scale-105"
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs font-bold tracking-tight">{name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-yellow-500/20 text-center text-gray-400 space-y-2">
                        <p>&copy; 2024 CV Life. Todos los derechos reservados.</p>
                        <p className="text-sm">
                            Diseño:{" "}
                            <a
                                href="http://instagram.com/lucastinte"
                                target="_blank"
                                rel="noreferrer"
                                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                            >
                                @lucastinte
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div >
    );
}
