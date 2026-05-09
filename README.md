# HHMCore LMS — Frontend

> University Learning Management System — Angular 21 frontend.
> Built as a portfolio project. Backend repository linked below.

---

## Overview

HHMCore LMS is a University Learning Management System designed for admins, teachers, and students. This repository contains the Angular frontend — a desktop-first admin dashboard and role-based UI built with a custom SCSS design system.

The backend is a separate ASP.NET Core 8 Web API project. This frontend connects to it via REST after each module is UI-approved.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 — standalone components |
| UI Library | PrimeNG 17 + PrimeFlex + PrimeIcons |
| Styling | Custom SCSS design system |
| Theme | Midnight Scholar — Prussian Blue `#14213d` + Orange `#fca311` |
| Typography | Poppins (headings) + Inter (body) |
| Architecture | OOCSS + SMACSS — base, layout, module, state |

---

## Design System

Built on a custom SCSS token system with three global files:

- `variables.scss` — colors, spacing, typography, shadows, breakpoints, z-index scale
- `mixins.scss` — responsive helpers, flexbox utilities, button and card patterns, animation mixins
- `animations.scss` — keyframes and utility animation classes with reduced-motion support

**Color palette:**

```
Prussian Blue  #14213d   →  sidebar, navbar, dark surfaces
Orange         #fca311   →  active states, primary buttons, highlights
White          #ffffff   →  card backgrounds
Grey           #e5e5e5   →  page background
```

---

## Features (in progress)

### Admin Dashboard
- Overview — stat cards for Students, Teachers, Departments, Courses, Semesters, Rooms
- Department management — list, create, edit, soft delete
- Course management
- Teacher management
- Student management
- Designation, Building, Room, Time Slot management
- Semester and Course Assignment (timetable)

### Coming Soon
- Enrollment
- Attendance
- Grading (Assignments + Quizzes)
- Fee Management

---

## Project Structure

```
src/
├── app/
│   ├── core/              ← guards, interceptors, services
│   ├── features/          ← one folder per module (dashboard, departments, etc.)
│   └── shared/            ← shared components, pipes, directives
├── styles/
│   ├── base/              ← reset, typography
│   ├── layout/            ← sidebar, navbar, grid
│   ├── modules/           ← cards, buttons, tables, badges
│   ├── utilities/         ← animations
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── main.scss
└── assets/
```

---

## Backend

This frontend connects to the HHMCore LMS ASP.NET Core 8 Web API.

> Backend repository: *(link to be added)*

**API base:** `http://localhost:5000/api`

Angular connects to a module only after its backend passes full Swagger testing. No module is connected speculatively.

---

## Status

| Module | Backend | Frontend |
|---|---|---|
| Auth + Login | ✅ Complete | 🔄 In progress |
| Departments | ✅ Complete | 🔄 In progress |
| Courses | ✅ Complete | 🔄 In progress |
| Teachers | ✅ Complete | 🔄 In progress |
| Students | ✅ Complete | 🔄 In progress |
| Designations | ✅ Complete | 🔄 In progress |
| Buildings | ✅ Complete | 🔄 In progress |
| Rooms | ✅ Complete | 🔄 In progress |
| Time Slots | ✅ Complete | 🔄 In progress |
| Semesters | ✅ Complete | 🔄 In progress |
| Course Assignments | ✅ Complete | 🔄 In progress |
| Enrollment | ⬜ Planned | ⬜ Planned |
| Attendance | ⬜ Planned | ⬜ Planned |
| Grading | ⬜ Planned | ⬜ Planned |
| Fee Management | ⬜ Planned | ⬜ Planned |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
ng serve

# Build for production
ng build --configuration production
```

Angular dev server runs on `http://localhost:4200` by default.
Make sure the backend API is running before connecting any module.

---

## Design Decisions

**Desktop-first** — This is a University Management System used on desktop PCs by admins and staff. Base styles target 1280px–1920px. Breakpoints are added only when layouts actually break, not speculatively.

**Standalone components** — Every component uses Angular 21 standalone architecture. No NgModules.

**Dummy data first** — Each module UI is built and approved with dummy data before connecting to the real API. This keeps design and data concerns separate.

**No `!important`** — Specificity is handled correctly from the start. If a patch requires `!important`, the selector structure is wrong.

---

*This README will be updated as modules are completed.*
