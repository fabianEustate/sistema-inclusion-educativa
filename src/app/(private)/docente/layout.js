import PrivateLayout from '@/components/layout/PrivateLayout';

export default function DocenteLayout({ children }) {
  return <PrivateLayout role="docente">{children}</PrivateLayout>;
}
