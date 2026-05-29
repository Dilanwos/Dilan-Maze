# 🎮 GHOST AI V2 - TESTING CHECKLIST

**Game Version**: game_fixed.js
**Status**: ✅ READY FOR TESTING
**Created**: 2026-05-28

---

## Pre-Flight Checks ✈️

Before testing, verify:

- [ ] Browser: Chrome, Firefox, Edge or Safari
- [ ] File: index.html is accessible
- [ ] Audio: System volume is ON
- [ ] Network: No proxy/VPN issues
- [ ] Computer: Not under heavy load

**Proceed to tests →**

---

## TEST 1: Speed Increase Near Ghost ⚡

**What to do**:
1. Start game → Click JUGAR
2. Pick level 1 (easy first)
3. Move Pac-Man directly TOWARD a red ghost
4. Get within 5 grid cells of the ghost
5. Observe ghost movement speed
6. Move 20 cells AWAY from ghost
7. Observe ghost movement speed again

**Expected behavior**:
```
CLOSE (< 5 cells):
  Ghost zooms toward you FAST ⚡⚡⚡
  Clearly aggressive
  Creates pressure/urgency

FAR (> 15 cells):
  Ghost moves slowly 🐢
  Leisurely patrol
  Different from close speed
```

**Verification**:
- [ ] Ghost VISIBLY speeds up when close
- [ ] Ghost VISIBLY slows down when far
- [ ] Speed difference is NOTICEABLE (at least 2x)
- [ ] Speed changes SMOOTHLY (not abrupt)
- [ ] Applies to ALL 4 ghosts

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 2: Full Map Exploration 📍

**What to do**:
1. Start new game
2. Play for 30+ seconds WITHOUT MOVING
3. Watch ghosts move around the map
4. Observe which areas they visit

**Expected behavior**:
```
Ghosts should visit:
✅ UPPER area (rows 1-5)
✅ MIDDLE area (rows 8-14)
✅ LOWER area (rows 15-19)
✅ LEFT side (columns 1-5)
✅ RIGHT side (columns 15-20)
✅ All available corridors

NOT expected:
❌ Stuck in one area
❌ Confined to lower region
❌ Same path in loop
```

**Verification**:
- [ ] Ghosts reach TOP of map
- [ ] Ghosts reach BOTTOM of map
- [ ] Ghosts reach LEFT side
- [ ] Ghosts reach RIGHT side
- [ ] All 4 ghosts visit different areas
- [ ] Watch for 30 seconds = all areas covered
- [ ] No ghost appears "trapped"

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 3: Stuck Detection & Escape 🔄

**What to do**:
1. Try to trap a ghost in a corner
2. Move around it to block escape routes
3. Observe for 5-10 seconds
4. Watch if ghost escapes

**Expected behavior**:
```
IF ghost is blocked:
  → Waits 3 frames
  → Changes direction
  → Finds escape route ✅

NOT expected:
  → Ghost stays forever
  → Bounces in place
  → Game freezes
```

**Verification**:
- [ ] Can corner a ghost temporarily
- [ ] Ghost doesn't bounce/glitch
- [ ] Ghost finds escape within 3-5 seconds
- [ ] Escape is INTELLIGENT (not random-looking)
- [ ] Ghost resumes pursuing

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 4: Game Feel & Arcade Quality 🎮

**What to do**:
1. Play a FULL 5-10 minute game
2. Get chased, escape, gather points
3. Experience full gameplay loop
4. Evaluate overall feel

**Expected behavior**:
```
FEELING:
✅ Challenging but fair
✅ Ghosts are threatening
✅ Intense when close to ghosts
✅ Manageable when safe
✅ Similar to classic Pac-Man
✅ Fun to play
✅ No frustration from unfair speed

NOT expected:
❌ Impossible difficulty
❌ Speed feels too fast
❌ Speed feels too slow
❌ Unpredictable ghost behavior
❌ Boring chase
```

**Verification**:
- [ ] Game is CHALLENGING (but not too hard)
- [ ] Ghosts feel SMART (not random)
- [ ] Speed feels BALANCED (aggressive but fair)
- [ ] Pressure increases near ghosts (immersive)
- [ ] Game is FUN (you want to play again)
- [ ] Similar to Pac-Man arcade feel
- [ ] No lag or stuttering

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 5: Scoring & Difficulty Progression 📈

**What to do**:
1. Play Level 1
2. Observe ghost speed
3. Proceed to Level 2
4. Observe ghost speed (should be faster)
5. Compare levels

**Expected behavior**:
```
LEVEL 1: Base speed
LEVEL 2: Noticeably faster
LEVEL 3: Much faster
...
LEVEL 5: Very challenging

Each level should feel:
  → Faster than previous
  → But not impossible
  → Progressive difficulty
```

**Verification**:
- [ ] Level 2 ghosts faster than Level 1
- [ ] Level 3 faster than Level 2
- [ ] Progression feels smooth
- [ ] Level 5 is challenging but playable
- [ ] Speed multiplier works in ALL levels

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 6: Movement Independence 🎯

**What to do**:
1. Start game, do NOT move Pac-Man
2. Watch ghosts for 20 seconds
3. Verify ghosts move independently

