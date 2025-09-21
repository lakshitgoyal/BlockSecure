import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { UpiProvider } from '@/context/upi-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UpiProvider>
    <DashboardLayout>{children}</DashboardLayout>
  </UpiProvider>;
}
