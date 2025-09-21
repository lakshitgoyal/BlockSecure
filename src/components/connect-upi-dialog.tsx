'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpi } from '@/context/upi-provider';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

interface ConnectUpiDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ConnectUpiDialog({ isOpen, onOpenChange }: ConnectUpiDialogProps) {
  const [step, setStep] = useState(1);
  const [upiId, setUpiId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { connectUpi } = useUpi();
  const { toast } = useToast();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId) return;

    setIsLoading(true);
    // Simulate sending a verification code
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast({
        title: 'Verification Code Sent',
        description: `A code has been sent to the number linked with ${upiId}.`,
      });
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) return;

    setIsLoading(true);
    // Simulate code verification
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you'd check if the code is correct.
      if (verificationCode === '123456') {
        connectUpi(upiId);
        toast({
          title: 'UPI Connected!',
          description: `Your UPI ID ${upiId} has been successfully connected.`,
        });
        resetAndClose();
      } else {
        toast({
          title: 'Invalid Code',
          description: 'The verification code is incorrect. Please try again.',
          variant: 'destructive',
        });
      }
    }, 1500);
  };
  
  const resetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => {
        setStep(1);
        setUpiId('');
        setVerificationCode('');
        setIsLoading(false);
    }, 300); // Delay reset to allow dialog to close smoothly
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Connect UPI ID</DialogTitle>
              <DialogDescription>
                Enter your UPI ID to connect your account for payments.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSendCode}>
                <div className="grid gap-2 py-4">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input 
                        id="upi-id" 
                        placeholder="yourname@bank" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={resetAndClose}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Send Code
                    </Button>
                </DialogFooter>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Verify Your UPI ID</DialogTitle>
              <DialogDescription>
                Enter the 6-digit code sent to your registered mobile number. (Hint: it's `123456`)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleVerifyCode}>
                <div className="grid gap-2 py-4">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <Input 
                        id="verification-code" 
                        placeholder="123456" 
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        maxLength={6}
                    />
                </div>
                <DialogFooter>
                     <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Verify & Connect
                    </Button>
                </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
