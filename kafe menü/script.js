// Ürün listesi
const products = [
  // Kahvaltı
  { id: 1, name: "Serpme Kahvaltı", desc: "Peynir, zeytin, bal, reçel, yumurta ve daha fazlası.", price: "250₺", category: "kahvalti", img: "img/kahvalti.png" },
  { id: 2, name: "Menemen", desc: "Domates, biber ve yumurta ile klasik Türk menemen.", price: "120₺", category: "kahvalti", img: "img/menemen.png" },

  // Burger
  { id: 3, name: "Cheeseburger Menü", desc: "Özel köfte, cheddar peyniri, patates kızartması ve içecek.", price: "200₺", category: "burger", img: "img/cheeseburger.png" },
  { id: 4, name: "Double Burger", desc: "Çift köfte, bol cheddar, karamelize soğan.", price: "240₺", category: "burger", img: "img/doubleburger.png" },

  // Yan ürünler (sadece bunlar kalacak)
  { id: 5, name: "Patates Kızartması", desc: "Altın sarısı çıtır patates kızartması.", price: "70₺", category: "yan", img: "img/patates.png" },
  { id: 6, name: "Soğan Halkası", desc: "Özel pane ile hazırlanmış soğan halkaları.", price: "80₺", category: "yan", img: "img/sogan.png" },

  // Tatlılar (yeni kategori)
  { id: 12, name: "Limonlu Cheesecake", desc: "Ferahlatıcı limon aromasıyla cheesecake.", price: "90₺", category: "tatli", img: "img/limonlucheesecake.png" },
  { id: 13, name: "San Sebastian Cheesecake", desc: "Karamelize üstüyle nefis San Sebastian.", price: "110₺", category: "tatli", img: "img/sansebastian.png" },
  { id: 14, name: "Çikolatalı Cheesecake", desc: "Yoğun çikolatalı cheesecake dilimi.", price: "95₺", category: "tatli", img: "img/cikolatali.png" },
  { id: 15, name: "Profiterol", desc: "Bol çikolata soslu profiterol tatlısı.", price: "85₺", category: "tatli", img: "img/profiterol.png" },
  { id: 16, name: "Tiramisu", desc: "Kahveli mascarpone kremasıyla tiramisu.", price: "90₺", category: "tatli", img: "img/tiramisu.png" },
  { id: 17, name: "Mozaik Pasta", desc: "Bisküvi ve çikolatanın mükemmel uyumu.", price: "70₺", category: "tatli", img: "img/mozaikpasta.png" },
  { id: 18, name: "Brownie", desc: "Yoğun çikolatalı brownie.", price: "80₺", category: "tatli", img: "img/brownie.png" },

  // İçecekler
  { id: 7, name: "Türk Kahvesi", desc: "Klasik közde Türk kahvesi.", price: "60₺", category: "icecek", img: "img/turkkahvesi.png" },
  { id: 8, name: "Latte", desc: "Sıcak süt ve espresso uyumu.", price: "75₺", category: "icecek", img: "img/latte.png" },
  { id: 9, name: "Taze Portakal Suyu", desc: "Tamamen taze sıkma portakal.", price: "65₺", category: "icecek", img: "img/portakal.png" },
  { id: 19, name: "Milkshake Çilekli", desc: "Serinletici çilekli milkshake.", price: "65₺", category: "icecek", img: "img/milkshakecilek.png" },
  { id: 20, name: "Milkshake Çikolatalı", desc: "Bol çikolatalı milkshake.", price: "65₺", category: "icecek", img: "img/milkshakecikolata.png" },
  { id: 21, name: "Limonata", desc: "Taze nane ile ev yapımı limonata.", price: "55₺", category: "icecek", img: "img/limonata.png" },

  // Pizza
  { id: 10, name: "Margherita Pizza", desc: "Mozzarella, domates sosu ve taze fesleğen.", price: "180₺", category: "pizza", img: "img/margherita.png" },
  { id: 11, name: "Sucuklu Pizza", desc: "Bol kaşar, sucuk, mantar ve zeytin.", price: "200₺", category: "pizza", img: "img/sucuklu.png" }
];

// DOM elementleri
const menuContainer = document.getElementById("menuContainer");
const categoryMenu = document.getElementById("categoryMenu");
const searchInput = document.getElementById("searchInput");

// Ürünleri render etme
function renderMenu(filterCategory = "all", searchTerm = "") {
  menuContainer.innerHTML = "";

  const filtered = products.filter(item => {
    const matchCategory = filterCategory === "all" || item.category === filterCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm) || item.desc.toLowerCase().includes(searchTerm);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    menuContainer.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#777;">Aradığınız kriterlere uygun ürün bulunamadı.</p>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-item";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price">${item.price}</div>
      </div>
    `;
    menuContainer.appendChild(card);
  });
}

// Kategori seçme
categoryMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    document.querySelectorAll("#categoryMenu li").forEach(li => li.classList.remove("active"));
    e.target.classList.add("active");
    const category = e.target.dataset.category;
    renderMenu(category, searchInput.value.toLowerCase());
  }
});

// Arama
searchInput.addEventListener("input", () => {
  const activeCategory = document.querySelector("#categoryMenu li.active").dataset.category;
  renderMenu(activeCategory, searchInput.value.toLowerCase());
});

// İlk yükleme
renderMenu();