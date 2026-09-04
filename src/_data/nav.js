const groups = [
  {
    label: 'Marketplace',
    icon: '🛒',
    url: '/marketplace/',
    dropdown: [
      { label: 'All Categories', url: '/marketplace/', icon: '🛒', desc: 'Buy, sell, trade across the UK' },
      { label: 'Direct Barter', url: '/barter/', icon: '🔄', desc: 'Trade item-for-item — no money needed' },
      { label: 'RWA — Asset Registry', url: '/rwa/', icon: '🔐', desc: 'On-chain proof of ownership' },
      { label: 'Book Exchange', url: '/books/', icon: '📚', desc: 'Swap, sell or give away books' },
    ],
  },
  {
    label: 'Community',
    icon: '🤝',
    url: '/dating/',
    dropdown: [
      { label: 'Coffee Dating (18+)', url: '/dating/', icon: '☕', desc: 'Meet locally — low-pressure, safe' },
      { label: 'Repair & Upcycle', url: '/repair-upcycle/', icon: '🔧', desc: 'Fix before you replace — save money, learn skills' },
      { label: 'Events & Swap Meets', url: '/events/', icon: '📅', desc: 'Swap meets, meetups, workshops' },
      { label: 'Local Businesses', url: '/business/', icon: '🏪', desc: 'Discover & support local' },
    ],
  },
  {
    label: 'Services',
    icon: '🏗️',
    url: '/builder/',
    dropdown: [
      { label: 'Find a Builder', url: '/builder/', icon: '🏗️', desc: 'Verified tradespeople near you' },
      { label: 'Jobs & Income', url: '/jobs/', icon: '💼', desc: 'Remote work, freelance, side income' },
      { label: 'Free Tools & Guides', url: '/tools/', icon: '🧰', desc: 'Calculators, converters, budget tools' },
      { label: 'Digital Downloads', url: '/downloads/', icon: '📁', desc: 'Templates, charts, checklists, printables' },
    ],
  },
  {
    label: 'Token',
    icon: '💎',
    url: '/token/',
    dropdown: [
      { label: 'STRAW Token', url: '/token/', icon: '💎', desc: 'Live on Solana — verifiable on-chain' },
      { label: 'Referral Scheme', url: '/signup/', icon: '🎁', desc: '10,000 free on sign-up + 10,000 per referral' },
      { label: 'Join Free', url: '/signup/', icon: '✨', desc: "It's free — no fees, no hidden costs" },
    ],
  },
];

const singles = [
  { label: 'Legal', icon: '⚖️', url: '/legal/' },
];

function attach(root, depth) {
  for (const item of root) {
    if (!item.icon) item.icon = '📄';
    item.mobile = `${item.icon} ${item.label}`;
    if (item.dropdown) {
      attach(item.dropdown, depth + 1);
      if (depth === 0) {
        item.dropdown.forEach((d) => {
          d.parent = item.label;
        });
      }
    }
  }
  return root;
}

module.exports = { groups: attach(groups, 0), singles };
