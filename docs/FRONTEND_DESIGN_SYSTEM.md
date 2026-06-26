You are the lead frontend engineer and product designer for UstoHub, a production-level home repair marketplace built with Django.

Your task is to COMPLETELY REBUILD THE ENTIRE FRONTEND FROM ZERO.

The current frontend design is rejected. Do not preserve it, lightly restyle it, improve it incrementally, or use it as a visual reference. Replace its visual language, page structure, components, spacing, typography, colors, and responsive behavior completely.

This is not a small redesign.
This is a full frontend reconstruction.

==================================================

1. NON-NEGOTIABLE BACKEND BOUNDARY
   ==================================================

The backend is already being developed separately.

You must NOT modify backend behavior under any circumstances.

You may inspect backend files in read-only mode only to understand:

- existing URL names and routes;
- template context variables;
- authentication state;
- form field names;
- model data exposed to templates;
- API endpoints;
- expected POST values;
- user roles;
- email verification flow;
- existing business rules.

You are strictly forbidden from modifying:

- Python files;
- models;
- views;
- serializers;
- forms.py;
- urls.py;
- settings.py;
- admin.py;
- middleware;
- migrations;
- database files;
- authentication logic;
- email verification logic;
- permissions;
- API response formats;
- backend validation;
- business logic;
- environment variables;
- database schemas.

Do not run or create migrations.

Do not rename backend fields.

Do not change form field names.

Do not change URL names.

Do not change endpoint paths.

Do not change user-type values.

Do not replace backend validation with frontend-only validation.

Frontend files are allowed to be changed, including:

- Django HTML templates;
- template partials;
- base templates;
- static CSS files;
- static JavaScript files;
- frontend images and icons;
- frontend build configuration, only if one already exists;
- package.json, only when genuinely required for frontend dependencies.

Django templates count as frontend files even when they are located inside application directories.

Before changing anything, inspect the project structure and identify the frontend/backend boundary correctly.

After that, execute the implementation. Do not stop after writing a plan.

==================================================
2. PROJECT DEFINITION
=====================

Product name: UstoHub

UstoHub is not a simple directory of repair workers.

It is a complete home-repair marketplace and repair-management platform.

The intended product flow is:

1. A customer describes a household problem.
2. The customer uploads photos or videos.
3. The platform helps determine whether the problem can be solved independently or requires a professional.
4. Verified professionals can respond with offers.
5. The customer compares professionals, ratings, prices, and availability.
6. The customer selects a professional and books a visit.
7. The price and scope of work can be confirmed.
8. The repair process can be tracked.
9. Before-and-after evidence can be recorded.
10. The completed work can include a warranty.
11. Customers can leave reviews.
12. Professionals can manage requests, orders, schedules, profiles, and earnings.

The current implementation may not support every feature yet.

Do not invent or modify backend functionality.

Build the visual system and frontend architecture so the product can grow into this complete platform.

Use real backend data when it exists.

When data does not exist, display a professional empty state instead of fake production data.

==================================================
3. LANGUAGE REQUIREMENT
=======================

Build the current version entirely in English.

Do not add Tajik or Russian text yet.

The website will support three languages later, so keep the frontend easy to internationalize:

- avoid repeating the same visible string across many templates;
- use reusable partials and components;
- keep labels and navigation terminology consistent;
- do not implement backend translation logic;
- do not modify Django internationalization settings;
- do not add a language switcher unless one already works through the backend.

All user-facing English must sound natural, concise, and professional.

Use “Professional” in the English interface instead of awkwardly calling service providers “Masters”.

However, preserve existing backend values such as:

- customer
- master

For example, an HTML form may display “Professional” while still submitting the existing backend value “master”.

==================================================
4. PRIMARY DESIGN DIRECTION
===========================

The required visual style is:

INDUSTRIAL PREMIUM MARKETPLACE

It must combine three qualities:

1. Trustworthiness:
   The precision, clarity, and stability of a modern financial platform.
2. Strength and speed:
   The practical confidence of a professional home-repair company.
3. Technology:
   The usability and refinement of a modern startup product.

The result must feel:

- premium;
- dependable;
- modern;
- strong;
- practical;
- clean;
- scalable;
- professional;
- safe;
- product-focused.

