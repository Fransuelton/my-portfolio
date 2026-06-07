import { Hono } from "hono";
import { cors } from "hono/cors";
import { contactSchema } from "./schema";
import { checkRate } from "./ratelimit";
import { sendContactEmails } from "./mailer";

const app = new Hono();

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:4321";
const PORT = Number(process.env.PORT ?? 3001);

app.use(
  "*",
  cors({
    origin: CORS_ORIGIN,
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.post("/api/contact", async (c) => {
  // Rate limit by IP
  const ip =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    c.req.header("x-real-ip") ??
    "unknown";

  const rate = checkRate(ip);
  if (!rate.ok) {
    return c.json(
      { error: "Too many requests" },
      429,
      { "Retry-After": String(rate.retryAfter) }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  // Validate
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return c.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      422
    );
  }

  // Send emails
  try {
    await sendContactEmails(parsed.data);
  } catch (err) {
    console.error("[mailer]", err);
    return c.json({ error: "Failed to send email" }, 500);
  }

  return c.json({ ok: true }, 201);
});

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

export default {
  port: PORT,
  fetch: app.fetch,
};

console.log(`[backend] listening on http://localhost:${PORT}`);
