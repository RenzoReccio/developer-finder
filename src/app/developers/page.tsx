'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchDevelopers } from '@/lib/api';
import { DeveloperFilters, DeveloperType, Skill, PaginatedResponse, Developer } from '@/lib/types';
import DeveloperList from '../components/DeveloperList';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';

export default function Home() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [developers, setDevelopers] = useState<PaginatedResponse<Developer> | null>(null);
    const [filters, setFilters] = useState<DeveloperFilters>({
        type: null,
        skills: [],
        location: '',
        page: 1,
        limit: 10
    });

    useEffect(() => {
        const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
        const type = searchParams.get('type') as DeveloperType | null;
        const location = searchParams.get('location') || '';
        const skillsParam = searchParams.get('skills');
        const skills = skillsParam ? skillsParam.split(',') as Skill[] : [];

        setFilters({
            type,
            skills,
            location,
            page,
            limit: 10
        });
    }, [searchParams]);

    useEffect(() => {
        const loadDevelopers = async () => {
            setIsLoading(true);
            try {
                const data = await fetchDevelopers(filters);
                setDevelopers(data);
            } catch (error) {
                console.error('Failed to fetch developers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDevelopers();
    }, [filters]);

    const updateFilters = (newFilters: Partial<DeveloperFilters>) => {
        const updatedFilters = { ...filters, ...newFilters, page: newFilters.page || 1 };
        setFilters(updatedFilters);

        const params = new URLSearchParams();
        if (updatedFilters.type) params.set('type', updatedFilters.type);
        if (updatedFilters.location) params.set('location', updatedFilters.location);
        if (updatedFilters.skills && updatedFilters.skills.length > 0) {
            params.set('skills', updatedFilters.skills.join(','));
        }
        if (updatedFilters.page > 1) params.set('page', updatedFilters.page.toString());

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl);
    };

    const handlePageChange = (page: number) => {
        updateFilters({ page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen flex flex-col">

            <div className="container mx-auto px-4 py-6">

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <FilterSidebar
                            selectedSkills={filters.skills ?? []}
                            selectedType={filters.type ?? null}
                            onFilterChange={(type, newSkills) => updateFilters({ type, skills: newSkills })}
                        />
                    </div>

                    <div className="w-full md:w-3/4">
                        <div className="bg-white rounded-md shadow">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Top {filters.type || 'full-stack'} developers in {filters.location || 'United States'}
                                </h2>
                            </div>


                            <DeveloperList isLoading={isLoading} developers={developers?.data} />

                            {(developers?.totalPages ?? 0) > 1 && (
                                <div className="p-4 border-t">
                                    <Pagination
                                        currentPage={developers?.page ?? 1}
                                        totalPages={developers?.totalPages ?? 1}
                                        showingFrom={1}
                                        showingTo={10}
                                        total={developers?.total ?? 0}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
            </div>
        </main>
    );
}