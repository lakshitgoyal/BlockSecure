
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">YellowEye</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="outline">
            <Link href="/dashboard" prefetch={false}>
              Go to Dashboard
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By using our services, you agree to be bound by these Terms. If you do not agree to be bound by these Terms, do not use the services.
                </p>

                <h2 className="text-2xl font-bold">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  YellowEye is an AI-powered micro-finance platform that facilitates peer-to-peer lending using UPI. We provide trust scoring and risk assessment to help users make informed decisions. We are not a financial institution and do not hold or escrow funds.
                </p>

                <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
                <p className="text-muted-foreground">
                  You are responsible for your own financial decisions. YellowEye is a tool to facilitate transactions, but we are not responsible for loan defaults or any financial losses incurred. You agree to provide accurate information and use the service legally and responsibly.
                </p>

                <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, YellowEye shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} YellowEye. All rights reserved.</p>
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