It must not feel:

- futuristic;
- cyberpunk;
- gaming-inspired;
- experimental;
- childish;
- template-like;
- overly decorative;
- like a generic construction company website.

==================================================
5. REJECTED DESIGN CHARACTERISTICS
==================================

The existing frontend uses a dark, technical, glowing, blueprint-style visual direction.

Do not reuse that direction.

Completely remove or avoid:

- full-page dark themes;
- glowing cyan elements;
- neon borders;
- cyberpunk effects;
- blueprint-style illustrations;
- huge dark empty spaces;
- glassmorphism;
- excessive transparency;
- strong gradients;
- glowing form fields;
- decorative diagonal lines;
- futuristic dashboards;
- gaming-style interface elements;
- random floating labels;
- oversized typography that breaks layout balance;
- excessive rounded pills;
- dark cards on dark backgrounds;
- decorative animation that distracts from the product;
- generic AI-generated startup visuals;
- simultaneous display of “Create account”, “Log in”, and “Logout”.

The new website must be light-first.

Dark navy should be used strategically for branding, navigation emphasis, selected dashboard areas, and strong CTA sections—not as the background of every page.

==================================================
6. DESIGN SYSTEM
================

Create a consistent design system before styling individual pages.

Use CSS custom properties or the equivalent design-token system supported by the current frontend stack.

Required color palette:

Brand primary:

- Deep Navy: #0B1F33

Primary hover:

- Dark Navy: #071726

Primary accent:

- Safety Orange: #F97316

Accent hover:

- Deep Orange: #EA580C

Main page background:

- Soft White: #F8FAFC

Surface:

- White: #FFFFFF

Main text:

- Charcoal: #172033

Secondary text:

- Slate: #64748B

Muted text:

- #94A3B8

Borders:

- #E2E8F0

Stronger borders:

- #CBD5E1

Success:

- #16A34A

Warning:

- #F59E0B

Error:

- #DC2626

Information:

- #2563EB

Use orange only for high-value actions and important highlights.

Examples:

- Post a repair request
- Book a professional
- Accept an offer
- Continue
- Confirm booking

Do not use orange for every icon, heading, border, or background.

==================================================
7. TYPOGRAPHY
=============

Use Inter as the primary interface font.

Use a reliable local or web-font loading strategy already compatible with the project.

Fallback:

font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

Typography hierarchy:

Hero heading:

- desktop: approximately 52–64px;
- mobile: approximately 38–44px;
- weight: 700 or 800;
- controlled line height;
- never allow text to overflow or dominate the entire viewport.

Section heading:

- 32–44px;
- weight: 700.

Page heading:

- 30–40px;
- weight: 700.

Card heading:

- 18–22px;
- weight: 600 or 700.

Body:

- 16px;
- readable line height.

Small text:

- 14px.

Buttons:

- 15–16px;
- weight: 600.

Avoid excessive all-uppercase text.

Use uppercase only for small eyebrow labels when appropriate.

==================================================
8. SPACING, LAYOUT, RADIUS, AND SHADOWS
=======================================

Use a consistent 8-point spacing system:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 40px
- 48px
- 64px
- 80px
- 96px

Use a centered page container:

- maximum width: approximately 1240–1320px;
- desktop horizontal padding: 32–40px;
- tablet padding: 24px;
- mobile padding: 16px.

Required radius system:

- small elements: 8px;
- inputs and buttons: 10–12px;
- standard cards: 14–16px;
- large containers: 20–24px;
- avatars: circular.

Do not make every element pill-shaped.

Card shadows must be subtle:

- normal card: very soft shadow;
- hover card: slightly stronger elevation;
- no large black shadows;
- no glowing shadows.

Example visual direction:

box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);

Use borders and whitespace more often than heavy shadows.

==================================================
9. ICON SYSTEM
==============

Use one consistent SVG icon library.

Preferred library:

- Lucide Icons

Use icons at consistent sizes such as:

- 16px;
- 18px;
- 20px;
- 24px.

Do not use emojis as primary interface icons.

Do not mix multiple icon styles.

Icons must support meaning, not act as decoration.

==================================================
10. GLOBAL APPLICATION SHELL
============================

