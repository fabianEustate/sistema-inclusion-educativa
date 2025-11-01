import PrivateLayout from '@/components/layout/PrivateLayout';

export default function AdminLayout({ children }) {
  return <PrivateLayout role="admin">{children}</PrivateLayout>;
}
