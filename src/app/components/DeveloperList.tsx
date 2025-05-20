import { Developer } from '@/lib/types';
import DeveloperCard from './DeveloperCard';
import LoadingSpinner from './LoadingSpinner';

interface DeveloperListProps {
  developers?: Developer[];
  isLoading: boolean;
  title?: string;
}

export default function DeveloperList({
  developers,
  isLoading,
  title = 'Top developers',
}: DeveloperListProps) {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (developers?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <h2 className="text-xl font-medium text-gray-700">No developers found</h2>
        <p className="mt-2 text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-medium text-gray-800 mb-4">{title}</h2>
      )}
      <div className="space-y-4">
        {developers?.map((developer) => (
          <DeveloperCard key={developer.login.uuid} developer={developer} />
        ))}
      </div>
    </div>
  );
}