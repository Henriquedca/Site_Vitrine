---
name: klarhimmel-design
description: Build pages and UI with Klarhimmel UI blocks, components and tokens. Use when adding or changing a page, a section or a component in a project that has components/klarhimmel/, or when asked to use the Klarhimmel design system.
---

# Klarhimmel design

Klarhimmel UI is source in this project, under `components/klarhimmel/`. Build with it; do not build a second version of something it already has.

## Set up and install

Check first: does the project have `components.json` with a `@klarhimmel` entry under `registries`, and `components/klarhimmel/`? If so, skip the setup. Otherwise do it once, exactly as https://ui.klarhimmel.com/get-started/installation.md says:

1. Map `@/*` to `./src/*` in `tsconfig.json` and `tsconfig.app.json` (`compilerOptions.paths`; no `baseUrl`, TypeScript 6 deprecates it) and as a `resolve.alias` in `vite.config.ts` (`npm i -D @types/node`).
2. Create `components.json` with `"registries": { "@klarhimmel": "https://ui.klarhimmel.com/r/{name}.json" }` and the usual `aliases` (`@/components`, `@/lib/utils`, ...). `shadcn init` is not needed, and its style (radix or base) does not matter: Klarhimmel files are copied as written.
3. `npx shadcn add @klarhimmel/<name>`; then in the main CSS, after `@import 'tailwindcss';`, add `@import './components/klarhimmel/theme/theme.css';` (path relative to that file).

An install name is the registry name, listed below, not the URL of its page: `/blocks/faq/accordion` installs `faq-list`, `/blocks/cta/banner` installs `cta-band`. Never guess a name; use this list or the install line printed on the item's page. Check an install with `tsc` and the app's build.

<!-- registry:begin -->
Install names (the part after `@klarhimmel/`), generated from the registry. Where the directory page has another URL than the name, it is in brackets:

