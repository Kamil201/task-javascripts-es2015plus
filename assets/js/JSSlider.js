
class JSSlider {
	constructor(imagesSelector) {
		this.imagesSelector = imagesSelector;
		this.imagesList = document.querySelectorAll(imagesSelector);
		this.sliderRootElement = document.querySelector(".js-slider");
		this.currentGroupName = "";
		this.autoSwitchInterval = null; // Dodajemy zmienną do przechowywania interwału automatycznego przełączania
	}

	init() {
		this.imagesList.forEach((img) => {
			img.dataset.sliderGroupName = Math.random() > 0.5 ? "nice" : "good";
		});

		this.run();
	}

	run() {
		this.initEvents();
		this.initCustomEvents();
		// this.startAutoSwitch();
	}

	initEvents() {
		this.imagesList.forEach((item) => {
			item.addEventListener("click", (e) => {
				this.fireCustomEvent(e.currentTarget, "js-slider-img-click");
				this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
			});
		});

		const navNext = this.sliderRootElement.querySelector(
			".js-slider__nav--next"
		);
		if (navNext) {
			navNext.addEventListener("click", () => {
				this.fireCustomEvent(this.sliderRootElement, "js-slider-img-next");
				// this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
				// this.stopAutoSwitch();
			});
		}

		const navPrev = this.sliderRootElement.querySelector(
			".js-slider__nav--prev"
		);
		if (navPrev) {
			navPrev.addEventListener("click", () => {
				this.fireCustomEvent(this.sliderRootElement, "js-slider-img-prev");
				// this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
			});
		}

		const zoom = this.sliderRootElement.querySelector(".js-slider__zoom");
		if (zoom) {
			zoom.addEventListener("click", (e) => {
				if (e.target === e.currentTarget) {
					this.fireCustomEvent(this.sliderRootElement, "js-slider-close");
				}
			});
		}
		navNext.addEventListener("mouseenter", () => {
			console.log('enter')
			this.fireCustomEvent(this.sliderRootElement, "js-slider-stop");
		});

		navNext.addEventListener("mouseleave", () => {
			console.log('leave')
			this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
		});

		navPrev.addEventListener("mouseenter", () => {
			this.fireCustomEvent(this.sliderRootElement, "js-slider-stop");
		});

		navPrev.addEventListener("mouseleave", () => {
			this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
		});
	}

	initCustomEvents() {
		this.imagesList.forEach((img) => {
			img.addEventListener("js-slider-img-click", (event) => {
				this.onImageClick(event);
			});
		});

		this.sliderRootElement.addEventListener(
			"js-slider-img-next",
			this.onImageNext.bind(this)
		);
		this.sliderRootElement.addEventListener(
			"js-slider-img-prev",
			this.onImagePrev.bind(this)
		);
		this.sliderRootElement.addEventListener(
			"js-slider-close",
			this.onClose.bind(this)
		);
		this.sliderRootElement.addEventListener(
			"js-slider-start",
			this.startAutoSwitch.bind(this)
		);
		this.sliderRootElement.addEventListener(
			"js-slider-stop",
			this.stopAutoSwitch.bind(this)
		);
	}

	fireCustomEvent(element, name) {
		console.log(element.className, "=>", name);

		const event = new CustomEvent(name, {
			bubbles: true,
		});

		element.dispatchEvent(event);
	}

	onImageClick(event) {
		this.sliderRootElement.classList.add("js-slider--active");

		const src = event.currentTarget.querySelector("img").src;
		this.sliderRootElement.querySelector(".js-slider__image").src = src;

		const groupName = event.currentTarget.dataset.sliderGroupName;
		const thumbsList = document.querySelectorAll(
			`${this.imagesSelector}[data-slider-group-name=${groupName}]`
		);
		const prototype = document.querySelector(
			".js-slider__thumbs-item--prototype"
		);

		thumbsList.forEach((item) => {
			const thumbElement = prototype.cloneNode(true);
			thumbElement.classList.remove("js-slider__thumbs-item--prototype");
			const thumbImg = thumbElement.querySelector("img");
			thumbImg.src = item.querySelector("img").src;

			if (thumbImg.src === src) {
				thumbImg.classList.add("js-slider__thumbs-image--current");
			}

			document.querySelector(".js-slider__thumbs").appendChild(thumbElement);
		});
	}

	onImageNext(event) {
		const currentClassName = "js-slider__thumbs-image--current";
		const current = this.sliderRootElement.querySelector(
			`.${currentClassName}`
		);

		const parentCurrent = current.parentElement;
		const nextElement = parentCurrent.nextElementSibling;

		if (
			nextElement &&
			!nextElement.className.includes("js-slider__thumbs-item--prototype")
		) {
			const img = nextElement.querySelector("img");
			img.classList.add(currentClassName);

			this.sliderRootElement.querySelector(".js-slider__image").src = img.src;
			current.classList.remove(currentClassName);
		}
	}

	onImagePrev(event) {
		const currentClassName = "js-slider__thumbs-image--current";
		const current = this.sliderRootElement.querySelector(
			`.${currentClassName}`
		);

		const parentCurrent = current.parentElement;
		const prevElement = parentCurrent.previousElementSibling;

		if (
			prevElement &&
			!prevElement.className.includes("js-slider__thumbs-item--prototype")
		) {
			const img = prevElement.querySelector("img");
			img.classList.add(currentClassName);

			this.sliderRootElement.querySelector(".js-slider__image").src = img.src;
			current.classList.remove(currentClassName);
		}
	}

	onClose(event) {
		event.currentTarget.classList.remove("js-slider--active");
		const thumbsList = this.sliderRootElement.querySelectorAll(
			".js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)"
		);
		thumbsList.forEach((item) => item.parentElement.removeChild(item));
	}

	startAutoSwitch() {
		this.autoSwitchInterval = setInterval(() => {
			this.fireCustomEvent(this.sliderRootElement, "js-slider-img-next");
			console.log('run', this.autoSwitchInterval)
		}, 3000); 
	}

	stopAutoSwitch() {
		console.log('stop', this.autoSwitchInterval)
		clearInterval(this.autoSwitchInterval);
	}
}

export default JSSlider;