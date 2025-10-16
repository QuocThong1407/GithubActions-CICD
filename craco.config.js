module.exports = {
  jest: {
    configure: {
      reporters: [
        'default',
        'jest-allure'
      ],
      testRunner: 'jest-jasmine2'
    }
  }
};