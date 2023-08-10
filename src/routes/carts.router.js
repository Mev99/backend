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

    res.send()
})

export default router