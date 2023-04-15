export const convertObject = (obj) => {
    let ans = {};
    for (let k1 in obj) {
        ans[k1] = [];
        for (let k2 in obj[k1]) {
            obj[k1][k2] && ans[k1].push(k2);
        }
    }
    return ans;
};


export const numberWithCommas = (x) => {
    if (x) {
        return x.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
    }
};


export const setToast = (toast, title, status, duration = 2000, description) => {
    toast({
        title,
        description,
        status,
        duration,
        isClosable: true,
        position: 'top'
    });
};


export const getGender = (gender) => {
    return !(gender === "men" || gender === "women" || gender === "kids");
};


export const shortString = (text, limit = 15) => {
    return text.slice(0, limit) + (text.length > limit ? "..." : "");
};

