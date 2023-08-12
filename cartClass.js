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
            const getCartFromArray = data.find((e) => e.id === id)
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

    async updateCart(cId, pId) {
        try {
            const dataProducts = await this.productsId()
            const findDataProducts = dataProducts.find((e) => e === pId)

            const quantity = 1
            const storeDataProducts = { id: findDataProducts, quantity: quantity }

            const allDataCart = await this.readCartFile()
            const dataCart = await this.getCartById(cId)

            const indexOfDataCart = allDataCart.findIndex((e) => e.id === cId)

            const isProductInCart = dataCart.products.some((e) => e.id === pId)

            if (dataCart !== undefined && !isProductInCart && findDataProducts !== undefined) {
                dataCart.products.push(storeDataProducts)

                allDataCart[indexOfDataCart] = dataCart

                await fs.promises.writeFile('cart.json', JSON.stringify(allDataCart))

            } else if (dataCart !== undefined && isProductInCart && findDataProducts !== undefined) {
                dataCart.products.forEach((e) => e.quantity += 1)
                
                allDataCart[indexOfDataCart] = dataCart

                await fs.promises.writeFile('cart.json', JSON.stringify(allDataCart))
            }else{
                console.log('else')
            }

        } catch (error) {
            console.log('error method updateCart: ', error)
        }
    }
}

const cart = new Cart('cart.json', 'products.json')

// cart.productsId(2)

// cart.updateCart('zus5x8', 2)
// cart.readProductFile()
export default Cart