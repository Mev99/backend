import express from "express";

const router = express.Router()

router.get("/api/carts", (req, res) => {
    res.send('cart')
})

export default router