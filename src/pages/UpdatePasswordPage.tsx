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
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-black to-black -z-10"></div>

            <button
                onClick={() => navigate("/login")}
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al Login</span>
            </button>

            <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                <h2 className="text-2xl font-bold mb-6 text-center">Nueva Contraseña</h2>

                {message && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Ingresa tu nueva clave</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-yellow-500/50" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                className="block w-full pl-10 pr-3 py-3 border border-yellow-500/20 rounded-xl leading-5 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all"
                                placeholder="******"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-all"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ACTUALIZAR CONTRASEÑA"}
                    </button>
                </form>
            </div>
        </div>
    );
}
