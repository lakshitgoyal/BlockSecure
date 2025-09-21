
'use client';

import { useUpi } from '@/context/upi-provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';

export function UpiConnectCard() {
    const { isConnected, openDialog } = useUpi();

    if (isConnected) {
        return null;
    }

    return (
        <Card className="lg:col-span-2 bg-primary/10 border-primary/40">
            <CardHeader>
                <CardTitle>Connect Your UPI</CardTitle>
                <CardDescription>Link your UPI ID to start lending and borrowing on YellowEye.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={openDialog} className="w-full">
                    <IndianRupee className="mr-2 h-4 w-4" />
                    Connect UPI
                </Button>
            </CardFooter>
        </Card>
    );
}
