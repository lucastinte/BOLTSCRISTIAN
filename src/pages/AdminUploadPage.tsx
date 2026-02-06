import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Upload, Link, Video, Loader2, ArrowLeft } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function AdminUploadPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"pdf" | "video_link" | "link">("video_link");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setMessage(null);

        try {
            let finalUrl = url;

            if (type === "pdf") {
                if (!file) throw new Error("Please select a file");

                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('members_content')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('members_content')
                    .getPublicUrl(filePath);

                finalUrl = publicUrl;
            }

            const { error: dbError } = await supabase
                .from('content')
                .insert({
                    title,
                    description,
                    type,
                    url: finalUrl
                });

            if (dbError) throw dbError;

            setMessage({ text: "¡Contenido subido exitosamente!", type: "success" });
            setTitle("");
            setDescription("");
            setUrl("");
            setFile(null);
        } catch (error: any) {
            console.error("Error uploading:", error);
            setMessage({ text: error.message || "Ocurrió un error", type: "error" });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <RouterLink to="/dashboard" className="inline-flex items-center text-gray-400 hover:text-yellow-500 mb-10 transition-all font-black uppercase tracking-[0.2em] text-[10px] group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver al Cuartel
                </RouterLink>

                <div className="relative mb-12">
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-yellow-500/5 blur-[80px] rounded-full animate-pulse-glow"></div>
                    <h1 className="text-4xl font-black tracking-tight uppercase italic relative z-10">
                        DESPLEGAR <span className="text-yellow-500 text-glow-yellow">CONTENIDO</span>
                    </h1>
                    <p className="text-gray-400 mt-2 font-medium">Administración estratégica de recursos para miembros.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card border-white/5 p-10 rounded-3xl space-y-8 relative overflow-hidden box-glow-yellow">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full"></div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-yellow-500/80 uppercase tracking-[0.2em]">Título del Recurso</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium placeholder:text-gray-600"
                            placeholder="ej. GUÍA DE MOVILIDAD AVANZADA"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-yellow-500/80 uppercase tracking-[0.2em]">Descripción Estratégica</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all h-32 font-medium placeholder:text-gray-600 resize-none"
                            placeholder="Describe el valor de este recurso para el miembro..."
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-black text-yellow-500/80 uppercase tracking-[0.2em]">Tipo de Armamento</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: "video_link", icon: Video, label: "VIDEO" },
                                { id: "pdf", icon: Upload, label: "PDF" },
                                { id: "link", icon: Link, label: "LINK" }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setType(item.id as any)}
                                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${type === item.id
                                        ? "glass-card-yellow border-yellow-500/50 text-yellow-500 shadow-lg shadow-yellow-500/10 scale-[1.02]"
                                        : "bg-black/40 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                                        }`}
                                >
                                    <item.icon className="w-8 h-8 mb-3 transition-transform group-hover:scale-110" />
                                    <span className="text-[10px] font-black tracking-widest uppercase">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-yellow-500/80 uppercase tracking-[0.2em]">
                            {type === "pdf" ? "Archivo Fuente" : "Enlace Destino"}
                        </label>
                        {type === "pdf" ? (
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500/50 focus:outline-none transition-all file:mr-6 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer"
                            />
                        ) : (
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium placeholder:text-gray-600"
                                placeholder="https://..."
                            />
                        )}
                    </div>

                    {message && (
                        <div className={`p-5 rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest border-2 ${message.type === 'success' ? 'bg-green-500/5 border-green-500/20 text-green-500' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}>
                            <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}></div>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_15px_30px_rgba(234,179,8,0.2)] hover:shadow-yellow-500/40 transform hover:-translate-y-1"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                PROCESANDO...
                            </>
                        ) : (
                            "EJECUTAR DESPLIEGUE"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
