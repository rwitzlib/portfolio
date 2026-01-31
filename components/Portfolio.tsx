"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PortfolioCard from "./PortfolioCard";

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: "Cabbage Co",
    description: "Health supplement e-commerce for digestive wellness",
    image: "/projects/drinkcabbagejuice.png",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Divide scroll progress into segments for each card
      const segmentSize = 1 / projects.length;
      const newIndex = Math.min(
        Math.floor(latest / segmentSize),
        projects.length - 1
      );
      setActiveIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Progress indicator dots
  const progressOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative bg-slate-950"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      {/* Sticky container for cards */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Section header */}
        <motion.div
          className="absolute top-24 left-0 right-0 text-center z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-slate-400 text-lg">Scroll to explore my work</p>
        </motion.div>

        {/* Cards container */}
        <div className="relative w-full max-w-lg aspect-[4/3] mx-auto mt-8">
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
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2"
          style={{ opacity: progressOpacity }}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Calculate scroll position for this index
                if (containerRef.current) {
                  const containerTop = containerRef.current.offsetTop;
                  const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
                  const targetScroll = containerTop + (index / projects.length) * containerHeight;
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-blue-500"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Current project counter */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500 text-sm"
          style={{ opacity: progressOpacity }}
        >
          <span className="text-white font-medium">{activeIndex + 1}</span>
          <span className="mx-1">/</span>
          <span>{projects.length}</span>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 text-xs uppercase tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to navigate
        </motion.p>
      </div>
    </section>
  );
}
