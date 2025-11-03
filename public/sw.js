// Service Worker for PWA functionality
const CACHE_NAME = 'lohith-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts/main.js',
  '/scripts/three-bg.js',
  '/scripts/starfield.js',
  '/manifest.json',
  '/favicon.ico',
  '/public/assets/profile.webp',
  '/public/assets/lumoro.webp',
  '/public/assets/safenet.webp',
  '/public/assets/fraud.webp',
  '/public/assets/fakenews.webp',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://unpkg.com/aos@2.3.4/dist/aos.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.min.css',
  'https://cdn.jsdelivr.net/npm/typed.js@2.0.12'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});

// Background sync for contact form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Implementation for syncing offline form submissions
  // This would typically send queued form data to the server
  console.log('Syncing contact form data...');
}
