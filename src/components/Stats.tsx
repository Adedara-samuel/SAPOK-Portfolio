"use client";

import { motion } from "framer-motion";
import { Users, ProjectorIcon, Coffee, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "84+", label: "Happy Clients", color: "from-blue-500 to-cyan-500" },
  { icon: ProjectorIcon, value: "64+", label: "Projects Completed", color: "from-purple-500 to-pink-500" },
  { icon: Coffee, value: "100+", label: "Cups of Coffee", color: "from-orange-500 to-amber-500" },
  { icon: Award, value: "5+", label: "Awards Won", color: "from-green-500 to-emerald-500" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="text-3xl md:text-4xl font-bold mb-1"
              >
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
