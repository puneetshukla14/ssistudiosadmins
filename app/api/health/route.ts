import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    routes: {
      root: '/',
      login: '/login',
      dashboard: '/dashboard/members',
      api: {
        health: '/api/health',
        login: '/api/admin-login',
        logout: '/api/logout',
        members: '/api/members'
      }
    }
  });
}
