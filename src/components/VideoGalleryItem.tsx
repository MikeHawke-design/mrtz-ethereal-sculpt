import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize, X, Volume2, VolumeX } from "lucide-react";

interface VideoGalleryItemProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  year?: string;
  category?: string;
  index?: number;
}

const VideoGalleryItem = ({
  videoSrc,
  posterSrc,
  title,
  year,
  category,
  index = 0,
}: VideoGalleryItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (fullscreenVideoRef.current) {
      if (isPlaying) {
        fullscreenVideoRef.current.pause();
      } else {
        fullscreenVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <motion.article
        className="group relative cursor-pointer overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFullscreen}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {/* Poster Image */}
          <motion.img
            src={posterSrc}
            alt={title}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Video Preview */}
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Play Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center bg-background/30 backdrop-blur-sm">
              <Play className="w-6 h-6 text-primary ml-1" />
            </div>
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Content Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-2">
              {category && (
                <span className="text-xs tracking-[0.2em] uppercase text-primary">
                  {category}
                </span>
              )}
              <h3 className="font-display text-2xl text-foreground">{title}</h3>
              {year && (
                <span className="text-sm text-muted-foreground">{year}</span>
              )}
            </div>
          </motion.div>

          {/* Video Badge */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 text-xs tracking-wider uppercase text-primary">
            Video
          </div>
        </div>
      </motion.article>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
                setIsPlaying(false);
              }}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Container */}
            <div className="max-w-6xl w-full mx-6">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={fullscreenVideoRef}
                  src={videoSrc}
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-contain"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                />

                {/* Video Controls */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1" />

                    <span className="font-display text-lg">{title}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGalleryItem;
