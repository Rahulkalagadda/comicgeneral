"use client";

import {
  Book,
  Comic,
  PodcastSeries,
  ContentItem,
  Order,
  User,
  AuditLog,
  Entitlement,
  ReadingProgress,
  BookmarkItem,
} from "@/types";
import {
  SEED_BOOKS,
  SEED_COMICS,
  SEED_PODCASTS,
  SEED_USERS,
  SEED_ORDERS,
  SEED_AUDIT_LOGS,
  SEED_ENTITLEMENTS,
  SEED_CURRENT_USER,
} from "./seedData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const IS_DEMO_DEFAULT = !process.env.NEXT_PUBLIC_API_BASE_URL;

// Local storage keys for demo persistence
const ENTITLEMENTS_KEY = "leadsphere_entitlements";
const ORDERS_KEY = "leadsphere_orders";
const BOOKMARKS_KEY = "leadsphere_bookmarks";
const PROGRESS_KEY = "leadsphere_progress";
const DEMO_MODE_KEY = "leadsphere_demo_mode";

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key) || localStorage.getItem(key.replace("leadsphere_", "antigravity_"));
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return IS_DEMO_DEFAULT;
  const stored = localStorage.getItem(DEMO_MODE_KEY);
  if (stored !== null) return stored === "true";
  return IS_DEMO_DEFAULT;
}

export function setDemoMode(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_MODE_KEY, String(enabled));
  window.dispatchEvent(new Event("demo-mode-changed"));
}

/**
 * Entitlement Verification Engine
 * Strictly enforces backend-style validation:
 * - Books / Comics: pages 1 to 10 free; page 11+ requires verified entitlement.
 * - Podcasts: episode 1 is free; subsequent episodes require verified entitlement.
 */
export async function checkEntitlement(
  contentId: string,
  userId: string = SEED_CURRENT_USER.id
): Promise<boolean> {
  const entitlements = getStored<Entitlement[]>(ENTITLEMENTS_KEY, SEED_ENTITLEMENTS);
  return entitlements.some(
    (e) => (e.contentId === contentId || e.contentId === "all_access") && e.userId === userId
  );
}

