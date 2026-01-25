import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlayCircle, FileText, Link as LinkIcon, User, Layers } from "lucide-react";
import { supabase } from "../lib/supabase";

interface ContentItem {
    id: string;
    title: string;
    description: string;
    type: "pdf" | "video_link" | "link";
    url: string;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check for active session on mount
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUserEmail(user.email || null);
                checkAdmin(user.id);
            } else {
                // Optional: Redirect to login if not authenticated
                // navigate("/login");
            }
        });

        fetchContent();
    }, [navigate]);

    const checkAdmin = async (userId: string) => {
        const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userId)
            .single();

        if (data?.role === "admin") {
            setIsAdmin(true);
        }
    };

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setContent(data || []);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const openContent = (item: ContentItem) => {
        window.open(item.url, '_blank');
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'video_link': return <PlayCircle className="w-6 h-6" />;
            case 'pdf': return <FileText className="w-6 h-6" />;
            default: return <LinkIcon className="w-6 h-6" />;
        }
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
                            {isAdmin && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium"
                                >
                                    <Layers className="w-4 h-4" />
                                    <span className="hidden sm:inline">Panel Admin</span>
                                </button>
                            )}
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
                        Este es tu espacio exclusivo. Aquí encontrarás recursos diseñados para potenciar tus resultados.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">Cargando contenido...</p>
                    </div>
                ) : content.length === 0 ? (
                    <div className="text-center py-12 bg-stone-900/30 rounded-2xl border border-yellow-500/10">
                        <p className="text-gray-400">Aún no hay contenido disponible. ¡Vuelve pronto!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openContent(item)}
                                className="bg-stone-900/30 border border-yellow-500/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group cursor-pointer hover:bg-stone-900/50"
                            >
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                                    {getIcon(item.type)}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{item.title}</h3>
                                {item.description && (
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {item.description}
                                    </p>
                                )}
                                <div className="flex items-center text-yellow-500 text-sm font-medium mt-auto">
                                    {item.type === 'pdf' ? 'Ver Documento' : 'Ver Video/Link'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