- Blocks (193), by category:
  - navbar: `navbar-centered` (page /blocks/navigation/centered), `navbar-menu` (page /blocks/navigation/menu), `navbar-simple` (page /blocks/navigation/simple), `navbar-utility` (page /blocks/navigation/utility)
  - banner: `banner-announcement`, `banner-cookie`, `banner-cta-bar`, `banner-promo`
  - hero: `hero-centered`, `hero-code` (page /blocks/hero/install), `hero-cover`, `hero-frame`, `hero-minimal`, `hero-prompt`, `hero-split`, `hero-terminal`
  - logos: `logos-featured` (page /blocks/logo-cloud/featured), `logos-grid` (page /blocks/logo-cloud/grid), `logos-grouped` (page /blocks/logo-cloud/grouped), `logos-press` (page /blocks/logo-cloud/press), `logos-results` (page /blocks/logo-cloud/results), `logos-strip` (page /blocks/logo-cloud/row)
  - features: `activity-log`, `features-bento`, `features-grid`, `features-list`, `features-split` (page /blocks/features/alternating), `features-tabs`, `features-terminal`
  - steps: `steps-horizontal`, `steps-media`, `steps-numbered`, `steps-timeline`
  - content: `about-timeline` (page /blocks/content/timeline), `content-columns`, `content-legal`, `content-prose`
  - case-study: `case-study-before-after`, `case-study-card`, `case-study-metrics`, `case-study-proof`, `case-study-story`
  - stats: `stats-band`, `stats-bars`, `stats-cards`, `stats-rings`, `stats-row`, `stats-split`
  - testimonials: `testimonial-quote` (page /blocks/testimonials/quote), `testimonials-carousel`, `testimonials-grid`, `testimonials-rating`, `testimonials-split`, `testimonials-wall`
  - pricing: `price-list` (page /blocks/pricing/list), `pricing-comparison`, `pricing-packages`, `pricing-rows`, `pricing-single`, `pricing-tiers`, `pricing-toggle`, `pricing-usage`
  - faq: `faq-centered`, `faq-columns`, `faq-grouped`, `faq-list` (page /blocks/faq/accordion), `faq-rows`, `faq-support`
  - cta: `cta-audiences`, `cta-band` (page /blocks/cta/banner), `cta-card`, `cta-media`, `cta-minimal`, `cta-offer`, `cta-split`
  - newsletter: `newsletter-card`, `newsletter-inline`, `newsletter-split`, `newsletter-topics`
  - contact: `contact-area`, `contact-booking`, `contact-booking-link`, `contact-channels`, `contact-form`, `contact-map`, `contact-minimal`, `contact-offices`
  - team: `team-departments`, `team-featured`, `team-grid`, `team-list`
  - careers: `careers-detail`, `careers-roles`
  - integrations: `integrations-featured`, `integrations-grid`
  - comparison: `comparison-cards`, `comparison-table`
  - download: `download-apps`, `download-desktop`
  - changelog: `changelog-compact`, `changelog-timeline`
  - blog: `blog-cards`, `blog-featured`, `blog-list`, `blog-post`, `related-content` (page /blocks/content/related)
  - gallery: `gallery-featured`, `gallery-grid`, `gallery-masonry`, `gallery-strip`
  - directory: `directory-cards`, `directory-header`, `directory-preview`, `directory-template-info`
  - docs: `docs-anatomy`, `docs-customise`, `docs-do-dont`, `docs-examples`, `docs-header`, `docs-install`, `docs-pager`, `docs-preview-frame`, `docs-prompt`, `docs-props-table`, `docs-related`, `docs-swatches`, `docs-table`
  - app: `app-access-detail`, `app-assistant-approval`, `app-assistant-composer`, `app-assistant-showcase`, `app-assistant-thread`, `app-assistant-tool-call`, `app-auth-code`, `app-auth-reset`, `app-auth-signin`, `app-auth-signup`, `app-billing-invoices`, `app-billing-plan`, `app-boards-kanban`, `app-comments-thread`, `app-dashboard-chart`, `app-dashboard-stats`, `app-data-filters`, `app-data-pagination`, `app-data-table`, `app-files-dropzone`, `app-files-list`, `app-notifications-inbox`, `app-onboarding-checklist`, `app-onboarding-steps`, `app-onboarding-welcome`, `app-operations-summary`, `app-scheduling-calendar`, `app-scheduling-slots`, `app-search-results`, `app-settings-danger`, `app-settings-notifications`, `app-settings-profile`, `app-shell-sidebar`, `app-shell-topbar`, `app-team-invite`, `app-team-members`, `app-team-pending`
  - error: `error-links`, `error-maintenance`, `error-page`, `error-status`
  - review: `review-page-note`, `review-summary`
  - report: `report-audit-modules`, `report-audit-overview`, `report-audit-recommendations`, `report-callout`, `report-decisions`, `report-figure`, `report-header`, `report-prose`, `report-sources`, `report-stats`, `report-steps`, `report-table`, `report-timeline`
  - snapshot: `snapshot-module`, `snapshot-profile`, `snapshot-progress`, `sources-list` (page /blocks/snapshot/sources)
  - footer: `footer-centered`, `footer-columns` (page /blocks/footer/link-columns), `footer-cta`, `footer-simple`, `footer-status`, `footer-wordmark`
