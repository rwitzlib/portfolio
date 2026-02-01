"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Software Engineer",
    company: "Optum",
    period: "Oct 2022 - Present",
    description:
      "Building internal tools, CI/CD pipelines, and healthcare services. Designed Mjolnir for automated test suites and database migrations. Created Clinical Data Service for HIPAA-compliant FHIR data retrieval.",
    highlights: ["AWS", "Terraform", "Docker", "C# / .NET"],
  },
  {
    type: "work",
    title: "Software Engineer",
    company: "Change Healthcare",
    period: "May 2020 - Oct 2022",
    description:
      "Developed healthcare APIs and led team building mock FHIR server. Implemented breast cancer risk assessment API with Epic EMR integration. Maintained 3000+ automated tests across applications.",
    highlights: ["C# / .NET", "FHIR", "SQL", "GitLab"],
  },
  {
    type: "education",
    title: "B.S. Computer Science",
    company: "University of Wisconsin - Madison",
    period: "Sep 2016 - Aug 2020",
    description:
      "Bachelor of Science in Computer Science. Coursework included Operating Systems, Algorithms, Data Structures, Databases, and Cybersecurity.",
    highlights: ["Algorithms", "Data Structures", "Databases", "Cybersecurity"],
  },
];

export default function Resume() {
  return (
    <section id="resume" className="relative bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            My professional journey and educational background
          </p>
          <motion.a
            href="/resume/RobWitzlib-Resume.pdf"
            download="RobWitzlib-Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-200 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-700" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950 z-10" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="glass-card p-6 hover:border-blue-500/30 transition-colors duration-300">
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.type === "work" ? (
                        <Briefcase className="text-blue-400" size={18} />
                      ) : (
                        <GraduationCap className="text-purple-400" size={18} />
                      )}
                      <span className="text-slate-500 text-sm">{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-blue-400 text-sm mb-3">{exp.company}</p>
                    <p className="text-slate-400 text-sm mb-4">{exp.description}</p>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
