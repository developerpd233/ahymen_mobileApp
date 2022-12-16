const addProducts = products => {
    return{
        type: "ADD_PRODUCT",
        products
    }
};

export  {
    addProducts
};