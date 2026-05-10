'use client';

import dynamic from "next/dynamic";

const PanyKidsStudio = dynamic(
  () => import("@/components/PanyKidsStudio"),
  { ssr: false, loading: () => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui', color: '#888' }}>Loading Pany Kids Studio...</div> }
);

export default function Home() {
  return <PanyKidsStudio />;
}
