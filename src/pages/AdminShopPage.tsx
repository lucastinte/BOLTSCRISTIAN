import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ImagePlus,
  Save,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import cwLifeLogo from "../assets/logo.svg";

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

const emptyProduct: Omit<ShopProduct, "id"> = {
  name: "",
  category: "",
  tab: "suplementos",
  description: "",
  features: [],
  image_url: null,
  sort_order: 0,
};

export default function AdminShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [featuresInput, setFeaturesInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter
  const [filterTab, setFilterTab] = useState<"todos" | "suplementos" | "indumentaria">("todos");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("shop_products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      showMessage("Error al cargar productos: " + error.message, "error");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  function showMessage(text: string, type: "success" | "error") {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  }

  function openCreateForm() {
    setForm(emptyProduct);
    setFeaturesInput("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(product: ShopProduct) {
    setForm({
      name: product.name,
      category: product.category,
      tab: product.tab,
      description: product.description,
      features: product.features,
      image_url: product.image_url,
      sort_order: product.sort_order,
    });
    setFeaturesInput(product.features.join(", "));
    setImageFile(null);
    setImagePreview(product.image_url);
    setEditingId(product.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyProduct);
    setFeaturesInput("");
    setImageFile(null);
    setImagePreview(null);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("shop_images")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("shop_images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) {
      showMessage("Nombre y categoría son obligatorios", "error");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const features = featuresInput
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const productData = {
        name: form.name.trim(),
        category: form.category.trim(),
        tab: form.tab,
        description: form.description.trim(),
        features,
        image_url: imageUrl,
        sort_order: form.sort_order,
      };

      if (editingId) {
        const { error } = await supabase
          .from("shop_products")
          .update(productData)
          .eq("id", editingId);
        if (error) throw error;
        showMessage("Producto actualizado", "success");
      } else {
        const { error } = await supabase
          .from("shop_products")
          .insert(productData);
        if (error) throw error;
        showMessage("Producto creado", "success");
      }

      closeForm();
      fetchProducts();
    } catch (err: any) {
      showMessage("Error: " + (err.message || "Algo salió mal"), "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from("shop_products")
        .delete()
        .eq("id", id);
      if (error) throw error;
      showMessage("Producto eliminado", "success");
      setDeletingId(null);
      fetchProducts();
    } catch (err: any) {
      showMessage("Error al eliminar: " + (err.message || ""), "error");
    }
  }

  const filteredProducts =
    filterTab === "todos"
      ? products
      : products.filter((p) => p.tab === filterTab);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card border-red-600/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <img src={cwLifeLogo} alt="CW Life" className="h-8 sm:h-10 w-auto" />
              <div className="hidden sm:block h-6 w-px bg-red-600/30" />
              <span className="hidden sm:block text-red-600 font-black text-sm tracking-[0.2em] uppercase">
                Admin Tienda
              </span>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-red-600 hover:text-red-500 transition-colors text-sm font-black tracking-widest uppercase"
            >
              Volver
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-bold ${
              message.type === "success"
                ? "bg-green-600/20 border border-green-600/40 text-green-400"
                : "bg-red-600/20 border border-red-600/40 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Header */}
        <div className="text-center sm:text-left mb-6">
          <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight">
            PRODUCTOS DE <span className="text-red-600">TIENDA</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {products.length} producto{products.length !== 1 && "s"} en total
          </p>
        </div>

        {/* Nuevo producto */}
        <button
          onClick={openCreateForm}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-black font-black rounded-xl transition-all transform hover:scale-105 text-sm uppercase tracking-widest mb-6"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>

        {/* Filter tabs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8">
          {(["todos", "suplementos", "indumentaria"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterTab(t)}
              className={`flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                filterTab === t
                  ? "bg-red-600 text-black"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-red-600 hover:border-red-600/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Product list */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay productos todavía</p>
            <button
              onClick={openCreateForm}
              className="mt-4 text-red-600 hover:text-red-500 font-bold text-sm"
            >
              Crear el primero
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card border-white/5 rounded-2xl p-5 sm:p-6 hover:border-red-600/20 transition-all"
              >
                <div className="flex gap-4 items-start">
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <ImagePlus className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-white text-sm sm:text-base truncate">{product.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-red-600/15 border border-red-600/30 text-red-500 text-[9px] font-black tracking-widest uppercase">
                        {product.tab}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[9px] font-bold tracking-wider uppercase">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm truncate mt-2">{product.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => openEditForm(product)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-red-600 hover:border-red-600/30 transition-all text-xs font-black uppercase tracking-wider"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  {deletingId === product.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 py-2.5 rounded-xl bg-red-600 text-black text-xs font-black uppercase tracking-wider text-center"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all text-xs font-black uppercase tracking-wider text-center"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingId(product.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-red-600 hover:border-red-600/30 transition-all text-xs font-black uppercase tracking-wider"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-red-600/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black italic tracking-tight">
                {editingId ? "EDITAR" : "NUEVO"}{" "}
                <span className="text-red-600">PRODUCTO</span>
              </h2>
              <button
                onClick={closeForm}
                className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image upload */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Imagen del producto
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <ImagePlus className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl glass-card border-white/10 text-sm text-gray-300 hover:text-red-600 hover:border-red-600/30 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    Subir imagen
                  </label>
                </div>
              </div>

              {/* Tab + Category row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                    Sección
                  </label>
                  <select
                    value={form.tab}
                    onChange={(e) =>
                      setForm({ ...form, tab: e.target.value as "suplementos" | "indumentaria" })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600/50 focus:outline-none transition-colors"
                  >
                    <option value="suplementos">Suplementos</option>
                    <option value="indumentaria">Indumentaria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Ej: Recuperación, Entrenamiento"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-red-600/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Proteína Whey"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-red-600/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Descripción
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Breve descripción del producto..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-red-600/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Características <span className="text-gray-600 normal-case">(separadas por coma)</span>
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Ej: Alto valor biológico, Rápida absorción, Bajo en grasas"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-red-600/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Sort order */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Orden <span className="text-gray-600 normal-case">(menor = primero)</span>
                </label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 text-black font-black rounded-xl transition-all uppercase text-sm tracking-widest"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingId ? "Guardar Cambios" : "Crear Producto"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
