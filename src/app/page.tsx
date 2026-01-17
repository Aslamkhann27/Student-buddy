import AppLayout from '@/components/app-layout';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <AppLayout />
    </Suspense>
  );
}
