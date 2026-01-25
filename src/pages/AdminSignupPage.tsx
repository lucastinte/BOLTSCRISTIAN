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
            <Link to="/" className="absolute top-8 left-8 flex items-center text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
            </Link>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mx-auto mb-4 border border-yellow-500/20">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Acceso Administrativo</h1>
                    <p className="text-gray-400">Crea tu cuenta de administrador</p>
                </div>

                <form onSubmit={handleSignup} className="bg-stone-900/50 p-8 rounded-2xl border border-yellow-500/10 space-y-4 backdrop-blur-sm">
                    {error && (
                        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all"
                            placeholder="admin@ejemplo.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-yellow-500 mb-1 flex items-center gap-2">
                            <Lock className="w-3 h-3" /> Código Secreto
                        </label>
                        <input
                            type="text"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            required
                            className="w-full bg-stone-950 border border-yellow-500/30 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all"
                            placeholder="Introduce el código secreto"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center mt-6 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Crear Cuenta Admin"}
                    </button>

                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-sm text-gray-500 hover:text-white transition-colors">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
