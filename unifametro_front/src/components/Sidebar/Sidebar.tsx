"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Users,
  UserPlus,
  Clock,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  Home,
  Stethoscope,
  CalendarDays,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen: externalIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const pathname = usePathname();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: CalendarDays, label: "Agendamentos", href: "/agendamentos" },
    { icon: Users, label: "Pacientes", href: "/pacientes" },
    { icon: Stethoscope, label: "Médicos", href: "/medicos" },
    { icon: UserPlus, label: "Novo Paciente", href: "/pacientes/novo" },
    { icon: Clock, label: "Horários", href: "/horarios" },
    { icon: FileText, label: "Relatórios", href: "/relatorios" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ];

  const MenuItem = ({
    icon: Icon,
    label,
    href,
  }: {
    icon: any;
    label: string;
    href: string;
  }) => {
    const isActive = pathname === href;

    return (
      <li>
        <Link
          href={href}
          className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
            isActive
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          }`}
        >
          <Icon
            size={20}
            className={`${
              isOpen ? "mr-3" : "mx-auto"
            } transition-colors duration-200 ${
              isActive
                ? "text-white"
                : "text-gray-500 group-hover:text-blue-600"
            }`}
          />
          {isOpen && <span className="font-medium text-sm">{label}</span>}
        </Link>
      </li>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleToggle}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Stethoscope size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800 text-lg">
                  Clínica Lado A
                </h1>
                <p className="text-xs text-gray-500">Sistema Médico</p>
              </div>
            </Link>
          )}

          <button
            onClick={handleToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/configuracoes"
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
              pathname === "/configuracoes"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <Settings
              size={20}
              className={`${
                isOpen ? "mr-3" : "mx-auto"
              } transition-colors duration-200 ${
                pathname === "/configuracoes"
                  ? "text-white"
                  : "text-gray-500 group-hover:text-blue-600"
              }`}
            />
            {isOpen && (
              <span className="font-medium text-sm">Configurações</span>
            )}
          </Link>
        </div>

        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">DR</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">Unifametro</p>
                <p className="text-xs text-gray-500 truncate">
                  unifametro@fametro.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleToggle}
        className="fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-lg lg:hidden"
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default Sidebar;
