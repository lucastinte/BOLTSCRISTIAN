import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulación de login
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-black to-black -z-10"></div>

            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
            </button>

            <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Bienvenido</h2>
                    <p className="text-gray-400">Ingresa a tu cuenta para continuar</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-yellow-500/50" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-yellow-500/20 rounded-xl leading-5 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-yellow-500/50" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-yellow-500/20 rounded-xl leading-5 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "INGRESAR"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    ¿No tienes cuenta?{" "}
                    <a href="https://wa.me/5493884384713" target="_blank" rel="noreferrer" className="font-medium text-yellow-500 hover:text-yellow-400">
                        Contactar soporte
                    </a>
                </div>
            </div>
        </div>
    );
}
