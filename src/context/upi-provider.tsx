'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConnectUpiDialog } from '@/components/connect-upi-dialog';

interface UpiContextType {
  upiId: string | null;
  isConnected: boolean;
  connectUpi: (id: string) => void;
  disconnectUpi: () => void;
  openDialog: () => void;
}

const UpiContext = createContext<UpiContextType | undefined>(undefined);

export function UpiProvider({ children }: { children: ReactNode }) {
  const [upiId, setUpiId] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const connectUpi = (id: string) => {
    setUpiId(id);
    setDialogOpen(false);
  };

  const disconnectUpi = () => {
    setUpiId(null);
  };
  
  const openDialog = () => {
      setDialogOpen(true);
  }

  const value = {
    upiId,
    isConnected: upiId !== null,
    connectUpi,
    disconnectUpi,
    openDialog,
  };

  return (
    <UpiContext.Provider value={value}>
      {children}
      <ConnectUpiDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />
    </UpiContext.Provider>
  );
}

export function useUpi() {
  const context = useContext(UpiContext);
  if (context === undefined) {
    throw new Error('useUpi must be used within a UpiProvider');
  }
  return context;
}
