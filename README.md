# ANTIGRAVITY — Premium Digital Content Platform
### Complete Frontend Implementation: Executive + Jungle Themes | Customer Marketplace + Admin Console

A production-grade, full-stack-ready frontend for a premium digital content commerce platform serving CXOs, founders, senior business professionals, and avid readers.

---

## 🌟 Key Architectural Features

### 1. Dual-Theme Design System
- **Executive Theme (Default):** Minimal, sophisticated, editorial aesthetic suited for CXO-level users. Palette: Navy (`#203B53`), Warm Ivory (`#F6F5F1`), Brass/Gold (`#B89555`), Slate (`#18232F`).
- **Jungle Theme:** High-end illustrated world with four original bespoke vector cartoon mascots:
  - **Monkey:** Curiosity & Discovery (search guidance, exploration banners).
  - **Lion:** Leadership & Confidence (featured collections, executive editions).
  - **Elephant:** Wisdom & Knowledge (My Library, reading progress, empty library state).
  - **Wolf:** Strategy & Adventure (graphic story sagas, suspense collections).
- **Persistent Theme Switcher:** Instant switching with zero page reload, persistent in `localStorage`, animated over 200–300ms, and respecting `prefers-reduced-motion`.

### 2. Core Business Rules
- **10-Page Free Preview for Books & Comics:** Pages 1 through 10 are completely free to read in-browser. Page 11 onward strictly enforces cryptographic entitlement verification without leaking protected page assets.
- **Podcast Series Episode Pricing:** Episode 1 of every series is 100% free video streaming. Subsequent episodes (Ep 2+) are individually purchasable via Razorpay.
- **In-Browser Consumption:** Protected browser reading and video players with no ordinary download/print buttons.
- **No Client-Only Access Flags:** Verification requires valid backend entitlement signatures. Order success pages verify real order states and reject fabricated query parameters.

### 3. Dual-Application Architecture in One Repository
- **Customer Store & Library:** Marketplace, Catalog, Dedicated Reader, Video Player, My Library, Bookmarks, Reading History, Checkout, and Settings.
- **Executive Admin Dashboard:** Operational console with Gross Sales, Refunds, Net Revenue, AOV, Catalog Upload Wizard (with 10-page preview configuration and asset dropzones), User Management, Orders & Refund Authorization, Roles Matrix, and Immutable Audit Logs.

### 4. Demo Mode & Live API Integration
- Toggle between **Demo Simulation Mode** (seeded high-fidelity mock data) and **Live API Mode** (`NEXT_PUBLIC_API_BASE_URL`).
- Visual indicator banner distinguishing demo simulations from live production transactions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm 9+

### Installation & Execution
```bash
# Install dependencies
npm install

# Run Vitest test suite
npm test

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start development server
npm run dev
```

The application will be available at: `http://localhost:3000`

---

## 🗺️ Route Architecture

### Public Customer Store
| Route | Description |
|---|---|
| `/` | Homepage with Executive & Jungle hero variants, catalog rails, and dispatch newsletter |
| `/discover` | Curated discovery portal with mascot guides and editorial spotlights |
| `/books` | Book catalog with search, category chips, and sorting |
| `/books/[slug]` | Book detail page with table of contents and 10-page preview CTA |
| `/comics` | Graphic novel catalog preserving 3:4 aspect-ratio artwork |
| `/comics/[slug]` | Comic detail page with creator credits and preview CTA |
| `/podcasts` | Video podcast catalog highlighting Ep 1 Free badging |
| `/podcasts/[slug]` | Podcast series masterclass with episode playlist |
| `/episodes/[id]` | Dedicated video player with custom playback controls |
| `/read/[id]` | In-browser book and comic reader with 10-page lock gate |
| `/search` | Unified search across books, comics, and podcasts |
| `/about`, `/help`, `/contact` | Editorial heritage, FAQ, and support contact |
| `/refund-policy`, `/privacy`, `/terms` | Commercial compliance and legal terms |

### Customer Account & Library
| Route | Description |
|---|---|
| `/library` | Personal library with Elephant empty state in Jungle theme |
| `/bookmarks` | Saved reading list |
| `/history` | Synced reading and video watch progress |
| `/orders`, `/orders/[id]` | Purchase history and cryptographic receipt verification |
| `/checkout`, `/checkout/success` | Razorpay checkout flow with backend entitlement check |
| `/login`, `/register`, `/forgot-password` | Executive authentication |
| `/settings` | Profile, security, and theme preference syncing |

### Executive Admin Dashboard (`/admin`)
| Route | Description |
|---|---|
| `/admin` | Financial telemetry (Gross sales, refunds, net revenue, AOV, recent orders) |
| `/admin/content` | Content inventory management and status controls |
| `/admin/content/new` | Multi-step title creation wizard with asset dropzone and 10-page preview slider |
| `/admin/users` | User governance, entitlement signature inspection, and account suspension |
| `/admin/orders` | Full transaction ledger with audited refund workflow |
| `/admin/analytics` | Content category revenue splits and conversion telemetry |
| `/admin/roles` | Role-based access control (RBAC) permission matrix |
| `/admin/audit-logs` | Immutable security audit trail |
| `/admin/settings` | Platform API endpoints, Razorpay keys, and preview boundaries |

---

## ⚙️ Environment Variables (`.env.example`)

```env
# Optional: Live Backend API Base URL (leave empty for Demo Simulation Mode)
NEXT_PUBLIC_API_BASE_URL=

# Razorpay Client Key ID
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_exec9901

# Global Free Preview Boundary (default 10 pages)
NEXT_PUBLIC_PREVIEW_LIMIT=10
```

---

## 🧪 Testing Coverage

The test suite in [`src/tests/platform.test.ts`](src/tests/platform.test.ts) validates:
1. Unrestricted access to pages 1–10 for unpurchased content.
2. Page 11+ locked state without verified entitlement.
3. Access granted to page 11+ after cryptographic payment verification.
4. Podcast Episode 1 free rule.
5. Podcast Episode 2+ locked and individually priced rule.
6. Order creation and signature verification.
7. Library entitlement integration.
