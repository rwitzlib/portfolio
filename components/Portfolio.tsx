"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import PortfolioCard from "./PortfolioCard";

// Portfolio projects data with extended details
const projects = [
  {
    id: 1,
    title: "Cabbage Co",
    description: "Health supplement e-commerce for digestive wellness",
    fullDescription: "A full-featured e-commerce platform specializing in digestive health supplements. Features include product catalog, shopping cart, secure checkout, and subscription management for recurring orders.",
    image: "/projects/drinkcabbagejuice.mp4",
    url: "https://drinkcabbagejuice.com",
    github: "https://github.com/username/cabbage-co",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "Analytics dashboard for business insights",
    fullDescription: "A comprehensive analytics dashboard that provides real-time business insights, data visualization, and reporting tools. Includes user management, role-based access, and customizable widgets.",
    image: "",
    url: "https://example.com/saas",
    github: "https://github.com/username/saas-dashboard",
    techStack: ["React", "Node.js", "PostgreSQL", "Chart.js", "Docker"],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio for a photographer",
    fullDescription: "A visually stunning portfolio website designed for a professional photographer. Features a masonry gallery, lightbox viewer, contact form, and blog integration.",
    image: "",
    url: "https://example.com/portfolio",
    github: "https://github.com/username/photo-portfolio",
    techStack: ["Next.js", "Framer Motion", "Sanity CMS", "Cloudinary"],
  },
  {
    id: 4,
    title: "Mobile App Landing",
    description: "App store landing page with animations",
    fullDescription: "An engaging landing page for a mobile application featuring smooth scroll animations, app store badges, feature highlights, and testimonials section.",
    image: "",
    url: "https://example.com/app",
    github: "https://github.com/username/app-landing",
    techStack: ["React", "GSAP", "Tailwind CSS", "Vercel"],
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Content management system with CMS",
    fullDescription: "A modern blogging platform with a custom CMS, markdown support, SEO optimization, social sharing, and newsletter integration for content creators.",
    image: "",
    url: "https://example.com/blog",
    github: "https://github.com/username/blog-platform",
    techStack: ["Next.js", "MDX", "Supabase", "Tailwind CSS", "Resend"],
  },
  {
    id: 6,
    title: "Real Estate Site",
    description: "Property listings with map integration",
    fullDescription: "A real estate platform featuring property listings, advanced search filters, interactive maps, virtual tours, and agent contact forms.",
    image: "",
    url: "https://example.com/realestate",
    github: "https://github.com/username/real-estate",
    techStack: ["Next.js", "Mapbox", "MongoDB", "AWS S3", "Twilio"],
  },
  {
    id: 7,
    title: "Restaurant Website",
    description: "Online ordering and reservations",
    fullDescription: "A complete restaurant website with online menu, ordering system, table reservations, and integration with delivery services.",
    image: "",
    url: "https://example.com/restaurant",
    github: "https://github.com/username/restaurant-site",
    techStack: ["React", "Firebase", "Stripe", "Tailwind CSS"],
  },
  {
    id: 8,
    title: "Fitness Tracker",
    description: "Health and workout tracking app",
    fullDescription: "A fitness tracking application that helps users log workouts, track progress, set goals, and analyze their health data over time.",
    image: "",
    url: "https://example.com/fitness",
    github: "https://github.com/username/fitness-tracker",
    techStack: ["React Native", "Node.js", "MongoDB", "Chart.js"],
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

  const activeProject = projects[activeIndex];

  return (
    <section
      id="portfolio"
      className="relative bg-slate-950 min-h-screen py-24"
    >
      <div className="h-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 relative z-[60]"
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

        {/* Main content - Cards on left, Details on right */}
        <div className="w-full flex flex-col xl:flex-row items-center xl:items-start justify-center gap-12 xl:gap-20 mt-8">
          {/* Left side - Cards container */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              ref={cardsRef}
              className={`relative w-[500px] h-[375px] cursor-pointer transition-transform duration-200 ${
                isHovering ? "scale-105" : ""
              }`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {projects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  title={project.title}
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

            {/* Scroll hint */}
            <motion.p
              className="mt-4 text-slate-600 text-xs uppercase tracking-wider"
              animate={{ opacity: isHovering ? 1 : [0.5, 1, 0.5] }}
              transition={{ duration: isHovering ? 0.2 : 2, repeat: isHovering ? 0 : Infinity }}
            >
              {isHovering ? "Scroll to navigate" : "Hover to interact"}
            </motion.p>
          </div>

          {/* Right side - Project Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md lg:max-w-lg"
            >
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                {/* Project counter */}
                <div className="text-slate-500 text-sm mb-4">
                  <span className="text-blue-400 font-medium">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-1">/</span>
                  <span>{String(projects.length).padStart(2, '0')}</span>
                </div>

                {/* Project title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {activeProject.title}
                </h3>

                {/* Full description */}
                <p className="text-slate-400 leading-relaxed mb-6">
                  {activeProject.fullDescription}
                </p>

                {/* Tech stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink size={18} />
                    Visit Website
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-600 transition-colors duration-200"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