Create a reusable global layout.

Use Django template inheritance where appropriate.

Create or improve:

- base template;
- public-site header;
- authenticated application header;
- dashboard sidebar;
- mobile navigation;
- footer;
- notification area;
- breadcrumbs;
- page heading component;
- modal shell;
- toast/alert component;
- form field component or shared form styles;
- empty-state component;
- loading-state component;
- status badge component;
- pagination component.

Avoid copying the same navigation markup into multiple pages.

==================================================
11. PUBLIC HEADER
=================

Create a professional sticky header.

Visual direction:

- white or slightly translucent white background;
- subtle bottom border;
- approximately 72–80px height;
- readable logo;
- controlled shadow after scrolling;
- clean mobile behavior.

Desktop navigation may include:

- Services
- How It Works
- Find Professionals
- Warranty
- For Professionals

Primary action:

- Post a Repair Request

Authentication-aware navigation is mandatory.

Use the existing Django authentication context.

When the user is not authenticated, show:

- Log in
- Create account

When the user is authenticated, show:

- Dashboard
- Profile or user menu
- Log out

Never show “Create account”, “Log in”, and “Log out” at the same time.

Do not modify authentication logic to achieve this.

Use existing Django template conditions such as the already available authenticated-user context.

==================================================
12. LANDING PAGE
================

Rebuild the landing page completely.

The landing page must immediately explain the product and establish trust.

Recommended page structure:

1. Header
2. Hero
3. Trust indicators
4. Service categories
5. How UstoHub works
6. Featured or verified professionals
7. Why customers trust UstoHub
8. Repair request process
9. Before-and-after or quality-control concept
10. Warranty and safety section
11. Customer reviews
12. Professional recruitment section
13. Frequently asked questions
14. Final CTA
15. Footer

Do not add a section only to fill space.

Each section must support a product decision.

==================================================
13. HERO SECTION
================

Create a light, premium hero section.

Do not use the current dark blueprint hero.

Recommended structure:

Left side:

- small trust label;
- strong headline;
- concise supporting text;
- primary CTA;
- secondary CTA;
- trust indicators.

Suggested product message:

Eyebrow:
Trusted home repair, managed from start to finish

Headline:
Solve home problems with verified professionals.

Supporting text:
Describe the issue, upload photos or video, compare offers, and book a trusted professional—all in one place.

Primary CTA:
Post a Repair Request

Secondary CTA:
How UstoHub Works

Trust indicators may include:

- Verified professionals
- Transparent offers
- Repair warranty
- Customer reviews

Right side:

Build a polished product-focused composition, such as:

- a realistic repair request preview;
- a professional profile card;
- a booking summary;
- a verified badge;
- a status timeline;
- a clean home-repair visual.

Do not use neon illustrations or blueprint graphics.

Use existing local image assets when suitable.

If suitable photography is unavailable, create a restrained, professional composition with cards, interface previews, and simple SVG shapes.

Do not use low-quality stock imagery.

==================================================
14. SERVICE CATEGORY SECTION
============================

Create consistent category cards for services such as:

- Plumbing
- Electrical
- Appliance Repair
- Heating and Cooling
- Furniture Assembly
- Painting
- Cleaning
- General Maintenance

Only display categories supported by available backend data when the page is dynamic.

Each card should include:

- consistent icon;
- category name;
- short description;
- optional number of available professionals;
- clear hover and focus state.

Cards must remain light and clean.

Category identity can use a subtle icon background, but the full card should not become a random bright color.

==================================================
15. HOW IT WORKS SECTION
========================

Explain the product in a clear sequence:

1. Describe the problem.
2. Upload photos or video.
3. Receive offers from verified professionals.
4. Choose a professional and book the service.
5. Track the repair and confirm completion.
6. Review the work and keep warranty information.

Use a clean step layout or timeline.

Do not use a glowing technical diagram.

==================================================
16. PROFESSIONAL CARDS
======================

Create a reusable professional-card component.

It may contain:

- profile image;
- full name;
- verified badge;
- profession;
- location;
- rating;
- review count;
- completed jobs;
- years of experience;
- starting price;
- availability;
- profile action;
- booking action.

User-facing terminology:

- Professional
- Verified Professional
- Service Provider

