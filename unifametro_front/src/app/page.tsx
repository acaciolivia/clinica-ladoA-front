// app/page.tsx
export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Agendamentos Hoje
          </h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        {/* Outros cards... */}
      </div>
    </div>
  );
}
