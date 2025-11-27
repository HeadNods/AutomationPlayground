# Selenium Demo Personal

A Selenium-based automated testing framework using Cucumber BDD for end-to-end browser testing. This project demonstrates test automation with TypeScript, Cucumber, and Selenium WebDriver.

## Features

- **BDD Framework**: Uses Cucumber for behavior-driven development
- **TypeScript**: Fully typed test automation code
- **Selenium WebDriver**: Browser automation with Chrome and Firefox support
- **Docker Support**: Containerized test environment with Selenium Grid
- **Screenshot on Failure**: Automatically captures screenshots when tests fail
- **Test Reports**: Generates detailed HTML and JSON test reports

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose (for containerized testing)
- npm or yarn

## Installation

Install project dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Configure the browser you want to use:

```dotenv
SELENIUM_GRID=http://localhost:4444/wd/hub
BROWSER=chrome  # Options: chrome, firefox, edge, chrome-for-testing
```

## Running Tests

### Start Selenium Grid (Docker)

Start all browser services:

```bash
npm run docker:up
```

Or start only the browser you need:

```bash
npm run docker:up:chrome           # Only Chrome
npm run docker:up:firefox          # Only Firefox
npm run docker:up:edge             # Only Edge
npm run docker:up:chrome-for-testing  # Chrome for Testing
```

Stop and remove containers:

```bash
npm run docker:down
```

### Running Tests

Run tests with the browser configured in `.env`:

```bash
npm test
```

Or run tests with a specific browser:

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
npm run test:chrome-for-testing
```

### Running Tests by Cucumber Tags

You can run specific tests based on cucumber tags defined in your feature files. Use the `--tags` flag with the npm cucumber script.
Do not forget to launch selenium grid in docker first!

Run tests with a specific tag:

```bash
npm run cucumber -- --tags "@clicks"
```

Run tests with multiple tags (AND logic):

```bash
npm run cucumber -- --tags "@checkboxes and @clicks"
```

Run tests with any of the specified tags (OR logic):

```bash
npm run cucumber -- --tags "@clicks or @assertions"
```

Exclude tests with a specific tag:

```bash
npm run cucumber -- --tags "not @disabled"
```

Combine multiple tag expressions:

```bash
npm run cucumber -- --tags "(@clicks or @assertions) and not @disabled"
```

**Common tags in this project:**
- `@POM` - Page Object Model tests
- `@brokenImagesPage`, `@addRemoveElementsPage`, ... - Page-specific tests
- `@disabled` - Tests that are currently disabled (excluded by default)

## Project Structure

```
DemoProject/
  e2e-tests/
    features/        # Cucumber feature files
    functions/       # Reusable test functions
    pages/           # Page object models
    steps/           # Step definitions
    support/         # Hooks and driver configuration
reports/             # Test execution reports
```

## Test Reports

After test execution, reports are generated in the `reports/` directory:
- `report.html` - HTML formatted test report
- `report.json` - JSON formatted test results
- `report.txt` - Plain text test output

## License

ISC
