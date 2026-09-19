const addToCart = document.querySelectorAll(".add-to-cart")
const cart = JSON.parse(localStorage.getItem("cart")) || []

const cartContainer = document.querySelector("#cart-container")

if (cartContainer) {

  let cartTotal = 0
  
  const cartTotalDisplay = document.createElement("span")

  //Whatsapp order button
  const whatsAppBtn = document.createElement("button")
  whatsAppBtn.textContent = "Order via WhatsApp"
  
  //Whatsapp event
  whatsAppBtn.addEventListener("click", () => {

    let orderMessage = "Hello, I'd like to place an order.\n\n"

    cart.forEach(item => {
      const productPriceToNumber = Number(item.productPrice)
      const subTotal = productPriceToNumber * item.quantity
  
      orderMessage += `${item.productName}\n`
      orderMessage += `Size: ${item.size}\n`
      orderMessage += `Quantity: ${item.quantity}\n`
      orderMessage += `Subtotal: ₦${subTotal}\n\n`
    })
  
    orderMessage += `Total: ₦${cartTotal}`
  
    const encodedMessage = encodeURIComponent(orderMessage)

    const whatsAppUrl = `https://wa.me/2348149149027?text=${encodedMessage}`

    window.open(whatsAppUrl, "_blank")
  })

  //Empty message 
  if (cart.length === 0){
    const emptyMsg = document.createElement("p")

    emptyMsg.textContent = "Your cart is empty"

    cartContainer.appendChild(emptyMsg)
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

    cartTotalDisplay.textContent = "Total: ₦" + cartTotal
  }
  
  cart.forEach(item => {
    const cartItemElement = document.createElement("div")

    const decreaseBtn = document.createElement("button")
    const quantityDisplay = document.createElement("span")
    const increaseBtn = document.createElement("button")
    const productInfo = document.createElement("div")
    const subTotalDisplay = document.createElement("span")
    
    //remove btn
    const removeBtn = document.createElement("button")

    decreaseBtn.textContent = "-"
    quantityDisplay.textContent = item.quantity
    increaseBtn.textContent = "+"
    productInfo.textContent = `${item.productName} - ₦${item.productPrice} - Size: ${item.size} - Quantity: ${item.quantity}`
    
    //removeBtn name
    removeBtn.textContent = "Remove"

    cartItemElement.appendChild(productInfo)
    cartItemElement.appendChild(decreaseBtn)
    cartItemElement.appendChild(quantityDisplay)
    cartItemElement.appendChild(increaseBtn)
    cartItemElement.appendChild(subTotalDisplay)
    
    //removeBtn append
    cartItemElement.appendChild(removeBtn)

    cartContainer.appendChild(cartItemElement)

    //removeBtn event
    removeBtn.addEventListener("click", () => {
      const newCart = cart.filter(cartItem => cartItem !== item)
    
      cart.length = 0
      cart.push(...newCart)
    
      cartItemElement.remove()
    
      if (cart.length === 0) {
        const emptyMsg = document.createElement("p")
    
        emptyMsg.textContent = "Your cart is empty"
    
        cartTotalDisplay.remove()
    
        cartContainer.appendChild(emptyMsg)

        whatsAppBtn.remove()
      }
    
      updateCartFunction()
    
      localStorage.setItem("cart", JSON.stringify(cart))
    })

    const productPriceToNumber = Number(item.productPrice)
    const subTotal = productPriceToNumber * item.quantity

    subTotalDisplay.textContent = "Subtotal: ₦" + subTotal

    //Increase button event
    increaseBtn.addEventListener("click", () => {
      item.quantity += 1

      quantityDisplay.textContent = item.quantity

      productInfo.textContent = `${item.productName} - ₦${item.productPrice} - Size: ${item.size} - Quantity: ${item.quantity}`

      const productPriceToNumberForIncreaseBtn = Number(item.productPrice)
      const subTotalForIncreaseBtn = productPriceToNumberForIncreaseBtn * item.quantity

      subTotalDisplay.textContent = "Subtotal: ₦" + subTotalForIncreaseBtn

      updateCartFunction()

      localStorage.setItem("cart", JSON.stringify(cart))
    })

    //Decrease button event
    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1

        quantityDisplay.textContent = item.quantity

        productInfo.textContent = `${item.productName} - ₦${item.productPrice} - Size: ${item.size} - Quantity: ${item.quantity}`
        
        const productPriceToNumberForDecreaseBtn = Number(item.productPrice)
        const subTotalForDecreaseBtn = productPriceToNumberForDecreaseBtn * item.quantity

        subTotalDisplay.textContent = "Subtotal: ₦" + subTotalForDecreaseBtn
        
      } else {
        const newCart = cart.filter(cartItem => cartItem !== item)

        cart.length = 0
        cart.push(...newCart)

        cartItemElement.remove()

        //Empty message 
        if (cart.length === 0){
          const emptyMsg = document.createElement("p")

          emptyMsg.textContent = "Your cart is empty"

          cartTotalDisplay.remove()

          cartContainer.appendChild(emptyMsg)

          whatsAppBtn.remove()
        }
      }

      updateCartFunction()

      localStorage.setItem("cart", JSON.stringify(cart))
    })
  })

  updateCartFunction()

  if (cart.length > 0) {
    cartContainer.appendChild(cartTotalDisplay)

    cartContainer.appendChild(whatsAppBtn)
  }
}

addToCart.forEach(button => {
  button.addEventListener("click", () => {

    const cartFeedback = button.nextElementSibling

    const productId = button.dataset.productId
    const productName = button.dataset.productName
    const productPrice = button.dataset.productPrice

    const select = document.querySelector(
      `select[data-product-id="${productId}"]`
    )

    const selectedSize = select.value

    if (selectedSize === "") {
      cartFeedback.textContent = "Please select a size"
      return
    }

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

    cartFeedback.textContent = "Added to cart"

    setTimeout(() => {
      cartFeedback.textContent = ""
    }, 2000)
  })
})