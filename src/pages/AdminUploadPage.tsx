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
                <RouterLink to="/dashboard" className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Dashboard
                </RouterLink>

                <h1 className="text-3xl font-bold mb-8">Subir Contenido (Admin)</h1>

                <form onSubmit={handleSubmit} className="bg-stone-900/50 p-8 rounded-2xl border border-yellow-500/10 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all"
                            placeholder="ej. Guía Avanzada de Hipertrofia"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all h-24"
                            placeholder="Breve descripción del contenido..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tipo</label>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                type="button"
                                onClick={() => setType("video_link")}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${type === "video_link"
                                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                                        : "bg-stone-950 border-stone-800 text-gray-400 hover:border-gray-600"
                                    }`}
                            >
                                <Video className="w-6 h-6 mb-2" />
                                <span className="text-sm">Link de Video</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setType("pdf")}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${type === "pdf"
                                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                                        : "bg-stone-950 border-stone-800 text-gray-400 hover:border-gray-600"
                                    }`}
                            >
                                <Upload className="w-6 h-6 mb-2" />
                                <span className="text-sm">Subir PDF</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setType("link")}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${type === "link"
                                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                                        : "bg-stone-950 border-stone-800 text-gray-400 hover:border-gray-600"
                                    }`}
                            >
                                <Link className="w-6 h-6 mb-2" />
                                <span className="text-sm">Link Externo</span>
                            </button>
                        </div>
                    </div>

                    {type === "pdf" ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Archivo PDF</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required
                                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">URL</label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    )}

                    {message && (
                        <div className={`p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            "Subir Contenido"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
