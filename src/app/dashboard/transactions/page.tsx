
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { TransactionHistory } from '@/components/dashboard/transaction-history';

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <TransactionHistory hideViewAll />
    </DashboardLayout>
  );
}