Do not expose internal backend terminology unnecessarily.

Badges must be limited to meaningful information:

- Verified
- Available
- Top Rated
- Warranty Available

Avoid badge overload.

==================================================
17. AUTHENTICATION PAGES
========================

Completely redesign:

- registration;
- login;
- email verification;
- password-related pages, if they exist;
- logout confirmation, if it exists.

The authentication pages must feel part of the same UstoHub product.

Do not reuse the existing dark registration screen.

Use a balanced light layout.

Possible structure:

- focused form card;
- concise product explanation;
- security/trust information;
- step indicator for registration and email verification;
- restrained branded visual.

Registration copy should be user-focused, not technical.

Do not display messages such as:

“The backend will send the verification code after this step.”

Instead use professional user-facing copy, such as:

“We’ll send a verification code to your email.”

Preserve all existing backend behavior.

For every form:

- preserve the existing form action;
- preserve the request method;
- preserve CSRF tokens;
- preserve field names;
- preserve hidden fields;
- preserve submitted values;
- preserve backend error rendering;
- preserve non-field errors;
- preserve user-type values;
- preserve email-verification flow;
- preserve password requirements;
- preserve server-side validation.

Render backend errors clearly near the relevant field.

Do not replace server validation with JavaScript.

Frontend validation may only enhance usability.

==================================================
18. FORM DESIGN
===============

All forms must follow one design system.

Input requirements:

- visible labels above fields;
- approximately 48–52px height;
- 10–12px radius;
- clear border;
- accessible focus state;
- readable error message;
- helper text when useful;
- correct autocomplete attributes;
- correct input types;
- keyboard accessibility.

Do not use placeholders as the only labels.

Recommended focus state:

- orange or navy border;
- subtle accessible focus ring;
- no neon glow.

Password fields should support:

- show/hide password;
- clear requirements;
- accessible button labeling.

Role selection should behave like a proper segmented choice or radio-card group.

Preserve the backend value while improving the visible label.

Example:

Visible label:
Professional

Submitted backend value:
master

==================================================
19. REPAIR REQUEST WIZARD
=========================

For any request-creation flow supported by the project, create a professional multi-step visual experience.

Suggested steps:

1. Choose a service.
2. Describe the problem.
3. Add photos or video.
4. Select location and preferred time.
5. Review and submit.

Do not create new backend steps if the backend only supports a single POST request.

Instead, create a frontend presentation that remains compatible with the existing form submission.

Preserve every required field and backend expectation.

Include:

- visible progress;
- back and continue controls;
- validation state;
- upload preview where supported;
- final review summary;
- mobile-friendly interaction.

==================================================
20. CUSTOMER DASHBOARD
======================

Create a clean customer dashboard.

Potential sections based on available backend data:

- active requests;
- upcoming bookings;
- latest professional offers;
- repair statuses;
- unread messages;
- completed repairs;
- warranties;
- saved professionals;
- account profile.

Dashboard background:

- soft light gray or soft white.

Use white cards with subtle borders.

The dashboard should prioritize actions and current repair status.

Do not turn it into a futuristic analytics dashboard.

==================================================
21. PROFESSIONAL DASHBOARD
==========================

Create a distinct but consistent professional dashboard.

Potential sections based on available backend data:

- new repair requests;
- submitted offers;
- upcoming jobs;
- active work;
- completed jobs;
- customer messages;
- reviews;
- profile completeness;
- service areas;
- earnings summary, only when supported;
- availability settings, only when supported.

Use existing backend role data.

Do not change role permissions.

Do not expose customer-only actions to professionals.

Do not expose professional-only actions to customers.

==================================================
22. DASHBOARD NAVIGATION
========================

Use a responsive sidebar for authenticated desktop layouts.

Possible items:

Customer:

- Overview
- My Requests
- Bookings
- Messages
- Warranties
- Reviews
- Profile
- Settings

Professional:

- Overview
- Available Requests
- My Offers
- Jobs
- Schedule
- Messages
- Reviews
- Profile
- Settings

Only include links backed by existing routes.

Do not create broken links.

For missing routes, omit the item or render a disabled future-state item only when clearly appropriate.

Desktop sidebar visual direction:

