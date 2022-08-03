const getArgs = (args) => {
    const res = {};
    const [executor, file, ...rest] = args;
    rest.forEach((value = '', index, arr) => {
        const argWithoutLine = value.slice(1);
        if (value.startsWith('-')) {
            if (index === arr.length - 1) res[argWithoutLine] = true;
            else if (!arr[index + 1].startsWith('-'))
                res[argWithoutLine] = arr[index + 1];
            else res[argWithoutLine] = true;
        }
    });
    return res;
};

export { getArgs };