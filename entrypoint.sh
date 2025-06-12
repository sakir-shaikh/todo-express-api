#!/bin/sh

echo "🔁 Running prisma generate..."
npx prisma generate

echo "🚀 Starting Node app..."
exec node ./src/server.js
