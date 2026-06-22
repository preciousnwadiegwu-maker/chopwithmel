// Branded illustrated card for add-ons & side items — emoji + label on warm gradient
// Uses encodeURIComponent for cross-browser SVG data URI compatibility (H4)
const CARD = (emoji, label, color1 = '#FEF3E7', color2 = '#FCD9B6') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}"/><stop offset="100%" stop-color="${color2}"/>
    </linearGradient></defs>
    <rect width="400" height="220" fill="url(#g)"/>
    <text x="200" y="115" font-size="90" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
    <text x="200" y="185" font-family="Karla,sans-serif" font-size="18" font-weight="700" fill="#DC2626" text-anchor="middle">${label}</text>
  </svg>`.replace(/\n\s*/g, '');
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// ─── MENU DATA ───────────────────────────────────────────────────────────────

const MENU = [
  // SOUPS
  { id: 1,  category: 'Soups', name: 'Egusi Soup (2L)',            description: 'Rich melon-seed soup with assorted meat and stockfish.',         price: 50000,  emoji: '🥘', image: '/images/egusi-soup.jpg' },
  { id: 2,  category: 'Soups', name: 'Egusi Soup (4L)',            description: 'Rich melon-seed soup with assorted meat and stockfish.',         price: 95000,  emoji: '🥘', image: '/images/egusi-soup.jpg' },
  { id: 3,  category: 'Soups', name: 'Banga Soup (2L)',            description: 'Palm fruit soup, slow-cooked with dried fish and spices.',       price: 50000,  emoji: '🍲', image: '/images/banga-soup.jpg' },
  { id: 4,  category: 'Soups', name: 'Banga Soup (4L)',            description: 'Palm fruit soup, slow-cooked with dried fish and spices.',       price: 95000,  emoji: '🍲', image: '/images/banga-soup.jpg' },
  { id: 5,  category: 'Soups', name: 'Afang Soup (2L)',            description: 'Efik classic with waterleaf, shredded meat, and periwinkle.',    price: 50000,  emoji: '🫕', image: '/images/afang-soup.jpg' },
  { id: 6,  category: 'Soups', name: 'Afang Soup (4L)',            description: 'Efik classic with waterleaf, shredded meat, and periwinkle.',    price: 95000,  emoji: '🫕', image: '/images/afang-soup.jpg' },
  { id: 7,  category: 'Soups', name: 'Fisherman Soup (2L)',        description: 'Spicy Delta-style soup loaded with fresh fish and seafood.',      price: 70000,  emoji: '🐟', image: CARD('🐟', 'Fisherman Soup', '#D4E5F7', '#1E5C8F') },
  { id: 8,  category: 'Soups', name: 'Fisherman Soup (4L)',        description: 'Spicy Delta-style soup loaded with fresh fish and seafood.',      price: 120000, emoji: '🐟', image: CARD('🐟', 'Fisherman Soup', '#D4E5F7', '#1E5C8F') },
  { id: 9,  category: 'Soups', name: 'Owo Soup (2L)',              description: 'Urhobo palm nut soup with crayfish and dried fish.',              price: 50000,  emoji: '🍵', image: '/images/owo-soup-starch.jpg' },
  { id: 10, category: 'Soups', name: 'Owo Soup (4L)',              description: 'Urhobo palm nut soup with crayfish and dried fish.',              price: 95000,  emoji: '🍵', image: '/images/owo-soup-starch.jpg' },
  { id: 11, category: 'Soups', name: 'Okro Soup (2L)',             description: 'Fresh okra cooked with assorted meat.',                         price: 50000,  emoji: '🥗', image: '/images/okro-soup.jpg' },
  { id: 12, category: 'Soups', name: 'Okro Soup (4L)',             description: 'Fresh okra cooked with assorted meat.',                         price: 95000,  emoji: '🥗', image: '/images/okro-soup.jpg' },
  { id: 13, category: 'Soups', name: 'Oha Soup (2L)',              description: 'Igbo oha leaf soup with cocoyam and assorted meat.',             price: 50000,  emoji: '🌿', image: '/images/oha-soup.jpg' },
  { id: 14, category: 'Soups', name: 'Oha Soup (4L)',              description: 'Igbo oha leaf soup with cocoyam and assorted meat.',             price: 95000,  emoji: '🌿', image: '/images/oha-soup.jpg' },
  { id: 80, category: 'Soups', name: 'Efo Riro (2L)', description: 'Yoruba spinach stew with assorted meat, kpomo, and dried fish.',  price: 55000, emoji: '🥬', image: '/images/efo-riro.jpg' },
  { id: 81, category: 'Soups', name: 'Efo Riro (4L)', description: 'Yoruba spinach stew with assorted meat, kpomo, and dried fish.',  price: 90000, emoji: '🥬', image: '/images/efo-riro.jpg' },
  { id: 15, category: 'Soups', name: 'Bitterleaf Soup (2L)',       description: 'Hearty Igbo soup with bitterleaf, cocoyam, and meat.',           price: 50000,  emoji: '🍃', image: '/images/bitterleaf-soup.jpg' },
  { id: 16, category: 'Soups', name: 'Bitterleaf Soup (4L)',       description: 'Hearty Igbo soup with bitterleaf, cocoyam, and meat.',           price: 95000,  emoji: '🍃', image: '/images/bitterleaf-soup.jpg' },

  // SWALLOW
  { id: 78, category: 'Swallow', name: 'Owo Soup & Starch (2L)', description: 'Delta classic — Urhobo owo soup with smooth cassava starch, assorted meat and fish.', price: 55000,  emoji: '🍽️', image: '/images/owo-soup-starch.jpg' },
  { id: 79, category: 'Swallow', name: 'Owo Soup & Starch (4L)', description: 'Delta classic — Urhobo owo soup with smooth cassava starch, assorted meat and fish.', price: 100000, emoji: '🍽️', image: '/images/owo-soup-starch.jpg' },
  { id: 74, category: 'Swallow', name: 'Amala, Ewedu, Gbegiri & Assorted Fish (2L)', description: 'Yoruba classic — smooth amala with ewedu, gbegiri, assorted meat and fish.', price: 60000,  emoji: '🍜', image: '/images/amala-ewedu.jpg' },
  { id: 75, category: 'Swallow', name: 'Amala, Ewedu, Gbegiri & Assorted Fish (4L)', description: 'Yoruba classic — smooth amala with ewedu, gbegiri, assorted meat and fish.', price: 110000, emoji: '🍜', image: '/images/amala-ewedu.jpg' },

  // STEWS
  { id: 17, category: 'Stews', name: 'Chicken Stew (2L)',          description: 'Tomato-based stew with tender chicken pieces.',                  price: 40000,  emoji: '🍗', image: '/images/chicken-stew.jpg' },
  { id: 18, category: 'Stews', name: 'Chicken Stew (4L)',          description: 'Tomato-based stew with tender chicken pieces.',                  price: 80000,  emoji: '🍗', image: '/images/chicken-stew.jpg' },
  { id: 19, category: 'Stews', name: 'Turkey Stew (2L)',           description: 'Rich tomato stew with well-seasoned turkey.',                    price: 40000,  emoji: '🦃', image: CARD('🦃', 'Turkey Stew',   '#FFD9B5', '#A0522D') },
  { id: 20, category: 'Stews', name: 'Turkey Stew (4L)',           description: 'Rich tomato stew with well-seasoned turkey.',                    price: 80000,  emoji: '🦃', image: CARD('🦃', 'Turkey Stew',   '#FFD9B5', '#A0522D') },
  { id: 21, category: 'Stews', name: 'Beef Stew (2L)',             description: 'Classic Nigerian beef stew, slow-cooked to perfection.',         price: 40000,  emoji: '🥩', image: '/images/beef-stew.jpg' },
  { id: 22, category: 'Stews', name: 'Beef Stew (4L)',             description: 'Classic Nigerian beef stew, slow-cooked to perfection.',         price: 80000,  emoji: '🥩', image: '/images/beef-stew.jpg' },
  { id: 23, category: 'Stews', name: 'Assorted Meat Stew (2L)',    description: 'Mixed meat stew — beef, tripe, and more.',                       price: 40000,  emoji: '🍖', image: '/images/assorted-stew.jpg' },
  { id: 24, category: 'Stews', name: 'Assorted Meat Stew (4L)',    description: 'Mixed meat stew — beef, tripe, and more.',                       price: 80000,  emoji: '🍖', image: '/images/assorted-stew.jpg' },
  { id: 25, category: 'Stews', name: 'Stir Fry Sauce (2L)',        description: 'Vibrant stir-fry sauce packed with peppers and spices.',         price: 40000,  emoji: '🫙', image: CARD('🫙', 'Stir Fry Sauce', '#FFD4D4', '#E74C3C') },
  { id: 26, category: 'Stews', name: 'Stir Fry Sauce (4L)',        description: 'Vibrant stir-fry sauce packed with peppers and spices.',         price: 80000,  emoji: '🫙', image: CARD('🫙', 'Stir Fry Sauce', '#FFD4D4', '#E74C3C') },

  // PEPPER SOUP
  { id: 35, category: 'Pepper Soup', name: 'Catfish Pepper Soup (2L)',       description: 'Point-and-kill catfish in a rich, aromatic broth with fresh herbs.', price: 35000, emoji: '🐠',  image: '/images/catfish-pepper-soup.jpg' },
  { id: 36, category: 'Pepper Soup', name: 'Catfish Pepper Soup (4L)',       description: 'Point-and-kill catfish in a rich, aromatic broth with fresh herbs.', price: 70000, emoji: '🐠',  image: '/images/catfish-pepper-soup.jpg' },
  { id: 27, category: 'Pepper Soup', name: 'Chicken Pepper Soup (2L)',       description: 'Tender chicken simmered in a hot, aromatic broth with scent leaves.', price: 35000, emoji: '🐔', image: '/images/chicken-pepper-soup.jpg' },
  { id: 28, category: 'Pepper Soup', name: 'Chicken Pepper Soup (4L)',       description: 'Tender chicken simmered in a hot, aromatic broth with scent leaves.', price: 70000, emoji: '🐔', image: '/images/chicken-pepper-soup.jpg' },

  // RICE & PASTA
  { id: 76, category: 'Rice & Pasta', name: 'Ofe Akwu & White Rice (2L)', description: 'Igbo palm nut soup (ofe akwu) served with fluffy white rice.',  price: 55000,  emoji: '🍚', image: '/images/ofe-akwu-white-rice.jpg' },
  { id: 77, category: 'Rice & Pasta', name: 'Ofe Akwu & White Rice (4L)', description: 'Igbo palm nut soup (ofe akwu) served with fluffy white rice.',  price: 100000, emoji: '🍚', image: '/images/ofe-akwu-white-rice.jpg' },
  { id: 37, category: 'Rice & Pasta', name: 'Native Rice (2L)',              description: 'Ofada-style native rice cooked in palm oil sauce.',             price: 40000,  emoji: '🍚', image: CARD('🍚', 'Native Rice',       '#F5E6D3', '#8B4513') },
  { id: 38, category: 'Rice & Pasta', name: 'Native Rice (4L)',              description: 'Ofada-style native rice cooked in palm oil sauce.',             price: 80000,  emoji: '🍚', image: CARD('🍚', 'Native Rice',       '#F5E6D3', '#8B4513') },
  { id: 83, category: 'Rice & Pasta', name: 'Jollof & Chicken Lunch Pack', description: 'Single-serve bento — smoky party jollof topped with chicken and peppered onions. Perfect for office lunch, events and bulk orders.', price: 5000, emoji: '🍱', image: '/images/jollof-chicken-lunch-pack.jpg' },
  { id: 84, category: 'Rice & Pasta', name: 'Signature Coconut Rice Pack', description: 'Premium single-serve pack — fragrant basmati coconut rice loaded with prawns, dried fish, ponmo, beef and smoked meat.', price: 15000, emoji: '🥥', image: '/images/signature-coconut-rice-pack.jpg' },
  { id: 82, category: 'Rice & Pasta', name: 'Jollof Bowl + 4 Chicken Pieces (1L)', description: 'Single-serve bowl — 1 litre smoky party jollof paired with 4 large peppered chicken pieces.', price: 30000, emoji: '🍗', image: '/images/jollof-chicken-bowl.jpg' },
  { id: 39, category: 'Rice & Pasta', name: 'Party Jollof Rice (2L)',        description: 'Authentic smoky party jollof — the real deal, fire-cooked.',    price: 40000,  emoji: '🍛', image: '/images/jollof-rice.jpg' },
  { id: 40, category: 'Rice & Pasta', name: 'Party Jollof Rice (4L)',        description: 'Authentic smoky party jollof — the real deal, fire-cooked.',    price: 80000,  emoji: '🍛', image: '/images/jollof-rice.jpg' },
  { id: 72, category: 'Rice & Pasta', name: 'Delta Coconut Rice & Assorted Meat Sauce (2L)', description: 'Delta-style coconut rice served with a rich assorted meat sauce.',  price: 50000,  emoji: '🥥', image: '/images/delta-coconut-rice.jpg' },
  { id: 73, category: 'Rice & Pasta', name: 'Delta Coconut Rice & Assorted Meat Sauce (4L)', description: 'Delta-style coconut rice served with a rich assorted meat sauce.',  price: 110000, emoji: '🥥', image: '/images/delta-coconut-rice.jpg' },
  { id: 41, category: 'Rice & Pasta', name: 'Seafood Coconut Rice (2L)',     description: 'Coconut rice loaded with shrimp, crab, and mixed seafood.',     price: 50000,  emoji: '🦐', image: CARD('🦐', 'Seafood Coconut Rice', '#FFE5D9', '#FF6B6B') },
  { id: 42, category: 'Rice & Pasta', name: 'Seafood Coconut Rice (4L)',     description: 'Coconut rice loaded with shrimp, crab, and mixed seafood.',     price: 110000, emoji: '🦐', image: CARD('🦐', 'Seafood Coconut Rice', '#FFE5D9', '#FF6B6B') },
  { id: 43, category: 'Rice & Pasta', name: 'Special Coconut Rice (2L)',     description: 'Fragrant coconut rice with special Mel seasoning.',             price: 40000,  emoji: '🥥', image: CARD('🥥', 'Special Coconut Rice', '#FFFAF0', '#8B7355') },
  { id: 44, category: 'Rice & Pasta', name: 'Special Coconut Rice (4L)',     description: 'Fragrant coconut rice with special Mel seasoning.',             price: 80000,  emoji: '🥥', image: CARD('🥥', 'Special Coconut Rice', '#FFFAF0', '#8B7355') },
  { id: 45, category: 'Rice & Pasta', name: 'Asun Jollof Rice (2L)',         description: 'Jollof rice topped with peppered goat meat (asun).',           price: 40000,  emoji: '🍖', image: '/images/jollof-rice.jpg' },
  { id: 46, category: 'Rice & Pasta', name: 'Asun Jollof Rice (4L)',         description: 'Jollof rice topped with peppered goat meat (asun).',           price: 80000,  emoji: '🍖', image: '/images/jollof-rice.jpg' },
  { id: 47, category: 'Rice & Pasta', name: 'Fried Rice (2L)',               description: 'Golden fried rice with mixed veggies and seasoning.',           price: 40000,  emoji: '🍳', image: '/images/fried-rice.jpg' },
  { id: 48, category: 'Rice & Pasta', name: 'Fried Rice (4L)',               description: 'Golden fried rice with mixed veggies and seasoning.',           price: 80000,  emoji: '🍳', image: '/images/fried-rice.jpg' },
  { id: 51, category: 'Rice & Pasta', name: 'Surf and Turf Linguine Pasta (2L)',  description: 'Jollof-style linguine tossed with prawns, calamari and fresh fish in a smoky pepper sauce.', price: 55000,  emoji: '🍤', image: '/images/seafood-pasta.jpg' },
  { id: 52, category: 'Rice & Pasta', name: 'Surf and Turf Linguine Pasta (4L)',  description: 'Jollof-style linguine tossed with prawns, calamari and fresh fish in a smoky pepper sauce.', price: 110000, emoji: '🍤', image: '/images/seafood-pasta.jpg' },
  { id: 55, category: 'Rice & Pasta', name: 'Beef Stir Fry Pack', description: 'Single-serve takeaway — spicy stir-fry spaghetti tossed with tender beef strips, peppers and onions.', price: 10000, emoji: '🍝', image: '/images/beef-stir-fry-pasta.jpg' },

  // BURGERS
  { id: 57, category: 'Burgers', name: 'Breakfast Fast Burger',    description: 'Fully loaded breakfast burger — egg, bacon, sausage, and more.',  price: 15000, emoji: '🍔', image: '/images/breakfast-burger.jpg' },
  { id: 71, category: 'Burgers', name: 'Breakfast Burger & Sandwich Melt Combo', description: 'The ultimate combo — a loaded breakfast burger paired with a golden sandwich melt.', price: 50000, emoji: '🍔', image: '/images/burger-sandwich-combo.jpg' },

  // BREAKFAST
  { id: 85, category: 'Breakfast', name: 'Akara & Fried Bread Combo',  description: 'Naija breakfast classic — hot akara, fried bread, pap and a tin of Peak milk. Real Lagos morning, delivered.', price: 15000, emoji: '🫓', image: '/images/akara-bread-breakfast.jpg' },
  { id: 61, category: 'Breakfast', name: 'Butterscotch Milk Pancakes', description: 'Pancakes with 2 sausages, bacon, scrambled egg, and syrup.',        price: 9000,  emoji: '🥞', image: CARD('🥞', 'Butterscotch Pancakes', '#FFF4E0', '#D4A017') },
  { id: 62, category: 'Breakfast', name: 'Banana Oatmeal Pancakes',    description: 'Oatmeal pancakes with 2 sausages, bacon, scrambled egg, and syrup.',price: 9500,  emoji: '🥞', image: CARD('🥞', 'Banana Oatmeal Pancakes', '#FFF8DC', '#B8860B') },
  { id: 63, category: 'Breakfast', name: 'Waffles',                    description: 'Golden waffles served with crispy chicken and syrup.',              price: 9500,  emoji: '🧇', image: CARD('🧇', 'Waffles',                '#FFE8B5', '#DAA520') },
  { id: 64, category: 'Breakfast', name: 'French Toast',               description: 'French toast with 2 sausages, bacon, scrambled egg, and syrup.',   price: 8500,  emoji: '🍞', image: CARD('🍞', 'French Toast',           '#FFE4B5', '#CD853F') },
  { id: 85, category: 'Breakfast', name: 'Akara Bread Breakfast Combo', description: 'Golden fried akara bread slices served with a tin of sardines/mackerel and a rich yellow sauce — a hearty Naija breakfast.', price: 15000, emoji: '🍞', image: '/images/akara-bread-breakfast-combo.jpg' },

  // ADD-ONS
  { id: 65, category: 'Add-Ons', name: 'Baked Beans',     description: 'Side of seasoned baked beans.',       price: 500,  emoji: '🫘', image: CARD('🫘', 'Baked Beans',   '#FFE5B4', '#FFB347') },
  { id: 66, category: 'Add-Ons', name: 'Sausage',         description: 'One grilled sausage.',                price: 500,  emoji: '🌭', image: CARD('🌭', 'Sausage',       '#FFD9C4', '#FF9966') },
  { id: 67, category: 'Add-Ons', name: 'Scrambled Egg',   description: 'Freshly scrambled egg.',              price: 500,  emoji: '🍳', image: CARD('🍳', 'Scrambled Egg', '#FFF8DC', '#FFD700') },
  { id: 68, category: 'Add-Ons', name: 'Syrup',           description: 'Sweet pancake/waffle syrup.',         price: 500,  emoji: '🍯', image: CARD('🍯', 'Syrup',         '#FFE8B5', '#E8A317') },
  { id: 69, category: 'Add-Ons', name: 'Chicken',         description: 'Extra piece of grilled chicken.',     price: 2000, emoji: '🍗', image: CARD('🍗', 'Chicken',       '#FFE4C4', '#D2691E') },
  { id: 70, category: 'Add-Ons', name: 'Bacon',           description: 'Crispy streaky bacon.',               price: 1500, emoji: '🥓', image: CARD('🥓', 'Bacon',         '#FFD1D1', '#C0392B') },
];

// ─── PAYSTACK PUBLIC KEY ──────────────────────────────────────────────────────
const PAYSTACK_PUBLIC_KEY = window.PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// ─── AD ATTRIBUTION (UTM capture, first-touch, 7-day window) ─────────────────
// Captures utm_* params + fbclid from ad clicks so every order records which
// campaign brought the customer. Survives navigation via localStorage.
const ATTR_KEY = 'cwm_attribution';
(function captureAttribution() {
  try {
    const params = new URLSearchParams(location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(k => {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 100);
    });
    if (params.get('fbclid')) utm.fbclid = '1'; // flag only — full ID not needed
    if (Object.keys(utm).length) {
      utm.landing = location.pathname;
      utm.ts = Date.now();
      localStorage.setItem(ATTR_KEY, JSON.stringify(utm)); // last-touch wins
    }
  } catch (e) { /* localStorage unavailable — ignore */ }
})();
function getAttribution() {
  try {
    const raw = localStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    const utm = JSON.parse(raw);
    if (Date.now() - (utm.ts || 0) > 7 * 24 * 3600 * 1000) return null; // expired
    return utm;
  } catch (e) { return null; }
}

// ─── STATE (cart persisted to localStorage so ad visitors don't lose it) ────
const CART_KEY = 'cwm_cart';
const cart = {};
(function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    Object.entries(saved).forEach(([id, qty]) => {
      // Only restore items that still exist on the menu at a valid qty
      if (MENU.some(m => m.id === Number(id)) && Number.isInteger(qty) && qty > 0 && qty <= 50) {
        cart[id] = qty;
      }
    });
  } catch (e) { /* corrupt or unavailable — start fresh */ }
})();
function persistCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
}
let activeCategory = 'all';
let searchQuery = '';

// ─── TOAST ───────────────────────────────────────────────────────────────────
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ─── RENDER MENU ─────────────────────────────────────────────────────────────
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  const tabsContainer = document.getElementById('filterTabs');

  const categories = [];
  const categoryMap = {};
  MENU.forEach(item => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = [];
      categories.push(item.category);
    }
    categoryMap[item.category].push(item);
  });

  // Build filter tabs
  tabsContainer.innerHTML = `<button class="filter-tab active" onclick="filterCategory('all', this)">All</button>`;
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-tab';
    btn.textContent = cat;
    btn.onclick = function() { filterCategory(cat, this); };
    tabsContainer.appendChild(btn);
  });

  // Build menu
  grid.innerHTML = categories.map(cat => `
    <div class="menu-category" data-cat="${cat}">
      <h3 class="category-title">${cat}</h3>
      <div class="category-grid">
        ${categoryMap[cat].map(item => {
          const imgHtml = item.image
            ? `<img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'">`
            : item.emoji;
          return `
            <div class="menu-card" data-name="${item.name.toLowerCase()}" data-category="${cat}">
              <div class="menu-card-img">${imgHtml}</div>
              <div class="menu-card-body">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="menu-card-footer">
                  <span class="menu-price">₦${item.price.toLocaleString()}</span>
                  <button class="btn-add" id="add-${item.id}" onclick="addToCart(${item.id})">+ Add</button>
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');

  // Animate cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.menu-card').forEach(card => observer.observe(card));
}

// ─── FILTER BY CATEGORY ───────────────────────────────────────────────────────
function filterCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.menu-category').forEach(section => {
    section.classList.toggle('hidden', cat !== 'all' && section.dataset.cat !== cat);
  });
  applySearch();
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
function filterMenu() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase();
  applySearch();
}

function applySearch() {
  document.querySelectorAll('.menu-card').forEach(card => {
    const matchesSearch = !searchQuery || card.dataset.name.includes(searchQuery);
    const matchesCat = activeCategory === 'all' || card.dataset.category === activeCategory;
    card.style.display = matchesSearch && matchesCat ? '' : 'none';
  });
  document.querySelectorAll('.menu-category').forEach(section => {
    if (section.classList.contains('hidden')) return;
    const hasVisible = [...section.querySelectorAll('.menu-card')].some(c => c.style.display !== 'none');
    section.style.display = hasVisible ? '' : 'none';
  });
}

// ─── ANALYTICS HELPERS (Meta Pixel + GA4) ────────────────────────────────────
function trackEvent(name, params = {}) {
  try { if (window.fbq) fbq('track', name, params); } catch (e) {}
  try { if (window.gtag) gtag('event', name.toLowerCase().replace(/\s/g,'_'), params); } catch (e) {}
}

// ─── COUPON STATE (spin-wheel prize, persists across the cart flow) ──────────
const COUPON_KEY = 'cwm_coupon';
let ACTIVE_COUPON = null;   // {code, label, type, value, emoji, expiresAt}

function loadCouponFromUrlOrStorage() {
  // 1) URL param wins (so deep-link from /spin always applies the latest prize)
  try {
    const code = new URL(location.href).searchParams.get('coupon');
    if (code) {
      sessionStorage.setItem(COUPON_KEY, code.toUpperCase());
      return code.toUpperCase();
    }
  } catch (e) {}
  return sessionStorage.getItem(COUPON_KEY) || null;
}

async function validateCoupon(code) {
  if (!code) return null;
  try {
    const res = await fetch(`/api/coupon/${encodeURIComponent(code)}`);
    if (!res.ok) {
      sessionStorage.removeItem(COUPON_KEY);
      return null;
    }
    return await res.json();
  } catch (e) { return null; }
}

function calcCouponDiscount(subtotal) {
  if (!ACTIVE_COUPON) return 0;
  if (ACTIVE_COUPON.type === 'PERCENT') return Math.round(subtotal * (ACTIVE_COUPON.value / 100));
  if (ACTIVE_COUPON.type === 'FIXED')   return Math.min(ACTIVE_COUPON.value, subtotal);
  return 0; // FREE_DELIVERY / FREE_SIDE — no cart-level discount
}

function clearCoupon() {
  ACTIVE_COUPON = null;
  sessionStorage.removeItem(COUPON_KEY);
  renderCouponBanner();
  renderCart();
  updateFab();
}

function renderCouponBanner() {
  const el = document.getElementById('couponBanner');
  if (!el) return;
  if (!ACTIVE_COUPON) { el.style.display = 'none'; return; }
  const valueText = ACTIVE_COUPON.type === 'PERCENT' ? `${ACTIVE_COUPON.value}% OFF`
                   : ACTIVE_COUPON.type === 'FIXED'  ? `₦${ACTIVE_COUPON.value.toLocaleString()} OFF`
                   : ACTIVE_COUPON.label;
  el.innerHTML = `
    <div class="coupon-banner-inner">
      <span class="coupon-emoji">${ACTIVE_COUPON.emoji || '🎁'}</span>
      <div class="coupon-text">
        <div class="coupon-label">${valueText} APPLIED</div>
        <div class="coupon-code">Code: <b>${ACTIVE_COUPON.code}</b></div>
      </div>
      <button class="coupon-remove" onclick="clearCoupon()" aria-label="Remove coupon">×</button>
    </div>`;
  el.style.display = 'block';
}

async function bootstrapCoupon() {
  const code = loadCouponFromUrlOrStorage();
  if (!code) return;
  const v = await validateCoupon(code);
  if (v && v.valid) {
    ACTIVE_COUPON = v;
    renderCouponBanner();
    renderCart();
    trackEvent('CouponApplied', { coupon_code: v.code, content_category: v.label });
  }
}

// ─── CART LOGIC ──────────────────────────────────────────────────────────────
function addToCart(id) {
  const item = MENU.find(m => m.id === id);
  cart[id] = (cart[id] || 0) + 1;
  persistCart();
  const btn = document.getElementById(`add-${id}`);
  if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }
  showToast(`${item.emoji} ${item.name} added!`);
  renderCart();
  updateFab();

  // Track Meta + GA conversion event
  trackEvent('AddToCart', {
    content_ids: [String(item.id)],
    content_name: item.name,
    content_type: 'product',
    currency: 'NGN',
    value: item.price
  });
}

function updateQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  persistCart();
  renderCart();
  updateFab();
  const btn = document.getElementById(`add-${id}`);
  if (btn) {
    btn.textContent = cart[id] ? '✓ Added' : '+ Add';
    btn.classList.toggle('added', !!cart[id]);
  }
}

function updateFab() {
  // Renamed conceptually to "updateStickyCart" but kept name for back-compat
  const bar = document.getElementById('stickyCart');
  if (!bar) return;
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU.find(m => m.id === Number(id));
    return item ? sum + item.price * qty : sum;
  }, 0);

  // Build summary like "Egusi ×1 + 2 more"
  const ids = Object.keys(cart);
  let summary = `${count} item${count === 1 ? '' : 's'}`;
  if (ids.length > 0) {
    const first = MENU.find(m => m.id === Number(ids[0]));
    if (first) {
      const others = ids.length - 1;
      summary = others > 0
        ? `${first.name.replace(/\s*\(.*\)/, '')} + ${others} more`
        : `${first.name.replace(/\s*\(.*\)/, '')} ×${cart[ids[0]]}`;
    }
  }

  document.getElementById('stickyCartCount').textContent = count;
  document.getElementById('stickyCartSummary').textContent = summary;
  document.getElementById('stickyCartTotal').textContent = `₦${total.toLocaleString()}`;

  if (count > 0) {
    bar.removeAttribute('hidden');
    document.body.classList.add('cart-active');
  } else {
    bar.setAttribute('hidden', '');
    document.body.classList.remove('cart-active');
  }
}

// Hide sticky bar when user is already in checkout view (avoid double CTA)
const _orderFormObserver = new IntersectionObserver((entries) => {
  const bar = document.getElementById('stickyCart');
  if (!bar) return;
  const formInView = entries[0]?.isIntersecting;
  bar.style.opacity = formInView ? '0' : '1';
  bar.style.pointerEvents = formInView ? 'none' : 'auto';
}, { threshold: 0.3 });
// Attach after DOM ready
window.addEventListener('load', () => {
  const orderSection = document.getElementById('orderSection');
  if (orderSection) _orderFormObserver.observe(orderSection);
});

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const totalAmount = document.getElementById('totalAmount');
  const orderForm = document.getElementById('orderForm');
  const ids = Object.keys(cart).map(Number);

  if (ids.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">No items yet — add something from the menu above.</p>';
    cartTotal.style.display = 'none';
    orderForm.style.display = 'none';
    return;
  }

  let subtotal = 0;
  cartItems.innerHTML = ids.map(id => {
    const item = MENU.find(m => m.id === id);
    const qty = cart[id];
    const lineTotal = item.price * qty;
    subtotal += lineTotal;
    return `
      <div class="cart-row">
        <span class="cart-row-name">${item.emoji} ${item.name}</span>
        <div class="cart-row-qty">
          <button class="qty-btn" onclick="updateQty(${id}, -1)">−</button>
          <span class="qty-count">${qty}</span>
          <button class="qty-btn" onclick="updateQty(${id}, 1)">+</button>
        </div>
        <span class="cart-row-price">₦${lineTotal.toLocaleString()}</span>
      </div>`;
  }).join('');

  // Apply coupon discount if any
  const discount = calcCouponDiscount(subtotal);
  if (discount > 0) {
    cartItems.innerHTML += `
      <div class="cart-row cart-discount">
        <span class="cart-row-name">🎁 Prize: ${ACTIVE_COUPON.label}</span>
        <span class="cart-row-price">– ₦${discount.toLocaleString()}</span>
      </div>`;
  } else if (ACTIVE_COUPON && (ACTIVE_COUPON.type === 'FREE_DELIVERY' || ACTIVE_COUPON.type === 'FREE_SIDE')) {
    cartItems.innerHTML += `
      <div class="cart-row cart-discount">
        <span class="cart-row-name">🎁 Prize: ${ACTIVE_COUPON.label}</span>
        <span class="cart-row-price">Applied on delivery</span>
      </div>`;
  }

  const total = subtotal - discount;
  totalAmount.textContent = `₦${total.toLocaleString()}`;
  cartTotal.style.display = 'flex';
  orderForm.style.display = 'block';
}

// ─── STICKY NAV ───────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 10);
});

// ─── CHECKOUT ────────────────────────────────────────────────────────────────
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // H1: empty cart guard
  if (Object.keys(cart).length === 0) {
    showToast('⚠️ Your cart is empty — add items from the menu first.');
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if (!name || !phone || !email || !address) {
    showToast('⚠️ Please fill in all delivery details.');
    if (!name) document.getElementById('custName').focus();
    else if (!phone) document.getElementById('custPhone').focus();
    else if (!email) document.getElementById('custEmail').focus();
    else document.getElementById('custAddress').focus();
    return;
  }

  // H9: phone validation (Nigerian numbers: 10-15 digits after stripping)
  const phoneClean = phone.replace(/\D/g, '');
  if (phoneClean.length < 10 || phoneClean.length > 15) {
    showToast('⚠️ Please enter a valid WhatsApp number.');
    document.getElementById('custPhone').focus();
    return;
  }

  // Email format sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️ Please enter a valid email address.');
    document.getElementById('custEmail').focus();
    return;
  }

  // C3: PaystackPop guard
  if (typeof PaystackPop === 'undefined') {
    showToast('⚠️ Payment system not loaded. Please refresh and try again, or message us on WhatsApp.');
    return;
  }
  if (!window.PAYSTACK_PUBLIC_KEY || !String(window.PAYSTACK_PUBLIC_KEY).startsWith('pk_')) {
    showToast('⚠️ Payment temporarily unavailable. Please order on WhatsApp.');
    return;
  }

  const items = Object.keys(cart).map(id => {
    const item = MENU.find(m => m.id === Number(id));
    return { id: item.id, name: item.name, price: item.price, qty: cart[id] };
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = calcCouponDiscount(subtotal);
  const total = subtotal - discount;
  if (!total || total <= 0) {
    showToast('⚠️ Invalid order total. Please refresh and try again.');
    return;
  }

  const payBtn = document.getElementById('payBtn');
  payBtn.textContent = 'Opening payment…';
  payBtn.disabled = true;

  // Track checkout intent
  trackEvent('InitiateCheckout', {
    content_ids: items.map(i => String(i.id)),
    num_items: items.reduce((n, i) => n + i.qty, 0),
    currency: 'NGN',
    value: total,
    ...(ACTIVE_COUPON ? { coupon: ACTIVE_COUPON.code } : {})
  });

  const handler = PaystackPop.setup({
    key: window.PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: total * 100,
    currency: 'NGN',
    // H8: random suffix prevents ref collision on rapid taps
    ref: 'CWM-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    metadata: {
      custom_fields: [
        { display_name: 'Customer name', variable_name: 'name', value: name },
        { display_name: 'Phone', variable_name: 'phone', value: phone },
        { display_name: 'Address', variable_name: 'address', value: address },
        ...(ACTIVE_COUPON ? [{ display_name: 'Coupon', variable_name: 'coupon', value: ACTIVE_COUPON.code }] : [])
      ]
    },
    callback: function(response) {
      verifyPayment(response.reference, {
        name, phone, email, address, items, total,
        attribution: getAttribution(),
        couponCode: ACTIVE_COUPON ? ACTIVE_COUPON.code : null
      });
    },
    onClose: function() {
      payBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Pay with Paystack';
      payBtn.disabled = false;
    }
  });

  handler.openIframe();
});

async function verifyPayment(reference, orderDetails) {
  const payBtn = document.getElementById('payBtn');
  payBtn.textContent = 'Verifying payment…';

  try {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference, orderDetails })
    });

    const data = await res.json();

    if (data.success) {
      // Track Purchase conversion (the money event)
      trackEvent('Purchase', {
        content_ids: orderDetails.items.map(i => String(i.id)),
        currency: 'NGN',
        value: orderDetails.total,
        num_items: orderDetails.items.reduce((n, i) => n + i.qty, 0)
      });
      document.getElementById('whatsappLink').href = data.whatsappUrl;
      document.getElementById('successModal').style.display = 'flex';
      // Clear cart + redeemed coupon after successful payment
      Object.keys(cart).forEach(k => delete cart[k]);
      persistCart();
      ACTIVE_COUPON = null;
      sessionStorage.removeItem(COUPON_KEY);
      renderCouponBanner();
      renderCart();
      updateFab();
    } else {
      showToast('⚠️ Payment unverified — please WhatsApp us with ref: ' + reference);
      payBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Pay with Paystack';
      payBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    showToast('⚠️ Something went wrong — please WhatsApp us with ref: ' + reference);
    payBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Pay with Paystack';
    payBtn.disabled = false;
  }
}

// ─── CLOSE SUCCESS MODAL ──────────────────────────────────────────────────────
function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
}

// ─── WHATSAPP-FIRST CHECKOUT (Test #1, expected +25-40% lift) ────────────────
document.getElementById('waOrderBtn').addEventListener('click', async function() {
  // Empty cart guard
  if (Object.keys(cart).length === 0) {
    showToast('⚠️ Your cart is empty — add items from the menu first.');
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if (!name || !phone || !address) {
    showToast('⚠️ Please fill in name, phone & address (email optional for WhatsApp orders).');
    if (!name) document.getElementById('custName').focus();
    else if (!phone) document.getElementById('custPhone').focus();
    else document.getElementById('custAddress').focus();
    return;
  }

  const phoneClean = phone.replace(/\D/g, '');
  if (phoneClean.length < 10 || phoneClean.length > 15) {
    showToast('⚠️ Please enter a valid WhatsApp number.');
    document.getElementById('custPhone').focus();
    return;
  }

  const items = Object.keys(cart).map(id => {
    const item = MENU.find(m => m.id === Number(id));
    return { id: item.id, name: item.name, price: item.price, qty: cart[id] };
  });
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = calcCouponDiscount(subtotal);
  const total = subtotal - discount;

  const btn = this;
  btn.disabled = true;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = 'Opening WhatsApp…';

  // Log the WhatsApp-intent order to backend (don't block if it fails — UX first)
  const ref = 'CWM-WA-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  try {
    fetch('/api/whatsapp-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref, name, phone, email, address, items, total,
        attribution: getAttribution(),
        couponCode: ACTIVE_COUPON ? ACTIVE_COUPON.code : null
      })
    }).catch(() => {});
  } catch (e) { /* non-blocking */ }

  // Build the WhatsApp message
  const itemLines = items
    .map(i => `• ${i.name} ×${i.qty} — ₦${(i.price * i.qty).toLocaleString()}`)
    .join('\n');
  const couponLine = ACTIVE_COUPON
    ? `\n*ChopWheel prize:* ${ACTIVE_COUPON.label} (code ${ACTIVE_COUPON.code})` +
      (discount > 0 ? ` → –₦${discount.toLocaleString()}` : '')
    : '';
  const message =
    `Hi Mel! 🍲 I'd like to place this order:\n\n` +
    `*Name:* ${name}\n*Phone:* ${phone}\n` +
    (email ? `*Email:* ${email}\n` : '') +
    `*Delivery:* ${address}\n\n` +
    `*Order:*\n${itemLines}\n` +
    (discount > 0 ? `*Subtotal:* ₦${subtotal.toLocaleString()}\n` : '') +
    couponLine + '\n' +
    `*Total:* ₦${total.toLocaleString()}\n` +
    `*Ref:* ${ref}\n\n` +
    `Please confirm delivery time & payment details. Thank you!`;

  const waUrl = `https://wa.me/2347033352997?text=${encodeURIComponent(message)}`;

  // Track Lead conversion for WhatsApp checkout (counts as pre-paid intent)
  trackEvent('Lead', {
    content_ids: items.map(i => String(i.id)),
    currency: 'NGN',
    value: total,
    content_category: 'whatsapp_checkout'
  });

  // Clear cart + coupon + open WhatsApp
  Object.keys(cart).forEach(k => delete cart[k]);
  persistCart();
  ACTIVE_COUPON = null;
  sessionStorage.removeItem(COUPON_KEY);
  renderCouponBanner();
  renderCart();
  updateFab();
  showToast('✅ Opening WhatsApp — Mel will confirm shortly!');

  // Small delay so the toast is visible
  setTimeout(() => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }, 300);
});

