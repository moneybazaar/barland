

## Plan: Redesign Process Section as Visual Vertical Timeline

The current Process section uses a flat 2x2 grid (as shown in the screenshot). Redesign it as a proper vertical timeline with a connecting line, alternating left/right cards on desktop, and a single-column timeline on mobile.

### Design

```text
Desktop Layout:
                    
  [Card 1]  ●──────
            │
  ──────────●  [Card 2]
            │
  [Card 3]  ●──────
            │
  ──────────●  [Card 4]

Mobile Layout:

  │
  ● [Card 1]
  │
  ● [Card 2]
  │
  ● [Card 3]
  │
  ● [Card 4]
```

### Visual Details

- **Vertical line**: Centered gradient line (primary color) running full height
- **Step nodes**: Numbered circles on the line with pulse animation on scroll
- **Cards**: Glassmorphic style (matching Benefits section) with icon, title, description
- **Alternating**: Even steps right, odd steps left on desktop; all left-aligned on mobile
- **Animations**: Staggered scroll-reveal, cards slide in from their respective sides
- **Background**: Navy institutional background matching Benefits section (`hsl(200 100% 18%)`)

### File Changes

| File | Change |
|------|--------|
| `src/components/landing/ProcessSection.tsx` | Full rewrite — vertical timeline layout with alternating cards, animated nodes, navy background |