- Components (69): `accordion`, `agent-chat`, `alert-dialog`, `answer-form`, `avatar`, `avatar-group`, `badge`, `banner`, `board`, `breadcrumb`, `button`, `calendar`, `card`, `chat-composer`, `checkbox`, `collapsible`, `collection-controls`, `combobox`, `command`, `context-menu`, `copy-button`, `date-picker`, `dialog`, `doc-host`, `doc-page`, `empty-state`, `error-boundary`, `file-field`, `file-type-icon`, `grid-card`, `hover-card`, `icon-button`, `icon-circle`, `input`, `input-group`, `input-otp`, `kbd`, `klarhimmel-mark`, `label`, `menu`, `native-select`, `number-field`, `page-preview-card`, `pagination`, `popover`, `progress`, `radio-group`, `review-bar`, `rich-text-editor`, `score-ring`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `source-note`, `status-dot`, `stepper`, `switch`, `tab-bar`, `table`, `tabs`, `text-link`, `toast`, `toggle`, `toggle-group`, `tooltip`
- Templates (85): `template-saas`, `template-consultancy`, `template-hotel`, `template-agency`, `template-local-service`, `template-event`, `template-app-launch`, `template-restaurant`, `template-saas-pricing`, `template-developer-docs`, `template-nonprofit`, `template-app-dashboard`, `template-b2b-services`, `template-manufacturing`, `template-multi-location`, `template-audit-report`, `template-access-operations`, `template-trades`, `template-accounting`, `template-bakery`, `template-garden-cafe`, `template-yoga-studio`, `template-photographer`, `template-hair-salon`, `template-dental-clinic`, `template-personal-trainer`, `template-florist`, `template-cleaning-service`, `template-tutor`, `template-wedding-venue`, `template-estate-agent`, `template-car-repair`, `template-driving-school`, `template-vet-clinic`, `template-landscape-gardener`, `template-bookshop`, `template-bike-shop`, `template-picture-framer`, `template-pottery-studio`, `template-tailor`, `template-dog-groomer`, `template-guesthouse`, `template-food-truck`, `template-tattoo-studio`, `template-caterer`, `template-phone-repair`, `template-massage-therapist`, `template-dance-school`, `template-brewery-taproom`, `template-locksmith`, `template-veg-box-farm`, `template-climbing-gym`, `template-removals`, `template-surf-school`, `template-optician`, `template-escape-room`, `template-dry-cleaner`, `template-campsite`, `template-dog-walker`, `template-music-teacher`, `template-butcher`, `template-barber`, `template-plant-nursery`, `template-tree-surgeon`, `template-house-painter`, `template-nail-salon`, `template-handyman`, `template-electrician`, `template-pest-control`, `template-physio`, `template-coffee-roaster`, `template-laundromat`, `template-window-cleaner`, `template-bridal-shop`, `template-roofer`, `template-cobbler`, `template-kids-party-venue`, `template-upholsterer`, `template-chimney-sweep`, `template-gelato-shop`, `template-funeral-director`, `template-bike-courier`, `template-wine-shop`, `template-joiner`, `template-swim-school`
- App templates (1), a whole surface with its data shape and mock data: fill its typed data from your source and never write a schema of your own: `template-board` (components/klarhimmel/templates/board/)
- Other: `skill-design` (this file), `theme`, `utils`, `editing`, `block-kit`.
<!-- registry:end -->

## Find the right piece

- Catalogue, one line per item: https://ui.klarhimmel.com/llms.txt. Any page of the directory as Markdown: add `.md` to its URL.
- A page is a stack of **blocks** (`blocks/<name>/`). Each block takes one `props` object, validated by the zod schema in its `spec.ts`. The `defaults` in the spec show realistic copy and every field.
- Add a missing block: `npx shadcn add @klarhimmel/<name>` (a name from the list above). It brings the components, theme and npm packages it needs.
- **Components** (`ui/`) are the primitives, one install name per file. `Textarea` and `Field` are exports of `input`, `ButtonLink` of `button`: install `input` or `button`, then import the name you need.
- A whole starting page: `npx shadcn add @klarhimmel/template-<slug>` puts the page in `components/klarhimmel/templates/`; import its default export, as the template's page shows.

## Share structure before adding components

Find the application's existing shell, content template and content collections
before choosing a catalogue template. A site has one shared navigation, footer,
theme and container system. Change their owner once; page files must not repeat
their markup, configuration or style objects. Navigation and footer links should
read the same product/service records. Active navigation is a page value, not a
different header.

