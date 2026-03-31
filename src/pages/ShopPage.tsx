import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pill, Shirt } from "lucide-react";
import cwLifeLogo from "../assets/logo.svg";
import { ShopSection } from "../components/ShopSection";

const tabs = [
  { id: "suplementos", label: "Suplementos", icon: Pill },
  { id: "indumentaria", label: "Indumentaria", icon: Shirt },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ShopPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("suplementos");

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
                Tienda
              </span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors"
            >
              <span className="hidden sm:inline text-sm font-black tracking-widest uppercase">Volver</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative py-10 sm:py-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/8 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="max-w-7xl mx-auto relative text-center">
          <p className="text-red-600 font-black text-[11px] sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">
            CW Life Store
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter">
            TIENDA{" "}
            <span className="text-red-600 text-glow-red">OFICIAL</span>
          </h1>
          <p className="text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg">
            Suplementos e indumentaria para los que entrenan en serio.
            Tocá un producto para consultar por WhatsApp.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-red-600 text-black shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-red-600 hover:border-red-600/30"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <ShopSection tab={activeTab} />

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="glass-card-red rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black italic tracking-tight mb-4">
            ¿NO ENCONTRÁS LO QUE BUSCÁS?
          </h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Consultanos por cualquier producto. Te asesoramos sin compromiso.
          </p>
          <a
            href="https://wa.me/5493884384713?text=Hola!%20Quiero%20consultar%20por%20productos%20de%20la%20tienda%20CW%20Life."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-black font-black rounded-lg transition-all transform hover:scale-105 uppercase text-sm tracking-widest"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
