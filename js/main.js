/* ============================================
   SHOP — main.js
   Cart management + UI interactions
   ============================================ */

/* ---------- Cart ---------- */
const Cart = {
  key: 'shop_cart',

  get() {
    try { return JSON.parse(localStorage.getItem(this.key)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateCountBadges();
  },

  add(product) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id && i.variant === product.variant);
    if (existing) {
      existing.qty += (product.qty || 1);
    } else {
      items.push({ ...product, qty: product.qty || 1 });
    }
    this.save(items);
    this.showToast(`「${product.name}」をカートに追加しました`);
  },

  remove(id, variant) {
    const items = this.get().filter(i => !(i.id === id && i.variant === variant));
    this.save(items);
  },

  updateQty(id, variant, qty) {
    const items = this.get();
    const item = items.find(i => i.id === id && i.variant === variant);
    if (item) {
      if (qty < 1) { this.remove(id, variant); return; }
      item.qty = qty;
    }
    this.save(items);
  },

  totalCount() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  totalPrice() {
    return this.get().reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  updateCountBadges() {
    const count = this.totalCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.dataset.count = count;
    });
  },

  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      background:#2d2a25; color:#fff; font-size:13px; letter-spacing:.04em;
      padding:12px 24px; border-radius:4px; z-index:9999;
      box-shadow:0 4px 16px rgba(0,0,0,.2);
      animation: fadeInUp .3s ease forwards;
    `;
    document.head.insertAdjacentHTML('beforeend', `<style>
      @keyframes fadeInUp { from{opacity:0;transform:translateX(-50%) translateY(8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    </style>`);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
  }
};

/* ---------- Cart Page Render ---------- */
function renderCartPage() {
  const el = document.getElementById('cart-items-list');
  if (!el) return;
  const items = Cart.get();

  if (items.length === 0) {
    el.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">◎</div>
        <p>カートに商品がありません</p>
        <a href="../shop.html" class="btn btn-outline">商品一覧へ</a>
      </div>`;
    document.getElementById('cart-summary-section').style.display = 'none';
    return;
  }

  el.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <div class="placeholder-img" style="height:80px;font-size:11px;">${item.name}</div>
      </div>
      <div>
        <div class="cart-item-name">${item.name}</div>
        ${item.variant ? `<div class="cart-item-variant">${item.variant}</div>` : ''}
        <div class="cart-item-qty">
          <div class="qty-input-wrap">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}','${item.variant || ''}',${ item.qty - 1});renderCartPage()">−</button>
            <input class="qty-input" type="number" value="${item.qty}" min="1"
              onchange="Cart.updateQty('${item.id}','${item.variant || ''}',parseInt(this.value));renderCartPage()">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}','${item.variant || ''}',${item.qty + 1});renderCartPage()">＋</button>
          </div>
        </div>
        <div class="cart-item-remove" onclick="Cart.remove('${item.id}','${item.variant || ''}');renderCartPage()">削除</div>
      </div>
      <div class="cart-item-price">¥${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  const subtotal = Cart.totalPrice();
  document.getElementById('summary-subtotal').textContent = `¥${subtotal.toLocaleString()}`;
  document.getElementById('summary-total').textContent = `¥${subtotal.toLocaleString()}`;
}

/* ---------- LP: Add to Cart ---------- */
function setupAddToCart() {
  const btn = document.getElementById('add-to-cart-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const name = document.querySelector('.lp-info-name')?.textContent || '';
    const id = document.body.dataset.productId || name;
    const priceText = document.querySelector('.lp-price')?.textContent || '0';
    const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
    const variant = document.querySelector('.lp-option-select')?.value || '';
    const qty = parseInt(document.querySelector('.qty-input')?.value) || 1;
    Cart.add({ id, name, price, variant, qty });
  });
}

/* ---------- LP: Booking (Services) ---------- */
function setupBooking() {
  const btn = document.getElementById('booking-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    alert('予約・申し込みフォームは準備中です。\nお問い合わせページよりご連絡ください。');
  });
}

/* ---------- Quantity Buttons ---------- */
function setupQtyButtons() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.qty-input-wrap')?.querySelector('.qty-input');
      if (!input) return;
      const current = parseInt(input.value) || 1;
      if (btn.textContent.includes('＋') || btn.textContent === '+') {
        input.value = current + 1;
      } else {
        if (current > 1) input.value = current - 1;
      }
    });
  });
}

/* ---------- Mobile Nav ---------- */
function setupMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  overlay?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
}

/* ---------- Active Nav Link ---------- */
function setActiveNav() {
  const path = location.pathname;
  document.querySelectorAll('.header-nav a, .mobile-nav-panel a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.endsWith(href.replace('../', '').replace('./', ''))) {
      a.classList.add('active');
    }
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCountBadges();
  setupMobileNav();
  setActiveNav();
  setupAddToCart();
  setupBooking();
  setupQtyButtons();
  renderCartPage();
});
