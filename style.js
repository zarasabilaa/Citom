    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });

    const cart = {};
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalHarga = document.getElementById('cartTotalHarga');
    const checkoutBtn = document.getElementById('checkoutBtn');

    document.querySelectorAll('.addToCart').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        if (cart[name]) {
          cart[name].qty++;
        } else {
          cart[name] = { price, qty: 1 };
        }
        updateCartDisplay();
      });
    });

    function updateCartDisplay() {
      cartItemsList.innerHTML = '';
      let totalQty = 0;
      let totalHarga = 0;
      let waMessage = [];

      for (const name in cart) {
        const item = cart[name];
        totalQty += item.qty;
        totalHarga += item.qty * item.price;
        waMessage.push(`• ${name} x${item.qty} - Rp${(item.price * item.qty).toLocaleString('id-ID')}`);

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

      cartCount.textContent = totalQty;
      cartCount.classList.toggle('hidden', totalQty === 0);
      cartTotal.textContent = totalQty;
      cartTotalHarga.textContent = `Rp${totalHarga.toLocaleString('id-ID')}`;

      const waNumber = '6281234567890';
      checkoutBtn.href = `https://wa.me/${waNumber}?text=Halo%2C%20saya%20ingin%20memesan%3A%0A${waMessage.join('%0A')}`;

      document.querySelectorAll('.decreaseQty').forEach(button => {
        button.addEventListener('click', () => {
          const name = button.getAttribute('data-name');
          if (cart[name].qty > 1) {
            cart[name].qty--;
          } else {
            delete cart[name];
          }
          updateCartDisplay();
        });
      });

      document.querySelectorAll('.removeItem').forEach(button => {
        button.addEventListener('click', () => {
          const name = button.getAttribute('data-name');
          delete cart[name];
          updateCartDisplay();
        });
      });
    }

    const cartBtn = document.getElementById('cartButton');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
      });
    }

    document.getElementById('closeCart').addEventListener('click', () => {
      cartModal.classList.add('hidden');
    });