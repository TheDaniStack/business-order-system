const addToCart = document.querySelectorAll(".add-to-cart")

const cart = [];

addToCart.forEach( button => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId
      const productName = button.dataset.productName
      const productPrice = button.dataset.productPrice

      const select = document.querySelector(`select[data-product-id="${productId}"]`)

      const selectedSize = select.value

      const cartItem = {
        productId: productId,
        size: selectedSize,
        quantity: 1
      }
      const existingItem = cart.find(item =>
        item.productId === productId && item.size === selectedSize
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else{
        cart.push(cartItem)
      }

      alert(existingItem ? existingItem.quantity : cartItem.quantity)
      
    })
})