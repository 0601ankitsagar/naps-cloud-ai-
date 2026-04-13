/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { Authenticator } from './components/Authenticator';

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <Authenticator />
      </main>
      
      <footer className="py-12 border-t border-gray-100 mt-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mt-6 flex items-center justify-center gap-8 opacity-40 grayscale">
            <span className="text-xs font-bold">SECURE ENCRYPTION</span>
            <span className="text-xs font-bold">PRIVACY COMPLIANT</span>
            <span className="text-xs font-bold">REAL-TIME ANALYSIS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

