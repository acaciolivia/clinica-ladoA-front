"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Eye,
  Trash2,
  X,
  Calendar,
  Clock,
  User,
  UserCheck,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: "agendada" | "cancelada" | "realizada" | "remarcada";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [formData, setFormData] = useState<{
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    status: "agendada" | "cancelada" | "realizada" | "remarcada";
    notes: string;
  }>({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "agendada",
    notes: "",
  });

  const statusOptions = [
    {
      value: "agendada",
      label: "Agendada",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "cancelada",
      label: "Cancelada",
      color: "bg-red-100 text-red-800",
    },
    {
      value: "realizada",
      label: "Realizada",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "remarcada",
      label: "Remarcada",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  // Simular dados iniciais
  useEffect(() => {
    // Mock doctors data
    const mockDoctors: Doctor[] = [
      { id: "1", name: "Dr. Uendel Oliveira", specialty: "Cardiologia" },
      { id: "2", name: "Dra. Lívia Acácio", specialty: "Pediatria" },
    ];

    // Mock patients data
    const mockPatients: Patient[] = [
      {
        id: "1",
        name: "Uendel Martins",
        email: "joao@email.com",
        phone: "(85) 99999-1111",
      },
      {
        id: "2",
        name: "Lívia Acácio",
        email: "maria@email.com",
        phone: "(85) 88888-2222",
      },
      {
        id: "3",
        name: "Antonio Gabriel",
        email: "pedro@email.com",
        phone: "(85) 77777-3333",
      },
    ];

    // Mock appointments data
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        patientName: "Uendel Martins",
        patientEmail: "joao@email.com",
        patientPhone: "(85) 99999-1111",
        doctorName: "Dr. Uendel Oliveira",
        doctorSpecialty: "Cardiologia",
        date: "2025-06-02",
        time: "09:00",
        status: "agendada",
        notes: "Consulta de rotina - hipertensão",
        createdAt: "2025-05-30",
        updatedAt: "2025-05-30",
      },
      {
        id: "2",
        patientName: "Lívia Acácio",
        patientEmail: "maria@email.com",
        patientPhone: "(85) 88888-2222",
        doctorName: "Dra. Lívia Acácio",
        doctorSpecialty: "Pediatria",
        date: "2025-06-01",
        time: "14:30",
        status: "realizada",
        notes: "Consulta de acompanhamento infantil",
        createdAt: "2025-05-25",
        updatedAt: "2025-06-01",
      },
      {
        id: "3",
        patientName: "Antonio Gabriel",
        patientEmail: "pedro@email.com",
        patientPhone: "(85) 77777-3333",
        doctorName: "Dr. Uendel Oliveira",
        doctorSpecialty: "Cardiologia",
        date: "2025-06-03",
        time: "10:00",
        status: "remarcada",
        notes: "Paciente solicitou remarcação",
        createdAt: "2025-05-28",
        updatedAt: "2025-05-31",
      },
    ];

    setDoctors(mockDoctors);
    setPatients(mockPatients);
    setAppointments(mockAppointments);
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorSpecialty
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || appointment.status === statusFilter;
    const matchesDate = dateFilter === "" || appointment.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const resetForm = () => {
    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      status: "agendada",
      notes: "",
    });
  };

  const openModal = (
    mode: "create" | "edit" | "view",
    appointment?: Appointment
  ) => {
    setModalMode(mode);
    setSelectedAppointment(appointment || null);

    if (appointment) {
      // Find patient and doctor IDs based on names (in real app, you'd have these IDs)
      const patient = patients.find((p) => p.name === appointment.patientName);
      const doctor = doctors.find((d) => d.name === appointment.doctorName);

      setFormData({
        patientId: patient?.id || "",
        doctorId: doctor?.id || "",
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        notes: appointment.notes,
      });
    } else {
      resetForm();
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPatient = patients.find((p) => p.id === formData.patientId);
    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);

    if (!selectedPatient || !selectedDoctor) return;

    if (modalMode === "create") {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientName: selectedPatient.name,
        patientEmail: selectedPatient.email,
        patientPhone: selectedPatient.phone,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        date: formData.date,
        time: formData.time,
        status: formData.status,
        notes: formData.notes,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setAppointments([...appointments, newAppointment]);
    } else if (modalMode === "edit" && selectedAppointment) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? {
                ...appointment,
                patientName: selectedPatient.name,
                patientEmail: selectedPatient.email,
                patientPhone: selectedPatient.phone,
                doctorName: selectedDoctor.name,
                doctorSpecialty: selectedDoctor.specialty,
                date: formData.date,
                time: formData.time,
                status: formData.status,
                notes: formData.notes,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : appointment
        )
      );
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString + "T00:00:00").toLocaleDateString("pt-BR");
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusStyle = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusStats = () => {
    return statusOptions.map((option) => ({
      ...option,
      count: appointments.filter((a) => a.status === option.value).length,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">
                Gerenciamento de Agendamentos
              </h1>
              <p className="text-gray-600 mt-1">
                Agende, edite e visualize consultas médicas
              </p>
            </div>
            <button
              onClick={() => openModal("create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nova Consulta
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar por paciente, médico ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700">Total</h3>
            <p className="text-2xl font-bold text-blue-600">
              {appointments.length}
            </p>
          </div>
          {getStatusStats().map((stat) => (
            <div key={stat.value} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-blue-600">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Horário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patientPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserCheck className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.doctorName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.doctorSpecialty}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(appointment.date)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(appointment.time)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                          appointment.status
                        )}`}
                      >
                        {
                          statusOptions.find(
                            (s) => s.value === appointment.status
                          )?.label
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal("view", appointment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal("edit", appointment)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">
                Nenhum agendamento encontrado
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modalMode === "create" && "Nova Consulta"}
                    {modalMode === "edit" && "Editar Consulta"}
                    {modalMode === "view" && "Detalhes da Consulta"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {modalMode === "view" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Paciente
                        </label>
                        <p className="text-gray-900">
                          {selectedAppointment?.patientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedAppointment?.patientEmail}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedAppointment?.patientPhone}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Médico
                        </label>
                        <p className="text-gray-900">
                          {selectedAppointment?.doctorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedAppointment?.doctorSpecialty}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data
                        </label>
                        <p className="text-gray-900">
                          {selectedAppointment?.date &&
                            formatDate(selectedAppointment.date)}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Horário
                        </label>
                        <p className="text-gray-900">
                          {selectedAppointment?.time}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedAppointment?.status
                              ? getStatusStyle(selectedAppointment.status)
                              : ""
                          }`}
                        >
                          {
                            statusOptions.find(
                              (s) => s.value === selectedAppointment?.status
                            )?.label
                          }
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Criação
                        </label>
                        <p className="text-gray-900">
                          {selectedAppointment?.createdAt &&
                            formatDate(selectedAppointment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observações
                      </label>
                      <p className="text-gray-900">
                        {selectedAppointment?.notes || "Nenhuma observação"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Paciente *
                        </label>
                        <select
                          required
                          value={formData.patientId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              patientId: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecione um paciente</option>
                          {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                              {patient.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Médico *
                        </label>
                        <select
                          required
                          value={formData.doctorId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              doctorId: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecione um médico</option>
                          {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Horário *
                        </label>
                        <select
                          required
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecione um horário</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status *
                        </label>
                        <select
                          required
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              status: e.target.value as any,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observações
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={3}
                        placeholder="Observações sobre a consulta..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {modalMode === "create" ? "Agendar" : "Salvar"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
