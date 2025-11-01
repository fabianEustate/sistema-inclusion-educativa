import PrivateLayout from '@/components/layout/PrivateLayout';

export default function TutorLayout({ children }) {
  return <PrivateLayout role="tutor">{children}</PrivateLayout>;
}
