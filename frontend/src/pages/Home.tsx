import { Link } from 'react-router-dom';
import { AnimatedText } from '../components/AnimatedText';
import { ArrowRight, CheckCircle, Users, BarChart } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <CheckCircle className="w-8 h-8" />
          TaskFlow
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center pt-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-gray-900">The Modern Way to</span>
          <br />
          <AnimatedText />
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Empower your team with our premium task management system. Assign tasks, track progress, and view insightful dashboards all in one beautiful interface.
        </p>
        
        <Link to="/register" className="group flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold bg-gray-900 text-white hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-200">
          Start for free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 mb-24">
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Task Tracking</h3>
            <p className="text-gray-500">Monitor pending, completed, and overdue tasks with automated notifications.</p>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Employee Management</h3>
            <p className="text-gray-500">Easily manage your team's departments, designations, and workloads.</p>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Insightful Dashboards</h3>
            <p className="text-gray-500">Get a bird's-eye view of your company's productivity metrics.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
