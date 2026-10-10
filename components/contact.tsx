"use client";

import { useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";

const emailAddress = "jitenmohantyaz@gmail.com";

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const moveMagnet = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
    event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={moveMagnet}
      onPointerLeave={(event) => { event.currentTarget.style.transform = ""; }}
      className="magnetic-social grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 transition-colors hover:border-violet-300/35 hover:bg-violet-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [copyStatus, setCopyStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = emailAddress;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand("copy");
        temporaryInput.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }
      setCopyStatus("Email address copied to clipboard.");
      toast({ title: "Email copied", description: emailAddress });
    } catch {
      setCopyStatus("Copy was unavailable. Select the email address to copy it.");
      toast({ title: "Could not copy email", description: "You can select the address and copy it manually." });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !formRef.current) return;
    setFormStatus("idle");
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      formRef.current.reset();
      setFormStatus("success");
      toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon." });
    } catch {
      setFormStatus("error");
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-space px-4 sm:px-6">
      <div className="page-container">
        <div className="mb-10 max-w-4xl md:mb-14" data-reveal>
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="font-heading text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
            Let&apos;s build something <span className="gradient-text">great.</span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-7 text-muted-foreground">
            Feel free to reach out to me for any questions or opportunities. I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6">
          <div className="flex flex-col gap-4" data-reveal>
            <div className="surface-card flex-1 p-5 sm:p-7">
              <p className="eyebrow mb-6">Let&apos;s connect</p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/[0.08] text-violet-200"><Mail size={17} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow mb-1 text-[0.58rem]">Email</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button type="button" onClick={copyEmail} aria-label={`Copy ${emailAddress}`} className="link-wipe break-all text-left text-sm font-medium text-foreground">{emailAddress}</button>
                      <Copy size={12} className="text-muted-foreground" aria-hidden="true" />
                    </div>
                    <a href={`mailto:${emailAddress}`} className="link-wipe mt-1 inline-block text-xs text-muted-foreground hover:text-cyan-200">Open email app</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-200/15 bg-cyan-300/[0.07] text-cyan-200"><Phone size={17} aria-hidden="true" /></span>
                  <div>
                    <p className="eyebrow mb-1 block w-fit text-[0.58rem]">Phone</p>
                    <a href="tel:+918637246237" className="link-wipe text-sm font-medium text-foreground">+91 8637246237</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/[0.08] text-violet-200"><MapPin size={17} aria-hidden="true" /></span>
                  <div>
                    <p className="eyebrow mb-1 text-[0.58rem]">Location</p>
                    <p className="text-sm font-medium text-foreground">Bhubaneswar, Odisha, India</p>
                  </div>
                </div>
              </div>

              <p className="mt-8 border-t border-white/[0.08] pt-5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">Find me online</p>
              <div className="mt-4 flex gap-2.5">
                <SocialLink href="https://github.com/Jitenmohanty" label="GitHub"><Github size={17} aria-hidden="true" /></SocialLink>
                <SocialLink href="https://linkedin.com/in/jiten-mohanty" label="LinkedIn"><Linkedin size={17} aria-hidden="true" /></SocialLink>
                <SocialLink href="https://twitter.com/jitenmohanty" label="Twitter"><Twitter size={17} aria-hidden="true" /></SocialLink>
              </div>
              <p className="sr-only" aria-live="polite">{copyStatus}</p>
            </div>

            <a href={`mailto:${emailAddress}`} className="group flex items-center justify-between gap-4 rounded-[20px] border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.12] to-cyan-400/[0.05] p-5 transition-colors hover:border-violet-300/30 sm:p-6">
              <div><p className="eyebrow mb-1 text-[0.58rem]">For direct inquiries</p><p className="text-sm font-medium text-white">Send me an email</p></div>
              <ArrowUpRight size={18} className="text-violet-200 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          <div className="glass-panel p-5 sm:p-8" data-reveal>
            <div className="mb-7">
              <p className="eyebrow mb-2">Project inquiry</p>
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.035em]">Send me a message</h3>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="floating-field">
                  <input id="contact-name" name="name" type="text" autoComplete="name" placeholder=" " maxLength={100} required className="peer" />
                  <label htmlFor="contact-name">Your name</label>
                </div>
                <div className="floating-field">
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder=" " maxLength={254} required className="peer" />
                  <label htmlFor="contact-email">Email address</label>
                </div>
              </div>
              <div className="floating-field">
                <input id="contact-subject" name="subject" type="text" placeholder=" " maxLength={160} required className="peer" />
                <label htmlFor="contact-subject">Subject</label>
              </div>
              <div className="floating-field floating-textarea">
                <textarea id="contact-message" name="message" placeholder=" " rows={5} maxLength={5000} required className="peer resize-y" />
                <label htmlFor="contact-message">Tell me about your project</label>
              </div>

              {formStatus === "success" && <p className="form-status form-status-success" role="status"><Check size={15} aria-hidden="true" />Message sent. Thank you — I&apos;ll get back to you soon.</p>}
              {formStatus === "error" && <p className="form-status form-status-error" role="alert">Your message could not be sent. Please try again or email me directly.</p>}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[38ch] text-xs leading-5 text-muted-foreground">Your details are used only to reply to this message.</p>
                <button type="submit" aria-disabled={isSubmitting} onClick={(event) => { if (isSubmitting) event.preventDefault(); }} className="button-primary inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold aria-disabled:cursor-wait aria-disabled:opacity-70">
                  {isSubmitting ? "Sending…" : "Send message"}
                  <Send size={15} className={isSubmitting ? "animate-pulse" : ""} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
