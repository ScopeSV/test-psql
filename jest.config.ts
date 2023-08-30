/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

process.env.ENVIRONMENT = "test";

export default {
  /**
   * Initial setup
   */
  silent: false,
  verbose: true,

  /**
   *  Cleanup
   */
  clearMocks: true,
  // resetMocks: false,
  // resetModules: false,
  // restoreMocks: false,

  /**
   * Coverage
   */
  collectCoverage: true,
  collectCoverageFrom: [
    "./{cdk,src,types,test}/**/!(__tests__)/!(*.test|*.d).{ts,js}?(x)",
  ],
  coverageDirectory: ".coverage",
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
  testMatch: [
    "<rootDir>/**/*.test.{ts,js}?(x)",
    "<rootDir>/**/__tests__/*.{ts,js}?(x)",
  ],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
