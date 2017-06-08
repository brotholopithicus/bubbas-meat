/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arrowLeft = __webpack_require__(2);

var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

var _arrowRight = __webpack_require__(3);

var _arrowRight2 = _interopRequireDefault(_arrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Siema = function () {
  /**
   * Create a Siema.
   * @param {Object} options - Optional settings object.
   */
  function Siema(options) {
    var _this = this;

    _classCallCheck(this, Siema);

    // Merge defaults with user's settings
    this.config = Siema.mergeSettings(options);

    // Create global references
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector;
    this.selectorWidth = this.selector.offsetWidth;
    this.innerElements = [].slice.call(this.selector.children);
    this.currentSlide = this.config.startIndex;
    this.transformProperty = Siema.webkitOrNot();

    // Bind all event handlers for referencability
    ['resizeHandler', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'mousemoveHandler'].forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });

    // Build markup and apply required styling to elements
    this.init();
  }

  /**
   * Overrides default settings with custom ones.
   * @param {Object} options - Optional settings object.
   * @returns {Object} - Custom Siema settings.
   */


  _createClass(Siema, [{
    key: 'init',


    /**
     * Builds the markup and attaches listeners to required events.
     */
    value: function init() {
      // Resize element on window resize
      window.addEventListener('resize', this.resizeHandler);

      // If element is draggable / swipable, add event handlers
      if (this.config.draggable) {
        // Keep track pointer hold and dragging distance
        this.pointerDown = false;
        this.drag = {
          startX: 0,
          endX: 0,
          startY: 0,
          letItGo: null
        };

        // Touch events
        this.selector.addEventListener('touchstart', this.touchstartHandler, { passive: true });
        this.selector.addEventListener('touchend', this.touchendHandler);
        this.selector.addEventListener('touchmove', this.touchmoveHandler, { passive: true });

        // Mouse events
        this.selector.addEventListener('mousedown', this.mousedownHandler);
        this.selector.addEventListener('mouseup', this.mouseupHandler);
        this.selector.addEventListener('mouseleave', this.mouseleaveHandler);
        this.selector.addEventListener('mousemove', this.mousemoveHandler);
      }

      if (this.selector === null) {
        throw new Error('Something wrong with your selector 😭');
      }

      // update perPage number dependable of user value
      this.resolveSlidesNumber();

      // hide everything out of selector's boundaries
      this.selector.style.overflow = 'hidden';

      // Create frame and apply styling
      this.sliderFrame = document.createElement('div');
      this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + 'px';
      this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing;

      if (this.config.draggable) {
        this.selector.style.cursor = '-webkit-grab';
      }

      // Create a document fragment to put slides into it
      var docFragment = document.createDocumentFragment();

      // Loop through the slides, add styling and add them to document fragment
      for (var i = 0; i < this.innerElements.length; i++) {
        var elementContainer = document.createElement('div');
        elementContainer.style.cssFloat = 'left';
        elementContainer.style.float = 'left';
        elementContainer.style.width = 100 / this.innerElements.length + '%';
        elementContainer.appendChild(this.innerElements[i]);
        docFragment.appendChild(elementContainer);
      }

      // Add fragment to the frame
      this.sliderFrame.appendChild(docFragment);

      // Clear selector (just in case something is there) and insert a frame
      this.selector.innerHTML = '';
      this.selector.appendChild(this.sliderFrame);

      // Go to currently active slide after initial build
      this.slideToCurrent();
      this.config.onInit.call(this);
    }

    /**
     * Determinates slides number acordingly to clients viewport.
     */

  }, {
    key: 'resolveSlidesNumber',
    value: function resolveSlidesNumber() {
      if (typeof this.config.perPage === 'number') {
        this.perPage = this.config.perPage;
      } else if (_typeof(this.config.perPage) === 'object') {
        this.perPage = 1;
        for (var viewport in this.config.perPage) {
          if (window.innerWidth >= viewport) {
            this.perPage = this.config.perPage[viewport];
          }
        }
      }
    }

    /**
     * Go to previous slide.
     * @param {number} [howManySlides=1] - How many items to slide backward.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'prev',
    value: function prev() {
      var howManySlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var callback = arguments[1];

      if (this.innerElements.length <= this.perPage) {
        return;
      }
      var beforeChange = this.currentSlide;
      if (this.currentSlide === 0 && this.config.loop) {
        this.currentSlide = this.innerElements.length - this.perPage;
      } else {
        this.currentSlide = Math.max(this.currentSlide - howManySlides, 0);
      }
      if (beforeChange !== this.currentSlide) {
        this.slideToCurrent();
        this.config.onChange.call(this);
        if (callback) {
          callback.call(this);
        }
      }
    }

    /**
     * Go to next slide.
     * @param {number} [howManySlides=1] - How many items to slide forward.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'next',
    value: function next() {
      var howManySlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var callback = arguments[1];

      if (this.innerElements.length <= this.perPage) {
        return;
      }
      var beforeChange = this.currentSlide;
      if (this.currentSlide === this.innerElements.length - this.perPage && this.config.loop) {
        this.currentSlide = 0;
      } else {
        this.currentSlide = Math.min(this.currentSlide + howManySlides, this.innerElements.length - this.perPage);
      }
      if (beforeChange !== this.currentSlide) {
        this.slideToCurrent();
        this.config.onChange.call(this);
        if (callback) {
          callback.call(this);
        }
      }
    }

    /**
     * Go to slide with particular index
     * @param {number} index - Item index to slide to.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'goTo',
    value: function goTo(index, callback) {
      if (this.innerElements.length <= this.perPage) {
        return;
      }
      var beforeChange = this.currentSlide;
      this.currentSlide = Math.min(Math.max(index, 0), this.innerElements.length - this.perPage);
      if (beforeChange !== this.currentSlide) {
        this.slideToCurrent();
        this.config.onChange.call(this);
        if (callback) {
          callback.call(this);
        }
      }
    }

    /**
     * Moves sliders frame to position of currently active slide
     */

  }, {
    key: 'slideToCurrent',
    value: function slideToCurrent() {
      this.sliderFrame.style[this.transformProperty] = 'translate3d(-' + this.currentSlide * (this.selectorWidth / this.perPage) + 'px, 0, 0)';
    }

    /**
     * Recalculate drag /swipe event and reposition the frame of a slider
     */

  }, {
    key: 'updateAfterDrag',
    value: function updateAfterDrag() {
      var movement = this.drag.endX - this.drag.startX;
      var movementDistance = Math.abs(movement);
      var howManySliderToSlide = Math.ceil(movementDistance / (this.selectorWidth / this.perPage));

      if (movement > 0 && movementDistance > this.config.threshold && this.innerElements.length > this.perPage) {
        this.prev(howManySliderToSlide);
      } else if (movement < 0 && movementDistance > this.config.threshold && this.innerElements.length > this.perPage) {
        this.next(howManySliderToSlide);
      }
      this.slideToCurrent();
    }

    /**
     * When window resizes, resize slider components as well
     */

  }, {
    key: 'resizeHandler',
    value: function resizeHandler() {
      // update perPage number dependable of user value
      this.resolveSlidesNumber();

      this.selectorWidth = this.selector.offsetWidth;
      this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + 'px';

      this.slideToCurrent();

      this.setButtonPositions();
    }

    /**
     * Clear drag after touchend and mouseup event
     */

  }, {
    key: 'clearDrag',
    value: function clearDrag() {
      this.drag = {
        startX: 0,
        endX: 0,
        startY: 0,
        letItGo: null
      };
    }

    /**
     * touchstart event handler
     */

  }, {
    key: 'touchstartHandler',
    value: function touchstartHandler(e) {
      e.stopPropagation();
      this.pointerDown = true;
      this.drag.startX = e.touches[0].pageX;
      this.drag.startY = e.touches[0].pageY;
    }

    /**
     * touchend event handler
     */

  }, {
    key: 'touchendHandler',
    value: function touchendHandler(e) {
      e.stopPropagation();
      this.pointerDown = false;
      this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      if (this.drag.endX) {
        this.updateAfterDrag();
      }
      this.clearDrag();
    }

    /**
     * touchmove event handler
     */

  }, {
    key: 'touchmoveHandler',
    value: function touchmoveHandler(e) {
      e.stopPropagation();

      if (this.drag.letItGo === null) {
        this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX);
      }

      if (this.pointerDown && this.drag.letItGo) {
        this.drag.endX = e.touches[0].pageX;
        this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing;
        this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing;
        this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.startX - this.drag.endX)) * -1 + 'px, 0, 0)';
      }
    }

    /**
     * mousedown event handler
     */

  }, {
    key: 'mousedownHandler',
    value: function mousedownHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      this.pointerDown = true;
      this.drag.startX = e.pageX;
    }

    /**
     * mouseup event handler
     */

  }, {
    key: 'mouseupHandler',
    value: function mouseupHandler(e) {
      e.stopPropagation();
      this.pointerDown = false;
      this.selector.style.cursor = '-webkit-grab';
      this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      if (this.drag.endX) {
        this.updateAfterDrag();
      }
      this.clearDrag();
    }

    /**
     * mousemove event handler
     */

  }, {
    key: 'mousemoveHandler',
    value: function mousemoveHandler(e) {
      e.preventDefault();
      if (this.pointerDown) {
        this.drag.endX = e.pageX;
        this.selector.style.cursor = '-webkit-grabbing';
        this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing;
        this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing;
        this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.startX - this.drag.endX)) * -1 + 'px, 0, 0)';
      }
    }

    /**
     * mouseleave event handler
     */

  }, {
    key: 'mouseleaveHandler',
    value: function mouseleaveHandler(e) {
      if (this.pointerDown) {
        this.pointerDown = false;
        this.selector.style.cursor = '-webkit-grab';
        this.drag.endX = e.pageX;
        this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
        this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
        this.updateAfterDrag();
        this.clearDrag();
      }
    }

    /**
     * Update after removing, prepending or appending items.
     */

  }, {
    key: 'updateFrame',
    value: function updateFrame() {
      // Create frame and apply styling
      this.sliderFrame = document.createElement('div');
      this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + 'px';
      this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing;
      this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing;

      if (this.config.draggable) {
        this.selector.style.cursor = '-webkit-grab';
      }

      // Create a document fragment to put slides into it
      var docFragment = document.createDocumentFragment();

      // Loop through the slides, add styling and add them to document fragment
      for (var i = 0; i < this.innerElements.length; i++) {
        var elementContainer = document.createElement('div');
        elementContainer.style.cssFloat = 'left';
        elementContainer.style.float = 'left';
        elementContainer.style.width = 100 / this.innerElements.length + '%';
        elementContainer.appendChild(this.innerElements[i]);
        docFragment.appendChild(elementContainer);
      }

      // Add fragment to the frame
      this.sliderFrame.appendChild(docFragment);

      // Clear selector (just in case something is there) and insert a frame
      this.selector.innerHTML = '';
      this.selector.appendChild(this.sliderFrame);

      // Go to currently active slide after initial build
      this.slideToCurrent();
    }

    /**
     * Remove item from carousel.
     * @param {number} index - Item index to remove.
     * @param {function} callback - Optional callback to call after remove.
     */

  }, {
    key: 'remove',
    value: function remove(index, callback) {
      if (index < 0 || index >= this.innerElements.length) {
        throw new Error('Item to remove doesn\'t exist 😭');
      }
      this.innerElements.splice(index, 1);

      // Avoide shifting content
      this.currentSlide = index <= this.currentSlide ? this.currentSlide - 1 : this.currentSlide;

      this.updateFrame();
      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Insert item to carousel at particular index.
     * @param {HTMLNode} item - Item to insert.
     * @param {number} index - Index of new new item insertion.
     * @param {function} callback - Optional callback to call after insert.
     */

  }, {
    key: 'insert',
    value: function insert(item, index, callback) {
      if (index < 0 || index > this.innerElements.length + 1) {
        throw new Error('Unable to inset it at this index 😭');
      }
      if (this.innerElements.indexOf(item) !== -1) {
        throw new Error('The same item in a carousel? Really? Nope 😭');
      }
      this.innerElements.splice(index, 0, item);

      // Avoide shifting content
      this.currentSlide = index <= this.currentSlide ? this.currentSlide + 1 : this.currentSlide;

      this.updateFrame();
      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Prepernd item to carousel.
     * @param {HTMLNode} item - Item to prepend.
     * @param {function} callback - Optional callback to call after prepend.
     */

  }, {
    key: 'prepend',
    value: function prepend(item, callback) {
      this.insert(item, 0);
      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Append item to carousel.
     * @param {HTMLNode} item - Item to append.
     * @param {function} callback - Optional callback to call after append.
     */

  }, {
    key: 'append',
    value: function append(item, callback) {
      this.insert(item, this.innerElements.length + 1);
      if (callback) {
        callback.call(this);
      }
    }

    /**
     * Append navigation butotns to carousel.
     * @param {string} bgColor - Button background color.
     */

  }, {
    key: 'createButtons',
    value: function createButtons(bgColor) {
      var _this2 = this;

      this.prevButton = document.createElement('span');
      this.nextButton = document.createElement('span');
      this.prevButton.innerHTML = '<img class="arrow" src="' + _arrowLeft2.default + '" />';
      this.nextButton.innerHTML = '<img class="arrow" src="' + _arrowRight2.default + '" />';
      this.selector.parentNode.appendChild(this.prevButton);
      this.selector.parentNode.appendChild(this.nextButton);

      var buttonStyles = {
        'position': 'absolute',
        'top': this.selector.offsetTop,
        'width': '2rem',
        'height': '2rem',
        'border-radius': '50%',
        'background-color': bgColor,
        'padding': '0.2rem',
        'cursor': 'pointer'
      };

      for (var style in buttonStyles) {
        this.prevButton.style[style] = buttonStyles[style];
        this.nextButton.style[style] = buttonStyles[style];
      }

      this.setButtonPositions();

      this.prevButton.addEventListener('click', function () {
        return _this2.prev();
      });
      this.nextButton.addEventListener('click', function () {
        return _this2.next();
      });
    }
  }, {
    key: 'setButtonPositions',
    value: function setButtonPositions() {
      var pos = (window.innerWidth - this.selector.offsetWidth) / 4;
      this.prevButton.style.left = pos + 'px';
      this.nextButton.style.right = pos + 'px';
    }
    /**
     * Removes listeners and optionally restores to initial markup
     * @param {boolean} restoreMarkup - Determinants about restoring an initial markup.
     * @param {function} callback - Optional callback function.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var restoreMarkup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var callback = arguments[1];

      window.removeEventListener('resize', this.resizeHandler);
      this.selector.style.cursor = 'auto';
      this.selector.removeEventListener('touchstart', this.touchstartHandler);
      this.selector.removeEventListener('touchend', this.touchendHandler);
      this.selector.removeEventListener('touchmove', this.touchmoveHandler);
      this.selector.removeEventListener('mousedown', this.mousedownHandler);
      this.selector.removeEventListener('mouseup', this.mouseupHandler);
      this.selector.removeEventListener('mouseleave', this.mouseleaveHandler);
      this.selector.removeEventListener('mousemove', this.mousemoveHandler);

      if (restoreMarkup) {
        var slides = document.createDocumentFragment();
        for (var i = 0; i < this.innerElements.length; i++) {
          slides.appendChild(this.innerElements[i]);
        }
        this.selector.innerHTML = '';
        this.selector.appendChild(slides);
        this.selector.removeAttribute('style');
      }

      if (callback) {
        callback.call(this);
      }
    }
  }], [{
    key: 'mergeSettings',
    value: function mergeSettings(options) {
      var settings = {
        selector: '.siema',
        duration: 200,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        threshold: 20,
        loop: false,
        onInit: function onInit() {},
        onChange: function onChange() {}
      };
      var userSttings = options;
      for (var attrname in userSttings) {
        settings[attrname] = userSttings[attrname];
      }
      return settings;
    }

    /**
     * Determine if browser supports unprefixed transform property.
     * @returns {string} - Transform property supported by client.
     */

  }, {
    key: 'webkitOrNot',
    value: function webkitOrNot() {
      var style = document.documentElement.style;
      if (typeof style.transform == 'string') {
        return 'transform';
      }
      return 'WebkitTransform';
    }
  }]);

  return Siema;
}();

