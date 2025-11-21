# Cypress Demo

End-to-end testing with Cypress using the Page Object Model pattern. This project demonstrates comprehensive E2E testing capabilities with both local and Docker-based execution options.

## Prerequisites

- **Node.js** 20.x or higher
- **npm** (comes with Node.js)
- **Docker** (optional, for containerized testing)

## Quick Start

### Local Installation

```bash
# Navigate to the cypress-demo directory
cd cypress-demo

# Install dependencies
npm install

# Run tests (headless mode with Electron)
npm test

# Open Cypress Test Runner (interactive mode)
npm run open
```

## Running Tests

### Local Execution (Without Docker)

#### Default Tests (Electron, Headless)
```bash
npm test
```

#### Browser-Specific Tests
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

#### Headed Mode
```bash
npm run test:headed
```

#### Interactive Mode
```bash
npm run open
```

### Docker Execution

Docker execution uses the official `cypress/included:latest` image with Cypress pre-installed. Tests are run using Docker Compose for better configuration management and CI/CD compatibility.

#### Default Tests (Electron)
```bash
npm run docker:compose:up
```

#### Browser-Specific Tests
```bash
# Chrome
npm run docker:compose:chrome

# Firefox
npm run docker:compose:firefox

# Edge
npm run docker:compose:edge
```

#### Stop and Clean Up Containers
```bash
npm run docker:compose:down
```

#### Interactive Shell (Debugging)

For debugging or exploring the container environment:

```bash
npm run docker:interactive
```

This opens an interactive bash shell in the Cypress container where you can manually run commands.

## GitHub Actions CI/CD

This project includes automated testing via GitHub Actions that runs on every push and pull request.

### Workflow Configuration

The workflow is defined in `.github/workflows/cypress-workflow.yml` and provides:

#### Automatic Triggers

**Push Events:**
- Runs on pushes to `main` or `master` branches
- Only triggers when changes are made to:
  - `cypress-demo/**` (any files in this directory)
  - `.github/workflows/cypress-workflow.yml` (the workflow file itself)

**Pull Request Events:**
- Runs on PRs targeting `main` or `master` branches
- Only triggers when changes affect `cypress-demo/**`

#### Manual Execution

You can manually trigger the workflow via the GitHub Actions UI with custom options:

1. Go to **Actions** tab in your repository
2. Select **Cypress E2E Tests** workflow
3. Click **Run workflow**
4. Choose options:
   - **Use Docker**: Run tests in Docker container (default: `false`)
   - **Browser**: Select browser (default: `electron`)
     - `chrome`
     - `firefox`
     - `edge`

### Workflow Behavior

#### Non-Docker Execution (Default)
1. Sets up Node.js 20.x
2. Installs dependencies from `cypress-demo/package.json`
3. Runs tests based on browser selection:
   - If browser is `chrome`, `firefox`, or `edge`: runs `npm run test:<browser>`
   - Otherwise (electron or undefined): runs `npm test`

#### Docker Execution
1. Skips Node.js setup
2. Uses `cypress/included:latest` Docker image via Docker Compose
3. Runs tests based on browser selection:
   - If browser is `chrome`, `firefox`, or `edge`: runs `npm run docker:compose:<browser>`
   - Otherwise: runs `npm run docker:compose:up`
4. Automatically cleans up containers after test completion

### Artifacts

The workflow automatically uploads test artifacts:

**Screenshots** (on failure only):
- Path: `cypress-demo/cypress/screenshots`
- Retention: 3 days
- Available under workflow run artifacts as `cypress-screenshots`

**Videos** (always):
- Path: `cypress-demo/cypress/videos`
- Retention: 3 days
- Available under workflow run artifacts as `cypress-videos`

**Test Reports** (always):
- Path: `cypress-demo/cypress/reports/*.html`
- Retention: 5 days
- Available under workflow run artifacts as `cypress-test-results`

### Customizing the Workflow

To modify when tests run, edit `.github/workflows/cypress-workflow.yml`:

```yaml
on:
  push:
    branches: [ main, master ]  # Add/remove branches
    paths:
      - 'cypress-demo/**'        # Change path filters
```

To change Node.js version:

```yaml
- name: Setup Node.js (non-Docker)
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here
```

## Project Structure

```
cypress-demo/
├── cypress/
│   ├── e2e-tests/          # Test specifications
│   ├── fixtures/           # Test data
│   ├── page-object-model/  # Page objects
│   ├── reports/            # Test reports
│   ├── screenshots/        # Failed test screenshots
│   └── support/            # Support files and custom commands
├── cypress.config.js       # Cypress configuration
├── docker-compose.yml      # Docker Compose setup
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

For detailed information about the Page Object Model implementation and test structure, see [`cypress/README.md`](cypress/README.md).

## Configuration

### Cypress Configuration

The main configuration is in `cypress.config.js`. Key settings include:

- Base URL configuration
- Video/screenshot settings
- Reporter configuration (Mochawesome)
- Viewport dimensions
- Test file patterns

### Docker Configuration

Docker settings are defined in `docker-compose.yml`, which configures:
- Service definitions for different browsers (Electron, Chrome, Firefox, Edge)
- Volume mounting: Current directory (`.`) is mounted to `/app` in the container
- Working directory and entrypoint configuration

This approach provides easy maintainability and avoids TTY issues in CI/CD environments.

## Test Reports

Tests generate HTML reports using `cypress-mochawesome-reporter`:

- Location: `cypress/reports/cypress-test-report.html`
- Generated after each test run
- Includes test results, screenshots, and videos
- Uploaded as artifacts in GitHub Actions (retained for 5 days)

## Troubleshooting

### Docker Issues

**Permission errors on Linux/Mac:**
```bash
# Ensure proper permissions
chmod -R 777 cypress/screenshots cypress/videos cypress/reports
```

**Display issues with headed mode:**
```bash
# Set up X11 forwarding (Linux/Mac)
xhost +local:docker
```

### Cypress Installation

**Binary not found:**
```bash
# Reinstall Cypress
npm cypress install --force
```

**Version mismatch:**
```bash
# Clear cache and reinstall
npm cypress cache clear
npm install
```

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Model Guide](cypress/README.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Cypress Images](https://github.com/cypress-io/cypress-docker-images)

## Contributing

When adding new tests:

1. Follow the Page Object Model pattern (see `cypress/README.md`)
2. Add appropriate test data to `fixtures/`
3. Ensure tests pass both locally and in Docker
4. Verify GitHub Actions workflow succeeds

## License

This is a demo project for learning and testing purposes.
