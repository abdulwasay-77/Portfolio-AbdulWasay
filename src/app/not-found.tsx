import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StaticLattice from "@/components/three/StaticLattice";

export default function NotFound() {
  return (
    <>
      <StaticLattice underlay />
      <main
        id="main"
        className="relative z-10 flex min-h-[100svh] items-center"
      >
        <div className="shell">
          <p className="label mb-5">404</p>
          <h1 className="display font-bold">
            This node isn&apos;t <span className="text-accent">connected</span>.
          </h1>
          <p className="lead mt-6 max-w-[48ch]">
            The page you were looking for doesn&apos;t exist or has moved.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-[0.9rem] font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
