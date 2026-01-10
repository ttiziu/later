"use client";

import {
  ListTodo,
  Settings,
  Inbox,
  MoreHorizontal,
  Pencil,
  Trash2,
  User,
  Keyboard,
  Moon,
  LogOut,
  Github,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  Menu,
  MenuTrigger,
  MenuPanel,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
} from "@/components/animate-ui/components/base/menu";

const navigation = [
  {
    title: "Inbox",
    icon: Inbox,
    isActive: true,
  },
  {
    title: "All Tasks",
    icon: ListTodo,
    isActive: false,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
                <span className="text-sm font-bold">L</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Later
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  <Menu>
                    <MenuTrigger
                      render={
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">More options</span>
                        </SidebarMenuAction>
                      }
                    />
                    <MenuPanel className="w-40" side="right" align="start" sideOffset={8}>
                      <MenuItem>
                        <Pencil className="size-4" />
                        Edit
                      </MenuItem>
                      <MenuItem variant="destructive">
                        <Trash2 className="size-4" />
                        Delete
                      </MenuItem>
                    </MenuPanel>
                  </Menu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Menu>
              <MenuTrigger
                render={
                  <SidebarMenuButton tooltip="Settings">
                    <Settings className="size-4" />
                    <span>Configuración</span>
                  </SidebarMenuButton>
                }
              />
              <MenuPanel className="w-56" side="top" align="start" sideOffset={8}>
                <MenuGroup>
                  <MenuGroupLabel>Ajustes</MenuGroupLabel>
                  <MenuItem>
                    <User className="size-4" />
                    Profile
                    <MenuShortcut>⇧⌘P</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    <Moon className="size-4" />
                    Appearance
                    <MenuShortcut>⌘T</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    <Keyboard className="size-4" />
                    Keyboard shortcuts
                    <MenuShortcut>⌘K</MenuShortcut>
                  </MenuItem>
                </MenuGroup>

                <MenuSeparator />

                <MenuItem
                  onClick={() => {
                    window.open("https://github.com/ttiziu/later", "_blank", "noopener,noreferrer");
                  }}
                >
                  <Github className="size-4" />
                  GitHub
                </MenuItem>
                <MenuItem>
                  <HelpCircle className="size-4" />
                  Support
                </MenuItem>

                <MenuSeparator />

                <MenuItem variant="destructive">
                  <LogOut className="size-4" />
                  Log out
                  <MenuShortcut>⇧⌘Q</MenuShortcut>
                </MenuItem>
              </MenuPanel>
            </Menu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
