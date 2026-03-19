"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  FileText,
  CalendarCheck
} from "lucide-react";
import emailjs from "@emailjs/browser";

// EmailJS credentials
const EMAILJS_PUBLIC_KEY = "W6z-f_nbHSrrhFapR";
const EMAILJS_SERVICE_ID = "service_z0zv4gm";
const EMAILJS_TEMPLATE_ID = "template_vflko8k";
const OWNER_EMAIL = "adedarasamuel@gmail.com";

// Time slots from 9 AM to 4 PM (7 hours)
const TIME_SLOTS = [
  { id: "09:00", label: "9:00 AM" },
  { id: "10:00", label: "10:00 AM" },
  { id: "11:00", label: "11:00 AM" },
  { id: "12:00", label: "12:00 PM" },
  { id: "13:00", label: "1:00 PM" },
  { id: "14:00", label: "2:00 PM" },
  { id: "15:00", label: "3:00 PM" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Booking {
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function Booking() {
  const getInitialBookings = (): Booking[] => {
    if (typeof window === 'undefined') return [];
    const savedBookings = localStorage.getItem("appointments");
    if (savedBookings) {
      try {
        return JSON.parse(savedBookings);
      } catch {
        return [];
      }
    }
    return [];
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(getInitialBookings);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save bookings to localStorage
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem("appointments", JSON.stringify(newBookings));
  };

  // Get month calendar days
  const getMonthDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const monthDays = getMonthDays();

  // Format date as YYYY-MM-DD
  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Check if a time slot is booked for a specific date
  const isSlotBooked = (date: Date, timeSlot: string) => {
    const dateKey = formatDateKey(date);
    return bookings.some(
      (booking) => booking.date === dateKey && booking.timeSlot === timeSlot
    );
  };

  // Check if date is in the past
  const isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Check if date is Sunday (0)
  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  // Check if a date has any available slots
  const hasAvailableSlots = (date: Date) => {
    if (isDatePast(date) || isSunday(date)) return false;
    return TIME_SLOTS.some(slot => !isSlotBooked(date, slot.id));
  };

  // Navigate months
  const nextMonth = () => {
    const next = new Date(viewDate);
    next.setMonth(viewDate.getMonth() + 1);
    setViewDate(next);
  };

  const prevMonth = () => {
    const prev = new Date(viewDate);
    prev.setMonth(viewDate.getMonth() - 1);
    setViewDate(prev);
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (isDatePast(date) || isSunday(date) || !hasAvailableSlots(date)) {
      return;
    }
    setSelectedDate(date);
    setSelectedTime(null);
    setShowForm(false);
  };

  // Handle time slot selection
  const handleTimeClick = (timeId: string) => {
    if (!selectedDate || isSlotBooked(selectedDate, timeId)) return;
    setSelectedTime(timeId);
    setShowForm(true);
    setStatus("idle");
  };

  // Handle booking submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setStatus("error");
      setStatusMessage("Please select a time slot");
      return;
    }

    setIsSubmitting(true);
    const timeLabel = TIME_SLOTS.find(t => t.id === selectedTime)?.label || selectedTime;

    const newBooking: Booking = {
      date: formatDateKey(selectedDate),
      timeSlot: selectedTime,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
    };

    // Save locally first
    saveBookings([...bookings, newBooking]);

    // Try to send email to owner
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `New Appointment Booking - ${timeLabel}`,
        message: `A new appointment has been booked!\n\nClient: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDate: ${selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}\nTime: ${timeLabel}\n\nNotes: ${formData.notes || "No notes provided"}`,
        reply_to: formData.email,
        to_email: OWNER_EMAIL,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setStatusMessage("Appointment booked successfully! You will receive a confirmation email shortly.");
    } catch (emailError) {
      console.log("Email notification error:", emailError);
      // Still show success since booking was saved
      setStatus("success");
      setStatusMessage("Appointment booked successfully! (Note: Email notification may be delayed)");
    }

    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", notes: "" });

    // Reset after success
    setTimeout(() => {
      setShowForm(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setStatus("idle");
    }, 3000);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setSelectedTime(null);
    setStatus("idle");
  };

  return (
    <section id="booking" className="section-padding min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Session</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Schedule Your <span className="gradient-text">Appointment</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Select a date and time that works best for you. I&apos;ll send you a confirmation once your appointment is confirmed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden">
              {/* Month Navigation */}
              <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h3 className="text-xl font-semibold">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </h3>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="p-3 text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {monthDays.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="p-2" />;
                  }

                  const isPast = isDatePast(date);
                  const isSun = isSunday(date);
                  const isSelected = selectedDate && formatDateKey(date) === formatDateKey(selectedDate);
                  const hasSlots = hasAvailableSlots(date);

                  return (
                    <motion.button
                      key={formatDateKey(date)}
                      whileHover={!isPast && !isSun && hasSlots ? { scale: 1.05 } : {}}
                      whileTap={!isPast && !isSun && hasSlots ? { scale: 0.95 } : {}}
                      onClick={() => handleDateClick(date)}
                      disabled={isPast || isSun || !hasSlots}
                      className={`
                        p-3 text-center border-b border-r transition-all relative
                        ${isPast || isSun || !hasSlots
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-primary/5 cursor-pointer"
                        }
                        ${isSelected ? "bg-primary/20 ring-2 ring-primary" : ""}
                      `}
                    >
                      <span className={`text-lg font-medium ${isSun ? "text-red-400" : ""}`}>
                        {date.getDate()}
                      </span>
                      {!isPast && !isSun && hasSlots && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary/20 rounded-full" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-muted-foreground">Has Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded-full" />
                <span className="text-muted-foreground">Unavailable</span>
              </div>
            </div>
          </motion.div>

          {/* Time Slots & Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {!selectedDate ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">
                      Select a date from the calendar to view available time slots
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Selected Date Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </div>

                    {/* Time Slots */}
                    {!showForm ? (
                      <>
                        <p className="text-sm font-medium mb-3">Available Time Slots</p>
                        <div className="grid grid-cols-2 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const booked = isSlotBooked(selectedDate, slot.id);

                            return (
                              <motion.button
                                key={slot.id}
                                whileHover={!booked ? { scale: 1.02 } : {}}
                                whileTap={!booked ? { scale: 0.98 } : {}}
                                onClick={() => handleTimeClick(slot.id)}
                                disabled={booked}
                                className={`
                                  p-3 rounded-lg border text-sm font-medium transition-all
                                  ${booked
                                    ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                    : "bg-background hover:border-primary hover:text-primary cursor-pointer"
                                  }
                                `}
                              >
                                {booked ? (
                                  <span className="flex items-center gap-1">
                                    <XCircle className="w-3 h-3" /> {slot.label}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {slot.label}
                                  </span>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      /* Booking Form */
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <p className="font-medium">Complete Your Booking</p>
                            <Button variant="ghost" size="icon" onClick={closeForm} className="h-8 w-8">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Status Message */}
                          {status !== "idle" && (
                            <div
                              className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${status === "success"
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

                          {/* Selected Time Display */}
                          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg mb-4">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="font-medium text-primary">
                              {TIME_SLOTS.find(t => t.id === selectedTime)?.label}
                            </span>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-1">
                              <Label htmlFor="booking-name" className="text-xs">Name</Label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  id="booking-name"
                                  placeholder="Your full name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  className="pl-9"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label htmlFor="booking-email" className="text-xs">Email</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  id="booking-email"
                                  type="email"
                                  placeholder="your@email.com"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  className="pl-9"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label htmlFor="booking-phone" className="text-xs">Phone</Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                  id="booking-phone"
                                  type="tel"
                                  placeholder="+234..."
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className="pl-9"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label htmlFor="booking-notes" className="text-xs">Notes (Optional)</Label>
                              <div className="relative">
                                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Textarea
                                  id="booking-notes"
                                  placeholder="What would you like to discuss?"
                                  value={formData.notes}
                                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                  className="pl-9"
                                  rows={2}
                                />
                              </div>
                            </div>

                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                            >
                              {isSubmitting ? (
                                <>Processing...</>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Confirm Booking
                                </>
                              )}
                            </Button>
                          </form>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
