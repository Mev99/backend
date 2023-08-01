const express = require("express")
const app = express()
const PORT = 8080

const classImport = require('./container')
const yeezy = classImport

app.get("/products", async (req, res)=> {
    
    const jiji = yeezy.getAll()

    res.json(`${jiji}`)
})

app.get("/productRandom", (req, res)=> {
    res.send("Endpoint")
})

const server = app.listen(PORT, () => {
    console.log(`escuchando ${PORT}`)
})

server.on("error", error => console.log(`error ${error}`))
