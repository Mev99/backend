import fs from "fs"

export class Cart {
    constructor(fileCart, fileProducts) {
        this.fileCart = fileCart
        this.fileProducts = fileProducts
    }

    async readCartFile() {
        try {
            const data = await fs.promises.readFile(this.fileCart, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            console.log('error reading the file', error)
        }
    }
    async readProductFile() {
        try {
            const data = await fs.promises.readFile(this.fileProducts, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log('error reading product file: ', error)
        }
    }


    async createCart() {
        try {
            const cartId = this.randomId()

            const data = await this.readCartFile()
            const idExist = data.some((e) => e.id === cartId)
            if (idExist) {
                return console.log('error generating id, try again')
            }

            const cartCreation = { id: cartId, products: [] }

            let fullCart = [...data, cartCreation]

            return await fs.promises.writeFile(this.fileCart, JSON.stringify(fullCart))

        } catch (error) {
            console.log('error creating the cart: ', error)
        }
    }

    randomId(length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };

    async getCartById(id) {
        try {
            const data = await this.readCartFile()
            const getCartFromArray = data.filter((e) => e.id === id)
            return getCartFromArray
        }
        catch (error) {
            console.log('error getting cart by id: ', error)
        }

    }

    async productsId() {
        try {
            const data = await this.readProductFile()
            const dataIds = data.map((e) => e.id)
            return dataIds
        } catch (error) {
            console.log('error with method productsId: ', error)
        }
    }

    async findProductsId(cId, pId) {
        try {
            const data = await this.productsId()
            const findData = data.find((e) => e === pId)
            const quantity = 1
            const storeData = {id:findData, quantity: quantity}

            const dataCart = await this.getCartById(cId)
            console.log('dataCart= ', dataCart)

            if (dataCart.length > 0) {
                dataCart.forEach((e) => e.products.push(storeData))
                console.log('dataCart 2= ', dataCart)
            }
        } catch (error) {
            console.log('error method findProductsId: ', error)
        }
    }




}

const cart = new Cart('cart.json', 'products.json')

// cart.productsId(2)

cart.findProductsId('zus5x8', 2)

export default Cart