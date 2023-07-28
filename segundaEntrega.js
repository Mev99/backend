const fs = require("fs")

class Container {
    constructor(file) {
        this.file = file
        this.objectArray = []
        this.id = 1
    }

    async readTheFile() {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return data ? JSON.parse(data) : []
        }
        catch (error) {
            console.log("error READING the file", error)
            return []
        }
    }

    async save(object) {
        try {
            object.id = this.id++

            const checkProduct = await this.readTheFile()
            const checkingId = checkProduct.some((e) => { e.id === object.id })
            console.log(checkingId)

            if (!checkingId) {
                this.objectArray.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(this.objectArray))
                console.log("object saved correctly", "id:", object.id)
            } else {
                console.log("this product alredy exists")
            }

        } catch (error) {
            console.log("error SAVING the object: ", error)
        }
    }

    async getProductById(id) {
        try {
            const dataParsed = await this.readTheFile()

            const objectId = await dataParsed.find((e) => e.id === id)
            if (objectId) {
                return console.log(objectId)
            } else {
                console.log(null)
            }
        }
        catch (error) {
            console.log("couldn't get the product by it's id: ", error)
        }
    }

    async getAll() {
        try {
            console.log(await this.readTheFile())
        }
        catch (error) {
            console.log("Did not get em' all", error)
        }
    }

    async deleteById(id) {
        try {
            const data = await this.readTheFile()
            const dataFiltered = data.filter((e) => e.id != id)
            await fs.promises.writeFile(this.file, JSON.stringify(dataFiltered))
        } catch (error) {
            console.log("Error deleting an element by ID: ", error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.unlink(this.file)
        }
        catch (error) {
            console.log("couldn't erase the file")
        }
    }
}

const container = new Container("products.json")

const qwerty = { title: "title1", price: 50, thumbnail: "url/this/thumbnail.png" }
const qwerty2 = { title: "title2", price: 100, thumbnail: "url/this/thumbnail.png" }

container.save(qwerty)
container.save(qwerty2)

// container.getProductById(2)

// container.getAll()

// container.deleteById(2)

// container.deleteAll()