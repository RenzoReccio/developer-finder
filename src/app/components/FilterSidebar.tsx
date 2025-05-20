'use client';

import { useState } from 'react';
import { DeveloperType, Skill } from '@/lib/types';

interface FilterSidebarProps {
    onFilterChange: (type: DeveloperType | null, skills: Skill[]) => void;
    selectedType: DeveloperType | null;
    selectedSkills: Skill[];
}

export default function FilterSidebar({
    onFilterChange,
    selectedType,
    selectedSkills,
}: FilterSidebarProps) {
    const [type, setType] = useState<DeveloperType | null>(selectedType);
    const [skills, setSkills] = useState<Skill[]>(selectedSkills);

    const developerTypes: DeveloperType[] = [
        'Full-stack developer',
        'Backend developer',
        'Frontend developer',
        'Mobile developer',
        'Data scientist',
    ];

    const allSkills: Skill[] = [
        'Android', 'iOS', 'Java', 'React', 'Angular',
        'Python', 'Ruby', 'PHP', 'Go', 'C++', 'Swift',
        'Parse.com', 'REST API architecture'
    ];

    const handleTypeChange = (developerType: DeveloperType) => {
        const newType = type === developerType ? null : developerType;
        setType(newType);
        onFilterChange(newType, skills);
    };

    const handleSkillChange = (skill: Skill) => {
        const newSkills = skills.includes(skill)
            ? skills.filter(s => s !== skill)
            : [...skills, skill];

        setSkills(newSkills);
        onFilterChange(type, newSkills);
    };

    return (
        <div className="w-full md:w-64 bg-white p-4 border-r">
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Developer type:</h3>
                <div className="space-y-2">
                    {developerTypes.map((developerType) => (
                        <div key={developerType} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`type-${developerType}`}
                                checked={type === developerType}
                                onChange={() => handleTypeChange(developerType)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor={`type-${developerType}`}
                                className="ml-2 block text-sm text-gray-700"
                            >
                                {developerType}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Skills:</h3>
                <div className="grid grid-cols-1 gap-2">
                    {allSkills.map((skill) => (
                        <div key={skill} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`skill-${skill}`}
                                checked={skills.includes(skill)}
                                onChange={() => handleSkillChange(skill)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor={`skill-${skill}`}
                                className="ml-2 block text-sm text-gray-700"
                            >
                                {skill}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}