import { describe, it, expect, beforeEach } from "vitest";
import {
  getReaderPage,
  checkEntitlement,
  createOrder,
  verifyPayment,
  getLibrary,
} from "@/lib/api/client";
import { SEED_BOOKS, SEED_PODCASTS, SEED_CURRENT_USER } from "@/lib/api/seedData";

describe("LeadSphere Platform Business Rules & Security Boundaries", () => {
  beforeEach(() => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  });

  describe("1. 10-Page Free Preview Rules (Books & Comics)", () => {
    it("allows unrestricted access to pages 1 through 10 for unpurchased books", async () => {
      const bookId = "book-2"; // unpurchased book
      const page1 = await getReaderPage(bookId, 1, "test-user-anonymous");
      expect(page1.locked).toBe(false);
      expect(page1.requiresPurchase).toBe(false);
      expect(page1.pageNumber).toBe(1);

      const page10 = await getReaderPage(bookId, 10, "test-user-anonymous");
      expect(page10.locked).toBe(false);
      expect(page10.requiresPurchase).toBe(false);
      expect(page10.pageNumber).toBe(10);
    });

    it("locks page 11 onward when no verified backend entitlement exists", async () => {
      const bookId = "book-2"; // unpurchased
      const page11 = await getReaderPage(bookId, 11, "test-user-anonymous");
      expect(page11.locked).toBe(true);
      expect(page11.requiresPurchase).toBe(true);
      expect(page11.pageNumber).toBe(11);
      expect(page11.freeLimit).toBe(10);
      expect(page11.text).toBeUndefined(); // Does not leak protected page content
    });

    it("grants access to page 11 onward when user has verified backend entitlement", async () => {
      // book-1 has entitlement in SEED_ENTITLEMENTS for SEED_CURRENT_USER.id
      const page11 = await getReaderPage("book-1", 11, SEED_CURRENT_USER.id);
      expect(page11.locked).toBe(false);
      expect(page11.requiresPurchase).toBe(false);
      expect(page11.text).toBeDefined();
    });
  });

  describe("2. Podcast Episode Pricing Rules", () => {
    it("guarantees Episode 1 of podcast series is free", async () => {
      const series = SEED_PODCASTS[0];
      const ep1 = series.episodes[0];
      expect(ep1.episodeNumber).toBe(1);
      expect(ep1.isFree).toBe(true);
      expect(ep1.price).toBe(0);
    });

    it("enforces that Episode 2 onward is not free and has individual price", async () => {
      const series = SEED_PODCASTS[0];
      const ep2 = series.episodes[1];
      expect(ep2.episodeNumber).toBe(2);
      expect(ep2.isFree).toBe(false);
      expect(ep2.price).toBeGreaterThan(0);

      const ep3 = series.episodes[2];
      expect(ep3.episodeNumber).toBe(3);
      expect(ep3.isFree).toBe(false);
      expect(ep3.price).toBeGreaterThan(0);
    });
  });

  describe("3. Order Creation & Cryptographic Payment Verification", () => {
    it("creates an order and issues verified backend entitlement upon signature verification", async () => {
      const book = SEED_BOOKS[2]; // Deep Focus Architecture
      const order = await createOrder({
        id: book.id,
        title: book.title,
        price: book.price,
        type: "book",
      });

      expect(order.id).toBeDefined();
      expect(order.status).toBe("processing");
      expect(order.totalAmount).toBe(book.price);

      // Verify payment
      const paymentResult = await verifyPayment(order.id, "pay_rzp_mock_sig_991823");
      expect(paymentResult.success).toBe(true);
      expect(paymentResult.entitlement.contentId).toBe(book.id);
      expect(paymentResult.entitlement.verifiedBackendSignature).toContain("pay_rzp_mock_sig_991823");

      // Verify entitlement check succeeds now
      const isEntitled = await checkEntitlement(book.id, SEED_CURRENT_USER.id);
      expect(isEntitled).toBe(true);

      // Verify page 11 is now unlocked
      const unlockedPage11 = await getReaderPage(book.id, 11, SEED_CURRENT_USER.id);
      expect(unlockedPage11.locked).toBe(false);
    });
  });

  describe("4. Library Telemetry & Protection", () => {
    it("returns owned books and always includes free podcast episode 1", async () => {
      const library = await getLibrary();
      expect(library.ownedBooks.length).toBeGreaterThan(0);
      expect(library.ownedEpisodes.some((e) => e.episode.episodeNumber === 1)).toBe(true);
    });
  });
});
