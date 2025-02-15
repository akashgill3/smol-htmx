# smol-htmx

## What I understand about HTMX and how it works

HTMX allows us to add attributes to HTML elements which extend their functionality.
On `DOMContentLoaded` it looks for any elements which have attributes starting with `hx-`, then processes. During the processing step based on the type of attributes it adds appropriate event listeners and creates internal state.

## Breakdown of all things I think are required to make `hx-get` work.

hx-get: sends a get request to provided url, it can include request params and values. It has a target where the incoming HTML will be placed. By default it will swap the innerHTML of the target, but we can also set `hx-swap` to customize that.

- Get elements with `hx-get` attribute on them
- Grab the specified url
- Add an event listener on that element which will make a get call on default trigger of that element
- Handle incoming HTML
