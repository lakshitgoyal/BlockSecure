import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { myLoans, myBorrowings, Loan } from '@/lib/data';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const LoanList = ({ loans }: { loans: Loan[] }) => (
  <div className="space-y-4">
    {loans.map(loan => (
      <div key={loan.id}>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-sm">₹{loan.principal.toLocaleString('en-IN')} at {loan.interestRate}%</span>
          <span className="text-sm text-muted-foreground">Paid ₹{loan.paid.toLocaleString('en-IN')}</span>
        </div>
        <Progress value={(loan.paid / (loan.principal * (1 + loan.interestRate / 100))) * 100} />
      </div>
    ))}
  </div>
);

interface LoansCardProps {
  hideViewAll?: boolean;
  viewAllHref?: string;
}

export function LoansCard({ hideViewAll = false, viewAllHref = '#' }: LoansCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Portfolio</CardTitle>
          <CardDescription>Your active loans and borrowings.</CardDescription>
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
        <Tabs defaultValue="loans">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loans">My Loans</TabsTrigger>
            <TabsTrigger value="borrowings">My Borrowings</TabsTrigger>
          </TabsList>
          <TabsContent value="loans" className="mt-4">
            <LoanList loans={myLoans} />
          </TabsContent>
          <TabsContent value="borrowings" className="mt-4">
            <LoanList loans={myBorrowings} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
