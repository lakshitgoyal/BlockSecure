
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { ShieldCheck, IndianRupee, Bot, Rocket, UserPlus, FileText } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">BlockSecure</span>
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
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Micro-Finance & Fraud Detection
                  </h1>
                  <p className="max-w-[1200px] text-muted-foreground md:text-xl">
                    BlockSecure is the AI-powered platform for secure peer-to-peer lending, simplifying micro-finance with the trust of UPI.
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
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Secure, Smart, and Simple</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            BlockSecure combines AI-driven security with the simplicity of UPI to create a trustworthy micro-lending ecosystem.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                            <h3 className="text-xl font-bold">AI Trust Score</h3>
                        </div>
                        <p className="text-muted-foreground">Our AI analyzes on-chain behavior and transaction history to generate a dynamic trust score, ensuring you connect with reliable peers.</p>
                    </div>
                    <div className="grid gap-1">
                         <div className="flex items-center gap-2">
                            <IndianRupee className="h-8 w-8 text-primary" />
                            <h3 className="text-xl font-bold">UPI-Based Lending</h3>
                        </div>
                        <p className="text-muted-foreground">Participate in a seamless peer-to-peer financial network using just your UPI ID. No complex crypto wallets needed.</p>
                    </div>
                    <div className="grid gap-1">
                         <div className="flex items-center gap-2">
                            <Bot className="h-8 w-8 text-primary" />
                            <h3 className="text-xl font-bold">Real-Time Risk Assessment</h3>
                        </div>
                        <p className="text-muted-foreground">Evaluate the risk associated with any transaction before you commit, with instant AI-powered fraud alerts to protect your account.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">How It Works</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start in Three Simple Steps</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Getting started with BlockSecure is quick and easy. Follow these steps to join our secure lending community.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    <div className="grid gap-4 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <UserPlus className="h-8 w-8" />
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">1. Create Your Account</h3>
                            <p className="text-sm text-muted-foreground">Sign up in minutes and connect your UPI ID to activate your profile for lending and borrowing.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">2. Build Your Trust Score</h3>
                            <p className="text-sm text-muted-foreground">Our AI generates your Trust Score based on your financial history, enabling fair and transparent lending decisions.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Rocket className="h-8 w-8" />
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">3. Lend or Borrow</h3>
                            <p className="text-sm text-muted-foreground">Browse loan requests or create your own. Securely transact with peers thanks to our AI-powered risk assessment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Join the Future of Secure Micro-Finance?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create an account today and experience a smarter, safer way to lend and borrow.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                 <Button asChild size="lg">
                    <Link href="/dashboard" prefetch={false}>
                      Get Started
                    </Link>
                  </Button>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 BlockSecure. All rights reserved.</p>
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
