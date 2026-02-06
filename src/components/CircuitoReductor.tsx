import { Zap, Activity, Waves, Thermometer } from "lucide-react";
import btLogo from "../assets/bt-logo.png";

interface CircuitoReductorProps {
    showLogo?: boolean;
}

const features = [
    {
        title: "Ultracavitación",
        description: "Rompemos la grasa localizada mediante tecnología de ondas de choque.",
        icon: <Waves className="w-8 h-8 text-yellow-500" />,
        detail: "Destruye el tejido adiposo."
    },
    {
        title: "Radiofrecuencia",
        description: "Tensamos la piel estimulando el colágeno natural. Chau flacidez.",
        icon: <Activity className="w-8 h-8 text-yellow-500" />,
        detail: "Efecto lifting inmediato."
    },
    {
        title: "Drenaje con Faja de Calor",
        description: "Eliminamos toxinas y líquido retenido mediante calor profundo.",
        icon: <Thermometer className="w-8 h-8 text-yellow-500" />,
        detail: "Desintoxicación profunda."
    },
    {
        title: "Electrodos",
        description: "Tonificación muscular profunda mientras tu cuerpo se recupera.",
        icon: <Zap className="w-8 h-8 text-yellow-500" />,
        detail: "Recuperación activa."
    }
];

export function CircuitoReductor({ showLogo = false }: CircuitoReductorProps) {
    return (
        <section className="py-20 px-4 bg-black relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full animate-pulse-glow"></div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter relative z-10 italic">
                        BLACK <span className="text-yellow-500 text-glow-yellow">TRAINING</span>
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-yellow-500/20 mb-8 relative z-10">
                        <span className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.3em]">El Ataque Final</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">
                        EL CIRCUITO <span className="text-yellow-500">REDUCTOR</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed relative z-10 font-medium">
                        No es un masaje relajante. Es tecnología aplicada para destruir el tejido adiposo
                        donde el ejercicio solo no llega. La unión de <span className="text-yellow-500 font-black">ENTRENAMIENTO DE ÉLITE</span> +
                        <span className="text-white font-black"> CIRCUITO DE VANGUARDIA</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="mb-6 p-3 bg-black/50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 tracking-tight">
                                {feature.title}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                {feature.description}
                            </p>
                            <div className="pt-4 border-t border-white/5">
                                <span className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest">
                                    {feature.detail}
                                </span>
                            </div>

                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    {showLogo && (
                        <div className="flex justify-center mb-16 animate-fade-in">
                            <div className="relative group">
                                <div className="absolute -inset-12 bg-yellow-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <img
                                    src={btLogo}
                                    alt="Black Training Logo"
                                    className="w-48 md:w-64 h-auto relative z-10 drop-shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105 transition-all duration-500 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_40px_rgba(234,179,8,0.6)]"
                                />
                            </div>
                        </div>
                    )}
                    <button className="px-12 py-5 bg-yellow-500 rounded-full text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-400 transition-all duration-300 shadow-[0_15px_35px_rgba(234,179,8,0.3)] transform hover:scale-105 active:scale-95">
                        UNIFICAR LA GUERRA
                    </button>
                </div>
            </div>
        </section>
    );
}
