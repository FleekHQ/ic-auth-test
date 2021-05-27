module.exports = {
  preset: 'ts-jest',
  roots: ['src'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  testEnvironment: 'node',
};