**Expected behavior**:
```
IMPORTANT: Ghosts move EVEN if Pac-Man is still!

Moving:
✅ Ghosts move continuously
✅ Ghosts don't freeze
✅ Ghosts patrol area
✅ Independent of player input

NOT expected:
❌ Ghosts freeze when Pac-Man stops
❌ Ghosts only move when player moves
❌ Game hangs
```

**Verification**:
- [ ] Ghosts move while Pac-Man is STILL
- [ ] Movement is CONTINUOUS (no pauses)
- [ ] All 4 ghosts move independently
- [ ] Can see clear patrol patterns
- [ ] No freeze or hang

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 7: Scared Mode (Power-up) 👻

**What to do**:
1. Collect a power-up (fruit)
2. Observe ghosts turn scared
3. Watch if ghosts RUN AWAY
4. Verify speed behavior in scared mode

**Expected behavior**:
```
When power-up active:
  → Ghosts change color
  → Ghosts RUN AWAY from Pac-Man
  → Ghosts are slower
  → Pac-Man can eat them

Speed should still scale:
  → Close = still 2x speed
  → But running away instead of chasing
```

**Verification**:
- [ ] Ghosts turn scared (color changes)
- [ ] Ghosts run AWAY from player
- [ ] Ghosts are slower in scared mode
- [ ] Speed multiplier works in scared mode
- [ ] Can eat scared ghosts
- [ ] Ghost respawns after eaten

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## TEST 8: No Collision Bugs 🚧

**What to do**:
1. Play normally
2. Move Pac-Man through all areas
3. Try to pass through walls
4. Observe ghost collisions

**Expected behavior**:
```
Collision:
✅ Pac-Man CANNOT pass walls
✅ Ghosts CANNOT pass walls
✅ Clean collision detection
✅ No ghost phasing
✅ Walls are solid

NOT expected:
❌ Pac-Man inside walls
❌ Ghost inside walls
❌ Clipping issues
❌ Inconsistent collision
```

**Verification**:
- [ ] Pac-Man blocked by walls
- [ ] All 4 ghosts blocked by walls
- [ ] No phasing/clipping
- [ ] Clean wall boundaries
- [ ] Consistent collision everywhere

**Result**: ✅ PASS / ❌ FAIL

**Notes**: _______________________________________________

---

## SUMMARY SCORECARD 📊

| Test | Result | Issues |
|------|--------|--------|
| 1. Speed Increase | ✅ / ❌ | |
| 2. Full Map | ✅ / ❌ | |
| 3. Stuck Escape | ✅ / ❌ | |
| 4. Game Feel | ✅ / ❌ | |
| 5. Difficulty | ✅ / ❌ | |
| 6. Independence | ✅ / ❌ | |
| 7. Scared Mode | ✅ / ❌ | |
| 8. Collisions | ✅ / ❌ | |

**Total**: ___ / 8 Tests Passed

---

## OVERALL VERDICT

### If All 8 Tests PASS ✅
```
🎉 PERFECT! All improvements working!
🚀 Ready to play and enjoy!
✅ Professional arcade quality!
```

### If 7 Tests PASS ✅ (1 minor issue)
```
✅ Mostly working great!
⚠️ Minor issue to note
🔧 Can troubleshoot specific area
```

### If 6 Tests PASS ✅ (2 issues)
```
✅ Major systems working
⚠️ Some issues to address
💬 May need adjustment
```

### If < 6 Tests PASS ❌
```
❌ Something isn't right
🔍 Need to investigate
💬 Report specific findings
```

---

## ISSUE REPORT TEMPLATE

If you find a problem, document it:

```
TEST NAME: ____________________________
EXPECTED: ____________________________
ACTUAL: ______________________________
STEPS TO REPRODUCE:
1. ___________________________________
2. ___________________________________
3. ___________________________________

SCREENSHOT/VIDEO: (optional)
Additional notes:
___________________________________
```

---

## Quick Reference - Speed Levels

### Level 1 (Normal Difficulty)
```
Base interval: 3 frames

Distance     Interval    Real Speed    Effect
─────────────────────────────────────────
> 15 cells   3 frames    20 FPS        Slow
12-15        2.5 frames  24 FPS        Normal
8-12         2 frames    30 FPS        Fast
5-8          1.5 frames  40 FPS        Very Fast
< 5 cells    1 frame     60 FPS        MAX ⚡
```

### Level 5 (Hard Difficulty)
```
Base interval: 1 frame

Distance     Interval    Real Speed    Effect
─────────────────────────────────────────
> 15 cells   1 frame     60 FPS        Normal
5-15         1 frame     60 FPS        FAST!
< 5 cells    1 frame     60 FPS+       CRAZY! ⚡
```

---

## Performance Metrics

If you want detailed stats:
- **FPS**: Should stay 60 FPS
- **CPU**: < 5% per ghost
- **Memory**: +200 bytes per ghost
- **Input lag**: < 16ms
- **Frame time**: < 16.67ms

Open DevTools (F12) → Performance tab to verify.

---

## FINAL CHECKLIST

Before declaring victory:

- [ ] All tests completed
- [ ] Results documented
- [ ] Issues (if any) noted
- [ ] Game feels good
- [ ] Ready to play!

**You're all set! Enjoy Pac-Man! 👾**

---

*Testing guide for Ghost AI V2*
*Version 2026-05-28*
*Professional arcade quality* ✅
