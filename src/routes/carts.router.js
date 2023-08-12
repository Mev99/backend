import express from "express";
import Cart from "../../cartClass.js";

const router = express.Router()
const cart = new Cart('cart.json', 'products.json')

router.post("/api/carts", async (req, res) => {

    const letThereBeCart = await cart.createCart()

    res.send(letThereBeCart)
})

router.get('/api/:cid', async (req, res) => {
    const productId = req.params.cid
    const getCart = await cart.getCartById(productId)
    res.json(getCart)
})


router.post('/api/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid

    const saveProductInCart = await cart.findProductsId(cartId, productId)

    res.send(saveProductInCart)

})


export default router