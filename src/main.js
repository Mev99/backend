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