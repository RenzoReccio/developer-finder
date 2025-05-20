import { Developer, DeveloperFilters, DeveloperType, Experience, PaginatedResponse, Skill } from './types';

// Random developer types
const developerTypes: DeveloperType[] = [
    'Full-stack developer',
    'Backend developer',
    'Frontend developer',
    'Mobile developer',
    'Data scientist',
];

// Random skills
const allSkills: Skill[] = [
    'Android', 'iOS', 'Java', 'React', 'Angular',
    'Python', 'Ruby', 'PHP', 'Go', 'C++', 'Swift',
    'Parse.com', 'REST API architecture'
];

const getServices = (type: DeveloperType): string[] => {
    const services: Record<DeveloperType, string[]> = {
        'Full-stack developer': ['Full-stack development', 'API development', 'Database design', 'Frontend development'],
        'Backend developer': ['API development', 'Database design', 'Server management', 'Cloud services'],
        'Frontend developer': ['UI/UX implementation', 'React development', 'Web optimization', 'Responsive design'],
        'Mobile developer': ['Mobile iOS development', 'CTO management', 'Swift', 'Mobile app architecture'],
        'Data scientist': ['Data analysis', 'Machine learning', 'Python development', 'Business intelligence'],
    };

    return services[type] || [];
};

const generateExperiences = (): Experience[] => {
    const companyNames = ['MobilityDrive', 'MultiMedia LLC', 'TechCorp', 'InnovateSoft', 'DevGenius'];
    const titles = ['CEO', 'Team Lead', 'Senior Developer', 'CTO', 'Technical Lead'];

    return [
        {
            title: titles[Math.floor(Math.random() * titles.length)],
            company: companyNames[Math.floor(Math.random() * companyNames.length)],
            period: '2009 - present',
            description: [
                'Developed iOS apps which has been installed on over 15 million devices and RocketScience app was #1 in the App Store in December 2007.',
                'Created other games including RPG TrueMasters',
                'Co-author of VisualMadness 360 for Global Retailers, enterprise iPad app that provides supermarkets with a way to direct store layouts and perform visual (photo-based) audits.',
                'Developed a social photo sharing platform/ that transcends language and location through video and photo conversations. Used Unique UX, localization, real-time translation, and web services.'
            ]
        },
        {
            title: titles[Math.floor(Math.random() * titles.length)],
            company: companyNames[Math.floor(Math.random() * companyNames.length)],
            period: '2004 - 2008',
            description: [
                'Developed technical integrations of Right Media Ad Server into the Yahoo! API platform.',
                'Led numerous end-to-end API feature implementations from design, development, and testing to production, deployment and monitoring.'
            ]
        }
    ];
};

// Enrich random user data with developer information
const enrichUserWithDeveloperInfo = (user: any): Developer => {
    const type = developerTypes[Math.floor(Math.random() * developerTypes.length)];

    const skillCount = Math.floor(Math.random() * 3) + 3;
    const shuffledSkills = [...allSkills].sort(() => 0.5 - Math.random());
    const skills = shuffledSkills.slice(0, skillCount);

    const expertise = type === 'Mobile developer' ? 'iOS expert' :
        type === 'Data scientist' ? 'Data expert' :
            skills[0] + ' expert';

    const description = `${user.name.first} has over 15 years of experience as a full-stack developer, including creating a #1 iOS game in 2008 and scaling Yahoo! ad servers. ${user.name.first}'s strengths are adaptability, clear communication, and a relentless focus on the details that get projects shipped.`;

    return {
        ...user,
        id: user.id.value,
        type,
        skills,
        expertise,
        description,
        experience: generateExperiences(),
        services: getServices(type)
    };
};

export const fetchDevelopers = async (filters: DeveloperFilters): Promise<PaginatedResponse<Developer>> => {
    try {
        const url = new URL('https://randomuser.me/api/');
        url.searchParams.append('results', filters.limit.toString());
        url.searchParams.append('page', filters.page.toString());
        url.searchParams.append('seed', 'devfinder'); 

        if (filters.location) {
            url.searchParams.append('nat', filters.location);
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch developers');
        }
        console.log('Fetched developers:', data.results);
        let developers = data.results.map(enrichUserWithDeveloperInfo);

        if (filters.type) {
            developers = developers.filter((dev: { type: string | null | undefined; }) => dev.type === filters.type);
        }
        if (filters.skills && filters.skills.length > 0) {
            developers = developers.filter((dev: { skills: string | string[]; }) =>
                filters.skills!.some(skill => dev.skills.includes(skill))
            );
        }
        const total = 100; 
        const totalPages = Math.ceil(total / filters.limit);

        return {
            data: developers,
            total,
            page: filters.page,
            limit: filters.limit,
            totalPages
        };
    } catch (error) {
        console.error('Error fetching developers:', error);
        throw error;
    }
};

export const fetchDeveloperById = async (id: string): Promise<Developer | null> => {
    try {
        const url = new URL('https://randomuser.me/api/');
        url.searchParams.append('seed', 'devfinder'); 

        const response = await fetch(url.toString());
        const data = await response.json();

        if (!response.ok || !data.results || data.results.length === 0) {
            return null;
        }

        const user = data.results[0];
        const developer = enrichUserWithDeveloperInfo(user);
        developer.id = id;

        return developer;
    } catch (error) {
        console.error('Error fetching developer by ID:', error);
        return null;
    }
};

export const sendContactMessage = async (
    developerId: string,
    name: string,
    email: string,
    message: string
): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Your message has been sent successfully!'
            });
        }, 3000);
    });
};