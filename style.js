// Smooth Scroll untuk navigasi anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Toggle menu mobile
document.getElementById('menuToggle').addEventListener('click', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('hidden');
});

// Objek keranjang
const cart = {};

// Elemen-elemen penting
const cartCount     = document.getElementById('cartCount');
const cartModal     = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItems');
const cartTotal     = document.getElementById('cartTotal');
const checkoutBtn   = document.getElementById('checkoutBtn');

// Tombol "Pesan" → Tambahkan item ke keranjang
document.querySelectorAll('.addToCart').forEach(button => {
  button.addEventListener('click', () => {
    const name  = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));

    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = { price, qty: 1 };
    }

    updateCartDisplay();
  });
});

// Update tampilan isi keranjang
function updateCartDisplay() {
  cartItemsList.innerHTML = '';
  let totalQty = 0;
  let waMessage = [];

  for (const name in cart) {
    const item = cart[name];
    totalQty += item.qty;

    // Siapkan isi pesan WA
    waMessage.push(`• ${name} x${item.qty} - Rp${(item.price * item.qty).toLocaleString('id-ID')}`);

    // Elemen list untuk tiap item
    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-blue-50 px-3 py-2 rounded";
    li.innerHTML = `
      <div>
        <span class="font-semibold">${name}</span><br>
        <span class="text-sm text-gray-600">Rp${item.price.toLocaleString('id-ID')} x ${item.qty}</span>
      </div>
      <div class="flex space-x-2 items-center">
        <button class="decreaseQty bg-yellow-400 text-white w-6 h-6 rounded" data-name="${name}">-</button>
        <button class="removeItem bg-red-500 text-white w-6 h-6 rounded" data-name="${name}">x</button>
      </div>
    `;
    cartItemsList.appendChild(li);
  }

  // Update jumlah keranjang & badge
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('hidden', totalQty === 0);
  cartTotal.textContent = totalQty;

  // Link WA untuk checkout
  const waNumber = '6281234567890'; // Ganti dengan nomor tujuan
  checkoutBtn.href = `https://wa.me/${waNumber}?text=Halo%2C%20saya%20ingin%20memesan%3A%0A${waMessage.join('%0A')}`;

  // Tombol kurangi qty
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

  // Tombol hapus item
  document.querySelectorAll('.removeItem').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      delete cart[name];
      updateCartDisplay();
    });
  });
}

// Tampilkan keranjang
document.getElementById('cartButton').addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

// Tutup keranjang
document.getElementById('closeCart').addEventListener('click', () => {
  cartModal.classList.add('hidden');
});
