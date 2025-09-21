
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { transactions, Transaction } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { assessTransactionRisk, TransactionRiskAssessmentInput } from '@/ai/flows/transaction-risk-assessment';
import { generateTrustScore, TrustScoreInput } from '@/ai/flows/trust-score-generation';
import { useState, useEffect } from 'react';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { InrLoader } from '../icons/inr-loader';

interface TransactionHistoryProps {
  hideViewAll?: boolean;
  viewAllHref?: string;
}

export function TransactionHistory({ hideViewAll = false, viewAllHref = '#' }: TransactionHistoryProps) {
  const { toast } = useToast();
  const [assessing, setAssessing] = useState<string | null>(null);
  const [userTrustScore, setUserTrustScore] = useState<number>(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const input: TrustScoreInput = {
          transactionHistory: 'Completed 5 loans, 2 borrowings. All on time.',
          walletAge: 365,
          interactionWithFraudulentAddresses: false,
          onChainBehavior: 'Regular token swaps, provides liquidity.',
        };
        const result = await generateTrustScore(input);
        setUserTrustScore(result.trustScore);
      } catch (error) {
        console.error('Error fetching trust score:', error);
      }
    };
    fetchScore();
  }, []);

  const handleAssessRisk = async (transaction: Transaction) => {
    setAssessing(transaction.id);
    try {
      const input: TransactionRiskAssessmentInput = {
        transactionData: JSON.stringify(transaction),
        userTrustScore: userTrustScore,
      };

      const result = await assessTransactionRisk(input);
      
      const isHighRisk = result.riskScore > 50;

      toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${isHighRisk ? 'text-destructive' : 'text-primary'}`} />
            <span>Risk Assessment: {isHighRisk ? "High Risk" : "Low Risk"}</span>
          </div>
        ),
        description: `Score: ${result.riskScore.toFixed(0)}/100. ${result.summary}`,
        variant: isHighRisk ? 'destructive' : 'default',
        duration: 8000
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Assessing Risk',
        description: 'Could not assess transaction risk at this time.',
        variant: 'destructive',
      });
    } finally {
      setAssessing(null);
    }
  };

  const getStatusVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'secondary';
      case 'Pending':
        return 'default';
      case 'Flagged':
        return 'destructive';
      case 'Failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions from your wallet.</CardDescription>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell className="capitalize">{tx.type}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
                </TableCell>
                <TableCell className="text-right">₹{tx.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleAssessRisk(tx)} disabled={assessing === tx.id}>
                    {assessing === tx.id ? (
                      <InrLoader className="h-4 w-4" />
                    ) : (
                      'Assess Risk'
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
