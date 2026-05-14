FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS install

COPY . .
RUN bun install --frozen-lockfile --production
RUN bun run build

FROM base AS release
COPY --from=install .output .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", ".output/server/index.mjs" ]
