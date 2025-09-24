import Link from 'next/link';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarProvider defaultOpen>
        <DashboardSidebar />
        <SidebarInset>
            <DashboardHeader />
            <main className="flex-1 p-4 sm:px-6 sm:py-4">{children}</main>
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
        </SidebarInset>
      </SidebarProvider>
  );
}
