// class ProductManager {
//     constructor() {
//         this.products = []
//     }

//     addProduct(product) {
//         if (this.existingCode(product.code)) {
//             return console.log("This product's code alredy exists")
//         }

//         if (!this.validateProducts(product)) {
//             return console.log("This product is invalid, try again")
//         }

//         product.id = this.randomId()
//         this.products.push(product)
//     }

//     randomId(length = 6) {
//         return Math.random().toString(36).substring(2, length + 2)
//     }

//     existingCode(code) {
//         let findCode = this.products.find((e) => e.code === code)
//         return findCode ? true : false
//     }

//     validateProducts(product) {
//         return (
//             product.title &&
//             product.description &&
//             product.price &&
//             product.thumbnail &&
//             product.code &&
//             product.stock
//             // product.id
//         )
//     }

//     getProducts() {
//         return this.products.forEach(e => console.log(e))
//     }

//     getProductById(id) {
//         const productId = this.products.find((e) => e.id === id)
//         if (productId) {
//             return console.log(productId)
//         } else {
//             console.log("that shit wrong")
//         }
//     }
// }

// const managingProduct = new ProductManager

// managingProduct.addProduct({
//     title: "Mushroom A",
//     description: "Cool mushroom A",
//     price: 50,
//     thumbnail: "./imageOfCoolMushroomA.png",
//     code: "1",
//     stock: 5,
//     // id: 1
// })

// managingProduct.addProduct({
//     title: "Mushroom B",
//     description: "Cool mushroom B",
//     price: 75,
//     thumbnail: "./imageOfCoolMushroomB.png",
//     code: "2",
//     stock: 8,
//     // id: 2
// })

// managingProduct.getProducts()

// // managingProduct.getProductById(1)

// function mostrarLetras(string) {
//     let letrita = string
//     setInterval(() => {
//         letrita.length
//     }, 1000);
// }


// mostrarLetras('gilDeGoma')

//clase 5 ej
// A- Crear un proyecto en node.js que genere 10000 números aleatorios en el rango  de 1 a 20.
// B- Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. 
// Representar por consola los resultados.

// let numbers = []

// for (let i = 0; i < 10; i++) {
//     let randomizer = Math.random() * 20
//     let floor = Math.floor(randomizer)
//     numbers.push(floor)    
// }

// console.log(numbers)