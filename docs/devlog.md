# devlog - smol-htmx 

## 14-02-25

### What I understand about HTMX and how it works

HTMX allows us to add attributes to HTML elements which extend their functionality. On `DOMContentLoaded` it looks for
any elements which have attributes starting with `hx-`, then processes. During the processing step based on the type of
attributes it adds appropriate event listeners and creates internal state.

### Breakdown of all things I think are required to make `hx-get` work.

hx-get: sends a get request to provided url, it can include request params and values. It has a target where the
incoming HTML will be placed. By default it will swap the innerHTML of the target, but we can also set `hx-swap` to
customize that.

- Get elements with `hx-get` attribute on them
- Grab the specified url
- Add an event listener on that element which will make a get call on default trigger of that element
- Handle incoming HTML

## 15-02-25

### Derailment

I just spent the 2 hours I had to work on this today on a tangent. Firstly to make the html lsp work in Neovim (why did
i even need it?), also nvim-cmp wasn't working as intended either. Then I thought I'd need hot reloading for the single
'index.html' file that I'm using for testing so I created a simple http server with Bun. But it couldn't resolve the
`smol-htmx.js` file in the script tag, I eventually found their experimental static/routes feature. Anyhow, I think I
have everything setup now for tomorrow to start writing the actual code that matters.

## 17-02-25

### Making the basics work

Firstly, we get all elements in the DOM that have any of the following tags:
- `sx-get`
- `sx-post`
- `sx-put`
- `sx-delete`

Now, process them by getting relevant information like the target, swap strategy, and trigger
out to make the basic request work. Then add eventListeners accordingly using fetch API
in the handlers to construct calls.

I forgot to clean up the elements after swap, which was causing multiple eventHandlers to be set.
To solve this I decided to add `_sxHandlers` field to elements and store the attached handlers for
easier clean up during processing Elements.

Currently, even though we can make `Post`, and `Put` requests I haven't added any way to include data
with the requests. Will need to implement something like `hx-vals`, `hx-params`, and `hx-include`.

Also, only `innerHTML` and `outerHTML` swaps are supported. But adding adjacent swaps isn't that difficult,
`insertAdjacentHTML` can handle remaining strategies.
