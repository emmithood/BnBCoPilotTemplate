# Dark Mode Styling Guide for STR COPILOT

## Overview

This document outlines our approach to implementing dark mode styling in the STR COPILOT dashboard. Our goal is to provide a comfortable, accessible, and visually appealing dark mode experience that maintains brand identity and improves usability in low-light environments.

## Color Mapping

When implementing dark mode, we use the following color mapping strategy:

### Light Mode → Dark Mode

- **Backgrounds**: 
  - White (`bg-white`) → Dark card background (`dark:bg-card` or `dark:bg-black` for deeper contrast)
  - Light gray (`bg-gray-50`, `bg-neutral-50`) → Slightly lighter dark background (`dark:bg-border/30` or `dark:bg-border/50`)

- **Text**: 
  - Dark text (`text-gray-800`, `text-neutral-800`) → Light text (`dark:text-foreground`)
  - Medium gray text (`text-gray-600`) → Slightly dimmed light text (`dark:text-foreground/80`)
  - Light gray text → Even more dimmed light text (`dark:text-foreground/70`)

- **Borders**: 
  - Light borders (`border-gray-200`, `border-neutral-200`) → Dark borders (`dark:border-border`)

- **Primary Elements**:
  - Primary buttons maintain brand color but may be adjusted for better contrast
  - Primary accents (`bg-primary/10`) maintain color identity but with adjusted opacity

- **Status Indicators**:
  - Success/error/warning indicators maintain their semantic colors but with adjusted opacity and contrast

## Implementation Patterns

### 1. Container Elements

All container elements should include both light and dark mode styling:

```tsx
<div className="bg-white dark:bg-card border border-neutral-200 dark:border-border rounded-xl">...</div>
```

### 2. Text Elements

Text should always maintain sufficient contrast:

```tsx
<p className="text-neutral-800 dark:text-foreground">Primary text</p>
<p className="text-neutral-600 dark:text-foreground/70">Secondary text</p>
```

### 3. Status Badges

Status badges should maintain semantic meaning but with adjusted contrast:

```tsx
<span className="bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-100">Success</span>
```

### 4. Sidebar and Navigation

The sidebar uses subtle gradients and border effects to create depth:

```tsx
<aside className="bg-white dark:bg-card border-r border-neutral-200 dark:border-border">
  <div className="bg-gradient-to-r from-primary/10 to-transparent">...</div>
</aside>
```

### 5. Interactive Elements

Buttons and interactive elements maintain clear hover/focus states:

```tsx
<button className="bg-white hover:bg-gray-50 dark:bg-card dark:hover:bg-border/50 transition-colors">...</button>
```

## Collapsible Sidebar Implementation

Our sidebar implements a collapsible design that works seamlessly in both light and dark modes:

1. **Expanded State**:
   - Full width (16rem/64px)
   - Shows complete navigation text and logo
   - Toggle button positioned at the edge

2. **Collapsed State**:
   - Slim width (3rem/12px) with just icons visible
   - Shows a visible 2px edge strip as a visual indicator
   - Toggle button becomes more visible on hover

3. **Toggle Behavior**:
   - Toggle button shows directional arrow indicating the action
   - Uses smooth transitions with `transition-all duration-300 ease-in-out`
   - Main content reflows to accommodate sidebar width

## Accessibility Considerations

- All interactive elements maintain sufficient contrast ratios (WCAG AA compliant)
- Focus states are clearly visible in both light and dark modes
- Color is never the only means of conveying information
- Text remains readable with adequate contrast against backgrounds

## Testing Dark Mode

When implementing dark mode styles, test the following scenarios:

1. Toggle between light and dark mode to verify smooth transitions
2. Check all interactive elements for proper hover/focus states
3. Verify that all text maintains sufficient contrast
4. Test in actual low-light environments to verify comfort
5. Verify that all status indicators remain clearly distinguishable

## Version History

- v1.0.1 - Initial dark mode implementation with collapsible sidebar