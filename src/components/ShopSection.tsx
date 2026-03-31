import { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

interface ShopProduct {
  id: string;
  name: string;
  category: string;
  tab: "suplementos" | "indumentaria";
  description: string;
  features: string[];
  image_url: string | null;
  sort_order: number;
}

const buildWhatsAppLink = (productName: string) =>
  `https://wa.me/5493884384713?text=${encodeURIComponent(
    `Hola! Me interesa consultar por: ${productName}. Quiero saber disponibilidad y precio.`
  )}`;

export function ShopSection({ tab }: { tab: "suplementos" | "indumentaria" }) {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await supabase
        .from("shop_products")
        .select("*")
        .eq("tab", tab)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, [tab]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <ShoppingBag className="w-12 h-12 text-gray-700 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Próximamente</p>
        <p className="text-gray-600 text-sm mt-1">Estamos preparando los productos</p>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {products.map((product) => (
          <a
            key={product.id}
            href={buildWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card-red border-red-600/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-600/50 hover:-translate-y-2 hover-glow-red block"
          >
            {/* Product image */}
            {product.image_url ? (
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-white/5 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-gray-700" />
              </div>
            )}

            {/* Card content */}
            <div className="p-5 sm:p-6">
              <span className="inline-block px-3 py-1 rounded-full bg-red-600/15 border border-red-600/30 text-red-500 text-[10px] font-black tracking-widest uppercase mb-3">
                {product.category}
              </span>

              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors">
                {product.name}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              {product.features.length > 0 && (
                <ul className="space-y-1.5 mb-5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="w-full py-3.5 bg-red-600 rounded-xl text-center text-black font-black text-xs tracking-[0.15em] uppercase group-hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20">
                <MessageCircle className="w-4 h-4" />
                Consultar por WhatsApp
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
