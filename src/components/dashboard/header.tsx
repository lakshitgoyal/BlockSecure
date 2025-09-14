import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Wallet, CircleUser } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';

export function DashboardHeader() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {userAvatar ? (
                <Image
                  src={userAvatar.imageUrl}
                  width={40}
                  height={40}
                  alt={userAvatar.description}
                  data-ai-hint={userAvatar.imageHint}
                  className="rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
