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
  Settings,
  Instagram,
  Mail,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MRTZLogo from "@/components/MRTZLogo";
import ImageUploader from "@/components/admin/ImageUploader";
import { 
  PortfolioItem, 
  Drop, 
  SiteSettings,
  MediaItem,
  DEFAULT_SETTINGS,
  DEFAULT_PORTFOLIO,
  DEFAULT_DROPS
} from "@/types/admin";

const ADMIN_PASSWORD = "mrtz2024";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"portfolio" | "drops" | "settings">("portfolio");
  
  const [portfolioItems, setPortfolioItems] = useLocalStorage<PortfolioItem[]>("mrtz-portfolio-v2", DEFAULT_PORTFOLIO);
  const [drops, setDrops] = useLocalStorage<Drop[]>("mrtz-drops-v2", DEFAULT_DROPS);
  const [siteSettings, setSiteSettings] = useLocalStorage<SiteSettings>("mrtz-settings", DEFAULT_SETTINGS);

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

  const saveSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    toast({ title: "Settings saved" });
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
          
          <p className="text-xs text-muted-foreground text-center mt-6">
            Password: mrtz2024
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4 sticky top-0 bg-background/95 backdrop-blur z-40">
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
      <div className="border-b border-border sticky top-[65px] bg-background/95 backdrop-blur z-30">
        <div className="container mx-auto flex gap-6 px-4">
          {[
            { id: "portfolio", label: "Portfolio", icon: Image },
            { id: "drops", label: "Drops", icon: Clock },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-4 text-sm tracking-[0.1em] uppercase transition-colors relative ${
                activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto p-6">
        {activeTab === "settings" ? (
          <SettingsForm settings={siteSettings} onSave={saveSettings} />
        ) : (
          <>
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
                      {item.images[0]?.type === "video" ? (
                        <video src={item.images[0].url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={item.images[0]?.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                      )}
                      {item.images.length > 1 && (
                        <span className="absolute top-2 left-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded">
                          +{item.images.length - 1} more
                        </span>
                      )}
                      {item.images.some(img => img.type === "video") && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Video className="w-3 h-3" />
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
                      {drop.images[0]?.type === "video" ? (
                        <video src={drop.images[0].url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={drop.images[0]?.url || "/placeholder.svg"} alt={drop.title} className="w-full h-full object-cover" />
                      )}
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
          </>
        )}
      </main>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {(editingItem || isCreating) && activeTab !== "settings" && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
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
    images: [],
    title: "",
    year: new Date().getFullYear().toString(),
    category: "Abstract",
    description: "",
  });

  const handleImagesChange = (images: MediaItem[]) => {
    setFormData({ ...formData, images });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-6">
      <div>
        <label className="text-sm text-muted-foreground block mb-3">Media (Images & Videos)</label>
        <ImageUploader
          images={formData.images}
          onChange={handleImagesChange}
          maxItems={10}
          allowVideo={true}
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-2">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            <option>Surreal</option>
            <option>Dark Fantasy</option>
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

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={formData.images.length === 0}>
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
    images: [],
    title: "",
    edition: 25,
    price: 1000,
    status: "upcoming",
    dropDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    description: "",
    remaining: 25,
  });

  const handleImagesChange = (images: MediaItem[]) => {
    setFormData({ ...formData, images });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-6">
      <div>
        <label className="text-sm text-muted-foreground block mb-3">Media (Images & Videos)</label>
        <ImageUploader
          images={formData.images}
          onChange={handleImagesChange}
          maxItems={10}
          allowVideo={true}
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground block mb-2">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Edition Size</label>
          <Input
            type="number"
            value={formData.edition}
            onChange={(e) => setFormData({ ...formData, edition: Number(e.target.value), remaining: Number(e.target.value) })}
            min={1}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Price ($)</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            min={0}
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
              min={0}
              max={formData.edition}
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
        <Button type="submit" className="flex-1" disabled={formData.images.length === 0}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </form>
  );
};

// Settings Form Component
const SettingsForm = ({ 
  settings, 
  onSave 
}: { 
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-6">Site Settings</h2>
        
        {/* Branding */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground border-b border-border pb-2">
            Branding
          </h3>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Hero Title</label>
            <Input
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              placeholder="Sculpting the Shadows"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Hero Subtitle</label>
            <Textarea
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              placeholder="Where darkness meets elegance..."
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Brand Tagline (Footer)</label>
            <Textarea
              value={formData.brandTagline}
              onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
              placeholder="Sculptural art that dwells..."
              rows={2}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground border-b border-border pb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact
          </h3>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Email Address</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@mrtz.art"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground border-b border-border pb-2 flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Instagram URL</label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Twitter/X URL</label>
              <Input
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-2">TikTok URL</label>
              <Input
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@..."
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-2">YouTube URL</label>
              <Input
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground border-b border-border pb-2">
            About Page Content
          </h3>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">About Text</label>
            <Textarea
              value={formData.aboutText}
              onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
              placeholder="Tell your story..."
              rows={6}
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </form>
  );
};

export default Admin;
