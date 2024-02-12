import JSSlider from "./modules/JSSlider";

const init = () => {
	const jsSlider = new JSSlider(".gallery__item");
	jsSlider.init();
};

document.addEventListener("DOMContentLoaded", init);
