module.exports = {
  jest: {
    configure: {
      reporters: [
        'default',
        'jest-allure'
      ],
      testRunner: 'jest-jasmine2',
      setupFilesAfterEnv: ['<rootDir>/src/allure-setup.js']
    }
  }
};