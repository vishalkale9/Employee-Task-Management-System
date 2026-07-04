import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { EmployeeManagement } from '../components/EmployeeManagement';

export const Dashboard = () => {
  const navigate = useNavigate();
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <button onClick={() => navigate('/login')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass sticky top-0 z-50 flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8" />
          Dashboard
        </div>
        <div className="flex items-center gap-6">
          <span className="font-medium text-gray-700">Hello, {user.fullName}</span>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-6 py-2 rounded-full font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Overview</h1>
        
        {user && <EmployeeManagement />}
        
      </main>
    </div>
  );
};
