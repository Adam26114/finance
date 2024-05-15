import {  sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const accounts = sqliteTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);

// export type insertAccountSchema = typeof accounts.$inferInsert;
