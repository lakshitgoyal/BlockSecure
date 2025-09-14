import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loanOffers } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export function LoanOffers() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div>
          <CardTitle>Available Loan Requests</CardTitle>
          <CardDescription>Opportunities to lend your assets.</CardDescription>
        </div>
         <Button asChild size="sm" className="ml-auto gap-1">
          <a href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loanOffers.map(offer => (
            <div
              key={offer.id}
              className="flex items-center justify-between rounded-lg border bg-card p-3"
            >
              <div>
                <p className="font-semibold">
                  ${offer.amount} at {offer.interestRate}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {offer.repaymentPeriod} days | Trust Score: {offer.borrowerTrustScore}
                </p>
              </div>
              <Button size="sm">Lend</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
