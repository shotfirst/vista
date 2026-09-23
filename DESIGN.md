# Vista uses Desert Warm for the family trip planner.

Version: v1.5.0

Register: The Vista maintainer defines the page's visual system for anyone updating trip content or building another card.

## Shared values

The page takes its colours from the `:root` variables in `public/index.html`. Use the variables in components rather than repeating colour codes.

| Variable | Value | Use |
| --- | --- | --- |
| `--bg` | `#FAF4EA` | Page background |
| `--surface` | `#FFFCF6` | Cards and panels |
| `--ink` | `#2B1D14` | Main text |
| `--muted` | `#5E4B3E` | Supporting text |
| `--line` | `#E6D8C3` | Dividers and borders |
| `--brand` | `#B4451F` | Links, prices and primary actions |
| `--chip` | `#F1E4CC` | Status chips and choice tracks |

Headings and prices use Fraunces. Body copy and controls use Hanken Grotesk. The page loads both from Google Fonts, with local system fallbacks. Cards use an 18-pixel corner radius; primary controls use pill corners. Text and action colours must remain readable against cream and card surfaces when the palette changes.

## One price card

`public/price-reads.js` builds each dated quote with the same `priceCard` function, including the repeated attraction quotes on their place cards. The closed card keeps the item, price, source and confidence chip visible. A button with `aria-expanded` reveals the existing Eastern read time, search context, coverage or unresolved terms, original confidence wording, and smaller earlier estimate. David's separate discount estimate appears only inside the minivan details with a “Your estimate” chip. Click or keyboard activation pins details open until activated again. Desktop hover shows a temporary source-and-read-time peek; touch screens rely on the button. The quote data is a dated snapshot, not a live feed.

At 375 pixels the price grid uses one column. At 640 pixels and above it uses two columns within the reading width. Keep data above explanatory notes, and preserve quoted amounts and qualification text when editing the template.

Changelog: v1.5.0 introduced Desert Warm and the shared expandable price card.