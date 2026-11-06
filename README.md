# CastleHS — Browser Prototype 0.1

An unofficial independent CastleHS prototype for GitHub Pages. It includes **a title screen, a world map, one short level, and an endless survival level**. All gameplay, graphics, physics, and basic pose animations in this build are original code and geometric placeholders. **No Castle Crashers game files or artwork are included or required.**

## Start playing

Upload the **contents** of this `CastleHS/` directory to the root of a GitHub repository, then enable GitHub Pages under **Settings → Pages → Deploy from a branch → main → /(root)**. Visit the Pages URL once deployed.

For a local test, use any static HTTP server (JavaScript modules do not reliably work when opening `index.html` via `file://`):

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Controls

- **Move:** WASD, arrow keys, or left gamepad stick.
- **Jump:** Space, gamepad B, or touch JUMP.
- **Equip:** 1 = fists, 2 = sword, 3 = healing potion; or select an equipment slot.
- **Use equipped item:** J, K, Enter, left mouse click on arena, gamepad A, or touch USE.
- **Healing potion:** Heals 40 HP when injured; 3 at start. In endless mode, earn one back each eight defeated enemies (maximum five).
- **Exit stage:** WORLD MAP button at the top right.

The simple level finishes when all five enemies have been defeated **and** you reach the flag. The endless level tracks distance reached, enemies defeated, and survival time; more enemies appear as you travel or spend time surviving.

## Project layout

- Root: `index.html`, `main.js`, `style.css`.
- `Scripts/Movement`: movement, jumping, gravity.
- `Scripts/Combat`: attacks, enemy damage, attack ranges, knockback, healing.
- `Scripts/Animation`: procedural character poses.
- `Scripts/Entities`: player and enemies; bosses reserved for future.
- `Scripts/Systems`: input, camera, rendering, physics utilities, placeholder asset loader.
- `Scripts/UI`: screen navigation, future settings.
- `Assets`: user-approved organization preserved, with empty placeholder directories.
- `Data`: example editable JSON reference data; currently the core values are defined in JS modules so these JSON files are reference documentation, not a live config interface.
- `WASM`: reserved for a later optional Rust/C++ WebAssembly build. **This prototype is JavaScript only** so it runs with no compilation step.

## Known limitations

This is a small first playable demo: one character shape, one basic enemy shape, no real sprite animation files, no saved progress, no online multiplayer, and no level editor. Browser gamepad support depends on the device/browser. The scene uses a fixed 960×540 internal resolution scaled to fit the display.
