const cart = {};
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');


// Scroll to menu
document.getElementById("scrollToMenu").addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

// Tambah item ke keranjang
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

// Tampilkan keranjang
function updateCartDisplay() {
  cartItemsList.innerHTML = '';
  let totalQty = 0;
  let totalPrice = 0;
  let waMessage = [];

  for (const name in cart) {
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
      <div class="flex space-x-2 items-center">
        <button class="decreaseQty bg-yellow-400 text-white w-6 h-6 rounded" data-name="${name}">-</button>
        <button class="increaseQty bg-green-500 text-white w-6 h-6 rounded" data-name="${name}">+</button>
      </div>
    `;
    cartItemsList.appendChild(li);
  }

  cartCount.textContent = totalQty;
  cartCount.classList.toggle('hidden', totalQty === 0);
  cartTotal.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;

  const waNumber = '+6282123339954';
  checkoutBtn.href = `https://wa.me/${+6282123339954}?text=Halo%2C%20saya%20ingin%20memesan%3A%0A${waMessage.join('%0A')}`;

  // Tambah event listener untuk tombol + dan -
  document.querySelectorAll('.decreaseQty').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      if (cart[name].qty > 1) {
        cart[name].qty -= 1;
      } else {
        delete cart[name];
      }
      updateCartDisplay();
    });
  });

  document.querySelectorAll('.increaseQty').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      cart[name].qty += 1;
      updateCartDisplay();
    });
  });
}

// Tampilkan dan sembunyikan modal keranjang
document.getElementById('cartButton').addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

document.getElementById('closeCart').addEventListener('click', () => {
  cartModal.classList.add('hidden');
});


