"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  index: number;
  totalCards: number;
  activeIndex: number;
}

// Check if the file is a video
const isVideo = (src: string) => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
};

export default function PortfolioCard({
  title,
  description,
  image,
  url,
  index,
  totalCards,
  activeIndex,
}: PortfolioCardProps) {
  // Calculate the position relative to active card
  const getRelativePosition = () => {
    let relativePos = index - activeIndex;
    
    // Handle wrapping for circular carousel
    if (relativePos > totalCards / 2) {
      relativePos -= totalCards;
    } else if (relativePos < -totalCards / 2) {
      relativePos += totalCards;
    }
    
    return relativePos;
  };

  const relativePosition = getRelativePosition();
  
  // Only render cards that are within visible range
  const isVisible = Math.abs(relativePosition) <= 4;
  
  if (!isVisible) return null;

  // Calculate transforms based on position
  // Cards stack up and to the left when behind the active card
  const getTransforms = () => {
    const baseOffset = 30; // pixels offset per card
    const baseRotation = 2; // degrees rotation per card
    
    if (relativePosition === 0) {
      // Active card - front and center
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 50,
        opacity: 1,
      };
    } else if (relativePosition > 0) {
      // Cards behind (stacked)
      return {
        x: -relativePosition * baseOffset,
        y: -relativePosition * baseOffset,
        rotate: -relativePosition * baseRotation,
        scale: 1 - relativePosition * 0.03,
        zIndex: 50 - relativePosition,
        opacity: 1 - relativePosition * 0.15,
      };
    } else {
      // Cards that have cycled to the back
      return {
        x: (totalCards + relativePosition) * -baseOffset,
        y: (totalCards + relativePosition) * -baseOffset,
        rotate: (totalCards + relativePosition) * -baseRotation,
        scale: 1 - (totalCards + relativePosition) * 0.03,
        zIndex: 50 - (totalCards + relativePosition),
        opacity: 1 - (totalCards + relativePosition) * 0.15,
      };
    }
  };

  const transforms = getTransforms();

  return (
    <motion.div
      className="absolute w-full max-w-lg aspect-[4/3] cursor-pointer group"
      style={{
        zIndex: transforms.zIndex,
      }}
      animate={{
        x: transforms.x,
        y: transforms.y,
        rotate: transforms.rotate,
        scale: transforms.scale,
        opacity: transforms.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={relativePosition === 0 ? { scale: 1.02 } : {}}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #e8ddd5 0%, #d4c4b8 100%)",
        }}
      >
        {/* Card inner content */}
        <div className="relative w-full h-full p-6 flex flex-col">
          {/* Screenshot/Video area */}
          <div className="flex-1 bg-white/50 rounded-xl flex items-center justify-center overflow-hidden">
            {image ? (
              isVideo(image) ? (
                <video
                  src={image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <span className="text-slate-600 font-medium italic">
                Screenshot of {title}
              </span>
            )}
          </div>
          
          {/* Card footer with title */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-slate-800 font-semibold text-lg">{title}</h3>
              <p className="text-slate-600 text-sm line-clamp-1">{description}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ExternalLink className="text-slate-600" size={20} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
