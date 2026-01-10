"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { GitHubStarsButton } from "@/components/animate-ui/components/buttons/github-stars";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-sm font-medium">Inbox</h1>
          </div>
          <div className="flex items-center gap-2">
            <GitHubStarsButton
              variant="outline"
              size="sm"
              username="ttiziu"
              repo="later"
            />
            <ThemeTogglerButton
              variant="ghost"
              size="sm"
              modes={["light", "dark", "system"]}
            />
        </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p className="text-sm">Your tasks will appear here</p>
        </div>
      </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
