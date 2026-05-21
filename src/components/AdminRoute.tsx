import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (error || !data || data.role !== "admin") {
                console.error("Error checking admin role:", error);
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
            setLoading(false);
        };

        checkAdmin();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white">Verificando permisos...</div>;
    }

    if (!isAdmin) {
        // Redirect to dashboard if not admin
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
