# Common Sky

An original cooperative climate game for 1 to 4 players. Each player leads a world bloc. Build stacks of projects to cut emissions, meet energy demand and protect communities, and reach drawdown before round 6 ends. Win or lose together.

**Play it:** https://l3yl3y.github.io/Common-Sky/

## Modes

- **Practice**: lead one bloc with bot teammates (or play solo). The coach can suggest your next move.
- **Pass And Play**: share one screen; each delegate plays their bloc in turn during the Local stage.
- **Play Online**: one player creates a room and shares the 5-letter code; the others join with it. Bot teammates can fill empty blocs.
- Three difficulty levels change how much forest and ocean the world starts with.

## Build And Test

- `tools/make.sh` rebuilds `dist/artifact.html`, `dist/index.html` and `docs/index.html` from `src/sky.src.html` and `src/engine.js`.
- `node tools/balance.js 50` plays 50 bot-only games at each player count, checks every card is accounted for after each move, and reports win rates.
- `tools/stest.js` drives headless Chrome through practice, solo, pass and play, and both online modes (run `npm install` in `tools` and serve `dist` on port 8793 first).
