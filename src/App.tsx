import { useState } from "react";
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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              <Dumbbell className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-500">
                CW Life
              </span>
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
                Entrenador Personal Certificado
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
                  href="https://wa.me/5493884384713"
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
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
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
                      500+
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

      <section
        id="sobre-mí"
        className="py-20 px-4 bg-gradient-to-b from-black to-yellow-500/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={aboutImage}
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
                dirección, sin saber cómo alcanzar mis metas. Hoy soy entrenador
                personal certificado y he ayudado a más de 500 personas a
                transformar sus vidas.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Mi misión es simple: guiarte paso a paso en tu transformación,
                con un plan personalizado, seguimiento constante y el apoyo que
                necesitas para lograr resultados reales y duraderos.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, href, icon: Icon }) => (
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
                ))}
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
                desc: "Sesiones individuales en Buenos Aires para maximizar tu rendimiento con atención 100% dedicada.",
                features: [
                  "Atención personalizada",
                  "Buenos Aires",
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
                  "Fisioterapia integrada",
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
                  href="https://wa.me/5493884384713"
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
                name: "Lucas R.",
                result: "Recuperación total",
                review:
                  "Después de mi lesión pensé que no volvería a entrenar. El programa Reconstruirte me devolvió la confianza.",
                image: transformacion3,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
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
              Transfórmate:{" "}
              <span className="text-yellow-500">Planes Inteligentes</span>
            </h2>
            <p className="text-xl text-gray-400">
              Planes personalizados. Elegí el que más te convenga.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Método CW Life",
                subtitle: "12 sesiones presenciales",
                price: "$70.000",
                description:
                  "Plan de entrenamiento personalizado, online o presencial. Rutinas adaptadas a tu objetivo, seguimiento constante y asesoría nutricional para maximizar resultados.",
                valid: "Válido por un mes",
                features: [
                  "Evaluación inicial",
                  "Plan de entrenamiento adaptado",
                  "Plan de alimentación personalizado",
                  "Seguimiento y soporte constante 24/7",
                  "Flexibilidad de horarios (avisando y sujeto a disponibilidad)",
                  "12 sesiones de entrenamiento personalizado presencial",
                ],
                message:
                  "Hola, me interesa el plan Método CW Life (12 sesiones).",
              },
              {
                title: "Método CW Life Online",
                subtitle: "Online personalizado",
                price: "$30.000",
                description:
                  "Plan de entrenamiento personalizado 100% online. Rutinas adaptadas a tu objetivo, seguimiento constante y asesoría nutricional. Entrená donde quieras, como quieras.",
                valid: "Válido por un mes",
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
                title: "Método CW Life Plus",
                subtitle: "25 sesiones presenciales",
                price: "$90.000",
                description:
                  "Plan de entrenamiento personalizado, online o presencial, con más sesiones para acelerar tus resultados. Seguimiento constante y asesoría nutricional incluida.",
                valid: "Válido por un mes",
                features: [
                  "Evaluación inicial",
                  "Plan de entrenamiento adaptado",
                  "Plan de alimentación personalizado",
                  "Seguimiento y soporte constante",
                  "Flexibilidad de horarios (avisando y sujeto a disponibilidad)",
                  "25 sesiones de entrenamiento personalizado presencial",
                ],
                message:
                  "Hola, me interesa el plan Método CW Life Plus (25 sesiones).",
              },
            ].map((plan, i) => (
              <div
                key={i}
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
                  <div className="text-gray-400 text-sm">{plan.valid}</div>
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
              href="https://wa.me/5493884384713"
              className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500 transition-all group"
            >
              <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-bold mb-2">WhatsApp</div>
              <div className="text-sm text-gray-400">Respuesta inmediata</div>
            </a>

            <a
              href="mailto:lucartinte19@gmail.com"
              className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500 transition-all group"
            >
              <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-bold mb-2">Email</div>
              <div className="text-sm text-gray-400">
                lucartinte19@gmail.com
              </div>
            </a>

            <a
              href="tel:+5493884384713"
              className="p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500 transition-all group"
            >
              <Phone className="w-12 h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-bold mb-2">Teléfono</div>
              <div className="text-sm text-gray-400">+54 9 3884 38-4713</div>
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

      <footer className="py-12 px-4 bg-black border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-500">
                  CW Life
                </span>
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
                {socialLinks.map(({ name, href, icon: Icon }) => (
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
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-yellow-500/20 text-center text-gray-400">
            <p>&copy; 2024 CW Life. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
