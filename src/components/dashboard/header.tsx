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
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export function DashboardHeader() {
  const { userId } = auth();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
        {userId ? (
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
