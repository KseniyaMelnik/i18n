interface ObjType {
    [key: string]: any,
}

export type ReturnObjType = Record<keyof ObjType, ((newObj: Record<string, string>) => string)> | ObjType

export const i18n = (obj: ObjType): ReturnObjType => {
    const resultObj = {}
    const inner = (obj: ObjType, helper: ReturnObjType) => {
        for (const prop in obj) {
            if (typeof (obj[prop]) === 'string') {
                helper[prop] = function (newObject: Record<string, string>) {
                    const propertyReplacer = (propertyName: string): string => {
                        const newValue = (match: string): string => {
                            return newObject[match.slice(1, -1)]
                        }
                        return propertyName.replace(/{[^}]*}/g, newValue);
                    }
                    return propertyReplacer(obj[prop])
                }
            } else if (typeof (obj[prop]) === 'object') {
                helper[prop] = {}
                inner(obj[prop], helper[prop])
            } else return helper;
        }
    }
    inner(obj, resultObj);
    return resultObj;
}