- deep navy or white;
- strong selected state;
- orange used sparingly as an active indicator;
- readable labels;
- consistent icons.

Mobile:

- compact top bar;
- drawer or bottom navigation, depending on project structure;
- no horizontal overflow.

==================================================
23. STATUS SYSTEM
=================

Create a consistent status-badge system.

Possible mappings:

- Pending: amber
- Offer Received: blue
- Accepted: indigo
- Scheduled: blue
- In Progress: orange
- Completed: green
- Cancelled: red
- Disputed: purple or red
- Verified: blue or green

Do not communicate status using color alone.

Every status must include readable text and, where appropriate, an icon.

Use backend status values exactly as they currently exist.

Only transform their visual labels when safe.

==================================================
24. RESPONSIVE DESIGN
=====================

The entire frontend must be genuinely responsive.

Support at minimum:

- large desktop;
- standard desktop;
- tablet;
- mobile;
- narrow mobile.

Requirements:

- no horizontal page overflow;
- no cut-off headings;
- no off-screen forms;
- no unusable tables;
- no overlapping buttons;
- no navigation collisions;
- no fixed-width cards that break mobile;
- touch targets of suitable size;
- readable form controls;
- mobile-friendly modals;
- adaptive dashboard navigation.

Tables should transform into stacked cards or use controlled responsive scrolling when necessary.

Test common viewport widths such as:

- 1440px;
- 1280px;
- 1024px;
- 768px;
- 430px;
- 390px;
- 360px.

==================================================
25. ACCESSIBILITY
=================

Follow WCAG AA principles.

Requirements:

- semantic HTML;
- correct heading hierarchy;
- keyboard navigation;
- visible focus states;
- accessible button names;
- form labels linked to controls;
- sufficient color contrast;
- alt text for meaningful images;
- decorative images hidden from screen readers;
- accessible error messages;
- no interaction that depends only on hover;
- no status communicated only through color;
- respect prefers-reduced-motion.

Do not remove browser focus outlines without providing an accessible replacement.

==================================================
26. MOTION AND INTERACTION
==========================

Use restrained motion only.

Preferred duration:

- approximately 150–250ms.

Allowed uses:

- button hover;
- card elevation;
- menu opening;
- modal transitions;
- dropdown transitions;
- accordion expansion;
- toast appearance;
- subtle loading skeletons.

Avoid:

- looping animations;
- floating elements;
- glowing pulses;
- parallax;
- excessive scroll effects;
- animated backgrounds;
- text that constantly moves;
- decorative animation without purpose.

==================================================
27. FRONTEND ARCHITECTURE
=========================

First inspect the current frontend stack.

Continue using the existing frontend toolchain where practical.

If the project already uses a frontend framework or utility system, use it consistently.

If the project does not have a frontend framework, use:

- semantic Django templates;
- modular CSS;
- CSS custom properties;
- reusable template partials;
- clean vanilla JavaScript.

Do not introduce React, Vue, Angular, a SPA architecture, or a separate frontend application unless the project already uses it.

Do not rewrite the Django application architecture.

Recommended CSS organization when compatible with the current project:

- tokens.css
- reset.css
- base.css
- layout.css
- components.css
- forms.css
- utilities.css
- public-pages.css
- dashboard.css
- responsive.css

Use the project’s current static-file conventions.

Avoid:

- one enormous unstructured stylesheet;
- excessive inline styles;
- duplicated CSS;
- page-specific hacks;
- unexplained magic numbers;
- unnecessary !important;
- global selectors that break unrelated pages.

JavaScript should be modular and progressively enhance the HTML.

The core page content and forms must remain usable without unnecessary JavaScript.

==================================================
28. DATA AND TEMPLATE INTEGRATION
=================================

Inspect each existing Django template and route before replacing the markup.

Preserve:

- context-variable names;
- template tags;
- loops;
- conditional rendering;
- CSRF tokens;
- form actions;
- field names;
- hidden inputs;
- pagination values;
- uploaded file behavior;
- route names;
- query parameters;
- backend messages;
- authentication checks.

Do not replace real backend integration with hardcoded mock data.

Do not delete template variables because they are not immediately visible.

Do not silently break POST requests.

Do not add links to nonexistent URL names.

