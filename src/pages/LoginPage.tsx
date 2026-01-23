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
            setError(err.message || "Ocurrió un error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-black to-black -z-10"></div>

            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
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

                    <ul className="space-y-4">
                        {[
                            "Tips avanzados de entrenamiento",
                            "Guías de nutrición y suplementación",
                            "Videos exclusivos de técnica",
                            "Acceso anticipado a novedades"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-yellow-500/20 text-yellow-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <span className="text-gray-200">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4 border-t border-yellow-500/10">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>Contenido 100% gratuito. Sin cobros ocultos.</span>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-stone-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                    <div className="text-center mb-8">
                        {!isRecovering && (
                            <div className="inline-flex bg-black/50 rounded-lg p-1 mb-6 border border-yellow-500/10">
                                <button
                                    onClick={() => { setIsRegistering(false); setError(null); setMessage(null); }}
                                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${!isRegistering ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Ingresar
                                </button>
                                <button
                                    onClick={() => { setIsRegistering(true); setError(null); setMessage(null); }}
                                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${isRegistering ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Registrarse
                                </button>
                            </div>
                        )}

                        <h2 className="text-2xl font-bold mb-2">
                            {isRecovering ? "Recuperar Contraseña" : (isRegistering ? "Únete a la Comunidad" : "Bienvenido de nuevo")}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {isRecovering
                                ? "Ingresa tu email para recibir el enlace de recuperación."
                                : (isRegistering
                                    ? "Crea tu cuenta gratis y empieza a aprender."
                                    : "Ingresa tus datos para acceder al panel.")}
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
                                <label className="text-sm font-medium text-gray-300 ml-1">Nombre</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-yellow-500/50" />
                                    </div>
                                    <input
                                        type="text"
                                        required={isRegistering}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-yellow-500/20 rounded-xl leading-5 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 sm:text-sm transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                            </div>
                        )}

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

                        {!isRecovering && (
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
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] mt-6"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                isRecovering ? "ENVIAR EMAIL DE RECUPERACIÓN" : (isRegistering ? "REGISTRARSE GRATIS" : "INGRESAR")
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
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
