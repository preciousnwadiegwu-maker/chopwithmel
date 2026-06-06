// ─── CATEGORY IMAGES (free Unsplash photos) ───────────────────────────────────
const CATEGORY_IMAGES = {
  'Soups':       'https://images.unsplash.com/photo-1763048443535-1243379234e2?w=400&h=200&q=80&auto=format&fit=crop',
  'Stews':       'https://images.unsplash.com/photo-1603496987674-79600a000f55?w=400&h=200&q=80&auto=format&fit=crop',
  'Pepper Soup': 'https://images.unsplash.com/photo-1730112696140-19e61bb43d36?w=400&h=200&q=80&auto=format&fit=crop',
  'Rice & Pasta':'https://images.unsplash.com/photo-1664993101841-036f189719b6?w=400&h=200&q=80&auto=format&fit=crop',
  'Burgers':     'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&q=80&auto=format&fit=crop',
  'Breakfast':   'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=200&q=80&auto=format&fit=crop',
  'Add-Ons':     'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=200&q=80&auto=format&fit=crop',
};

// ─── MENU DATA ───────────────────────────────────────────────────────────────

const MENU = [
  // SOUPS
  { id: 1,  category: 'Soups', name: 'Egusi Soup (2L)',            description: 'Rich melon-seed soup with assorted meat and stockfish.',         price: 50000, emoji: '🥘' },
  { id: 2,  category: 'Soups', name: 'Egusi Soup (4L)',            description: 'Rich melon-seed soup with assorted meat and stockfish.',         price: 80000, emoji: '🥘' },
  { id: 3,  category: 'Soups', name: 'Banga Soup (2L)',            description: 'Palm fruit soup, slow-cooked with dried fish and spices.',       price: 50000, emoji: '🍲' },
  { id: 4,  category: 'Soups', name: 'Banga Soup (4L)',            description: 'Palm fruit soup, slow-cooked with dried fish and spices.',       price: 80000, emoji: '🍲' },
  { id: 5,  category: 'Soups', name: 'Afang Soup (2L)',            description: 'Efik classic with waterleaf, shredded meat, and periwinkle.',    price: 50000, emoji: '🫕' },
  { id: 6,  category: 'Soups', name: 'Afang Soup (4L)',            description: 'Efik classic with waterleaf, shredded meat, and periwinkle.',    price: 80000, emoji: '🫕' },
  { id: 7,  category: 'Soups', name: 'Fisherman Soup (2L)',        description: 'Spicy Delta-style soup loaded with fresh fish and seafood.',      price: 70000, emoji: '🐟' },
  { id: 8,  category: 'Soups', name: 'Fisherman Soup (4L)',        description: 'Spicy Delta-style soup loaded with fresh fish and seafood.',      price: 120000, emoji: '🐟' },
  { id: 9,  category: 'Soups', name: 'Owo Soup (2L)',              description: 'Urhobo palm nut soup with crayfish and dried fish.',              price: 50000, emoji: '🍵' },
  { id: 10, category: 'Soups', name: 'Owo Soup (4L)',              description: 'Urhobo palm nut soup with crayfish and dried fish.',              price: 80000, emoji: '🍵' },
  { id: 11, category: 'Soups', name: 'Okro Soup (2L)',             description: 'Fresh okra cooked with assorted meat and ede.',                  price: 50000, emoji: '🥗' },
  { id: 12, category: 'Soups', name: 'Okro Soup (4L)',             description: 'Fresh okra cooked with assorted meat and ede.',                  price: 80000, emoji: '🥗' },
  { id: 13, category: 'Soups', name: 'Oha Soup (2L)',              description: 'Igbo oha leaf soup with cocoyam and assorted meat.',             price: 50000, emoji: '🌿' },
  { id: 14, category: 'Soups', name: 'Oha Soup (4L)',              description: 'Igbo oha leaf soup with cocoyam and assorted meat.',             price: 80000, emoji: '🌿' },
  { id: 15, category: 'Soups', name: 'Bitterleaf Soup (2L)',       description: 'Hearty Igbo soup with bitterleaf, cocoyam, and meat.',           price: 50000, emoji: '🍃' },
  { id: 16, category: 'Soups', name: 'Bitterleaf Soup (4L)',       description: 'Hearty Igbo soup with bitterleaf, cocoyam, and meat.',           price: 80000, emoji: '🍃' },

  // STEWS
  { id: 17, category: 'Stews', name: 'Chicken Stew (2L)',          description: 'Tomato-based stew with tender chicken pieces.',                  price: 40000, emoji: '🍗' },
  { id: 18, category: 'Stews', name: 'Chicken Stew (4L)',          description: 'Tomato-based stew with tender chicken pieces.',                  price: 80000, emoji: '🍗' },
  { id: 19, category: 'Stews', name: 'Turkey Stew (2L)',           description: 'Rich tomato stew with well-seasoned turkey.',                    price: 40000, emoji: '🦃' },
  { id: 20, category: 'Stews', name: 'Turkey Stew (4L)',           description: 'Rich tomato stew with well-seasoned turkey.',                    price: 80000, emoji: '🦃' },
  { id: 21, category: 'Stews', name: 'Beef Stew (2L)',             description: 'Classic Nigerian beef stew, slow-cooked to perfection.',         price: 40000, emoji: '🥩' },
  { id: 22, category: 'Stews', name: 'Beef Stew (4L)',             description: 'Classic Nigerian beef stew, slow-cooked to perfection.',         price: 80000, emoji: '🥩' },
  { id: 23, category: 'Stews', name: 'Assorted Meat Stew (2L)',    description: 'Mixed meat stew — beef, tripe, and more.',                       price: 40000, emoji: '🍖' },
  { id: 24, category: 'Stews', name: 'Assorted Meat Stew (4L)',    description: 'Mixed meat stew — beef, tripe, and more.',                       price: 80000, emoji: '🍖' },
  { id: 25, category: 'Stews', name: 'Stir Fry Sauce (2L)',        description: 'Vibrant stir-fry sauce packed with peppers and spices.',         price: 40000, emoji: '🫙' },
  { id: 26, category: 'Stews', name: 'Stir Fry Sauce (4L)',        description: 'Vibrant stir-fry sauce packed with peppers and spices.',         price: 80000, emoji: '🫙' },

  // PEPPER SOUP
  { id: 27, category: 'Pepper Soup', name: 'Chicken Pepper Soup (2L)',       description: 'Hot and spicy chicken pepper soup — great for any weather.',    price: 35000, emoji: '🌶️' },
  { id: 28, category: 'Pepper Soup', name: 'Chicken Pepper Soup (4L)',       description: 'Hot and spicy chicken pepper soup — great for any weather.',    price: 70000, emoji: '🌶️' },
  { id: 29, category: 'Pepper Soup', name: 'Assorted Meat Pepper Soup (2L)', description: 'Mixed meat in a bold, aromatic pepper broth.',                  price: 35000, emoji: '🫕' },
  { id: 30, category: 'Pepper Soup', name: 'Assorted Meat Pepper Soup (4L)', description: 'Mixed meat in a bold, aromatic pepper broth.',                  price: 70000, emoji: '🫕' },
  { id: 31, category: 'Pepper Soup', name: 'Goat Meat Pepper Soup (2L)',     description: 'Classic Nigerian goat meat pepper soup.',                       price: 35000, emoji: '🐐' },
  { id: 32, category: 'Pepper Soup', name: 'Goat Meat Pepper Soup (4L)',     description: 'Classic Nigerian goat meat pepper soup.',                       price: 70000, emoji: '🐐' },
  { id: 33, category: 'Pepper Soup', name: 'Turkey Pepper Soup (2L)',        description: 'Peppered turkey broth with fresh uziza leaves.',                price: 35000, emoji: '🦃' },
  { id: 34, category: 'Pepper Soup', name: 'Turkey Pepper Soup (4L)',        description: 'Peppered turkey broth with fresh uziza leaves.',                price: 70000, emoji: '🦃' },
  { id: 35, category: 'Pepper Soup', name: 'Catfish Pepper Soup (2L)',       description: 'Point-and-kill catfish in a spicy, aromatic broth.',            price: 35000, emoji: '🐠' },
  { id: 36, category: 'Pepper Soup', name: 'Catfish Pepper Soup (4L)',       description: 'Point-and-kill catfish in a spicy, aromatic broth.',            price: 70000, emoji: '🐠' },

  // RICE & PASTA
  { id: 37, category: 'Rice & Pasta', name: 'Native Rice (2L)',              description: 'Ofada-style native rice cooked in palm oil sauce.',             price: 40000, emoji: '🍚' },
  { id: 38, category: 'Rice & Pasta', name: 'Native Rice (4L)',              description: 'Ofada-style native rice cooked in palm oil sauce.',             price: 80000, emoji: '🍚' },
  { id: 39, category: 'Rice & Pasta', name: 'Jollof Rice (2L)',              description: 'Party-style smoky jollof — the real deal.',                     price: 40000, emoji: '🍛' },
  { id: 40, category: 'Rice & Pasta', name: 'Jollof Rice (4L)',              description: 'Party-style smoky jollof — the real deal.',                     price: 80000, emoji: '🍛' },
  { id: 41, category: 'Rice & Pasta', name: 'Seafood Coconut Rice (2L)',     description: 'Coconut rice loaded with shrimp, crab, and mixed seafood.',     price: 50000, emoji: '🦐' },
  { id: 42, category: 'Rice & Pasta', name: 'Seafood Coconut Rice (4L)',     description: 'Coconut rice loaded with shrimp, crab, and mixed seafood.',     price: 110000, emoji: '🦐' },
  { id: 43, category: 'Rice & Pasta', name: 'Special Coconut Rice (2L)',     description: 'Fragrant coconut rice with special Mel seasoning.',             price: 40000, emoji: '🥥' },
  { id: 44, category: 'Rice & Pasta', name: 'Special Coconut Rice (4L)',     description: 'Fragrant coconut rice with special Mel seasoning.',             price: 80000, emoji: '🥥' },
  { id: 45, category: 'Rice & Pasta', name: 'Asun Jollof Rice (2L)',         description: 'Jollof rice topped with peppered goat meat (asun).',           price: 40000, emoji: '🍖' },
  { id: 46, category: 'Rice & Pasta', name: 'Asun Jollof Rice (4L)',         description: 'Jollof rice topped with peppered goat meat (asun).',           price: 80000, emoji: '🍖' },
  { id: 47, category: 'Rice & Pasta', name: 'Fried Rice (2L)',               description: 'Golden fried rice with mixed veggies and seasoning.',           price: 40000, emoji: '🍳' },
  { id: 48, category: 'Rice & Pasta', name: 'Fried Rice (4L)',               description: 'Golden fried rice with mixed veggies and seasoning.',           price: 80000, emoji: '🍳' },
  { id: 49, category: 'Rice & Pasta', name: 'Creamy Penny Pasta (2L)',       description: 'Penne pasta in a rich, creamy sauce.',                          price: 50000, emoji: '🍝' },
  { id: 50, category: 'Rice & Pasta', name: 'Creamy Penny Pasta (4L)',       description: 'Penne pasta in a rich, creamy sauce.',                          price: 110000, emoji: '🍝' },
  { id: 51, category: 'Rice & Pasta', name: 'Jollof Penny Pasta (2L)',       description: 'Penne pasta cooked Nigerian jollof-style.',                     price: 40000, emoji: '🍝' },
  { id: 52, category: 'Rice & Pasta', name: 'Jollof Penny Pasta (4L)',       description: 'Penne pasta cooked Nigerian jollof-style.',                     price: 80000, emoji: '🍝' },
  { id: 53, category: 'Rice & Pasta', name: 'Alfredo Linguine Pasta (2L)',   description: 'Linguine in a velvety Alfredo cream sauce.',                    price: 50000, emoji: '🍜' },
  { id: 54, category: 'Rice & Pasta', name: 'Alfredo Linguine Pasta (4L)',   description: 'Linguine in a velvety Alfredo cream sauce.',                    price: 110000, emoji: '🍜' },
  { id: 55, category: 'Rice & Pasta', name: 'Stir Fry Pasta (2L)',           description: 'Pasta tossed in a spicy, flavourful stir-fry sauce.',           price: 40000, emoji: '🥡' },
  { id: 56, category: 'Rice & Pasta', name: 'Stir Fry Pasta (4L)',           description: 'Pasta tossed in a spicy, flavourful stir-fry sauce.',           price: 80000, emoji: '🥡' },

  // BURGERS
  { id: 57, category: 'Burgers', name: 'Breakfast Fast Burger',    description: 'Fully loaded breakfast burger — egg, bacon, sausage, and more.',  price: 15000, emoji: '🍔' },
  { id: 58, category: 'Burgers', name: 'Double Deck Burger',       description: 'Double-patty burger stacked high with all the toppings.',         price: 12000, emoji: '🍔' },
  { id: 59, category: 'Burgers', name: 'Beef Burger',              description: 'Juicy beef patty with fresh lettuce, tomato, and sauce.',         price: 8000,  emoji: '🍔' },
  { id: 60, category: 'Burgers', name: 'Chicken Burger',           description: 'Crispy chicken fillet with coleslaw and special mayo.',           price: 8500,  emoji: '🍗' },

  // BREAKFAST
  { id: 61, category: 'Breakfast', name: 'Butterscotch Milk Pancakes', description: 'Pancakes with 2 sausages, bacon, scrambled egg, and syrup.',   price: 9000,  emoji: '🥞' },
  { id: 62, category: 'Breakfast', name: 'Banana Oatmeal Pancakes',    description: 'Oatmeal pancakes with 2 sausages, bacon, scrambled egg, and syrup.', price: 9500, emoji: '🥞' },
  { id: 63, category: 'Breakfast', name: 'Waffles',                    description: 'Golden waffles served with crispy chicken and syrup.',          price: 9500,  emoji: '🧇' },
  { id: 64, category: 'Breakfast', name: 'French Toast',               description: 'French toast with 2 sausages, bacon, scrambled egg, and syrup.', price: 8500, emoji: '🍞' },

  // ADD-ONS
  { id: 65, category: 'Add-Ons', name: 'Baked Beans',     description: 'Side of seasoned baked beans.',        price: 500,  emoji: '🫘' },
  { id: 66, category: 'Add-Ons', name: 'Sausage',         description: 'One grilled sausage.',                 price: 500,  emoji: '🌭' },
  { id: 67, category: 'Add-Ons', name: 'Scrambled Egg',   description: 'Freshly scrambled egg.',               price: 500,  emoji: '🍳' },
  { id: 68, category: 'Add-Ons', name: 'Syrup',           description: 'Sweet pancake/waffle syrup.',          price: 500,  emoji: '🍯' },
  { id: 69, category: 'Add-Ons', name: 'Chicken',         description: 'Extra piece of grilled chicken.',      price: 2000, emoji: '🍗' },
  { id: 70, category: 'Add-Ons', name: 'Bacon',           description: 'Crispy streaky bacon.',                price: 1500, emoji: '🥓' },
];

