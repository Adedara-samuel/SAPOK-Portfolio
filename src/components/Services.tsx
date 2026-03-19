"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Palette,
  Smartphone,
  Server,
  Cloud,
  ShoppingCart
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive user interfaces that enhance user experience and engagement.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Responsive mobile applications that work seamlessly across all devices.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Robust server-side solutions with secure APIs and database management.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Cloud deployment and infrastructure management using AWS, Vercel, and more.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Full-featured online stores with secure payment processing and inventory management.",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I offer a comprehensive range of digital services to help businesses
            transform their ideas into reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-card">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
