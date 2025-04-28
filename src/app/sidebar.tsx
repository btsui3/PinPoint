"use client";

import React from 'react';
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {Grip, Trash2} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from "@/components/ui/button"
import {toast} from "@/hooks/use-toast"

interface SidebarProps {
  pins: {
    id: string;
    lng: number;
    lat: number;
    note: string;
  }[];
  updatePinNote: (id: string, note: string) => void;
  removePin: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  pins,
  updatePinNote,
  removePin,
}) => {
  return (
    <UISidebar collapsible="icon">
      <SidebarHeader>
        <h2 className="font-semibold text-lg">PinPoint Notes</h2>
        <p className="text-sm text-muted-foreground">
          Your map notes, all in one place.
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {pins.map((pin) => (
            <SidebarMenuItem key={pin.id}>
              <SidebarMenuButton>
                <Grip className="mr-2 h-4 w-4"/>
                {`Pin ${pin.id}`}
              </SidebarMenuButton>
              <div className="p-2">
                <textarea
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Add a note..."
                  value={pin.note}
                  onChange={(e) => updatePinNote(pin.id, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full justify-start"
                  onClick={() => {
                    removePin(pin.id);
                      toast({
                        title: "Pin removed",
                        description: "The pin has been removed from the map.",
                      })
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4"/>
                  Remove
                </Button>
              </div>
            </SidebarMenuItem>
          ))}
          {pins.length === 0 && (
            <li className="p-4 text-sm text-muted-foreground">
              Click on the map to add a pin.
            </li>
          )}
        </SidebarMenu>
      </SidebarContent>
    </UISidebar>
  );
};