Use four page purposes:

- **Content:** insights, guides, projects/cases, services and other
  reading pages use one content template. Supply a record with title, category,
  metadata, optional introduction/author/cover, body and optional structured content, related
  items or a closing action. Different subjects do not require new templates.
- **Product:** product decisions use one shared product landing template: split
  hero/actions, optional feature grid, explanations, FAQ, related products and
  closing action. Keep product records separate from the reading template,
  without per-product page components.
- **Index:** browse/search/filter a collection inside the same shell, using
  reusable cards or rows. Keep collection-specific behaviour explicit.
- **Task:** complete an action or read its result inside the same shell, such as
  a form, tool, confirmation or error. Keep the interaction focused.

These are purposes, not mandatory framework components for each category. The homepage can
compose an entry experience in the shell. A record's absent optional fields are
omitted; never fill them with invented copy. The template owns heading hierarchy,
reading measure, cover treatment and spacing. Content records own the words,
assets and metadata. Do not create separate article, project, case, service and
templates when the same reading structure fits them. Product pages share their
product layout; they never copy the shell or create a separate layout per product.

The shell owns a responsive starting-space token below navigation; the first
section does not add its own top padding. Full-screen entry/workspace layouts
opt out explicitly. Use `CollectionControls` for search, filters and sort: one
set of native fields, with search visible and options collapsed in a mobile
disclosure below 48rem of the surrounding container. Filtering and URL state
belong to the consuming app, and the unfiltered collection remains readable.

Use `related-content` for other insights, projects, services or products: one
section title and linked items with title, summary, image and destination. Filter
out the current page and omit an empty set. A fully clickable card has one outer
anchor; an action label inside it is text, never a nested anchor.

For a change, try content data first, then the shared template or shell, then an
existing block or primitive. Add a component only for a distinct responsibility
the existing pieces cannot express clearly, and migrate duplicate callers with
it. Avoid one-use wrappers, speculative switches, per-page type scales and
container overrides. The catalogue supports multiple applications: an unused
variant in one site is not enough reason to remove a library component.

Keep only maintained pages in the active route collection. Preserve retired
destinations as redirect data and archive their old implementations outside the
source graph. Restoring a page reuses the current shell/template instead of
restoring a copied layout.

## Page prompts

Each prompt names blocks, installation, props, copy and accessibility notes, and a
checklist. Use these as starting compositions. In an existing application, adapt
the relevant body into its shared shell and template instead of installing a
second navigation, footer or page family. Read the relevant prompt at
`https://ui.klarhimmel.com/agent/prompts/<slug>` (add `.md` for Markdown).

