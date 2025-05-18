    const cart = {};
    const cartButton = document.getElementById('cartButton');
    const closeCartButton = document.getElementById('closeCart');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const reviewList = document.getElementById('reviewList');
    const toast = document.getElementById('toast');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const phoneNumber = '628123456789'; // Nomor WhatsApp tujuan

    // Daftar harga produk
    const priceList = {
        'Ayam Bakar': 25000,
        'Nasi Goreng': 20000,
        'Es Teh Manis': 5000
    };

    /* ===========================
        Event Listener Modal Keranjang
    =========================== */
    cartButton.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
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
        Fungsi Menambah ke Keranjang
    =========================== */
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

    /* ===========================
        Fungsi Update Tampilan Keranjang
    =========================== */
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let totalQty = 0;
        let totalPrice = 0;
        let waMessage = [];

        // Looping produk dalam keranjang
        Object.keys(cart).forEach(name => {
            const item = cart[name];
            const subtotal = item.price * item.qty;

            totalQty += item.qty;
            totalPrice += subtotal;
            waMessage.push(`• ${name} x${item.qty} - Rp${subtotal.toLocaleString('id-ID')}`);

            // Buat list item
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

            // Event Listener untuk tombol +/- 
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

        // Update tampilan total dan jumlah
        cartCount.textContent = totalQty;
        cartCount.classList.toggle('hidden', totalQty === 0);
        cartTotal.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;

        // ===========================
        // Update link WhatsApp
        // ===========================
        const message = `Halo, saya ingin memesan:\n\n${waMessage.join('\n')}\n\nTotal: Rp${totalPrice.toLocaleString('id-ID')}`;
        const encodedMessage = encodeURIComponent(message);
        checkoutBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        checkoutBtn.target = "_blank";
    }

    

        // ===========================
        // Event Listener Form Submit
        // ===========================
        document.getElementById('whatsappForm').addEventListener('submit', function (event) {
            event.preventDefault();

            // Ambil nilai input
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Buat elemen list baru
            const listItem = document.createElement('li');
            listItem.classList.add('bg-gray-100', 'p-4', 'rounded', 'shadow', 'animate-fade-in');
            listItem.innerHTML = `
                <h4 class="text-lg font-bold">${name} (<span class="text-blue-500">${email}</span>)</h4>
                <p class="text-gray-700 mt-2">${message}</p>
            `;

            // Masukkan ke dalam ulasan
            reviewList.prepend(listItem);

            // Bersihkan form
            document.getElementById('whatsappForm').reset();

            // Tampilkan notifikasi
            showToast("Review berhasil ditambahkan!");
        });

        // ===========================
        // Fungsi Tampilkan Notifikasi
        // ===========================
        function showToast(message) {
            toast.textContent = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        // ===========================
        // Pencarian Ulasan
        // ===========================
        document.getElementById('searchInput').addEventListener('input', function () {
            const filter = this.value.toLowerCase();
            const items = document.querySelectorAll('#reviewList li');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? '' : 'none';
            });
        });