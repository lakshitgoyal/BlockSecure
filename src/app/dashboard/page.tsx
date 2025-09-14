import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { TrustScoreCard } from '@/components/dashboard/trust-score-card';
import { LoansCard } from '@/components/dashboard/loans-card';
import { TransactionHistory } from '@/components/dashboard/transaction-history';
import { CreateLoanOffer } from '@/components/dashboard/create-loan-offer';
import { LoanOffers } from '@/components/dashboard/loan-offers';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <TrustScoreCard />
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Lent</CardDescription>
            <CardTitle className="text-4xl">$12,405</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+15% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Borrowed</CardDescription>
            <CardTitle className="text-4xl">$5,231</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+10% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Loans</CardDescription>
            <CardTitle className="text-4xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+3 since last month</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
          <TransactionHistory />
          <LoansCard />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
          <CreateLoanOffer />
          <LoanOffers />
        </div>
      </div>
    </DashboardLayout>
  );
}
