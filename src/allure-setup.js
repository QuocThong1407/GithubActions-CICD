import 'jest-allure/dist/setup';

const AllureReporter = require('jest-allure/dist/Reporter');

const reporter = new AllureReporter({
    resultsDir: 'allure-results'
});

global.reporter = reporter;