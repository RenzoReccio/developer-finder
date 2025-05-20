/**
 * Utility functions for the application
 */

export const formatName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
};

export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export const parseQueryParams = (
    query: Record<string, string | string[] | undefined>
) => {
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const limit = query.limit ? parseInt(query.limit as string, 10) : 10;

    const type = query.type ? (query.type as string) : null;

    let skills: string[] = [];
    if (query.skills) {
        skills = Array.isArray(query.skills)
            ? query.skills
            : [query.skills as string];
    }

    const location = query.location as string | undefined;

    return {
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 10 : limit,
        type,
        skills,
        location,
    };
};

export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const generatePageRange = (
    currentPage: number,
    totalPages: number,
    maxLength: number = 7
): (number | string)[] => {
    if (totalPages <= maxLength) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const sideWidth = maxLength < 9 ? 1 : 2;
    const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    const rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;

    if (currentPage <= sideWidth + leftWidth + 1) {
        return [
            ...Array.from({ length: maxLength - sideWidth - 1 }, (_, i) => i + 1),
            '...',
            ...Array.from({ length: sideWidth }, (_, i) => totalPages - sideWidth + i + 1),
        ];
    }

    if (currentPage >= totalPages - sideWidth - rightWidth) {
        return [
            ...Array.from({ length: sideWidth }, (_, i) => i + 1),
            '...',
            ...Array.from(
                { length: maxLength - sideWidth - 1 },
                (_, i) => totalPages - maxLength + sideWidth + i + 2
            ),
        ];
    }

    return [
        ...Array.from({ length: sideWidth }, (_, i) => i + 1),
        '...',
        ...Array.from(
            { length: maxLength - sideWidth * 2 - 2 },
            (_, i) => currentPage - leftWidth + i
        ),
        '...',
        ...Array.from({ length: sideWidth }, (_, i) => totalPages - sideWidth + i + 1),
    ];
};