import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, index, uniqueIndex } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  firstName: varchar("firstName", { length: 80 }),
  lastName: varchar("lastName", { length: 80 }),
  username: varchar("username", { length: 60 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 40 }),
  country: varchar("country", { length: 100 }),
  countryCode: varchar("countryCode", { length: 8 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  accountStatus: mysqlEnum("accountStatus", ["pending", "active", "suspended"]).default("pending").notNull(),
  activationStatus: mysqlEnum("activationStatus", ["not_activated", "payment_submitted", "verification_pending", "activated", "rejected"]).default("not_activated").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  activatedAt: timestamp("activatedAt"),
}, (table) => ({ usernameIdx: uniqueIndex("username_idx").on(table.username), emailIdx: index("email_idx").on(table.email), statusIdx: index("account_status_idx").on(table.accountStatus) }));

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 8 }).default("USD").notNull(),
  network: varchar("network", { length: 40 }).default("BEP20").notNull(),
  token: varchar("token", { length: 20 }).default("USDT").notNull(),
  walletAddress: varchar("walletAddress", { length: 128 }).notNull(),
  transactionHash: varchar("transactionHash", { length: 180 }),
  status: mysqlEnum("status", ["required", "submitted", "verification_pending", "verified", "rejected", "additional_info_required"]).default("required").notNull(),
  rejectionReason: text("rejectionReason"),
  submittedAt: timestamp("submittedAt"),
  verifiedAt: timestamp("verifiedAt"),
  adminReviewer: int("adminReviewer").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ userIdx: index("payment_user_idx").on(table.userId), hashIdx: uniqueIndex("transaction_hash_idx").on(table.transactionHash), statusIdx: index("payment_status_idx").on(table.status) }));

export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  company: varchar("company", { length: 160 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  countries: text("countries").notNull(),
  skills: text("skills").notNull(),
  remoteLabel: varchar("remoteLabel", { length: 40 }).default("Remote / Online").notNull(),
  taskType: varchar("taskType", { length: 100 }),
  status: mysqlEnum("status", ["draft", "published", "closed", "archived"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  closingDate: timestamp("closingDate"),
}, (table) => ({ statusIdx: index("job_status_idx").on(table.status), categoryIdx: index("job_category_idx").on(table.category) }));

export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  jobId: int("jobId").notNull().references(() => jobs.id),
  status: mysqlEnum("status", ["applied", "pending", "accepted", "rejected", "completed"]).default("applied").notNull(),
  notes: text("notes"),
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
}, (table) => ({ userIdx: index("application_user_idx").on(table.userId), jobIdx: index("application_job_idx").on(table.jobId), uniqueApplication: uniqueIndex("unique_application_idx").on(table.userId, table.jobId) }));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Application = typeof applications.$inferSelect;
