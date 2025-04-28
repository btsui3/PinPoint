"use client";

import React, {useState} from 'react';
import {Map} from './map';
import {Sidebar} from './sidebar';
import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from "@/components/ui/toaster"

export default function Home() {
  const [pins, setPins] = useState<
    {
      id: string;
      lng: number;
      lat: number;
      note: string;
    }[]
  >([]);

  const addPin = (lng: number, lat: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    setPins([...pins, {id, lng, lat, note: ''}]);
  };

  const updatePinNote = (id: string, note: string) => {
    setPins(
      pins.map((pin) => (pin.id === id ? {...pin, note} : pin))
    );
  };

  const removePin = (id: string) => {
    setPins(pins.filter((pin) => pin.id !== id));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full antialiased">
        <Sidebar
          pins={pins}
          updatePinNote={updatePinNote}
          removePin={removePin}
        />
        <Map pins={pins} addPin={addPin} />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
