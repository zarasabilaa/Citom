// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
  const cart = [];
  const cartCount = document.getElementById('cartCount');
  const cartModal = document.getElementById('cartModal');
  const cartItemsList = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));

      // Tambah item ke cart
      cart.push({ name, price });
      updateCartDisplay();
    });
  });

  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - Rp${item.price.toLocaleString('id-ID')}`;
      cartItemsList.appendChild(li);
    });

    cartCount.textContent = cart.length;
    cartCount.classList.remove('hidden');
    cartTotal.textContent = cart.length;

    // Buat link WhatsApp
    const message = cart.map(item => `• ${item.name} - Rp${item.price.toLocaleString('id-ID')}`).join('%0A');
    const waNumber = '6281234567890'; // ganti dengan nomor WA asli
    checkoutBtn.href = `https://wa.me/${waNumber}?text=Halo%2C%20saya%20ingin%20memesan%3A%0A${message}`;
  }

  // Tampilkan modal keranjang
  document.getElementById('cartButton').addEventListener('click', () => {
    cartModal.classList.remove('hidden');
  });

  // Tutup modal
  document.getElementById('closeCart').addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
