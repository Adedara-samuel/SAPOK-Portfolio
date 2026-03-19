"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Cloud,
  GraduationCap,
  Briefcase,
  PenTool
} from "lucide-react";

const skills = [
  { name: "JavaScript/TypeScript", icon: Code, color: "text-yellow-500" },
  { name: "React/Next.js", icon: Globe, color: "text-blue-500" },
  { name: "Node.js", icon: Database, color: "text-green-500" },
  { name: "UI/UX Design", icon: Palette, color: "text-pink-500" },
  { name: "Graphics Designing", icon: PenTool, color: "text-cyan-500" },
  { name: "Mobile Apps", icon: Smartphone, color: "text-purple-500" },
  { name: "Cloud Services", icon: Cloud, color: "text-orange-500" },
];

const experience = [
  {
    title: "Senior Software Developer",
    company: "Tech Solutions Inc.",
    period: "2023 - Present",
    description: "Leading development of enterprise web applications."
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
    description: "Built 50+ client websites and web applications."
  },
];



export default function About() {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I&apos;m a dedicated software developer with a strong focus on both frontend
            and backend development. My work blends technical expertise with
            innovative problem-solving to craft outstanding digital solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-pics.jpg"
                  alt="About Adedara"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-background rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3+</div>
                    <div className="text-sm text-muted-foreground">Years Exp.</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-semibold">Adedara Samuel</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-semibold">adedarasapok@gmail.com</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold">Lagos, Nigeria</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-sm text-muted-foreground">Availability</div>
                  <div className="font-semibold text-green-500">Open to work</div>
                </CardContent>
              </Card>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4">My Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-background border"
                  >
                    <skill.icon className={`w-5 h-5 ${skill.color}`} />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-background border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                      <Badge variant="secondary">{exp.period}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Download CV */}
            <motion.a
              href="/cv"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              <GraduationCap className="w-4 h-4" />
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
