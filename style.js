const productData = [
      { name: "Molen Original", price: "Rp.1.750", img: "images/m original.jpg" },
      { name: "Molen coklat", price: "Rp.1.750", img: "images/m coklat.jpg" },
      { name: "Molen Keju", price: "Rp.1.750", img: "images/m keju.jpg" },
      { name: "Molen kacang hijau", price: "Rp.1.750", img: "images/m kacang ijo.jpg" },
      { name: "Onde Original", price: "Rp.1.750", img: "images/onde original.jpg" },
      { name: "Onde ketan hitam", price: "Rp.1.750", img: "images/onde original.jpg" },
      { name: "Pastel isi Sayur", price: "Rp.1.750", img: "images/pastel.jpg" },
      { name: "Kue Soes Vanila", price: "Rp.2.500", img: "images/sus vanila.jpg" },
      { name: "Kue Soes Taro", price: "Rp.2.500", img: "images/sus vanila.jpg" },
      { name: "Kue Soes Sirkaya", price: "Rp.2.500", img: "images/sus vanila.jpg" },
      { name: "Kue Soes Ketan hitam", price: "Rp.2.500", img: "images/sus vanila.jpg" },
      { name: "Molen Original", price: "Rp.1.750", img: "images/m original.jpg" },
    ];

    const initialReviews = [
  {
    name: "Dian Permatasari",
    image: "pelanggan/D.png",
    rating: 4,
    timeAgo: "2 tahun yg lalu",
    comment: "Enak molen pisangnya. Kalau bisa harganya balik ke awal."
  },
  {
    name: "Neneng Rahayu",
    image: "pelanggan/N.png",
    rating: 4,
    timeAgo: "3 tahun yg lalu",
    comment: "Baru nyoba sekali .. enak onde nya renyah"
  },
  {
    name: "Mia Kamiyama",
    image: "pelanggan/M.png",
    rating: 3,
    timeAgo: "4 tahun yg lalu",
    comment: "Tadi saya beli molen di gofood, saya kaget pas dapatnya kok hanya ditaruh di kertas..."
  },
  {
    name: "Ridwan Alinov",
    image: "pelanggan/R.png",
    rating: 3,
    timeAgo: "2 tahun yg lalu",
    comment: "Molenya enak cuman pas saya beli di gerkalong depan cafe northwood, pegawai main PUBG-nya asik banget.. dan waktu saya beli dia kaya pengen buru-buru selesai buat nerusin Gamenya. Saya beli 10rb molen 5rb onde tapi pas saya cek di rumah isinya molen semua 😂 salah saya juga gk cek karna lagi hujan jadi buru."
  },
  {
    name: "Rahila Adhien",
    image: "pelanggan/RA.png",
    rating: 5,
    timeAgo: "4 tahun yg lalu",
    comment: ""
  }
];

const reviewList = document.getElementById("reviewList");

initialReviews.forEach((review) => {
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  const reviewCard = document.createElement("div");
  reviewCard.className = "bg-white p-4 rounded-xl shadow";

  reviewCard.innerHTML = `
  <div class="flex items-center mb-3">
    <img src="${review.image}" alt="${review.name}" width="40" height="40" loading="lazy" class="w-10 h-10 rounded-full mr-3">
    <div>
      <p class="font-semibold">${review.name}</p>
      <div class="text-yellow-500 text-sm">${stars}</div>
      <p class="text-xs text-gray-500">${review.timeAgo}</p>
    </div>
  </div>
  <p class="text-sm text-gray-700">${review.comment || '<i>(tidak ada komentar)</i>'}</p>
`;


  reviewList.appendChild(reviewCard);
});



const cart = [];

function loadProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  productData.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl p-3 shadow relative hover:shadow-md transition duration-300 hover:scale-[1.02]";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="rounded-md mb-2 w-full h-auto" width="150" height="100" loading="lazy" decoding="async" />
      <h4 class="font-semibold text-sm">${product.name}</h4>
      <span class="text-xs text-gray-600">${product.price}</span>
      <button onclick="addToCart(${index})" class="absolute top-2 right-2 bg-yellow-300 text-white rounded p-1 shadow hover:scale-110 hover:shadow-lg transition-all duration-300">
        <i class='fa fa-plus'></i>
      </button>
    `;
    container.appendChild(card);
  });
}

function addToCart(index) {
  const existing = cart.find(p => p.name === productData[index].name);
  if (existing) existing.qty += 1;
  else cart.push({ ...productData[index], qty: 1 });
  updateCart();
  showToast("Produk ditambahkan!");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

  if (cart.length === 0) {
    cartList.innerHTML = "<li>(Kosong)</li>";
    cartCount.classList.add("hidden");
    localStorage.removeItem("cart");
    return;
  }

  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    const harga = parseInt(item.price.replace(/\D/g, ""));
    total += harga * item.qty;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center border-b pb-1";
    li.innerHTML = `${item.name} x${item.qty} - Rp.${harga.toLocaleString("id-ID")}
      <button onclick="removeFromCart(${idx})" class="text-red-500"><i class='fa fa-trash'></i></button>`;
    cartList.appendChild(li);
  });
  const totalLi = document.createElement("li");
  totalLi.className = "font-bold text-right pt-2";
  totalLi.innerText = `Total: Rp.${total.toLocaleString("id-ID")}`;
  cartList.appendChild(totalLi);

  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.classList.remove("hidden");

  localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart(show) {
  const cartOverlay = document.getElementById("cartOverlay");
  if (show) {
    cartOverlay.classList.remove("hidden", "fade-out");
    cartOverlay.classList.add("flex", "fade-in");
  } else {
    cartOverlay.classList.remove("fade-in");
    cartOverlay.classList.add("fade-out");
    setTimeout(() => {
      cartOverlay.classList.add("hidden");
      cartOverlay.classList.remove("flex");
    }, 250);
  }
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.className = "fixed top-5 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50 opacity-0 transition-opacity duration-300";
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = "1", 10);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// Banner slideshow
const banner = document.getElementById("molenBanner");
const bgImages = ["images/utama.webp", "images/bg2.webp", "images/bg3.webp"];
let currentBg = 0;
function changeBannerBg() {
  banner.style.backgroundImage = `url('${bgImages[currentBg]}')`;
  currentBg = (currentBg + 1) % bgImages.length;
}
changeBannerBg();
setInterval(changeBannerBg, 5000);

// Search
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll("#productList .bg-white");
  productData.forEach((product, index) => {
    const match = product.name.toLowerCase().includes(query);
    cards[index].style.display = match ? "block" : "none";
  });
});

window.onload = () => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart.push(...JSON.parse(saved));
    updateCart();
  }
  loadProducts();
};
