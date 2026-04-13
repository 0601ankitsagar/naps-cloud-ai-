import React from 'react';
import { Cloud, CheckCircle, AlertTriangle } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-8 px-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Naps Cloud</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">AI Authenticity Platform</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-indigo-600">Home</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">API</a>
        </nav>
      </div>
    </header>
  );
}
