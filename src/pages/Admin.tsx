import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  LogOut, 
  Image, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Save,
  Eye,
  X,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MRTZLogo from "@/components/MRTZLogo";

// Types
interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  year: string;
  category: string;
  description: string;
  isVideo?: boolean;
  videoSrc?: string;
}

interface Drop {
  id: string;
  image: string;
  title: string;
  edition: number;
  price: number;
  status: "upcoming" | "available" | "sold_out";
  dropDate: string;
  description: string;
  remaining?: number;
}

const ADMIN_PASSWORD = "mrtz2024"; // In production, use proper auth

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"portfolio" | "drops">("portfolio");
  
  // Portfolio state
  const [portfolioItems, setPortfolioItems] = useLocalStorage<PortfolioItem[]>("mrtz-portfolio", [
    { id: "1", image: "/src/assets/sculpture-1.jpg", title: "Emergence I", year: "2024", category: "Biomechanical", description: "A meditation on organic and mechanical fusion." },
    { id: "2", image: "/src/assets/sculpture-2.jpg", title: "Vessel of Shadows", year: "2024", category: "Organic Forms", description: "Inspired by deep-sea creatures." },
    { id: "3", image: "/src/assets/sculpture-3.jpg", title: "Silent Sentinel", year: "2023", category: "Figurative", description: "A guardian figure emerging from darkness." },
    { id: "4", image: "/src/assets/sculpture-4.jpg", title: "Nocturne", year: "2024", category: "Abstract", description: "Pure form dancing with shadow." },
  ]);
  
  // Drops state
  const [drops, setDrops] = useLocalStorage<Drop[]>("mrtz-drops", [
    { id: "1", image: "/src/assets/sculpture-3.jpg", title: "The Awakening", edition: 25, price: 2500, status: "upcoming", dropDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), description: "Limited edition series." },
    { id: "2", image: "/src/assets/sculpture-1.jpg", title: "Biomech Series I", edition: 50, price: 1800, status: "available", remaining: 23, dropDate: "", description: "The first in a series of biomechanical explorations." },
  ]);

  const [editingItem, setEditingItem] = useState<PortfolioItem | Drop | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: "Welcome back", description: "You're now logged in." });
    } else {
      toast({ title: "Invalid password", variant: "destructive" });
    }
    setPassword("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({ title: "Logged out" });
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    toast({ title: "Item deleted" });
  };

  const deleteDrop = (id: string) => {
    setDrops(drops.filter(drop => drop.id !== id));
    toast({ title: "Drop deleted" });
  };

  const savePortfolioItem = (item: PortfolioItem) => {
    if (portfolioItems.find(p => p.id === item.id)) {
      setPortfolioItems(portfolioItems.map(p => p.id === item.id ? item : p));
    } else {
      setPortfolioItems([...portfolioItems, { ...item, id: Date.now().toString() }]);
    }
    setEditingItem(null);
    setIsCreating(false);
    toast({ title: "Saved" });
  };

  const saveDrop = (drop: Drop) => {
    if (drops.find(d => d.id === drop.id)) {
      setDrops(drops.map(d => d.id === drop.id ? drop : d));
    } else {
      setDrops([...drops, { ...drop, id: Date.now().toString() }]);
    }
    setEditingItem(null);
    setIsCreating(false);
    toast({ title: "Saved" });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <MRTZLogo size="md" animated={false} />
            <p className="text-muted-foreground text-sm mt-4">Admin Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MRTZLogo size="sm" animated={false} />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
              <Eye className="w-5 h-5" />
            </a>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="container mx-auto flex gap-8 px-4">
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`py-4 text-sm tracking-[0.1em] uppercase transition-colors relative ${
              activeTab === "portfolio" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Portfolio
            </span>
            {activeTab === "portfolio" && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("drops")}
            className={`py-4 text-sm tracking-[0.1em] uppercase transition-colors relative ${
              activeTab === "drops" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Drops
            </span>
            {activeTab === "drops" && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl">
            {activeTab === "portfolio" ? "Portfolio Items" : "Timed Drops"}
          </h1>
          <Button onClick={() => { setIsCreating(true); setEditingItem(null); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "portfolio" ? (
            portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-[4/3] bg-muted relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  {item.isVideo && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Video
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.year} • {item.category}</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => setEditingItem(item)}>
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deletePortfolioItem(item.id)}>
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            drops.map((drop) => (
              <motion.div
                key={drop.id}
                layout
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-[4/3] bg-muted relative">
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
                    drop.status === "available" ? "bg-green-600 text-white" :
                    drop.status === "upcoming" ? "bg-primary text-primary-foreground" :
                    "bg-muted-foreground text-background"
                  }`}>
                    {drop.status === "available" ? `${drop.remaining} left` : 
                     drop.status === "upcoming" ? "Coming Soon" : "Sold Out"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg">{drop.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Edition of {drop.edition} • ${drop.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => setEditingItem(drop)}>
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteDrop(drop.id)}>
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {(editingItem || isCreating) && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl">
                  {isCreating ? "Add New" : "Edit"} {activeTab === "portfolio" ? "Portfolio Item" : "Drop"}
                </h2>
                <button onClick={() => { setEditingItem(null); setIsCreating(false); }}>
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              {activeTab === "portfolio" ? (
                <PortfolioForm
                  item={editingItem as PortfolioItem}
                  onSave={savePortfolioItem}
                  onCancel={() => { setEditingItem(null); setIsCreating(false); }}
                />
              ) : (
                <DropForm
                  drop={editingItem as Drop}
                  onSave={saveDrop}
                  onCancel={() => { setEditingItem(null); setIsCreating(false); }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Portfolio Form Component
const PortfolioForm = ({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item: PortfolioItem | null; 
  onSave: (item: PortfolioItem) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<PortfolioItem>(item || {
    id: "",
    image: "",
    title: "",
    year: new Date().getFullYear().toString(),
    category: "Abstract",
    description: "",
    isVideo: false,
    videoSrc: "",
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Image URL</label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/src/assets/sculpture-1.jpg"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Year</label>
          <Input
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option>Abstract</option>
            <option>Biomechanical</option>
            <option>Figurative</option>
            <option>Organic Forms</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isVideo"
          checked={formData.isVideo}
          onChange={(e) => setFormData({ ...formData, isVideo: e.target.checked })}
          className="rounded border-border"
        />
        <label htmlFor="isVideo" className="text-sm">This is a video</label>
      </div>
      {formData.isVideo && (
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Video URL</label>
          <Input
            value={formData.videoSrc || ""}
            onChange={(e) => setFormData({ ...formData, videoSrc: e.target.value })}
            placeholder="https://..."
          />
        </div>
      )}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </form>
  );
};

// Drop Form Component
const DropForm = ({ 
  drop, 
  onSave, 
  onCancel 
}: { 
  drop: Drop | null; 
  onSave: (drop: Drop) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Drop>(drop || {
    id: "",
    image: "",
    title: "",
    edition: 25,
    price: 1000,
    status: "upcoming",
    dropDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    description: "",
    remaining: 25,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Image URL</label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/src/assets/sculpture-1.jpg"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Edition Size</label>
          <select
            value={formData.edition}
            onChange={(e) => setFormData({ ...formData, edition: Number(e.target.value) })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value={25}>25 pieces</option>
            <option value={50}>50 pieces</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Price ($)</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Drop["status"] })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="upcoming">Upcoming</option>
            <option value="available">Available</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">
            {formData.status === "upcoming" ? "Drop Date" : "Remaining"}
          </label>
          {formData.status === "upcoming" ? (
            <Input
              type="date"
              value={formData.dropDate.split("T")[0]}
              onChange={(e) => setFormData({ ...formData, dropDate: e.target.value })}
            />
          ) : (
            <Input
              type="number"
              value={formData.remaining || formData.edition}
              onChange={(e) => setFormData({ ...formData, remaining: Number(e.target.value) })}
            />
          )}
        </div>
      </div>
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </form>
  );
};

export default Admin;
