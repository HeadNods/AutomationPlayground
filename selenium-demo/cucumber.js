const feature = [
  "--require-module ts-node/register",
  "--require e2e-tests/steps/**/*.ts",
  "--require e2e-tests/support/**/*.ts",
  "e2e-tests/features/**/*.feature",
  `--format usage:./reports/report.txt`,
  `--format json:./reports/report.json`,
  `--format html:./reports/report.html`,
  '--tags "not @disabled"',
].join(" ");

module.exports = {
  default: feature,
};
