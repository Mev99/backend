const express = require("express")
const app = express()
const PORT = 8080

const Container = require('./container')
const yeezy = new Container("products.json")

app.get("/products", async (req, res) => {

    const jiji = await yeezy.readTheFile()

    res.send(jiji)
})


app.get("/productRandom", async (req, res) => {
    const gettingFile = await yeezy.readTheFile()

    let randomNumber = Math.floor(Math.random() * gettingFile.length)

    if (randomNumber === 0) {
        randomNumber = randomNumber + 1
        const productRandom = await yeezy.getProductById(randomNumber)
        res.send(productRandom)
    } else {
        const productRandom = await yeezy.getProductById(randomNumber)
        res.send(productRandom)
    }

})

const server = app.listen(PORT, () => {
    console.log(`escuchando ${PORT}`)
})

server.on("error", error => console.log(`error ${error}`))