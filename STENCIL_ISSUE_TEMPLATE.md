# Bug: DOM serialization breaks with slots (Visual testing tools) starting in Stencil 4.36.0

## Summary
Visual testing tools fail to serialize light-DOM form elements after hydration when slots are present. Percy throws null errors; Playwright action traces can miss nodes (screenshots still render). Starts in **4.36.0**, works in **4.35.2**. Plain inputs/radios/checkboxes improve in 4.40.0, but with slot content the crash remains.

## Errors (Percy)
```
[percy] TypeError: Cannot read properties of null (reading 'removeAttribute' | 'options' | 'setAttribute')
    at serializeInputElements (.../node_modules/@percy/dom/dist/bundle.js:111|118|130)
    at serializeElements (.../node_modules/@percy/dom/dist/bundle.js:895:7)
    at Object.serializeDOM (.../node_modules/@percy/dom/dist/bundle.js:973:7)
```

## Repro repo
- `dom-serialize-issue/` (attached)
- Components: `my-select` (slotted options moved into native select), `my-input`, `my-radio`, `my-checkbox` (suffix slot support)
- Percy: `@percy/cli@1.31.7`
- Playwright: `@playwright/test`

## Steps to reproduce
1. Install with Stencil 4.36.0:
   ```bash
   npm install
   npm run build
   npm run serve   # http://localhost:3333
   npm run percy   # it uses a fake token -> no push to percy, just the errors in console
   ```
2. Percy crashes with the errors above on `/my-select.html`, `/my-input.html`, `/my-radio.html`, `/my-checkbox.html`.
3. Switch to 4.35.2 (`npm run use:stencil:4352` + reinstall), rebuild: no crash.
4. 4.40.0: plain inputs/radios/checkboxes are stable, but with slots the crash persists.
5. Playwright: `npm run playwright:test` / `npm run playwright:report` (UI renders; action traces can show missing nodes).

## Expected
DOM serialization should tolerate light-DOM replacements (including with slots) without null errors.

## Actual
Marked elements are replaced after hydration (slot move), Percy/Playwright serialization sees `cloneEl === null` and fails.

## Files of interest
- `src/components/my-select/my-select.tsx`
- `src/components/my-input/my-input.tsx`
- `src/components/my-radio/my-radio.tsx`
- `src/components/my-checkbox/my-checkbox.tsx`
- Percy crash site: `node_modules/@percy/dom/dist/bundle.js` (`serializeInputElements`)

## Notes
- Slot content is the trigger: without slots, plain controls are stable in 4.40.0; with slots they still fail in 4.36.x–4.39.x.
- Add your Percy/Playwright screenshots or traces here.
