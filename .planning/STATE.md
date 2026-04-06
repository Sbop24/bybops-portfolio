# Project State

## Project Reference

See `.planning/PROJECT.md` (updated 2026-04-06).

Core value: Clients land on the site and immediately feel the luxury, dark aesthetic and want to book a session.

Current status: Post-build stabilization in progress. Local branch is verified; live deployment and security-warning diagnosis are next.

## Current Position

- Phase: Post-build stabilization
- Status: In progress
- Last activity: 2026-04-06 - ByBops nav black-screen regression fixed and pushed

## Current Priorities

1. Restart Codex so Chrome DevTools MCP can load.
2. Inspect `https://bybops.ca` in a real browser session.
3. Identify the exact source of the site-wide security warning.
4. Verify whether production is still serving an older build and redeploy if needed.
5. Re-test the live site after deployment.
6. Start Stitch-guided homepage redesign planning.

## Key Decisions

- Tailwind v4 stays CSS `@theme` based.
- Sanity remains the source of truth for managed content.
- Route-level page transitions are disabled on purpose because the prior wrapper caused hidden-screen behavior on live navigation.
- The ByBops logo should behave like a normal link off-home and only smooth-scroll on the homepage itself.
- All meaningful code changes must be verified before completion or push.

## Known Concerns

- Live `bybops.ca` still appears to be serving an older booking-page build with an `opacity:0` wrapper.
- The site-wide "not fully secure" warning is unresolved.
- Chrome DevTools MCP was added to `C:\Users\bopar\.codex\config.toml` outside the repo, but it will not load until Codex is restarted.

## Resume File

`HANDOFF_2026-04-06.md`
