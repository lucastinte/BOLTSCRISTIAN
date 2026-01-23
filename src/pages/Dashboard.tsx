import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlayCircle, FileText, Dumbbell, User } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        // Check for active session on mount
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUserEmail(user.email || null);
            } else {
                // Optional: Redirect to login if not authenticated
                // navigate("/login");
            }
        });
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="border-b border-yellow-500/20 bg-stone-900/30 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-bold text-black">
                                B
                            </div>
                            <span className="font-bold text-xl tracking-wider hidden sm:block">BLACK COMMUNITY</span>
                            <span className="font-bold text-xl tracking-wider sm:hidden">BLACK</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-yellow-500 text-sm font-medium px-3 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    {userEmail ? userEmail.split('@')[0] : "Miembro"}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Bienvenido al área de <span className="text-yellow-500">Miembros</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Este es tu espacio exclusivo. Aquí encontrarás recursos diseñados para potenciar tus resultados, totalmente gratis por ser parte de la comunidad.
                    </p>
                </div>

                {/* Coming Soon Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-stone-900/30 border border-yellow-500/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Masterclass Exclusivas</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Videos profundizando en técnica, mindset y estrategias de entrenamiento.
                        </p>
                        <div className="inline-block px-3 py-1 rounded bg-stone-800 text-xs text-gray-400 font-medium border border-stone-700">
                            Próximamente
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-stone-900/30 border border-yellow-500/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Guías y E-books</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Material descargable sobre nutrición, suplementación y hábitos.
                        </p>
                        <div className="inline-block px-3 py-1 rounded bg-stone-800 text-xs text-gray-400 font-medium border border-stone-700">
                            Próximamente
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-stone-900/30 border border-yellow-500/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                            <Dumbbell className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Rutinas Express</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Entrenamientos rápidos y efectivos para días sin tiempo.
                        </p>
                        <div className="inline-block px-3 py-1 rounded bg-stone-800 text-xs text-gray-400 font-medium border border-stone-700">
                            Próximamente
                        </div>
                    </div>
                </div>

                {/* Banner */}
                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-stone-900 to-stone-900 border border-yellow-500/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Estamos preparando todo</h3>
                        <p className="text-gray-300 max-w-xl">
                            Gracias por registrarte. Muy pronto comenzaremos a subir contenido de alto valor a esta plataforma. Mantente atento a tu correo.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
