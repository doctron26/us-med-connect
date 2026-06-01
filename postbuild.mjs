/**
 * postbuild.mjs
 *
 * After `vite build` (Nitro vercel preset), this script:
 * 1. Reads the TanStack Start manifest from the server function to find the real clientEntry JS file
 * 2. Finds the built CSS file in static assets
 * 3. Generates a proper index.html referencing those built assets
 * 4. Patches .vercel/output/config.json so ALL non-asset routes serve index.html
 *    (pure static SPA — no broken server function involved)
 */

import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join } from "path";

const STATIC_DIR = ".vercel/output/static";
const SERVER_FUNC_DIR = ".vercel/output/functions/__server.func";
const CONFIG_PATH = ".vercel/output/config.json";
const ASSETS_DIR = join(STATIC_DIR, "assets");

async function findClientEntry() {
  // Strategy 1: Read TanStack Start manifest from server function directory
  try {
    const serverFiles = await readdir(SERVER_FUNC_DIR);
    const manifestFile = serverFiles.find((f) => f.includes("tanstack-start-manifest"));
    if (manifestFile) {
      const manifestContent = await readFile(join(SERVER_FUNC_DIR, manifestFile), "utf-8");
      const clientEntryMatch = manifestContent.match(/clientEntry:\s*["']([^"']+)["']/);
      if (clientEntryMatch) {
        console.log("  Found clientEntry via server manifest:", clientEntryMatch[1]);
        return clientEntryMatch[1]; // e.g. "/assets/index-BrFuFygW.js"
      }
    }
  } catch (e) {
    console.warn("  Could not read server func manifest:", e.message);
  }

  // Strategy 2: Fallback — the largest index-*.js in static assets is the main bundle
  const files = await readdir(ASSETS_DIR);
  const indexJsFiles = files.filter((f) => f.startsWith("index-") && f.endsWith(".js"));
  if (indexJsFiles.length === 0) throw new Error("No index-*.js files found in " + ASSETS_DIR);

  let mainJs = indexJsFiles[0];
  let maxSize = 0;
  for (const f of indexJsFiles) {
    const info = await stat(join(ASSETS_DIR, f));
    if (info.size > maxSize) {
      maxSize = info.size;
      mainJs = f;
    }
  }
  console.log("  Inferred clientEntry (largest index-*.js):", mainJs, `(${(maxSize / 1024).toFixed(1)} kB)`);
  return `/assets/${mainJs}`;
}

async function main() {
  const assetsFiles = await readdir(ASSETS_DIR);

  // ── 1. Find the main JS entry ───────────────────────────────────────────────
  const clientEntry = await findClientEntry();

  // ── 2. Find the CSS bundle ──────────────────────────────────────────────────
  const cssFile = assetsFiles.find((f) => f.endsWith(".css"));
  const cssHref = cssFile ? `/assets/${cssFile}` : null;
  console.log("  cssFile    :", cssHref ?? "(none — CSS may be inlined)");

  // ── 3. Generate index.html ──────────────────────────────────────────────────
  // TanStack Start's client entry expects window.$_TSR to exist for the
  // hydration handshake. This script is normally injected by the SSR server.
  // Since we serve static HTML, we embed it and immediately mark stream as ended.
  const tsrBootstrap = `self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R?.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[],router:{matches:[]}};self.$_TSR.e();`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>US Med Connect</title>
    <meta name="description" content="US Med Connect - Your trusted platform for US medical travel connections" />
    ${cssHref ? `<link rel="stylesheet" crossorigin href="${cssHref}">` : ""}
    <link rel="modulepreload" crossorigin href="${clientEntry}">
  </head>
  <body>
    <div id="root"></div>
    <script>${tsrBootstrap}</script>
    <script type="module" crossorigin src="${clientEntry}"></script>
  </body>
</html>
`;

  const indexPath = join(STATIC_DIR, "index.html");
  await writeFile(indexPath, html, "utf-8");
  console.log("  ✓ Wrote", indexPath);

  // ── 4. Patch config.json — replace server function with static index.html ──
  const configRaw = await readFile(CONFIG_PATH, "utf-8");
  const config = JSON.parse(configRaw);

  config.routes = [
    // Long-lived cache headers for hashed assets
    {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      src: "/assets/(.*)",
    },
    // Serve static files (assets, robots.txt, index.html, etc.)
    { handle: "filesystem" },
    // SPA fallback — every other path serves index.html (client-side routing)
    { src: "/(.*)", dest: "/index.html" },
  ];

  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
  console.log("  ✓ Patched", CONFIG_PATH);
}

main()
  .then(() => console.log("\n✅ postbuild complete — static SPA ready for Vercel"))
  .catch((err) => {
    console.error("\n❌ postbuild failed:", err.message);
    process.exit(1);
  });
