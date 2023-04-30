import { print } from "./print";

const checkDuplicate = (arr, target) => {
    for (let item of arr) {
        if (item.id === target.id && item.size === target.size) {
            return true;
        }
    }
    return false;
};


export const handleCartDuplicate = (arr, target, operation) => {

    const isPresent = checkDuplicate(arr, target);

    print('---------como chega no handleCartDuplicate')
    print(arr)
    print(target)
    print(isPresent)

    if (!isPresent) {
        print('isPresent', isPresent)
        arr.push(target);
    } else {
        arr = arr.map((item) => {
            if (item.id === target.id && item.size === target.size) {
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


