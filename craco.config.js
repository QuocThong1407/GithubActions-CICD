module.exports = {
  jest: {
    configure: (jestConfig) => {
      jestConfig.reporters = [
        'default',
        ['jest-allure', {
          resultsDir: 'allure-results'
        }]
      ];
      jestConfig.testRunner = 'jest-jasmine2';
      jestConfig.setupFilesAfterEnv = [
        '<rootDir>/src/setupTests.js',
        'jest-allure/dist/setup'
      ];

      return jestConfig;
    }
  }
};