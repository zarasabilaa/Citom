// =============================
// Inisialisasi Variabel
// =============================
const cart = {};
const cartButton = document.getElementById('cartButton');
const closeCartButton = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// =============================
// Event Listener untuk Modal
// =============================
cartButton.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

closeCartButton.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// =============================
// Smooth Scroll to Menu Section
// =============================
document.getElementById("scrollToMenu").addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

// =============================
// Shopping Cart Functions
// =============================
// Add item to the cart
document.querySelectorAll('.addToCart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));

    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = { price, qty: 1 };
    }

    updateCartDisplay();
  });
});

// =============================
// Update Cart Display
// =============================
function updateCartDisplay() {
  cartItemsList.innerHTML = '';
  let totalQty = 0;
  let totalPrice = 0;
  let waMessage = [];

  Object.keys(cart).forEach(name => {
    const item = cart[name];
    const subtotal = item.price * item.qty;

    totalQty += item.qty;
    totalPrice += subtotal;
    waMessage.push(`• ${name} x${item.qty} - Rp${subtotal.toLocaleString('id-ID')}`);

    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-blue-50 px-3 py-2 rounded";
    li.innerHTML = `
      <div>
        <span class="font-semibold">${name}</span><br>
        <span class="text-sm text-gray-600">Rp${item.price.toLocaleString('id-ID')} x ${item.qty}</span>
      </div>
      <div class='flex space-x-2 items-center'>
        <button class='decreaseQty bg-yellow-400 text-white w-6 h-6 rounded' data-name='${name}'>-</button>
        <button class='increaseQty bg-green-500 text-white w-6 h-6 rounded' data-name='${name}'>+</button>
      </div>
    `;

    // Event listener for buttons
    li.querySelector('.decreaseQty').addEventListener('click', () => {
      if (cart[name].qty > 1) {
        cart[name].qty -= 1;
      } else {
        delete cart[name];
      }
      updateCartDisplay();
    });

    li.querySelector('.increaseQty').addEventListener('click', () => {
      cart[name].qty += 1;
      updateCartDisplay();
    });

    cartItemsList.appendChild(li);
  });

  cartCount.textContent = totalQty;
  cartCount.classList.toggle('hidden', totalQty === 0);
  cartTotal.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;

  // =============================
  // Checkout Button WhatsApp
  // =============================
  const phoneNumber = '628123456789'; // Ganti dengan nomor WhatsApp kamu
  const message = `Halo, saya ingin memesan:\n\n${waMessage.join('\n')}\n\nTotal: Rp${totalPrice.toLocaleString('id-ID')}`;
  const encodedMessage = encodeURIComponent(message);
  checkoutBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  checkoutBtn.target = "_blank";
}
