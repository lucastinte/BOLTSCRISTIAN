import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({ password: password });
            if (error) throw error;

            setMessage("Contraseña actualizada correctamente.");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Error al actualizar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-black to-black -z-10"></div>

            <button
                onClick={() => navigate("/login")}
                className="absolute top-8 left-8 flex items-center gap-3 text-gray-400 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group z-20"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al Login</span>
            </button>

            <div className="w-full max-w-md glass-card border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden box-glow-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>

                <div className="text-center mb-10 relative z-10">
                    <h2 className="text-3xl font-black mb-3 uppercase tracking-tighter italic">NUEVA <span className="text-white">CLAVE</span></h2>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                        Define tu nuevo código de acceso estratégico.
                    </p>
                </div>

                {message && (
                    <div className="mb-6 p-4 bg-white/10 border border-white/20 rounded-2xl text-white text-[11px] font-bold uppercase tracking-widest text-center animate-fade-in">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-2xl text-gray-400 text-[11px] font-bold uppercase tracking-widest text-center animate-fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-8 relative z-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all group-focus-within:text-white">
                                <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-glow-white" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                className="block w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-black/40 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/50 font-medium transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-lg shadow-white/10 text-xs font-black text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 uppercase tracking-[0.2em]"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "RECONSTRUIR ACCESO"}
                    </button>
                </form>
            </div>
        </div>
    );
}
