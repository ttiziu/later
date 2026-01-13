# Later

A minimal, local-first task manager focused on fast capture and clarity.

Built for developers who want to write things down now and organize later.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)

---

## Why Later?

Most task apps force you to organize before you think.

Later is designed around a simple idea:

> Capture first. Organize when you're ready.

No friction. No accounts. No complexity.

---

## Features

- Inbox-first workflow for quick capture  
- Multiple task lists  
- Inline list name editing  
- Move tasks between lists  
- Reorder tasks within a list  
- Task completion with visual feedback  
- Dark / light theme support  
- Local-first persistence (LocalStorage)  
- Fully responsive layout  

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Animations:** Motion + tw-animate-css  
- **UI Primitives:** Radix UI  
- **Theme management:** next-themes  

---

## Architecture Notes

- Local-first by default (no backend, no auth)
- Tasks and lists are stored in LocalStorage
- Designed to support future sync (GitHub auth + Supabase)
- Minimal global CSS, Tailwind-first approach

---

## License

MIT © 2026 Jherry Paolo Visalot Girón
