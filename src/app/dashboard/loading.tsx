
import { InrLoader } from '@/components/icons/inr-loader';

export default function DashboardLoading() {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
      <InrLoader className="h-24 w-24" />
    </div>
  );
}
