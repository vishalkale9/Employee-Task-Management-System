import { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Edit2, Trash2, Plus, X, CheckCircle, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';

export const TaskManagement = ({ userRole }: { userRole: string }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'PENDING',
    startDate: '',
    dueDate: '',
    userId: '',
    attachment: ''
  });

  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      const taskRes = await api.get('/tasks');
      setTasks(taskRes.data);
      if (userRole === 'ADMIN') {
        const empRes = await api.get('/employees');
        // employees return includes admins, filter or just show all
        setEmployees(empRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(formData.dueDate) < new Date(formData.startDate)) {
      toast.error("Due Date must not be earlier than Start Date.");
      return;
    }
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, formData);
        toast.success("Task updated successfully!");
      } else {
        await api.post('/tasks', { ...formData, userId: Number(formData.userId) });
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Action failed.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be smaller than 5MB");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    setUploading(true);
    try {
      const res = await api.post('/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, attachment: res.data.path }));
      toast.success("File uploaded successfully");
    } catch (err) {
      toast.error("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleStatusUpdate = async (id: number, currentData: any, newStatus: string) => {
    try {
      const sanitizedData = {
        title: currentData.title,
        description: currentData.description,
        priority: currentData.priority,
        status: newStatus,
        startDate: currentData.startDate,
        dueDate: currentData.dueDate,
        userId: currentData.userId,
        attachment: currentData.attachment
      };
      await api.put(`/tasks/${id}`, sanitizedData);
      toast.success(`Task marked as ${newStatus.replace('_', ' ')}`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', priority: 'MEDIUM', status: 'PENDING', startDate: '', dueDate: '', userId: employees.length > 0 ? String(employees[0].id) : '', attachment: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (task: any) => {
    if (task.status === 'COMPLETED') {
      toast.error("Completed tasks cannot be edited.");
      return;
    }
    setEditingId(task.id);
    setFormData({ 
      title: task.title, 
      description: task.description, 
      priority: task.priority, 
      status: task.status, 
      startDate: new Date(task.startDate).toISOString().split('T')[0], 
      dueDate: new Date(task.dueDate).toISOString().split('T')[0], 
      userId: String(task.userId),
      attachment: task.attachment || ''
    });
    setIsModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'HIGH') return 'text-red-600 bg-red-100';
    if (priority === 'MEDIUM') return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusColor = (status: string) => {
    if (status === 'COMPLETED') return 'text-emerald-600 bg-emerald-100 border-emerald-200';
    if (status === 'IN_PROGRESS') return 'text-blue-600 bg-blue-100 border-blue-200';
    if (status === 'OVERDUE') return 'text-red-600 bg-red-100 border-red-200';
    return 'text-gray-600 bg-gray-100 border-gray-200';
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{userRole === 'ADMIN' ? 'Company Tasks' : 'My Assigned Tasks'}</h2>
        {userRole === 'ADMIN' && (
          <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Create Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className={`p-5 rounded-xl border ${getStatusColor(task.status)} relative flex flex-col bg-opacity-50`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-900">{task.title}</h3>
              <span className={`text-xs px-2 py-1 font-bold rounded ${getPriorityColor(task.priority)}`}>{task.priority}</span>
            </div>
            <p className="text-sm text-gray-700 mb-4 flex-grow">{task.description}</p>
            
            <div className="text-xs text-gray-500 mb-4 space-y-1">
              <p><strong>Start:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
              <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              {userRole === 'ADMIN' && <p><strong>Assigned to:</strong> {task.assignedTo?.fullName || 'Unknown'}</p>}
              {task.attachment && (
                <p>
                  <strong>Attachment: </strong> 
                  <a href={`http://localhost:3000${task.attachment}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 inline-flex">
                    <Paperclip className="w-3 h-3" /> View File
                  </a>
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-black/10">
              {userRole === 'ADMIN' ? (
                <span className="font-bold text-sm tracking-wide uppercase">{task.status.replace('_', ' ')}</span>
              ) : (
                <select 
                  value={task.status} 
                  onChange={(e) => handleStatusUpdate(task.id, task, e.target.value)}
                  className="bg-transparent font-bold text-sm tracking-wide uppercase cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  {task.status === 'OVERDUE' && <option value="OVERDUE">OVERDUE</option>}
                </select>
              )}
              
              <div className="flex gap-2">
                {userRole === 'ADMIN' && (
                  <>
                    <button onClick={() => openEditModal(task)} className="p-2 text-blue-600 hover:bg-blue-200 rounded-full transition" title="Edit Task">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(task.id)} className="p-2 text-red-600 hover:bg-red-200 rounded-full transition" title="Delete Task">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            No tasks found.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><X className="w-6 h-6" /></button>
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Task</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required disabled={userRole !== 'ADMIN' && !!editingId} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required disabled={userRole !== 'ADMIN' && !!editingId} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} disabled={userRole !== 'ADMIN' && !!editingId}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                {userRole !== 'ADMIN' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="OVERDUE">Overdue</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required disabled={userRole !== 'ADMIN' && !!editingId} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} required disabled={userRole !== 'ADMIN' && !!editingId} />
                </div>
              </div>

              {userRole === 'ADMIN' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded" value={formData.userId} onChange={(e) => setFormData({...formData, userId: e.target.value})} required>
                    <option value="" disabled>Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.role})</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (PDF/JPG/PNG max 5MB)</label>
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  disabled={uploading || (userRole !== 'ADMIN' && !!editingId)}
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                {formData.attachment && !uploading && (
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                    <Paperclip className="w-4 h-4" /> File attached!
                  </p>
                )}
              </div>

              <button type="submit" disabled={uploading} className="w-full py-3 mt-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50">Save Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
