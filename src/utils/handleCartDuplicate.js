const checkDuplicate = (arr, target) => {
    for (let item of arr) {
        if (item._id === target._id || item.name === target.name) {
            return true;
        }
    }
    return false;
};


export const handleCartDuplicate = (arr, target, operation) => {

    const isPresent = checkDuplicate(arr, target);

    if (!isPresent) {
        console.log(isPresent)
        arr.push(target);

    } else {
        arr = arr.map((item) => {
            if (item._id === target._id || item.name === target.name) {
                const singlePrice = item.price / item.quantity;
                return {
                    ...item,
                    price: operation === 'add' ? item.price + singlePrice : item.price - singlePrice,
                    quantity: operation === 'add' ? item.quantity + 1 : item.quantity - 1
                }
            }
            return item;
        });
    }
    return arr;
};


