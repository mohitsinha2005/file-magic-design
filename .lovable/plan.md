# Smoothness and reliability pass

## Goal
Make the landing page and all portfolio pages load, scroll, and change pages smoothly without removing the professional motion design.

## Changes
- Correct the landing page’s repeated 3D scene warnings and reduce unnecessary graphics work while preserving its visual style.
- Pause decorative canvas animations when they are off-screen or the browser tab is hidden.
- Prevent global motion systems from competing over the same elements and keep reduced-motion support intact.
- Check navigation, page refreshes, the intro, resume link, project links, and Jarvis launcher for visible or browser errors.
- Test the landing page and every main page at desktop and mobile sizes, then fix any regressions found.

## Technical details
- Replace incompatible helper-component refs in the Three.js scene with native mesh elements or correctly forwarded refs.
- Use visibility/intersection signals to avoid continuous animation work when it cannot be seen.
- Validate with the live preview, browser console, route checks, and the automated build signal.
