// const path = require("path");
// module.exports = {
// 	// ...
// 	devServer: {
// 		static: "./assets/css/style.css",
// 	},
// };
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// // importuję bibliotekę [path] z [node.js]
// module.exports = {
// 	entry: "./assets/js/script.js",
// 	// definiuję plik wejściowy
// 	output: {
// 		path: path.resolve(__dirname, "build"),
// 		// definiuję ścieżkę wyjściową
// 		filename: "app.min.js",
// 		// definiuję nazwę pliku wyjściowego
// 	},

// 	module: {
// 		rules: [],
// 		// obecnie brak dodatkowych ustawień
// 	},

// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: "./index.html",
// 			// wskazuję plik źródłowy
// 			filename: "index.html",
// 			// określam nazwę dla pliku
// 		}),
// 	],
// };
// // eksportuję ustawienia dla webpack


const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// importuję bibliotekę [path] z [node.js]
module.exports = {
	entry: "./assets/js/script.js",
	// definiuję plik wejściowy
	output: {
		path: path.resolve(__dirname, "build"),
		// definiuję ścieżkę wyjściową
		filename: "app.min.js",
		// definiuję nazwę pliku wyjściowego
	},
	devServer: { // TUTAJ!!!
        static: './',
    },

	module: {
		rules: [],
		// obecnie brak dodatkowych ustawień
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			// wskazuję plik źródłowy
			filename: "index.html",
			// określam nazwę dla pliku
		}),
	],
};
// eksportuję ustawienia dla webpack