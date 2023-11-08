// jest.config.ts

module.exports = {
    verbose: true,
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
    moduleFileExtensions: ["ts", "js", "jsx", "json", "node"],
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
