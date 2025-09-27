// components/ClientNavbar.tsx
"use client"; // Ensure this is a Client Component

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./navbar'), { ssr: false });

export default function ClientNavbar() {
  return <Navbar />;
}