import Utils from "./utils"
const parseContentDisposition = (contentDisposition: string) => {
    if(!contentDisposition && !Utils.isString(contentDisposition)){
        throw new Error("invalid content-disposition")
    }

    const strArray = contentDisposition.split(';');
    const len = strArray.length;
    if (len === 0) {
        throw new Error('empty content-disposition');
    }

    const type = Utils.getType(strArray[0])

    let filenameEncoded="", filename = "";

    if(len > 1){
        const segment = strArray[1];
        const {isEncoded, isUtf, isFile} = Utils.parseSegment(segment);
        if(isEncoded && isUtf){
            filenameEncoded = Utils.getFilenameEncoded(segment);
        }
        if(isFile){
            filename = Utils.getFilename(segment);
        }
    }

    if(len > 2){
        const segment = strArray[2];
        const {isEncoded, isUtf, isFile} = Utils.parseSegment(segment);
        if(isEncoded && isUtf){
            filenameEncoded = Utils.getFilenameEncoded(segment);
        }
        if(isFile){
            filename = Utils.getFilename(segment);
        }
    }

    return {type, filename, filenameEncoded}
};

export = parseContentDisposition;