Whole pages:
- `/agent/prompts/landing-page`: Landing page
- `/agent/prompts/pricing-page`: Pricing page
- `/agent/prompts/saas-template`: SaaS template
- `/agent/prompts/consultancy-template`: Consultancy template
- `/agent/prompts/hotel-template`: Hotel template
- `/agent/prompts/agency-template`: Agency template
- `/agent/prompts/local-service-template`: Local service template
- `/agent/prompts/event-template`: Event template
- `/agent/prompts/app-launch-template`: App launch template
- `/agent/prompts/restaurant-template`: Restaurant template
- `/agent/prompts/saas-pricing-template`: SaaS pricing template
- `/agent/prompts/developer-docs-template`: Developer docs template
- `/agent/prompts/nonprofit-template`: Nonprofit template
- `/agent/prompts/app-dashboard-template`: App dashboard template
- `/agent/prompts/b2b-services-template`: B2B services firm template
- `/agent/prompts/manufacturing-template`: Product and manufacturing company template
- `/agent/prompts/multi-location-template`: Multi-location local service template
- `/agent/prompts/bakery-template`: Bakery template
- `/agent/prompts/trades-template`: Trades template
- `/agent/prompts/yoga-studio-template`: Yoga studio template
- `/agent/prompts/photographer-template`: Photographer template
- `/agent/prompts/accounting-template`: Accounting firm template
- `/agent/prompts/garden-cafe-template`: Garden café template
- `/agent/prompts/hair-salon-template`: Hair salon template
- `/agent/prompts/dental-clinic-template`: Dental clinic template
- `/agent/prompts/personal-trainer-template`: Personal trainer template
- `/agent/prompts/florist-template`: Florist template
- `/agent/prompts/cleaning-service-template`: Cleaning service template
- `/agent/prompts/tutor-template`: Tutor template
- `/agent/prompts/wedding-venue-template`: Wedding venue template
- `/agent/prompts/estate-agent-template`: Estate agent template
- `/agent/prompts/car-repair-template`: Car repair garage template
- `/agent/prompts/driving-school-template`: Driving school template
- `/agent/prompts/vet-clinic-template`: Vet clinic template
- `/agent/prompts/landscape-gardener-template`: Landscape gardener template
- `/agent/prompts/bookshop-template`: Bookshop template
- `/agent/prompts/bike-shop-template`: Bike shop template
- `/agent/prompts/picture-framer-template`: Picture framer template
- `/agent/prompts/pottery-studio-template`: Pottery studio template
- `/agent/prompts/tailor-template`: Tailor and alterations template
- `/agent/prompts/dog-groomer-template`: Dog groomer template
- `/agent/prompts/guesthouse-template`: B&B guesthouse template
- `/agent/prompts/food-truck-template`: Food truck template
- `/agent/prompts/tattoo-studio-template`: Tattoo studio template
- `/agent/prompts/caterer-template`: Caterer template
- `/agent/prompts/phone-repair-template`: Phone repair template
- `/agent/prompts/massage-therapist-template`: Massage therapist template
- `/agent/prompts/dance-school-template`: Dance school template
- `/agent/prompts/brewery-taproom-template`: Brewery taproom template
- `/agent/prompts/locksmith-template`: Locksmith template
- `/agent/prompts/veg-box-farm-template`: Vegetable box farm template
- `/agent/prompts/climbing-gym-template`: Climbing gym template
- `/agent/prompts/removals-template`: House removals template
- `/agent/prompts/surf-school-template`: Surf school template
- `/agent/prompts/optician-template`: Optician template
- `/agent/prompts/escape-room-template`: Escape room template
- `/agent/prompts/dry-cleaner-template`: Dry cleaner template
- `/agent/prompts/campsite-template`: Campsite template
- `/agent/prompts/dog-walker-template`: Dog walker template
- `/agent/prompts/music-teacher-template`: Music teacher template
- `/agent/prompts/butcher-template`: Butcher template
- `/agent/prompts/barber-template`: Barber template
- `/agent/prompts/plant-nursery-template`: Plant nursery template
- `/agent/prompts/tree-surgeon-template`: Tree surgeon template
- `/agent/prompts/house-painter-template`: House painter template
- `/agent/prompts/nail-salon-template`: Nail salon template
- `/agent/prompts/handyman-template`: Handyman template
- `/agent/prompts/electrician-template`: Electrician template
- `/agent/prompts/pest-control-template`: Pest control template
- `/agent/prompts/physio-template`: Physiotherapy practice template
- `/agent/prompts/coffee-roaster-template`: Coffee roaster template
- `/agent/prompts/laundromat-template`: Laundromat template
- `/agent/prompts/window-cleaner-template`: Window cleaner template
- `/agent/prompts/bridal-shop-template`: Bridal shop template
- `/agent/prompts/roofer-template`: Roofer template
- `/agent/prompts/cobbler-template`: Cobbler template
- `/agent/prompts/kids-party-venue-template`: Kids' party venue template
- `/agent/prompts/upholsterer-template`: Upholsterer template
- `/agent/prompts/chimney-sweep-template`: Chimney sweep template
- `/agent/prompts/gelato-shop-template`: Gelato shop template
- `/agent/prompts/funeral-director-template`: Funeral director template
- `/agent/prompts/bike-courier-template`: Bike courier template
- `/agent/prompts/wine-shop-template`: Wine shop template
- `/agent/prompts/joiner-template`: Joiner template
- `/agent/prompts/swim-school-template`: Swim school template

