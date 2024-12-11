export function isLengthValid(value: string, min: number, max: number) {
    return value.length >= min && value.length <= max;
}

export function isNumberValid(value: number, min: number, max: number) {
    return value >= min && value <= max;
}

export function getResolvedBoolean(value: string) {
    if (value === 'true') {
        return true;
    }
    return false;
}