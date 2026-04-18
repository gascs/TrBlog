"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("prisma");
exports.default = (0, prisma_1.defineConfig)({
    datasources: {
        db: {
            provider: 'postgresql',
            url: process.env.DATABASE_URL,
        },
    },
});
//# sourceMappingURL=prisma.config.js.map