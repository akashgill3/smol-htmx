var smolHTMX = (() => {
	"use strict";

	// Private state
	let initialized = false;

	// Private methods
	const processElement = (el) => {
		// clean up
		if (el._sxHandlers) {
			el._sxHandlers.forEach(([type, handler]) => {
				el.removeEventListener(type, handler);
			});
		}
		el._sxHandlers = [];

		const attributes = {
			verb: el.getAttribute("sx-get")
				? "GET"
				: el.getAttribute("sx-post")
					? "POST"
					: el.getAttribute("sx-put")
						? "PUT"
						: "DELETE",
			url:
				el.getAttribute("sx-get") ||
				el.getAttribute("sx-post") ||
				el.getAttribute("sx-put") ||
				el.getAttribute("sx-delete"),
			target: el.getAttribute("sx-target") || "this",
			swap: el.getAttribute("sx-swap") || "innerHTML",
			trigger: el.getAttribute("sx-trigger") || "click",
		};

		attributes.trigger.split(" ").forEach((triggerType) => {
			const handler = async (evt) => {
				evt.preventDefault();
				try {
					const response = await fetch(attributes.url, {
						method: attributes.verb,
						headers: {
							Accept: "text/html",
						},
					});

					if (!response.ok)
						throw new Error(
							`HTTP error! status: ${response.status}`
						);

					const responseHtml = await response.text();
					const targetEl =
						attributes.target === "this"
							? el
							: document.querySelector(attributes.target);

					switch (attributes.swap) {
						case "innerHTML":
							targetEl.innerHTML = responseHtml;
							break;
						case "outerHTML":
							targetEl.outerHTML = responseHtml;
							break;
						default:
							console.error(
								`Unsupported swap: ${attributes.swap}`
							);
					}

					// Process new elements after swap
					process(targetEl);
				} catch (error) {
					console.error("Request failed;", error);
				}
			};

			el.addEventListener(triggerType, handler);
			el._sxHandlers.push([triggerType, handler]);
		});
	};

	const process = (root = document) => {
		if (
			root instanceof Element &&
			root.matches("[sx-get], [sx-post], [sx-put], [sx-delete]")
		) {
			processElement(root);
		}
		root.querySelectorAll(
			"[sx-get], [sx-post], [sx-put], [sx-delete]"
		).forEach(processElement);
	};

	// Public API
	return {
		init() {
			if (initialized) return;
			initialized = true;
			process();
		},
	};
})();

document.addEventListener("DOMContentLoaded", () => smolHTMX.init());
