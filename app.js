if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('✅ Service Worker registered', reg))
    .catch(err => console.error('❌ Service Worker failed', err));
}

const input = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

alert("Welcome to my gallery");

const loadImages = () => {
  const images = JSON.parse(localStorage.getItem('images') || '[]');
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });
};

input.addEventListener('change', () => {
  const files = Array.from(input.files);
  const images = JSON.parse(localStorage.getItem('images') || '[]');

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      images.push(e.target.result);
      localStorage.setItem('images', JSON.stringify(images));
      const img = document.createElement('img');
      img.src = e.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

loadImages();
