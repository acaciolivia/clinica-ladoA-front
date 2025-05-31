"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Eye, Trash2, X, User } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
  createdAt: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    bloodType: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
  });

  // Tipos sanguíneos
  const bloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
    "Não informado",
  ];

  // Simular dados iniciais
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: "1",
        name: "Ana Costa",
        email: "ana.costa@email.com",
        phone: "(85) 99999-1111",
        cpf: "123.456.789-00",
        birthDate: "1990-03-15",
        address: "Rua das Palmeiras, 456 - Aldeota, Fortaleza/CE",
        emergencyContact: "Carlos Costa",
        emergencyPhone: "(85) 88888-1111",
        bloodType: "O+",
        allergies: "Dipirona, Penicilina",
        medications: "Omeprazol 20mg",
        medicalHistory: "Hipertensão arterial controlada",
        createdAt: "2024-01-10",
      },
      {
        id: "2",
        name: "Pedro Oliveira",
        email: "pedro.oliveira@email.com",
        phone: "(85) 77777-2222",
        cpf: "987.654.321-00",
        birthDate: "1985-07-22",
        address: "Av. Beira Mar, 789 - Meireles, Fortaleza/CE",
        emergencyContact: "Maria Oliveira",
        emergencyPhone: "(85) 66666-2222",
        bloodType: "A+",
        allergies: "Nenhuma alergia conhecida",
        medications: "Nenhum medicamento contínuo",
        medicalHistory: "Cirurgia de apendicite em 2020",
        createdAt: "2024-01-15",
      },
    ];
    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cpf.includes(searchTerm) ||
      patient.phone.includes(searchTerm)
  );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      birthDate: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      bloodType: "",
      allergies: "",
      medications: "",
      medicalHistory: "",
    });
  };

  const openModal = (mode: "create" | "edit" | "view", patient?: Patient) => {
    setModalMode(mode);
    setSelectedPatient(patient || null);

    if (patient) {
      setFormData({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        cpf: patient.cpf,
        birthDate: patient.birthDate,
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        emergencyPhone: patient.emergencyPhone,
        bloodType: patient.bloodType,
        allergies: patient.allergies,
        medications: patient.medications,
        medicalHistory: patient.medicalHistory,
      });
    } else {
      resetForm();
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalMode === "create") {
      const newPatient: Patient = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPatients([...patients, newPatient]);
    } else if (modalMode === "edit" && selectedPatient) {
      setPatients(
        patients.map((patient) =>
          patient.id === selectedPatient.id
            ? { ...patient, ...formData }
            : patient
        )
      );
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
      setPatients(patients.filter((patient) => patient.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gerenciamento de Pacientes
              </h1>
              <p className="text-gray-600 mt-1">
                Cadastre, edite e visualize informações dos pacientes
              </p>
            </div>
            <button
              onClick={() => openModal("create")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Novo Paciente
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nome, email, CPF ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Total de Pacientes
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {patients.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Pacientes Adultos
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {patients.filter((p) => calculateAge(p.birthDate) >= 18).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Pacientes Menores
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {patients.filter((p) => calculateAge(p.birthDate) < 18).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Resultados da Busca
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {filteredPatients.length}
            </p>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo Sanguíneo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.cpf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {calculateAge(patient.birthDate)} anos
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(patient.birthDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        {patient.bloodType || "N/I"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal("view", patient)}
                          className="text-green-600 hover:text-green-900"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal("edit", patient)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
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

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-500 text-lg mt-2">
                Nenhum paciente encontrado
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modalMode === "create" && "Novo Paciente"}
                    {modalMode === "edit" && "Editar Paciente"}
                    {modalMode === "view" && "Detalhes do Paciente"}
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
                    {/* Informações Pessoais */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                        Informações Pessoais
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.name}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CPF
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.cpf}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Nascimento
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.birthDate &&
                              formatDate(selectedPatient.birthDate)}
                            (
                            {selectedPatient?.birthDate &&
                              calculateAge(selectedPatient.birthDate)}{" "}
                            anos)
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo Sanguíneo
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.bloodType || "Não informado"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endereço
                        </label>
                        <p className="text-gray-900">
                          {selectedPatient?.address}
                        </p>
                      </div>
                    </div>

                    {/* Contato de Emergência */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                        Contato de Emergência
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.emergencyContact}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone
                          </label>
                          <p className="text-gray-900">
                            {selectedPatient?.emergencyPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Informações Médicas */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                        Informações Médicas
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alergias
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            {selectedPatient?.allergies ||
                              "Nenhuma alergia informada"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medicamentos em Uso
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            {selectedPatient?.medications ||
                              "Nenhum medicamento em uso"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Histórico Médico
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            {selectedPatient?.medicalHistory ||
                              "Nenhum histórico médico informado"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Cadastro
                      </label>
                      <p className="text-gray-900">
                        {selectedPatient?.createdAt &&
                          formatDate(selectedPatient.createdAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informações Pessoais */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                        Informações Pessoais
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome Completo *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CPF *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.cpf}
                            onChange={(e) =>
                              setFormData({ ...formData, cpf: e.target.value })
                            }
                            placeholder="000.000.000-00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="(85) 99999-9999"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Nascimento *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.birthDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                birthDate: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo Sanguíneo
                          </label>
                          <select
                            value={formData.bloodType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bloodType: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Selecione o tipo sanguíneo</option>
                            {bloodTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endereço Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          placeholder="Rua, número, bairro, cidade, estado"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Contato de Emergência */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                        Contato de Emergência
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Contato *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.emergencyContact}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                emergencyContact: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone do Contato *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.emergencyPhone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                emergencyPhone: e.target.value,
                              })
                            }
                            placeholder="(85) 99999-9999"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Informações Médicas */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">
                        Informações Médicas
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alergias
                          </label>
                          <textarea
                            value={formData.allergies}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                allergies: e.target.value,
                              })
                            }
                            placeholder="Descreva as alergias conhecidas..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medicamentos em Uso
                          </label>
                          <textarea
                            value={formData.medications}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                medications: e.target.value,
                              })
                            }
                            placeholder="Liste os medicamentos em uso contínuo..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Histórico Médico
                          </label>
                          <textarea
                            value={formData.medicalHistory}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                medicalHistory: e.target.value,
                              })
                            }
                            placeholder="Descreva o histórico médico relevante..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {modalMode === "create" ? "Cadastrar" : "Salvar"}
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
