# Publishing Arc Raiders Data Package

Your TypeScript types and data are now ready to publish. Here's how:

## Setup

1. **Update `package.json` metadata:**

   - Fill in `author`, add a `repository` URL
   - Adjust `version` per [semver](https://semver.org/)

2. **Create `.npmrc`** (if publishing to npm):

   ```
   @arcraiders:registry=https://registry.npmjs.org/
   ```

3. **Generate and build:**
   ```bash
   pnpm install
   pnpm run generate:types
   pnpm run build
   ```
   This outputs compiled JS + type declarations to `dist/`.

## Publishing

**To npm:**

```bash
npm login
npm publish
```

**To GitHub Packages:**
Update `.npmrc`:

```
@arcraiders:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then run `npm publish`.

## For Consumers

Once published, other projects install and use it:

```bash
npm install @arcraiders/data
# or
pnpm add @arcraiders/data
```

**TypeScript usage:**

```typescript
import { Item, adrenalineShot, advancedArcPowercell } from "@arcraiders/data";
import type { Item } from "@arcraiders/data/types";

const items: Item[] = [adrenalineShot, advancedArcPowercell];
```

## Local Development (Monorepo)

If using a monorepo, add a `pnpm-workspace.yaml`:

```yaml
packages:
  - "arcraiders-data"
  - "other-projects/*"
```

Then in dependent projects:

```json
{
  "dependencies": {
    "@arcraiders/data": "workspace:*"
  }
}
```

## Structure

- **`dist/`** – Compiled JS + type declarations (gitignore)
- **`types/`** – TypeScript source
  - `types/common.ts` – Shared interfaces
  - `types/generated/` – Auto-generated item modules
  - `types/index.ts` – Barrel export
- **`index.ts`** – Main entry point
- **`package.json`** – With `exports`, `main`, `types` fields

## Maintenance

When adding new items to `items/`, regenerate types:

```bash
pnpm run generate:types
```

Then commit and bump version.
