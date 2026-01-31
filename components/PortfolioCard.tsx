"use client";

import { motion } from "framer-motion";

interface PortfolioCardProps {
  title: string;
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
      };
    } else if (relativePosition > 0) {
      // Cards behind (stacked)
      return {
        x: -relativePosition * baseOffset,
        y: -relativePosition * baseOffset,
        rotate: -relativePosition * baseRotation,
        scale: 1 - relativePosition * 0.03,
        zIndex: 50 - relativePosition,
      };
    } else {
      // Cards that have cycled to the back
      return {
        x: (totalCards + relativePosition) * -baseOffset,
        y: (totalCards + relativePosition) * -baseOffset,
        rotate: (totalCards + relativePosition) * -baseRotation,
        scale: 1 - (totalCards + relativePosition) * 0.03,
        zIndex: 50 - (totalCards + relativePosition),
      };
    }
  };

  const transforms = getTransforms();

  return (
    <motion.div
      className="absolute w-[500px] h-[375px] cursor-pointer group"
      style={{
        zIndex: transforms.zIndex,
      }}
      animate={{
        x: transforms.x,
        y: transforms.y,
        rotate: transforms.rotate,
        scale: transforms.scale,
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
        className="block w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-600/50 bg-slate-800"
      >
        {/* Full card image/video */}
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
            <span className="text-slate-400 font-medium italic">
              {title}
            </span>
          </div>
        )}
      </a>
    </motion.div>
  );
}
