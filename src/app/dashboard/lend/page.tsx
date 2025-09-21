import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { LoanOffers } from '@/components/dashboard/loan-offers';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function LendPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            <CardDescription>Average APR</CardDescription>
            <CardTitle className="text-4xl">6.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Stable since last week</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <LoanOffers hideViewAll />
      </div>
    </DashboardLayout>
  );
}
