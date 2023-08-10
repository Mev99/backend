import express from "express";
import Container from "../../container.js"

const router = express.Router()
const container = new Container("products.json")


router.get("/api/products", async (req, res) => {
    const allProducts = await container.readTheFile()
    res.send(allProducts)
})


router.get("/api/products/:pid", async (req, res) => {
    const pid = await container.getProductById(parseInt(req.params.pid))

    res.send(pid)
})


router.post("/api/products", async (req, res) => {
    const theProduct = req.body
    const addProduct = await container.save(theProduct)
    console.log(addProduct)
    res.send('product was added?')
})


router.delete("/api/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid)
    const deleteProduct = await container.deleteById(pid)
    console.log(deleteProduct)
    res.send(`product with the id -${id}- has been deleted`)
})


router.put("/api/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid)
    const bodyUpdate = req.body

    const updateProducts = container.updateProduct(pid, bodyUpdate)

    res.send(`product with the id -${pid}- has been updated`)
})

export default router