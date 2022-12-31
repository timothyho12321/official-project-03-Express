const cartDataLayer = require('../dal/cart_items');
const productDataLayer = require('../dal/products');

class CartServices {
    constructor(account_id) {
        this.account_id = account_id;
    }

    async addToCart(variantId, quantity) {
        // check if user has added the product to the shopping cart before
        let cartItem = await cartDataLayer.getCartItemByAccountAndVariant(this.account_id, variantId);

        if (cartItem) {
            return await cartDataLayer.updateQuantity(this.account_id, variantId, cartItem.get('quantity') + 1);
        } else {
            let newCartItem = cartDataLayer.createCartItem(this.account_id, variantId, quantity);
            return newCartItem;
        }
    }

    async remove(variantId) {
        return await cartDataLayer.removeFromCart(this.account_id, variantId);
    }

    async setQuantity(variantId, quantity) {
        return await cartDataLayer.updateQuantity(this.account_id, variantId, quantity);
    }

    async getCart() {
        return await cartDataLayer.getCart(this.account_id);
    }


    async checkVariantStock(variantId) {
        const retrieveVariant = await productDataLayer.getVariantById(variantId)
        const getVariantStockNum = parseInt(retrieveVariant.get('stock'));

        return getVariantStockNum;

    }

    async removeOneItemFromCart(variantId) {

        //check if item exists
        const getCartItemByAccountAndVariant = await cartDataLayer.getCartItemByAccountAndVariant(this.account_id, variantId)

        if (getCartItemByAccountAndVariant) {
            cartDataLayer.removeFromCart(this.account_id, variantId)
            return true;
        } else {
            return false;
        }


    }
}

module.exports = CartServices;