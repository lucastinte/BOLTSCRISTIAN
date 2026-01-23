import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, User } from "lucide-react";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
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
                            <span className="font-bold text-xl tracking-wider">PANEL</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-6">
                    {/* Welcome Card */}
                    <div className="bg-stone-900/50 border border-yellow-500/10 rounded-2xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Bienvenido a tu Cuenta</h1>
                                <p className="text-gray-400">Panel de control de usuario</p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder Content */}
                    <div className="bg-stone-900/50 border border-yellow-500/10 rounded-2xl p-12 text-center border-dashed border-2 border-stone-800">
                        <div className="mx-auto w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-4 text-stone-600">
                            <LayoutDashboard className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Próximamente</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Aquí se irán subiendo cosas en esta pestaña. Tu plan personalizado, progresos y recursos exclusivos estarán disponibles pronto.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
