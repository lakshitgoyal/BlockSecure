
'use client';
import { TrustScoreCard } from '@/components/dashboard/trust-score-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUpi } from '@/context/upi-provider';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { upiId, isConnected, openDialog, disconnectUpi } = useUpi();
  const { user, isLoaded } = useUser();
  
  return (
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 grid gap-8 auto-rows-max">
                <Card>
                    <CardHeader className="items-center text-center">
                        {isLoaded ? (
                             <Image 
                                src={user?.imageUrl ?? ''} 
                                alt={user?.fullName ?? 'User avatar'} 
                                width={80} 
                                height={80} 
                                className="rounded-full"
                            />
                        ) : (
                            <Skeleton className="w-20 h-20 rounded-full" />
                        )}
                        <CardTitle>{isLoaded ? user?.fullName : <Skeleton className="h-6 w-32 mt-2" />}</CardTitle>
                        <CardDescription>{isLoaded ? user?.primaryEmailAddress?.emailAddress : <Skeleton className="h-4 w-40 mt-1" />}</CardDescription>
                    </CardHeader>
                </Card>
                <TrustScoreCard />
            </div>
            <div className="md:col-span-2 grid gap-8 auto-rows-max">
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Total Lent</CardDescription>
                            <CardTitle className="text-4xl">₹1,25,000</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">+15% from last month</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Total Borrowed</CardDescription>
                            <CardTitle className="text-4xl">₹55,000</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">+10% from last month</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile & Payment Settings</CardTitle>
                        <CardDescription>Manage your personal and payment information.</CardDescription>
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
