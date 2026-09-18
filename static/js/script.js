const addToCart = document.querySelectorAll(".add-to-cart")
const cart = JSON.parse(localStorage.getItem("cart")) || []

const cartContainer = document.querySelector("#cart-container")

if (cartContainer) {

  let cartTotal = 0
  
  const cartTotalDisplay = document.createElement("span")

  //Empty message 
  if (cart.length === 0){
    emptyMsg = document.createElement("p")
  }

  //total function
  function updateCartFunction(){
    cartTotal = 0

    cart.forEach(item => {
      
      // subtotal for price and display
      const productPriceToNumber = Number(item.productPrice)
      const subTotal = productPriceToNumber * item.quantity

      cartTotal += subTotal
      
    })

    cartTotalDisplay.textContent = cartTotal

    
  }
  
  cart.forEach(item => {
    const cartItemElement = document.createElement("div")

    const decreaseBtn = document.createElement("button")
    const quantityDisplay = document.createElement("span")
    const increaseBtn = document.createElement("button")
    const productInfo = document.createElement("div")
    const subTotalDisplay = document.createElement("span")

    decreaseBtn.textContent = "-"
    quantityDisplay.textContent = item.quantity
    increaseBtn.textContent = "+"
    productInfo.textContent = `${item.productName} - ₦${item.productPrice} - Size: ${item.size} - Quantity: ${item.quantity}`

    cartItemElement.appendChild(productInfo)
    cartItemElement.appendChild(decreaseBtn)
    cartItemElement.appendChild(quantityDisplay)
    cartItemElement.appendChild(increaseBtn)
    cartItemElement.appendChild(subTotalDisplay)

    cartContainer.appendChild(cartItemElement)

    // subtotal for price and display
    const productPriceToNumber = Number(item.productPrice)
    const subTotal = productPriceToNumber * item.quantity

    subTotalDisplay.textContent = "Subtotal: ₦" + subTotal

    // Increase button event
    increaseBtn.addEventListener("click", () => {
      item.quantity += 1

      quantityDisplay.textContent = item.quantity

      //subtotal for price and display for increase btn
      const productPriceToNumberForIncreaseBtn = Number(item.productPrice)
      const subTotalForIncreaseBtn = productPriceToNumberForIncreaseBtn * item.quantity

      subTotalDisplay.textContent = "Subtotal: ₦" + subTotalForIncreaseBtn

      updateCartFunction()

      localStorage.setItem("cart", JSON.stringify(cart))
      
    })

    // Decrease button event
    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1

        quantityDisplay.textContent = item.quantity
        
        //subtotal for price and display for decrease btn
        const productPriceToNumberForDecreaseBtn = Number(item.productPrice)
        const subTotalForDecreaseBtn = productPriceToNumberForDecreaseBtn * item.quantity

        subTotalDisplay.textContent = "Subtotal: ₦" + subTotalForDecreaseBtn
        
      } else {
        const newCart = cart.filter(cartItem => cartItem !== item)

        cart.length = 0
        cart.push(...newCart)

        cartItemElement.remove()
      }

      updateCartFunction()

      localStorage.setItem("cart", JSON.stringify(cart))
    })
    
  })
  updateCartFunction()

  cartContainer.appendChild(cartTotalDisplay)
  
}

addToCart.forEach(button => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId
    const productName = button.dataset.productName
    const productPrice = button.dataset.productPrice

    const select = document.querySelector(
      `select[data-product-id="${productId}"]`
    )

    const selectedSize = select.value

    const cartItem = {
      productId: productId,
      productName: productName,
      productPrice: productPrice,
      size: selectedSize,
      quantity: 1
    }

    const existingItem = cart.find(item =>
      item.productId === productId && item.size === selectedSize
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push(cartItem)
    }

    localStorage.setItem("cart", JSON.stringify(cart))
  })
})