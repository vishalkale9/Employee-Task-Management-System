import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Manage Tasks with <span className="text-blue-600">Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The ultimate employee task management system designed to streamline your workflow and boost productivity.
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Task Tracking</h3>
              <p className="text-gray-600">Assign, monitor, and complete tasks with ease. Never miss a deadline again.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Keep everyone on the same page. Perfect for both admins and employees.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Stats</h3>
              <p className="text-gray-600">Get instant insights into team performance with live dashboard metrics.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
