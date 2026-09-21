const currentYear = new Date().getFullYear();

document.getElementById("date").textContent = currentYear;


const addToCart = document.querySelectorAll(".add-to-cart")
const cart = JSON.parse(localStorage.getItem("cart")) || []

const cartContainer = document.querySelector("#cart-container")

function formatPrice(price) {
  return Number(price).toLocaleString("en-NG")
}

if (cartContainer) {

  let cartTotal = 0

  const cartTotalDisplay = document.createElement("span")
  cartTotalDisplay.className = "cart-total"

  // WhatsApp order button
  const whatsAppBtn = document.createElement("button")
  whatsAppBtn.className = "whatsapp-btn"

  const whatsAppIcon = document.createElement("i")
  whatsAppIcon.className = "bi bi-whatsapp"

  whatsAppBtn.appendChild(whatsAppIcon)
  whatsAppBtn.append(" Order via WhatsApp")

  // WhatsApp event
  whatsAppBtn.addEventListener("click", () => {

    let orderMessage = "Hello, I'd like to place an order.\n\n"

    cart.forEach(item => {
      const productPriceToNumber = Number(item.productPrice)
      const subTotal = productPriceToNumber * item.quantity

      orderMessage += `${item.productName}\n`
      orderMessage += `Size: ${item.size}\n`
      orderMessage += `Quantity: ${item.quantity}\n`
      orderMessage += `Subtotal: ₦${formatPrice(subTotal)}\n\n`
    })

    orderMessage += `Total: ₦${formatPrice(cartTotal)}`

    const encodedMessage = encodeURIComponent(orderMessage)

    const whatsAppUrl = `https://wa.me/2348149149027?text=${encodedMessage}`

    window.open(whatsAppUrl, "_blank")
  })

  // Empty message
  if (cart.length === 0) {
    const emptyMsg = document.createElement("p")
    emptyMsg.className = "empty-cart"

    emptyMsg.textContent = "Your cart is empty"

    cartContainer.appendChild(emptyMsg)
  }

  // Total function
  function updateCartFunction() {
    cartTotal = 0

    cart.forEach(item => {

      const productPriceToNumber = Number(item.productPrice)
      const subTotal = productPriceToNumber * item.quantity

      cartTotal += subTotal
    })

    cartTotalDisplay.textContent =
      "Total: ₦" + formatPrice(cartTotal)
  }

  cart.forEach(item => {

    const cartItemElement = document.createElement("div")
    cartItemElement.className = "cart-item"

    // Product information
    const productInfo = document.createElement("div")
    productInfo.className = "cart-product-info"

    const productNameDisplay = document.createElement("h2")
    productNameDisplay.className = "cart-product-name"
    productNameDisplay.textContent = item.productName

    const productPriceDisplay = document.createElement("span")
    productPriceDisplay.className = "cart-product-price"
    productPriceDisplay.textContent =
      "₦" + formatPrice(item.productPrice)

    const productSizeDisplay = document.createElement("span")
    productSizeDisplay.className = "cart-product-size"
    productSizeDisplay.textContent = "Size: " + item.size

    const quantityLabel = document.createElement("span")
    quantityLabel.className = "cart-quantity-label"
    quantityLabel.textContent = "Quantity: " + item.quantity

    productInfo.appendChild(productNameDisplay)
    productInfo.appendChild(productPriceDisplay)
    productInfo.appendChild(productSizeDisplay)
    productInfo.appendChild(quantityLabel)

    // Subtotal
    const subTotalDisplay = document.createElement("span")
    subTotalDisplay.className = "cart-subtotal"

    const productPriceToNumber = Number(item.productPrice)
    const subTotal = productPriceToNumber * item.quantity

    subTotalDisplay.textContent =
      "Subtotal: ₦" + formatPrice(subTotal)

    // Quantity buttons
    const decreaseBtn = document.createElement("button")
    decreaseBtn.className = "quantity-btn decrease-btn"
    decreaseBtn.textContent = "-"

    const quantityDisplay = document.createElement("span")
    quantityDisplay.className = "quantity-display"
    quantityDisplay.textContent = item.quantity

    const increaseBtn = document.createElement("button")
    increaseBtn.className = "quantity-btn increase-btn"
    increaseBtn.textContent = "+"

    // Quantity controls
    const quantityControls = document.createElement("div")
    quantityControls.className = "quantity-controls"

    quantityControls.appendChild(decreaseBtn)
    quantityControls.appendChild(quantityDisplay)
    quantityControls.appendChild(increaseBtn)

    // Remove button
    const removeBtn = document.createElement("button")
    removeBtn.className = "remove-btn"
    removeBtn.textContent = "Remove"

    // Cart controls
    const cartControls = document.createElement("div")
    cartControls.className = "cart-controls"

    cartControls.appendChild(quantityControls)
    cartControls.appendChild(removeBtn)

    // Build cart item
    cartItemElement.appendChild(productInfo)
    cartItemElement.appendChild(subTotalDisplay)
    cartItemElement.appendChild(cartControls)

    cartContainer.appendChild(cartItemElement)

    // Remove event
    removeBtn.addEventListener("click", () => {

      const newCart = cart.filter(cartItem => cartItem !== item)

      cart.length = 0
      cart.push(...newCart)

      cartItemElement.remove()

      if (cart.length === 0) {

        const emptyMsg = document.createElement("p")
        emptyMsg.className = "empty-cart"
        emptyMsg.textContent = "Your cart is empty"

        cartTotalDisplay.remove()

        cartContainer.appendChild(emptyMsg)

        whatsAppBtn.remove()
      }

      updateCartFunction()

      localStorage.setItem("cart", JSON.stringify(cart))
    })

    // Increase button event
    increaseBtn.addEventListener("click", () => {

      item.quantity += 1

      quantityDisplay.textContent = item.quantity
      quantityLabel.textContent = "Quantity: " + item.quantity

      const productPriceToNumberForIncreaseBtn =
        Number(item.productPrice)

      const subTotalForIncreaseBtn =
        productPriceToNumberForIncreaseBtn * item.quantity

      subTotalDisplay.textContent =
        "Subtotal: ₦" + formatPrice(subTotalForIncreaseBtn)

      updateCartFunction()

      localStorage.setItem("cart", JSON.stringify(cart))
    })

    // Decrease button event
    decreaseBtn.addEventListener("click", () => {

      if (item.quantity > 1) {

        item.quantity -= 1

        quantityDisplay.textContent = item.quantity
        quantityLabel.textContent = "Quantity: " + item.quantity

        const productPriceToNumberForDecreaseBtn =
          Number(item.productPrice)

        const subTotalForDecreaseBtn =
          productPriceToNumberForDecreaseBtn * item.quantity

        subTotalDisplay.textContent =
          "Subtotal: ₦" + formatPrice(subTotalForDecreaseBtn)

      } else {

        const newCart = cart.filter(cartItem => cartItem !== item)

        cart.length = 0
        cart.push(...newCart)

        cartItemElement.remove()

        if (cart.length === 0) {

          const emptyMsg = document.createElement("p")
          emptyMsg.className = "empty-cart"
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
      item.productId === productId &&
      item.size === selectedSize
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