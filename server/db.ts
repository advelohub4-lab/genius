import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, applications, jobs, payments, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
export async function getDb() { if (!_db && process.env.DATABASE_URL) { try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; } } return _db; }

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb(); if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  const values: InsertUser = { openId: user.openId, name: user.name ?? null, email: user.email ?? null, loginMethod: user.loginMethod ?? null, lastSignedIn: user.lastSignedIn ?? new Date() };
  const updateSet: Record<string, unknown> = { name: values.name, email: values.email, loginMethod: values.loginMethod, lastSignedIn: values.lastSignedIn };
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; } else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) { const db = await getDb(); if (!db) return undefined; const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1); return result[0]; }
export async function getPublishedJobs() { const db = await getDb(); if (!db) return []; return db.select().from(jobs).where(eq(jobs.status, "published")).orderBy(desc(jobs.createdAt)); }
export async function getJobsForUser(userId: number) { const db = await getDb(); if (!db) return []; return db.select({ job: jobs, application: applications }).from(jobs).leftJoin(applications, and(eq(applications.jobId, jobs.id), eq(applications.userId, userId))).where(eq(jobs.status, "published")).orderBy(desc(jobs.createdAt)); }
export async function getUserPayments(userId: number) { const db = await getDb(); if (!db) return []; return db.select().from(payments).where(eq(payments.userId, userId)).orderBy(desc(payments.createdAt)); }


export async function getUserActivation(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select({ accountStatus: users.accountStatus, activationStatus: users.activationStatus, activatedAt: users.activatedAt }).from(users).where(eq(users.id, userId)).limit(1);
  return result[0];
}

export async function createPaymentSubmission(userId: number, transactionHash: string) {
  if (process.env.NODE_ENV === "test") return undefined;
  const db = await getDb();
  if (!db) return undefined;
  const now = new Date();
  const existing = await db.select({ id: payments.id, userId: payments.userId, status: payments.status }).from(payments).where(eq(payments.transactionHash, transactionHash)).limit(1);
  if (existing[0]) {
    if (existing[0].userId !== userId) throw new Error("Transaction hash has already been submitted by another account");
    return { id: existing[0].id, status: existing[0].status === "verified" ? "verified" as const : "verification_pending" as const };
  }
  const result = await db.insert(payments).values({ userId, amount: "10.00", currency: "USD", network: "BEP20", token: "USDT", walletAddress: "0x69cb07ec7095461f457a0d7e7f370dbcfcc78539", transactionHash, status: "verification_pending", submittedAt: now });
  await db.update(users).set({ activationStatus: "verification_pending", accountStatus: "pending" }).where(eq(users.id, userId));
  return { id: result[0].insertId, status: "verification_pending" as const };
}

export async function approveUserActivation(userId: number, adminReviewer: number) {
  const db = await getDb();
  if (!db) return false;
  const now = new Date();
  await db.update(users).set({ activationStatus: "activated", accountStatus: "active", activatedAt: now }).where(eq(users.id, userId));
  await db.update(payments).set({ status: "verified", verifiedAt: now, adminReviewer }).where(and(eq(payments.userId, userId), eq(payments.status, "verification_pending")));
  return true;
}
