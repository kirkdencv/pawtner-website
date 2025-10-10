# Project Checklist

## Done
- [x] Coexistence cards: tightened spacing, responsive grid, icon positioning (css/styles.css — .coexistence-cards, .co-card)
- [x] Coexistence layout: side-by-side image + cards and responsive breakpoints (css/styles.css — .coexistence-content, .coexistence-img-wrap)
- [x] Card flexibility: text wraps and cards expand (css/styles.css — .co-card rules)
- [x] Donate section: HTML + CSS added, highlighted center card, responsive (donate HTML + css/styles.css — .donate, .donate-card)
- [x] Footer layout: footer-content and full-width footer-bottom implemented and aligned left/right (css/styles.css — .footer-content, .footer-bottom)
- [x] Adopt page scaffold: adopt.html with navbar/footer, sidebar filters, pet-card reuse (adopt.html)
- [x] Adopt CSS: layout and adopt-only pet-card scaling (css/styles.css — .adopt-main, .adopt-main .pet-cards)
- [x] Pet cards: adopt-only scaling applied (css/styles.css — .adopt-main .pet-card)
- [x] Pagination centered in adopt section (css/styles.css — .adopt-pet-cards, .pagination)
- [x] Custom color dropdown: HTML/CSS pattern and JS provided (adopt.html + js/adopt.js or js/main.js)
- [x] About page scaffolded and about-specific CSS provided (about.html + css/styles.css additions)
- [x] README.md drafted (project structure, workflows)

## To do
- [ ] Add/replace placeholder images and icons in img/ (ensure correct paths: img/, img/icons/)
- [ ] Move inline scripts into js files (e.g., js/adopt.js) and include them in respective pages
- [ ] Wire up filter behavior (form → JS to filter pet list or backend endpoint)
- [ ] Hook up Donate form / Subscribe form to backend or email service
- [ ] Clean up & dedupe CSS: merge duplicates, scope page-specific overrides (.adopt-main, .about-main)
- [ ] Cross-browser & responsive QA (desktop/tablet/mobile) and fix spacing issues
- [ ] Accessibility improvements: ARIA, keyboard support for custom dropdown, alt text for images
- [ ] Optimize images (compress / convert to webp), check load performance
- [ ] Git: commit remaining changes, push branches, open PR(s) and merge to main
- [ ] Final visual polish: spacing, font-size consistency, hover/active states
- [ ] Optional: add unit tests or E2E test plan and update README with deploy steps