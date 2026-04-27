# HealthPortal — User Management Panel

A production-ready user management dashboard built for a healthcare organization. The application allows administrators to view, add, edit, and delete system users while managing their roles and permissions through a clean, accessible interface.

---

## Live Demo

[https://https://user-management-panel-eight.vercel.app/](https://https://user-management-panel-eight.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Naming & Code Standards](#naming--code-standards)
- [State Management](#state-management)
- [Component Architecture](#component-architecture)
- [Accessibility](#accessibility)
- [Mock API](#mock-api)
- [Performance Optimizations](#performance-optimizations)
- [Available Scripts](#available-scripts)
- [Time Note](#time-note)

---

## Overview

### Features

- **User listing** with paginated table view
- **Add user** with full form validation
- **Edit user** — update role and permissions inline
- **Delete user** with confirmation dialog
- **Search** by name with debounced input (400ms)
- **Filter** by role (Admin / Doctor / Patient)
- **Permissions** — assign one or more permissions per user
- **Stats bar** — live summary of total users by role
- **Loading / Empty / Error** states for all async operations
- **Fully accessible** — ARIA labels, roles, live regions, keyboard navigation

---

## Tech Stack

| Layer            | Technology            | Reason                                     |
| ---------------- | --------------------- | ------------------------------------------ |
| Framework        | React 18 + TypeScript | Type safety, component model, strict mode  |
| Build Tool       | Vite                  | Fast HMR, ESM-native, optimized builds     |
| State Management | Redux Toolkit         | Scalable, devtools support, built-in Immer |
| Styling          | Tailwind CSS v3       | Utility-first, consistent design tokens    |
| Headless UI      | @headlessui/react     | Accessible Listbox, Dialog, Transition     |
| Icons            | @heroicons/react      | Consistent icon set, tree-shakable         |
| ID Generation    | uuid                  | RFC-compliant unique IDs for mock data     |

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/btarcan/user-management-panel.git
cd user-management-panel

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── types/
│   └── index.ts                  # All shared TypeScript types and interfaces
│
├── utils/
│   ├── constants.ts              # ROLES, PERMISSIONS, color maps, page size options
│   └── helpers.ts                # generateId, formatDate, sleep, normalizeString
│
├── services/
│   ├── initialData.ts            # Seed data — 12 mock users
│   └── fakeApi.ts                # Promise-based mock API with simulated delay
│
├── store/
│   ├── index.ts                  # configureStore, RootState, AppDispatch exports
│   └── hooks.ts                  # Pre-typed useAppDispatch and useAppSelector
│
├── features/
│   └── users/
│       ├── usersSlice.ts         # Slice — state shape, reducers, async thunks
│       └── usersSelectors.ts     # Memoized selectors via createSelector
│
├── hooks/
│   ├── useDebounce.ts            # Generic debounce hook
│   ├── useUserFilters.ts         # Search + role filter state and handlers
│   ├── useUserModal.ts           # Modal open/close/mode state
│   ├── useUserForm.ts            # Form values, validation, submit logic
│   ├── usePagination.ts          # Page navigation, page size, derived values
│   └── index.ts                  # Barrel export
│
├── components/
│   ├── ui/                       # Base design system components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   │
│   ├── users/                    # Feature-specific components
│   │   ├── UserTable.tsx
│   │   ├── UserFilters.tsx
│   │   ├── UserForm.tsx
│   │   ├── DeleteConfirmDialog.tsx
│   │   ├── Pagination.tsx
│   │   ├── StatsBar.tsx
│   │   └── index.ts
│   │
│   └── layout/
│       ├── Header.tsx
│       └── index.ts
│
├── pages/
│   ├── UsersPage.tsx             # Page-level orchestration component
│   └── index.ts
│
├── App.tsx                       # App shell — layout, routing placeholder
├── main.tsx                      # Entry point — React root + Redux Provider
└── index.css                     # Tailwind directives + global base styles
```

---

## Architecture & Design Decisions

### Why Redux Toolkit over Context API?

The case explicitly lists both options. Redux Toolkit was chosen for the following reasons:

- **Scalability** — the panel is described as a module to be integrated into a larger health portal. Redux scales naturally with additional slices (appointments, records, notifications) without prop drilling or context nesting.
- **DevTools** — Redux DevTools provide time-travel debugging and action inspection, which is valuable in a professional development workflow.
- **Memoized selectors** — `createSelector` from Reselect (bundled with RTK) avoids unnecessary re-renders by caching derived state computations.
- **Async handling** — `createAsyncThunk` provides consistent `pending / fulfilled / rejected` lifecycle management with no boilerplate.
- Context API + useReducer would be appropriate for smaller, self-contained features. For a panel intended to grow into a portal, Redux is the more sustainable choice.

### Why Headless UI?

Headless UI provides fully accessible, unstyled primitives (Dialog, Listbox, Transition) that integrate seamlessly with Tailwind. This means we get ARIA compliance and keyboard navigation for free without fighting against an opinionated component library's styles.

### Folder Structure Philosophy

The structure follows a **feature-first, then layer** approach:

- `features/users/` owns everything specific to the users domain — slice, selectors, and thunks.
- `components/ui/` is a domain-agnostic design system — no business logic, pure presentation.
- `components/users/` are feature components — they consume hooks and selectors but do not dispatch directly where possible.
- `hooks/` encapsulates all stateful logic — components stay declarative and easy to test.
- `pages/` handles route-level orchestration — side effects (initial fetch), modal coordination, delete flow.

This separation means that if the app later moves to a multi-page architecture with React Router, each page is already self-contained.

---

## Naming & Code Standards

### File & Folder Naming

| Type           | Convention                                    | Example                  |
| -------------- | --------------------------------------------- | ------------------------ |
| Components     | PascalCase                                    | `UserTable.tsx`          |
| Hooks          | camelCase with `use` prefix                   | `useUserForm.ts`         |
| Utilities      | camelCase                                     | `helpers.ts`             |
| Constants      | camelCase file, SCREAMING_SNAKE values        | `constants.ts` → `ROLES` |
| Types          | PascalCase interfaces, camelCase type aliases | `UserFormValues`, `Role` |
| Barrel exports | `index.ts` in every layer                     | `components/ui/index.ts` |

**Reasoning:** PascalCase for components matches React's JSX convention and makes component files immediately recognizable. camelCase for hooks and utils follows standard JavaScript conventions. Barrel exports via `index.ts` keep imports clean and allow internal refactoring without touching consumers.

### Import Paths

Path aliases are configured for all source layers:

```ts
import { Button } from '@components/ui';
import { useUserForm } from '@hooks/useUserForm';
import { fakeApi } from '@services/fakeApi';
import type { User } from '@/types';
```

Relative imports (`../../`) are avoided entirely to prevent fragile import chains as the project grows.

### TypeScript Standards

- `strict: true` with `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`
- All function return types are explicit
- `interface` for object shapes, `type` for unions and primitives
- `as const` for immutable arrays (e.g. `PAGE_SIZE_OPTIONS`)
- No `any` — `unknown` with type narrowing where needed

### Commit Message Format

Commits follow the **Conventional Commits** specification:

```
<type>: <short description>

Types: feat | fix | refactor | style | docs | chore | test
```

Examples:

```
feat: add reusable UI components
fix: resolve circular dependency in usersSelectors
docs: add comprehensive README
```

---

## State Management

### Slice Structure

```
store/
  users: {
    items: User[]                         # Source of truth — all users
    status: idle | loading | succeeded | failed
    error: string | null
    filters: { search, role }             # Active filter values
    pagination: { currentPage, pageSize } # Pagination state
    modal: { mode, selectedUser }         # UI state for add/edit modal
  }
```

### Why UI state (modal, filters) lives in Redux

Filters and pagination are tightly coupled to the data they affect. Keeping them in the same slice means:

- A filter change automatically triggers a selector recomputation.
- Pagination resets to page 1 on filter change — this is handled as a reducer side effect, not in the component.
- The entire UI state is serializable and inspectable in DevTools.

### Selector Strategy

All derived state is computed in `usersSelectors.ts` using `createSelector`:

```
selectAllUsers
  └── selectFilteredUsers (search + role filter applied)
        ├── selectFilteredUsersCount
        ├── selectPaginatedUsers (slice by currentPage + pageSize)
        └── selectTotalPages
```

Selectors are memoized — they only recompute when their inputs change. This prevents the table from re-rendering when unrelated state updates occur.

---

## Component Architecture

### Design System (`components/ui/`)

Base components are fully generic with no business logic:

- **Button** — variants (primary, secondary, danger, ghost), sizes, loading state, icon slots
- **Input** — label, error, hint, icon slots, full ARIA support
- **Select** — generic `<T extends string>` type parameter, built on Headless UI Listbox
- **Badge** — role-colored and permission-colored variants
- **Modal** — built on Headless UI Dialog with backdrop blur and scale transition
- **Spinner** — accessible loading indicator with `role="status"`
- **EmptyState** — reusable empty/error feedback with icon, title, description, action slot

### Feature Components (`components/users/`)

Feature components consume hooks and selectors:

- **UserTable** — renders paginated rows, memoized `UserRow` sub-component
- **UserFilters** — search input + role select + reset button
- **UserForm** — add/edit form with validation, permission checkboxes
- **DeleteConfirmDialog** — destructive action confirmation
- **Pagination** — page navigation, page number buttons, page size selector
- **StatsBar** — live role-breakdown summary cards

### Custom Hooks

All stateful logic is extracted from components into hooks:

- **useDebounce** — delays value propagation to avoid over-fetching
- **useUserFilters** — wraps filter dispatch and selector reads
- **useUserModal** — wraps modal open/close dispatch
- **useUserForm** — manages form values, validation, and submit dispatch
- **usePagination** — wraps pagination dispatch and selector reads

---

## Accessibility

Accessibility is treated as a first-class concern throughout the application:

- All form inputs have associated `<label>` elements via `htmlFor`
- Required fields are marked with `aria-required` and a visual `*` indicator
- Error messages use `role="alert"` and `aria-describedby` to associate with inputs
- Empty and loading states use `role="status"` and `aria-live="polite"`
- Destructive API errors use `aria-live="assertive"`
- The table has `aria-label` and semantic `<thead>` / `<th scope="col">` markup
- Modal close button has explicit `aria-label="Close modal"`
- Pagination buttons have `aria-label` and `aria-current="page"` on active page
- Filter indicator uses `aria-live="polite"` for screen reader announcements
- All icon-only elements have `aria-hidden="true"` to prevent redundant announcements
- Focus ring is globally defined with `:focus-visible` — keyboard users always see focus state
- Headless UI Dialog traps focus within the modal while open and restores it on close

---

## Mock API

The application uses an in-memory mock API (`src/services/fakeApi.ts`) that simulates real backend behavior:

- **Simulated network delay** — 600ms on all operations
- **Duplicate name validation** — case-insensitive check on add and update
- **Immutable updates** — the internal database array is never mutated directly
- **Consistent response shape** — all methods return `ApiResponse<T>` with `success`, `data`, and `message`
- **Seed on init** — `fakeApi.seedUsers()` is called once in the `fetchUsers` thunk

To switch to a real API in the future, only `fakeApi.ts` needs to be replaced. The thunks, selectors, and components are fully decoupled from the data source.

---

## Performance Optimizations

- **Memoized selectors** — `createSelector` prevents redundant recomputations of filtered and paginated lists
- **Pagination** — only the current page slice is rendered, not the full user list
- **Debounced search** — 400ms debounce on search input prevents selector recomputation on every keystroke
- **Memoized row component** — `UserRow` is wrapped in `React.memo` to prevent re-renders when sibling rows change
- **`useCallback`** — all event handlers in hooks and pages are memoized to maintain stable references
- **Code splitting** — Vite `manualChunks` splits React, Redux, and Headless UI into separate vendor chunks for optimal caching
- **`forwardRef`** — Button and Input use `forwardRef` for composability without breaking ref forwarding

---

## Available Scripts

```bash
# Start development server at localhost:3000
npm run dev

# Type-check without emitting
npm run tsc

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Time Note

Total development time: **~7–8 hours**

Breakdown:

- Project setup, config, TypeScript, aliases — ~30 min
- Types, constants, helpers, mock API — ~60 min
- Redux store, slice, thunks, selectors — ~60 min
- Reusable UI components — ~90 min
- Custom hooks — ~45 min
- Feature components — ~60 min
- Page, layout, App shell — ~30 min
- README — ~60 min
