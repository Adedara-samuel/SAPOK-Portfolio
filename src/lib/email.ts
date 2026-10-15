import emailjs from "@emailjs/browser";

// EmailJS public credentials (safe to ship — they are designed for browser use).
// Override per environment with NEXT_PUBLIC_EMAILJS_* in .env.local.
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "W6z-f_nbHSrrhFapR";
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_z0zv4gm";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_vflko8k";

export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function sendEmail(payload: EmailPayload) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { ...payload, phone: payload.phone ?? "", reply_to: payload.email },
    { publicKey: PUBLIC_KEY },
  );
}
