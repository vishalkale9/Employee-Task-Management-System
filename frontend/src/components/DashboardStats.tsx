import { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Users, CheckCircle, Clock, ListTodo, Download } from 'lucide-react';

export const DashboardStats = ({ userRole }: { userRole: string }) => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tasksRes, empRes] = await Promise.all([
          api.get('/tasks'),
          userRole === 'ADMIN' ? api.get('/employees') : Promise.resolve({ data: [] })
        ]);
        
        const tasks = tasksRes.data;
        const emps = empRes.data;
        
        setStats({
          totalEmployees: emps.length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t: any) => t.status === 'COMPLETED').length,
          inProgressTasks: tasks.filter((t: any) => t.status === 'IN_PROGRESS').length,
          pendingTasks: tasks.filter((t: any) => t.status === 'PENDING').length,
          overdueTasks: tasks.filter((t: any) => t.status === 'OVERDUE').length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [userRole]);

  const handleExportCsv = async () => {
    try {
      const res = await api.get('/reports/tasks', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'tasks_report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err) {
      console.error('Failed to export CSV', err);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
        {userRole === 'ADMIN' && (
          <button 
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV Report
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userRole === 'ADMIN' && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Employees</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
          </div>
        </div>
      )}
      
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <ListTodo className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{userRole === 'ADMIN' ? 'Total Tasks' : 'My Tasks'}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">In Progress</p>
          <p className="text-2xl font-bold text-gray-900">{stats.inProgressTasks}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
        </div>
      </div>

      {userRole === 'EMPLOYEE' && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overdue Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.overdueTasks}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
