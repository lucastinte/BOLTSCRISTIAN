import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Loader2, ArrowLeft, Lock } from "lucide-react";

export default function AdminSignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign up the user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error("No user created");

            // 2. Call the RPC function to claim admin role
            const { error: rpcError } = await supabase.rpc('claim_admin_role', {
                secret_code: secretCode
            });

            if (rpcError) {
                // If RPC fails (wrong code), maybe we should warn logic?
                // But user is already signed up as member. 
                throw new Error(rpcError.message || "Failed to claim admin role. Wrong secret code?");
            }

            // Success!
            navigate("/admin");
        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.message || "An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-3 text-gray-400 hover:text-yellow-500 transition-all font-black uppercase tracking-widest text-[10px] group z-20">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al inicio</span>
            </Link>

            <div className="w-full max-w-md">
                <div className="text-center mb-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/10 blur-[80px] rounded-full animate-pulse-glow"></div>
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mx-auto mb-6 border border-yellow-500/20 shadow-lg shadow-yellow-500/5 relative z-10">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black mb-3 uppercase tracking-tighter italic">ACCESO <span className="text-yellow-500">ADMIN</span></h1>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em]">Crea tu cuenta de mando estratégico.</p>
                </div>

                <form onSubmit={handleSignup} className="glass-card border-white/5 p-10 rounded-3xl space-y-8 relative overflow-hidden box-glow-yellow shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full"></div>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 text-[11px] font-bold uppercase tracking-widest text-center animate-fade-in">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest ml-1">Email Administrativo</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium placeholder:text-gray-700"
                            placeholder="admin@bolt.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest ml-1">Código de Acceso</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium placeholder:text-gray-700"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-yellow-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5" /> LLAVE SECRETA
                        </label>
                        <input
                            type="text"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-yellow-500/30 rounded-2xl p-4 text-white focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium placeholder:text-yellow-900/40"
                            placeholder="Introduce el código de mando"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_15px_30px_rgba(234,179,8,0.2)] hover:shadow-yellow-500/40 transform hover:-translate-y-1 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "DESPLEGAR CUENTA ADMIN"}
                    </button>

                    <div className="mt-8 text-center">
                        <Link to="/login" className="text-[10px] font-black text-gray-500 hover:text-yellow-500 transition-all uppercase tracking-widest">
                            ¿YA TIENES ACCESO? <span className="text-yellow-500/50">INICIAR SESIÓN</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
