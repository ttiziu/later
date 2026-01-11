"use client";

import {
  Settings,
  MoreHorizontal,
  Trash2,
  User,
  Keyboard,
  Moon,
  LogOut,
  Github,
  HelpCircle,
  Plus,
  ListTodo,
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { getLists, createList, updateList, deleteList, deleteAllLists, type TaskList } from "@/lib/storage";
import { ListNameEditor } from "@/components/list-name-editor";
import * as React from "react";

interface AppSidebarProps {
  selectedListId: string | null;
  onSelectList: (listId: string) => void;
  onListsChange: () => void;
}

export function AppSidebar({
  selectedListId,
  onSelectList,
  onListsChange,
}: AppSidebarProps) {
  const [lists, setLists] = React.useState<TaskList[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = React.useState(false);

  React.useEffect(() => {
    setLists(getLists());
  }, []);

  const handleCreateList = () => {
    const newList = createList("New List");
    setLists(getLists());
    onSelectList(newList.id);
    setEditingId(newList.id);
    onListsChange();
  };

  const handleUpdateName = (id: string, name: string) => {
    updateList(id, name);
    setLists(getLists());
    setEditingId(null);
    onListsChange();
  };

  const handleDelete = (id: string) => {
    if (lists.length <= 1) return; // Don't delete the last list
    
    deleteList(id);
    const updated = getLists();
    setLists(updated);
    
    if (selectedListId === id && updated.length > 0) {
      onSelectList(updated[0].id);
    }
    onListsChange();
  };

  const handleDeleteAll = () => {
    deleteAllLists();
    const updated = getLists();
    setLists(updated);
    
    if (updated.length > 0) {
      onSelectList(updated[0].id);
    }
    onListsChange();
    setDeleteAllDialogOpen(false);
  };

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
                <span className="text-sm font-bold">L</span>
              </div>
              <Text variant="shine" className="text-lg font-semibold tracking-tight">
                Later
              </Text>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleCreateList}
                    className="w-full"
                  >
                    <Plus className="size-4" />
                    <span>New List</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {lists.map((list) => {
                  const isInbox = list.name === "Inbox";
                  return (
                    <SidebarMenuItem key={list.id}>
                      {editingId === list.id ? (
                        <div className="flex-1 w-full px-2">
                          <ListNameEditor
                            name={list.name}
                            onSave={(name) => handleUpdateName(list.id, name)}
                            onCancel={() => setEditingId(null)}
                          />
                        </div>
                      ) : (
                        <>
                          <SidebarMenuButton
                            isActive={selectedListId === list.id}
                            onClick={() => onSelectList(list.id)}
                            tooltip={list.name}
                          >
                            <ListTodo className="size-4" />
                            <span>{list.name}</span>
                          </SidebarMenuButton>
                          {!isInbox && (
                            <Menu
                              open={openMenuId === list.id}
                              onOpenChange={(open) => {
                                setOpenMenuId(open ? list.id : null);
                              }}
                            >
                              <MenuTrigger
                                render={
                                  <SidebarMenuAction showOnHover>
                                    <MoreHorizontal className="size-4" />
                                    <span className="sr-only">More options</span>
                                  </SidebarMenuAction>
                                }
                              />
                              <MenuPanel className="w-40" side="right" align="start" sideOffset={8}>
                                <MenuItem
                                  variant="destructive"
                                  onClick={() => handleDelete(list.id)}
                                  disabled={lists.length <= 1}
                                >
                                  <Trash2 className="size-4" />
                                  Delete
                                </MenuItem>
                              </MenuPanel>
                            </Menu>
                          )}
                        </>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
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

                <MenuItem 
                  variant="destructive" 
                  onClick={() => setDeleteAllDialogOpen(true)}
                >
                  <Trash2 className="size-4" />
                  Delete all lists
                </MenuItem>
              </MenuPanel>
            </Menu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />

      <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar todos los chats?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará todas las listas y todas las tareas. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAll}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar todo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
