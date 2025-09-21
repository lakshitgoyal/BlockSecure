
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">YellowEye</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Dashboard
          </Link>
          <Link href="/sign-in" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Sign In
          </Link>
          <Button asChild>
            <Link href="/sign-up" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered DeFi Micro-Finance & Fraud Detection
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    YellowEye leverages cutting-edge AI to provide trust scores, assess transaction risks, and offer a secure micro-lending platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard" prefetch={false}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/finance-hero/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="finance technology abstract"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 YellowEye. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
