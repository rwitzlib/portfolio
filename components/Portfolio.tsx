"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCard";

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: "Cabbage Co",
    description: "Health supplement e-commerce for digestive wellness",
    image: "/projects/drinkcabbagejuice.mp4",
    url: "https://drinkcabbagejuice.com",
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "Analytics dashboard for business insights",
    image: "",
    url: "https://example.com/saas",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio for a photographer",
    image: "",
    url: "https://example.com/portfolio",
  },
  {
    id: 4,
    title: "Mobile App Landing",
    description: "App store landing page with animations",
    image: "",
    url: "https://example.com/app",
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Content management system with CMS",
    image: "",
    url: "https://example.com/blog",
  },
  {
    id: 6,
    title: "Real Estate Site",
    description: "Property listings with map integration",
    image: "",
    url: "https://example.com/realestate",
  },
  {
    id: 7,
    title: "Restaurant Website",
    description: "Online ordering and reservations",
    image: "",
    url: "https://example.com/restaurant",
  },
  {
    id: 8,
    title: "Fitness Tracker",
    description: "Health and workout tracking app",
    image: "",
    url: "https://example.com/fitness",
  },
];

export default function Portfolio() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const lastScrollTime = useRef(0);

  // Handle wheel events on the cards area with native listener to prevent page scroll
  useEffect(() => {
    const cardsElement = cardsRef.current;
    if (!cardsElement) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page scroll when hovering over cards
      e.preventDefault();

      // Throttle scroll events
      const now = Date.now();
      if (now - lastScrollTime.current < 150) return;
      lastScrollTime.current = now;

      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - go to next card
        setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
      } else if (e.deltaY < 0) {
        // Scrolling up - go to previous card
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    // Use passive: false to allow preventDefault()
    cardsElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      cardsElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section
      id="portfolio"
      className="relative bg-slate-950 min-h-screen py-24"
    >
      <div className="h-full flex flex-col items-center justify-center">
        {/* Section header */}
        <motion.div
          className="text-center mb-24 relative z-[60]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-slate-400 text-lg">
            {isHovering ? "Scroll to browse projects" : "Hover over cards to explore"}
          </p>
        </motion.div>

        {/* Cards container - captures wheel events when hovering */}
        <div
          ref={cardsRef}
          className={`relative w-full max-w-lg aspect-[4/3] mx-auto cursor-pointer transition-transform duration-200 ${
            isHovering ? "scale-105" : ""
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              url={project.url}
              index={index}
              totalCards={projects.length}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-12 flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-blue-500"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Current project counter */}
        <div className="mt-4 text-slate-500 text-sm">
          <span className="text-white font-medium">{activeIndex + 1}</span>
          <span className="mx-1">/</span>
          <span>{projects.length}</span>
        </div>

        {/* Scroll hint */}
        <motion.p
          className="mt-4 text-slate-600 text-xs uppercase tracking-wider"
          animate={{ opacity: isHovering ? 1 : [0.5, 1, 0.5] }}
          transition={{ duration: isHovering ? 0.2 : 2, repeat: isHovering ? 0 : Infinity }}
        >
          {isHovering ? "Scroll to navigate" : "Hover to interact"}
        </motion.p>
      </div>
    </section>
  );
}
