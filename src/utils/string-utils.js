export function hasWhiteSpace(s) 
{
    return new RegExp("/^\s+$/").test(s)
}

export function formatStringToNumber(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
