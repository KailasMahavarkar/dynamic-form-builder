function patternValidator(pattern: RegExp, errorMessage: string) {
    return (value: string) => {
        if (!pattern.test(value)) {
            return errorMessage;
        }
        return '';
    };
}

export default patternValidator;