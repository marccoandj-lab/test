const CACHE_NAME = 'economyswitch-v3';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/logo.png',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

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
});

self.addEventListener('fetch', (event) => {
    // Ignore backend API calls to avoid breaking CORS/Service Worker cache logic
    if (event.request.url.includes('/api/')) {
        return; 
    }

    // Network-first strategy for index.html/root to ensure fresh builds
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request).catch(err => {
                console.warn('SW Fetch fail (usually implies offline or blocked network):', event.request.url, err);
            }))
    );
});

self.addEventListener('push', (event) => {
    let data = { title: 'EconomySwitch', body: 'Time to check your circular economy!' };
    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch (e) {
        console.error('Error parsing push data:', e);
    }

    const options = {
        body: data.body,
        icon: '/logo.png',
        badge: '/logo.png',
        data: {
            url: self.location.origin
        },
        vibrate: [100, 50, 100]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

