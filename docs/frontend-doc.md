# MatMap Frontend Documentation

> **Version:** 0.1.0 · **Framework:** Next.js 16.2.12 (App Router) · **React:** 19.2.4  
> **Styling:** styled-components 6.4.4 — **zero Tailwind CSS**

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Installation & Running](#installation--running)
5. [Connecting to the Backend](#connecting-to-the-backend)
6. [Project Structure](#project-structure)
7. [Design System](#design-system)
8. [Features](#features)
   - [Home — Live Tracker](#home--live-tracker)
   - [Journey Planner](#journey-planner)
   - [Route Details](#route-details)
   - [Community Reporting](#community-reporting)
   - [Offline / PWA Support](#offline--pwa-support)
   - [Theme Switching](#theme-switching)
9. [API Communication Layer](#api-communication-layer)
10. [Custom Hooks Reference](#custom-hooks-reference)
11. [Component Reference](#component-reference)
12. [Testing](#testing)
13. [Troubleshooting](#troubleshooting)

---

## Overview

MatMap is a Progressive Web Application for Nairobi's matatu transit system, focused on the Thika Road corridor (CBD ↔ Juja). It provides:

- **Real-time route tracking** with interactive Google Maps integration
- **Journey planning** between corridor stages with fare and ETA estimates
- **Route detail manifests** displayed as metro-map style station sequences
- **Community crowd & fare reporting** via an optimistic-submission bottom sheet modal
- **Offline resilience** through service worker caching and a visible offline indicator

The frontend is designed around the **Matatu Livery** (light mode) and **Night Edition** (dark mode) design system — an industrial, brutalist aesthetic inspired by Nairobi's public transit signage.

---

## Prerequisites

| Tool | Minimum Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | 18.x or later | Runtime for Next.js dev server and build |
| **npm** | 9.x or later | Package management (comes with Node.js) |
| **Git** | 2.x | Version control |

**Optional but recommended:**

| Tool | Purpose |
| :--- | :--- |
| **Google Maps API key** (Browser key) | Enables the live interactive map. Without it, a high-contrast SVG fallback corridor map is rendered instead. |
| **MatMap Backend** running locally | Required for live data. Without it, API calls will fail gracefully with error states. |

---

## Environment Variables

Create a `.env.local` file inside `apps/frontend/`:

```bash
# Required — Backend API base URL
# Points to the MatMap backend. Default: http://localhost:4000/api/v1
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1

# Optional — Google Maps browser key
# If omitted or invalid, the app renders a static SVG corridor map instead.
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=<your-google-maps-browser-key>
```

| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | `http://localhost:4000/api/v1` | Backend API base URL. All frontend API calls are routed through this. |
| `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` | No | _(none)_ | Google Maps JavaScript API key. Enables interactive map tiles. |

> **Important:** The backend must have its `CORS_ORIGIN` environment variable set to match the frontend's origin (e.g. `http://localhost:3000`) or all API calls will fail with opaque CORS errors before reaching the frontend's error handling.

---

## Installation & Running

### First-time setup

From the **project root** (`Mat-Map/`):

```bash
# Install all workspace dependencies (root + apps)
npm install

# Navigate to the frontend app
cd apps/frontend

# Install frontend-specific dependencies (if not already resolved by root install)
npm install
```

### Development server

```bash
cd apps/frontend
npm run dev
```

The app will start on **http://localhost:3000** by default.

### Production build

```bash
cd apps/frontend
npm run build
npm start
```

### Linting

```bash
cd apps/frontend
npm run lint
```

---

## Connecting to the Backend

The frontend expects the MatMap backend to be running and accessible at the URL specified by `NEXT_PUBLIC_API_BASE_URL`.

### Step-by-step

1. **Start the backend** (refer to backend documentation):
   ```bash
   cd apps/backend
   npm run dev
   ```
   The backend runs on `http://localhost:4000` by default and mounts all API routes under `/api/v1`.

2. **Ensure CORS is configured** on the backend:
   Set the backend's `CORS_ORIGIN` env variable to `http://localhost:3000` (or whichever port the frontend runs on).

3. **Seed the database** (if not done already):
   The backend provides seed data for 12 corridor stages, 3 routes (Route 237, Forward Travellers, Super Metro 25), and fare matrices for all stage pairs.

4. **Start the frontend**:
   ```bash
   cd apps/frontend
   npm run dev
   ```

5. **Verify connectivity**: Open the browser at `http://localhost:3000`. The Home page should display route cards and stage data from the backend. If you see empty lists, check the browser console for CORS or network errors.

### API endpoints consumed

The frontend communicates with these backend endpoints (see `docs/api-spec.md` for full details):

| Frontend Module | Backend Endpoint | Method | Purpose |
| :--- | :--- | :---: | :--- |
| `src/api/stages.js` | `/stages` | GET | Fetch all corridor stages |
| `src/api/stages.js` | `/stages/:id` | GET | Fetch a single stage by UUID |
| `src/api/routes.js` | `/routes` | GET | Fetch all matatu routes with stage sequences |
| `src/api/routes.js` | `/routes/:id` | GET | Fetch a single route with full stage list |
| `src/api/journey.js` | `/fares?from=&to=` | GET | Fetch fare between two stages |
| `src/api/journey.js` | `/directions?from=&to=` | GET | Fetch ETA and polyline between two stages |
| `src/api/journey.js` | `/journey?from=&to=` | GET | Fetch combined journey options (routes + fares + ETAs) |
| `src/api/reports.js` | _(stubbed)_ | POST | Community report submission (backend not yet implemented) |

---

## Project Structure

```
apps/frontend/
├── public/
│   ├── icons/                    # PWA icon assets (192x192, 512x512)
│   ├── manifest.json             # PWA Web App Manifest
│   └── sw.js                     # Service worker for offline caching
│
└── src/
    ├── api/                      # Backend communication layer
    │   ├── client.js             # Universal fetch wrapper with error handling
    │   ├── journey.js            # /fares, /directions, /journey endpoints
    │   ├── reports.js            # /reports endpoint (stubbed)
    │   ├── routes.js             # /routes endpoints
    │   └── stages.js             # /stages endpoints
    │
    ├── app/                      # Next.js App Router pages
    │   ├── journey/
    │   │   └── page.jsx          # Journey planner page
    │   ├── routes/
    │   │   └── [id]/
    │   │       └── page.jsx      # Dynamic route detail page
    │   ├── layout.jsx            # Root layout (SSR registry, providers, PWA)
    │   ├── loading.jsx           # App Router suspense loading screen
    │   ├── page.jsx              # Home page (live tracker)
    │   ├── providers.jsx         # Theme context provider
    │   └── registry.jsx          # styled-components SSR registry
    │
    ├── components/               # Reusable UI components
    │   ├── Journey/              # Journey planner form + result cards
    │   ├── Map/                  # MapView, StageMarker, RoutePolyline
    │   ├── PWA/                  # PwaRegistration, OfflineBanner
    │   ├── Report/               # ReportFAB, ReportForm, ReportModal
    │   └── RouteDetail/          # RouteHeader, StageSequenceList, RouteDetailView
    │
    ├── hooks/                    # Custom React hooks
    │   ├── useJourney.js         # Journey search state management
    │   ├── useReport.js          # Community report submission
    │   ├── useRouteDetail.js     # Single route detail fetching
    │   ├── useRoutes.js          # All routes fetching
    │   └── useStages.js          # All stages fetching
    │
    └── styles/                   # Design system
        ├── GlobalStyle.js        # Global CSS (fonts, resets, scrollbars)
        └── theme.js              # Light & dark theme token definitions
```

---

## Design System

### Themes

The app ships with two themes, toggled at runtime via the header button:

| Theme | Name | Background | Primary Accent | Border Style |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | Matatu Livery | `#FAF8F2` (Paper White) | `#F2B705` (Matatu Yellow) | `2px solid #14140F` |
| **Dark** | Night Edition | `#14140F` (Ink Black) | `#F2B705` (Matatu Yellow) | `1px solid #262620` |

### Typography

| Role | Font Family | Usage |
| :--- | :--- | :--- |
| **Display** | Anton | Page titles, section headers, route badges |
| **Body** | IBM Plex Sans | Paragraph text, labels, form inputs |
| **Data** | IBM Plex Mono | Fares, ETAs, timestamps, monospaced data |

### Spacing & Layout

| Token | Value | Usage |
| :--- | :--- | :--- |
| `xs` | 4px | Tight gaps, inline spacing |
| `sm` | 8px | Chip padding, small gaps |
| `md` | 16px | Standard padding, card gaps |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Large section separators |
| `liveryStripe` | 6px | Accent border-left stripe on cards |
| `navbarHeight` | 64px | Fixed top and bottom navigation bars |
| `containerMax` | 600px | Maximum content width |

### Border Radius

All border radii are **0px** in light mode (brutalist aesthetic). Dark mode uses subtle rounding (4px–12px) for a softer night appearance.

---

## Features

### Home — Live Tracker

**Route:** `/` (root page)  
**File:** `src/app/page.jsx`

The main screen of the application, providing an overview of Nairobi's Thika Road corridor transit.

**What it does:**
- **Search bar** with placeholder prompts for destinations (e.g. "Kasarani", "Juja")
- **Filter chips** for quick filtering: "All routes", "Live now", "Saved", "Thika Rd"
- **Interactive map** rendering all stages and route polylines (Google Maps or SVG fallback)
- **Live vehicle carousel** displaying horizontally scrollable route cards with ETA estimates, SACCO operator names, and route color-coded badges
- **Nearby routes list** showing selectable route items with "VIEW" / "SELECTED" toggle chips
- **Bottom navigation bar** with tabs: Nearby, Saved, Alerts, Settings
- **Report FAB** (floating action button) at bottom-right to open the community reporting modal

**Data sources:** `useStages()` → `/stages`, `useRoutes()` → `/routes`

**Interactions:**
- Tapping a route card or list item highlights its polyline on the map (thickens to 6px, non-selected routes dim to 35% opacity)
- Tapping the same route again deselects it
- The Report FAB opens a bottom sheet modal for crowd & fare submissions

---

### Journey Planner

**Route:** `/journey`  
**File:** `src/app/journey/page.jsx`

Allows riders to plan a trip between two corridor stages and view available matatu options.

**What it does:**
- **Origin & destination selectors** (dropdowns populated from `/stages` data)
- **Swap button** to instantly reverse origin ↔ destination
- **Recent journey chips** ("GITHURAI ➔ NGARA", "KASARANI ➔ CBD", "JUJA ➔ ALLSOPPS") that auto-resolve stage UUIDs and fire immediate searches
- **Submit button** ("FIND MY ROUTE ➔") triggering a `GET /journey?from=&to=` call
- **Result cards** rendering each `JourneyOption` from the API response:
  - **Direct route cards**: Route badge with color, SACCO name, fare breakdown (base / peak), and travel time + distance ETA
  - **No direct route callout**: Yellow warning card advising riders to transfer at a corridor hub
- **Map section** showing the highlighted route polyline when "SHOW ROUTE ON MAP ➔" is clicked

**Data sources:** `useStages()`, `useRoutes()`, `useJourney()` → `/journey`

**Handling null states:**
- `fare: null` → Displays "Fare N/A" instead of fare breakdown
- `eta: null` → Displays "ETA N/A" instead of travel time (this occurs when Google Directions API fails server-side)
- `type: "no_direct_route"` → Renders warning callout card instead of a route card

---

### Route Details

**Route:** `/routes/[id]` (dynamic segment)  
**File:** `src/app/routes/[id]/page.jsx`

Displays a detailed metro-map style view of all stages along a specific matatu route.

**What it does:**
- **Route header card** showing route name badge (with API-provided `route.color`), SACCO operator, departure frequency, and fare range
- **Station manifest list** rendered as a vertical metro-map with:
  - Colored connecting line (`route.color`) between stations
  - Start terminus (solid filled dot) and end terminus markers
  - Per-station estimated arrival time and incremental fare
  - **Station search filter** input for quickly finding stations along the route
  - Interactive station selection (clicking a station highlights it with a yellow active state)
- **Ticket cutout footer** displaying a decorative ticket ID and validity timestamp
- **Embedded map** showing the route polyline and all stage markers

**Data sources:** `useRouteDetail(routeId)` → `/routes/:id`

---

### Community Reporting

**Entry point:** Report FAB on the Home page  
**Files:** `src/components/Report/ReportFAB.jsx`, `ReportModal.jsx`, `ReportForm.jsx`

Allows riders to submit crowd, fare, and atmosphere reports for their current matatu.

**What it does:**
- **Floating Action Button** (📢 REPORT) fixed at bottom-right of the Home page
- **Bottom sheet modal** with drag handle, overlay backdrop, and close button
- **Report form** with:
  - Corridor route selector (dropdown)
  - Current stage location selector (dropdown)
  - Fare paid option ("FARE PAID: KES 80")
  - Crowd capacity option ("SITTING ON SEMA — CROWDED")
  - Atmosphere/vibe option ("VIBE: NGANYA — LOUD BASS")
- **Optimistic submission**: Reports are confirmed immediately with a success card ("✅ REPORT RECEIVED! Asante for helping fellow riders.") even when the backend endpoint is not yet implemented
- **Auto-dismiss**: Success notification closes the modal automatically after 2.5 seconds

**Data sources:** `useReport()` → `/reports` (stubbed — backend not yet implemented)

> **Note:** The backend currently has no `/reports` endpoint. The frontend `submitReport()` function in `src/api/reports.js` is a stub that will throw an error, but `useReport()` catches this and still shows optimistic success. When the backend implements the endpoint, the frontend will work without changes.

---

### Offline / PWA Support

**Files:** `public/manifest.json`, `public/sw.js`, `src/components/PWA/PwaRegistration.jsx`, `src/components/PWA/OfflineBanner.jsx`

Enables the app to be installed on mobile home screens and continue functioning during connectivity interruptions.

**What it does:**
- **Web App Manifest** (`manifest.json`) enables "Add to Home Screen" installation on Android/iOS with proper branding (name, icons, theme color `#1c1c17`, standalone display mode)
- **Service Worker** (`sw.js`) implements a network-first caching strategy:
  - Pre-caches static app shell assets on install (`/`, `/journey`, `/manifest.json`, icons)
  - On fetch: tries network first → caches successful responses → falls back to cache on failure → ultimate fallback to cached root page
  - Automatically clears outdated caches on activation
- **PwaRegistration component** registers the service worker on client-side mount
- **OfflineBanner** appears at the top of the screen (below the navbar) when `navigator.onLine === false`, displaying: "⚡ OFFLINE MANIFEST ACTIVE — CACHED CORRIDOR MANIFEST ENABLED"
- Banner automatically disappears when connectivity is restored

**PWA icons:** Place `icon-192x192.png` and `icon-512x512.png` in `public/icons/` for full PWA compliance.

---

### Theme Switching

**Files:** `src/app/providers.jsx`, `src/styles/theme.js`

**What it does:**
- A button in the top app bar labeled "LIGHT MODE" / "DARK MODE" toggles between the Matatu Livery and Night Edition themes
- Theme state is managed via React Context (`ThemeToggleContext`)
- All styled-components automatically re-render with the new theme tokens
- `useThemeToggle()` hook provides `themeMode` (string) and `toggleTheme()` (function) to any component

---

## API Communication Layer

### `src/api/client.js` — Core Fetch Wrapper

All API calls flow through the `apiFetch()` function, which provides:

| Feature | Implementation |
| :--- | :--- |
| **Base URL resolution** | Reads from `NEXT_PUBLIC_API_BASE_URL`, defaults to `http://localhost:4000/api/v1` |
| **Automatic JSON parsing** | Checks `Content-Type` header before parsing |
| **Structured error handling** | Throws `ApiError` with `statusCode`, `message`, `details` (Zod validation), and `isRateLimit` flag |
| **Network error capture** | CORS failures, offline errors, and fetch aborts are caught and wrapped as `ApiError` with `statusCode: 0` |

### Error class: `ApiError`

```javascript
class ApiError extends Error {
  statusCode  // HTTP status (0 for network errors)
  details     // Zod validation field errors (only on 400s), or null
  isRateLimit // true when statusCode === 429
}
```

### Resource modules

| Module | Functions | Backend Endpoints |
| :--- | :--- | :--- |
| `src/api/stages.js` | `getStages()`, `getStageById(id)` | `GET /stages`, `GET /stages/:id` |
| `src/api/routes.js` | `getRoutes()`, `getRouteById(id)` | `GET /routes`, `GET /routes/:id` |
| `src/api/journey.js` | `getFares(from, to)`, `getDirections(from, to)`, `getJourney(from, to)` | `GET /fares`, `GET /directions`, `GET /journey` |
| `src/api/reports.js` | `submitReport(data)` | Stubbed (backend endpoint not yet implemented) |

---

## Custom Hooks Reference

### `useStages()`

Fetches all corridor stages on mount.

```javascript
const { stages, loading, error, refetch } = useStages();
```

| Return | Type | Description |
| :--- | :--- | :--- |
| `stages` | `Stage[]` | Array of stage objects ordered CBD → Juja |
| `loading` | `boolean` | True while the initial fetch is in progress |
| `error` | `ApiError \| null` | Error object if the fetch failed |
| `refetch` | `() => void` | Manually re-fetch stages |

---

### `useRoutes()`

Fetches all matatu routes on mount.

```javascript
const { routes, loading, error, refetch } = useRoutes();
```

| Return | Type | Description |
| :--- | :--- | :--- |
| `routes` | `Route[]` | Array of routes with embedded stage sequences |
| `loading` | `boolean` | True while fetching |
| `error` | `ApiError \| null` | Error if fetch failed |
| `refetch` | `() => void` | Manual re-fetch trigger |

---

### `useRouteDetail(routeId)`

Fetches a single route's full manifest by UUID.

```javascript
const { route, loading, error, refetch } = useRouteDetail(routeId);
```

| Return | Type | Description |
| :--- | :--- | :--- |
| `route` | `Route \| null` | Full route object with stages |
| `loading` | `boolean` | Initializes based on `Boolean(routeId)` to avoid infinite loading states |
| `error` | `ApiError \| null` | Error if fetch failed |
| `refetch` | `() => void` | Triggers re-fetch via internal counter |

**Implementation detail:** Uses an inline async function inside `useEffect` with an `isSubscribed` cancellation flag to prevent race conditions when `routeId` changes rapidly.

---

### `useJourney()`

Executes journey searches between two stages.

```javascript
const { journey, loading, error, fetchJourney, resetJourney } = useJourney();
```

| Return | Type | Description |
| :--- | :--- | :--- |
| `journey` | `JourneyResponse \| null` | Full journey response with `options[]` array |
| `loading` | `boolean` | True while a search is in progress |
| `error` | `ApiError \| null` | Error if search failed |
| `fetchJourney` | `(fromId, toId) => void` | Execute a journey search |
| `resetJourney` | `() => void` | Clear results and errors |

---

### `useReport()`

Manages community report submission with optimistic UI.

```javascript
const { submitting, submitted, error, submit, reset } = useReport();
```

| Return | Type | Description |
| :--- | :--- | :--- |
| `submitting` | `boolean` | True while submission is in progress |
| `submitted` | `boolean` | True after successful (or optimistically accepted) submission |
| `error` | `Error \| null` | Error (currently suppressed for optimistic flow) |
| `submit` | `(reportData) => void` | Submit a report payload |
| `reset` | `() => void` | Reset all state back to initial |

---

## Component Reference

### Map Components (`src/components/Map/`)

| Component | Props | Description |
| :--- | :--- | :--- |
| **MapView** | `stages`, `routes`, `selectedRouteId`, `selectedStageId`, `onSelectRoute`, `onSelectStage` | Main map container. Manages Google Maps SDK script injection with lazy state initialization and event-listener cleanup. Falls back to an interactive SVG corridor map when the API key is missing. |
| **StageMarker** | `stage`, `isSelected`, `onClick` | Renders a stage pin with name label for the fallback map view |
| **RoutePolyline** | `mapInstance`, `googleMaps`, `route`, `isSelected`, `hasActiveSelection`, `onSelectRoute` | Manages a Google Maps Polyline instance with dynamic color, opacity dimming (35% when not selected), and stroke thickening (6px when selected) |

### Journey Components (`src/components/Journey/`)

| Component | Props | Description |
| :--- | :--- | :--- |
| **JourneyPlannerForm** | `stages`, `onSubmit`, `loading` | Form with origin/destination dropdowns, swap button, recent journey chips, and submit CTA. Uses derived state pattern (no `useEffect`) for default stage initialization. |
| **JourneyResultCard** | `option`, `onHighlightRoute` | Renders a direct route card with fare/ETA details, or a yellow warning callout for `no_direct_route` responses |

### Route Detail Components (`src/components/RouteDetail/`)

| Component | Props | Description |
| :--- | :--- | :--- |
| **RouteHeader** | `route` | Persistent header card with route color badge, SACCO operator, frequency, and fare range |
| **StageSequenceList** | `stages`, `routeColor` | Vertical metro-map station list with connecting line, search filter, interactive selection, and ticket footer |
| **RouteDetailView** | `route` | Assembled container integrating RouteHeader, StageSequenceList, and MapView |

### Report Components (`src/components/Report/`)

| Component | Props | Description |
| :--- | :--- | :--- |
| **ReportFAB** | `onClick` | Floating action button ("📢 REPORT") fixed at bottom-right |
| **ReportForm** | `routes`, `stages`, `onSubmit`, `submitting` | Form with route/stage selectors, fare/crowd/vibe options, and submit button |
| **ReportModal** | `isOpen`, `onClose`, `routes`, `stages` | Bottom sheet modal managing open/close state, form rendering, and success confirmation with auto-dismiss |

### PWA Components (`src/components/PWA/`)

| Component | Props | Description |
| :--- | :--- | :--- |
| **PwaRegistration** | _(none)_ | Registers `/sw.js` service worker on client mount |
| **OfflineBanner** | _(none)_ | High-contrast yellow banner shown when device goes offline. Uses lazy state initializer from `navigator.onLine`. |

---

## Testing

### Manual testing checklist

**Home page (`/`):**
- [ ] Route cards render with correct colors from API `route.color`
- [ ] Selecting a route highlights its polyline on the map
- [ ] Deselecting restores default opacity
- [ ] Filter chips toggle visual active state
- [ ] Report FAB opens the report modal
- [ ] Theme toggle switches between light and dark modes

**Journey planner (`/journey`):**
- [ ] Stage dropdowns populate from API data
- [ ] Swap button reverses origin and destination
- [ ] Recent journey chips auto-resolve stages and trigger search
- [ ] Direct route results display with fare and ETA
- [ ] `fare: null` displays "Fare N/A"
- [ ] `eta: null` displays "ETA N/A"
- [ ] `no_direct_route` results display warning callout
- [ ] "SHOW ROUTE ON MAP ➔" highlights route polyline below

**Route details (`/routes/[id]`):**
- [ ] Route header shows correct color badge and SACCO name
- [ ] Station sequence list renders with vertical connecting line
- [ ] Station filter input narrows the list
- [ ] Clicking a station toggles yellow highlight

**Community report (modal on `/`):**
- [ ] FAB opens modal with overlay backdrop
- [ ] Form selectors populate from routes/stages data
- [ ] Submit shows success confirmation card
- [ ] Modal auto-closes after ~2.5 seconds
- [ ] Close button dismisses modal immediately

**PWA & offline:**
- [ ] `manifest.json` is accessible at `/manifest.json`
- [ ] Service worker registers (check DevTools → Application → Service Workers)
- [ ] Toggling airplane mode shows the offline banner
- [ ] Restoring connectivity hides the banner
- [ ] Cached pages load while offline

### Testing the `no_direct_route` state

Because all seeded routes serve all stages, the only way to trigger a `no_direct_route` response with the default seed data is to select a **destination stage with an equal or lower `order` than the origin stage** (i.e. selecting a destination that is the same as or "before" the origin along the corridor).

### Testing the `eta: null` state

Temporarily remove or invalidate the `GOOGLE_MAPS_SERVER_KEY` on the **backend**. The journey service will catch the Directions API failure and return `route` + `fare` with `eta: null`.

---

## Troubleshooting

### All API calls fail with network/CORS errors

**Cause:** The backend's `CORS_ORIGIN` environment variable does not match the frontend's actual origin.

**Fix:** Set `CORS_ORIGIN=http://localhost:3000` (or your frontend's port) in the backend's `.env` file and restart the backend.

### Map shows SVG fallback instead of Google Maps

**Cause:** `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` is either missing, empty, or contains the placeholder text `<your own`.

**Fix:** Set a valid Google Maps JavaScript API key in `apps/frontend/.env.local`. The key must have the Maps JavaScript API and Geometry library enabled.

### "LOADING CORRIDOR DATA..." never resolves

**Cause:** The backend is not running, or `NEXT_PUBLIC_API_BASE_URL` points to the wrong address.

**Fix:** Start the backend (`cd apps/backend && npm run dev`) and verify the URL matches (default: `http://localhost:4000/api/v1`).

### Report submission always shows success even though backend has no endpoint

**This is expected behavior.** The `useReport` hook catches the failed API call and optimistically confirms the submission. When the backend implements the `/reports` endpoint, the frontend will work without code changes.

### React hooks exhaustive-deps warnings

The codebase uses two patterns to avoid synchronous `setState` calls inside `useEffect`:

1. **Lazy state initializers** — `useState(() => computeInitialValue())` for values derived from `window` or `navigator` at mount time
2. **Derived state** — Computing values during render (`const x = selected || fallback`) instead of synchronizing with `useEffect`

If you encounter new instances of this warning, apply the same patterns rather than adding state variables to effect dependency arrays.
