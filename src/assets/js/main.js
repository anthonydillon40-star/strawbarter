// Dropdown menus are CSS-driven (hover/focus-within); this closes them on outside click / Escape
document.addEventListener('click', (e) => {
  document.querySelectorAll('.dropdown.open > .dropdown-menu, .dropdown-menu.open').forEach((menu) => {
    if (!menu.parentElement.contains(e.target)) menu.classList.remove('open');
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.dropdown-menu.open').forEach((m) => m.classList.remove('open'));
    document.querySelectorAll('[data-modal]').forEach((m) => closeModal(m));
  }
});

// Mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('hidden');
  document.querySelector('[aria-controls="mobileMenu"]')?.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
}
document.querySelectorAll('#mobileMenu .mobile-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('hidden');
  });
});

// Toast
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2500);
}

// Clipboard copy
function copyText(text, msg) {
  navigator.clipboard.writeText(text).then(() => showToast(msg || '✅ Copied!'));
}
function copyTokenAddress() {
  copyText(window.STRAW_CONFIG?.solana || '', '✅ Contract address copied!');
}
function copyRefLink() {
  const el = document.getElementById('refLink');
  if (el) copyText(el.value, '✅ Referral link copied!');
}

// Generic modal helpers
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('hidden');
  m.classList.add('flex', 'show');
}
function closeModal(idOrEl) {
  const m = typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
  if (!m) return;
  m.classList.add('hidden');
  m.classList.remove('flex', 'show');
}
document.querySelectorAll('[data-modal]').forEach((m) => {
  m.addEventListener('click', (e) => {
    if (e.target === m) closeModal(m);
  });
});

// Age gate
function openAgeGate() {
  document.getElementById('ageGate')?.classList.add('show');
}
function confirmAge(isAdult) {
  const gate = document.getElementById('ageGate');
  gate?.classList.remove('show');
  if (isAdult) {
    document.documentElement.classList.add('age-verified');
    try { localStorage.setItem('strawAgeVerified', '1'); } catch (_) {}
    showToast('✅ Verified — welcome!');
  } else {
    showToast('🔞 This section is 18+ only');
  }
}
try {
  if (localStorage.getItem('strawAgeVerified') === '1') {
    document.documentElement.classList.add('age-verified');
  }
} catch (_) {}

// Books (Book Exchange page)
const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', category: 'self-help', condition: 'like-new', type: 'swap', price: null, location: 'London, SE1', image: '📘', poster: 'Sarah M.', posted: '2h ago' },
  { id: 2, title: 'Harry Potter — Complete Set', author: 'J.K. Rowling', category: 'children', condition: 'good', type: 'sell', price: 25, location: 'Manchester, M4', image: '📚', poster: 'Dave T.', posted: '1d ago' },
  { id: 3, title: 'The Psychology of Money', author: 'Morgan Housel', category: 'non-fiction', condition: 'good', type: 'free', price: null, location: 'Birmingham, B5', image: '📗', poster: 'Emma L.', posted: '3h ago' },
  { id: 4, title: 'University Physics Textbook', author: 'Young & Freedman', category: 'textbooks', condition: 'fair', type: 'swap', price: null, location: 'Leeds, LS2', image: '📕', poster: 'Mark R.', posted: '5h ago' },
  { id: 5, title: 'Great British Bake Off', author: 'Various', category: 'cookery', condition: 'like-new', type: 'sell', price: 8, location: 'Bristol, BS3', image: '📖', poster: 'Lisa K.', posted: '6h ago' },
  { id: 6, title: '1984', author: 'George Orwell', category: 'fiction', condition: 'good', type: 'free', price: null, location: 'Edinburgh, EH1', image: '📙', poster: 'John P.', posted: '1d ago' },
  { id: 7, title: 'How to Win Friends', author: 'Dale Carnegie', category: 'self-help', condition: 'like-new', type: 'swap', price: null, location: 'Glasgow, G1', image: '📘', poster: 'Jenny W.', posted: '4h ago' },
  { id: 8, title: 'Python Programming 3rd Ed', author: 'Mark Lutz', category: 'textbooks', condition: 'fair', type: 'sell', price: 15, location: 'Cardiff, CF1', image: '📕', poster: 'Alex H.', posted: '2d ago' },
];

