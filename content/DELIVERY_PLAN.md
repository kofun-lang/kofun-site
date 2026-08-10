# Delivery plan

Status: generated read-only planning snapshot. This is a capacity forecast, not
a promise that unresolved or externally blocked work will complete by a date.

Repository: [`kofun-lang/kofun`](https://github.com/kofun-lang/kofun)

As of: `2026-08-05`

## Capacity and scope

- Maximum four agents: three writer lanes plus one review/integration lane.
- Work in progress is capped at three implementation issues.
- Planning umbrellas are counted but never scheduled as implementation work.
- `24` curated issues are scheduled and
  `34` are deferred or externally blocked.

| Metric | Count |
|---|---:|
| All issues | 754 |
| Open issues | 70 |
| Open curated | 58 |
| Open planning umbrellas | 11 |
| Scheduled curated | 24 |
| Unscheduled curated | 34 |

## Forecast

| Scenario | Finish | Interpretation |
|---|---|---|
| 4-agent capacity plan | 2026-10-15 | Deterministic lane simulation with one serial reviewer. |
| Conservative +25% buffer | 2026-11-03 | Allows for refinement, rework, and integration variance. |
| Observed completion pace, intake frozen | 2026-08-07 | Optimistic extrapolation; it freezes intake and may include retrospective tracker closure. |
| Observed net issue burn | — | No finish date: curated intake equals or exceeds completed work in the observation window. |

Confidence is **low** until missing sizes, refinement
states, external blockers, and future intake are resolved. Over the trailing
`14` days, curated intake was
`77.5`/week and completion was
`75`/week; issues closed as
`not_planned` are excluded from completion throughput.

## Critical dependency chains

### Self-host fixed point and independent reproduction

Lane: `writer-a`

| Issue | Tracker state | Priority | Start | Delivered |
|---|---|---|---|---|
| [#618](https://github.com/kofun-lang/kofun/issues/618) | closed | P0 | — | — |
| [#622](https://github.com/kofun-lang/kofun/issues/622) | ready | P0 | 2026-08-05 | 2026-08-11 |
| [#271](https://github.com/kofun-lang/kofun/issues/271) | needs-decision | P0 | 2026-08-12 | 2026-08-21 |
| [#272](https://github.com/kofun-lang/kofun/issues/272) | blocked | P0 | 2026-08-24 | 2026-08-28 |
| [#274](https://github.com/kofun-lang/kofun/issues/274) | blocked | P1 | 2026-08-31 | 2026-09-04 |

### Compiler-native Decimal delivery

Lane: `writer-b`

| Issue | Tracker state | Priority | Start | Delivered |
|---|---|---|---|---|
| [#721](https://github.com/kofun-lang/kofun/issues/721) | closed | P1 | — | — |
| [#722](https://github.com/kofun-lang/kofun/issues/722) | closed | P1 | — | — |
| [#723](https://github.com/kofun-lang/kofun/issues/723) | closed | P1 | — | — |
| [#724](https://github.com/kofun-lang/kofun/issues/724) | closed | P1 | — | — |
| [#725](https://github.com/kofun-lang/kofun/issues/725) | needs-detail | P2 | 2026-08-05 | 2026-08-20 |
| [#726](https://github.com/kofun-lang/kofun/issues/726) | closed | P2 | — | — |

## Scheduled curated work

Writer end is implementation complete; delivered is after the single reviewer
lane finishes integration.

| Issue | Lane | State | Priority | Size | Start | Writer end | Delivered | Confidence | Title |
|---|---|---|---|---|---|---|---|---|---|
| [#622](https://github.com/kofun-lang/kofun/issues/622) | `writer-a` | ready | P0 | M | 2026-08-05 | 2026-08-10 | 2026-08-11 | medium | Self-host compiler driver: args, file I/O, and compiling S to deterministic C11 |
| [#725](https://github.com/kofun-lang/kofun/issues/725) | `writer-b` | needs-detail | P2 | L | 2026-08-05 | 2026-08-18 | 2026-08-20 | low | Decimal slice 6: state scale guarantees truthfully now, and add Fixed[scale] when const generics exist |
| [#955](https://github.com/kofun-lang/kofun/issues/955) | `writer-c` | in-progress | P1 | S | 2026-08-05 | 2026-08-06 | 2026-08-07 | medium | modules: spec/grammar.ebnf admits a top-level `let` that Stage 2 refuses with E2S02 |
| [#1008](https://github.com/kofun-lang/kofun/issues/1008) | `writer-c` | in-progress | P1 | M | 2026-08-07 | 2026-08-12 | 2026-08-13 | medium | Stage 2: execute immutable Int module constants after authority decision |
| [#271](https://github.com/kofun-lang/kofun/issues/271) | `writer-a` | needs-decision | P0 | M | 2026-08-12 | 2026-08-20 | 2026-08-21 | low | Bootstrap: produce C1/A1 and self-compile S into C2/A2 |
| [#880](https://github.com/kofun-lang/kofun/issues/880) | `writer-c` | ready | P1 | M | 2026-08-13 | 2026-08-18 | 2026-08-24 | medium | Call arguments v1 slice 1: parse labels and canonical trailing lambdas |
| [#27](https://github.com/kofun-lang/kofun/issues/27) | `writer-c` | needs-decision | P1 | M | 2026-08-19 | 2026-08-27 | 2026-08-31 | low | Sample: end-to-end JSON API service |
| [#555](https://github.com/kofun-lang/kofun/issues/555) | `writer-b` | needs-decision | P1 | M | 2026-08-21 | 2026-08-31 | 2026-09-01 | low | Scoped parallelism v1: specify spawn/join ownership semantics and executable model |
| [#272](https://github.com/kofun-lang/kofun/issues/272) | `writer-a` | blocked | P0 | M | 2026-08-24 | 2026-08-27 | 2026-08-28 | conditional | Bootstrap fixed point: produce C3/A3, compare three generations, close B4/B5 |
| [#902](https://github.com/kofun-lang/kofun/issues/902) | `writer-c` | needs-decision | P1 | M | 2026-08-28 | 2026-09-07 | 2026-09-08 | low | bindgen-c: enforce a mechanical raw-binding import boundary |
| [#274](https://github.com/kofun-lang/kofun/issues/274) | `writer-a` | blocked | P1 | M | 2026-08-31 | 2026-09-03 | 2026-09-04 | conditional | Reproducible bootstrap B6: independent clean builder reproduces the fixed point |
| [#988](https://github.com/kofun-lang/kofun/issues/988) | `writer-b` | needs-decision | P1 | S | 2026-09-01 | 2026-09-07 | 2026-09-09 | low | RFC: choose the derive v1 expansion authority and inspection contract |
| [#637](https://github.com/kofun-lang/kofun/issues/637) | `writer-a` | needs-detail | P1 | M | 2026-09-07 | 2026-09-14 | 2026-09-15 | low | Discovery query v1: project inferred types and callable operations from semantic facts |
| [#710](https://github.com/kofun-lang/kofun/issues/710) | `writer-b` | needs-detail | P1 | L | 2026-09-08 | 2026-09-21 | 2026-09-23 | low | Compiler-native Decimal: implement the accepted language design across all backends |
| [#281](https://github.com/kofun-lang/kofun/issues/281) | `writer-c` | unclassified | P1 | M | 2026-09-08 | 2026-09-11 | 2026-09-14 | medium | Position paper: what replacing C and Rust actually requires |
| [#645](https://github.com/kofun-lang/kofun/issues/645) | `writer-c` | ready | P2 | M | 2026-09-14 | 2026-09-17 | 2026-09-18 | medium | Date/time core: Gregorian values, checked arithmetic, and strict RFC 3339 |
| [#1033](https://github.com/kofun-lang/kofun/issues/1033) | `writer-a` | ready | P2 | M | 2026-09-15 | 2026-09-18 | 2026-09-21 | medium | LSP visibility: filter completion and navigation by caller context |
| [#1035](https://github.com/kofun-lang/kofun/issues/1035) | `writer-c` | ready | P2 | S | 2026-09-18 | 2026-09-21 | 2026-09-24 | medium | Visibility fuzz: bound malformed identities, re-export chains, and stale artifacts |
| [#784](https://github.com/kofun-lang/kofun/issues/784) | `writer-a` | needs-decision | P2 | M | 2026-09-21 | 2026-09-29 | 2026-09-30 | low | ownership: an affine handle whose owned state cannot be duplicated (#644) |
| [#943](https://github.com/kofun-lang/kofun/issues/943) | `writer-b` | needs-decision | P2 | S | 2026-09-22 | 2026-09-28 | 2026-09-29 | low | Lambda spelling drift: Stage 2 accepts `(a, b) => e` and `x => e`, the grammar and SYNTAX.md describe neither |
| [#975](https://github.com/kofun-lang/kofun/issues/975) | `writer-c` | needs-decision | P2 | S | 2026-09-22 | 2026-09-28 | 2026-10-01 | low | backlog: decide whether a planning umbrella waiting on children is `blocked` |
| [#995](https://github.com/kofun-lang/kofun/issues/995) | `writer-b` | needs-decision | P2 | S | 2026-09-29 | 2026-10-05 | 2026-10-06 | low | Trait member override v1: inherited and default member collision contract |
| [#584](https://github.com/kofun-lang/kofun/issues/584) | `writer-c` | needs-detail | P2 | M | 2026-09-29 | 2026-10-06 | 2026-10-07 | low | Visibility tooling: prevent macro, LSP, and sidecar access bypasses |
| [#868](https://github.com/kofun-lang/kofun/issues/868) | `writer-a` | needs-detail | P2 | L | 2026-09-30 | 2026-10-13 | 2026-10-15 | low | Stage 2 C11 aggregate bridge: execute records with List[Int] and Text |

## Weekly calendar

| Week of | Active issues | Delivered | Writer load |
|---|---|---|---:|
| 2026-08-03 | #622, #725, #955, #1008 | #955 | 9/15 |
| 2026-08-10 | #271, #622, #725, #880, #1008 | #622, #1008 | 14/15 |
| 2026-08-17 | #27, #271, #555, #725, #880 | #271, #725 | 12/15 |
| 2026-08-24 | #27, #272, #555, #880, #902 | #272, #880 | 14/15 |
| 2026-08-31 | #27, #274, #555, #902, #988 | #27, #274, #555 | 14/15 |
| 2026-09-07 | #281, #637, #710, #902, #988 | #902, #988 | 15/15 |
| 2026-09-14 | #281, #637, #645, #710, #1033, #1035 | #281, #637, #645 | 15/15 |
| 2026-09-21 | #710, #784, #943, #975, #1033, #1035 | #710, #1033, #1035 | 15/15 |
| 2026-09-28 | #584, #784, #868, #943, #975, #995 | #784, #943, #975 | 15/15 |
| 2026-10-05 | #584, #868, #995 | #584, #995 | 8/15 |
| 2026-10-12 | #868 | #868 | 2/15 |

## Not scheduled

No finish date is assigned when the tracker itself says the work is deferred or
has an external blocker outside the represented serial chains.

| Issue | State | Reason |
|---|---|---|
| [#277](https://github.com/kofun-lang/kofun/issues/277) | deferred | deferred outside the active delivery scope |
| [#278](https://github.com/kofun-lang/kofun/issues/278) | deferred | deferred outside the active delivery scope |
| [#279](https://github.com/kofun-lang/kofun/issues/279) | deferred | deferred outside the active delivery scope |
| [#280](https://github.com/kofun-lang/kofun/issues/280) | deferred | deferred outside the active delivery scope |
| [#314](https://github.com/kofun-lang/kofun/issues/314) | blocked | blocked without a dependency represented by a scheduled chain |
| [#424](https://github.com/kofun-lang/kofun/issues/424) | deferred | deferred outside the active delivery scope |
| [#533](https://github.com/kofun-lang/kofun/issues/533) | blocked | blocked without a dependency represented by a scheduled chain |
| [#536](https://github.com/kofun-lang/kofun/issues/536) | deferred | deferred outside the active delivery scope |
| [#537](https://github.com/kofun-lang/kofun/issues/537) | deferred | deferred outside the active delivery scope |
| [#538](https://github.com/kofun-lang/kofun/issues/538) | deferred | deferred outside the active delivery scope |
| [#539](https://github.com/kofun-lang/kofun/issues/539) | deferred | deferred outside the active delivery scope |
| [#540](https://github.com/kofun-lang/kofun/issues/540) | deferred | deferred outside the active delivery scope |
| [#554](https://github.com/kofun-lang/kofun/issues/554) | blocked | blocked without a dependency represented by a scheduled chain |
| [#569](https://github.com/kofun-lang/kofun/issues/569) | blocked | blocked without a dependency represented by a scheduled chain |
| [#570](https://github.com/kofun-lang/kofun/issues/570) | blocked | blocked without a dependency represented by a scheduled chain |
| [#571](https://github.com/kofun-lang/kofun/issues/571) | blocked | blocked without a dependency represented by a scheduled chain |
| [#573](https://github.com/kofun-lang/kofun/issues/573) | blocked | blocked without a dependency represented by a scheduled chain |
| [#576](https://github.com/kofun-lang/kofun/issues/576) | blocked | blocked without a dependency represented by a scheduled chain |
| [#585](https://github.com/kofun-lang/kofun/issues/585) | blocked | blocked without a dependency represented by a scheduled chain |
| [#644](https://github.com/kofun-lang/kofun/issues/644) | blocked | blocked without a dependency represented by a scheduled chain |
| [#646](https://github.com/kofun-lang/kofun/issues/646) | blocked | blocked without a dependency represented by a scheduled chain |
| [#738](https://github.com/kofun-lang/kofun/issues/738) | deferred | deferred outside the active delivery scope |
| [#847](https://github.com/kofun-lang/kofun/issues/847) | blocked | blocked without a dependency represented by a scheduled chain |
| [#881](https://github.com/kofun-lang/kofun/issues/881) | blocked | blocked without a dependency represented by a scheduled chain |
| [#882](https://github.com/kofun-lang/kofun/issues/882) | blocked | blocked without a dependency represented by a scheduled chain |
| [#883](https://github.com/kofun-lang/kofun/issues/883) | blocked | blocked without a dependency represented by a scheduled chain |
| [#884](https://github.com/kofun-lang/kofun/issues/884) | blocked | blocked without a dependency represented by a scheduled chain |
| [#885](https://github.com/kofun-lang/kofun/issues/885) | blocked | blocked without a dependency represented by a scheduled chain |
| [#915](https://github.com/kofun-lang/kofun/issues/915) | blocked | blocked without a dependency represented by a scheduled chain |
| [#922](https://github.com/kofun-lang/kofun/issues/922) | blocked | blocked without a dependency represented by a scheduled chain |
| [#930](https://github.com/kofun-lang/kofun/issues/930) | blocked | blocked without a dependency represented by a scheduled chain |
| [#942](https://github.com/kofun-lang/kofun/issues/942) | blocked | blocked without a dependency represented by a scheduled chain |
| [#946](https://github.com/kofun-lang/kofun/issues/946) | blocked | blocked without a dependency represented by a scheduled chain |
| [#1032](https://github.com/kofun-lang/kofun/issues/1032) | blocked | blocked without a dependency represented by a scheduled chain |

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
