import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, CheckSquare, Bell, Menu, X } from 'lucide-react';
import { EmployeeManagement } from '../components/EmployeeManagement';
import { TaskManagement } from '../components/TaskManagement';
import { DashboardStats } from '../components/DashboardStats';
import { Notifications } from '../components/Notifications';
import { Navbar } from '../components/Navbar';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [navigate]);

  if (!user) return null;

  const NavItem = ({ id, icon: Icon, label, adminOnly = false }: any) => {
    if (adminOnly && user.role !== 'ADMIN') return null;
    const isActive = activeTab === id;
    
    return (
      <button 
        onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 border ${
          isActive 
            ? 'bg-blue-50 border-blue-200 text-blue-700' 
            : 'border-transparent text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Simple Flat Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-50 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isSidebarOpen ? 'translate-x-0 mt-16 lg:mt-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 flex-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Navigation</h3>
            <nav className="space-y-1">
              <NavItem id="tasks" icon={CheckSquare} label="Tasks" />
              <NavItem id="employees" icon={Users} label="Employees" adminOnly={true} />
              
              {/* Hide Notifications from Admin */}
              {user.role === 'EMPLOYEE' && (
                <NavItem id="notifications" icon={Bell} label="Notifications" />
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-white border border-gray-300 rounded text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          <div className="max-w-7xl mx-auto w-full space-y-6">
            <DashboardStats userRole={user.role} />

            <div className="mt-4">
              {activeTab === 'tasks' && <TaskManagement userRole={user.role} />}
              {activeTab === 'employees' && user.role === 'ADMIN' && <EmployeeManagement />}
              {activeTab === 'notifications' && user.role === 'EMPLOYEE' && <Notifications />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