// ─── CHEF'S PICKS — Test #2 (+30-60% add-to-cart) ────────────────────────────
// 8 highest-converting / most-loved dishes (real photos prioritized)
// 8 bestsellers — entry-tier combos featured first for conversion lift
const CHEFS_PICKS_IDS = [83, 55, 84, 85, 82, 39, 1, 13];
function renderPicks() {
  const grid = document.getElementById('picksGrid');
  if (!grid) return;
  grid.innerHTML = CHEFS_PICKS_IDS.map(id => {
    const item = MENU.find(m => m.id === id);
    if (!item) return '';
    const imgHtml = item.image
      ? `<img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\\'pick-img-fallback\\'>${item.emoji}</span>'">`
      : `<span class="pick-img-fallback">${item.emoji}</span>`;
    return `
      <div class="pick-card" role="listitem">
        <div class="pick-img-wrap">${imgHtml}</div>
        <div class="pick-body">
          <div class="pick-name">${item.emoji} ${item.name}</div>
          <div class="pick-price">₦${item.price.toLocaleString()}</div>
          <button class="pick-btn" id="pick-${item.id}" onclick="addToCart(${item.id})">+ Add to order</button>
        </div>
      </div>`;
  }).join('');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderMenu();
renderPicks();
renderCart();
updateFab();
bootstrapCoupon(); // ← apply ?coupon=CODE from URL / sessionStorage
// Reflect restored cart in menu "+ Add" buttons
Object.keys(cart).forEach(id => {
  const btn = document.getElementById(`add-${id}`);
  if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }
});
