# Postman API Tests Demo

This project demonstrates how to run Postman API tests using Newman (Postman CLI) in a CI/CD pipeline with JUnit reporting.

## Overview

- **API Under Test**: [Restful Booker](https://restful-booker.herokuapp.com/) - A REST API for booking management
- **Test Collection**: `tests/restful-booker.postman_collection.json`
- **Test Runner**: Newman (Postman CLI)
- **CI Platform**: GitHub Actions
- **Reporting**: JUnit XML format with artifact upload

## Prerequisites

- Node.js 18+ and npm
- Git

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests locally:
   ```bash
   npm test
   ```

3. Run tests with verbose output:
   ```bash
   npm run test:verbose
   ```

## Test Collection

The collection includes tests for:
- ✅ Health Check (ping endpoint)
- ✅ Get All Bookings
- ✅ Create Booking
- ✅ Get Booking by ID
- ✅ Create Auth Token
- ✅ Update Booking
- ✅ Delete Booking

Each request includes multiple assertions testing:
- HTTP status codes
- Response structure
- Data validation
- Response times

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/main.yml`) automatically:

1. **Runs on**:
   - Push to `main` or `master` branch
   - Pull requests to `main` or `master`
   - Manual workflow dispatch

2. **Test Execution**:
   - Installs Newman and dependencies
   - Runs the Postman collection
   - Generates JUnit XML report

3. **Reporting**:
   - Uploads JUnit XML as an artifact (30-day retention)
   - Publishes test results as a check in the PR/commit

## Test Results

After pipeline execution:
- **JUnit Report**: Available in the workflow artifacts as `junit-test-results`
- **Test Summary**: Visible in the GitHub Actions run summary
- **PR Checks**: Test results appear as a check on pull requests

## Newman CLI Options

The test script uses:
- `--reporters cli,junit`: Output to console and JUnit format
- `--reporter-junit-export`: Specify JUnit report location

Additional useful options:
- `--iteration-count N`: Run collection N times
- `--delay-request N`: Add N ms delay between requests
- `--timeout-request N`: Set request timeout
- `--bail`: Stop on first test failure
- `--environment env.json`: Use environment variables

## Project Structure

```
postman-demo/
├── .github/
│   └── workflows/
│       └── main.yml           # GitHub Actions workflow
├── tests/
│   └── restful-booker.postman_collection.json  # Postman collection
├── test-results/              # Generated test reports (gitignored)
│   └── junit-report.xml
├── package.json               # Newman dependencies & scripts
└── README.md                  # This file
```

## Customization

### Add Environment Variables
Create a Postman environment file and add to the npm script:
```json
"test": "newman run tests/restful-booker.postman_collection.json -e tests/environment.json --reporters cli,junit --reporter-junit-export test-results/junit-report.xml"
```

### Multiple Collections
Add more collections and create separate npm scripts:
```json
"test:auth": "newman run tests/auth.postman_collection.json --reporters cli,junit --reporter-junit-export test-results/auth-junit.xml",
"test:all": "npm run test && npm run test:auth"
```

### Different Reporters
Newman supports multiple reporters:
- `htmlextra`: Detailed HTML reports
- `json`: JSON output
- `cli`: Console output
- `junit`: JUnit XML

Install additional reporters:
```bash
npm install -D newman-reporter-htmlextra
```

## Troubleshooting

**Tests fail in CI but pass locally**:
- Check environment variables
- Verify network access to the API
- Review API rate limits

**JUnit report not generated**:
- Ensure `test-results` directory is created (Newman creates it automatically)
- Check npm script has correct output path

**Newman not found**:
- Run `npm install` to install dependencies
- Verify `newman` is in `devDependencies`

## Resources

- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)
- [Restful Booker API Docs](https://restful-booker.herokuapp.com/apidoc/index.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## License
This is a demo project for learning and testing purposes.