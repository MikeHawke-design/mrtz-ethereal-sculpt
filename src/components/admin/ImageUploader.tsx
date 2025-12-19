import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Video, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
}

interface ImageUploaderProps {
  images: MediaItem[];
  onChange: (images: MediaItem[]) => void;
  maxItems?: number;
  allowVideo?: boolean;
}

const ImageUploader = ({ images, onChange, maxItems = 10, allowVideo = true }: ImageUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const processFile = (file: File): Promise<MediaItem | null> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        toast({ title: "Invalid file type", variant: "destructive" });
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          url: reader.result as string,
          type: file.type.startsWith("video/") ? "video" : "image"
        });
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const availableSlots = maxItems - images.length;
    
    if (files.length > availableSlots) {
      toast({ title: `Can only add ${availableSlots} more items`, variant: "destructive" });
    }

    const filesToProcess = files.slice(0, availableSlots);
    const newMedia: MediaItem[] = [];

    for (const file of filesToProcess) {
      const media = await processFile(file);
      if (media) newMedia.push(media);
    }

    if (newMedia.length > 0) {
      onChange([...images, ...newMedia]);
      toast({ title: `Added ${newMedia.length} item(s)` });
    }
  }, [images, maxItems, onChange]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const availableSlots = maxItems - images.length;
    const filesToProcess = Array.from(files).slice(0, availableSlots);
    const newMedia: MediaItem[] = [];

    for (const file of filesToProcess) {
      const media = await processFile(file);
      if (media) newMedia.push(media);
    }

    if (newMedia.length > 0) {
      onChange([...images, ...newMedia]);
      toast({ title: `Added ${newMedia.length} item(s)` });
    }

    e.target.value = "";
  };

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/") || items[i].type.startsWith("video/")) {
        const file = items[i].getAsFile();
        if (file) files.push(file);
      }
    }

    if (files.length === 0) return;

    const availableSlots = maxItems - images.length;
    const filesToProcess = files.slice(0, availableSlots);
    const newMedia: MediaItem[] = [];

    for (const file of filesToProcess) {
      const media = await processFile(file);
      if (media) newMedia.push(media);
    }

    if (newMedia.length > 0) {
      onChange([...images, ...newMedia]);
      toast({ title: `Pasted ${newMedia.length} item(s)` });
    }
  }, [images, maxItems, onChange]);

  const addFromUrl = () => {
    if (!urlInput.trim()) return;
    
    const isVideo = urlInput.match(/\.(mp4|webm|mov|avi)$/i) || urlInput.includes("youtube") || urlInput.includes("vimeo");
    
    const newMedia: MediaItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: urlInput.trim(),
      type: isVideo ? "video" : "image"
    };

    onChange([...images, newMedia]);
    setUrlInput("");
    toast({ title: "Added from URL" });
  };

  const removeImage = (id: string) => {
    onChange(images.filter(img => img.id !== id));
  };

  const handleItemDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedItem);
    onChange(newImages);
    setDraggedIndex(index);
  };

  const handleItemDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4" onPaste={handlePaste}>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? "border-primary bg-primary/10" 
            : "border-border hover:border-muted-foreground"
          }
        `}
      >
        <div className="flex flex-col items-center gap-3">
          <Upload className={`w-8 h-8 ${isDragOver ? "text-primary" : "text-muted-foreground"}`} />
          <div>
            <p className="text-sm font-medium">
              Drag & drop files here, or{" "}
              <label className="text-primary cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  multiple
                  accept={allowVideo ? "image/*,video/*" : "image/*"}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {allowVideo ? "Images and videos" : "Images only"} • Paste from clipboard (Ctrl+V)
            </p>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Or paste image/video URL..."
          onKeyDown={(e) => e.key === "Enter" && addFromUrl()}
        />
        <Button type="button" variant="outline" onClick={addFromUrl} disabled={!urlInput.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Preview Grid */}
      <AnimatePresence mode="popLayout">
        {images.length > 0 && (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {images.map((media, index) => (
              <motion.div
                key={media.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                draggable
                onDragStart={() => handleItemDragStart(index)}
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDragEnd={handleItemDragEnd}
                className={`
                  relative aspect-square rounded-lg overflow-hidden border border-border group cursor-move
                  ${draggedIndex === index ? "opacity-50" : ""}
                `}
              >
                {media.type === "video" ? (
                  <video src={media.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={media.url} alt="" className="w-full h-full object-cover" />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                  {media.type === "video" ? (
                    <Video className="w-4 h-4 text-primary" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-primary" />
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(media.id)}
                  className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Type Badge */}
                {media.type === "video" && (
                  <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                    VIDEO
                  </span>
                )}

                {/* Order Number */}
                <span className="absolute top-1 left-1 text-[10px] bg-background/80 text-foreground px-1.5 py-0.5 rounded">
                  {index + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {images.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {images.length}/{maxItems} items • Drag to reorder
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
