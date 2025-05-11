// =============================
// Global Variables
// =============================
const cart = {};
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchInput');
const form = document.getElementById('whatsappForm');
const reviewList = document.getElementById('reviewList').querySelector('ul');

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

// Update Cart Display
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
      <div class="flex space-x-2 items-center">
        <button class="decreaseQty bg-yellow-400 text-white w-6 h-6 rounded" data-name="${name}">-</button>
        <button class="increaseQty bg-green-500 text-white w-6 h-6 rounded" data-name="${name}">+</button>
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  cartCount.textContent = totalQty;
  cartCount.classList.toggle('hidden', totalQty === 0);
  cartTotal.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;
}

// =============================
// Add Review to List Only
// =============================
// Load from LocalStorage
window.onload = () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.forEach(addReviewToList);
};

// Add Review
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const reviewData = { name, email, message };
    addReviewToList(reviewData);
    
    // Save to LocalStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.push(reviewData);
    localStorage.setItem('reviews', JSON.stringify(savedReviews));

    form.reset();
});

// Add Review to List
function addReviewToList({ name, email, message }) {
    const listItem = document.createElement('li');
    listItem.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');
    listItem.innerHTML = `
        <div class="flex justify-between">
            <div>
                <p class="font-bold text-lg">${name} (${email})</p>
                <p class="text-gray-700">${message}</p>
            </div>
            <button class="text-red-500 font-bold" onclick="removeReview(this)">Hapus</button>
        </div>
    `;
    reviewList.appendChild(listItem);
}

// Remove Review
function removeReview(button) {
    const listItem = button.parentElement.parentElement;
    const name = listItem.querySelector('p.font-bold').innerText.split(" ")[0];

    // Remove from LocalStorage
    let savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews = savedReviews.filter(review => review.name !== name);
    localStorage.setItem('reviews', JSON.stringify(savedReviews));

    // Remove from UI
    listItem.remove();
}

// Search Filter
searchInput.addEventListener('input', function(event) {
    const filter = event.target.value.toLowerCase();
    const listItems = reviewList.querySelectorAll('li');
    
    listItems.forEach(item => {
        const name = item.querySelector('p.font-bold').innerText.toLowerCase();
        item.style.display = name.includes(filter) ? '' : 'none';
    });
});