import CONSTANTS from "./constants"
const isString = (arg:any) => {
    return arg && typeof arg === 'string';
}

const decode = (arg: string) => {
    return decodeURIComponent(arg);
}

const getType = (arg: any) => {
    if (isString(arg)) {
        const strLower = arg.toLowerCase();
        if (strLower === CONSTANTS.TYPE_INLINE || strLower === CONSTANTS.TYPE_ATTACHMENT) {
            return strLower;
        }
    }
    return CONSTANTS.TYPE_UNKNOWN;
};

const isFilenameEncoded = (arg: any) => {
    if(isString(arg)){
        const strLower = arg.toLowerCase();
        return strLower.includes(CONSTANTS.FILENAME_ENCODED);
    }
    return false;
}
const isFilename = (arg: any) => {
    if(isString(arg) && !isFilenameEncoded(arg)){
        const strLower = arg.toLowerCase();
        return strLower.includes(CONSTANTS.FILENAME)
    }
    return false;
}

const isUtf8 = (arg: any) => {
    if(isString(arg)){
        const strLower = arg.toLowerCase();
        return strLower.includes("utf-8");
    }
    return false;
}

const getFilenameEncoded = (arg:any)=>{
    if(isString(arg)){
        return decode(arg.replace(CONSTANTS.FILENAME_ENCODED_PREFIX, "").trim());
    }
    return "";
}

const getFilename = (arg: any)=>{
    if(isString(arg)){
        return arg.split(CONSTANTS.FILENAME_SEPARATOR)[1];
    }
    return "";
}

const parseSegment = (arg: string) => {
    const isEncoded = isFilenameEncoded(arg);
    const isUtf = isUtf8(arg);
    const isFile = isFilename(arg);
    return {isEncoded, isUtf, isFile}
}

export = {
    isString,
    getType,
    parseSegment,
    isFilenameEncoded,
    isFilename,
    isUtf8,
    getFilename,
    getFilenameEncoded
}