function renderBooks(list) {
  const grid = document.getElementById('booksGrid');
  if (!grid) return;
  grid.innerHTML = list.map((book) => {
    const badge = book.type === 'free'
      ? '<span class="bg-s-green/20 text-s-green px-3 py-1 rounded-full text-xs font-semibold">🎁 FREE</span>'
      : book.type === 'swap'
        ? '<span class="bg-s-gold/20 text-s-gold px-3 py-1 rounded-full text-xs font-semibold">🔄 Swap</span>'
        : `<span class="bg-s-purple/20 text-s-purple px-3 py-1 rounded-full text-xs font-semibold">£${book.price}</span>`;
    return `
      <div class="bg-s-card rounded-2xl p-5 border border-s-border cursor-pointer hover:border-s-green/50 transition" onclick="openBookDetail(${book.id})">
        <div class="h-36 bg-s-green/10 rounded-xl flex items-center justify-center text-5xl mb-4">${book.image}</div>
        <h3 class="text-lg font-bold text-white mb-1">${book.title}</h3>
        <p class="text-s-muted text-sm mb-3">${book.author}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-s-muted">${book.condition}</span>
          ${badge}
        </div>
        <div class="mt-3 text-xs text-s-muted">📍 ${book.location}</div>
      </div>`;
  }).join('');
  const count = document.getElementById('bookCount');
  if (count) count.textContent = list.length;
}

function filterBooks() {
  const search = (document.getElementById('bookSearch')?.value || '').toLowerCase();
  const cat = document.getElementById('bookCategory')?.value || 'all';
  const cond = document.getElementById('bookCondition')?.value || 'all';
  const swapOnly = document.getElementById('onlySwap')?.checked || false;
  const freeOnly = document.getElementById('onlyFree')?.checked || false;
  const filtered = books.filter((b) => {
    const matchSearch = !search || b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search);
    const matchCat = cat === 'all' || b.category === cat;
    const matchCond = cond === 'all' || b.condition === cond;
    const matchSwap = !swapOnly || b.type === 'swap';
    const matchFree = !freeOnly || b.type === 'free';
    return matchSearch && matchCat && matchCond && matchSwap && matchFree;
  });
  renderBooks(filtered);
}

function openBookDetail(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;
  document.getElementById('detailTitle').textContent = book.title;
  document.getElementById('detailContent').innerHTML = `
    <div class="h-44 bg-s-green/10 rounded-xl flex items-center justify-center text-6xl mb-6">${book.image}</div>
    <div class="space-y-3 text-sm">
      <div class="flex justify-between py-2 border-b border-s-border">
        <span class="text-s-muted">Author</span><span class="font-semibold text-white">${book.author}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-s-border">
        <span class="text-s-muted">Category</span><span class="font-semibold text-white">${book.category}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-s-border">
        <span class="text-s-muted">Condition</span><span class="font-semibold text-white">${book.condition}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-s-border">
        <span class="text-s-muted">Available for</span><span class="font-semibold text-white">${book.type === 'free' ? '🎁 Free' : book.type === 'swap' ? '🔄 Swap' : '£' + book.price}</span>
      </div>
      <div class="flex justify-between py-2 border-b border-s-border">
        <span class="text-s-muted">Location</span><span class="font-semibold text-white">${book.location}</span>
      </div>
      <div class="flex justify-between py-2">
        <span class="text-s-muted">Posted by</span><span class="font-semibold text-white">${book.poster} · ${book.posted}</span>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <button class="flex-1 bg-s-green text-s-dark py-3 rounded-full font-bold hover:bg-green-400 transition">💬 Message</button>
      <button class="flex-1 bg-s-green/10 border border-s-green/40 text-white py-3 rounded-full font-semibold hover:bg-s-green/20 transition">🤝 Arrange</button>
    </div>`;
  openModal('bookDetailModal');
}

document.getElementById('postBookForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('✅ Book posted! It will appear in listings shortly.');
  closeModal('postBookModal');
  e.target.reset();
});
document.getElementById('bookSearch')?.addEventListener('input', filterBooks);
document.getElementById('bookCategory')?.addEventListener('change', filterBooks);
document.getElementById('bookCondition')?.addEventListener('change', fetchFilters);
document.getElementById('onlySwap')?.addEventListener('change', filterBooks);
document.getElementById('onlyFree')?.addEventListener('change', filterBooks);

function fetchFilters() { filterBooks(); }

// Initial render if the books grid exists on this page
if (document.getElementById('booksGrid')) {
  renderBooks(books);
}

// Expose inline-handler API
Object.assign(window, {
  toggleMobileMenu, showToast, copyText, copyTokenAddress, copyRefLink,
  openAgeGate, confirmAge, openModal, closeModal,
  renderBooks, filterBooks, openBookDetail,
});
