import { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    department: '',
    designation: '',
    role: 'EMPLOYEE'
  });

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData);
      } else {
        await api.post('/employees', formData);
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('Action failed. Check console for details.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ fullName: '', email: '', password: '', department: '', designation: '', role: 'EMPLOYEE' });
    setIsModalOpen(true);
  };

  const openEditModal = (emp: any) => {
    setEditingId(emp.id);
    setFormData({ fullName: emp.fullName, email: emp.email, password: '', department: emp.department || '', designation: emp.designation || '', role: emp.role });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow mt-8 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Employee Management</h2>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Department</th>
              <th className="p-3 font-semibold">Designation</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-gray-800">{emp.fullName}</td>
                <td className="p-3 text-gray-600">{emp.email}</td>
                <td className="p-3 text-gray-600">{emp.department || '-'}</td>
                <td className="p-3 text-gray-600">{emp.designation || '-'}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${emp.role === 'ADMIN' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'}`}>
                    {emp.role}
                  </span>
                </td>
                <td className="p-3 flex gap-4">
                  <button onClick={() => openEditModal(emp)} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><X className="w-6 h-6" /></button>
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Employee</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
              <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required disabled={!!editingId} />
              {!editingId && <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />}
              
              <input type="text" placeholder="Department" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
              <input type="text" placeholder="Designation" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
              
              <select className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">{editingId ? 'Update Employee' : 'Create Employee'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
