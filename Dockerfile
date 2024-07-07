FROM node:20 AS base
RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate

FROM base AS deps
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./
RUN pnpm install
RUN pnpm prisma:generate

FROM base AS builder
WORKDIR /usr/src/app
COPY . ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN pnpm build

FROM base AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml* ./
COPY .env ./
COPY docker-entrypoint.sh ./
RUN ["chmod", "+x", "docker-entrypoint.sh"]
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]
