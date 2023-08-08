import express from "express"
import path from "path"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use("/static", express.static(__dirname + "/public"))

app.use("/", productsRouter)
app.use("/", cartsRouter)




const server = app.listen(PORT, () => {
    console.log(`escuchando ${PORT}`)
})

server.on("error", error => console.log(`error ${error}`))












// Entrega de CONTAINER !!! // 

// import Container from "../container.js"
// const yeezy = new Container("products.json")
// app.get("/products", async (req, res) => {

//     const jiji = await yeezy.readTheFile()

//     res.send(jiji)
// })

// app.get("/productRandom", async (req, res) => {
//     const gettingFile = await yeezy.readTheFile()

//     let randomNumber = Math.floor(Math.random() * gettingFile.length)

//     if (randomNumber === 0) {
//         randomNumber = randomNumber + 1
//         const productRandom = await yeezy.getProductById(randomNumber)
//         res.send(productRandom)
//     } else {
//         const productRandom = await yeezy.getProductById(randomNumber)
//         res.send(productRandom)
//     }
// })