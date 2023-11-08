// jest.config.ts

module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            lines: 80,
            functions: 80,
            statements: 80,
        },
    },
};
