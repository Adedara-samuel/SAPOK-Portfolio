"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, CheckCircle, XCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "W6z-f_nbHSrrhFapR";
const EMAILJS_SERVICE_ID = "service_z0zv4gm";
const EMAILJS_TEMPLATE_ID = "template_vflko8k";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "adedarasapok@gmail.com",
    href: "mailto:adedarasapok@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 8135013995",
    href: "tel:+2348135013995",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
    href: "#",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Adedara-samuel", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/adedara-samuel", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/AdedaraSP", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
            I&apos;m always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Let&apos;s talk about everything!</h3>
              <p className="text-muted-foreground">
                Don&apos;t like forms? Send me an email. 👋 I&apos;m currently available for
                freelance work and full-time positions.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow me on</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Status Message */}
                  {status !== "idle" && (
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg ${status === "success"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                    >
                      {status === "success" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                      <span className="text-sm">{statusMessage}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
