import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlayCircle, FileText, Link as LinkIcon, User, Layers, ArrowLeft } from "lucide-react";
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
            <nav className="glass-card border-yellow-500/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-black shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                                B
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-lg tracking-tighter hidden sm:block uppercase">BLACK COMMUNITY</span>
                                <span className="font-black text-lg tracking-tighter sm:hidden uppercase">BLACK</span>
                                <span className="text-[9px] text-yellow-500 font-bold tracking-[0.2em] uppercase">Members Only</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-all text-xs font-black uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-yellow-500/5"
                                >
                                    <Layers className="w-4 h-4" />
                                    <span className="hidden sm:inline">Admin</span>
                                </button>
                            )}
                            <div className="flex items-center gap-2 text-yellow-500 text-[10px] font-black tracking-widest px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 uppercase">
                                <User className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">
                                    {userEmail ? userEmail.split('@')[0] : "Miembro"}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest ml-2"
                            >
                                <LogOut className="w-4 h-4 text-red-500/70" />
                                <span className="hidden sm:inline">Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header Section */}
                <div className="mb-16 relative">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full animate-pulse-glow"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none uppercase italic">
                            BIENVENIDO AL <span className="text-yellow-500 text-glow-yellow">CUARTEL</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
                            Este es tu espacio exclusivo. Aquí encontrarás el armamento estratégico diseñado para potenciar tu reconstrucción física.
                        </p>
                    </div>
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openContent(item)}
                                className="glass-card border-white/5 rounded-3xl p-8 hover:border-yellow-500/40 transition-all group cursor-pointer hover:-translate-y-2 hover-glow-yellow box-glow-yellow"
                            >
                                <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all shadow-lg group-hover:shadow-yellow-500/20">
                                    {getIcon(item.type)}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 line-clamp-1 group-hover:text-yellow-500 transition-colors uppercase tracking-tight">{item.title}</h3>
                                {item.description && (
                                    <p className="text-gray-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-yellow-500/80 group-hover:text-yellow-500 transition-colors border-t border-white/5 pt-6">
                                    <span>{item.type === 'pdf' ? 'DOCUMENTO PDF' : 'RECURSO DIGITAL'}</span>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-yellow-500/50 transition-colors">
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

