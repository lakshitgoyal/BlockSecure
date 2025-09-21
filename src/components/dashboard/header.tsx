'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useUpi } from '@/context/upi-provider';

export function DashboardHeader() {
  const { isSignedIn } = useUser();
  const { upiId, isConnected, openDialog, disconnectUpi } = useUpi();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-4">
        {isConnected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                {upiId}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>UPI Connected</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={disconnectUpi}>
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={openDialog}>
            <Wallet className="mr-2 h-4 w-4" />
            Connect UPI
          </Button>
        )}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