- `/agent/prompts/audit-report-template`: Website audit report
- `/agent/prompts/access-operations-template`: Reception and access

Sections (one per block category):
- `/agent/prompts/navigation-section`: Navigation
- `/agent/prompts/banner-section`: Banner
- `/agent/prompts/hero-section`: Hero
- `/agent/prompts/logo-cloud-section`: Logo cloud
- `/agent/prompts/features-section`: Features
- `/agent/prompts/steps-section`: Steps
- `/agent/prompts/stats-section`: Stats
- `/agent/prompts/testimonials-section`: Testimonials
- `/agent/prompts/pricing-section`: Pricing
- `/agent/prompts/faq-section`: FAQ
- `/agent/prompts/cta-section`: Call to action
- `/agent/prompts/newsletter-section`: Newsletter
- `/agent/prompts/contact-section`: Contact
- `/agent/prompts/team-section`: Team
- `/agent/prompts/blog-section`: Blog
- `/agent/prompts/gallery-section`: Gallery
- `/agent/prompts/case-study-section`: Case study
- `/agent/prompts/footer-section`: Footer
- `/agent/prompts/content-section`: Content
- `/agent/prompts/error-section`: Error
- `/agent/prompts/review-section`: Review
- `/agent/prompts/report-section`: Report
- `/agent/prompts/snapshot-section`: Snapshot
- `/agent/prompts/download-section`: Download
- `/agent/prompts/comparison-section`: Comparison
- `/agent/prompts/careers-section`: Careers
- `/agent/prompts/changelog-section`: Changelog
- `/agent/prompts/integrations-section`: Integrations

App screens:
- `/agent/prompts/app-operations-section`: Operations screens
- `/agent/prompts/app-assistant-section`: Assistant screens
- `/agent/prompts/app-settings-section`: Settings screens
- `/agent/prompts/app-data-section`: Data screens
- `/agent/prompts/app-dashboard-section`: Dashboard screens
- `/agent/prompts/app-onboarding-section`: Onboarding screens
- `/agent/prompts/app-billing-section`: Billing screens
- `/agent/prompts/app-shell-section`: App shell
- `/agent/prompts/app-team-section`: Team screens
- `/agent/prompts/app-notifications-section`: Notification screens
- `/agent/prompts/app-files-section`: File screens
- `/agent/prompts/app-comments-section`: Comment screens
- `/agent/prompts/app-auth-section`: Authentication screens
- `/agent/prompts/app-scheduling-section`: Scheduling screens
- `/agent/prompts/app-boards-section`: Board screens
- `/agent/prompts/app-search-section`: Search screens

## Agent chat

