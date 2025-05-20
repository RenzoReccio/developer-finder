// Types for the application
export interface Developer {
    id: string;
    name: {
        first: string;
        last: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    email: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    login: {
        uuid: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    type: DeveloperType;
    skills: Skill[];
    experience: Experience[];
    expertise: string;
    description: string;
    services: string[];
}

export type DeveloperType =
    | 'Full-stack developer'
    | 'Backend developer'
    | 'Frontend developer'
    | 'Mobile developer'
    | 'Data scientist';

export type Skill =
    | 'Android'
    | 'iOS'
    | 'Java'
    | 'React'
    | 'Angular'
    | 'Python'
    | 'Ruby'
    | 'PHP'
    | 'Go'
    | 'C++'
    | 'Swift'
    | 'Parse.com'
    | 'REST API architecture';

export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string[];
}

export interface DeveloperFilters {
    type?: DeveloperType | null;
    skills?: Skill[];
    location?: string;
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}