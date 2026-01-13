# DOM serialization regression repro (Percy + Playwright)

Minimal Stencil project to reproduce DOM serialization failures that start in Stencil 4.36.0 (works in 4.35.2). Percy crashes and Playwright action traces can miss nodes; screenshots still render.

## What it does
- `my-select` (Light DOM) with slotted `<option>` nodes moved into the native select.
- `my-input`, `my-radio`, `my-checkbox` (Light DOM) each allow a suffix slot. Plain fields improve in 4.40.0, but with slot content the crash persists through 4.39.x.
- In 4.36.x the Percy marker (`data-percy-element-id`) is lost after light-DOM replacement, causing `serializeInputElements` to hit `cloneEl === null`.

## How to run
```bash
cd dom-serialize-issue
npm install
npm run build
npm run serve   # http://localhost:3333
```

### Percy snapshot
```bash
npm run percy   # Requires PERCY_TOKEN
```
Expected: crash on Stencil 4.36.0, stable on 4.35.2.
- `/my-select.html`
- `/my-input.html`
- `/my-radio.html`
- `/my-checkbox.html`

Percy error samples:
```
TypeError: Cannot read properties of null (reading 'removeAttribute' | 'options' | 'setAttribute')
    at serializeInputElements (.../node_modules/@percy/dom/dist/bundle.js:111|118|130)
```

### Playwright
```bash
npm run playwright:test
npm run playwright:report
```
UI renders; in action traces the components can be missing after serialization (no exception). Add your trace/screenshot links here.

## Compare Stencil versions
- Default: `@stencil/core@4.36.0` (serialization crash with slots).
- Good: `@stencil/core@4.35.2` (`npm run use:stencil:4352` + reinstall).
- 4.40.0: plain inputs/radios/checkboxes improved; slot content still breaks serialization.
