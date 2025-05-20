import Image from 'next/image';
import Link from 'next/link';
import { Developer } from '@/lib/types';

interface DeveloperCardProps {
  developer: Developer;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      <div className="p-4 flex">
        <div className="mr-4">
          <Image
            src={developer.picture.medium}
            alt={`${developer.name.first} ${developer.name.last}`}
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {developer.name.first} {developer.name.last}
              </h2>
              <p className="text-sm text-gray-500">{developer.expertise}, {developer.type}</p>
            </div>
            <Link 
              href={`/developers/${developer.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View profile
            </Link>
          </div>
          <p className="mt-2 text-gray-600 text-sm">{developer.description}</p>
        </div>
      </div>
    </div>
  );
}