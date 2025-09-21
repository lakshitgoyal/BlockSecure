import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarProvider defaultOpen>
        <DashboardSidebar />
        <SidebarInset>
            <DashboardHeader />
            <div className="p-4 sm:px-6 sm:py-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
  );
}
