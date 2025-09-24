'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <Separator />
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about loan statuses and platform news.
                            </p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Get real-time alerts on your devices.
                            </p>
                        </div>
                        <Switch id="push-notifications" />
                    </div>
                </div>
                 <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <Separator />
                    <RadioGroup 
                      value={theme}
                      onValueChange={setTheme}
                      className="p-4 space-y-2 rounded-lg border"
                    >
                        <Label>Appearance</Label>
                        <p className="text-sm text-muted-foreground pb-2">
                            Select the theme for the dashboard.
                        </p>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="theme-light" />
                            <Label htmlFor="theme-light">Light</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dark" id="theme-dark" />
                            <Label htmlFor="theme-dark">Dark</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="system" id="theme-system" />
                            <Label htmlFor="theme-system">System</Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Preferences</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