Any chat with an assistant or an agent uses the agent chat kit, never a hand-built input or message list: `ChatStart`
(empty: greeting, composer, suggestion rows), `ChatThread` (scroll area, composer docked, newest message to the top, an
arrow to the bottom), `ChatMessage` (the person's message a bubble on the right; the reply plain rich text),
`MessageActions`, `ChatLoader` (dots, no words) and `ChatComposer` (the pill: + menu, model pill, mic, send that turns
into stop). No avatars, names, day dividers, hint lines or starter chips on the composer. Page: `/components/agent-chat`.

## Render through the shared shell

The application shell owns `Theme`. Define it once and reuse it for each route;
the fragment below illustrates that owner's composition, not markup to copy into
every page. Content routes pass records to the shared content template.

```tsx
import { Theme } from '@/components/klarhimmel/theme/style';
import { BlockSurface } from '@/components/klarhimmel/blocks/surface';
import Hero from '@/components/klarhimmel/blocks/hero-split';

<Theme theme="brand" mode="system">
  <BlockSurface><Hero props={{ ...props }} /></BlockSurface>
  <BlockSurface tone="muted">…</BlockSurface>
</Theme>
```

- One rendered `Theme`, navigation, main landmark and footer per page, supplied by the shared shell. Section rhythm comes from tones: `default`, `muted`, `inverse`, `accent`. Use inverse or accent sparingly, such as for a closing call to action.
- Compose only sections the page needs. A catalogue landing-page example does not require adding proof, pricing, FAQ or testimonials when the content does not support them.
- Exactly one h1 per page. Heroes, `docs-header`, `blog-post` and `error-page` carry it; every other block starts at h2.

## Props

- Text fields have a maximum length in the schema. If copy does not fit, shorten the copy; never widen the schema.
- An empty string means "not rendered". Optional links with an empty label render nothing.
- Links are `{ label, href }`, images `{ src, alt }`. Write real alt text.
- Icons are names from a fixed set (zap, shield, layers, globe, sparkles, clock, code, palette, lock, chart, users, mail, heart, rocket, search, settings, check, star, book, box, cloud, compass, leaf, gauge).

## Behaviour

- Blocks never fetch, navigate or store anything. Forms cancel their own submit: listen for `submit` on the form and do the work in the page. A form's optional `action` prop is where the visitor lands after your handler succeeds.
- The navbar reports `kh:search` and `kh:theme-toggle` as DOM events. Theme handles the toggle.

## Styling your own code

- Use the tokens, never raw colours: `bg-kh-canvas`, `bg-kh-surface`, `text-kh-ink`, `text-kh-muted`, `border-kh-line`, `bg-kh-accent`, `text-kh-accent-fg`, `text-kh-danger`.
- Type: `text-kh-caption`, `text-kh-small`, `text-kh-body`, `text-kh-lead`, `text-kh-heading`, `text-kh-title`, `text-kh-display`. Radius: `rounded-kh-sm`, `rounded-kh`, `rounded-kh-lg`, `rounded-kh-xl`. Shadows `shadow-kh-1..3`, rarely.
- Responsive with container queries (`@md:`, `@3xl:`), not viewport breakpoints, so a section works in any width.
- No `dark:` variants: tokens switch with the mode.

## Rules

- One primary action per view. Buttons say what happens: "Save changes", not "Submit".
- Targets at least 44 px (`min-h-11`), a visible focus ring, a label on every control.
- Plain words, short sentences. No client names or real people in example copy.
- A shared shell/template change is checked on representative content, index and task routes: phone and desktop, light and dark, long titles, missing optional sections, keyboard focus, loaded images and no overflow or nested links. Run the application's existing build and route checks. Add tests for behaviour that can regress, not copies of the implementation.
- Update source owners, then regenerate output. Do not edit built pages or copy old exports over a shared implementation.

## Brand and application boundaries

Marketing at `klarhimmel.com` and the library at `ui.klarhimmel.com` share the
same package and brand identity. Internal apps use `@klarhimmel/ui/brand`;
a source-owned registry install ships the same identity at
`@/components/klarhimmel/theme/brand`. Each application owns exactly
one shell and its navigation/footer configuration. Marketing has the product
page `/products/ui/`; documentation, Markdown twins and the registry live at
the library origin root. Do not copy marketing's menus or booking funnel into
documentation, or bundle the documentation build into a marketing release.

App blocks (`app-*`) on an app screen fit the panel on their own inside
`SidebarLayout` (its content is a panel); elsewhere wrap them in `<InPanel>`
(from `@klarhimmel/ui`). Either takes away the page band's padding, the page
column and gutter, and steps the block's header down to the in-app heading
size under the screen's h1. A page band (`Block`, `BlockSurface`) stays a page. Never strip a block's spacing with class overrides
(`[&_section]:py-0`); see /app/settings/in-a-panel.
