"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-400 text-sm md:text-base font-medium tracking-wider uppercase mb-4">
            Welcome to my portfolio
          </p>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Robert Witzlib</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A passionate developer creating beautiful, functional web experiences.
          Explore my work and get in touch.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={scrollToPortfolio}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            View My Work
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-full transition-all duration-200 hover:scale-105"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/rwitzlib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/robert-witzlib/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:contact@robwitzlib.com"
            className="text-slate-400 hover:text-white transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.button
          onClick={scrollToPortfolio}
          className="text-slate-400 hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to portfolio"
        >
          <ArrowDown size={28} />
        </motion.button>
      </motion.div>
    </section>
  );
}
