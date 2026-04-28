import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, Target, Users, Zap, CheckCircle, MessageCircle } from "lucide-react";
import { Logo } from "../components/Logo";
import consultingVideo from "../assets/consulting-video.mp4";

export default function BusinessConsultingPage() {
    const navigate = useNavigate();
    
    const handleWhatsApp = () => {
        window.location.href = "https://wa.me/5493884384713?text=Hola,%20quiero%20llevar%20mi%20negocio%20al%20siguiente%20nivel.%20Me%20interesa%20la%20asesoría.";
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                        <Logo className="h-10 w-auto text-white" />
                        <span className="font-black text-xl tracking-tighter text-white uppercase italic">CW LIFE</span>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        VOLVER
                    </button>
                </div>
            </nav>

            <main className="pt-24 pb-20">
                {/* Hero Section */}
                <section className="relative px-4 max-w-7xl mx-auto min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
                    <div className="w-full md:w-1/2 space-y-8 z-10 relative">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest text-white">
                            <Zap className="w-4 h-4" /> Asesoría Premium B2B
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
                            LLEVAMOS TU <span className="text-white text-glow-white">NEGOCIO</span> A OTRO NIVEL
                        </h1>
                        
                        <p className="text-xl text-gray-300 font-medium leading-relaxed max-w-lg">
                            Especialistas en Gimnasios y Centros de Estética. Actuamos como tus representantes y asesores estratégicos para multiplicar tus ingresos y dominar tu sector.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button 
                                onClick={handleWhatsApp}
                                className="px-8 py-4 bg-white hover:bg-gray-200 text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 flex items-center justify-center gap-3"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Contactar por WhatsApp
                            </button>
                            <button 
                                onClick={() => {
                                    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-black uppercase tracking-widest text-sm rounded-xl transition-all flex items-center justify-center"
                            >
                                Ver Servicios
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 relative flex justify-center z-10">
                        {/* Video Container - Premium styling */}
                        <div className="relative w-full max-w-sm aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none"></div>
                            
                            <video 
                                src={consultingVideo} 
                                className="w-full h-full object-cover"
                                controls
                                playsInline 
                            />
                            
                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                <div className="glass-card-white bg-black/40 backdrop-blur-md border-white/20 p-4 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-white font-black uppercase tracking-tight">Resultados Reales</div>
                                        <div className="text-xs text-gray-300 font-medium">Crecimiento garantizado</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Glow effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-white/10 blur-[100px] rounded-full -z-10"></div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="servicios" className="py-24 px-4 bg-zinc-950 border-t border-white/5 mt-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
                                TU SOCIO <span className="text-white text-glow-white">ESTRATÉGICO</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                No damos consejos genéricos. Nos involucramos como representantes y asesores activos de tu marca.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Target,
                                    title: "Asesoría Comercial",
                                    desc: "Optimizamos tu oferta, estructura de precios y procesos de venta para cerrar más clientes de alto valor."
                                },
                                {
                                    icon: Users,
                                    title: "Representación Oficial",
                                    desc: "Actuamos como embajadores y representantes de tu marca, conectándote con las oportunidades correctas."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Escalamiento de Negocio",
                                    desc: "Sistemas probados de crecimiento para estéticas y gimnasios. De la supervivencia a la dominación local."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="glass-card bg-black/40 border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all hover:-translate-y-2 group">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                                        <feature.icon className="w-7 h-7 text-white group-hover:text-black" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 font-medium leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Final CTA */}
                <section className="py-24 px-4 bg-black relative">
                    <div className="max-w-4xl mx-auto glass-card-white border-white/20 p-10 md:p-16 rounded-[2rem] text-center relative overflow-hidden box-glow-white">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                                ¿LISTO PARA DOMINAR <br /> TU MERCADO?
                            </h2>
                            <p className="text-xl text-gray-300 font-medium mb-10 max-w-xl mx-auto">
                                Hablemos de números, estrategias y cómo multiplicar el valor de tu centro estético o gimnasio hoy mismo.
                            </p>
                            
                            <button 
                                onClick={handleWhatsApp}
                                className="px-10 py-5 bg-white hover:bg-gray-200 text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto"
                            >
                                <MessageCircle className="w-6 h-6" />
                                INICIAR ASESORÍA AHORA
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            
            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-black text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} CW Life. Business Consulting. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
