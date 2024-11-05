export class StringUtils {
    public toUpperCase(arg: string) {
        //this is used to check error after learning jest hooks
        if(!arg) {
            throw new Error("Invalid argument")
        }
        return  arg.toUpperCase();
    }
}

export function toUpperCase(arg: string) {
    return arg.toUpperCase()
}

export type stringinfo = {
    lowerCase: string,
    upperCase: string,
    length: number,
    characters: string[],
    extraInfo: Object | undefined
}

//use this to practice jest matches 
export function getStringInfo(arg: string) : stringinfo {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extraInfo: {}
    }
}