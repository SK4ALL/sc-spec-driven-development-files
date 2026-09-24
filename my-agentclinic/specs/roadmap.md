# Roadmap

Implementation order, in nano-sized phases. Each phase is one small, visible change that can be built, checked, and demoed on its own. Finish one before starting the next.

Every phase that adds or changes UI must be responsive when it ships, following the rules in `tech-stack.md` (Responsive design), and checked at phone, tablet, and desktop widths.

Phases marked ✅ are done; 🟡 means partly done. See the linked feature spec for details.

## Foundation

1. ✅ Install Hono and `@hono/node-server`; a server that returns "Hello, AgentClinic" at `/`. ([spec](2026-09-24-hono-hello-server/))
2. ✅ Add `npm run dev` (tsx watch mode) and a working `npm run build`. ([spec](2026-09-24-dev-and-build/))
3. ✅ Add Vitest with one passing test for `/`. (Done in Phase 1.)
4. ✅ Render `/` with a JSX layout component (HTML shell and title). (Done in Phase 1.)
5. ✅ Serve a static stylesheet from `public/` and apply basic styling. (Done in Phase 1.)
6. 🟡 Add a site header with the AgentClinic name and nav links. (Header and name done in Phase 1; nav links still to do.)
7. ✅ Add a footer. (Done in Phase 1.)

## Database

8. Install better-sqlite3; open `data/agentclinic.db` on startup and git-ignore `data/`.
9. Apply a SQL schema file on startup (starting with an empty `agents` table).
10. Use an in-memory database in tests.

## Agents

11. `/agents` page showing a hard-coded list of agents.
12. Load agents from the `agents` table instead of the hard-coded list.
13. Seed sample agents on startup when the table is empty.
14. `/agents/:id` detail page for a single agent.
15. 404 page for unknown agents.

## Ailments

16. Add an `ailments` table with seed data.
17. `/ailments` page listing ailments.
18. `/ailments/:id` ailment detail page.
19. Add an `agent_ailments` link table with seed data.
20. Show an agent's ailments on the agent detail page.

## Therapies

21. Add a `therapies` table with seed data.
22. `/therapies` page listing therapies.
23. `/therapies/:id` therapy detail page.
24. Add a `therapy_ailments` link table with seed data.
25. Show which ailments a therapy treats, and which therapies treat an ailment.

## Appointments

26. Add an `appointments` table with seed data.
27. `/appointments` page listing appointments (read-only).
28. Booking form page (agent, therapy, date/time); no submit yet.
29. Handle form submit and save the appointment to the database.
30. Validate the booking form and show errors.
31. Confirmation page after booking.
32. Cancel an appointment (mark it cancelled in the database).

## Dashboard

33. `/dashboard` page with counts of agents, ailments, therapies, and appointments.
34. Upcoming appointments on the dashboard.
35. Separate agent and staff views of the dashboard.

## Polish

36. Refine the visual design: colors, typography, spacing.
37. Responsive review: check every page at phone, tablet, and desktop widths, and fix anything that slipped through.
38. Accessibility pass (semantic HTML, labels, contrast).
39. Add playful copy and empty-state messages throughout.
