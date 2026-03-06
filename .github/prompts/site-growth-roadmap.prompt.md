---
name: "Site Growth Roadmap"
description: "Audit this repository and produce a concrete organic growth roadmap for SEO, UX, speed, indexing, trust, and maintainability using free methods only"
argument-hint: "Primary market, ranking goal, design priority, or extra constraint"
agent: "agent"
---

Create a rigorous, repository-specific growth roadmap for this website.

Project context:
- This is a Next.js website with strong SEO ambitions.
- Primary market: Kazakhstan.
- Primary content language: Russian.
- Search priority: Google and Yandex first, Bing second.
- Focus on free methods only.
- Do not add paid ads, paid links, or other paid acquisition tactics.
- Start with the roadmap only. Do not implement changes unless the user explicitly asks to continue after the roadmap.
- Base the roadmap on the actual repository state, not on generic SEO advice.
- Inspect code, routing, metadata, structured data, content architecture, and UI implementation before writing the plan.
- Do not run `npm run build`. Inspect the code directly.

Minimum inspection scope before writing the roadmap:
- [package.json](../../package.json)
- [next.config.ts](../../next.config.ts)
- [README.md](../../README.md)
- [src/lib/site.ts](../../src/lib/site.ts)
- [src/app](../../src/app)
- [src/components](../../src/components)
- [src/lib](../../src/lib)

Your objective:
- Maximize organic visibility in Google and Yandex.
- Keep Bing compatibility in view where it adds low-cost upside.
- Improve technical SEO, content quality, crawlability, indexation, performance, maintainability, trust, and security.
- Surface what is already good, what is weak, what is risky, and what has the highest leverage.
- Prefer durable, ethical, free growth methods.
- Assess design and UX quality as a first-class growth factor: visual hierarchy, readability, navigation clarity, information density, mobile usability, perceived quality, and conversion trust.
- Include design improvements in the roadmap, but keep them prioritized and implementation-aware rather than vague.

Cover these areas explicitly:
- Technical SEO
- Metadata quality
- Canonicals, redirects, sitemap, robots, hreflang, locale strategy
- Structured data and JSON-LD coverage
- Programmatic SEO risks: duplicate pages, thin pages, intent overlap, crawl traps
- Internal linking and information architecture
- Content uniqueness, query intent coverage, E-E-A-T, trust signals
- Core Web Vitals and real performance bottlenecks
- Accessibility issues that affect UX or search performance
- Security posture relevant to SEO and trust
- Dependency freshness, framework updates, and maintenance debt
- Observability with free tools: Search Console, Yandex Webmaster, Bing Webmaster Tools, Lighthouse, free analytics, uptime, error tracking if feasible
- Regional relevance for Kazakhstan and multilingual or locale-specific risks
- Free authority-building tactics such as useful tools, linkable assets, digital PR angles, citations, and partnerships
- UX and design debt that can suppress trust, engagement, return visits, or perceived authority

Working method:
- Inspect first, then reason.
- Prefer direct evidence from files, routes, metadata definitions, and reusable components.
- When making a claim, tie it to a repository area, route pattern, component, config file, or content source.
- If a conclusion depends on runtime data, analytics, search console, production headers, or real-world indexing state, label it `Needs external validation`.
- Distinguish clearly between confirmed issues, likely issues, and hypotheses.
- Call out contradictions in the repository, including outdated docs, broken assumptions, mismatched SEO claims, stale framework references, or locale strategy gaps.
- Be blunt when a pattern is weak, duplicate-heavy, thin, or likely to fail at scale.

Output rules:
- Be concrete and repository-specific.
- Prefer evidence from the codebase over assumptions.
- If something cannot be verified from the repository, label it as "Needs external validation".
- Do not promise "first place in Google". Frame results as probability and leverage.
- Do not bloat the answer with generic textbook SEO advice.
- Do not hide behind neutral language when the evidence suggests weak execution.
- Separate quick wins from structural work.
- Include file references or route groups wherever possible.

Required output format:

1. Executive summary
- 5 to 10 sentences on current state, biggest opportunities, and biggest risks.

2. Evidence snapshot
- A compact table or bullet list of the most important repository facts discovered before analysis.
- Include architecture facts, SEO-related capabilities already present, and visible gaps.

3. Critical blockers
- List the highest-risk issues that could suppress rankings or trust.
- For each blocker include: why it matters, likely impact, confidence, and where to inspect or change.

4. Prioritized roadmap
- Split into P0, P1, P2, and P3.
- P0 = urgent blockers.
- P1 = highest-leverage next actions.
- P2 = important but not urgent.
- P3 = long-tail improvements and experiments.
- Each item must include:
  - Title
  - Area
  - Why it matters
  - Concrete action
  - Relevant files or sections
  - Expected impact
  - Effort: low, medium, high
  - Dependency or prerequisite if any
  - Success metric

5. Detailed checklist
- Produce a large checklist, ideally 50 to 150 points when the project justifies it.
- Group the checklist by area instead of by file.
- Mark each item as one of: Audit, Fix, Measure, Content, Infra, Security, Experiment.

6. Design and UX upgrade track
- Provide a separate design-focused track aimed at making the site feel materially more credible and polished.
- Cover navigation, typography, spacing, content scannability, trust sections, mobile interaction quality, and consistency across templates.
- For each item include: problem, user impact, suggested change, relevant components or pages, and effort.

7. Top 10 next moves
- End with the 10 best next actions in strict execution order.
- These must be the highest-leverage items for the next phase of work.

8. Validation plan
- Explain how to measure whether the roadmap is working over 30, 60, and 90 days using free tools only.

9. External validation gaps
- List the most important unknowns that cannot be proven from the repository alone.
- For each one, specify the exact external source needed to validate it.

Quality bar:
- Think like a senior technical SEO, performance engineer, security-minded web engineer, and product strategist at the same time.
- Optimize for real ranking leverage, not vanity work.
- Call out tradeoffs, especially when programmatic SEO could create thin or duplicate content.
- Be blunt about weak content, weak structure, or weak trust signals when the repository suggests it.
- Prioritize changes that improve both search performance and real user trust instead of vanity metrics.