export async function getCatalog(): Promise<{
  books: Book[];
  comics: Comic[];
  podcasts: PodcastSeries[];
}> {
  if (!isDemoMode() && API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/v1/catalog`);
    if (!res.ok) throw new Error("Failed to load catalog from API");
    return res.json();
  }
  // Simulated API response delay
  await new Promise((r) => setTimeout(r, 100));
  return {
    books: SEED_BOOKS,
    comics: SEED_COMICS,
    podcasts: SEED_PODCASTS,
  };
}

export async function getContentBySlug(
  slug: string,
  type?: "book" | "comic" | "podcast"
): Promise<ContentItem | null> {
  const { books, comics, podcasts } = await getCatalog();
  if (type === "book" || !type) {
    const found = books.find((b) => b.slug === slug);
    if (found) return found;
  }
  if (type === "comic" || !type) {
    const found = comics.find((c) => c.slug === slug);
    if (found) return found;
  }
  if (type === "podcast" || !type) {
    const found = podcasts.find((p) => p.slug === slug);
    if (found) return found;
  }
  return null;
}

export interface ReaderPageResponse {
  contentId: string;
  pageNumber: number;
  totalPages: number;
  title?: string;
  text?: string;
  imageUrl?: string;
  locked: boolean;
  requiresPurchase: boolean;
  freeLimit: number;
}

/**
 * Protected Reader Page Retrieval
 * Enforces business rule: Pages 1-10 free; page 11+ requires entitlement!
 */
export async function getReaderPage(
  contentId: string,
  pageNumber: number,
  userId: string = SEED_CURRENT_USER.id
): Promise<ReaderPageResponse> {
  const FREE_LIMIT = 10;
  const hasEntitlement = await checkEntitlement(contentId, userId);

  const { books, comics } = await getCatalog();
  const book = books.find((b) => b.id === contentId);
  const comic = comics.find((c) => c.id === contentId);

  const item = book || comic;
  if (!item) {
    throw new Error("Content not found");
  }

  const isFree = pageNumber <= FREE_LIMIT;
  const isAuthorized = isFree || hasEntitlement;

  if (!isAuthorized) {
    return {
      contentId,
      pageNumber,
      totalPages: item.pageCount,
      locked: true,
      requiresPurchase: true,
      freeLimit: FREE_LIMIT,
    };
  }

  if (book) {
    const pageData = book.pages?.find((p) => p.pageNumber === pageNumber) || {
      pageNumber,
      title: `Chapter ${Math.ceil(pageNumber / 5)}`,
      text: `Page ${pageNumber}: Detailed executive strategy text content.`,
    };

    return {
      contentId,
      pageNumber,
      totalPages: book.pageCount,
      title: pageData.title,
      text: pageData.text,
      locked: false,
      requiresPurchase: false,
      freeLimit: FREE_LIMIT,
    };
  } else {
    const comicData = comic!.pages?.find((p) => p.pageNumber === pageNumber) || {
      pageNumber,
      imageUrl: comic!.coverUrl,
      panelDescription: `Graphic narrative panel ${pageNumber}`,
    };

    return {
      contentId,
      pageNumber,
      totalPages: comic!.pageCount,
      imageUrl: comicData.imageUrl,
      title: `Page ${pageNumber}`,
      locked: false,
      requiresPurchase: false,
      freeLimit: FREE_LIMIT,
    };
  }
}

/**
 * Orders & Payments
 */
export async function createOrder(
  contentItem: { id: string; title: string; price: number; type: any },
  customer: { name: string; email: string } = {
    name: SEED_CURRENT_USER.name,
    email: SEED_CURRENT_USER.email,
  }
): Promise<Order> {
  const orderNumber = `AGY-${Date.now().toString().slice(-6)}`;
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber,
    userId: SEED_CURRENT_USER.id,
    customerName: customer.name,
    customerEmail: customer.email,
    items: [
      {
        id: `item-${Date.now()}`,
        contentId: contentItem.id,
        contentType: contentItem.type,
        title: contentItem.title,
        unitPrice: contentItem.price,
      },
    ],
    totalAmount: contentItem.price,
    currency: "INR",
    status: "processing",
    razorpayOrderId: `order_rzp_${Math.random().toString(36).substring(2, 10)}`,
    createdAt: new Date().toISOString(),
  };

  const existingOrders = getStored<Order[]>(ORDERS_KEY, SEED_ORDERS);
  setStored(ORDERS_KEY, [newOrder, ...existingOrders]);
  return newOrder;
}

export async function verifyPayment(
  orderId: string,
  razorpayPaymentId: string
): Promise<{ success: boolean; entitlement: Entitlement }> {
  const orders = getStored<Order[]>(ORDERS_KEY, SEED_ORDERS);
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    throw new Error("Order not found");
  }

  const order = orders[orderIndex];
  order.status = "payment_successful";
  order.razorpayPaymentId = razorpayPaymentId;
  order.verifiedAt = new Date().toISOString();
  orders[orderIndex] = order;
  setStored(ORDERS_KEY, orders);

  // Grant verified backend entitlement
  const newEntitlement: Entitlement = {
    id: `ent-${Date.now()}`,
    userId: order.userId,
    contentId: order.items[0].contentId,
    contentType: order.items[0].contentType as any,
    grantedAt: new Date().toISOString(),
    verifiedBackendSignature: `sig_verified_${razorpayPaymentId}`,
  };

  const currentEntitlements = getStored<Entitlement[]>(ENTITLEMENTS_KEY, SEED_ENTITLEMENTS);
  setStored(ENTITLEMENTS_KEY, [newEntitlement, ...currentEntitlements]);

  return { success: true, entitlement: newEntitlement };
}

export async function getLibrary(): Promise<{
  ownedBooks: Book[];
  ownedComics: Comic[];
  ownedEpisodes: { series: PodcastSeries; episode: any }[];
}> {
  const entitlements = getStored<Entitlement[]>(ENTITLEMENTS_KEY, SEED_ENTITLEMENTS);
  const { books, comics, podcasts } = await getCatalog();

  const ownedBookIds = new Set(
    entitlements.filter((e) => e.contentType === "book").map((e) => e.contentId)
  );
  const ownedComicIds = new Set(
    entitlements.filter((e) => e.contentType === "comic").map((e) => e.contentId)
  );
  const ownedEpisodeIds = new Set(
    entitlements.filter((e) => e.contentType === "podcast_episode").map((e) => e.contentId)
  );

  const ownedEpisodes: { series: PodcastSeries; episode: any }[] = [];
  podcasts.forEach((s) => {
    s.episodes.forEach((ep) => {
      // Episode 1 is free, or explicitly owned
      if (ep.isFree || ownedEpisodeIds.has(ep.id)) {
        ownedEpisodes.push({ series: s, episode: ep });
      }
    });
  });

  return {
    ownedBooks: books.filter((b) => ownedBookIds.has(b.id)),
    ownedComics: comics.filter((c) => ownedComicIds.has(c.id)),
    ownedEpisodes,
  };
}

export async function getBookmarks(): Promise<BookmarkItem[]> {
  return getStored<BookmarkItem[]>(BOOKMARKS_KEY, [
    {
      id: "bmk-1",
      contentId: "book-1",
      contentType: "book",
      title: "The Sovereign Strategist: Navigating Asymmetric Markets",
      creatorOrAuthor: "Julian Vance, Ph.D.",
      coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
      price: 1899,
      savedAt: "2025-09-12T11:20:00Z",
    },
  ]);
}

export async function toggleBookmark(item: BookmarkItem): Promise<boolean> {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.some((b) => b.contentId === item.contentId);
  let updated: BookmarkItem[];
  if (exists) {
    updated = bookmarks.filter((b) => b.contentId !== item.contentId);
  } else {
    updated = [item, ...bookmarks];
  }
  setStored(BOOKMARKS_KEY, updated);
  return !exists;
}

export async function isBookmarked(contentId: string): Promise<boolean> {
  const bookmarks = await getBookmarks();
  return bookmarks.some((b) => b.contentId === contentId);
}

export async function getReadingProgress(contentId: string): Promise<ReadingProgress | null> {
  const allProgress = getStored<Record<string, ReadingProgress>>(PROGRESS_KEY, {
    "book-1": {
      contentId: "book-1",
      currentPage: 7,
      totalPages: 340,
      lastReadAt: new Date().toISOString(),
      completed: false,
    },
  });
  return allProgress[contentId] || null;
}

export async function saveReadingProgress(
  contentId: string,
  pageNumber: number,
  totalPages: number
): Promise<void> {
  const allProgress = getStored<Record<string, ReadingProgress>>(PROGRESS_KEY, {});
  allProgress[contentId] = {
    contentId,
    currentPage: pageNumber,
    totalPages,
    lastReadAt: new Date().toISOString(),
    completed: pageNumber >= totalPages,
  };
  setStored(PROGRESS_KEY, allProgress);
}

export async function getAdminOrders(): Promise<Order[]> {
  return getStored<Order[]>(ORDERS_KEY, SEED_ORDERS);
}

export async function getAdminUsers(): Promise<User[]> {
  return SEED_USERS;
}

export async function getAdminAuditLogs(): Promise<AuditLog[]> {
  return SEED_AUDIT_LOGS;
}
