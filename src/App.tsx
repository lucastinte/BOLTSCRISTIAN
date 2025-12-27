import { FormEvent, useEffect, useState } from "react";
import {
  Menu,
  X,
  Dumbbell,
  MessageCircle,
  Mail,
  Phone,
  Star,
  ChevronDown,
  Instagram,
  Facebook,
  Twitter,
  Music2,
} from "lucide-react";
import heroImage from "./assets/wosniak-hero.jpeg";
import aboutImage from "./assets/wosniak-about.png";
import transformacion1 from "./assets/transformacion-1.png";
import transformacion2 from "./assets/transformacion-2.png";
import transformacion3 from "./assets/transformacion-3.png";
import cwLogo from "./assets/xxx.svg";

type Transformation = {
  id: string;
  name: string;
  result: string;
  review: string;
  image: string;
  enabled: boolean;
  order: number;
};

type Plan = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  message: string;
};

type SocialLink = {
  key: "tiktok" | "facebook" | "x" | "instagram";
  name: string;
  href: string;
};

type IconType = typeof Music2;

const socialIconMap: Record<SocialLink["key"], IconType> = {
  tiktok: Music2,
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
};

const MAX_VISIBLE_TRANSFORMATIONS = 5;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [transformations, setTransformations] = useState<Transformation[]>([
    {
      id: "t1",
      name: "Juan P.",
      result: "-15kg en 3 meses",
      review:
        "Increíble el cambio, tanto físico como mental. Cristian me ayudó a crear hábitos que ahora son parte de mi vida.",
      image: transformacion1,
      enabled: true,
      order: 1,
    },
    {
      id: "t2",
      name: "María G.",
      result: "Ganó 8kg músculo",
      review:
        "Nunca pensé que podría lograr este nivel de fuerza y definición. El seguimiento es impecable.",
      image: transformacion2,
      enabled: true,
      order: 2,
    },
    {
      id: "t3",
      name: "Lucía G.",
      result: "Ganó músculo",
      review:
        "Después de mi lesión pensé que no volvería a entrenar. El programa Reconstruirte me devolvió la confianza y la fuerza.",
      image: transformacion3,
      enabled: true,
      order: 3,
    },
  ]);
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "p1",
      title: "Método CW Life",
      subtitle: "12 sesiones presenciales",
      price: "$70.000",
      description:
        "Plan de entrenamiento personalizado, online o presencial. Rutinas adaptadas a tu objetivo, seguimiento constante y asesoría nutricional para maximizar resultados.",
      features: [
        "Evaluación inicial",
        "Plan de entrenamiento adaptado",
        "Plan de alimentación personalizado",
        "Seguimiento y soporte constante 24/7",
        "Flexibilidad de horarios (avisando y sujeto a disponibilidad)",
        "12 sesiones de entrenamiento personalizado presencial",
      ],
      message: "Hola, me interesa el plan Método CW Life (12 sesiones).",
    },
    {
      id: "p2",
      title: "Método CW Life Online",
      subtitle: "Online personalizado",
      price: "$30.000",
      description:
        "Plan de entrenamiento personalizado 100% online. Rutinas adaptadas a tu objetivo, seguimiento constante y asesoría nutricional. Entrená donde quieras, como quieras.",
      features: [
        "Evaluación inicial",
        "Plan de entrenamiento adaptado",
        "Plan de alimentación personalizado",
        "Seguimiento y soporte constante",
        "Flexibilidad de horarios (avisando y sujeto a disponibilidad)",
      ],
      message: "Hola, me interesa el plan Método CW Life Online.",
    },
    {
      id: "p3",
      title: "Método CW Life Plus",
      subtitle: "25 sesiones presenciales",
      price: "$90.000",
      description:
        "Plan de entrenamiento personalizado, online o presencial, con más sesiones para acelerar tus resultados. Seguimiento constante y asesoría nutricional incluida.",
      features: [
        "Evaluación inicial",
        "Plan de entrenamiento adaptado",
        "Plan de alimentación personalizado",
        "Seguimiento y soporte constante",
        "Flexibilidad de horarios (avisando y sujeto a disponibilidad)",
        "25 sesiones de entrenamiento personalizado presencial",
      ],
      message: "Hola, me interesa el plan Método CW Life Plus (25 sesiones).",
    },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      key: "tiktok",
      name: "TikTok",
      href: "https://www.tiktok.com/@cristianwosniakoficial",
    },
    {
      key: "facebook",
      name: "Facebook",
      href: "https://www.facebook.com/cristianwosniakoficial",
    },
    { key: "x", name: "X", href: "http://www.x.com/cristianwosniak" },
    {
      key: "instagram",
      name: "Instagram",
      href: "http://instagram.com/cristianwosniakoficial",
    },
  ]);
  const [whatsAppNumber, setWhatsAppNumber] =
    useState<string>("5493884384713");
  const [mainImages, setMainImages] = useState<{
    hero: string;
    about: string;
  }>({
    hero: heroImage,
    about: aboutImage,
  });

  const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || "panel123";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const buildWhatsAppLink = (message: string) =>
    `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("cw-admin");
    setAdminPinInput("");
  };

  useEffect(() => {
    const savedAdmin = localStorage.getItem("cw-admin");
    if (savedAdmin === "1") {
      setIsAdmin(true);
    }
    const savedTransformations = localStorage.getItem("cw-transformations");
    if (savedTransformations) {
      try {
        const parsed = JSON.parse(savedTransformations);
        if (Array.isArray(parsed)) {
          setTransformations(parsed);
        }
      } catch {
        // ignore parsing errors and keep defaults
      }
    }

    const savedPlans = localStorage.getItem("cw-plans");
    if (savedPlans) {
      try {
        const parsed = JSON.parse(savedPlans);
        if (Array.isArray(parsed)) {
          setPlans(parsed);
        }
      } catch {
        // ignore parsing errors
      }
    }

    const savedSocials = localStorage.getItem("cw-socials");
    if (savedSocials) {
      try {
        const parsed = JSON.parse(savedSocials);
        if (Array.isArray(parsed)) {
          setSocialLinks(parsed);
        }
      } catch {
        // ignore parsing errors
      }
    }

    const savedWa = localStorage.getItem("cw-whatsapp");
    if (savedWa) {
      setWhatsAppNumber(savedWa);
    }

    const savedMainImages = localStorage.getItem("cw-main-images");
    if (savedMainImages) {
      try {
        const parsed = JSON.parse(savedMainImages);
        if (parsed?.hero && parsed?.about) {
          setMainImages(parsed);
        }
      } catch {
        // ignore parsing errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cw-transformations", JSON.stringify(transformations));
  }, [transformations]);

  useEffect(() => {
    localStorage.setItem("cw-plans", JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem("cw-socials", JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem("cw-whatsapp", whatsAppNumber);
  }, [whatsAppNumber]);

  useEffect(() => {
    localStorage.setItem("cw-main-images", JSON.stringify(mainImages));
  }, [mainImages]);

  const handleAdminLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (adminPinInput.trim() === ADMIN_PIN) {
      setIsAdmin(true);
      localStorage.setItem("cw-admin", "1");
      setAdminError("");
    } else {
      setAdminError("PIN incorrecto. Intenta nuevamente.");
    }
  };

  const handleTransformationChange = (
    id: string,
    field: "name" | "result" | "review" | "image" | "order" | "enabled",
    value: string | number | boolean
  ) => {
    setTransformations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "order"
                  ? Math.max(1, Number(value))
                  : field === "enabled"
                  ? Boolean(value)
                  : value,
            }
          : item
      )
    );
  };

  const addTransformation = () => {
    const nextOrder =
      transformations.reduce((max, t) => Math.max(max, t.order), 0) + 1;
    const newItem: Transformation = {
      id: `t-${Date.now()}`,
      name: "Nuevo caso",
      result: "Resultado",
      review: "Agrega el testimonio aquí.",
      image: "",
      enabled: true,
      order: nextOrder,
    };
    setTransformations((prev) => [...prev, newItem]);
  };

  const handlePlanFieldChange = (
    id: string,
    field: keyof Plan,
    value: string
  ) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSocialChange = (key: SocialLink["key"], href: string) => {
    setSocialLinks((prev) =>
      prev.map((s) => (s.key === key ? { ...s, href } : s))
    );
  };

  const removeTransformation = (id: string) => {
    setTransformations((prev) => prev.filter((t) => t.id !== id));
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleTransformationFile = async (id: string, file: File | null) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    handleTransformationChange(id, "image", dataUrl);
  };

  const handleMainImageFile = async (
    key: "hero" | "about",
    file: File | null
  ) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setMainImages((prev) => ({ ...prev, [key]: dataUrl }));
  };

  const saveAllChanges = async () => {
    setSaving(true);
    setSaveError("");
    try {
      // Simulación de persistencia local; cuando conectes Render,
      // reemplaza esta parte con un fetch al backend.
      localStorage.setItem(
        "cw-transformations",
        JSON.stringify(transformations)
      );
      localStorage.setItem("cw-plans", JSON.stringify(plans));
      localStorage.setItem("cw-socials", JSON.stringify(socialLinks));
      localStorage.setItem("cw-whatsapp", whatsAppNumber);
      localStorage.setItem("cw-main-images", JSON.stringify(mainImages));

      // Ejemplo para futuro:
      // await fetch(`${import.meta.env.VITE_API_BASE}/admin/save`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      //   body: JSON.stringify({ transformations, plans, socialLinks, whatsAppNumber, mainImages }),
      // });

      setLastSavedAt(new Date().toLocaleTimeString());
    } catch (err) {
      setSaveError("No se pudo guardar. Reintenta.");
    } finally {
      setSaving(false);
    }
  };

  const visibleTransformations = transformations
    .filter((t) => t.enabled)
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_VISIBLE_TRANSFORMATIONS);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={cwLogo} alt="CW Life" className="w-28 h-auto" />
            </div>

            <div className="hidden md:flex gap-8">
              {["Inicio", "Sobre Mí", "Programas", "Precios", "Contacto"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(item.toLowerCase().replace(" ", "-"))
                    }
                    className="text-gray-300 hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
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
              {["Inicio", "Sobre Mí", "Programas", "Precios", "Contacto"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(item.toLowerCase().replace(" ", "-"))
                    }
                    className="block w-full text-left text-gray-300 hover:text-yellow-500 transition-colors py-2"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      <section
        id="inicio"
        className="relative pt-24 pb-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-black to-black"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-sm">
                Personal Trainer
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Transforma tu
                <span className="block text-yellow-500">Vida Ahora</span>
              </h1>
              <p className="text-xl text-gray-400">
                Coaching personalizado que te lleva desde donde estás hasta
                donde quieres estar. Sin excusas, con resultados reales.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={buildWhatsAppLink("")}
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Empieza Hoy
                </a>
                <button
                  onClick={() => scrollToSection("programas")}
                  className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-bold rounded-lg transition-all"
                >
                  Ver Programas
                </button>
              </div>
              <div className="text-sm text-gray-400 italic border-l-2 border-yellow-500/60 pl-3">
                “Disciplina sin filtros. Resultados sin excusas.”
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
              <img
                src={mainImages.hero}
                alt="Cristian Wosniak entrenando"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover border-2 border-yellow-500/30"
              />
              <div className="absolute -bottom-6 -left-6 bg-black border-2 border-yellow-500 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-black fill-current" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">
                      4000+
                    </div>
                    <div className="text-sm text-gray-400">
                      Clientes Transformados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              {
                title: "Plan a Medida",
                desc: "Entrenamiento personalizado según tus objetivos",
              },
              {
                title: "Seguimiento 24/7",
                desc: "Acompañamiento constante en tu proceso",
              },
              {
                title: "Resultados Garantizados",
                desc: "Compromiso total con tu transformación",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-all"
              >
                <h3 className="text-xl font-bold text-yellow-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-black">
        <div className="max-w-5xl mx-auto rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-black to-yellow-500/5 p-8 md:p-12 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-500">
                Estándar CW Life
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
            “Lo que el mundo llama sacrificio, nosotros lo llamamos el
            Estándar.”
          </div>
        </div>
      </section>

      <section
        id="sobre-mí"
        className="py-20 px-4 bg-gradient-to-b from-black to-yellow-500/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={mainImages.about}
                alt="Cristian Wosniak"
                className="rounded-2xl shadow-2xl border-2 border-yellow-500/30"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Soy <span className="text-yellow-500">Cristian Wosniak</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Hace años, yo también estuve en tu lugar. Perdido, sin
                dirección, sin saber cómo alcanzar mis metas. Hoy soy Personal
                Trainer y he ayudado a más de 4000 personas a transformar sus
                vidas.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Mi misión es simple: guiarte paso a paso en tu transformación,
                con un plan personalizado, seguimiento constante y el apoyo que
                necesitas para lograr resultados reales y duraderos.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, href, key }) => {
                  const Icon = socialIconMap[key] || Music2;
                  return (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 border border-yellow-500/40 rounded-full text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">{name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programas" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Programas de{" "}
              <span className="text-yellow-500">Entrenamiento</span>
            </h2>
            <p className="text-xl text-gray-400">
              Elige la modalidad que mejor se adapte a ti
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
                className="group p-8 bg-gradient-to-br from-yellow-500/5 to-transparent border-2 border-yellow-500/20 rounded-2xl hover:border-yellow-500 transition-all transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                  {program.title}
                </h3>
                <p className="text-gray-300 mb-6">{program.desc}</p>
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppLink("Hola, quiero más info sobre tus programas.")}
                  className="block w-full py-3 bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-black border border-yellow-500 rounded-lg text-center font-bold transition-all"
                >
                  Más Información
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
            {visibleTransformations.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 bg-black border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-all"
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

      <section id="precios" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Retransfórmate{" "}
              <span className="text-yellow-500">Planes Inteligentes</span>
            </h2>
            <p className="text-xl text-gray-400">
              Planes personalizados. Elegí el que más te convenga.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="relative p-8 rounded-2xl transition-all transform hover:-translate-y-2 bg-gradient-to-br from-yellow-500/5 to-transparent border-2 border-yellow-500/20 hover:border-yellow-500/50"
              >
                <div className="text-center mb-4">
                  <div className="text-yellow-500 font-bold text-lg mb-1">
                    {plan.title}
                  </div>
                  <div className="text-sm text-gray-400">{plan.subtitle}</div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold mb-1">{plan.price}</div>
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                    >
                      <div className="w-2 h-2 mt-1 bg-yellow-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildWhatsAppLink(plan.message)}
                  className="block w-full py-4 rounded-lg text-center font-bold transition-all bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  Ingresá ahora
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                className="border-2 border-yellow-500/20 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-yellow-500/5 transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-yellow-500 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
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

      <section id="contacto" className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="text-yellow-500">Empezar?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Contáctame ahora y comencemos tu transformación hoy mismo
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href={buildWhatsAppLink("Hola Cristian, quiero empezar.")}
              className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500 transition-all group"
            >
              <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-bold mb-2">WhatsApp</div>
              <div className="text-sm text-gray-400">Respuesta inmediata</div>
            </a>

            <a
              href="mailto:jujuyentrena@gmail.com"
              className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500 transition-all group"
            >
              <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-bold mb-2">Email</div>
              <div className="text-sm text-gray-400">
                jujuyentrena@gmail.com
              </div>
            </a>

            <a
              href={`tel:+${whatsAppNumber}`}
              className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500 transition-all group"
            >
              <Phone className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-bold mb-2">Teléfono</div>
              <div className="text-sm text-gray-400">+{whatsAppNumber}</div>
            </a>
          </div>

          <div className="p-8 bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-yellow-500/20 border-2 border-yellow-500/30 rounded-2xl">
            <p className="text-lg text-gray-300">
              <span className="text-yellow-500 font-bold">
                Respuesta en menos de 24 horas.
              </span>{" "}
              Estoy comprometido con tu éxito desde el primer contacto.
            </p>
          </div>
        </div>
      </section>

      <button
        onClick={() => {
          setAdminOpen(true);
          setAdminError("");
        }}
        className="fixed bottom-4 right-4 h-10 w-10 opacity-0 hover:opacity-60 focus:opacity-60 bg-yellow-500/10 border border-yellow-500/20 rounded-full transition-opacity z-50"
        aria-label="Abrir panel administrativo oculto"
      >
        <span className="sr-only">Abrir panel administrativo</span>
      </button>

      {adminOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-5xl bg-zinc-900 border border-yellow-500/30 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setAdminOpen(false);
                setAdminError("");
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAdmin ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <h3 className="text-2xl font-bold text-yellow-500">
                  Acceso privado
                </h3>
                <p className="text-sm text-gray-400">
                  Ingresa el PIN para editar las transformaciones.
                  (Define <code>VITE_ADMIN_PIN</code> en el entorno para no usar
                  el valor por defecto).
                </p>
                <div className="space-y-2">
                  <label className="block text-sm text-gray-300">
                    PIN de acceso
                  </label>
                  <input
                    type="password"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    className="w-full rounded-lg bg-black border border-yellow-500/30 px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                    placeholder="••••••"
                  />
                  {adminError && (
                    <p className="text-sm text-red-400">{adminError}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
                  >
                    Entrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminOpen(false);
                      setAdminPinInput("");
                      setAdminError("");
                    }}
                    className="px-4 py-2 rounded-lg border border-yellow-500/30 text-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Panel guardará cambios en el navegador. Para guardar en GitHub
                  conecta el endpoint en Render y reemplaza el guardado local.
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-500">
                      Panel de Transformaciones
                    </h3>
                    <p className="text-sm text-gray-400">
                      Edita los datos y URLs de las imágenes. Hoy se guardan en
                      localStorage; luego apuntaremos al backend de Render para
                      subir y commitear a GitHub.
                    </p>
                    <p className="text-xs text-gray-500">
                      Se muestran hasta {MAX_VISIBLE_TRANSFORMATIONS} tarjetas
                      activas, ordenadas por el campo "Orden" (1 = primero).
                    </p>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    className="px-3 py-2 rounded-lg border border-yellow-500/30 text-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors text-sm"
                  >
                    Cerrar sesión
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border border-yellow-500/20 rounded-xl p-3 bg-black/40">
                  <div className="text-sm text-gray-400">
                    <p>Guarda los cambios y luego conéctalo al backend en Render.</p>
                    {lastSavedAt && (
                      <p className="text-green-400">
                        Último guardado: {lastSavedAt}
                      </p>
                    )}
                    {saveError && <p className="text-red-400">{saveError}</p>}
                  </div>
                  <button
                    onClick={saveAllChanges}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={addTransformation}
                    className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors text-sm"
                  >
                    Agregar transformación
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {transformations.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-yellow-500/20 bg-black/40 space-y-3"
                    >
                      <div className="aspect-video overflow-hidden rounded-lg border border-yellow-500/20">
                        <img
                          src={item.image}
                          alt={`Transformación ${item.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="space-y-1">
                          <label className="block text-gray-300">Nombre</label>
                          <input
                            value={item.name}
                            onChange={(e) =>
                              handleTransformationChange(
                                item.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-gray-300">Resultado</label>
                          <input
                            value={item.result}
                            onChange={(e) =>
                              handleTransformationChange(
                                item.id,
                                "result",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-gray-300">Review</label>
                          <textarea
                            value={item.review}
                            onChange={(e) =>
                              handleTransformationChange(
                                item.id,
                                "review",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500 min-h-[90px]"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="space-y-1">
                            <label className="block text-gray-300">
                              Orden
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={item.order}
                              onChange={(e) =>
                                handleTransformationChange(
                                  item.id,
                                  "order",
                                  Number(e.target.value)
                                )
                              }
                              className="w-24 rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                            />
                          </div>
                          <label className="flex items-center gap-2 text-gray-300 mt-6">
                            <input
                              type="checkbox"
                              checked={item.enabled}
                              onChange={(e) =>
                                handleTransformationChange(
                                  item.id,
                                  "enabled",
                                  e.target.checked
                                )
                              }
                              className="h-4 w-4 accent-yellow-500"
                            />
                            Mostrar
                          </label>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-gray-300">
                            Imagen (subir archivo)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleTransformationFile(
                                item.id,
                                e.target.files?.[0] || null
                              )
                            }
                            className="w-full text-sm text-gray-300"
                          />
                          <p className="text-xs text-gray-500">
                            Se guarda como data URL. En Render reemplaza este
                            paso por un upload real y guarda la URL devuelta.
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeTransformation(item.id)}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-yellow-500/20 pt-4 space-y-3">
                  <h4 className="text-xl font-bold text-yellow-500">
                    Imágenes principales
                  </h4>
                  <p className="text-sm text-gray-400">
                    Cambia la imagen del héroe y la de “Sobre mí”.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="aspect-video overflow-hidden rounded-lg border border-yellow-500/20">
                        <img
                          src={mainImages.hero}
                          alt="Hero"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="block text-gray-300">
                        Hero (subir archivo)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleMainImageFile("hero", e.target.files?.[0] || null)
                        }
                        className="w-full text-sm text-gray-300"
                      />
                      <p className="text-xs text-gray-500">
                        Se guarda como data URL. En Render reemplaza por upload
                        real y guarda la URL devuelta.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="aspect-video overflow-hidden rounded-lg border border-yellow-500/20">
                        <img
                          src={mainImages.about}
                          alt="Sobre mí"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="block text-gray-300">
                        Sobre mí (subir archivo)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleMainImageFile(
                            "about",
                            e.target.files?.[0] || null
                          )
                        }
                        className="w-full text-sm text-gray-300"
                      />
                      <p className="text-xs text-gray-500">
                        Se guarda como data URL. En Render reemplaza por upload
                        real y guarda la URL devuelta.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-yellow-500/20 pt-4 space-y-3">
                  <h4 className="text-xl font-bold text-yellow-500">
                    Planes Retransfórmate
                  </h4>
                  <p className="text-sm text-gray-400">
                    Ajusta precios y subtítulos. El resto del copy se mantiene
                    igual.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="p-4 rounded-xl border border-yellow-500/20 bg-black/40 space-y-3 text-sm"
                      >
                        <div className="space-y-1">
                          <label className="block text-gray-300">Título</label>
                          <input
                            value={plan.title}
                            onChange={(e) =>
                              handlePlanFieldChange(plan.id, "title", e.target.value)
                            }
                            className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-gray-300">
                            Subtítulo
                          </label>
                          <input
                            value={plan.subtitle}
                            onChange={(e) =>
                              handlePlanFieldChange(
                                plan.id,
                                "subtitle",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-gray-300">Precio</label>
                          <input
                            value={plan.price}
                            onChange={(e) =>
                              handlePlanFieldChange(plan.id, "price", e.target.value)
                            }
                            className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-yellow-500/20 pt-4 space-y-3">
                  <h4 className="text-xl font-bold text-yellow-500">
                    Redes y WhatsApp
                  </h4>
                  <p className="text-sm text-gray-400">
                    Ajusta tus enlaces y número para los CTAs.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-gray-300">WhatsApp</label>
                      <input
                        value={whatsAppNumber}
                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                        className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                        placeholder="549XXXXXXXXX"
                      />
                      <p className="text-xs text-gray-500">
                        Usa solo números (sin +). Se usa en todos los botones y
                        en el teléfono de contacto.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-300">Instagram</label>
                      <input
                        value={
                          socialLinks.find((s) => s.key === "instagram")?.href ||
                          ""
                        }
                        onChange={(e) =>
                          handleSocialChange("instagram", e.target.value)
                        }
                        className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-300">TikTok</label>
                      <input
                        value={
                          socialLinks.find((s) => s.key === "tiktok")?.href || ""
                        }
                        onChange={(e) =>
                          handleSocialChange("tiktok", e.target.value)
                        }
                        className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-300">Facebook</label>
                      <input
                        value={
                          socialLinks.find((s) => s.key === "facebook")?.href ||
                          ""
                        }
                        onChange={(e) =>
                          handleSocialChange("facebook", e.target.value)
                        }
                        className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-300">X (Twitter)</label>
                      <input
                        value={socialLinks.find((s) => s.key === "x")?.href || ""}
                        onChange={(e) => handleSocialChange("x", e.target.value)}
                        className="w-full rounded-lg bg-black border border-yellow-500/30 px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-12 px-4 bg-black border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={cwLogo} alt="CW Life" className="h-8 w-auto" />
              </div>
              <p className="text-gray-400">
                Transformando vidas a través del fitness y el coaching
                personalizado.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-yellow-500 mb-4">
                Enlaces Rápidos
              </h3>
              <div className="space-y-2">
                {["Inicio", "Programas", "Precios", "Contacto"].map((link) => (
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

            <div>
              <h3 className="font-bold text-yellow-500 mb-4">Sígueme</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ name, href, key }) => {
                  const Icon = socialIconMap[key] || Music2;
                  return (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 border border-yellow-500/20 rounded-lg text-gray-300 hover:text-yellow-500 hover:border-yellow-500/60 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-yellow-500/20 text-center text-gray-400 space-y-2">
            <p>&copy; 2024 CW Life. Todos los derechos reservados.</p>
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
    </div>
  );
}

export default App;
