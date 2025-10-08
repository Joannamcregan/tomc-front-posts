/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/front-blog-updates.js":
/*!*******************************************!*\
  !*** ./src/modules/front-blog-updates.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class BlogUpdate {
  constructor() {
    this.editButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--edit');
    this.deleteButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--delete');
    this.editPostOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__edit-post-overlay');
    this.closeEditOverlayButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--close-overlay');
    this.titleField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit-blog--title');
    this.contentField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit-blog--content_ifr #tinymce');
    this.deletePostOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__permanently-delete-post-overlay');
    this.events();
    this.editPostOverlayIsOpen = false;
  }
  events() {
    this.editButtons.on('click', this.openEditPostOverlay.bind(this));
    this.deleteButtons.on('click', this.deletePost.bind(this));
    this.closeEditOverlayButton.on('click', this.closeEditOverlay.bind(this));
  }
  openEditPostOverlay(e) {
    let postId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
    this.editPostOverlay.attr('data-post', postId);
    this.titleField.val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('title'));
    var editor = tinyMCE.get('edit-blog--content');
    if (editor) {
      editor.setContent('<h2>New content set by jQuery!</h2><p>This is a paragraph.</p>');
    }
    this.contentField.val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('content'));
    console.log(this.contentField.val());
    this.editPostOverlay.addClass("tomc-book-organization__box--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
  }
  closeEditOverlay(e) {
    this.editPostOverlay.removeClass("tomc-book-organization__box--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
  }
  deletePost() {
    console.log('deleting the post');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogUpdate);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_front_blog_updates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/front-blog-updates */ "./src/modules/front-blog-updates.js");

const tomcBlogUpdate = new _modules_front_blog_updates__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map