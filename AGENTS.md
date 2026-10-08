# Project decisions

- Bundle the home hero portrait as a small optimized same-origin image because the 2MB cross-origin CDN copy failed to show on Android phones.
- Bind DOM-based tilt and reveal motion after delayed home and lazy page content mounts because route-mount scans alone miss those elements.
- Keep conversation scrolling inside its own scroll container and avoid automatic input focus on entry because mobile browsers otherwise jump down the page or open the keyboard.
- Place the home portrait before the introduction on phones and keep the code panel last so the photo is visible without scrolling through all the text.