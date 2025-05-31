// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  UserPlus,
  Stethoscope,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface DashboardStats {
  appointmentsToday: number;
  totalPatients: number;
  totalDoctors: number;
  pendingAppointments: number;
  completedAppointments: number;
  canceledAppointments: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    appointmentsToday: 12,
    totalPatients: 245,
    totalDoctors: 8,
    pendingAppointments: 5,
    completedAppointments: 156,
    canceledAppointments: 3,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: "appointment",
      message: "Consulta agendada com Dr. Silva",
      time: "10 min atrás",
    },
    {
      id: 2,
      type: "patient",
      message: "Novo paciente cadastrado: Maria Santos",
      time: "25 min atrás",
    },
    {
      id: 3,
      type: "appointment",
      message: "Consulta cancelada com Dr. Costa",
      time: "1h atrás",
    },
    {
      id: 4,
      type: "doctor",
      message: "Dr. Oliveira atualizou agenda",
      time: "2h atrás",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo ao sistema de agendamentos do lado A da Unifametro
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Agendamentos Hoje
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.appointmentsToday}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarDays className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Total de Pacientes
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.totalPatients}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Total de Médicos
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.totalDoctors}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Stethoscope className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Pendentes
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.pendingAppointments}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/doctors"
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <Stethoscope className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-blue-800">
                  Gerenciar Médicos
                </span>
              </Link>

              <Link
                href="/patients"
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <Users className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-green-800">
                  Gerenciar Pacientes
                </span>
              </Link>

              <Link
                href="/appointments"
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
              >
                <CalendarDays className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-purple-800">
                  Agendamentos
                </span>
              </Link>

              <Link
                href="/reports"
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
              >
                <TrendingUp className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-orange-800">
                  Relatórios
                </span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Atividade Recente
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === "appointment" && (
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CalendarDays className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === "patient" && (
                      <div className="p-2 bg-green-100 rounded-lg">
                        <UserPlus className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === "doctor" && (
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Stethoscope className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Resumo de Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.completedAppointments}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.pendingAppointments}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Canceladas</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.canceledAppointments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
