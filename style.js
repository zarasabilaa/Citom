
    const cart = {};
    const cartButton = document.getElementById('cartButton');
    const closeCartButton = document.getElementById('closeCart');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const reviewList = document.getElementById('reviewList');
    const toast = document.getElementById('toast');
    const phoneNumber = '628123456789';


    /* ===========================
        Modal Keranjang
    =========================== */
    cartButton.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        updateCartDisplay();
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    /* ===========================
        Smooth Scroll ke Menu
    =========================== */
    document.getElementById("scrollToMenu").addEventListener("click", () => {
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    /* ===========================
        Tambah ke Keranjang
    =========================== */
    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);

            if (cart[name]) {
                cart[name].qty += 1;
            } else {
                cart[name] = { price, qty: 1 };
            }
            updateCartDisplay();
        });
    });

    
    /* ===========================
        Update Tampilan Keranjang
    =========================== */
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

            // Tombol -/+
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

        // Update total & badge jumlah
        cartCount.textContent = totalQty;
        cartCount.classList.toggle('hidden', totalQty === 0);
        cartTotal.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;

        // Buat link WhatsApp
        const message = `Halo, saya ingin memesan:\n\n${waMessage.join('\n')}\n\nTotal: Rp${totalPrice.toLocaleString('id-ID')}`;
        const encodedMessage = encodeURIComponent(message);
        checkoutBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        checkoutBtn.target = "_blank";
    }

    /* ===========================
        Kirim Review
    =========================== */
    document.getElementById('whatsappForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const listItem = document.createElement('li');
        listItem.classList.add('bg-gray-100', 'p-4', 'rounded', 'shadow', 'animate-fade-in');
        listItem.innerHTML = `
            <h4 class="text-lg font-bold">${name} (<span class="text-blue-500">${email}</span>)</h4>
            <p class="text-gray-700 mt-2">${message}</p>
        `;

        reviewList.appendChild(listItem);
        document.getElementById('whatsappForm').reset();
        showToast("Review berhasil ditambahkan!");
    });

    /* ===========================
        Tampilkan Notifikasi
    =========================== */
    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    /* ===========================
        Pencarian Ulasan
    =========================== */
    document.getElementById('searchInput').addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        const items = document.querySelectorAll('#reviewList li');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? '' : 'none';
        });
    });
