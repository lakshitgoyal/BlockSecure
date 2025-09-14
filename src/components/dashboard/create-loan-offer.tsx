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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export function CreateLoanOffer() {
  const [amount, setAmount] = useState(500);
  const [period, setPeriod] = useState(30);

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
                <Label htmlFor="amount">Amount (USDC)</Label>
                <span className="text-lg font-semibold">${amount}</span>
            </div>
            <Slider
              id="amount"
              min={10}
              max={2000}
              step={10}
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
              onValueValueChange={value => setPeriod(value[0])}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Request</Button>
      </CardFooter>
    </Card>
  );
}
