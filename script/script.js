			const tooltip = document.querySelector("#custom-tooltip");

			function positionTooltip(pointerX, pointerY) {
				const gap = 8;
				const edge = 8;
				const tooltipRect = tooltip.getBoundingClientRect();
				const left = pointerX + gap + tooltipRect.width <= window.innerWidth - edge
				? pointerX + gap
				: Math.max(edge, pointerX - tooltipRect.width - gap);
				const top = pointerY + gap + tooltipRect.height <= window.innerHeight - edge
				? pointerY + gap
				: Math.max(edge, pointerY - tooltipRect.height - gap);

				tooltip.style.left = `${left}px`;
				tooltip.style.top = `${top}px`;
			}

			function showTooltip(trigger, pointerX, pointerY) {
				tooltip.textContent = trigger.dataset.tooltip;
				tooltip.classList.add("is-visible");
				tooltip.setAttribute("aria-hidden", "false");
				positionTooltip(pointerX, pointerY);
			}

			document.querySelectorAll("[data-tooltip]").forEach((trigger) => {
				trigger.setAttribute("aria-describedby", "custom-tooltip");
				trigger.addEventListener("pointerenter", (event) => {
					showTooltip(trigger, event.clientX, event.clientY);
				});
			trigger.addEventListener("pointermove", (event) => {
				if (event.pointerType !== "touch") {
					positionTooltip(event.clientX, event.clientY);
				}
			});
		trigger.addEventListener("pointerleave", () => {
			tooltip.classList.remove("is-visible");
			tooltip.setAttribute("aria-hidden", "true");
		});
	trigger.addEventListener("focus", () => {
		const rect = trigger.getBoundingClientRect();
		showTooltip(trigger, rect.right, rect.top);
	});
trigger.addEventListener("blur", () => {
	tooltip.classList.remove("is-visible");
	tooltip.setAttribute("aria-hidden", "true");
});
});