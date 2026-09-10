import { profile, socials } from "@/data/profile";

export default function Footer() {
  // Server-rendered at build time. The original site filled the year in
  // client-side; a static build makes that unnecessary.
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-[0.85rem] text-fg-faint">
          © {year} {profile.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.85rem] text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {social.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
