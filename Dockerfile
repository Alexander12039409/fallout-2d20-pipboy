FROM node:20-alpine
WORKDIR /app
COPY pipboy-sync/package.json pipboy-sync/server.js ./pipboy-sync/
COPY adaptive-v3 ./adaptive-v3
COPY adaptive-v3-player ./adaptive-v3-player
ENV NODE_ENV=production
ENV PORT=8787
ENV DATA_DIR=/data/sessions
RUN mkdir -p /data/sessions
EXPOSE 8787
WORKDIR /app/pipboy-sync
CMD ["node", "server.js"]
