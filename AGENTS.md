# Project decisions

- Keep the home portrait as a CDN asset and resolve its URL against the published origin because the preview's local asset fallback can return HTML instead of the image.
- Bind DOM-based tilt and reveal motion after delayed home and lazy page content mounts because route-mount scans alone miss those elements.
- Keep conversation scrolling inside its own scroll container and avoid automatic input focus on entry because mobile browsers otherwise jump down the page or open the keyboard.