(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _burgerMenu = _interopRequireDefault(require("./modules/burger-menu"));

var _popup = _interopRequireDefault(require("./modules/popup"));

var _sendForm = _interopRequireDefault(require("./modules/send-form"));

var _headerFix = _interopRequireDefault(require("./temp-modules/header-fix"));

var _scrollSmooth = _interopRequireDefault(require("./temp-modules/scroll-smooth"));

var _cookieBanner = _interopRequireDefault(require("./modules/cookie-banner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.
(function ($) {
  // When DOM is ready
  $(function () {
    _burgerMenu["default"].init();

    _popup["default"].init();

    _headerFix["default"].init();

    _scrollSmooth["default"].init();

    _sendForm["default"].init();

    AOS.init({
      delay: 500,
      duration: 1000
    });

    _cookieBanner["default"].init(); // video


    document.querySelector('.main-video').playbackRate = 0.8;
  });
})(jQuery);

},{"./modules/burger-menu":2,"./modules/cookie-banner":3,"./modules/popup":4,"./modules/send-form":5,"./temp-modules/header-fix":6,"./temp-modules/scroll-smooth":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var burgerMenu = function () {
  var BURGER = document.querySelector('.burger');
  var NAV = document.querySelector('.nav');
  var BODY = document.querySelector('body');
  var OVERFLOW = 'overflow';
  var ACTIVE = 'active';

  var burgerFunc = function burgerFunc() {
    BURGER.addEventListener('click', function () {
      BURGER.classList.toggle(ACTIVE);
      NAV.classList.toggle(ACTIVE);
      BODY.classList.toggle(OVERFLOW);
    });
  };

  var init = function init() {
    burgerFunc();
  };

  return {
    init: init
  };
}();

var _default = burgerMenu;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// cookie banner
var cookieBanner = function () {
  var cookieWrap = document.querySelector('.cookie-wrap');
  var cookieButton = document.querySelector('.cookie-btn');

  var showBanner = function showBanner() {
    cookieButton.addEventListener('click', function () {
      cookieWrap.classList.remove('active');
      localStorage.setItem('cookieBannerDisplayed', 'true');
    });
    setTimeout(function () {
      if (!localStorage.getItem('cookieBannerDisplayed')) {
        cookieWrap.classList.add('active');
      }
    }, 2000);
  };

  var init = function init() {
    showBanner();
  };

  return {
    init: init
  };
}();

var _default = cookieBanner;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var POPUP_SHOW = document.querySelectorAll('.show-popup');
var POPUPS = document.querySelectorAll('.popup');
var OVERLAY = document.querySelector('.js-overlay');
var HTML = document.getElementsByTagName('html')[0];
var CLOSE_BTN = document.querySelectorAll('.js-popup-close');
var CLASS_ACTIVE = 'active';
var CLASS_NOSCROLL = 'noscroll';

var popups = function () {
  var hidePopup = function hidePopup() {
    OVERLAY.classList.remove(CLASS_ACTIVE);
    HTML.classList.remove(CLASS_NOSCROLL);

    for (var i = 0; i < POPUPS.length; i += 1) {
      if (POPUPS[i].classList.contains('active')) {
        POPUPS[i].classList.remove(CLASS_ACTIVE);
      }
    }
  };

  var showPopup = function showPopup(target) {
    OVERLAY.classList.add(CLASS_ACTIVE);
    HTML.classList.add(CLASS_NOSCROLL);
    var currentPopup = document.getElementById(target);
    currentPopup.classList.add(CLASS_ACTIVE);
  };

  var showPopupInit = function showPopupInit() {
    if (POPUP_SHOW !== null) {
      for (var i = 0; i < POPUP_SHOW.length; i += 1) {
        POPUP_SHOW[i].addEventListener('click', function (event) {
          showPopup(this.dataset.popup);
        });
      }
    }

    if (OVERLAY !== null) {
      OVERLAY.addEventListener('click', function (event) {
        hidePopup();
      });
    }

    if (CLOSE_BTN !== null) {
      for (var _i = 0; _i < CLOSE_BTN.length; _i += 1) {
        CLOSE_BTN[_i].addEventListener('click', function (event) {
          hidePopup();
        });
      }
    }
  };

  var init = function init() {
    if (POPUPS.length > 0) {
      showPopupInit();
    }
  };

  return {
    init: init,
    showPopup: showPopup
  };
}();

var _default = popups;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _popup = _interopRequireDefault(require("./popup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CONTACT = {
  email: {
    presence: true,
    email: true
  },
  name: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 20
    },
    format: {
      pattern: '[a-z 0-9]+',
      flags: 'i',
      message: 'can only contain a-z and 0-9'
    }
  },
  phone: {
    presence: false,
    format: {
      pattern: '[0-9-]+',
      flags: 'i',
      message: 'can only contain 0-9 -'
    }
  },
  message: {
    presence: false
  }
};
var FORM_CONTACT = document.getElementById('form-contact');
var FORM_GROUP = 'form__group';
var MESSAGE = '.form__error-text';

var sendForm = function () {
  var addError = function addError(messages, error) {
    var block = document.createElement('p');
    block.classList.add('help-block');
    block.classList.add('error');
    block.innerHTML = error;
    messages.appendChild(block);
  };

  var resetFormGroup = function resetFormGroup(formGroup) {
    formGroup.classList.remove('has-error');
    formGroup.classList.remove('has-success');
    formGroup.querySelectorAll('.help-block.error').forEach(function (el) {
      el.parentNode.removeChild(el);
    });
  };

  var closestParent = function closestParent(child, className) {
    if (!child || child === document) {
      return null;
    }

    if (child.classList.contains(className)) {
      return child;
    }

    return closestParent(child.parentNode, className);
  };

  var showErrorsForInput = function showErrorsForInput(input, errors) {
    var formGroup = closestParent(input.parentNode, FORM_GROUP);
    var messages = formGroup.querySelector(MESSAGE);
    resetFormGroup(formGroup);

    if (errors) {
      formGroup.classList.add('has-error');
      errors.forEach(function (error) {
        addError(messages, error);
      });
    } else {
      formGroup.classList.add('has-success');
    }
  };

  var showErrors = function showErrors(form, errors) {
    form.querySelectorAll('input[name], select[name], textarea').forEach(function (input) {
      showErrorsForInput(input, errors && errors[input.name]);
    });
  };

  var clearForm = function clearForm() {
    document.getElementsByName('form-contact')[0].reset();
  };

  var sendData = function sendData(data) {
    $.ajax({
      type: 'POST',
      url: '../sendForm.php',
      data: data,
      // serializes the form's elements.
      dataType: 'json',
      encode: true
    }).done(function (response) {
      if (response.success && response.redirect) {
        _popup["default"].showPopup('form-popup');

        clearForm();
      }
    });
  };

  var validationForm = function validationForm() {
    if (FORM_CONTACT !== null) {
      FORM_CONTACT.addEventListener('submit', function sub(ev) {
        ev.preventDefault();
        var values = validate.collectFormValues(this);
        var errors = validate(values, CONTACT);

        if (errors) {
          showErrors(this, errors || {});
        } else {
          var data = $(this).serialize();
          sendData(data);
        }
      });
    }
  };

  var init = function init() {
    if (document.getElementsByClassName('form').length > 0) {
      validationForm();
    }
  };

  return {
    init: init
  };
}();

var _default = sendForm;
exports["default"] = _default;

},{"./popup":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var $header = $('.header');
var HEIGHT_SCROLL = 100;
var CLASS_FIXED = 'fixed';

var headerFixed = function () {
  var headerFixedUnit = function headerFixedUnit() {
    $(window).scroll(function () {
      if ($(window).scrollTop() > HEIGHT_SCROLL) {
        $header.addClass(CLASS_FIXED);
      } else {
        $header.removeClass(CLASS_FIXED);
      }
    });
  };

  var init = function init() {
    headerFixedUnit();
  };

  return {
    init: init
  };
}();

var _default = headerFixed;
exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var BURGER = document.querySelector('.burger');
var NAV = document.querySelector('.nav');
var BODY = document.querySelector('body');

var scrollSmooth = function () {
  var smoothScroll = function smoothScroll() {
    var scroll = function scroll(targetEl, duration) {
      var targets = document.querySelector(targetEl);
      var targetsPosition = targets.getBoundingClientRect().top - 114;
      var startsPosition = window.pageYOffset;
      var startTime = null;

      var ease = function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t -= 1;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      var animation = function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startsPosition, targetsPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    };

    var scrollTo = function scrollTo() {
      var links = document.querySelectorAll('.js-smooth-scroll');
      links.forEach(function (each) {
        each.addEventListener('click', function () {
          var currentTarget = this.getAttribute('href');
          BURGER.classList.remove('active');
          NAV.classList.remove('active');
          BODY.classList.remove('overflow');
          scroll(currentTarget, 1000);
        });
      });
    };

    scrollTo();
  };

  var init = function init() {
    smoothScroll();
  };

  return {
    init: init
  };
}();

var _default = scrollSmooth;
exports["default"] = _default;

},{}]},{},[1]);
