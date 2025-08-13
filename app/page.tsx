'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Immediate redirect to login
    window.location.replace('/login');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm">Redirecting to login...</p>
      </div>
    </div>
  );
}
