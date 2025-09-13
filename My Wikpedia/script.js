// Wikipedia API
const url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

// DOM elemanları
const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

// Form gönderildiğinde çalışacak olan kısım
formDOM.addEventListener("submit", (e) => {
    e.preventDefault(); // sayfanın yeniden yüklenmesini engeller
    const value = inputDOM.value.trim();
    
    if (!value) {
        resultsDOM.innerHTML = `<div>Lütfen geçerli bir şey giriniz</div>`;
        return;
    }

    // Değer varsa Wikipedia'dan API sorgusu yapılır
    fetchPages(value);
});

// Değer varsa sorguyu yapacak olan fonksiyon
const fetchPages = async (searchValue) => {
    resultsDOM.innerHTML = `<div>Yükleniyor...</div>`;

    try {
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        const results = data.query.search;

        if (results.length < 1) {
            resultsDOM.innerHTML = `<div>Sonuç bulunamadı</div>`;
            return;
        }

        renderResults(results);
    } catch (error) {
        resultsDOM.innerHTML = `<div>Bir hata oluştu</div>`;
    }
};

// Wikipedia'dan aldığı verileri HTML blokları olarak sıralayacak fonksiyon
const renderResults = (list) => {
    const cardList = list.map((item) => {
        const { title, snippet, pageid } = item;
        return `
        <a href="https://en.wikipedia.org/?curid=${pageid}" target="_blank" class="article">
            <h4>${title}</h4>
            <p>${snippet}</p>
        </a>`;
    }).join("");

    resultsDOM.innerHTML = `<div class="articles">${cardList}</div>`;
};