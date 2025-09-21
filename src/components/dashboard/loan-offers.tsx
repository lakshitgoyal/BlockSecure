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
import Link from 'next/link';

interface LoanOffersProps {
  hideViewAll?: boolean;
  viewAllHref?: string;
}

export function LoanOffers({ hideViewAll = false, viewAllHref = '#' }: LoanOffersProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div>
          <CardTitle>Available Loan Requests</CardTitle>
          <CardDescription>Opportunities to lend your assets.</CardDescription>
        </div>
        {!hideViewAll && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href={viewAllHref}>
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
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
