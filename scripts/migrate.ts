import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { config } from "dotenv";
import { db } from "@/db/drizzle";

config({ path: ".env.local" });

(async () => {
    try {
        await migrate(db, {
            migrationsFolder: "drizzle",
        });
        console.log("Migration successful");

        process.exit(0);
    } catch (e) {
        console.error(e);

        process.exit(1);
    }
})();
