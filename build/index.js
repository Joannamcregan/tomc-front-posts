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
    this.publishButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--publish');
    this.unpublishButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--unpublish');
    this.deleteButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--delete');
    this.editPostOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__edit-post-overlay');
    this.closeEditOverlayButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-front-posts--close-overlay');
    this.titleField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit-blog--title');
    this.contentField = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#edit-blog--content_ifr #tinymce');
    this.deletePostOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__permanently-delete-post-overlay');
    this.saveEditsButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post--save-edits');
    this.noTitleError = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post--edit-errors-title');
    this.noContentError = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post--edit-errors-post');
    this.deletePostOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__permanently-delete-post-overlay');
    this.cancelDeleteButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__cancel-permanent-deletion-button');
    this.permanentlyDeleteButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__permanently-delete-button');
    this.addPostButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#add-blog-post');
    this.addPostForm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#new-blog-post-form');
    this.events();
    this.editPostOverlayIsOpen = false;
    this.deletePostOverlayIsOpen = false;
    this.deletePostError = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-front-post__deletion-error');
    this.postId;
  }
  events() {
    this.editButtons.on('click', this.openEditPostOverlay.bind(this));
    this.deleteButtons.on('click', this.openDeletePostOverlay.bind(this));
    this.publishButtons.on('click', this.publishPost.bind(this));
    this.unpublishButtons.on('click', this.unpublishPost.bind(this));
    this.closeEditOverlayButton.on('click', this.closeEditOverlay.bind(this));
    this.saveEditsButton.on('click', this.saveEdits.bind(this));
    this.cancelDeleteButton.on('click', this.closeDeletePostOverlay.bind(this));
    this.permanentlyDeleteButton.on('click', this.permanentlyDeletePost.bind(this));
    this.addPostButton.on('click', e => {
      this.addPostForm.toggleClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).toggleClass('purple-heading-open');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).toggleClass('purple-heading-closed');
    });
  }
  publishPost(e) {
    const blogId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('contracting');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/publishPost',
      type: 'POST',
      data: {
        'post': blogId
      },
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        location.reload(true);
      },
      error: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        // console.log(response);
      }
    });
  }
  unpublishPost(e) {
    const blogId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('contracting');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/unpublishPost',
      type: 'POST',
      data: {
        'post': blogId
      },
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        location.reload(true);
      },
      error: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        // console.log(response);
      }
    });
  }
  saveEdits(e) {
    const newTitle = this.titleField.val();
    const newContent = tinyMCE.get('edit-blog--content').getContent();
    if (newTitle != '' && newContent != '') {
      this.noTitleError.addClass('hidden');
      this.noContentError.addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('contracting');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/updatePost',
        type: 'POST',
        data: {
          'post': this.postId,
          'title': newTitle,
          'content': newContent
        },
        success: response => {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
          location.reload(true);
        },
        error: response => {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
          // console.log(response);
        }
      });
    } else {
      if (newTitle == '') {
        this.noTitleError.removeClass('hidden');
      }
      if (newContent == '') {
        this.noContentError.removeClass('hidden');
      }
    }
  }
  openEditPostOverlay(e) {
    if (this.editPostOverlayIsOpen != true) {
      this.postId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
      this.titleField.val(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('title'));
      let content = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('content');
      var editor = tinyMCE.get('edit-blog--content');
      if (editor) {
        editor.setContent(content);
      }
      this.noTitleError.addClass('hidden');
      this.noContentError.addClass('hidden');
      this.editPostOverlay.addClass("tomc-book-organization__box--active");
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    }
  }
  closeEditOverlay(e) {
    this.editPostOverlay.removeClass("tomc-book-organization__box--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    this.postId = 0;
    this.editPostOverlayIsOpen = false;
  }
  openDeletePostOverlay(e) {
    if (this.deletePostOverlayIsOpen != true) {
      this.postId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
      this.deletePostError.addClass('hidden');
      this.deletePostOverlay.addClass("tomc-book-organization__box--active");
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    }
  }
  closeDeletePostOverlay() {
    this.deletePostOverlay.removeClass("tomc-book-organization__box--active");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    this.postId = 0;
    this.deletePostOverlayIsOpen = false;
  }
  permanentlyDeletePost(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('contracting');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/deletePost',
      type: 'POST',
      data: {
        'post': this.postId
      },
      success: response => {
        console.log(response);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        location.reload(true);
      },
      error: response => {
        console.log(response);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        this.deletePostError.addClass('hidden');
      }
    });
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