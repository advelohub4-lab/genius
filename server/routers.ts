import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { approveUserActivation, createPaymentSubmission, getJobsForUser, getPublishedJobs, getUserActivation, getUserPayments } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }),
  }),
  jobs: router({
    list: publicProcedure.query(() => getPublishedJobs()),
    forUser: protectedProcedure.query(({ ctx }) => getJobsForUser(ctx.user.id)),
  }),
  activation: router({
    status: protectedProcedure.query(async ({ ctx }) => (await getUserActivation(ctx.user.id)) ?? { accountStatus: "pending" as const, activationStatus: "not_activated" as const, activatedAt: null }),
  }),
  payments: router({
    mine: protectedProcedure.query(({ ctx }) => getUserPayments(ctx.user.id)),
    submit: protectedProcedure.input(z.object({ transactionHash: z.string().trim().min(20).max(180) })).mutation(async ({ ctx, input }) => {
      const result = await createPaymentSubmission(ctx.user.id, input.transactionHash);
      return { accepted: true, status: "verification_pending" as const, userId: ctx.user.id, transactionHash: input.transactionHash, paymentId: result?.id ?? null };
    }),
  }),
  admin: router({
    access: adminProcedure.query(({ ctx }) => ({ allowed: true, adminId: ctx.user.id })),
    approveActivation: adminProcedure.input(z.object({ userId: z.number().int().positive() })).mutation(async ({ ctx, input }) => ({ approved: await approveUserActivation(input.userId, ctx.user.id), userId: input.userId })),
  }),
});

export type AppRouter = typeof appRouter;
