// Toggle Nav start
// ********
// ********
// ********
const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('.menu-toggle').onclick = () => {
  navbarNav.classList.toggle('active');
};

// klik di luar sidebar(menghilangkan nav)
const menuToggle = document.querySelector('.menu-toggle');
const chek = document.querySelector('.chek');
document.addEventListener('click', function (e) {
  if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
    chek.checked = false;
  }
});
// ********
// ********
// ********
// Toggle Nav end



// dark-mode start
// ********
// ********
// ********
const html = document.querySelector('html');
const darkMode = document.querySelector('.dark-mode');
darkMode.addEventListener('click', function () {
  if (html.dataset.colorMode === 'light') {
    html.dataset.colorMode = 'dark';
    this.textContent = 'Light Mode';
  } else {
    html.dataset.colorMode = 'light';
    this.textContent = 'Dark Mode';

  }
});
// ********
// ********
// ********
// dark-mode end



// LightBox gallery card start
// ********
// ********
// ********
// membuat Elemen
const lightBoxContainer = document.createElement('div');
const lightBoxContent = document.createElement('div');
const lightBoxImg = document.createElement('img');

// menambahkan class lightbox di div
lightBoxContainer.classList.add('lightbox');
// menambahkan class lightbox-container di div
lightBoxContent.classList.add('lightbox-container');

// menambahkan elemen div didalam elemen div-lightboxcontainer
lightBoxContainer.appendChild(lightBoxContent);
// menambahkan elemen img didalam elemen div-lightboxcontent 
lightBoxContent.appendChild(lightBoxImg);
// menambahkan elemen baru kedalam Body
document.body.appendChild(lightBoxContainer);


// Mengambil elemen gambar
const thumb = document.getElementsByClassName('thumb');
let index = 1;
// fungsi menampilkan gambar dan lightbox
function showLightBox(n) {
  if (n > thumb.length) {
    index = 1;
  } else if (n < 1) {
    index = thumb.length;
  };

  let imgLocation = thumb[index - 1].children[0].getAttribute('src');
  lightBoxImg.setAttribute('src', imgLocation);
};

for (let i = 0; i < thumb.length; i++) {
  // aksi jika gambar di klik
  thumb[i].addEventListener('click', function () {
    lightBoxContainer.style.display = 'block';
    let imgIndex = parseInt(this.getAttribute('data-index'));

    showLightBox(index = imgIndex);
  });
};


const lightbox = document.querySelector('.lightbox');
lightBoxContainer.addEventListener('click', function (e) {
  if (this == e.target) {
    lightBoxContainer.style.display = 'none';
  }
})
// ********
// ********
// ********
// LightBox gallery card end



// MENGAMBIL DATA JSON START
// MENGGUNAKAN FETCH
fetch('data/news.json')
  .then(response => response.json())
  .then(response => {
    const newsData = response;
    let cards = '';
    newsData.forEach(news => cards += showCards(news));
    const rowNews = document.querySelector('.row-news');
    rowNews.innerHTML = cards;

    // ********
    // ********
    // ********
    // news carousel start
    let mouseDrag = false,
      startX, startScrollLeft;

    rowNews.addEventListener('mousedown', function (e) {
      mouseDrag = true;
      rowNews.classList.add('dragging');
      startX = e.pageX;
      startScrollLeft = rowNews.scrollLeft;
    });
    // ketika mouse di pindahkan akan mengambil nilai dari halaman
    rowNews.addEventListener('mousemove', function (e) {
      if (!mouseDrag) return; //jika mouseDrag nilainya false maka dikembalikan kesini
      rowNews.scrollLeft = startScrollLeft - (e.pageX - startX);
    });

    document.addEventListener('mouseup', function () {
      mouseDrag = false;
      rowNews.classList.remove('dragging');
    });

    // tombol left-right
    const lrBtn = document.querySelectorAll('.news button');
    const firstCardWidth = rowNews.querySelector('.news-card').offsetWidth;

    // menambahkan even pada tombol kiri-kanan untuk membuat card berpindah
    lrBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        rowNews.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
      });
    });
    // news carousel end
    // ********
    // ********
    // ********


    //modal news detail start 
    // ********
    // ********
    // ********
    // ketika tombol READ MORE DI KLIK start
    const readMore = document.querySelectorAll('.item-read-more');
    const modalNewsDetail = document.querySelector('#newsDetailModal');

    readMore.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        modalNewsDetail.style.display = 'flex';
        const newsId = parseInt(this.dataset.idnews);
        fetch('data/detailNews.json?id=' + newsId)
          .then(response => response.json())
          .then(data => {
            const foundNews = data.find(news => news.id === newsId);
            const newsDetail = showNewsDetail(foundNews);
            const newsDetailModal = document.querySelector('.modal-container');
            newsDetailModal.innerHTML = newsDetail;

            // ketika tombol close dan window di-click
            const btnModalClose = document.querySelector('.btn-modal-close');
            btnModalClose.addEventListener('click', function () {
              modalNewsDetail.style.display = 'none';
            });
            // ketika klik container card
            window.addEventListener('click', function (e) {
              if (e.target === modalNewsDetail) {
                modalNewsDetail.style.display = 'none';
              };
            });
            // ketika tombol READ MORE DI KLIK end
          });
      });
    });
    //modal news detail end 
    // ********
    // ********
    // ********
  });


function showCards(news) {
  return `<div class="news-card">
    <div class="news-img">
      <img src="${news.poster}" alt="news1" draggable="false">
    </div>
    <div class="news-details">
      <h3>${news.judul}</h3>
      <h4>${news.tanggal}</h4>
      <p>${news.deskripsi}</p>
      <a href="#" class="item-read-more" data-toggle="modal" data-target="#newsDetailModal" data-idnews="${news.id}">Read More</a>
    </div>
  </div>`;
};

function showNewsDetail(foundNews) {
  return `<button class="btn-modal-close">X</button>
        <div class="modal-content" id="newsDetaildModal">
          <img src="${foundNews.poster}" alt="news1">
          <div class="news-content">
            <h3>${foundNews.judul}</h3>
            <h4>${foundNews.tanggal}</h4>
            <p>${foundNews.deskripsi}</p>
          </div>
        </div>`;
};