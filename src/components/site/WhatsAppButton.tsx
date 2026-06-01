import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919821629786"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 size-14 rounded-full flex items-center justify-center bg-teal text-navy-deep shadow-glow hover-lift"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