exports.default = Siema;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slideify = __webpack_require__(0);

var _slideify2 = _interopRequireDefault(_slideify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slider = new _slideify2.default({
  selector: '.slider',
  duration: 200,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  loop: true,
  onInit: function onInit() {},
  onChange: function onChange() {}
});

slider.createButtons('transparent');

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTQ3MyAxNTU5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDIgKDM2NzgxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICA8dGl0bGU+YXJyb3ctbGVmdDwvdGl0bGU+CiAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgPGRlZnM+PC9kZWZzPgogIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgaWQ9ImFycm93LWxlZnQiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iIzAwMDAwMCI+CiAgICAgIDxnIGlkPSJnMzAwMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzM2LjcxMTg2NCwgNzc5LjY3ODAwMCkgc2NhbGUoLTEsIDEpIHJvdGF0ZSgtMTgwLjAwMDAwMCkgdHJhbnNsYXRlKC03MzYuNzExODY0LCAtNzc5LjY3ODAwMCkgdHJhbnNsYXRlKDAuNzExODY0LCAwLjY3ODAwMCkiPgogICAgICAgIDxwYXRoCiAgICAgICAgICBkPSJNMTQ3Miw4NDMgTDE0NzIsNzE1IEMxNDcyLDY3OS42NjY2NjcgMTQ2MS4xNjY2Nyw2NDkuNSAxNDM5LjUsNjI0LjUgQzE0MTcuODMzMzMsNTk5LjUgMTM4OS42NjY2Nyw1ODcgMTM1NSw1ODcgTDY1MSw1ODcgTDk0NCwyOTMgQzk2OS4zMzMzMzMsMjY5IDk4MiwyMzkgOTgyLDIwMyBDOTgyLDE2NyA5NjkuMzMzMzMzLDEzNyA5NDQsMTEzIEw4NjksMzcgQzg0NC4zMzMzMzMsMTIuMzMzMzMzMyA4MTQuMzMzMzMzLC0yLjI3MzczNjc1ZS0xMyA3NzksLTIuMjczNzM2NzVlLTEzIEM3NDQuMzMzMzMzLC0yLjI3MzczNjc1ZS0xMyA3MTQsMTIuMzMzMzMzMyA2ODgsMzcgTDM3LDY4OSBDMTIuMzMzMzMzMyw3MTMuNjY2NjY3IC0yLjI3MzczNjc1ZS0xMyw3NDMuNjY2NjY3IC0yLjI3MzczNjc1ZS0xMyw3NzkgQy0yLjI3MzczNjc1ZS0xMyw4MTMuNjY2NjY3IDEyLjMzMzMzMzMsODQ0IDM3LDg3MCBMNjg4LDE1MjAgQzcxMy4zMzMzMzMsMTU0NS4zMzMzMyA3NDMuNjY2NjY3LDE1NTggNzc5LDE1NTggQzgxMy42NjY2NjcsMTU1OCA4NDMuNjY2NjY3LDE1NDUuMzMzMzMgODY5LDE1MjAgTDk0NCwxNDQ2IEM5NjkuMzMzMzMzLDE0MjAuNjY2NjcgOTgyLDEzOTAuMzMzMzMgOTgyLDEzNTUgQzk4MiwxMzE5LjY2NjY3IDk2OS4zMzMzMzMsMTI4OS4zMzMzMyA5NDQsMTI2NCBMNjUxLDk3MSBMMTM1NSw5NzEgQzEzODkuNjY2NjcsOTcxIDE0MTcuODMzMzMsOTU4LjUgMTQzOS41LDkzMy41IEMxNDYxLjE2NjY3LDkwOC41IDE0NzIsODc4LjMzMzMzMyAxNDcyLDg0MyBaIgogICAgICAgICAgaWQ9InBhdGgzMDA1Ij48L3BhdGg+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo="

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTQ3MyAxNTU5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDIgKDM2NzgxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICA8dGl0bGU+YXJyb3ctcmlnaHQ8L3RpdGxlPgogIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogIDxkZWZzPjwvZGVmcz4KICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxnIGlkPSJhcnJvdy1yaWdodCIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgPGcgaWQ9ImczMDE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MzYuMjcxMTkwLCA3NzkuMDUwODAwKSBzY2FsZSgtMSwgMSkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTczNi4yNzExOTAsIC03NzkuMDUwODAwKSB0cmFuc2xhdGUoMC4yNzExOTAsIDAuMDUwODAwKSI+CiAgICAgICAgPHBhdGgKICAgICAgICAgIGQ9Ik0xNDcyLDc3OSBDMTQ3Miw3NDMgMTQ1OS42NjY2Nyw3MTIuNjY2NjY3IDE0MzUsNjg4IEw3ODQsMzcgQzc1OCwxMi4zMzMzMzMzIDcyNy42NjY2NjcsMCA2OTMsMCBDNjU5LDAgNjI5LDEyLjMzMzMzMzMgNjAzLDM3IEw1MjgsMTEyIEM1MDIuNjY2NjY3LDEzNy4zMzMzMzMgNDkwLDE2Ny42NjY2NjcgNDkwLDIwMyBDNDkwLDIzOC4zMzMzMzMgNTAyLjY2NjY2NywyNjguNjY2NjY3IDUyOCwyOTQgTDgyMSw1ODcgTDExNyw1ODcgQzgyLjMzMzMzMzMsNTg3IDU0LjE2NjY2NjcsNTk5LjUgMzIuNSw2MjQuNSBDMTAuODMzMzMzMyw2NDkuNSAwLDY3OS42NjY2NjcgMCw3MTUgTDAsODQzIEMwLDg3OC4zMzMzMzMgMTAuODMzMzMzMyw5MDguNSAzMi41LDkzMy41IEM1NC4xNjY2NjY3LDk1OC41IDgyLjMzMzMzMzMsOTcxIDExNyw5NzEgTDgyMSw5NzEgTDUyOCwxMjY1IEM1MDIuNjY2NjY3LDEyODkgNDkwLDEzMTkgNDkwLDEzNTUgQzQ5MCwxMzkxIDUwMi42NjY2NjcsMTQyMSA1MjgsMTQ0NSBMNjAzLDE1MjAgQzYyOC4zMzMzMzMsMTU0NS4zMzMzMyA2NTguMzMzMzMzLDE1NTggNjkzLDE1NTggQzcyOC4zMzMzMzMsMTU1OCA3NTguNjY2NjY3LDE1NDUuMzMzMzMgNzg0LDE1MjAgTDE0MzUsODY5IEMxNDU5LjY2NjY3LDg0NS42NjY2NjcgMTQ3Miw4MTUuNjY2NjY3IDE0NzIsNzc5IFoiCiAgICAgICAgICBpZD0icGF0aDMwMTciPjwvcGF0aD4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg=="

/***/ })
/******/ ]);