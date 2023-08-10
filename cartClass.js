import fs from "fs"

export class Cart {
    constructor(fileCart, fileProducts) {
        this.fileCart = fileCart
        this.fileProducts = fileProducts
    }

    async readCartFile() {
        try {
            const data = await fs.promises.readFile(this.fileCart, 'utf-8')
            // console.log(data)
            return data ? JSON.parse(data) : []
        } catch (error) {
            console.log('error reading the file', error)
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
            console.log('error creating the cart', error)
        }
    }

    async getCartById(){
        
    }

    randomId(length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };

}

const cart = new Cart('cart.json', 'products.json')

export default Cart