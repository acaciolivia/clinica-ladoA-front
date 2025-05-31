"use client";

import React, { createContext, useContext, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={isOpen} onToggle={toggle} />

        <div
          className={`transition-all duration-300 ${
            isOpen ? "lg:ml-64" : "lg:ml-16"
          }`}
        >
          <div className="p-8 pt-20 lg:pt-8">{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
