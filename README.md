# smol-htmx ☃︎

This project is primarily a learning exercise to:

-   🧠 Understand how HTMX-like attributes work under the hood
-   🔍 Explore event delegation and DOM update patterns
-   🧩 Practice building a minimal library from scratch
-   ⚡️ Create a simple foundation for custom extensions

## Features

-   Declarative HTML attributes for AJAX interactions
-   Supports GET/POST/PUT/DELETE methods
-   Simple content swapping (innerHTML/outerHTML)
-   Event delegation with cleanup
-   Query params & form data support

## Syntax

| Attribute                            | Description                                                |
| ------------------------------------ | ---------------------------------------------------------- |
| `sx-get, sx-post, sx-put, sx-delete` | URL to request                                             |
| `sx-target`                          | CSS selector of element to update (default: this)          |
| `sx-swap`                            | How to insert content: innerHTML/outerHTML (default: this) |
| `sx-trigger`                         | Event(s) that trigger the request (default: click)         |

## Quick Start

```html
<script src="path/to/smol-htmx.js"></script>
<!-- Example usage -->
<button sx-get="/items" sx-target="#results" sx-swap="innerHTML">Load Items</button>
<div id="results"></div>
```

## Missing Functionality (vs HTMX)

While functional for basic use cases, this lacks many HTMX features:

-   ❌ Advanced swaps (beforeend, afterbegin, etc)
-   ❌ CSS transitions/animation support
-   ❌ Request validation/parameters
-   ❌ WebSocket/SSE support
-   ❌ Event modifiers (throttling, filtering)
-   ❌ Form serialization capabilities
-   ❌ History integration