// ─── PAYSTACK PUBLIC KEY ──────────────────────────────────────────────────────
const PAYSTACK_PUBLIC_KEY = window.PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// ─── STATE ───────────────────────────────────────────────────────────────────
const cart = {};

// ─── RENDER MENU ─────────────────────────────────────────────────────────────
function renderMenu() {
  const grid = document.getElementById('menuGrid');

  const categories = [];
  const categoryMap = {};
  MENU.forEach(item => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = [];
      categories.push(item.category);
    }
    categoryMap[item.category].push(item);
  });

  grid.innerHTML = categories.map(cat => `
    <div class="menu-category">
      <h3 class="category-title">${cat}</h3>
      <div class="category-grid">
        ${categoryMap[cat].map(item => {
          const imgUrl = CATEGORY_IMAGES[item.category];
          const imgHtml = imgUrl
            ? `<img src="${imgUrl}" alt="${item.name}" loading="lazy" onerror="this.parentElement.innerHTML='${item.emoji}'">`
            : item.emoji;
          return `
          <div class="menu-card">
            <div class="menu-card-img">${imgHtml}</div>
            <div class="menu-card-body">
              <h4>${item.name}</h4>
              <p>${item.description}</p>
              <div class="menu-card-footer">
                <span class="menu-price">₦${item.price.toLocaleString()}</span>
                <button class="btn-add" id="add-${item.id}" onclick="addToCart(${item.id})">
                  Add to order
                </button>
              </div>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>
  `).join('');
}

// ─── CART LOGIC ──────────────────────────────────────────────────────────────
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  const btn = document.getElementById(`add-${id}`);
  if (btn) { btn.textContent = 'Added ✓'; btn.classList.add('added'); }
  renderCart();
}

function updateQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
  const btn = document.getElementById(`add-${id}`);
  if (btn) {
    btn.textContent = cart[id] ? 'Added ✓' : 'Add to order';
    btn.classList.toggle('added', !!cart[id]);
  }
}

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

  let total = 0;
  cartItems.innerHTML = ids.map(id => {
    const item = MENU.find(m => m.id === id);
    const qty = cart[id];
    const subtotal = item.price * qty;
    total += subtotal;
    return `
      <div class="cart-row">
        <span class="cart-row-name">${item.emoji} ${item.name}</span>
        <div class="cart-row-qty">
          <button class="qty-btn" onclick="updateQty(${id}, -1)">−</button>
          <span class="qty-count">${qty}</span>
          <button class="qty-btn" onclick="updateQty(${id}, 1)">+</button>
        </div>
        <span class="cart-row-price">₦${subtotal.toLocaleString()}</span>
      </div>
    `;
  }).join('');

  totalAmount.textContent = `₦${total.toLocaleString()}`;
  cartTotal.style.display = 'flex';
  orderForm.style.display = 'block';
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if (!name || !phone || !email || !address) {
    alert('Please fill in all delivery details.');
    return;
  }

  const items = Object.keys(cart).map(id => {
    const item = MENU.find(m => m.id === Number(id));
    return { id: item.id, name: item.name, price: item.price, qty: cart[id] };
  });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const payBtn = document.getElementById('payBtn');
  payBtn.textContent = 'Opening payment…';
  payBtn.disabled = true;

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: total * 100,
    currency: 'NGN',
    ref: 'CWM-' + Date.now(),
    metadata: {
      custom_fields: [
        { display_name: 'Customer name', variable_name: 'name', value: name },
        { display_name: 'Phone', variable_name: 'phone', value: phone },
        { display_name: 'Address', variable_name: 'address', value: address }
      ]
    },
    callback: function(response) {
      verifyPayment(response.reference, { name, phone, email, address, items, total });
    },
    onClose: function() {
      payBtn.textContent = 'Pay with Paystack 🔒';
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
      document.getElementById('whatsappLink').href = data.whatsappUrl;
      document.getElementById('successModal').style.display = 'flex';
    } else {
      alert('Payment could not be verified. Please contact us on WhatsApp with your reference: ' + reference);
      payBtn.textContent = 'Pay with Paystack 🔒';
      payBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please contact us on WhatsApp with your reference: ' + reference);
    payBtn.textContent = 'Pay with Paystack 🔒';
    payBtn.disabled = false;
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderMenu();
renderCart();
