import { Suspense } from 'react';
import { Invitation } from '@/components/invitation/Invitation';

// Halaman root — server component tipis
// Invitation di-wrap Suspense karena menggunakan useSearchParams
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Invitation />
    </Suspense>
  );
}
