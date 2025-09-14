'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { RadialBar, RadialBarChart } from 'recharts';
import { Button } from '../ui/button';
import { generateTrustScore, TrustScoreInput } from '@/ai/flows/trust-score-generation';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

type ScoreCategory = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';

const getScoreCategory = (score: number): ScoreCategory => {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 50) return 'Poor';
  return 'Very Poor';
};

export function TrustScoreCard() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        setLoading(true);
        const input: TrustScoreInput = {
          transactionHistory: 'Completed 5 loans, 2 borrowings. All on time.',
          walletAge: 365,
          interactionWithFraudulentAddresses: false,
          onChainBehavior: 'Regular token swaps, provides liquidity.',
        };
        const result = await generateTrustScore(input);
        setScore(result.trustScore);
      } catch (error) {
        console.error('Error fetching trust score:', error);
        setScore(0); // Set a default/error score
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);
  
  const scoreCategory = score !== null ? getScoreCategory(score) : 'Loading...';
  
  const chartData = [{ name: 'score', value: score ?? 0, fill: 'var(--color-score)' }];
  const chartConfig = {
    score: {
      label: 'Trust Score',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Trust Score</CardTitle>
        <CardDescription>Based on your on-chain activity and history.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {loading ? (
            <div className="flex flex-col items-center justify-center h-full max-h-[160px] w-full gap-2">
                <Skeleton className="h-[160px] w-[160px] rounded-full" />
                <Skeleton className="h-4 w-24" />
            </div>
        ) : (
          <>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[160px]">
              <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={-270}
                innerRadius="75%"
                outerRadius="100%"
                barSize={12}
              >
                <RadialBar dataKey="value" background={{ fill: 'hsl(var(--muted))' }} cornerRadius={6} />
              </RadialBarChart>
            </ChartContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-bold tracking-tight text-foreground">{score}</p>
                <p className="text-sm text-muted-foreground">{scoreCategory}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
