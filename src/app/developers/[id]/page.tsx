'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchDeveloperById } from '@/lib/api';
import { Developer } from '@/lib/types';
import ContactForm from '@/app/components/ContactForm';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function DeveloperProfilePage() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  useEffect(() => {
    const loadDeveloper = async () => {
      try {
        const data = await fetchDeveloperById(id as string);
        setDeveloper(data);
      } catch (error) {
        console.error('Error fetching developer profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeveloper();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!developer) {
    return <div className="min-h-screen p-8">Developer not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
                <div className="w-20 h-20 overflow-hidden">
                  <img 
                    src={developer.picture.medium} 
                    alt={developer.name.first} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-gray-800">{developer.name.first} {developer.name.last}</h1>
                  <p className="text-gray-600">
                    {developer.type}, {developer.location.city}, {developer.location.country}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {developer.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                {developer.experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-medium text-lg">{exp.title} at {exp.company} ({exp.period})</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/4">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="font-medium text-lg mb-4">George can help you with:</h2>
                <ul className="space-y-2">
                  {developer.skills.map((skill, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center gap-2"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </main>

      {showContactForm && (
        <ContactForm
        developerId={developer.id}
        developerName={developer.name.first}
        />
      )}
    </div>
  );
}