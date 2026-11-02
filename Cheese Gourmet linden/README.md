# Cheese Gourmet - WEDE5020 POE Part 3

**Student number:** st10518954
**Business:** Cheese Gourmet, Linden, Johannesburg (cheeses, breads, preserves and cheese platters)
**Live website (Netlify):** _add your Netlify link here_
**GitHub repository:** _add your repository link here_

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About us | `about.html` |
| Products | `products.html` |
| Gallery | `gallery.html` |
| Contact us | `contact.html` |
| Platters & catering | `platters-catering.html` |
| FAQs | `faqs.html` |

Styles are in `css/styles.css`. JavaScript files are in `javascript/`.

---

## Change Log

### Part 2 improvements (feedback)

- **Part 2 feedback received:** "Good work." The feedback did not ask for any specific corrections.
- **Action taken:** No corrections were required, so the Part 2 work (the external stylesheet `css/styles.css` linked to every page with `<link rel="stylesheet">`, and the page layouts) was kept as the base for Part 3.
- **Further improvements made on my own initiative:** the stylesheet was refreshed with a new colour scheme and a responsive (phone-friendly) layout, the navigation was made identical on all pages, and spelling mistakes were corrected. These are listed under Part 3 changes below.

### Part 3 changes

**1. Search engine optimisation (SEO) - all 7 pages**
- Added a `<meta name="description">` to every page, written specifically for that page (about 150 characters).
- Added a `<meta name="keywords">` to every page with words that match the page content.
- Added `<meta name="author" content="st10518954">`.
- Kept `<meta charset="UTF-8">` and `<meta name="viewport">` so pages display correctly on phones.
- Every page has its own unique `<title>`, one `<h1>`, `lang="en"` on `<html>`, and `alt` text on every image.

**2. HTML form that sends the user's details to my email**
- The "Request a platter" form on `contact.html` has: name, email, number of people, platter type (drop-down), preferred date and an optional message.
- The form uses Netlify Forms (`data-netlify="true"`, a hidden `form-name` field and a honeypot field to block spam bots). When someone submits it, Netlify stores the details and sends a notification email to the site owner.
- A hidden `subject` field gives the notification email a clear subject line.

**3. JavaScript form validation (`javascript/contact.js`)**
- Name must be at least 2 characters.
- Email must match a valid email pattern (regular expression).
- Number of people must be between 1 and 200.
- Date must be chosen and must be at least one day ahead (24 hours' notice is needed).
- Error messages show next to each field; the form only sends when everything is valid.
- The sending code is inside `try` / `catch` so errors are handled and the visitor sees a friendly message with our phone number.
- Choosing the number of people automatically selects a suitable platter size.

**4. Google Map (`contact.html`)**
- Embedded the store location with a Google Maps `<iframe>`, plus an "Open in Google Maps - get directions" link.

**5. Gallery lightbox and slideshow (`javascript/slideshow.js`, `javascript/lightbox.js`)**
- Slideshow with Previous / Next buttons, a picture counter and auto-play every 4 seconds (pauses when the mouse is over it).
- Lightbox: clicking a picture opens it full screen, with Previous / Next buttons, a caption, a close button, and keyboard support (Esc to close, left/right arrows to move).

**6. Shopping cart (`javascript/cart.js`)**
- "Add to cart" buttons on the platter cards (Products and Platters & catering pages).
- The cart panel on `products.html` shows quantities, a running total in rand, Checkout and Clear cart. The count in the navigation updates on every page and is saved with `localStorage`.

**7. Date and time updater (`javascript/datetime.js`)**
- The footer of every page shows the current date and time, updated every second with `setInterval`.

**8. Other improvements**
- New `faqs.html` page with seven questions that open and close (`<details>` / `<summary>`).
- Opening hours table on the contact page, with an "open now / closed now" message based on Johannesburg time.
- New "Other gourmet products" card on the Products page.
- Added a new stylesheet: burgundy, gold and cream colour scheme, responsive layout for phones, sticky navigation.
- Renamed files to lowercase and without spaces or `&` (`index.html`, `products.html`, `platters-catering.html`) so links work when hosted on Netlify.
- Corrected spelling mistakes ("Chesse", "everday", "occasdions", and others).

**9. Hosting**
- Website deployed to Netlify (link at the top of this file).

---

## Testing notes

- Opened every page and clicked every navigation link.
- Tested the form with empty fields, an invalid email, a past date and valid details.
- Tested the cart (add, increase, decrease, clear), the slideshow, the lightbox and the date/time in the footer.
- Checked the pages on a narrow (phone-size) screen.

## References

Google (2026) *Google Maps*. Available at: https://www.google.com/maps (Accessed: 1 November 2026).

Netlify (2026a) *Form notifications*. Available at: https://docs.netlify.com/forms/notifications/ (Accessed: 1 November 2026).

Netlify (2026b) *How to handle form submissions on Netlify without a backend*. Available at: https://www.netlify.com/knowledge-base/how-to-handle-form-submissions-on-netlify-without-a-backend/ (Accessed: 1 November 2026).

W3Schools (2026a) *How TO - Lightbox*. Available at: https://www.w3schools.com/howto/howto_js_lightbox.asp (Accessed: 1 November 2026).

W3Schools (2026b) *How TO - Slideshow*. Available at: https://www.w3schools.com/howto/howto_js_slideshow.asp (Accessed: 1 November 2026).

W3Schools (2026c) *JavaScript Form Validation*. Available at: https://www.w3schools.com/js/js_validation.asp (Accessed: 1 November 2026).

W3Schools (2026d) *HTML meta tag*. Available at: https://www.w3schools.com/tags/tag_meta.asp (Accessed: 1 November 2026).
