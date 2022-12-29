const { CartItem } = require("../models")


const getCart = async (accountId) => {
    return await CartItem.collection().where({
        'account_id': accountId
    }).fetch({
        require: false,
        withRelated: ['account', 'variant', 'variant.soap', 'account.role']
    })

}


const getCartItemByAccountAndVariant = async (accountId, variantId) => {
    return await CartItem.where({
        'account_id': accountId,
        'variant_id': variantId
    }).fetch({
        require: false
    })


}


async function createCartItem(accountId, variantId, quantity) {

    let cartItem = new CartItem({
        'account_id': accountId,
        'variant_id': variantId,
        'quantity': quantity

    })

    await cartItem.save();
    return cartItem;

}


async function removeFromCart(accountId, variantId) {
    let cartItem = await getCartItemByAccountAndVariant(accountId, variantId);
    if (cartItem) {
        await cartItem.destroy();
        return true;

    }
    return false;

}


async function updateQuantity(accountId, variantId, newQuantity) {

    const cartItem = await getCartItemByAccountAndVariant(accountId, variantId);

    if (cartItem) {
        cartItem.set('quantity', newQuantity);
        await cartItem.save();
        return cartItem;

    } else {
        return false;
    }

}


module.exports =
{
    getCart,
    getCartItemByAccountAndVariant,
    createCartItem,
    removeFromCart,
    updateQuantity
}


