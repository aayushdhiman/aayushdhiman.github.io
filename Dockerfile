# ---- deps
FROM node:20-bullseye AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN corepack enable
RUN pnpm install --frozen-lockfile || npm ci

# ---- build
FROM node:20-bullseye AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build || npm run build

# ---- run (standalone output)
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Next standalone bundle provides server.js
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
