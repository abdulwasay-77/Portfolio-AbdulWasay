import { ArrowUpRight, Mail } from "lucide-react";
import { profile, socials } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import BrandIcon from "@/components/ui/BrandIcon";
import CopyEmail from "@/components/ui/CopyEmail";

/**
 * Climax CTA — composed as the hero's bookend. Copy on the left, the
 * right half left open: the lattice travels back there and converges,
 * closing the loop the hero opened.
 */
export default function Contact() {
  return (
    <section id="contact" className="section flex min-h-[92svh] items-center">
      <div className="shell w-full">
        <div className="max-w-[40rem] lg:max-w-[52%]">
          <Reveal>
            <p className="label mb-6 flex items-center gap-3">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
              06 / Contact
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="display font-bold">
              Get in <span className="text-accent">touch</span>.
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="lead mt-7 max-w-[46ch]">{profile.contactLead}</p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong"
              >
                <Mail aria-hidden="true" className="size-4" />
                Email me
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={4}>
          <div className="mt-20 lg:mt-28">
            <p className="label mb-5">Find me elsewhere</p>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
              {socials.map((social) => (
                <li key={social.id} className="bg-bg">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col gap-5 p-5 transition-colors duration-200 hover:bg-surface md:p-6"
                  >
                    <span className="flex items-center justify-between">
                      <BrandIcon
                        id={social.id}
                        className="size-5 text-fg-muted transition-colors duration-200 group-hover:text-accent"
                      />
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-fg-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.95rem] font-semibold text-fg">
                        {social.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.7rem] text-fg-faint [overflow-wrap:anywhere]">
                        {social.handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
