import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;
function createContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: role === "admin" ? 99 : 1,
    openId: role === "admin" ? "admin-user" : "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("payment verification safeguards", () => {
  it("keeps a submitted transaction hash pending review", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.payments.submit({ transactionHash: "0x1234567890abcdef1234567890abcdef12345678" });
    expect(result.status).toBe("verification_pending");
    expect(result.accepted).toBe(true);
  });

  it("blocks normal users from admin access", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.access()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows admin users to access the admin procedure", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.admin.access()).resolves.toMatchObject({ allowed: true, adminId: 99 });
  });
});
