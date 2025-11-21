# Postman Tests with Database Operations

This guide covers an example on implementing database setup/cleanup around Postman tests and when Docker could become beneficial.

## Implementation Approaches

### Option A: Pre/Post Test Scripts (Simple)

Use Node.js scripts to handle database operations before and after Newman tests.

**package.json**
```json
{
  "scripts": {
    "db:setup": "node scripts/setup-test-data.js",
    "db:cleanup": "node scripts/cleanup-test-data.js",
    "test": "npm run db:setup && newman run tests/restful-booker.postman_collection.json --reporters cli,junit --reporter-junit-export test-results/junit-report.xml && npm run db:cleanup",
    "test:force-cleanup": "npm run test; npm run db:cleanup"
  }
}
```

**scripts/setup-test-data.js**
```javascript
const { Client } = require('pg'); // or mysql2, mssql, etc.

async function setupTestData() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'testdb',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await client.connect();
  
  // Insert known test data
  await client.query('DELETE FROM bookings WHERE created_by = $1', ['test-user']);
  await client.query('INSERT INTO bookings (id, name, created_by) VALUES ($1, $2, $3)', 
    [999, 'Test Booking', 'test-user']);
  
  await client.end();
  console.log('✅ Test data setup complete');
}

setupTestData().catch(console.error);
```

**scripts/cleanup-test-data.js**
```javascript
const { Client } = require('pg');

async function cleanupTestData() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'testdb',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await client.connect();
  
  await client.query('DELETE FROM bookings WHERE created_by = $1', ['test-user']);
  
  await client.end();
  console.log('✅ Test data cleanup complete');
}

cleanupTestData().catch(console.error);
```

**Pros:**
- Simple and straightforward
- Fast iteration during development
- No Docker knowledge required
- Direct control over database operations

**Cons:**
- Requires local database installation
- Inconsistent environments across team members
- Risk of affecting local development database
- Manual database version management

---

### Option B: Newman Pre-request Scripts (API-only)

Use Postman's built-in scripting capabilities if the API exposes setup/cleanup endpoints.

**In Postman Collection:**
```javascript
// Pre-request Script (Collection level)
pm.sendRequest({
    url: 'https://api.example.com/test-setup',
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: {
        mode: 'raw',
        raw: JSON.stringify({ setupData: true })
    }
}, (err, res) => {
    console.log('Setup complete');
});

// Test Script (Last request in collection)
pm.sendRequest({
    url: 'https://api.example.com/test-cleanup',
    method: 'POST'
}, (err, res) => {
    console.log('Cleanup complete');
});
```

**Pros:**
- No external scripts needed
- Everything in the Postman collection
- Works in Postman UI and Newman

**Cons:**
- Limited to what the API exposes
- Not suitable for direct database access
- Less flexible than dedicated scripts

---

### Option C: Docker Compose (Robust)

Use Docker Compose to orchestrate database and test execution in isolated containers.

**docker-compose.yml**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    ports:
      - "5432:5432"
    volumes:
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser"]
      interval: 5s
      timeout: 5s
      retries: 5

  test-runner:
    build: .
    depends_on:
      db:
        condition: service_healthy
    environment:
      DB_HOST: db
      DB_NAME: testdb
      DB_USER: testuser
      DB_PASSWORD: testpass
    volumes:
      - ./tests:/app/tests
      - ./test-results:/app/test-results
      - ./scripts:/app/scripts
    command: >
      sh -c "
        node /app/scripts/setup-test-data.js &&
        newman run /app/tests/restful-booker.postman_collection.json --reporters cli,junit --reporter-junit-export /app/test-results/junit-report.xml &&
        node /app/scripts/cleanup-test-data.js
      "
```

**Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["npm", "test"]
```

**scripts/init-db.sql**
```sql
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_created_by ON bookings(created_by);
```

**package.json (Docker scripts)**
```json
{
  "scripts": {
    "docker:up": "docker-compose up --abort-on-container-exit",
    "docker:down": "docker-compose down -v",
    "docker:build": "docker-compose build",
    "test:docker": "npm run docker:build && npm run docker:up"
  }
}
```

**Pros:**
- Complete isolated test environment
- Database + tests in one command
- Guaranteed clean state per run
- No local database installation needed
- Team consistency (everyone uses same DB version)
- Easy CI/CD integration
- Teardown destroys everything automatically

**Cons:**
- Requires Docker and Docker Compose knowledge
- More configuration files to maintain
- Slower startup time (container initialization)
- Additional complexity for simple scenarios
- Need to rebuild images when dependencies change

---

## When to Use Docker vs Simple Scripts

### Use Simple Scripts (Option A) When:
- ✅ Working solo or small team with standardized setups
- ✅ Already have a local/test database configured
- ✅ Need fast iteration during development
- ✅ Database operations are straightforward
- ✅ Team is comfortable with database management
- ✅ Quick prototyping or learning

### Upgrade to Docker (Option C) When:
- ✅ Multiple team members need consistent environments
- ✅ Testing against specific database versions is critical
- ✅ Want truly isolated test runs
- ✅ Moving to CI/CD and need reproducibility
- ✅ Team has Docker knowledge or wants to learn
- ✅ Risk of test data contaminating development databases
- ✅ Need to test with different database configurations

### Use API Scripts (Option B) When:
- ✅ API provides setup/cleanup endpoints
- ✅ Want self-contained Postman collections
- ✅ No direct database access needed
- ✅ Simple data preparation requirements

---

## Recommended Hybrid Approach

Combine the best of both worlds:

```json
{
  "scripts": {
    "test": "npm run db:setup && newman run tests/collection.json --reporters cli,junit && npm run db:cleanup",
    "test:docker": "docker-compose up --abort-on-container-exit",
    "docker:down": "docker-compose down -v"
  }
}
```

**Use Case:**
- **Local development**: `npm test` (fast, simple)
- **CI/CD**: `npm run test:docker` (isolated, reproducible)
- **Team onboarding**: `npm run test:docker` (no local DB setup needed)

---

## Migration Path

**Phase 1: Start Simple**
1. Create setup/cleanup scripts
2. Run tests with npm scripts
3. Document database prerequisites

**Phase 2: Containerize Gradually**
1. Add Dockerfile for test runner only
2. Keep using local database
3. Team builds Docker literacy

**Phase 3: Full Docker Integration**
1. Add docker-compose.yml with database
2. Migrate CI/CD to Docker
3. Optional: Keep simple scripts for local dev

---

## Key Takeaway

**Without database operations**: Docker adds unnecessary complexity for Postman tests.

**With database operations**: Docker becomes significantly more justified, offering true isolation and consistency. However, start with the simplest approach that solves your immediate problem, then evolve to Docker when the benefits clearly outweigh the complexity.
