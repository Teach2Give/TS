export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    length: number,
    characters: string[],
    extraInfo?: Record<string, any> // Changed to a more precise type
}

export function calculateComplexity(stringInfo: StringInfo): number {
    if (stringInfo.extraInfo && typeof stringInfo.extraInfo === 'object') {
        return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
    }
    return 0; // Return 0 or a default value if extraInfo is undefined
}
