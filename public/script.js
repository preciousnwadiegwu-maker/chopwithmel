// ─── MENU DATA ───────────────────────────────────────────────────────────────
// Update these dishes, prices (in Naira), and emojis to match your real menu.

const MENU = [
  {
    id: 1,
    name: 'Jollof Rice (full pot)',
    description: 'Party-style smoky jollof — serves 4 to 6 people.',
    price: 8000,
    emoji: '🍚'
  },
  {
    id: 2,
    name: 'Egusi Soup',
    description: 'Rich melon-seed soup with assorted meat and stockfish.',
    price: 6500,
    emoji: '🥘'
  },
  {
    id: 3,
    name: 'Afang Soup',
    description: 'Efik classic with waterleaf, shredded meat, and periwinkle.',
    price: 7000,
    emoji: '🍲'
  },
  {
    id: 4,
    name: 'Fried Rice + Chicken',
    description: 'Golden fried rice with two pieces of grilled chicken.',
    price: 5500,
    emoji: '🍗'
  },
  {
    id: 5,
    name: 'Pounded Yam + Soup',
    description: 'Smooth pounded yam served with your choice of soup.',
    price: 5000,
    emoji: '🫙'
  },
  {
    id: 6,
    name: 'Moi Moi (per dozen)',
    description: 'Steamed bean pudding with egg and fish — packed fresh.',
    price: 4500,
    emoji: '🟡'
  }
];

// ─── PAYSTACK PUBLIC KEY ──────────────────────────────────────────────────────
// Replace this with your actual Paystack public key from your .env / Render env vars.
// For the frontend, the public key is safe to expose.
const PAYSTACK_PUBLIC_KEY = window.PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// ─── STATE ───────────────────────────────────────────────────────────────────
const cart = {};

// ─── RENDER MENU ─────────────────────────────────────────────────────────────
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = MENU.map(item => `
    <div class="menu-card">
      <div class="menu-card-img">${item.emoji}</div>
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-card-footer">
          <span class="menu-price">₦${item.price.toLocaleString()}</span>
          <button class="btn-add" id="add-${item.id}" onclick="addToCart(${item.id})">
            Add to order
          </button>
        </div>
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
    amount: total * 100, // Paystack uses kobo
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
