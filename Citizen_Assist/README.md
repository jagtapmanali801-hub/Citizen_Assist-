# Citizen Assist — Final Language & Navigation Build

This version keeps the realistic Maharashtra government-service-center hero design and fixes the requested UX issues.

## Included fixes
- Header navigation is exactly: Home, Services, FAQ, About, Contact.
- Removed the duplicate/misleading “How to Apply” navigation item.
- English / Hindi / Marathi now translate the visible website interface, including navigation, homepage sections, services, guides, FAQ, About, Contact, Accessibility, footer, popup and account dialog.
- Service names use available English/Hindi/Marathi service fields.
- Search supports English, Hindi, Marathi keywords, aliases and tolerant matching.
- Search results are not hidden by stale category/persona filters when searching from the home page.
- My Account is clearly a Citizen Assist preferences/progress feature, not a government login.
- Government trust is supported through visible independent-platform disclosure, official-domain evidence and official-portal handoff.

Citizen Assist remains an independent guidance platform and does not claim to be a government website or process government applications.


## Service-count and search clarification (September 2026)
- The official Maharashtra Aaple Sarkar dashboard currently reports **1,212 notified services**, **1,083 services available on the portal**, and **38 departments**.
- Citizen Assist must not claim that its local JSON contains all 1,083 detailed guides. The current downloadable build contains the detailed local guides already present in `data/services.js` and links users to the official live catalogue for the complete service set.
- The Services page explicitly labels the **1,083** figure as the official portal-available count and provides the official catalogue link.
- FAQ search now accepts a user's own wording and matches related phrases/keywords in English, Hindi and Marathi instead of requiring the exact FAQ question.
- My Account was removed because the downloadable build has no real account/login backend. Checklist and demo feedback remain browser-local.

Official sources:
- https://aaplesarkar.mahaonline.gov.in/en/CommonForm/DashBoard_Count
- https://aaplesarkar.mahaonline.gov.in/en/CommonForm/ViewAllServices
