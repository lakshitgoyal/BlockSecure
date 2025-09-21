
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useUpi } from '@/context/upi-provider';
import { useToast } from '@/hooks/use-toast';

export function CreateLoanOffer() {
  const [amount, setAmount] = useState(10000);
  const [period, setPeriod] = useState(30);
  const { isConnected, openDialog } = useUpi();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!isConnected) {
      openDialog();
    } else {
      toast({
        title: 'Request Submitted',
        description: `Your loan request for ₹${amount.toLocaleString('en-IN')} has been submitted.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Loan</CardTitle>
        <CardDescription>
          Specify the amount and terms for your loan request.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-2">
            <div className="flex justify-between items-baseline">
                <Label htmlFor="amount">Amount (INR)</Label>
                <span className="text-lg font-semibold">₹{amount.toLocaleString('en-IN')}</span>
            </div>
            <Slider
              id="amount"
              min={1000}
              max={100000}
              step={1000}
              value={[amount]}
              onValueChange={value => setAmount(value[0])}
            />
          </div>
          <div className="grid gap-2">
             <div className="flex justify-between items-baseline">
                <Label htmlFor="period">Repayment Period (Days)</Label>
                <span className="text-lg font-semibold">{period} Days</span>
            </div>
            <Slider
              id="period"
              min={7}
              max={180}
              step={1}
              value={[period]}
              onValueChange={value => setPeriod(value[0])}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Request</Button>
      </CardFooter>
    </Card>
  );
}
