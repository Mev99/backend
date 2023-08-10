import fs from "fs"

export class Container {
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
            const checkingId = checkProduct.some((e) => e.id === object.id)
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
                return objectId
            } else {
                return undefined
            }
        }
        catch (error) {
            console.log("couldn't get the product by it's id: ", error)
        }
    }

    async getAll() {
        try {
            await this.readTheFile()
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


    async updateProduct(id, updatedProduct) {
        try {
            let data = await this.readTheFile()
            const locateItem = data.findIndex((e) => e.id === id)

            if (locateItem !== -1) {
                data[locateItem] = { ...data[locateItem], ...updatedProduct }
                console.log('item updated')

                return await fs.promises.writeFile(this.file, JSON.stringify(data))
            } else {
                console.log('error updating')
            }
        }
        catch (error) {
            console.log("error updating product", error)
        }
    }
}

const container = new Container("products.json")

const qwerty = { title: "title1", description: "description product1", code: "a1", status: true, stock: "50", category: "category a", price: 50, thumbnail: "url/this/thumbnail1.png" }
const qwerty2 = { title: "title2", description: "description product 2", code: "a2", status: true, stock: "60", category: "category b", price: 50, thumbnail: "url/this/thumbnail2.png" }
const qwerty3 = { title: "title3", description: "description product3", code: "a3", status: true, stock: "80", category: "category c", price: 50, thumbnail: "url/this/thumbnail3.png" }


// container.save(qwerty)
// container.save(qwerty2)
// container.save(qwerty3)

// container.getProductById(2)

// container.getAll()

// container.deleteById(2)

// container.deleteAll()

// container.updateProduct(2, {title: "title4", description: "description product 4", code: "a4", status: true, stock: "60", category: "category b", price: 50, thumbnail: "url/this/thumbnail4.png" })

export default Container