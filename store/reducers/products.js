import PRODUCTS from "../../data/dummy-data";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(x => x.ownerId === 'u1')
};

export default productsReducer = (state = initialState, action) => {
    return state;
};