When a page has no data, render a proper empty state.

Example:

- clear title;
- concise explanation;
- primary next action;
- optional illustration or icon.

==================================================
29. FEEDBACK STATES
===================

Implement consistent visual states for:

- loading;
- success;
- warning;
- error;
- empty results;
- no messages;
- no active requests;
- no professional offers;
- unavailable content;
- disabled actions;
- form submission;
- file upload;
- verification code state.

Use Django’s existing message framework when it is available.

Style success, error, warning, and information messages consistently.

Do not hide backend errors.

==================================================
30. FOOTER
==========

Create a strong but restrained footer.

Possible sections:

- UstoHub summary;
- Services;
- Customers;
- Professionals;
- Company;
- Support;
- Legal;
- social links, only if real;
- copyright.

Use a deep navy background for the footer if appropriate.

Ensure readable contrast.

Do not fill the footer with fake links.

==================================================
31. CONTENT QUALITY
===================

Replace developer-facing text with real product copy.

Avoid phrases such as:

- backend;
- API;
- workspace;
- test account;
- system user;
- verification will be handled later;
- placeholder;
- dummy content.

Use customer-facing language.

Keep sentences concise.

Use consistent terminology across every page.

Preferred terminology:

- Repair Request
- Professional
- Customer
- Offer
- Booking
- Service
- Warranty
- Verified
- In Progress
- Completed

==================================================
32. QUALITY CONTROL
===================

After implementation:

1. Inspect all existing frontend-facing routes.
2. Confirm each template renders without syntax errors.
3. Confirm CSS and JavaScript assets load correctly.
4. Confirm no backend file was modified.
5. Confirm registration still submits expected values.
6. Confirm login still works with the existing backend.
7. Confirm logout is displayed only for authenticated users.
8. Confirm email verification retains the existing flow.
9. Confirm CSRF tokens remain present.
10. Confirm mobile layouts do not overflow.
11. Confirm forms display backend errors.
12. Confirm navigation contains no broken URL references.
13. Confirm role-based pages render correctly.
14. Confirm keyboard focus is visible.
15. Confirm the design is visually consistent across pages.
16. Confirm there is no residual dark cyberpunk styling.
17. Confirm the result looks like one coherent production product.

Run any existing frontend build, lint, or template checks that do not modify backend behavior.

Fix discovered frontend problems before finishing.

==================================================
33. ACCEPTANCE CRITERIA
=======================

The work is complete only when:

- the old visual design has been fully replaced;
- the frontend looks intentionally designed from zero;
- the website is light-first;
- the Industrial Premium Marketplace direction is obvious;
- navy, orange, white, and slate are used consistently;
- the design feels trustworthy and production-ready;
- public pages and authenticated pages share one design system;
- authentication forms look professional;
- customer and professional experiences are clearly separated;
- all existing backend integrations remain intact;
- no Python or backend file has been changed;
- no route or form submission has been broken;
- the website is responsive on mobile, tablet, and desktop;
- all visible content is currently in English;
- the frontend is structured for future expansion;
- there are no neon, cyberpunk, blueprint, or gaming-style elements;
- there are no obvious placeholder sections;
- navigation correctly reflects authentication state;
- every major page includes loading, empty, and error handling where relevant.

==================================================
34. EXECUTION INSTRUCTION
=========================

Begin by auditing the existing project structure and identifying:

- all current templates;
- all frontend static files;
- the base layout;
- public routes;
- authenticated routes;
- customer routes;
- professional routes;
- forms and their exact field names;
- current context variables;
- existing frontend dependencies.

Then rebuild the frontend systematically.

Do not ask me to approve each page.

Do not return only recommendations.

Do not return only a design plan.

Do not stop after creating the landing page.

Do not make a partial redesign.

Implement the complete frontend directly in the repository.

At the end, provide a concise report containing:

1. frontend files created;
2. frontend files replaced;
3. frontend files removed;
4. pages redesigned;
5. reusable components created;
6. responsive behavior implemented;
7. frontend checks executed;
8. explicit confirmation that no backend files were modified.

The final result must look like a serious, premium, scalable home-repair marketplace—not a coding demo, generic template, construction landing page, or futuristic dashboard.
