import { useNavigate } from "react-router-dom";
import { ChevronLeft, MessageCircle, Globe } from "lucide-react";
import { Logo } from "../components/Logo";

export default function TermsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Header / Nav */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
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

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">
                            Normas de <span className="text-white text-glow-white">Inscripción</span> y Permanencia
                        </h1>
                        <div className="w-20 h-1 bg-white rounded-full"></div>
                    </header>

                    <div className="space-y-12">
                        <section className="glass-card-white border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 flex items-center gap-3">
                                <span className="text-4xl opacity-20">01</span>
                                Política de No Reembolso
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg font-medium">
                                Al adquirir cualquier plan o servicio, el usuario acepta que no se realizarán reembolsos de dinero bajo ninguna circunstancia, ya sea por desestimiento personal, falta de asistencia, cambios de horarios o motivos de salud. El pago garantiza el acceso al cupo y la infraestructura, no la presencia efectiva del usuario.
                            </p>
                        </section>

                        <section className="glass-card-white border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 flex items-center gap-3">
                                <span className="text-4xl opacity-20">02</span>
                                Cuotas No Congelables
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg font-medium">
                                Las cuotas y membresías tienen una vigencia estricta según el periodo contratado. Bajo ningún término ni excepción se congelarán, suspenderán o postergarán los días de entrenamiento. El tiempo corre desde la fecha de activación sin posibilidad de interrupción.
                            </p>
                        </section>

                        <section className="glass-card-white border-white/10 p-8 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 flex items-center gap-3">
                                <span className="text-4xl opacity-20">03</span>
                                Intransferibilidad
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg font-medium">
                                El acceso a las sedes y los planes online son personales e intransferibles. No se permite el traspaso de saldos o días de entrenamiento a terceros bajo ningún concepto.
                            </p>
                        </section>

                        <section className="glass-card-white border-white/10 p-8 rounded-3xl relative overflow-hidden group border-white/30 bg-white/5">
                            <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 flex items-center gap-3">
                                <span className="text-4xl opacity-20">04</span>
                                Aceptación de Condiciones
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg font-medium">
                                El pago del servicio implica la aceptación total y absoluta de estas normas. No se admitirán reclamos posteriores que intenten vulnerar la política de "Cero Reembolsos" y "Cero Congelamientos" establecida por la administración.
                            </p>
                        </section>
                    </div>

                    <div className="mt-20 p-12 glass-card border-white/20 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full translate-y-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black italic uppercase mb-8">
                                Entrená con los mejores. <br />
                                <span className="text-white text-glow-white">No hay excusas.</span>
                            </h3>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/10 pt-8 mt-8">
                                <div className="flex items-center gap-3 text-gray-400 group cursor-default">
                                    <MessageCircle className="w-5 h-5 group-hover:text-white transition-colors" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">WhatsApp</p>
                                        <p className="font-bold text-white tracking-tight">+54 9 388 4384713</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                                <div className="flex items-center gap-3 text-gray-400 group cursor-default">
                                    <Globe className="w-5 h-5 group-hover:text-white transition-colors" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Web Oficial</p>
                                        <p className="font-bold text-white tracking-tight">www.cristianwosniakcoach.online</p>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="mt-12 font-black text-2xl tracking-tighter italic opacity-50 uppercase">
                                CW LIFE RECONSTRUIRTE
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-white/5 bg-black text-center text-gray-500 text-xs">
                <p>&copy; 2024 CW Life. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
