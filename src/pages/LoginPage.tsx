import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowLeft, Loader2, CheckCircle, User, Zap, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(true);
    const [isRecovering, setIsRecovering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isRecovering) {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/update-password`,
                });
                if (error) throw error;
                setMessage("Te enviamos un email para recuperar tu contraseña.");
            } else if (isRegistering) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        },
                    },
                });

                if (signUpError) throw signUpError;

                const { data: sessionData } = await supabase.auth.getSession();
                if (sessionData.session) {
                    navigate("/dashboard");
                } else {
                    setMessage("Revisa tu email para confirmar tu cuenta.");
                }

            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;
                navigate("/dashboard");
            }
        } catch (err: any) {
            console.error("Auth error:", err);
            let errorMessage = "Ocurrió un error al intentar ingresar.";

            // Error mapping
            if (err.message.includes("rate limit")) {
                errorMessage = "Demasiados intentos. Por favor espera unos minutos.";
            } else if (err.message.includes("Invalid login credentials")) {
                errorMessage = "Email o contraseña incorrectos.";
            } else if (err.message.includes("User already registered")) {
                errorMessage = "Este email ya está registrado. Intenta iniciar sesión.";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            console.error("Google Auth error:", err);
            setError("Error al iniciar sesión con Google.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-black to-black -z-10"></div>

            <button
                onClick={() => navigate("/")}
                className="absolute top-8 left-8 flex items-center gap-3 text-gray-400 hover:text-yellow-500 transition-all font-black uppercase tracking-widest text-[10px] group z-20"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver al inicio</span>
            </button>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">

                <div className="hidden md:block space-y-6">
                    <div>
                        <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase">Comunidad Exclusiva</span>
                        <h1 className="text-4xl font-extrabold mt-2 leading-tight">
                            Accede a Contenido de <span className="text-yellow-500">Alto Valor</span>
                        </h1>
                    </div>

                    <p className="text-gray-300 text-lg">
                        Regístrate totalmente gratis para desbloquear recursos que elevarán tu entrenamiento al siguiente nivel.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Tips avanzados de entrenamiento",
                            "Guías de nutrición personalizada",
                            "Videos exclusivos de técnica",
                            "Acceso anticipado a eventos"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 group">
                                <div className="p-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors tracking-tight">{item}</span>
                            </li>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                            <span>100% GRATUITO · MIEMBROS ÉLITE</span>
                        </div>
                    </div>
                </div>

                <div className="w-full glass-card border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden box-glow-yellow">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full"></div>
                    <div className="text-center mb-10 relative z-10">
                        {!isRecovering && (
                            <div className="inline-flex bg-black/40 rounded-xl p-1.5 mb-8 border border-white/5">
                                <button
                                    onClick={() => { setIsRegistering(false); setError(null); setMessage(null); }}
                                    className={`px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${!isRegistering ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-[1.05]' : 'text-gray-500 hover:text-white'}`}
                                >
                                    INGRESAR
                                </button>
                                <button
                                    onClick={() => { setIsRegistering(true); setError(null); setMessage(null); }}
                                    className={`px-8 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isRegistering ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-[1.05]' : 'text-gray-500 hover:text-white'}`}
                                >
                                    REGISTRO
                                </button>
                            </div>
                        )}

                        <h2 className="text-3xl font-black mb-3 uppercase tracking-tighter italic">
                            {isRecovering ? "RECUPERACIÓN" : (isRegistering ? "ÚNETE AL FRENTE" : "BIENVENIDO")}
                        </h2>
                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                            {isRecovering
                                ? "Enlace de seguridad para reconstruir tu acceso."
                                : (isRegistering
                                    ? "CREA TU CUENTA Y EMPIEZA A APRENDER."
                                    : "INGRESA TUS CREDENCIALES DE ACCESO.")}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {message && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegistering && !isRecovering && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest ml-1">Nombre Completo</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-yellow-500">
                                        <User className="h-5 w-5 text-gray-600 group-focus-within:text-glow-yellow" />
                                    </div>
                                    <input
                                        type="text"
                                        required={isRegistering}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 border border-white/5 rounded-2xl bg-black/40 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500/30 focus:border-yellow-500/50 font-medium transition-all"
                                        placeholder="Tu nombre de guerra"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest ml-1">Email Estratégico</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-yellow-500">
                                    <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-glow-yellow" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-white/5 rounded-2xl bg-black/40 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500/30 focus:border-yellow-500/50 font-medium transition-all"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        {!isRecovering && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest ml-1">Código de Acceso</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-yellow-500">
                                        <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-glow-yellow" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 border border-white/5 rounded-2xl bg-black/40 text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500/30 focus:border-yellow-500/50 font-medium transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-lg shadow-yellow-500/20 text-xs font-black text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 uppercase tracking-[0.2em] mt-8"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                isRecovering ? "RECUPERAR ACCESO" : (isRegistering ? "REGISTRARSE GRATIS" : "INGRESAR AL CUARTEL")
                            )}
                        </button>
                    </form>

                    {!isRecovering && (
                        <>
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-[10px] font-black uppercase">
                                    <span className="bg-black px-4 text-gray-500 tracking-[0.3em]">O</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-white/10 rounded-2xl text-xs font-black text-white bg-white/5 hover:bg-white/10 focus:outline-none transition-all transform hover:-translate-y-1 uppercase tracking-[0.2em]"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                    />
                                </svg>
                                <span>Continuar con Google</span>
                            </button>
                        </>
                    )}

                    <div className="mt-8 text-center text-sm">
                        {!isRecovering ? (
                            <button
                                onClick={() => { setIsRecovering(true); setError(null); setMessage(null); }}
                                className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        ) : (
                            <button
                                onClick={() => { setIsRecovering(false); setError(null); setMessage(null); }}
                                className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
                            >
                                Volver al inicio de sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
