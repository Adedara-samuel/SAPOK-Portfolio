import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, CalendarDays, Layers, MessageSquare, Sparkles, UserRound } from "lucide-react";

export type SceneId = "index" | "about" | "work" | "services" | "book" | "contact";

export interface SceneMeta {
  id: SceneId;
  label: string;
  icon: LucideIcon;
}

export const SCENES: SceneMeta[] = [
  { id: "index", label: "Home", icon: Sparkles },
  { id: "about", label: "About", icon: UserRound },
  { id: "work", label: "Work", icon: BriefcaseBusiness },
  { id: "services", label: "Services", icon: Layers },
  { id: "book", label: "Book", icon: CalendarDays },
  { id: "contact", label: "Contact", icon: MessageSquare },
];

export interface SceneProps {
  go: (id: SceneId) => void;
  openProject: (slug: string) => void;
}
