# Delivery plan

Status: generated read-only planning snapshot. This is a capacity forecast, not
a promise that unresolved or externally blocked work will complete by a date.

Repository: [`kofun-lang/kofun`](https://github.com/kofun-lang/kofun)

As of: `2026-08-11`

## Capacity and scope

- Maximum four agents: three writer lanes plus one review/integration lane.
- Work in progress is capped at three implementation issues.
- Planning umbrellas are counted but never scheduled as implementation work.
- `13` curated issues are scheduled and
  `16` are deferred or externally blocked.

| Metric | Count |
|---|---:|
| All issues | 821 |
| Open issues | 33 |
| Open curated | 29 |
| Open planning umbrellas | 4 |
| Scheduled curated | 13 |
| Unscheduled curated | 16 |

## Forecast

| Scenario | Finish | Interpretation |
|---|---|---|
| 4-agent capacity plan | 2026-09-22 | Deterministic lane simulation with one serial reviewer. |
| Conservative +25% buffer | 2026-10-02 | Allows for refinement, rework, and integration variance. |
| Observed completion pace, intake frozen | 2026-08-12 | Optimistic extrapolation; it freezes intake and may include retrospective tracker closure. |
| Observed net issue burn | 2026-08-19 | Projection from completed curated issues minus new curated issues; not a capacity commitment. |

Confidence is **low** until missing sizes, refinement
states, external blockers, and future intake are resolved. Over the trailing
`14` days, curated intake was
`70`/week and completion was
`81`/week; issues closed as
`not_planned` are excluded from completion throughput.

## Critical dependency chains

### Self-host fixed point and independent reproduction

Lane: `writer-a`

| Issue | Tracker state | Priority | Start | Delivered |
|---|---|---|---|---|
| [#618](https://github.com/kofun-lang/kofun/issues/618) | closed | P0 | — | — |
| [#622](https://github.com/kofun-lang/kofun/issues/622) | closed | P0 | — | — |
| [#271](https://github.com/kofun-lang/kofun/issues/271) | closed | P0 | — | — |
| [#272](https://github.com/kofun-lang/kofun/issues/272) | closed | P0 | — | — |
| [#274](https://github.com/kofun-lang/kofun/issues/274) | needs-detail | P1 | 2026-08-11 | 2026-08-19 |

### Compiler-native Decimal delivery

Lane: `writer-b`

| Issue | Tracker state | Priority | Start | Delivered |
|---|---|---|---|---|
| [#721](https://github.com/kofun-lang/kofun/issues/721) | closed | P1 | — | — |
| [#722](https://github.com/kofun-lang/kofun/issues/722) | closed | P1 | — | — |
| [#723](https://github.com/kofun-lang/kofun/issues/723) | closed | P1 | — | — |
| [#724](https://github.com/kofun-lang/kofun/issues/724) | closed | P1 | — | — |
| [#725](https://github.com/kofun-lang/kofun/issues/725) | needs-detail | P2 | 2026-08-11 | 2026-08-26 |
| [#726](https://github.com/kofun-lang/kofun/issues/726) | closed | P2 | — | — |

## Scheduled curated work

Writer end is implementation complete; delivered is after the single reviewer
lane finishes integration.

| Issue | Lane | State | Priority | Size | Start | Writer end | Delivered | Confidence | Title |
|---|---|---|---|---|---|---|---|---|---|
| [#274](https://github.com/kofun-lang/kofun/issues/274) | `writer-a` | needs-detail | P1 | M | 2026-08-11 | 2026-08-18 | 2026-08-19 | low | Reproducible bootstrap B6: independent clean builder reproduces the fixed point |
| [#725](https://github.com/kofun-lang/kofun/issues/725) | `writer-b` | needs-detail | P2 | L | 2026-08-11 | 2026-08-24 | 2026-08-26 | low | Decimal slice 6: state scale guarantees truthfully now, and add Fixed[scale] when const generics exist |
| [#1190](https://github.com/kofun-lang/kofun/issues/1190) | `writer-c` | ready | P1 | M | 2026-08-11 | 2026-08-14 | 2026-08-17 | medium | Call arguments v1 slice 3b: lower pipeline subjects with exactly-once source-order evaluation |
| [#1191](https://github.com/kofun-lang/kofun/issues/1191) | `writer-c` | ready | P1 | M | 2026-08-17 | 2026-08-20 | 2026-08-21 | medium | Call arguments v1 slice 3c: lower the accepted trailing-lambda form and fix the lifted-lambda-body boundary |
| [#1202](https://github.com/kofun-lang/kofun/issues/1202) | `writer-a` | ready | P1 | M | 2026-08-20 | 2026-08-25 | 2026-08-27 | medium | verify: reuse one Stage 2 compiler and one self-host profile scan |
| [#569](https://github.com/kofun-lang/kofun/issues/569) | `writer-c` | needs-detail | P1 | M | 2026-08-21 | 2026-08-28 | 2026-08-31 | low | RFC: define affine authority capabilities for environment access |
| [#710](https://github.com/kofun-lang/kofun/issues/710) | `writer-a` | needs-detail | P1 | L | 2026-08-26 | 2026-09-08 | 2026-09-10 | low | Compiler-native Decimal: implement the accepted language design across all backends |
| [#882](https://github.com/kofun-lang/kofun/issues/882) | `writer-b` | needs-detail | P1 | M | 2026-08-27 | 2026-09-03 | 2026-09-04 | low | Call arguments v1 slice 3: lower labelled and trailing calls without reorder or allocation |
| [#902](https://github.com/kofun-lang/kofun/issues/902) | `writer-c` | needs-detail | P1 | M | 2026-08-31 | 2026-09-07 | 2026-09-08 | low | bindgen-c: enforce a mechanical raw-binding import boundary |
| [#1193](https://github.com/kofun-lang/kofun/issues/1193) | `writer-b` | needs-detail | P1 | L | 2026-09-04 | 2026-09-17 | 2026-09-21 | low | RFC-0002 stage 1: compiler authority model, attenuation facts, and E350-E356 |
| [#1113](https://github.com/kofun-lang/kofun/issues/1113) | `writer-c` | in-progress | P2 | M | 2026-09-08 | 2026-09-11 | 2026-09-14 | medium | Stage 2: merge the labelled and direct List[Int] fixed-slot call lowering |
| [#1197](https://github.com/kofun-lang/kofun/issues/1197) | `writer-a` | ready | P2 | S | 2026-09-09 | 2026-09-10 | 2026-09-11 | medium | Stage 2: read a bounded List[Int] record field back as a List[Int] value |
| [#644](https://github.com/kofun-lang/kofun/issues/644) | `writer-a` | needs-detail | P2 | M | 2026-09-11 | 2026-09-18 | 2026-09-22 | low | HTTP/1.1 client core: bounded request and response state machine over scripted transport |

## Weekly calendar

| Week of | Active issues | Delivered | Writer load |
|---|---|---|---:|
| 2026-08-10 | #274, #725, #1190 | — | 12/15 |
| 2026-08-17 | #274, #569, #725, #1190, #1191, #1202 | #274, #1190, #1191 | 14/15 |
| 2026-08-24 | #569, #710, #725, #882, #1202 | #725, #1202 | 13/15 |
| 2026-08-31 | #569, #710, #882, #902, #1193 | #569, #882 | 15/15 |
| 2026-09-07 | #644, #710, #902, #1113, #1193, #1197 | #710, #902, #1197 | 15/15 |
| 2026-09-14 | #644, #1113, #1193 | #1113 | 9/15 |
| 2026-09-21 | #644, #1193 | #644, #1193 | 0/15 |

## Not scheduled

No finish date is assigned when the tracker itself says the work is deferred or
has an external blocker outside the represented serial chains.

| Issue | State | Reason |
|---|---|---|
| [#646](https://github.com/kofun-lang/kofun/issues/646) | blocked | blocked without a dependency represented by a scheduled chain |
| [#847](https://github.com/kofun-lang/kofun/issues/847) | blocked | blocked without a dependency represented by a scheduled chain |
| [#868](https://github.com/kofun-lang/kofun/issues/868) | blocked | blocked without a dependency represented by a scheduled chain |
| [#883](https://github.com/kofun-lang/kofun/issues/883) | blocked | blocked without a dependency represented by a scheduled chain |
| [#884](https://github.com/kofun-lang/kofun/issues/884) | blocked | blocked without a dependency represented by a scheduled chain |
| [#885](https://github.com/kofun-lang/kofun/issues/885) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1161](https://github.com/kofun-lang/kofun/issues/1161) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1162](https://github.com/kofun-lang/kofun/issues/1162) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1163](https://github.com/kofun-lang/kofun/issues/1163) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1164](https://github.com/kofun-lang/kofun/issues/1164) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1166](https://github.com/kofun-lang/kofun/issues/1166) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1167](https://github.com/kofun-lang/kofun/issues/1167) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1192](https://github.com/kofun-lang/kofun/issues/1192) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1194](https://github.com/kofun-lang/kofun/issues/1194) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1195](https://github.com/kofun-lang/kofun/issues/1195) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1196](https://github.com/kofun-lang/kofun/issues/1196) | blocked | blocked without a dependency represented by a scheduled chain |

## Assumptions

- No new issues enter the scheduled scope.
- Three writer lanes and one review/integration lane are continuously available on business days.
- Known dependency chains are serial and their blocked members remain conditional.
- S/M/L use 2/4/8 writer days; unknown size uses 5; refinement and decision states receive extra time.
- The calendar models weekdays only; public holidays, leave, incidents, and new intake are outside the lane simulation.
- The conservative date adds a 25% business-day buffer after the simulated review bottleneck.

Regenerate this document and
`site/plan-snapshot.json` with `node site/sync-plan.mjs`. Use
`node site/sync-plan.mjs --check` in CI to detect semantic drift without
rewriting files.
