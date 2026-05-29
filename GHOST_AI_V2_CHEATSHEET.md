# ⚡ GHOST AI V2 - CHEAT SHEET

**Read this in**: ⏱️ 2 minutes max

---

## THE 3 FIXES AT A GLANCE

```
PROBLEM #1 ❌
Ghost same speed always
↓
SOLUTION ✅ 
getSpeedMultiplier() 
→ 2.5x faster when close ⚡

PROBLEM #2 ❌
Ghost trapped in lower map
↓
SOLUTION ✅
Reduced continuity bonus
+10 → +2
→ Now explores everywhere 📍

PROBLEM #3 ❌
AI poor and erratic
↓
SOLUTION ✅
Better scoring + stuck escape
→ Intelligent pursuit 🧠
```

---

## SPEED BY DISTANCE

```
METERS AWAY    SPEED         EMOJI
─────────────────────────────────────
> 15           Normal 🟢     Slow patrol
8-15           +50% 🟡       Getting close
5-8            +100% 🟠      FAST!
< 5            +150% 🔴      DANGER! ⚡
```

---

## CODE CHANGES QUICK

```javascript
NEW:
  getSpeedMultiplier()     [Speed scaling]
  checkIfStuck()           [Escape traps]

CHANGED:
  update()                 [Apply speed]
  moveTowardPlayer()       [Score: -dist*2 instead of -dist]
  moveAwayFromPlayer()     [Better escape]
```

---

## VERIFICATION (Quick)

✓ Ghosts faster when you're close?
✓ Ghosts visit ALL map areas?
✓ Game feels like Pac-Man?

**All yes = WORKING!** ✅

---

## FILES TO READ

### If You Have 1 Minute
→ `START_GHOST_AI_V2_1MIN.md`

### If You Have 5 Minutes
→ `GHOST_AI_V2_SUMMARY.md`

### If You Have 15 Minutes
→ `GHOST_AI_V2_EXPLANATION.md`

### If You Want Everything
→ `GHOST_AI_V2_INDEX.md`

---

## CONTROLS

```
MOVE:    Arrow Keys or WASD
PAUSE:   P
PLAY:    Click JUGAR
RECORDS: Click Records button
MODE:    Click Modo Difícil for hard
```

---

## JUST PLAY! 🎮

1. Open `index.html`
2. Click JUGAR
3. Enjoy! 👾

---

*That's it! Short and sweet.* ✅
