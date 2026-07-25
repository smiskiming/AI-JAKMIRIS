document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.sports-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    speed: 700,
    effect: 'slide',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 5,
      },
    },
  });

  const carousel = document.querySelector('.sports-swiper');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => swiper.autoplay.stop());
    carousel.addEventListener('mouseleave', () => swiper.autoplay.start());
  }

  const CART_STORAGE_KEY = 'jakmiris_sports_cart_items';
  const cartButton = document.querySelector('.cart-btn');
  const cartPanel = document.getElementById('cartPanel');
  const cartItemsEl = cartPanel?.querySelector('.cart-items');
  const cartBadge = document.querySelector('.cart-badge');
  const cartEmptyText = cartPanel?.querySelector('.cart-empty');
  const cartSummary = cartPanel?.querySelector('.cart-summary');
  const cartClearBtn = cartPanel?.querySelector('.cart-clear-btn');

  function applyMalayLocalization() {
    document.querySelectorAll('.product-content button').forEach((button) => {
      button.textContent = 'Tambah ke Troli';
    });

    document.querySelectorAll('.product-type').forEach((typeLabel) => {
      typeLabel.textContent = typeLabel.textContent.replace(/^Type:/, 'Jenis:');
    });

    document.querySelectorAll('.sold').forEach((soldLabel) => {
      soldLabel.textContent = soldLabel.textContent.replace(/ sold$/i, ' terjual');
    });
  }

  function getCartItems() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Tidak dapat membaca item troli:', error);
      return [];
    }
  }

  function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  function getTotalQuantity(items) {
    return items.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  function updateBadge() {
    if (!cartBadge) return;
    const items = getCartItems();
    const total = getTotalQuantity(items);
    cartBadge.textContent = total;
    cartBadge.setAttribute('aria-label', `${total} item dalam troli`);
  }

  function renderCart() {
    if (!cartPanel || !cartItemsEl || !cartEmptyText || !cartSummary) return;

    const items = getCartItems();
    cartItemsEl.innerHTML = '';

    if (!items.length) {
      cartEmptyText.hidden = false;
      cartSummary.hidden = true;
      updateBadge();
      return;
    }

    cartEmptyText.hidden = true;
    cartSummary.hidden = false;

    const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const subtotalEl = cartSummary.querySelector('.cart-subtotal');
    const discountEl = cartSummary.querySelector('.cart-discount');
    const totalEl = cartSummary.querySelector('.cart-total');

    if (subtotalEl) subtotalEl.textContent = `RM ${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = '-RM 0.00';
    if (totalEl) totalEl.textContent = `RM ${subtotal.toFixed(2)}`;

    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'cart-list-item';
      listItem.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-qty">x${item.quantity || 1}</span>
        <span class="cart-item-price">RM ${(item.price || 0).toFixed(2)}</span>
      `;
      cartItemsEl.appendChild(listItem);
    });

    updateBadge();
  }

  function openCart() {
    if (!cartPanel || !cartButton) return;
    cartPanel.hidden = false;
    cartPanel.setAttribute('aria-hidden', 'false');
    cartButton.setAttribute('aria-expanded', 'true');
  }

  function closeCart() {
    if (!cartPanel || !cartButton) return;
    cartPanel.hidden = true;
    cartPanel.setAttribute('aria-hidden', 'true');
    cartButton.setAttribute('aria-expanded', 'false');
  }

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      const isOpen = cartPanel && !cartPanel.hidden;
      if (isOpen) {
        closeCart();
      } else {
        openCart();
      }
    });
  }

  if (cartClearBtn) {
    cartClearBtn.addEventListener('click', () => {
      saveCartItems([]);
      renderCart();
    });
  }

  function handleAddToCart(button) {
    const card = button.closest('.product-card');
    const name = card?.querySelector('h2')?.textContent?.trim() || 'Produk sukan';
    const priceText = card?.querySelector('.price')?.textContent?.trim() || '0';
    const price = Number.parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;

    const currentItems = getCartItems();
    const existingItem = currentItems.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      currentItems.push({ name, price, quantity: 1 });
    }

    saveCartItems(currentItems);
    renderCart();
    openCart();
  }

  // Swiper loop mode clones slides, so delegate clicks from the carousel root.
  carousel?.addEventListener('click', (event) => {
    const button = event.target.closest('.product-content button');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    handleAddToCart(button);
  });

  applyMalayLocalization();
  renderCart();
});
