# Always Open at the Top

## Goal
Ensure every fresh visit, refresh, and page change starts at the top instead of restoring the visitor's previous scroll position.

## Changes
- Disable browser scroll restoration before the app first renders.
- Reset the page position immediately on first load and when a cached page is restored.
- Strengthen page-change resets so each navigation opens at the top without a visible jump.
- Keep the existing short intro and smooth scrolling behavior unchanged.

## Verification
- Scroll down, refresh, and confirm the home page returns to the first section.
- Navigate between all main pages and confirm each begins at the top.
- Test desktop and mobile viewport sizes and check for errors.
