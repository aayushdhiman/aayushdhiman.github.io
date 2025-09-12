# ---- deps
FROM node:20-bullseye AS deps
WORKDIR /app

# Install a specific pnpm (match your lockfile's major; 8.x for pnpm-lock v8)
ARG PNPM_VERSION=8.15.8
RUN npm i -g pnpm@${PNPM_VERSION}

# Only copy files needed for dependency resolution (better cache)
COPY package.json pnpm-lock.yaml* ./

# Install deps using the lockfile (fails if lockfile is incompatible/missing)
RUN pnpm install --frozen-lockfile

# ---- build
FROM node:20-bullseye AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install the same pnpm version in this stage
ARG PNPM_VERSION=8.15.8
RUN npm i -g pnpm@${PNPM_VERSION}

# Bring in source (after deps to maximize caching)
COPY . .
# Reuse node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Build your Next.js app
RUN pnpm build

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
