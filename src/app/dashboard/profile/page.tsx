
'use client';
import { TrustScoreCard } from '@/components/dashboard/trust-score-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUpi } from '@/context/upi-provider';

export default function ProfilePage() {
  const { upiId, isConnected, openDialog, disconnectUpi } = useUpi();
  
  return (
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
                <TrustScoreCard />
            </div>
            <div className="md:col-span-2 grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>Manage your profile and payment settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div>
                            <h3 className="font-medium">UPI Connection</h3>
                            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground p-3 bg-muted rounded-md">
                                {isConnected ? (
                                    <div className='flex items-center gap-2'>
                                        <span className="font-bold text-primary text-lg">₹</span>
                                        <span>{upiId}</span>
                                    </div>
                                ) : (
                                    <p>No UPI ID connected.</p>
                                )}
                                <Button variant={isConnected ? "outline" : "default"} onClick={openDialog}>
                                    {isConnected ? 'Change UPI' : 'Connect UPI'}
                                </Button>
                            </div>
                            {isConnected && <Button variant="link" size="sm" className="p-0 h-auto mt-1" onClick={disconnectUpi}>Disconnect UPI</Button>}
                       </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>How to Improve Your Trust Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Your Trust Score is a key factor in securing loans and getting better rates. To improve your score, ensure you complete repayments on time, maintain a healthy transaction history, and avoid interactions with flagged or fraudulent accounts. A higher score demonstrates your reliability within the YellowEye ecosystem.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
  );
}
