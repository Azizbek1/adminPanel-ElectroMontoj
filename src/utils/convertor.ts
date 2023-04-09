export const convertPxToRem = (px: number) => {
     return px / 16 + "rem";
}
export const ConvertorStringToNumber = (str: string) => {
     const strConvert = str.replace(/[^0-9]/g, '')
     return strConvert
}