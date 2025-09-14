'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { RadialBar, RadialBarChart } from 'recharts';
import { Button } from '../ui/button';

export function TrustScoreCard() {
  const score = 82;
  const chartData = [{ name: 'score', value: score, fill: 'var(--color-score)' }];
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
            <p className="text-4xl font-bold tracking-tight text-foreground">{score}</p>
            <p className="text-sm text-muted-foreground">Excellent</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
