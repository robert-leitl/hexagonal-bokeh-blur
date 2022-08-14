// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3nzkr":[function(require,module,exports) {
var _tweakpane = require("tweakpane");
var _hexagonalBokeh = require("./hexagonal-bokeh");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var debugParam = urlParams.get('debug');
var DEBUG = debugParam !== null;
// Only runs in development and will be stripped in production builds.
DEBUG = true;
var sketch;
var resizeTimeoutId;
window.addEventListener('load', function() {
    var canvas = document.body.querySelector('#c');
    var pane;
    if (DEBUG) pane = new _tweakpane.Pane({
        title: 'Settings'
    });
    sketch = new _hexagonalBokeh.HexagonalBokeh(canvas, pane, function(sketch1) {
        sketch1.run();
    });
});
window.addEventListener('resize', function() {
    if (sketch) {
        if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
        resizeTimeoutId = setTimeout(function() {
            resizeTimeoutId = null;
            sketch.resize();
        }, 300);
    }
});

},{"tweakpane":"hcx0X","./hexagonal-bokeh":"cB5bs"}],"hcx0X":[function(require,module,exports) {
var _helpers = require("@swc/helpers");
/*! Tweakpane 3.0.7 (c) 2016 cocopon, licensed under the MIT license. */ (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define([
        'exports'
    ], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tweakpane = {
    }));
})(undefined, function(exports) {
    'use strict';
    var Semver = /***
     * A simple semantic versioning perser.
     */ /*#__PURE__*/ function() {
        function Semver(text) {
            _helpers.classCallCheck(this, Semver);
            var ref = _helpers.slicedToArray(text.split('-'), 2), core = ref[0], prerelease = ref[1];
            var coreComps = core.split('.');
            this.major = parseInt(coreComps[0], 10);
            this.minor = parseInt(coreComps[1], 10);
            this.patch = parseInt(coreComps[2], 10);
            this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
        }
        _helpers.createClass(Semver, [
            {
                key: "toString",
                value: function toString() {
                    var core = [
                        this.major,
                        this.minor,
                        this.patch
                    ].join('.');
                    return this.prerelease !== null ? [
                        core,
                        this.prerelease
                    ].join('-') : core;
                }
            }
        ]);
        return Semver;
    }();
    var BladeApi = /*#__PURE__*/ function() {
        function BladeApi(controller) {
            _helpers.classCallCheck(this, BladeApi);
            this.controller_ = controller;
        }
        _helpers.createClass(BladeApi, [
            {
                key: "disabled",
                get: function get() {
                    return this.controller_.viewProps.get('disabled');
                },
                set: function set(disabled) {
                    this.controller_.viewProps.set('disabled', disabled);
                }
            },
            {
                key: "hidden",
                get: function get() {
                    return this.controller_.viewProps.get('hidden');
                },
                set: function set(hidden) {
                    this.controller_.viewProps.set('hidden', hidden);
                }
            },
            {
                key: "dispose",
                value: function dispose() {
                    this.controller_.viewProps.set('disposed', true);
                }
            }
        ]);
        return BladeApi;
    }();
    var TpEvent = function TpEvent(target) {
        _helpers.classCallCheck(this, TpEvent);
        this.target = target;
    };
    var TpChangeEvent = /*#__PURE__*/ function(TpEvent) {
        _helpers.inherits(TpChangeEvent, TpEvent);
        var _super = _helpers.createSuper(TpChangeEvent);
        function TpChangeEvent(target, value, presetKey, last) {
            _helpers.classCallCheck(this, TpChangeEvent);
            var _this;
            _this = _super.call(this, target);
            _this.value = value;
            _this.presetKey = presetKey;
            _this.last = last !== null && last !== void 0 ? last : true;
            return _this;
        }
        return TpChangeEvent;
    }(TpEvent);
    var TpUpdateEvent = /*#__PURE__*/ function(TpEvent) {
        _helpers.inherits(TpUpdateEvent, TpEvent);
        var _super = _helpers.createSuper(TpUpdateEvent);
        function TpUpdateEvent(target, value, presetKey) {
            _helpers.classCallCheck(this, TpUpdateEvent);
            var _this;
            _this = _super.call(this, target);
            _this.value = value;
            _this.presetKey = presetKey;
            return _this;
        }
        return TpUpdateEvent;
    }(TpEvent);
    var TpFoldEvent = /*#__PURE__*/ function(TpEvent) {
        _helpers.inherits(TpFoldEvent, TpEvent);
        var _super = _helpers.createSuper(TpFoldEvent);
        function TpFoldEvent(target, expanded) {
            _helpers.classCallCheck(this, TpFoldEvent);
            var _this;
            _this = _super.call(this, target);
            _this.expanded = expanded;
            return _this;
        }
        return TpFoldEvent;
    }(TpEvent);
    function forceCast(v) {
        return v;
    }
    function isEmpty(value) {
        return value === null || value === undefined;
    }
    function deepEqualsArray(a1, a2) {
        if (a1.length !== a2.length) return false;
        for(var i = 0; i < a1.length; i++){
            if (a1[i] !== a2[i]) return false;
        }
        return true;
    }
    var CREATE_MESSAGE_MAP = {
        alreadydisposed: function() {
            return 'View has been already disposed';
        },
        invalidparams: function(context) {
            return "Invalid parameters for '".concat(context.name, "'");
        },
        nomatchingcontroller: function(context) {
            return "No matching controller for '".concat(context.key, "'");
        },
        nomatchingview: function(context) {
            return "No matching view for '".concat(JSON.stringify(context.params), "'");
        },
        notbindable: function() {
            return "Value is not bindable";
        },
        propertynotfound: function(context) {
            return "Property '".concat(context.name, "' not found");
        },
        shouldneverhappen: function() {
            return 'This error should never happen';
        }
    };
    var TpError = /*#__PURE__*/ function() {
        function TpError(config) {
            _helpers.classCallCheck(this, TpError);
            var _a;
            this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : 'Unexpected error';
            this.name = this.constructor.name;
            this.stack = new Error(this.message).stack;
            this.type = config.type;
        }
        _helpers.createClass(TpError, null, [
            {
                key: "alreadyDisposed",
                value: function alreadyDisposed() {
                    return new TpError({
                        type: 'alreadydisposed'
                    });
                }
            },
            {
                key: "notBindable",
                value: function notBindable() {
                    return new TpError({
                        type: 'notbindable'
                    });
                }
            },
            {
                key: "propertyNotFound",
                value: function propertyNotFound(name) {
                    return new TpError({
                        type: 'propertynotfound',
                        context: {
                            name: name
                        }
                    });
                }
            },
            {
                key: "shouldNeverHappen",
                value: function shouldNeverHappen() {
                    return new TpError({
                        type: 'shouldneverhappen'
                    });
                }
            }
        ]);
        return TpError;
    }();
    var BindingTarget = /*#__PURE__*/ function() {
        function BindingTarget(obj, key, opt_id) {
            _helpers.classCallCheck(this, BindingTarget);
            this.obj_ = obj;
            this.key_ = key;
            this.presetKey_ = opt_id !== null && opt_id !== void 0 ? opt_id : key;
        }
        _helpers.createClass(BindingTarget, [
            {
                key: "key",
                get: function get() {
                    return this.key_;
                }
            },
            {
                key: "presetKey",
                get: function get() {
                    return this.presetKey_;
                }
            },
            {
                key: "read",
                value: function read() {
                    return this.obj_[this.key_];
                }
            },
            {
                key: "write",
                value: function write(value) {
                    this.obj_[this.key_] = value;
                }
            },
            {
                key: "writeProperty",
                value: function writeProperty(name, value) {
                    var valueObj = this.read();
                    if (!BindingTarget.isBindable(valueObj)) throw TpError.notBindable();
                    if (!(name in valueObj)) throw TpError.propertyNotFound(name);
                    valueObj[name] = value;
                }
            }
        ], [
            {
                key: "isBindable",
                value: function isBindable(obj) {
                    if (obj === null) return false;
                    if (typeof obj !== 'object') return false;
                    return true;
                }
            }
        ]);
        return BindingTarget;
    }();
    var ButtonApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(ButtonApi, BladeApi);
        var _super = _helpers.createSuper(ButtonApi);
        function ButtonApi() {
            _helpers.classCallCheck(this, ButtonApi);
            return _super.apply(this, arguments);
        }
        _helpers.createClass(ButtonApi, [
            {
                key: "label",
                get: function get() {
                    return this.controller_.props.get('label');
                },
                set: function set(label) {
                    this.controller_.props.set('label', label);
                }
            },
            {
                key: "title",
                get: function get() {
                    var _a;
                    return (_a = this.controller_.valueController.props.get('title')) !== null && _a !== void 0 ? _a : '';
                },
                set: function set(title) {
                    this.controller_.valueController.props.set('title', title);
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var _this = this;
                    var bh = handler.bind(this);
                    var emitter = this.controller_.valueController.emitter;
                    emitter.on(eventName, function() {
                        bh(new TpEvent(_this));
                    });
                    return this;
                }
            }
        ]);
        return ButtonApi;
    }(BladeApi);
    var Emitter = /*#__PURE__*/ function() {
        function Emitter() {
            _helpers.classCallCheck(this, Emitter);
            this.observers_ = {
            };
        }
        _helpers.createClass(Emitter, [
            {
                key: "on",
                value: function on(eventName, handler) {
                    var observers = this.observers_[eventName];
                    if (!observers) observers = this.observers_[eventName] = [];
                    observers.push({
                        handler: handler
                    });
                    return this;
                }
            },
            {
                key: "off",
                value: function off(eventName, handler) {
                    var observers = this.observers_[eventName];
                    if (observers) this.observers_[eventName] = observers.filter(function(observer) {
                        return observer.handler !== handler;
                    });
                    return this;
                }
            },
            {
                key: "emit",
                value: function emit(eventName, event) {
                    var observers = this.observers_[eventName];
                    if (!observers) return;
                    observers.forEach(function(observer) {
                        observer.handler(event);
                    });
                }
            }
        ]);
        return Emitter;
    }();
    var PREFIX = 'tp';
    function ClassName(viewName) {
        var fn = function(opt_elementName, opt_modifier) {
            return [
                PREFIX,
                '-',
                viewName,
                'v',
                opt_elementName ? "_".concat(opt_elementName) : '',
                opt_modifier ? "-".concat(opt_modifier) : '', 
            ].join('');
        };
        return fn;
    }
    function compose(h1, h2) {
        return function(input) {
            return h2(h1(input));
        };
    }
    function extractValue(ev) {
        return ev.rawValue;
    }
    function bindValue(value, applyValue) {
        value.emitter.on('change', compose(extractValue, applyValue));
        applyValue(value.rawValue);
    }
    function bindValueMap(valueMap, key, applyValue) {
        bindValue(valueMap.value(key), applyValue);
    }
    function applyClass(elem, className, active) {
        if (active) elem.classList.add(className);
        else elem.classList.remove(className);
    }
    function valueToClassName(elem, className) {
        return function(value) {
            applyClass(elem, className, value);
        };
    }
    function bindValueToTextContent(value, elem) {
        bindValue(value, function(text) {
            elem.textContent = text !== null && text !== void 0 ? text : '';
        });
    }
    var className$q = ClassName('btn');
    var ButtonView = function ButtonView(doc, config) {
        _helpers.classCallCheck(this, ButtonView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$q());
        config.viewProps.bindClassModifiers(this.element);
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className$q('b'));
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement('div');
        titleElem.classList.add(className$q('t'));
        bindValueToTextContent(config.props.value('title'), titleElem);
        this.buttonElement.appendChild(titleElem);
    };
    var ButtonController = /*#__PURE__*/ function() {
        function ButtonController(doc, config) {
            _helpers.classCallCheck(this, ButtonController);
            this.emitter = new Emitter();
            this.onClick_ = this.onClick_.bind(this);
            this.props = config.props;
            this.viewProps = config.viewProps;
            this.view = new ButtonView(doc, {
                props: this.props,
                viewProps: this.viewProps
            });
            this.view.buttonElement.addEventListener('click', this.onClick_);
        }
        _helpers.createClass(ButtonController, [
            {
                key: "onClick_",
                value: function onClick_() {
                    this.emitter.emit('click', {
                        sender: this
                    });
                }
            }
        ]);
        return ButtonController;
    }();
    var BoundValue = /*#__PURE__*/ function() {
        function BoundValue(initialValue, config) {
            _helpers.classCallCheck(this, BoundValue);
            var _a;
            this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
            this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : function(v1, v2) {
                return v1 === v2;
            };
            this.emitter = new Emitter();
            this.rawValue_ = initialValue;
        }
        _helpers.createClass(BoundValue, [
            {
                key: "constraint",
                get: function get() {
                    return this.constraint_;
                }
            },
            {
                key: "rawValue",
                get: function get() {
                    return this.rawValue_;
                },
                set: function set(rawValue) {
                    this.setRawValue(rawValue, {
                        forceEmit: false,
                        last: true
                    });
                }
            },
            {
                key: "setRawValue",
                value: function setRawValue(rawValue, options) {
                    var opts = options !== null && options !== void 0 ? options : {
                        forceEmit: false,
                        last: true
                    };
                    var constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
                    var changed = !this.equals_(this.rawValue_, constrainedValue);
                    if (!changed && !opts.forceEmit) return;
                    this.emitter.emit('beforechange', {
                        sender: this
                    });
                    this.rawValue_ = constrainedValue;
                    this.emitter.emit('change', {
                        options: opts,
                        rawValue: constrainedValue,
                        sender: this
                    });
                }
            }
        ]);
        return BoundValue;
    }();
    var PrimitiveValue = /*#__PURE__*/ function() {
        function PrimitiveValue(initialValue) {
            _helpers.classCallCheck(this, PrimitiveValue);
            this.emitter = new Emitter();
            this.value_ = initialValue;
        }
        _helpers.createClass(PrimitiveValue, [
            {
                key: "rawValue",
                get: function get() {
                    return this.value_;
                },
                set: function set(value) {
                    this.setRawValue(value, {
                        forceEmit: false,
                        last: true
                    });
                }
            },
            {
                key: "setRawValue",
                value: function setRawValue(value, options) {
                    var opts = options !== null && options !== void 0 ? options : {
                        forceEmit: false,
                        last: true
                    };
                    if (this.value_ === value && !opts.forceEmit) return;
                    this.emitter.emit('beforechange', {
                        sender: this
                    });
                    this.value_ = value;
                    this.emitter.emit('change', {
                        options: opts,
                        rawValue: this.value_,
                        sender: this
                    });
                }
            }
        ]);
        return PrimitiveValue;
    }();
    function createValue(initialValue, config) {
        var constraint = config === null || config === void 0 ? void 0 : config.constraint;
        var equals = config === null || config === void 0 ? void 0 : config.equals;
        if (!constraint && !equals) return new PrimitiveValue(initialValue);
        return new BoundValue(initialValue, config);
    }
    var ValueMap = /*#__PURE__*/ function() {
        function ValueMap(valueMap) {
            var _this = this, _loop = function(key) {
                var _this1 = _this;
                var v = _this.valMap_[key];
                v.emitter.on('change', function() {
                    _this1.emitter.emit('change', {
                        key: key,
                        sender: _this1
                    });
                });
            };
            _helpers.classCallCheck(this, ValueMap);
            this.emitter = new Emitter();
            this.valMap_ = valueMap;
            for(var key in this.valMap_)_loop(key);
        }
        _helpers.createClass(ValueMap, [
            {
                key: "get",
                value: function get(key) {
                    return this.valMap_[key].rawValue;
                }
            },
            {
                key: "set",
                value: function set(key, value) {
                    this.valMap_[key].rawValue = value;
                }
            },
            {
                key: "value",
                value: function value(key) {
                    return this.valMap_[key];
                }
            }
        ], [
            {
                key: "createCore",
                value: function createCore(initialValue) {
                    var keys = Object.keys(initialValue);
                    return keys.reduce(function(o, key) {
                        return Object.assign(o, _helpers.defineProperty({
                        }, key, createValue(initialValue[key])));
                    }, {
                    });
                }
            },
            {
                key: "fromObject",
                value: function fromObject(initialValue) {
                    var core = this.createCore(initialValue);
                    return new ValueMap(core);
                }
            }
        ]);
        return ValueMap;
    }();
    function parseObject(value, keyToParserMap) {
        var keys = Object.keys(keyToParserMap);
        var result1 = keys.reduce(function(tmp, key) {
            if (tmp === undefined) return undefined;
            var parser = keyToParserMap[key];
            var result = parser(value[key]);
            return result.succeeded ? Object.assign(Object.assign({
            }, tmp), _helpers.defineProperty({
            }, key, result.value)) : undefined;
        }, {
        });
        return forceCast(result1);
    }
    function parseArray(value, parseItem) {
        return value.reduce(function(tmp, item) {
            if (tmp === undefined) return undefined;
            var result = parseItem(item);
            if (!result.succeeded || result.value === undefined) return undefined;
            return _helpers.toConsumableArray(tmp).concat([
                result.value
            ]);
        }, []);
    }
    function isObject(value) {
        if (value === null) return false;
        return typeof value === 'object';
    }
    function createParamsParserBuilder(parse) {
        return function(optional) {
            return function(v) {
                if (!optional && v === undefined) return {
                    succeeded: false,
                    value: undefined
                };
                if (optional && v === undefined) return {
                    succeeded: true,
                    value: undefined
                };
                var result = parse(v);
                return result !== undefined ? {
                    succeeded: true,
                    value: result
                } : {
                    succeeded: false,
                    value: undefined
                };
            };
        };
    }
    function createParamsParserBuilders(optional) {
        return {
            custom: function(parse) {
                return createParamsParserBuilder(parse)(optional);
            },
            boolean: createParamsParserBuilder(function(v) {
                return typeof v === 'boolean' ? v : undefined;
            })(optional),
            number: createParamsParserBuilder(function(v) {
                return typeof v === 'number' ? v : undefined;
            })(optional),
            string: createParamsParserBuilder(function(v) {
                return typeof v === 'string' ? v : undefined;
            })(optional),
            function: createParamsParserBuilder(function(v) {
                return typeof v === 'function' ? v : undefined;
            })(optional),
            constant: function(value) {
                return createParamsParserBuilder(function(v) {
                    return v === value ? value : undefined;
                })(optional);
            },
            raw: createParamsParserBuilder(function(v) {
                return v;
            })(optional),
            object: function(keyToParserMap) {
                return createParamsParserBuilder(function(v) {
                    if (!isObject(v)) return undefined;
                    return parseObject(v, keyToParserMap);
                })(optional);
            },
            array: function(itemParser) {
                return createParamsParserBuilder(function(v) {
                    if (!Array.isArray(v)) return undefined;
                    return parseArray(v, itemParser);
                })(optional);
            }
        };
    }
    var ParamsParsers = {
        optional: createParamsParserBuilders(true),
        required: createParamsParserBuilders(false)
    };
    function parseParams(value, keyToParserMap) {
        var result = ParamsParsers.required.object(keyToParserMap)(value);
        return result.succeeded ? result.value : undefined;
    }
    function disposeElement(elem) {
        if (elem && elem.parentElement) elem.parentElement.removeChild(elem);
        return null;
    }
    function getAllBladePositions() {
        return [
            'veryfirst',
            'first',
            'last',
            'verylast'
        ];
    }
    var className$p = ClassName('');
    var POS_TO_CLASS_NAME_MAP = {
        veryfirst: 'vfst',
        first: 'fst',
        last: 'lst',
        verylast: 'vlst'
    };
    var BladeController = /*#__PURE__*/ function() {
        function BladeController(config) {
            var _this = this;
            _helpers.classCallCheck(this, BladeController);
            this.parent_ = null;
            this.blade = config.blade;
            this.view = config.view;
            this.viewProps = config.viewProps;
            var elem = this.view.element;
            this.blade.value('positions').emitter.on('change', function() {
                getAllBladePositions().forEach(function(pos) {
                    elem.classList.remove(className$p(undefined, POS_TO_CLASS_NAME_MAP[pos]));
                });
                _this.blade.get('positions').forEach(function(pos) {
                    elem.classList.add(className$p(undefined, POS_TO_CLASS_NAME_MAP[pos]));
                });
            });
            this.viewProps.handleDispose(function() {
                disposeElement(elem);
            });
        }
        _helpers.createClass(BladeController, [
            {
                key: "parent",
                get: function get() {
                    return this.parent_;
                }
            }
        ]);
        return BladeController;
    }();
    var SVG_NS = 'http://www.w3.org/2000/svg';
    function forceReflow(element) {
        element.offsetHeight;
    }
    function disableTransitionTemporarily(element, callback) {
        var t = element.style.transition;
        element.style.transition = 'none';
        callback();
        element.style.transition = t;
    }
    function supportsTouch(doc) {
        return doc.ontouchstart !== undefined;
    }
    function getGlobalObject() {
        return new Function('return this')();
    }
    function getWindowDocument() {
        var globalObj = forceCast(getGlobalObject());
        return globalObj.document;
    }
    function getCanvasContext(canvasElement) {
        var win = canvasElement.ownerDocument.defaultView;
        if (!win) return null;
        var isBrowser = 'document' in win;
        return isBrowser ? canvasElement.getContext('2d') : null;
    }
    var ICON_ID_TO_INNER_HTML_MAP = {
        check: '<path d="M2 8l4 4l8 -8"/>',
        dropdown: '<path d="M5 7h6l-3 3 z"/>',
        p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
    };
    function createSvgIconElement(document, iconId) {
        var elem = document.createElementNS(SVG_NS, 'svg');
        elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
        return elem;
    }
    function insertElementAt(parentElement, element, index) {
        parentElement.insertBefore(element, parentElement.children[index]);
    }
    function removeElement(element) {
        if (element.parentElement) element.parentElement.removeChild(element);
    }
    function removeChildElements(element) {
        while(element.children.length > 0)element.removeChild(element.children[0]);
    }
    function removeChildNodes(element) {
        while(element.childNodes.length > 0)element.removeChild(element.childNodes[0]);
    }
    function findNextTarget(ev) {
        if (ev.relatedTarget) return forceCast(ev.relatedTarget);
        if ('explicitOriginalTarget' in ev) return ev.explicitOriginalTarget;
        return null;
    }
    var className$o = ClassName('lbl');
    function createLabelNode(doc, label) {
        var frag = doc.createDocumentFragment();
        var lineNodes = label.split('\n').map(function(line) {
            return doc.createTextNode(line);
        });
        lineNodes.forEach(function(lineNode, index) {
            if (index > 0) frag.appendChild(doc.createElement('br'));
            frag.appendChild(lineNode);
        });
        return frag;
    }
    var LabelView = function LabelView(doc, config) {
        var _this = this;
        _helpers.classCallCheck(this, LabelView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$o());
        config.viewProps.bindClassModifiers(this.element);
        var labelElem = doc.createElement('div');
        labelElem.classList.add(className$o('l'));
        bindValueMap(config.props, 'label', function(value) {
            if (isEmpty(value)) _this.element.classList.add(className$o(undefined, 'nol'));
            else {
                _this.element.classList.remove(className$o(undefined, 'nol'));
                removeChildNodes(labelElem);
                labelElem.appendChild(createLabelNode(doc, value));
            }
        });
        this.element.appendChild(labelElem);
        this.labelElement = labelElem;
        var valueElem = doc.createElement('div');
        valueElem.classList.add(className$o('v'));
        this.element.appendChild(valueElem);
        this.valueElement = valueElem;
    };
    var LabelController = /*#__PURE__*/ function(BladeController) {
        _helpers.inherits(LabelController, BladeController);
        var _super = _helpers.createSuper(LabelController);
        function LabelController(doc, config) {
            _helpers.classCallCheck(this, LabelController);
            var _this;
            var viewProps = config.valueController.viewProps;
            _this = _super.call(this, Object.assign(Object.assign({
            }, config), {
                view: new LabelView(doc, {
                    props: config.props,
                    viewProps: viewProps
                }),
                viewProps: viewProps
            }));
            _this.props = config.props;
            _this.valueController = config.valueController;
            _this.view.valueElement.appendChild(_this.valueController.view.element);
            return _this;
        }
        return LabelController;
    }(BladeController);
    var ButtonBladePlugin = {
        id: 'button',
        type: 'blade',
        accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
                title: p.required.string,
                view: p.required.constant('button'),
                label: p.optional.string
            });
            return result ? {
                params: result
            } : null;
        },
        controller: function(args) {
            return new LabelController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                    label: args.params.label
                }),
                valueController: new ButtonController(args.document, {
                    props: ValueMap.fromObject({
                        title: args.params.title
                    }),
                    viewProps: args.viewProps
                })
            });
        },
        api: function(args) {
            if (!(args.controller instanceof LabelController)) return null;
            if (!(args.controller.valueController instanceof ButtonController)) return null;
            return new ButtonApi(args.controller);
        }
    };
    var ValueBladeController = /*#__PURE__*/ function(BladeController) {
        _helpers.inherits(ValueBladeController, BladeController);
        var _super = _helpers.createSuper(ValueBladeController);
        function ValueBladeController(config) {
            _helpers.classCallCheck(this, ValueBladeController);
            var _this;
            _this = _super.call(this, config);
            _this.value = config.value;
            return _this;
        }
        return ValueBladeController;
    }(BladeController);
    function createBlade() {
        return new ValueMap({
            positions: createValue([], {
                equals: deepEqualsArray
            })
        });
    }
    var Foldable = /*#__PURE__*/ function(ValueMap1) {
        _helpers.inherits(Foldable, ValueMap1);
        var _super = _helpers.createSuper(Foldable);
        function Foldable(valueMap) {
            _helpers.classCallCheck(this, Foldable);
            return _super.call(this, valueMap);
        }
        _helpers.createClass(Foldable, [
            {
                key: "styleExpanded",
                get: function get() {
                    var _a;
                    return (_a = this.get('temporaryExpanded')) !== null && _a !== void 0 ? _a : this.get('expanded');
                }
            },
            {
                key: "styleHeight",
                get: function get() {
                    if (!this.styleExpanded) return '0';
                    var exHeight = this.get('expandedHeight');
                    if (this.get('shouldFixHeight') && !isEmpty(exHeight)) return "".concat(exHeight, "px");
                    return 'auto';
                }
            },
            {
                key: "bindExpandedClass",
                value: function bindExpandedClass(elem, expandedClassName) {
                    var _this = this;
                    bindValueMap(this, 'expanded', function() {
                        var expanded = _this.styleExpanded;
                        if (expanded) elem.classList.add(expandedClassName);
                        else elem.classList.remove(expandedClassName);
                    });
                }
            }
        ], [
            {
                key: "create",
                value: function create(expanded) {
                    var coreObj = {
                        completed: true,
                        expanded: expanded,
                        expandedHeight: null,
                        shouldFixHeight: false,
                        temporaryExpanded: null
                    };
                    var core = ValueMap.createCore(coreObj);
                    return new Foldable(core);
                }
            }
        ]);
        return Foldable;
    }(ValueMap);
    function computeExpandedFolderHeight(folder, containerElement) {
        var height = 0;
        disableTransitionTemporarily(containerElement, function() {
            folder.set('expandedHeight', null);
            folder.set('temporaryExpanded', true);
            forceReflow(containerElement);
            height = containerElement.clientHeight;
            folder.set('temporaryExpanded', null);
            forceReflow(containerElement);
        });
        return height;
    }
    function applyHeight(foldable, elem) {
        elem.style.height = foldable.styleHeight;
    }
    function bindFoldable(foldable, elem) {
        foldable.value('expanded').emitter.on('beforechange', function() {
            foldable.set('completed', false);
            if (isEmpty(foldable.get('expandedHeight'))) foldable.set('expandedHeight', computeExpandedFolderHeight(foldable, elem));
            foldable.set('shouldFixHeight', true);
            forceReflow(elem);
        });
        foldable.emitter.on('change', function() {
            applyHeight(foldable, elem);
        });
        applyHeight(foldable, elem);
        elem.addEventListener('transitionend', function(ev) {
            if (ev.propertyName !== 'height') return;
            foldable.set('shouldFixHeight', false);
            foldable.set('expandedHeight', null);
            foldable.set('completed', true);
        });
    }
    var RackLikeApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(RackLikeApi, BladeApi);
        var _super = _helpers.createSuper(RackLikeApi);
        function RackLikeApi(controller, rackApi) {
            _helpers.classCallCheck(this, RackLikeApi);
            var _this;
            _this = _super.call(this, controller);
            _this.rackApi_ = rackApi;
            return _this;
        }
        return RackLikeApi;
    }(BladeApi);
    function addButtonAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({
        }, params), {
            view: 'button'
        }));
    }
    function addFolderAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({
        }, params), {
            view: 'folder'
        }));
    }
    function addSeparatorAsBlade(api, opt_params) {
        var params = opt_params || {
        };
        return api.addBlade(Object.assign(Object.assign({
        }, params), {
            view: 'separator'
        }));
    }
    function addTabAsBlade(api, params) {
        return api.addBlade(Object.assign(Object.assign({
        }, params), {
            view: 'tab'
        }));
    }
    var NestedOrderedSet = /*#__PURE__*/ function() {
        function NestedOrderedSet(extract) {
            _helpers.classCallCheck(this, NestedOrderedSet);
            this.emitter = new Emitter();
            this.items_ = [];
            this.cache_ = new Set();
            this.onSubListAdd_ = this.onSubListAdd_.bind(this);
            this.onSubListRemove_ = this.onSubListRemove_.bind(this);
            this.extract_ = extract;
        }
        _helpers.createClass(NestedOrderedSet, [
            {
                key: "items",
                get: function get() {
                    return this.items_;
                }
            },
            {
                key: "allItems",
                value: function allItems() {
                    return Array.from(this.cache_);
                }
            },
            {
                key: "find",
                value: function find(callback) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this.allItems()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var item = _step.value;
                            if (callback(item)) return item;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return null;
                }
            },
            {
                key: "includes",
                value: function includes(item) {
                    return this.cache_.has(item);
                }
            },
            {
                key: "add",
                value: function add(item1, opt_index) {
                    if (this.includes(item1)) throw TpError.shouldNeverHappen();
                    var index = opt_index !== undefined ? opt_index : this.items_.length;
                    this.items_.splice(index, 0, item1);
                    this.cache_.add(item1);
                    var subList = this.extract_(item1);
                    if (subList) {
                        var _this = this;
                        subList.emitter.on('add', this.onSubListAdd_);
                        subList.emitter.on('remove', this.onSubListRemove_);
                        subList.allItems().forEach(function(item) {
                            _this.cache_.add(item);
                        });
                    }
                    this.emitter.emit('add', {
                        index: index,
                        item: item1,
                        root: this,
                        target: this
                    });
                }
            },
            {
                key: "remove",
                value: function remove(item) {
                    var index = this.items_.indexOf(item);
                    if (index < 0) return;
                    this.items_.splice(index, 1);
                    this.cache_.delete(item);
                    var subList = this.extract_(item);
                    if (subList) {
                        subList.emitter.off('add', this.onSubListAdd_);
                        subList.emitter.off('remove', this.onSubListRemove_);
                    }
                    this.emitter.emit('remove', {
                        index: index,
                        item: item,
                        root: this,
                        target: this
                    });
                }
            },
            {
                key: "onSubListAdd_",
                value: function onSubListAdd_(ev) {
                    this.cache_.add(ev.item);
                    this.emitter.emit('add', {
                        index: ev.index,
                        item: ev.item,
                        root: this,
                        target: ev.target
                    });
                }
            },
            {
                key: "onSubListRemove_",
                value: function onSubListRemove_(ev) {
                    this.cache_.delete(ev.item);
                    this.emitter.emit('remove', {
                        index: ev.index,
                        item: ev.item,
                        root: this,
                        target: ev.target
                    });
                }
            }
        ]);
        return NestedOrderedSet;
    }();
    var InputBindingApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(InputBindingApi, BladeApi);
        var _super = _helpers.createSuper(InputBindingApi);
        function InputBindingApi(controller) {
            _helpers.classCallCheck(this, InputBindingApi);
            var _this;
            _this = _super.call(this, controller);
            _this.onBindingChange_ = _this.onBindingChange_.bind(_helpers.assertThisInitialized(_this));
            _this.emitter_ = new Emitter();
            _this.controller_.binding.emitter.on('change', _this.onBindingChange_);
            return _this;
        }
        _helpers.createClass(InputBindingApi, [
            {
                key: "label",
                get: function get() {
                    return this.controller_.props.get('label');
                },
                set: function set(label) {
                    this.controller_.props.set('label', label);
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            },
            {
                key: "refresh",
                value: function refresh() {
                    this.controller_.binding.read();
                }
            },
            {
                key: "onBindingChange_",
                value: function onBindingChange_(ev) {
                    var value = ev.sender.target.read();
                    this.emitter_.emit('change', {
                        event: new TpChangeEvent(this, forceCast(value), this.controller_.binding.target.presetKey, ev.options.last)
                    });
                }
            }
        ]);
        return InputBindingApi;
    }(BladeApi);
    var InputBindingController = /*#__PURE__*/ function(LabelController) {
        _helpers.inherits(InputBindingController, LabelController);
        var _super = _helpers.createSuper(InputBindingController);
        function InputBindingController(doc, config) {
            _helpers.classCallCheck(this, InputBindingController);
            var _this;
            _this = _super.call(this, doc, config);
            _this.binding = config.binding;
            return _this;
        }
        return InputBindingController;
    }(LabelController);
    var MonitorBindingApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(MonitorBindingApi, BladeApi);
        var _super = _helpers.createSuper(MonitorBindingApi);
        function MonitorBindingApi(controller) {
            _helpers.classCallCheck(this, MonitorBindingApi);
            var _this;
            _this = _super.call(this, controller);
            _this.onBindingUpdate_ = _this.onBindingUpdate_.bind(_helpers.assertThisInitialized(_this));
            _this.emitter_ = new Emitter();
            _this.controller_.binding.emitter.on('update', _this.onBindingUpdate_);
            return _this;
        }
        _helpers.createClass(MonitorBindingApi, [
            {
                key: "label",
                get: function get() {
                    return this.controller_.props.get('label');
                },
                set: function set(label) {
                    this.controller_.props.set('label', label);
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            },
            {
                key: "refresh",
                value: function refresh() {
                    this.controller_.binding.read();
                }
            },
            {
                key: "onBindingUpdate_",
                value: function onBindingUpdate_(ev) {
                    var value = ev.sender.target.read();
                    this.emitter_.emit('update', {
                        event: new TpUpdateEvent(this, forceCast(value), this.controller_.binding.target.presetKey)
                    });
                }
            }
        ]);
        return MonitorBindingApi;
    }(BladeApi);
    var MonitorBindingController = /*#__PURE__*/ function(LabelController) {
        _helpers.inherits(MonitorBindingController, LabelController);
        var _super = _helpers.createSuper(MonitorBindingController);
        function MonitorBindingController(doc, config) {
            _helpers.classCallCheck(this, MonitorBindingController);
            var _this;
            _this = _super.call(this, doc, config);
            _this.binding = config.binding;
            _this.viewProps.bindDisabled(_this.binding.ticker);
            _this.viewProps.handleDispose(function() {
                _this.binding.dispose();
            });
            return _this;
        }
        return MonitorBindingController;
    }(LabelController);
    function findSubBladeApiSet(api) {
        if (api instanceof RackApi) return api['apiSet_'];
        if (api instanceof RackLikeApi) return api['rackApi_']['apiSet_'];
        return null;
    }
    function getApiByController(apiSet, controller) {
        var api1 = apiSet.find(function(api) {
            return api.controller_ === controller;
        });
        if (!api1) throw TpError.shouldNeverHappen();
        return api1;
    }
    function createBindingTarget(obj, key, opt_id) {
        if (!BindingTarget.isBindable(obj)) throw TpError.notBindable();
        return new BindingTarget(obj, key, opt_id);
    }
    var RackApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(RackApi, BladeApi);
        var _super = _helpers.createSuper(RackApi);
        function RackApi(controller, pool) {
            _helpers.classCallCheck(this, RackApi);
            var _this;
            _this = _super.call(this, controller);
            _this.onRackAdd_ = _this.onRackAdd_.bind(_helpers.assertThisInitialized(_this));
            _this.onRackRemove_ = _this.onRackRemove_.bind(_helpers.assertThisInitialized(_this));
            _this.onRackInputChange_ = _this.onRackInputChange_.bind(_helpers.assertThisInitialized(_this));
            _this.onRackMonitorUpdate_ = _this.onRackMonitorUpdate_.bind(_helpers.assertThisInitialized(_this));
            _this.emitter_ = new Emitter();
            _this.apiSet_ = new NestedOrderedSet(findSubBladeApiSet);
            _this.pool_ = pool;
            var rack = _this.controller_.rack;
            rack.emitter.on('add', _this.onRackAdd_);
            rack.emitter.on('remove', _this.onRackRemove_);
            rack.emitter.on('inputchange', _this.onRackInputChange_);
            rack.emitter.on('monitorupdate', _this.onRackMonitorUpdate_);
            rack.children.forEach(function(bc) {
                _this.setUpApi_(bc);
            });
            return _this;
        }
        _helpers.createClass(RackApi, [
            {
                key: "children",
                get: function get() {
                    var _this = this;
                    return this.controller_.rack.children.map(function(bc) {
                        return getApiByController(_this.apiSet_, bc);
                    });
                }
            },
            {
                key: "addInput",
                value: function addInput(object, key, opt_params) {
                    var params = opt_params || {
                    };
                    var doc = this.controller_.view.element.ownerDocument;
                    var bc = this.pool_.createInput(doc, createBindingTarget(object, key, params.presetKey), params);
                    var api = new InputBindingApi(bc);
                    return this.add(api, params.index);
                }
            },
            {
                key: "addMonitor",
                value: function addMonitor(object, key, opt_params) {
                    var params = opt_params || {
                    };
                    var doc = this.controller_.view.element.ownerDocument;
                    var bc = this.pool_.createMonitor(doc, createBindingTarget(object, key), params);
                    var api = new MonitorBindingApi(bc);
                    return forceCast(this.add(api, params.index));
                }
            },
            {
                key: "addFolder",
                value: function addFolder(params) {
                    return addFolderAsBlade(this, params);
                }
            },
            {
                key: "addButton",
                value: function addButton(params) {
                    return addButtonAsBlade(this, params);
                }
            },
            {
                key: "addSeparator",
                value: function addSeparator(opt_params) {
                    return addSeparatorAsBlade(this, opt_params);
                }
            },
            {
                key: "addTab",
                value: function addTab(params) {
                    return addTabAsBlade(this, params);
                }
            },
            {
                key: "add",
                value: function add(api, opt_index) {
                    this.controller_.rack.add(api.controller_, opt_index);
                    var gapi = this.apiSet_.find(function(a) {
                        return a.controller_ === api.controller_;
                    });
                    if (gapi) this.apiSet_.remove(gapi);
                    this.apiSet_.add(api);
                    return api;
                }
            },
            {
                key: "remove",
                value: function remove(api) {
                    this.controller_.rack.remove(api.controller_);
                }
            },
            {
                key: "addBlade",
                value: function addBlade(params) {
                    var doc = this.controller_.view.element.ownerDocument;
                    var bc = this.pool_.createBlade(doc, params);
                    var api = this.pool_.createBladeApi(bc);
                    return this.add(api, params.index);
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            },
            {
                key: "setUpApi_",
                value: function setUpApi_(bc) {
                    var api2 = this.apiSet_.find(function(api) {
                        return api.controller_ === bc;
                    });
                    if (!api2) this.apiSet_.add(this.pool_.createBladeApi(bc));
                }
            },
            {
                key: "onRackAdd_",
                value: function onRackAdd_(ev) {
                    this.setUpApi_(ev.bladeController);
                }
            },
            {
                key: "onRackRemove_",
                value: function onRackRemove_(ev) {
                    if (ev.isRoot) {
                        var api = getApiByController(this.apiSet_, ev.bladeController);
                        this.apiSet_.remove(api);
                    }
                }
            },
            {
                key: "onRackInputChange_",
                value: function onRackInputChange_(ev) {
                    var bc = ev.bladeController;
                    if (bc instanceof InputBindingController) {
                        var api = getApiByController(this.apiSet_, bc);
                        var binding = bc.binding;
                        this.emitter_.emit('change', {
                            event: new TpChangeEvent(api, forceCast(binding.target.read()), binding.target.presetKey, ev.options.last)
                        });
                    } else if (bc instanceof ValueBladeController) {
                        var api3 = getApiByController(this.apiSet_, bc);
                        this.emitter_.emit('change', {
                            event: new TpChangeEvent(api3, bc.value.rawValue, undefined, ev.options.last)
                        });
                    }
                }
            },
            {
                key: "onRackMonitorUpdate_",
                value: function onRackMonitorUpdate_(ev) {
                    if (!(ev.bladeController instanceof MonitorBindingController)) throw TpError.shouldNeverHappen();
                    var api = getApiByController(this.apiSet_, ev.bladeController);
                    var binding = ev.bladeController.binding;
                    this.emitter_.emit('update', {
                        event: new TpUpdateEvent(api, forceCast(binding.target.read()), binding.target.presetKey)
                    });
                }
            }
        ]);
        return RackApi;
    }(BladeApi);
    var FolderApi = /*#__PURE__*/ function(RackLikeApi) {
        _helpers.inherits(FolderApi, RackLikeApi);
        var _super = _helpers.createSuper(FolderApi);
        function FolderApi(controller, pool) {
            _helpers.classCallCheck(this, FolderApi);
            var _this;
            _this = _super.call(this, controller, new RackApi(controller.rackController, pool));
            _this.emitter_ = new Emitter();
            _this.controller_.foldable.value('expanded').emitter.on('change', function(ev) {
                _this.emitter_.emit('fold', {
                    event: new TpFoldEvent(_helpers.assertThisInitialized(_this), ev.sender.rawValue)
                });
            });
            _this.rackApi_.on('change', function(ev) {
                _this.emitter_.emit('change', {
                    event: ev
                });
            });
            _this.rackApi_.on('update', function(ev) {
                _this.emitter_.emit('update', {
                    event: ev
                });
            });
            return _this;
        }
        _helpers.createClass(FolderApi, [
            {
                key: "expanded",
                get: function get() {
                    return this.controller_.foldable.get('expanded');
                },
                set: function set(expanded) {
                    this.controller_.foldable.set('expanded', expanded);
                }
            },
            {
                key: "title",
                get: function get() {
                    return this.controller_.props.get('title');
                },
                set: function set(title) {
                    this.controller_.props.set('title', title);
                }
            },
            {
                key: "children",
                get: function get() {
                    return this.rackApi_.children;
                }
            },
            {
                key: "addInput",
                value: function addInput(object, key, opt_params) {
                    return this.rackApi_.addInput(object, key, opt_params);
                }
            },
            {
                key: "addMonitor",
                value: function addMonitor(object, key, opt_params) {
                    return this.rackApi_.addMonitor(object, key, opt_params);
                }
            },
            {
                key: "addFolder",
                value: function addFolder(params) {
                    return this.rackApi_.addFolder(params);
                }
            },
            {
                key: "addButton",
                value: function addButton(params) {
                    return this.rackApi_.addButton(params);
                }
            },
            {
                key: "addSeparator",
                value: function addSeparator(opt_params) {
                    return this.rackApi_.addSeparator(opt_params);
                }
            },
            {
                key: "addTab",
                value: function addTab(params) {
                    return this.rackApi_.addTab(params);
                }
            },
            {
                key: "add",
                value: function add(api, opt_index) {
                    return this.rackApi_.add(api, opt_index);
                }
            },
            {
                key: "remove",
                value: function remove(api) {
                    this.rackApi_.remove(api);
                }
            },
            {
                key: "addBlade",
                value: function addBlade(params) {
                    return this.rackApi_.addBlade(params);
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            }
        ]);
        return FolderApi;
    }(RackLikeApi);
    var RackLikeController = /*#__PURE__*/ function(BladeController) {
        _helpers.inherits(RackLikeController, BladeController);
        var _super = _helpers.createSuper(RackLikeController);
        function RackLikeController(config) {
            _helpers.classCallCheck(this, RackLikeController);
            var _this;
            _this = _super.call(this, {
                blade: config.blade,
                view: config.view,
                viewProps: config.rackController.viewProps
            });
            _this.rackController = config.rackController;
            return _this;
        }
        return RackLikeController;
    }(BladeController);
    var PlainView = function PlainView(doc, config) {
        _helpers.classCallCheck(this, PlainView);
        var className = ClassName(config.viewName);
        this.element = doc.createElement('div');
        this.element.classList.add(className());
        config.viewProps.bindClassModifiers(this.element);
    };
    function findInputBindingController(bcs, b) {
        for(var i = 0; i < bcs.length; i++){
            var bc = bcs[i];
            if (bc instanceof InputBindingController && bc.binding === b) return bc;
        }
        return null;
    }
    function findMonitorBindingController(bcs, b) {
        for(var i = 0; i < bcs.length; i++){
            var bc = bcs[i];
            if (bc instanceof MonitorBindingController && bc.binding === b) return bc;
        }
        return null;
    }
    function findValueBladeController(bcs, v) {
        for(var i = 0; i < bcs.length; i++){
            var bc = bcs[i];
            if (bc instanceof ValueBladeController && bc.value === v) return bc;
        }
        return null;
    }
    function findSubRack(bc) {
        if (bc instanceof RackController) return bc.rack;
        if (bc instanceof RackLikeController) return bc.rackController.rack;
        return null;
    }
    function findSubBladeControllerSet(bc) {
        var rack = findSubRack(bc);
        return rack ? rack['bcSet_'] : null;
    }
    var BladeRack = /*#__PURE__*/ function() {
        function BladeRack(blade) {
            _helpers.classCallCheck(this, BladeRack);
            var _a;
            this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
            this.onSetAdd_ = this.onSetAdd_.bind(this);
            this.onSetRemove_ = this.onSetRemove_.bind(this);
            this.onChildDispose_ = this.onChildDispose_.bind(this);
            this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
            this.onChildInputChange_ = this.onChildInputChange_.bind(this);
            this.onChildMonitorUpdate_ = this.onChildMonitorUpdate_.bind(this);
            this.onChildValueChange_ = this.onChildValueChange_.bind(this);
            this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
            this.onDescendantLayout_ = this.onDescendantLayout_.bind(this);
            this.onDescendantInputChange_ = this.onDescendantInputChange_.bind(this);
            this.onDescendantMonitorUpdate_ = this.onDescendantMonitorUpdate_.bind(this);
            this.emitter = new Emitter();
            this.blade_ = blade !== null && blade !== void 0 ? blade : null;
            (_a = this.blade_) === null || _a === void 0 || _a.value('positions').emitter.on('change', this.onBladePositionsChange_);
            this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
            this.bcSet_.emitter.on('add', this.onSetAdd_);
            this.bcSet_.emitter.on('remove', this.onSetRemove_);
        }
        _helpers.createClass(BladeRack, [
            {
                key: "children",
                get: function get() {
                    return this.bcSet_.items;
                }
            },
            {
                key: "add",
                value: function add(bc, opt_index) {
                    if (bc.parent) bc.parent.remove(bc);
                    bc['parent_'] = this;
                    this.bcSet_.add(bc, opt_index);
                }
            },
            {
                key: "remove",
                value: function remove(bc) {
                    bc['parent_'] = null;
                    this.bcSet_.remove(bc);
                }
            },
            {
                key: "find",
                value: function find(controllerClass) {
                    return forceCast(this.bcSet_.allItems().filter(function(bc) {
                        return bc instanceof controllerClass;
                    }));
                }
            },
            {
                key: "onSetAdd_",
                value: function onSetAdd_(ev) {
                    this.updatePositions_();
                    var isRoot = ev.target === ev.root;
                    this.emitter.emit('add', {
                        bladeController: ev.item,
                        index: ev.index,
                        isRoot: isRoot,
                        sender: this
                    });
                    if (!isRoot) return;
                    var bc = ev.item;
                    bc.viewProps.emitter.on('change', this.onChildViewPropsChange_);
                    bc.blade.value('positions').emitter.on('change', this.onChildPositionsChange_);
                    bc.viewProps.handleDispose(this.onChildDispose_);
                    if (bc instanceof InputBindingController) bc.binding.emitter.on('change', this.onChildInputChange_);
                    else if (bc instanceof MonitorBindingController) bc.binding.emitter.on('update', this.onChildMonitorUpdate_);
                    else if (bc instanceof ValueBladeController) bc.value.emitter.on('change', this.onChildValueChange_);
                    else {
                        var rack = findSubRack(bc);
                        if (rack) {
                            var emitter = rack.emitter;
                            emitter.on('layout', this.onDescendantLayout_);
                            emitter.on('inputchange', this.onDescendantInputChange_);
                            emitter.on('monitorupdate', this.onDescendantMonitorUpdate_);
                        }
                    }
                }
            },
            {
                key: "onSetRemove_",
                value: function onSetRemove_(ev) {
                    this.updatePositions_();
                    var isRoot = ev.target === ev.root;
                    this.emitter.emit('remove', {
                        bladeController: ev.item,
                        isRoot: isRoot,
                        sender: this
                    });
                    if (!isRoot) return;
                    var bc = ev.item;
                    if (bc instanceof InputBindingController) bc.binding.emitter.off('change', this.onChildInputChange_);
                    else if (bc instanceof MonitorBindingController) bc.binding.emitter.off('update', this.onChildMonitorUpdate_);
                    else if (bc instanceof ValueBladeController) bc.value.emitter.off('change', this.onChildValueChange_);
                    else {
                        var rack = findSubRack(bc);
                        if (rack) {
                            var emitter = rack.emitter;
                            emitter.off('layout', this.onDescendantLayout_);
                            emitter.off('inputchange', this.onDescendantInputChange_);
                            emitter.off('monitorupdate', this.onDescendantMonitorUpdate_);
                        }
                    }
                }
            },
            {
                key: "updatePositions_",
                value: function updatePositions_() {
                    var _this = this;
                    var visibleItems = this.bcSet_.items.filter(function(bc) {
                        return !bc.viewProps.get('hidden');
                    });
                    var firstVisibleItem = visibleItems[0];
                    var lastVisibleItem = visibleItems[visibleItems.length - 1];
                    this.bcSet_.items.forEach(function(bc) {
                        var ps = [];
                        if (bc === firstVisibleItem) {
                            ps.push('first');
                            if (!_this.blade_ || _this.blade_.get('positions').includes('veryfirst')) ps.push('veryfirst');
                        }
                        if (bc === lastVisibleItem) {
                            ps.push('last');
                            if (!_this.blade_ || _this.blade_.get('positions').includes('verylast')) ps.push('verylast');
                        }
                        bc.blade.set('positions', ps);
                    });
                }
            },
            {
                key: "onChildPositionsChange_",
                value: function onChildPositionsChange_() {
                    this.updatePositions_();
                    this.emitter.emit('layout', {
                        sender: this
                    });
                }
            },
            {
                key: "onChildViewPropsChange_",
                value: function onChildViewPropsChange_(_ev) {
                    this.updatePositions_();
                    this.emitter.emit('layout', {
                        sender: this
                    });
                }
            },
            {
                key: "onChildDispose_",
                value: function onChildDispose_() {
                    var _this = this;
                    var disposedUcs = this.bcSet_.items.filter(function(bc) {
                        return bc.viewProps.get('disposed');
                    });
                    disposedUcs.forEach(function(bc) {
                        _this.bcSet_.remove(bc);
                    });
                }
            },
            {
                key: "onChildInputChange_",
                value: function onChildInputChange_(ev) {
                    var bc = findInputBindingController(this.find(InputBindingController), ev.sender);
                    if (!bc) throw TpError.shouldNeverHappen();
                    this.emitter.emit('inputchange', {
                        bladeController: bc,
                        options: ev.options,
                        sender: this
                    });
                }
            },
            {
                key: "onChildMonitorUpdate_",
                value: function onChildMonitorUpdate_(ev) {
                    var bc = findMonitorBindingController(this.find(MonitorBindingController), ev.sender);
                    if (!bc) throw TpError.shouldNeverHappen();
                    this.emitter.emit('monitorupdate', {
                        bladeController: bc,
                        sender: this
                    });
                }
            },
            {
                key: "onChildValueChange_",
                value: function onChildValueChange_(ev) {
                    var bc = findValueBladeController(this.find(ValueBladeController), ev.sender);
                    if (!bc) throw TpError.shouldNeverHappen();
                    this.emitter.emit('inputchange', {
                        bladeController: bc,
                        options: ev.options,
                        sender: this
                    });
                }
            },
            {
                key: "onDescendantLayout_",
                value: function onDescendantLayout_(_) {
                    this.updatePositions_();
                    this.emitter.emit('layout', {
                        sender: this
                    });
                }
            },
            {
                key: "onDescendantInputChange_",
                value: function onDescendantInputChange_(ev) {
                    this.emitter.emit('inputchange', {
                        bladeController: ev.bladeController,
                        options: ev.options,
                        sender: this
                    });
                }
            },
            {
                key: "onDescendantMonitorUpdate_",
                value: function onDescendantMonitorUpdate_(ev) {
                    this.emitter.emit('monitorupdate', {
                        bladeController: ev.bladeController,
                        sender: this
                    });
                }
            },
            {
                key: "onBladePositionsChange_",
                value: function onBladePositionsChange_() {
                    this.updatePositions_();
                }
            }
        ]);
        return BladeRack;
    }();
    var RackController = /*#__PURE__*/ function(BladeController) {
        _helpers.inherits(RackController, BladeController);
        var _super = _helpers.createSuper(RackController);
        function RackController(doc, config) {
            _helpers.classCallCheck(this, RackController);
            var _this;
            _this = _super.call(this, Object.assign(Object.assign({
            }, config), {
                view: new PlainView(doc, {
                    viewName: 'brk',
                    viewProps: config.viewProps
                })
            }));
            _this.onRackAdd_ = _this.onRackAdd_.bind(_helpers.assertThisInitialized(_this));
            _this.onRackRemove_ = _this.onRackRemove_.bind(_helpers.assertThisInitialized(_this));
            var rack = new BladeRack(config.root ? undefined : config.blade);
            rack.emitter.on('add', _this.onRackAdd_);
            rack.emitter.on('remove', _this.onRackRemove_);
            _this.rack = rack;
            _this.viewProps.handleDispose(function() {
                for(var i = _this.rack.children.length - 1; i >= 0; i--){
                    var bc = _this.rack.children[i];
                    bc.viewProps.set('disposed', true);
                }
            });
            return _this;
        }
        _helpers.createClass(RackController, [
            {
                key: "onRackAdd_",
                value: function onRackAdd_(ev) {
                    if (!ev.isRoot) return;
                    insertElementAt(this.view.element, ev.bladeController.view.element, ev.index);
                }
            },
            {
                key: "onRackRemove_",
                value: function onRackRemove_(ev) {
                    if (!ev.isRoot) return;
                    removeElement(ev.bladeController.view.element);
                }
            }
        ]);
        return RackController;
    }(BladeController);
    var bladeContainerClassName = ClassName('cnt');
    var FolderView = function FolderView(doc, config) {
        var _this = this;
        _helpers.classCallCheck(this, FolderView);
        this.className_ = ClassName(config.viewName || 'fld');
        this.element = doc.createElement('div');
        this.element.classList.add(this.className_(), bladeContainerClassName());
        config.viewProps.bindClassModifiers(this.element);
        this.foldable_ = config.foldable;
        this.foldable_.bindExpandedClass(this.element, this.className_(undefined, 'expanded'));
        bindValueMap(this.foldable_, 'completed', valueToClassName(this.element, this.className_(undefined, 'cpl')));
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(this.className_('b'));
        bindValueMap(config.props, 'title', function(title) {
            if (isEmpty(title)) _this.element.classList.add(_this.className_(undefined, 'not'));
            else _this.element.classList.remove(_this.className_(undefined, 'not'));
        });
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement('div');
        titleElem.classList.add(this.className_('t'));
        bindValueToTextContent(config.props.value('title'), titleElem);
        this.buttonElement.appendChild(titleElem);
        this.titleElement = titleElem;
        var markElem = doc.createElement('div');
        markElem.classList.add(this.className_('m'));
        this.buttonElement.appendChild(markElem);
        var containerElem = config.containerElement;
        containerElem.classList.add(this.className_('c'));
        this.element.appendChild(containerElem);
        this.containerElement = containerElem;
    };
    var FolderController = /*#__PURE__*/ function(RackLikeController) {
        _helpers.inherits(FolderController, RackLikeController);
        var _super = _helpers.createSuper(FolderController);
        function FolderController(doc, config) {
            _helpers.classCallCheck(this, FolderController);
            var _this;
            var _a;
            var foldable = Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
            var rc = new RackController(doc, {
                blade: config.blade,
                root: config.root,
                viewProps: config.viewProps
            });
            _this = _super.call(this, Object.assign(Object.assign({
            }, config), {
                rackController: rc,
                view: new FolderView(doc, {
                    containerElement: rc.view.element,
                    foldable: foldable,
                    props: config.props,
                    viewName: config.root ? 'rot' : undefined,
                    viewProps: config.viewProps
                })
            }));
            _this.onTitleClick_ = _this.onTitleClick_.bind(_helpers.assertThisInitialized(_this));
            _this.props = config.props;
            _this.foldable = foldable;
            bindFoldable(_this.foldable, _this.view.containerElement);
            _this.view.buttonElement.addEventListener('click', _this.onTitleClick_);
            return _this;
        }
        _helpers.createClass(FolderController, [
            {
                key: "document",
                get: function get() {
                    return this.view.element.ownerDocument;
                }
            },
            {
                key: "onTitleClick_",
                value: function onTitleClick_() {
                    this.foldable.set('expanded', !this.foldable.get('expanded'));
                }
            }
        ]);
        return FolderController;
    }(RackLikeController);
    var FolderBladePlugin = {
        id: 'folder',
        type: 'blade',
        accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
                title: p.required.string,
                view: p.required.constant('folder'),
                expanded: p.optional.boolean
            });
            return result ? {
                params: result
            } : null;
        },
        controller: function(args) {
            return new FolderController(args.document, {
                blade: args.blade,
                expanded: args.params.expanded,
                props: ValueMap.fromObject({
                    title: args.params.title
                }),
                viewProps: args.viewProps
            });
        },
        api: function(args) {
            if (!(args.controller instanceof FolderController)) return null;
            return new FolderApi(args.controller, args.pool);
        }
    };
    var LabeledValueController = /*#__PURE__*/ function(ValueBladeController) {
        _helpers.inherits(LabeledValueController, ValueBladeController);
        var _super = _helpers.createSuper(LabeledValueController);
        function LabeledValueController(doc, config) {
            _helpers.classCallCheck(this, LabeledValueController);
            var _this;
            var viewProps = config.valueController.viewProps;
            _this = _super.call(this, Object.assign(Object.assign({
            }, config), {
                value: config.valueController.value,
                view: new LabelView(doc, {
                    props: config.props,
                    viewProps: viewProps
                }),
                viewProps: viewProps
            }));
            _this.props = config.props;
            _this.valueController = config.valueController;
            _this.view.valueElement.appendChild(_this.valueController.view.element);
            return _this;
        }
        return LabeledValueController;
    }(ValueBladeController);
    var SeparatorApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(SeparatorApi, BladeApi);
        var _super = _helpers.createSuper(SeparatorApi);
        function SeparatorApi() {
            _helpers.classCallCheck(this, SeparatorApi);
            return _super.apply(this, arguments);
        }
        return SeparatorApi;
    }(BladeApi);
    var className$n = ClassName('spr');
    var SeparatorView = function SeparatorView(doc, config) {
        _helpers.classCallCheck(this, SeparatorView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$n());
        config.viewProps.bindClassModifiers(this.element);
        var hrElem = doc.createElement('hr');
        hrElem.classList.add(className$n('r'));
        this.element.appendChild(hrElem);
    };
    var SeparatorController = /*#__PURE__*/ function(BladeController) {
        _helpers.inherits(SeparatorController, BladeController);
        var _super = _helpers.createSuper(SeparatorController);
        function SeparatorController(doc, config) {
            _helpers.classCallCheck(this, SeparatorController);
            return _super.call(this, Object.assign(Object.assign({
            }, config), {
                view: new SeparatorView(doc, {
                    viewProps: config.viewProps
                })
            }));
        }
        return SeparatorController;
    }(BladeController);
    var SeparatorBladePlugin = {
        id: 'separator',
        type: 'blade',
        accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
                view: p.required.constant('separator')
            });
            return result ? {
                params: result
            } : null;
        },
        controller: function(args) {
            return new SeparatorController(args.document, {
                blade: args.blade,
                viewProps: args.viewProps
            });
        },
        api: function(args) {
            if (!(args.controller instanceof SeparatorController)) return null;
            return new SeparatorApi(args.controller);
        }
    };
    var className$m = ClassName('');
    function valueToModifier(elem, modifier) {
        return valueToClassName(elem, className$m(undefined, modifier));
    }
    var ViewProps = /*#__PURE__*/ function(ValueMap2) {
        _helpers.inherits(ViewProps, ValueMap2);
        var _super = _helpers.createSuper(ViewProps);
        function ViewProps(valueMap) {
            _helpers.classCallCheck(this, ViewProps);
            return _super.call(this, valueMap);
        }
        _helpers.createClass(ViewProps, [
            {
                key: "bindClassModifiers",
                value: function bindClassModifiers(elem) {
                    bindValueMap(this, 'disabled', valueToModifier(elem, 'disabled'));
                    bindValueMap(this, 'hidden', valueToModifier(elem, 'hidden'));
                }
            },
            {
                key: "bindDisabled",
                value: function bindDisabled(target) {
                    bindValueMap(this, 'disabled', function(disabled) {
                        target.disabled = disabled;
                    });
                }
            },
            {
                key: "bindTabIndex",
                value: function bindTabIndex(elem) {
                    bindValueMap(this, 'disabled', function(disabled) {
                        elem.tabIndex = disabled ? -1 : 0;
                    });
                }
            },
            {
                key: "handleDispose",
                value: function handleDispose(callback) {
                    this.value('disposed').emitter.on('change', function(disposed) {
                        if (disposed) callback();
                    });
                }
            }
        ], [
            {
                key: "create",
                value: function create(opt_initialValue) {
                    var _a, _b;
                    var initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {
                    };
                    var coreObj = {
                        disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
                        disposed: false,
                        hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false
                    };
                    var core = ValueMap.createCore(coreObj);
                    return new ViewProps(core);
                }
            }
        ]);
        return ViewProps;
    }(ValueMap);
    var className$l = ClassName('tbi');
    var TabItemView = function TabItemView(doc, config) {
        var _this = this;
        _helpers.classCallCheck(this, TabItemView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$l());
        config.viewProps.bindClassModifiers(this.element);
        bindValueMap(config.props, 'selected', function(selected) {
            if (selected) _this.element.classList.add(className$l(undefined, 'sel'));
            else _this.element.classList.remove(className$l(undefined, 'sel'));
        });
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className$l('b'));
        config.viewProps.bindDisabled(buttonElem);
        this.element.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var titleElem = doc.createElement('div');
        titleElem.classList.add(className$l('t'));
        bindValueToTextContent(config.props.value('title'), titleElem);
        this.buttonElement.appendChild(titleElem);
        this.titleElement = titleElem;
    };
    var TabItemController = /*#__PURE__*/ function() {
        function TabItemController(doc, config) {
            _helpers.classCallCheck(this, TabItemController);
            this.emitter = new Emitter();
            this.onClick_ = this.onClick_.bind(this);
            this.props = config.props;
            this.viewProps = config.viewProps;
            this.view = new TabItemView(doc, {
                props: config.props,
                viewProps: config.viewProps
            });
            this.view.buttonElement.addEventListener('click', this.onClick_);
        }
        _helpers.createClass(TabItemController, [
            {
                key: "onClick_",
                value: function onClick_() {
                    this.emitter.emit('click', {
                        sender: this
                    });
                }
            }
        ]);
        return TabItemController;
    }();
    var TabPageController = /*#__PURE__*/ function() {
        function TabPageController(doc, config) {
            var _this = this;
            _helpers.classCallCheck(this, TabPageController);
            this.onItemClick_ = this.onItemClick_.bind(this);
            this.ic_ = new TabItemController(doc, {
                props: config.itemProps,
                viewProps: ViewProps.create()
            });
            this.ic_.emitter.on('click', this.onItemClick_);
            this.cc_ = new RackController(doc, {
                blade: createBlade(),
                viewProps: ViewProps.create()
            });
            this.props = config.props;
            bindValueMap(this.props, 'selected', function(selected) {
                _this.itemController.props.set('selected', selected);
                _this.contentController.viewProps.set('hidden', !selected);
            });
        }
        _helpers.createClass(TabPageController, [
            {
                key: "itemController",
                get: function get() {
                    return this.ic_;
                }
            },
            {
                key: "contentController",
                get: function get() {
                    return this.cc_;
                }
            },
            {
                key: "onItemClick_",
                value: function onItemClick_() {
                    this.props.set('selected', true);
                }
            }
        ]);
        return TabPageController;
    }();
    var TabPageApi = /*#__PURE__*/ function() {
        function TabPageApi(controller, contentRackApi) {
            _helpers.classCallCheck(this, TabPageApi);
            this.controller_ = controller;
            this.rackApi_ = contentRackApi;
        }
        _helpers.createClass(TabPageApi, [
            {
                key: "title",
                get: function get() {
                    var _a;
                    return (_a = this.controller_.itemController.props.get('title')) !== null && _a !== void 0 ? _a : '';
                },
                set: function set(title) {
                    this.controller_.itemController.props.set('title', title);
                }
            },
            {
                key: "selected",
                get: function get() {
                    return this.controller_.props.get('selected');
                },
                set: function set(selected) {
                    this.controller_.props.set('selected', selected);
                }
            },
            {
                key: "children",
                get: function get() {
                    return this.rackApi_.children;
                }
            },
            {
                key: "addButton",
                value: function addButton(params) {
                    return this.rackApi_.addButton(params);
                }
            },
            {
                key: "addFolder",
                value: function addFolder(params) {
                    return this.rackApi_.addFolder(params);
                }
            },
            {
                key: "addSeparator",
                value: function addSeparator(opt_params) {
                    return this.rackApi_.addSeparator(opt_params);
                }
            },
            {
                key: "addTab",
                value: function addTab(params) {
                    return this.rackApi_.addTab(params);
                }
            },
            {
                key: "add",
                value: function add(api, opt_index) {
                    this.rackApi_.add(api, opt_index);
                }
            },
            {
                key: "remove",
                value: function remove(api) {
                    this.rackApi_.remove(api);
                }
            },
            {
                key: "addInput",
                value: function addInput(object, key, opt_params) {
                    return this.rackApi_.addInput(object, key, opt_params);
                }
            },
            {
                key: "addMonitor",
                value: function addMonitor(object, key, opt_params) {
                    return this.rackApi_.addMonitor(object, key, opt_params);
                }
            },
            {
                key: "addBlade",
                value: function addBlade(params) {
                    return this.rackApi_.addBlade(params);
                }
            }
        ]);
        return TabPageApi;
    }();
    var TabApi = /*#__PURE__*/ function(RackLikeApi) {
        _helpers.inherits(TabApi, RackLikeApi);
        var _super = _helpers.createSuper(TabApi);
        function TabApi(controller, pool) {
            _helpers.classCallCheck(this, TabApi);
            var _this;
            _this = _super.call(this, controller, new RackApi(controller.rackController, pool));
            _this.onPageAdd_ = _this.onPageAdd_.bind(_helpers.assertThisInitialized(_this));
            _this.onPageRemove_ = _this.onPageRemove_.bind(_helpers.assertThisInitialized(_this));
            _this.emitter_ = new Emitter();
            _this.pageApiMap_ = new Map();
            _this.rackApi_.on('change', function(ev) {
                _this.emitter_.emit('change', {
                    event: ev
                });
            });
            _this.rackApi_.on('update', function(ev) {
                _this.emitter_.emit('update', {
                    event: ev
                });
            });
            _this.controller_.pageSet.emitter.on('add', _this.onPageAdd_);
            _this.controller_.pageSet.emitter.on('remove', _this.onPageRemove_);
            _this.controller_.pageSet.items.forEach(function(pc) {
                _this.setUpPageApi_(pc);
            });
            return _this;
        }
        _helpers.createClass(TabApi, [
            {
                key: "pages",
                get: function get() {
                    var _this = this;
                    return this.controller_.pageSet.items.map(function(pc) {
                        var api = _this.pageApiMap_.get(pc);
                        if (!api) throw TpError.shouldNeverHappen();
                        return api;
                    });
                }
            },
            {
                key: "addPage",
                value: function addPage(params) {
                    var doc = this.controller_.view.element.ownerDocument;
                    var pc = new TabPageController(doc, {
                        itemProps: ValueMap.fromObject({
                            selected: false,
                            title: params.title
                        }),
                        props: ValueMap.fromObject({
                            selected: false
                        })
                    });
                    this.controller_.add(pc, params.index);
                    var api = this.pageApiMap_.get(pc);
                    if (!api) throw TpError.shouldNeverHappen();
                    return api;
                }
            },
            {
                key: "removePage",
                value: function removePage(index) {
                    this.controller_.remove(index);
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            },
            {
                key: "setUpPageApi_",
                value: function setUpPageApi_(pc) {
                    var rackApi = this.rackApi_['apiSet_'].find(function(api) {
                        return api.controller_ === pc.contentController;
                    });
                    if (!rackApi) throw TpError.shouldNeverHappen();
                    var api4 = new TabPageApi(pc, rackApi);
                    this.pageApiMap_.set(pc, api4);
                }
            },
            {
                key: "onPageAdd_",
                value: function onPageAdd_(ev) {
                    this.setUpPageApi_(ev.item);
                }
            },
            {
                key: "onPageRemove_",
                value: function onPageRemove_(ev) {
                    var api = this.pageApiMap_.get(ev.item);
                    if (!api) throw TpError.shouldNeverHappen();
                    this.pageApiMap_.delete(ev.item);
                }
            }
        ]);
        return TabApi;
    }(RackLikeApi);
    var className$k = ClassName('tab');
    var TabView = function TabView(doc, config) {
        _helpers.classCallCheck(this, TabView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$k(), bladeContainerClassName());
        config.viewProps.bindClassModifiers(this.element);
        bindValue(config.empty, valueToClassName(this.element, className$k(undefined, 'nop')));
        var itemsElem = doc.createElement('div');
        itemsElem.classList.add(className$k('i'));
        this.element.appendChild(itemsElem);
        this.itemsElement = itemsElem;
        var contentsElem = config.contentsElement;
        contentsElem.classList.add(className$k('c'));
        this.element.appendChild(contentsElem);
        this.contentsElement = contentsElem;
    };
    var TabController = /*#__PURE__*/ function(RackLikeController) {
        _helpers.inherits(TabController, RackLikeController);
        var _super = _helpers.createSuper(TabController);
        function TabController(doc, config) {
            _helpers.classCallCheck(this, TabController);
            var _this;
            var cr = new RackController(doc, {
                blade: config.blade,
                viewProps: config.viewProps
            });
            var empty = createValue(true);
            _this = _super.call(this, {
                blade: config.blade,
                rackController: cr,
                view: new TabView(doc, {
                    contentsElement: cr.view.element,
                    empty: empty,
                    viewProps: config.viewProps
                })
            });
            _this.onPageAdd_ = _this.onPageAdd_.bind(_helpers.assertThisInitialized(_this));
            _this.onPageRemove_ = _this.onPageRemove_.bind(_helpers.assertThisInitialized(_this));
            _this.onPageSelectedChange_ = _this.onPageSelectedChange_.bind(_helpers.assertThisInitialized(_this));
            _this.pageSet_ = new NestedOrderedSet(function() {
                return null;
            });
            _this.pageSet_.emitter.on('add', _this.onPageAdd_);
            _this.pageSet_.emitter.on('remove', _this.onPageRemove_);
            _this.empty_ = empty;
            _this.applyPages_();
            return _this;
        }
        _helpers.createClass(TabController, [
            {
                key: "pageSet",
                get: function get() {
                    return this.pageSet_;
                }
            },
            {
                key: "add",
                value: function add(pc, opt_index) {
                    this.pageSet_.add(pc, opt_index !== null && opt_index !== void 0 ? opt_index : this.pageSet_.items.length);
                }
            },
            {
                key: "remove",
                value: function remove(index) {
                    this.pageSet_.remove(this.pageSet_.items[index]);
                }
            },
            {
                key: "applyPages_",
                value: function applyPages_() {
                    this.keepSelection_();
                    this.empty_.rawValue = this.pageSet_.items.length === 0;
                }
            },
            {
                key: "onPageAdd_",
                value: function onPageAdd_(ev) {
                    var pc = ev.item;
                    insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
                    this.rackController.rack.add(pc.contentController, ev.index);
                    pc.props.value('selected').emitter.on('change', this.onPageSelectedChange_);
                    this.applyPages_();
                }
            },
            {
                key: "onPageRemove_",
                value: function onPageRemove_(ev) {
                    var pc = ev.item;
                    removeElement(pc.itemController.view.element);
                    this.rackController.rack.remove(pc.contentController);
                    pc.props.value('selected').emitter.off('change', this.onPageSelectedChange_);
                    this.applyPages_();
                }
            },
            {
                key: "keepSelection_",
                value: function keepSelection_() {
                    if (this.pageSet_.items.length === 0) return;
                    var firstSelIndex = this.pageSet_.items.findIndex(function(pc) {
                        return pc.props.get('selected');
                    });
                    if (firstSelIndex < 0) this.pageSet_.items.forEach(function(pc, i) {
                        pc.props.set('selected', i === 0);
                    });
                    else this.pageSet_.items.forEach(function(pc, i) {
                        pc.props.set('selected', i === firstSelIndex);
                    });
                }
            },
            {
                key: "onPageSelectedChange_",
                value: function onPageSelectedChange_(ev) {
                    if (ev.rawValue) {
                        var index = this.pageSet_.items.findIndex(function(pc) {
                            return pc.props.value('selected') === ev.sender;
                        });
                        this.pageSet_.items.forEach(function(pc, i) {
                            pc.props.set('selected', i === index);
                        });
                    } else this.keepSelection_();
                }
            }
        ]);
        return TabController;
    }(RackLikeController);
    var TabBladePlugin = {
        id: 'tab',
        type: 'blade',
        accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
                pages: p.required.array(p.required.object({
                    title: p.required.string
                })),
                view: p.required.constant('tab')
            });
            if (!result || result.pages.length === 0) return null;
            return {
                params: result
            };
        },
        controller: function(args) {
            var c = new TabController(args.document, {
                blade: args.blade,
                viewProps: args.viewProps
            });
            args.params.pages.forEach(function(p) {
                var pc = new TabPageController(args.document, {
                    itemProps: ValueMap.fromObject({
                        selected: false,
                        title: p.title
                    }),
                    props: ValueMap.fromObject({
                        selected: false
                    })
                });
                c.add(pc);
            });
            return c;
        },
        api: function(args) {
            if (!(args.controller instanceof TabController)) return null;
            return new TabApi(args.controller, args.pool);
        }
    };
    function createBladeController(plugin, args) {
        var ac = plugin.accept(args.params);
        if (!ac) return null;
        var disabled = ParamsParsers.optional.boolean(args.params['disabled']).value;
        var hidden = ParamsParsers.optional.boolean(args.params['hidden']).value;
        return plugin.controller({
            blade: createBlade(),
            document: args.document,
            params: forceCast(Object.assign(Object.assign({
            }, ac.params), {
                disabled: disabled,
                hidden: hidden
            })),
            viewProps: ViewProps.create({
                disabled: disabled,
                hidden: hidden
            })
        });
    }
    var ManualTicker = /*#__PURE__*/ function() {
        function ManualTicker() {
            _helpers.classCallCheck(this, ManualTicker);
            this.disabled = false;
            this.emitter = new Emitter();
        }
        _helpers.createClass(ManualTicker, [
            {
                key: "dispose",
                value: function dispose() {
                }
            },
            {
                key: "tick",
                value: function tick() {
                    if (this.disabled) return;
                    this.emitter.emit('tick', {
                        sender: this
                    });
                }
            }
        ]);
        return ManualTicker;
    }();
    var IntervalTicker = /*#__PURE__*/ function() {
        function IntervalTicker(doc, interval) {
            _helpers.classCallCheck(this, IntervalTicker);
            this.disabled_ = false;
            this.timerId_ = null;
            this.onTick_ = this.onTick_.bind(this);
            this.doc_ = doc;
            this.emitter = new Emitter();
            this.interval_ = interval;
            this.setTimer_();
        }
        _helpers.createClass(IntervalTicker, [
            {
                key: "disabled",
                get: function get() {
                    return this.disabled_;
                },
                set: function set(inactive) {
                    this.disabled_ = inactive;
                    if (this.disabled_) this.clearTimer_();
                    else this.setTimer_();
                }
            },
            {
                key: "dispose",
                value: function dispose() {
                    this.clearTimer_();
                }
            },
            {
                key: "clearTimer_",
                value: function clearTimer_() {
                    if (this.timerId_ === null) return;
                    var win = this.doc_.defaultView;
                    if (win) win.clearInterval(this.timerId_);
                    this.timerId_ = null;
                }
            },
            {
                key: "setTimer_",
                value: function setTimer_() {
                    this.clearTimer_();
                    if (this.interval_ <= 0) return;
                    var win = this.doc_.defaultView;
                    if (win) this.timerId_ = win.setInterval(this.onTick_, this.interval_);
                }
            },
            {
                key: "onTick_",
                value: function onTick_() {
                    if (this.disabled_) return;
                    this.emitter.emit('tick', {
                        sender: this
                    });
                }
            }
        ]);
        return IntervalTicker;
    }();
    var CompositeConstraint = /*#__PURE__*/ function() {
        function CompositeConstraint(constraints) {
            _helpers.classCallCheck(this, CompositeConstraint);
            this.constraints = constraints;
        }
        _helpers.createClass(CompositeConstraint, [
            {
                key: "constrain",
                value: function constrain(value) {
                    return this.constraints.reduce(function(result, c) {
                        return c.constrain(result);
                    }, value);
                }
            }
        ]);
        return CompositeConstraint;
    }();
    function findConstraint(c, constraintClass) {
        if (c instanceof constraintClass) return c;
        if (c instanceof CompositeConstraint) {
            var result = c.constraints.reduce(function(tmpResult, sc) {
                if (tmpResult) return tmpResult;
                return sc instanceof constraintClass ? sc : null;
            }, null);
            if (result) return result;
        }
        return null;
    }
    var ListConstraint = /*#__PURE__*/ function() {
        function ListConstraint(options) {
            _helpers.classCallCheck(this, ListConstraint);
            this.options = options;
        }
        _helpers.createClass(ListConstraint, [
            {
                key: "constrain",
                value: function constrain(value) {
                    var opts = this.options;
                    if (opts.length === 0) return value;
                    var matched = opts.filter(function(item) {
                        return item.value === value;
                    }).length > 0;
                    return matched ? value : opts[0].value;
                }
            }
        ]);
        return ListConstraint;
    }();
    var RangeConstraint = /*#__PURE__*/ function() {
        function RangeConstraint(config) {
            _helpers.classCallCheck(this, RangeConstraint);
            this.maxValue = config.max;
            this.minValue = config.min;
        }
        _helpers.createClass(RangeConstraint, [
            {
                key: "constrain",
                value: function constrain(value) {
                    var result = value;
                    if (!isEmpty(this.minValue)) result = Math.max(result, this.minValue);
                    if (!isEmpty(this.maxValue)) result = Math.min(result, this.maxValue);
                    return result;
                }
            }
        ]);
        return RangeConstraint;
    }();
    var StepConstraint = /*#__PURE__*/ function() {
        function StepConstraint(step) {
            _helpers.classCallCheck(this, StepConstraint);
            this.step = step;
        }
        _helpers.createClass(StepConstraint, [
            {
                key: "constrain",
                value: function constrain(value) {
                    var r = value < 0 ? -Math.round(-value / this.step) : Math.round(value / this.step);
                    return r * this.step;
                }
            }
        ]);
        return StepConstraint;
    }();
    var className$j = ClassName('lst');
    var ListView = /*#__PURE__*/ function() {
        function ListView(doc, config) {
            _helpers.classCallCheck(this, ListView);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.props_ = config.props;
            this.element = doc.createElement('div');
            this.element.classList.add(className$j());
            config.viewProps.bindClassModifiers(this.element);
            var selectElem = doc.createElement('select');
            selectElem.classList.add(className$j('s'));
            bindValueMap(this.props_, 'options', function(opts) {
                removeChildElements(selectElem);
                opts.forEach(function(item, index) {
                    var optionElem = doc.createElement('option');
                    optionElem.dataset.index = String(index);
                    optionElem.textContent = item.text;
                    optionElem.value = String(item.value);
                    selectElem.appendChild(optionElem);
                });
            });
            config.viewProps.bindDisabled(selectElem);
            this.element.appendChild(selectElem);
            this.selectElement = selectElem;
            var markElem = doc.createElement('div');
            markElem.classList.add(className$j('m'));
            markElem.appendChild(createSvgIconElement(doc, 'dropdown'));
            this.element.appendChild(markElem);
            config.value.emitter.on('change', this.onValueChange_);
            this.value_ = config.value;
            this.update_();
        }
        _helpers.createClass(ListView, [
            {
                key: "update_",
                value: function update_() {
                    this.selectElement.value = String(this.value_.rawValue);
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            }
        ]);
        return ListView;
    }();
    var ListController = /*#__PURE__*/ function() {
        function ListController(doc, config) {
            _helpers.classCallCheck(this, ListController);
            this.onSelectChange_ = this.onSelectChange_.bind(this);
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new ListView(doc, {
                props: this.props,
                value: this.value,
                viewProps: this.viewProps
            });
            this.view.selectElement.addEventListener('change', this.onSelectChange_);
        }
        _helpers.createClass(ListController, [
            {
                key: "onSelectChange_",
                value: function onSelectChange_(e) {
                    var selectElem = forceCast(e.currentTarget);
                    var optElem = selectElem.selectedOptions.item(0);
                    if (!optElem) return;
                    var itemIndex = Number(optElem.dataset.index);
                    this.value.rawValue = this.props.get('options')[itemIndex].value;
                }
            }
        ]);
        return ListController;
    }();
    var className$i = ClassName('pop');
    var PopupView = function PopupView(doc, config) {
        _helpers.classCallCheck(this, PopupView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$i());
        config.viewProps.bindClassModifiers(this.element);
        bindValue(config.shows, valueToClassName(this.element, className$i(undefined, 'v')));
    };
    var PopupController = function PopupController(doc, config) {
        _helpers.classCallCheck(this, PopupController);
        this.shows = createValue(false);
        this.viewProps = config.viewProps;
        this.view = new PopupView(doc, {
            shows: this.shows,
            viewProps: this.viewProps
        });
    };
    var className$h = ClassName('txt');
    var TextView = /*#__PURE__*/ function() {
        function TextView(doc, config) {
            _helpers.classCallCheck(this, TextView);
            this.onChange_ = this.onChange_.bind(this);
            this.element = doc.createElement('div');
            this.element.classList.add(className$h());
            config.viewProps.bindClassModifiers(this.element);
            this.props_ = config.props;
            this.props_.emitter.on('change', this.onChange_);
            var inputElem = doc.createElement('input');
            inputElem.classList.add(className$h('i'));
            inputElem.type = 'text';
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            config.value.emitter.on('change', this.onChange_);
            this.value_ = config.value;
            this.refresh();
        }
        _helpers.createClass(TextView, [
            {
                key: "refresh",
                value: function refresh() {
                    var formatter = this.props_.get('formatter');
                    this.inputElement.value = formatter(this.value_.rawValue);
                }
            },
            {
                key: "onChange_",
                value: function onChange_() {
                    this.refresh();
                }
            }
        ]);
        return TextView;
    }();
    var TextController = /*#__PURE__*/ function() {
        function TextController(doc, config) {
            _helpers.classCallCheck(this, TextController);
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.parser_ = config.parser;
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new TextView(doc, {
                props: config.props,
                value: this.value,
                viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
        }
        _helpers.createClass(TextController, [
            {
                key: "onInputChange_",
                value: function onInputChange_(e) {
                    var inputElem = forceCast(e.currentTarget);
                    var value = inputElem.value;
                    var parsedValue = this.parser_(value);
                    if (!isEmpty(parsedValue)) this.value.rawValue = parsedValue;
                    this.view.refresh();
                }
            }
        ]);
        return TextController;
    }();
    function boolToString(value) {
        return String(value);
    }
    function boolFromUnknown(value) {
        if (value === 'false') return false;
        return !!value;
    }
    function BooleanFormatter(value) {
        return boolToString(value);
    }
    var NumberLiteralNode = /*#__PURE__*/ function() {
        function NumberLiteralNode(text) {
            _helpers.classCallCheck(this, NumberLiteralNode);
            this.text = text;
        }
        _helpers.createClass(NumberLiteralNode, [
            {
                key: "evaluate",
                value: function evaluate() {
                    return Number(this.text);
                }
            },
            {
                key: "toString",
                value: function toString() {
                    return this.text;
                }
            }
        ]);
        return NumberLiteralNode;
    }();
    var BINARY_OPERATION_MAP = {
        '**': function(v1, v2) {
            return Math.pow(v1, v2);
        },
        '*': function(v1, v2) {
            return v1 * v2;
        },
        '/': function(v1, v2) {
            return v1 / v2;
        },
        '%': function(v1, v2) {
            return v1 % v2;
        },
        '+': function(v1, v2) {
            return v1 + v2;
        },
        '-': function(v1, v2) {
            return v1 - v2;
        },
        '<<': function(v1, v2) {
            return v1 << v2;
        },
        '>>': function(v1, v2) {
            return v1 >> v2;
        },
        '>>>': function(v1, v2) {
            return v1 >>> v2;
        },
        '&': function(v1, v2) {
            return v1 & v2;
        },
        '^': function(v1, v2) {
            return v1 ^ v2;
        },
        '|': function(v1, v2) {
            return v1 | v2;
        }
    };
    var BinaryOperationNode = /*#__PURE__*/ function() {
        function BinaryOperationNode(operator, left, right) {
            _helpers.classCallCheck(this, BinaryOperationNode);
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        _helpers.createClass(BinaryOperationNode, [
            {
                key: "evaluate",
                value: function evaluate() {
                    var op = BINARY_OPERATION_MAP[this.operator];
                    if (!op) throw new Error("unexpected binary operator: '".concat(this.operator));
                    return op(this.left.evaluate(), this.right.evaluate());
                }
            },
            {
                key: "toString",
                value: function toString() {
                    return [
                        'b(',
                        this.left.toString(),
                        this.operator,
                        this.right.toString(),
                        ')', 
                    ].join(' ');
                }
            }
        ]);
        return BinaryOperationNode;
    }();
    var UNARY_OPERATION_MAP = {
        '+': function(v) {
            return v;
        },
        '-': function(v) {
            return -v;
        },
        '~': function(v) {
            return ~v;
        }
    };
    var UnaryOperationNode = /*#__PURE__*/ function() {
        function UnaryOperationNode(operator, expr) {
            _helpers.classCallCheck(this, UnaryOperationNode);
            this.operator = operator;
            this.expression = expr;
        }
        _helpers.createClass(UnaryOperationNode, [
            {
                key: "evaluate",
                value: function evaluate() {
                    var op = UNARY_OPERATION_MAP[this.operator];
                    if (!op) throw new Error("unexpected unary operator: '".concat(this.operator));
                    return op(this.expression.evaluate());
                }
            },
            {
                key: "toString",
                value: function toString() {
                    return [
                        'u(',
                        this.operator,
                        this.expression.toString(),
                        ')'
                    ].join(' ');
                }
            }
        ]);
        return UnaryOperationNode;
    }();
    function combineReader(parsers) {
        return function(text, cursor) {
            for(var i = 0; i < parsers.length; i++){
                var result = parsers[i](text, cursor);
                if (result !== '') return result;
            }
            return '';
        };
    }
    function readWhitespace(text, cursor) {
        var _a;
        var m = text.substr(cursor).match(/^\s+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
    }
    function readNonZeroDigit(text, cursor) {
        var ch = text.substr(cursor, 1);
        return ch.match(/^[1-9]$/) ? ch : '';
    }
    function readDecimalDigits(text, cursor) {
        var _a;
        var m = text.substr(cursor).match(/^[0-9]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
    }
    function readSignedInteger(text, cursor) {
        var ds = readDecimalDigits(text, cursor);
        if (ds !== '') return ds;
        var sign = text.substr(cursor, 1);
        cursor += 1;
        if (sign !== '-' && sign !== '+') return '';
        var sds = readDecimalDigits(text, cursor);
        if (sds === '') return '';
        return sign + sds;
    }
    function readExponentPart(text, cursor) {
        var e = text.substr(cursor, 1);
        cursor += 1;
        if (e.toLowerCase() !== 'e') return '';
        var si = readSignedInteger(text, cursor);
        if (si === '') return '';
        return e + si;
    }
    function readDecimalIntegerLiteral(text, cursor) {
        var ch = text.substr(cursor, 1);
        if (ch === '0') return ch;
        var nzd = readNonZeroDigit(text, cursor);
        cursor += nzd.length;
        if (nzd === '') return '';
        return nzd + readDecimalDigits(text, cursor);
    }
    function readDecimalLiteral1(text, cursor) {
        var dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === '') return '';
        var dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== '.') return '';
        var dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        return dil + dot + dds + readExponentPart(text, cursor);
    }
    function readDecimalLiteral2(text, cursor) {
        var dot = text.substr(cursor, 1);
        cursor += dot.length;
        if (dot !== '.') return '';
        var dds = readDecimalDigits(text, cursor);
        cursor += dds.length;
        if (dds === '') return '';
        return dot + dds + readExponentPart(text, cursor);
    }
    function readDecimalLiteral3(text, cursor) {
        var dil = readDecimalIntegerLiteral(text, cursor);
        cursor += dil.length;
        if (dil === '') return '';
        return dil + readExponentPart(text, cursor);
    }
    var readDecimalLiteral = combineReader([
        readDecimalLiteral1,
        readDecimalLiteral2,
        readDecimalLiteral3, 
    ]);
    function parseBinaryDigits(text, cursor) {
        var _a;
        var m = text.substr(cursor).match(/^[01]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
    }
    function readBinaryIntegerLiteral(text, cursor) {
        var prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== '0b') return '';
        var bds = parseBinaryDigits(text, cursor);
        if (bds === '') return '';
        return prefix + bds;
    }
    function readOctalDigits(text, cursor) {
        var _a;
        var m = text.substr(cursor).match(/^[0-7]+/);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
    }
    function readOctalIntegerLiteral(text, cursor) {
        var prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== '0o') return '';
        var ods = readOctalDigits(text, cursor);
        if (ods === '') return '';
        return prefix + ods;
    }
    function readHexDigits(text, cursor) {
        var _a;
        var m = text.substr(cursor).match(/^[0-9a-f]+/i);
        return (_a = m && m[0]) !== null && _a !== void 0 ? _a : '';
    }
    function readHexIntegerLiteral(text, cursor) {
        var prefix = text.substr(cursor, 2);
        cursor += prefix.length;
        if (prefix.toLowerCase() !== '0x') return '';
        var hds = readHexDigits(text, cursor);
        if (hds === '') return '';
        return prefix + hds;
    }
    var readNonDecimalIntegerLiteral = combineReader([
        readBinaryIntegerLiteral,
        readOctalIntegerLiteral,
        readHexIntegerLiteral, 
    ]);
    var readNumericLiteral = combineReader([
        readNonDecimalIntegerLiteral,
        readDecimalLiteral, 
    ]);
    function parseLiteral(text, cursor) {
        var num = readNumericLiteral(text, cursor);
        cursor += num.length;
        if (num === '') return null;
        return {
            evaluable: new NumberLiteralNode(num),
            cursor: cursor
        };
    }
    function parseParenthesizedExpression(text, cursor) {
        var op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== '(') return null;
        var expr = parseExpression(text, cursor);
        if (!expr) return null;
        cursor = expr.cursor;
        cursor += readWhitespace(text, cursor).length;
        var cl = text.substr(cursor, 1);
        cursor += cl.length;
        if (cl !== ')') return null;
        return {
            evaluable: expr.evaluable,
            cursor: cursor
        };
    }
    function parsePrimaryExpression(text, cursor) {
        return parseLiteral(text, cursor) || parseParenthesizedExpression(text, cursor);
    }
    function parseUnaryExpression(text, cursor) {
        var expr = parsePrimaryExpression(text, cursor);
        if (expr) return expr;
        var op = text.substr(cursor, 1);
        cursor += op.length;
        if (op !== '+' && op !== '-' && op !== '~') return null;
        var num = parseUnaryExpression(text, cursor);
        if (!num) return null;
        cursor = num.cursor;
        return {
            cursor: cursor,
            evaluable: new UnaryOperationNode(op, num.evaluable)
        };
    }
    function readBinaryOperator(ops, text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        var op1 = ops.filter(function(op) {
            return text.startsWith(op, cursor);
        })[0];
        if (!op1) return null;
        cursor += op1.length;
        cursor += readWhitespace(text, cursor).length;
        return {
            cursor: cursor,
            operator: op1
        };
    }
    function createBinaryOperationExpressionParser(exprParser, ops) {
        return function(text, cursor) {
            var firstExpr = exprParser(text, cursor);
            if (!firstExpr) return null;
            cursor = firstExpr.cursor;
            var expr = firstExpr.evaluable;
            for(;;){
                var op = readBinaryOperator(ops, text, cursor);
                if (!op) break;
                cursor = op.cursor;
                var nextExpr = exprParser(text, cursor);
                if (!nextExpr) return null;
                cursor = nextExpr.cursor;
                expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
            }
            return expr ? {
                cursor: cursor,
                evaluable: expr
            } : null;
        };
    }
    var parseBinaryOperationExpression = [
        [
            '**'
        ],
        [
            '*',
            '/',
            '%'
        ],
        [
            '+',
            '-'
        ],
        [
            '<<',
            '>>>',
            '>>'
        ],
        [
            '&'
        ],
        [
            '^'
        ],
        [
            '|'
        ], 
    ].reduce(function(parser, ops) {
        return createBinaryOperationExpressionParser(parser, ops);
    }, parseUnaryExpression);
    function parseExpression(text, cursor) {
        cursor += readWhitespace(text, cursor).length;
        return parseBinaryOperationExpression(text, cursor);
    }
    function parseEcmaNumberExpression(text) {
        var expr = parseExpression(text, 0);
        if (!expr) return null;
        var cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
        if (cursor !== text.length) return null;
        return expr.evaluable;
    }
    function parseNumber(text) {
        var _a;
        var r = parseEcmaNumberExpression(text);
        return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
    }
    function numberFromUnknown(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            var pv = parseNumber(value);
            if (!isEmpty(pv)) return pv;
        }
        return 0;
    }
    function numberToString(value) {
        return String(value);
    }
    function createNumberFormatter(digits) {
        return function(value) {
            return value.toFixed(Math.max(Math.min(digits, 20), 0));
        };
    }
    var innerFormatter = createNumberFormatter(0);
    function formatPercentage(value) {
        return innerFormatter(value) + '%';
    }
    function stringFromUnknown(value) {
        return String(value);
    }
    function formatString(value) {
        return value;
    }
    function fillBuffer(buffer, bufferSize) {
        while(buffer.length < bufferSize)buffer.push(undefined);
    }
    function initializeBuffer(bufferSize) {
        var buffer = [];
        fillBuffer(buffer, bufferSize);
        return createValue(buffer);
    }
    function createTrimmedBuffer(buffer) {
        var index = buffer.indexOf(undefined);
        return forceCast(index < 0 ? buffer : buffer.slice(0, index));
    }
    function createPushedBuffer(buffer, newValue) {
        var newBuffer = _helpers.toConsumableArray(createTrimmedBuffer(buffer)).concat([
            newValue
        ]);
        if (newBuffer.length > buffer.length) newBuffer.splice(0, newBuffer.length - buffer.length);
        else fillBuffer(newBuffer, buffer.length);
        return newBuffer;
    }
    function connectValues(param) {
        var primary = param.primary, secondary = param.secondary, forward = param.forward, backward = param.backward;
        var changing = false;
        function preventFeedback(callback) {
            if (changing) return;
            changing = true;
            callback();
            changing = false;
        }
        primary.emitter.on('change', function(ev) {
            preventFeedback(function() {
                secondary.setRawValue(forward(primary, secondary), ev.options);
            });
        });
        secondary.emitter.on('change', function(ev) {
            preventFeedback(function() {
                primary.setRawValue(backward(primary, secondary), ev.options);
            });
            preventFeedback(function() {
                secondary.setRawValue(forward(primary, secondary), ev.options);
            });
        });
        preventFeedback(function() {
            secondary.setRawValue(forward(primary, secondary), {
                forceEmit: false,
                last: true
            });
        });
    }
    function getStepForKey(baseStep, keys) {
        var step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
        if (keys.upKey) return +step;
        else if (keys.downKey) return -step;
        return 0;
    }
    function getVerticalStepKeys(ev) {
        return {
            altKey: ev.altKey,
            downKey: ev.key === 'ArrowDown',
            shiftKey: ev.shiftKey,
            upKey: ev.key === 'ArrowUp'
        };
    }
    function getHorizontalStepKeys(ev) {
        return {
            altKey: ev.altKey,
            downKey: ev.key === 'ArrowLeft',
            shiftKey: ev.shiftKey,
            upKey: ev.key === 'ArrowRight'
        };
    }
    function isVerticalArrowKey(key) {
        return key === 'ArrowUp' || key === 'ArrowDown';
    }
    function isArrowKey(key) {
        return isVerticalArrowKey(key) || key === 'ArrowLeft' || key === 'ArrowRight';
    }
    function computeOffset$1(ev, elem) {
        var win = elem.ownerDocument.defaultView;
        var rect = elem.getBoundingClientRect();
        return {
            x: ev.pageX - ((win && win.scrollX || 0) + rect.left),
            y: ev.pageY - ((win && win.scrollY || 0) + rect.top)
        };
    }
    var PointerHandler = /*#__PURE__*/ function() {
        function PointerHandler(element) {
            _helpers.classCallCheck(this, PointerHandler);
            this.lastTouch_ = null;
            this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
            this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
            this.onMouseDown_ = this.onMouseDown_.bind(this);
            this.onTouchEnd_ = this.onTouchEnd_.bind(this);
            this.onTouchMove_ = this.onTouchMove_.bind(this);
            this.onTouchStart_ = this.onTouchStart_.bind(this);
            this.elem_ = element;
            this.emitter = new Emitter();
            element.addEventListener('touchstart', this.onTouchStart_, {
                passive: false
            });
            element.addEventListener('touchmove', this.onTouchMove_, {
                passive: true
            });
            element.addEventListener('touchend', this.onTouchEnd_);
            element.addEventListener('mousedown', this.onMouseDown_);
        }
        _helpers.createClass(PointerHandler, [
            {
                key: "computePosition_",
                value: function computePosition_(offset) {
                    var rect = this.elem_.getBoundingClientRect();
                    return {
                        bounds: {
                            width: rect.width,
                            height: rect.height
                        },
                        point: offset ? {
                            x: offset.x,
                            y: offset.y
                        } : null
                    };
                }
            },
            {
                key: "onMouseDown_",
                value: function onMouseDown_(ev) {
                    var _a;
                    ev.preventDefault();
                    (_a = ev.currentTarget) === null || _a === void 0 || _a.focus();
                    var doc = this.elem_.ownerDocument;
                    doc.addEventListener('mousemove', this.onDocumentMouseMove_);
                    doc.addEventListener('mouseup', this.onDocumentMouseUp_);
                    this.emitter.emit('down', {
                        altKey: ev.altKey,
                        data: this.computePosition_(computeOffset$1(ev, this.elem_)),
                        sender: this,
                        shiftKey: ev.shiftKey
                    });
                }
            },
            {
                key: "onDocumentMouseMove_",
                value: function onDocumentMouseMove_(ev) {
                    this.emitter.emit('move', {
                        altKey: ev.altKey,
                        data: this.computePosition_(computeOffset$1(ev, this.elem_)),
                        sender: this,
                        shiftKey: ev.shiftKey
                    });
                }
            },
            {
                key: "onDocumentMouseUp_",
                value: function onDocumentMouseUp_(ev) {
                    var doc = this.elem_.ownerDocument;
                    doc.removeEventListener('mousemove', this.onDocumentMouseMove_);
                    doc.removeEventListener('mouseup', this.onDocumentMouseUp_);
                    this.emitter.emit('up', {
                        altKey: ev.altKey,
                        data: this.computePosition_(computeOffset$1(ev, this.elem_)),
                        sender: this,
                        shiftKey: ev.shiftKey
                    });
                }
            },
            {
                key: "onTouchStart_",
                value: function onTouchStart_(ev) {
                    ev.preventDefault();
                    var touch = ev.targetTouches.item(0);
                    var rect = this.elem_.getBoundingClientRect();
                    this.emitter.emit('down', {
                        altKey: ev.altKey,
                        data: this.computePosition_(touch ? {
                            x: touch.clientX - rect.left,
                            y: touch.clientY - rect.top
                        } : undefined),
                        sender: this,
                        shiftKey: ev.shiftKey
                    });
                    this.lastTouch_ = touch;
                }
            },
            {
                key: "onTouchMove_",
                value: function onTouchMove_(ev) {
                    var touch = ev.targetTouches.item(0);
                    var rect = this.elem_.getBoundingClientRect();
                    this.emitter.emit('move', {
                        altKey: ev.altKey,
                        data: this.computePosition_(touch ? {
                            x: touch.clientX - rect.left,
                            y: touch.clientY - rect.top
                        } : undefined),
                        sender: this,
                        shiftKey: ev.shiftKey
                    });
                    this.lastTouch_ = touch;
                }
            },
            {
                key: "onTouchEnd_",
                value: function onTouchEnd_(ev) {
                    var _a;
                    var touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
                    var rect = this.elem_.getBoundingClientRect();
                    this.emitter.emit('up', {
                        altKey: ev.altKey,
                        data: this.computePosition_(touch ? {
                            x: touch.clientX - rect.left,
                            y: touch.clientY - rect.top
                        } : undefined),
                        sender: this,
                        shiftKey: ev.shiftKey
                    });
                }
            }
        ]);
        return PointerHandler;
    }();
    function mapRange(value, start1, end1, start2, end2) {
        var p = (value - start1) / (end1 - start1);
        return start2 + p * (end2 - start2);
    }
    function getDecimalDigits(value) {
        var text = String(value.toFixed(10));
        var frac = text.split('.')[1];
        return frac.replace(/0+$/, '').length;
    }
    function constrainRange(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    function loopRange(value, max) {
        return (value % max + max) % max;
    }
    var className$g = ClassName('txt');
    var NumberTextView = /*#__PURE__*/ function() {
        function NumberTextView(doc, config) {
            _helpers.classCallCheck(this, NumberTextView);
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on('change', this.onChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$g(), className$g(undefined, 'num'));
            if (config.arrayPosition) this.element.classList.add(className$g(undefined, config.arrayPosition));
            config.viewProps.bindClassModifiers(this.element);
            var inputElem = doc.createElement('input');
            inputElem.classList.add(className$g('i'));
            inputElem.type = 'text';
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            this.onDraggingChange_ = this.onDraggingChange_.bind(this);
            this.dragging_ = config.dragging;
            this.dragging_.emitter.on('change', this.onDraggingChange_);
            this.element.classList.add(className$g());
            this.inputElement.classList.add(className$g('i'));
            var knobElem = doc.createElement('div');
            knobElem.classList.add(className$g('k'));
            this.element.appendChild(knobElem);
            this.knobElement = knobElem;
            var guideElem = doc.createElementNS(SVG_NS, 'svg');
            guideElem.classList.add(className$g('g'));
            this.knobElement.appendChild(guideElem);
            var bodyElem = doc.createElementNS(SVG_NS, 'path');
            bodyElem.classList.add(className$g('gb'));
            guideElem.appendChild(bodyElem);
            this.guideBodyElem_ = bodyElem;
            var headElem = doc.createElementNS(SVG_NS, 'path');
            headElem.classList.add(className$g('gh'));
            guideElem.appendChild(headElem);
            this.guideHeadElem_ = headElem;
            var tooltipElem = doc.createElement('div');
            tooltipElem.classList.add(ClassName('tt')());
            this.knobElement.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on('change', this.onChange_);
            this.value = config.value;
            this.refresh();
        }
        _helpers.createClass(NumberTextView, [
            {
                key: "onDraggingChange_",
                value: function onDraggingChange_(ev) {
                    if (ev.rawValue === null) {
                        this.element.classList.remove(className$g(undefined, 'drg'));
                        return;
                    }
                    this.element.classList.add(className$g(undefined, 'drg'));
                    var x = ev.rawValue / this.props_.get('draggingScale');
                    var aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
                    var adx = constrainRange(-aox, -4, 4);
                    this.guideHeadElem_.setAttributeNS(null, 'd', [
                        "M ".concat(aox + adx, ",0 L").concat(aox, ",4 L").concat(aox + adx, ",8"),
                        "M ".concat(x, ",-1 L").concat(x, ",9")
                    ].join(' '));
                    this.guideBodyElem_.setAttributeNS(null, 'd', "M 0,4 L".concat(x, ",4"));
                    var formatter = this.props_.get('formatter');
                    this.tooltipElem_.textContent = formatter(this.value.rawValue);
                    this.tooltipElem_.style.left = "".concat(x, "px");
                }
            },
            {
                key: "refresh",
                value: function refresh() {
                    var formatter = this.props_.get('formatter');
                    this.inputElement.value = formatter(this.value.rawValue);
                }
            },
            {
                key: "onChange_",
                value: function onChange_() {
                    this.refresh();
                }
            }
        ]);
        return NumberTextView;
    }();
    var NumberTextController = /*#__PURE__*/ function() {
        function NumberTextController(doc, config) {
            _helpers.classCallCheck(this, NumberTextController);
            this.originRawValue_ = 0;
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
            this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.baseStep_ = config.baseStep;
            this.parser_ = config.parser;
            this.props = config.props;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.dragging_ = createValue(null);
            this.view = new NumberTextView(doc, {
                arrayPosition: config.arrayPosition,
                dragging: this.dragging_,
                props: this.props,
                value: this.value,
                viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
            this.view.inputElement.addEventListener('keydown', this.onInputKeyDown_);
            this.view.inputElement.addEventListener('keyup', this.onInputKeyUp_);
            var ph = new PointerHandler(this.view.knobElement);
            ph.emitter.on('down', this.onPointerDown_);
            ph.emitter.on('move', this.onPointerMove_);
            ph.emitter.on('up', this.onPointerUp_);
        }
        _helpers.createClass(NumberTextController, [
            {
                key: "onInputChange_",
                value: function onInputChange_(e) {
                    var inputElem = forceCast(e.currentTarget);
                    var value = inputElem.value;
                    var parsedValue = this.parser_(value);
                    if (!isEmpty(parsedValue)) this.value.rawValue = parsedValue;
                    this.view.refresh();
                }
            },
            {
                key: "onInputKeyDown_",
                value: function onInputKeyDown_(ev) {
                    var step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
                    if (step === 0) return;
                    this.value.setRawValue(this.value.rawValue + step, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onInputKeyUp_",
                value: function onInputKeyUp_(ev) {
                    var step = getStepForKey(this.baseStep_, getVerticalStepKeys(ev));
                    if (step === 0) return;
                    this.value.setRawValue(this.value.rawValue, {
                        forceEmit: true,
                        last: true
                    });
                }
            },
            {
                key: "onPointerDown_",
                value: function onPointerDown_() {
                    this.originRawValue_ = this.value.rawValue;
                    this.dragging_.rawValue = 0;
                }
            },
            {
                key: "computeDraggingValue_",
                value: function computeDraggingValue_(data) {
                    if (!data.point) return null;
                    var dx = data.point.x - data.bounds.width / 2;
                    return this.originRawValue_ + dx * this.props.get('draggingScale');
                }
            },
            {
                key: "onPointerMove_",
                value: function onPointerMove_(ev) {
                    var v = this.computeDraggingValue_(ev.data);
                    if (v === null) return;
                    this.value.setRawValue(v, {
                        forceEmit: false,
                        last: false
                    });
                    this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
                }
            },
            {
                key: "onPointerUp_",
                value: function onPointerUp_(ev) {
                    var v = this.computeDraggingValue_(ev.data);
                    if (v === null) return;
                    this.value.setRawValue(v, {
                        forceEmit: true,
                        last: true
                    });
                    this.dragging_.rawValue = null;
                }
            }
        ]);
        return NumberTextController;
    }();
    var className$f = ClassName('sld');
    var SliderView = /*#__PURE__*/ function() {
        function SliderView(doc, config) {
            _helpers.classCallCheck(this, SliderView);
            this.onChange_ = this.onChange_.bind(this);
            this.props_ = config.props;
            this.props_.emitter.on('change', this.onChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$f());
            config.viewProps.bindClassModifiers(this.element);
            var trackElem = doc.createElement('div');
            trackElem.classList.add(className$f('t'));
            config.viewProps.bindTabIndex(trackElem);
            this.element.appendChild(trackElem);
            this.trackElement = trackElem;
            var knobElem = doc.createElement('div');
            knobElem.classList.add(className$f('k'));
            this.trackElement.appendChild(knobElem);
            this.knobElement = knobElem;
            config.value.emitter.on('change', this.onChange_);
            this.value = config.value;
            this.update_();
        }
        _helpers.createClass(SliderView, [
            {
                key: "update_",
                value: function update_() {
                    var p = constrainRange(mapRange(this.value.rawValue, this.props_.get('minValue'), this.props_.get('maxValue'), 0, 100), 0, 100);
                    this.knobElement.style.width = "".concat(p, "%");
                }
            },
            {
                key: "onChange_",
                value: function onChange_() {
                    this.update_();
                }
            }
        ]);
        return SliderView;
    }();
    var SliderController = /*#__PURE__*/ function() {
        function SliderController(doc, config) {
            _helpers.classCallCheck(this, SliderController);
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.baseStep_ = config.baseStep;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.props = config.props;
            this.view = new SliderView(doc, {
                props: this.props,
                value: this.value,
                viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.trackElement);
            this.ptHandler_.emitter.on('down', this.onPointerDownOrMove_);
            this.ptHandler_.emitter.on('move', this.onPointerDownOrMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.trackElement.addEventListener('keydown', this.onKeyDown_);
            this.view.trackElement.addEventListener('keyup', this.onKeyUp_);
        }
        _helpers.createClass(SliderController, [
            {
                key: "handlePointerEvent_",
                value: function handlePointerEvent_(d, opts) {
                    if (!d.point) return;
                    this.value.setRawValue(mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get('minValue'), this.props.get('maxValue')), opts);
                }
            },
            {
                key: "onPointerDownOrMove_",
                value: function onPointerDownOrMove_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerUp_",
                value: function onPointerUp_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: true,
                        last: true
                    });
                }
            },
            {
                key: "onKeyDown_",
                value: function onKeyDown_(ev) {
                    var step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
                    if (step === 0) return;
                    this.value.setRawValue(this.value.rawValue + step, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onKeyUp_",
                value: function onKeyUp_(ev) {
                    var step = getStepForKey(this.baseStep_, getHorizontalStepKeys(ev));
                    if (step === 0) return;
                    this.value.setRawValue(this.value.rawValue, {
                        forceEmit: true,
                        last: true
                    });
                }
            }
        ]);
        return SliderController;
    }();
    var className$e = ClassName('sldtxt');
    var SliderTextView = function SliderTextView(doc, config) {
        _helpers.classCallCheck(this, SliderTextView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$e());
        var sliderElem = doc.createElement('div');
        sliderElem.classList.add(className$e('s'));
        this.sliderView_ = config.sliderView;
        sliderElem.appendChild(this.sliderView_.element);
        this.element.appendChild(sliderElem);
        var textElem = doc.createElement('div');
        textElem.classList.add(className$e('t'));
        this.textView_ = config.textView;
        textElem.appendChild(this.textView_.element);
        this.element.appendChild(textElem);
    };
    var SliderTextController = /*#__PURE__*/ function() {
        function SliderTextController(doc, config) {
            _helpers.classCallCheck(this, SliderTextController);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.sliderC_ = new SliderController(doc, {
                baseStep: config.baseStep,
                props: config.sliderProps,
                value: config.value,
                viewProps: this.viewProps
            });
            this.textC_ = new NumberTextController(doc, {
                baseStep: config.baseStep,
                parser: config.parser,
                props: config.textProps,
                value: config.value,
                viewProps: config.viewProps
            });
            this.view = new SliderTextView(doc, {
                sliderView: this.sliderC_.view,
                textView: this.textC_.view
            });
        }
        _helpers.createClass(SliderTextController, [
            {
                key: "sliderController",
                get: function get() {
                    return this.sliderC_;
                }
            },
            {
                key: "textController",
                get: function get() {
                    return this.textC_;
                }
            }
        ]);
        return SliderTextController;
    }();
    function writePrimitive(target, value) {
        target.write(value);
    }
    function parseListOptions(value) {
        var p = ParamsParsers;
        if (Array.isArray(value)) return p.required.array(p.required.object({
            text: p.required.string,
            value: p.required.raw
        }))(value).value;
        if (typeof value === 'object') return p.required.raw(value).value;
        return undefined;
    }
    function parsePickerLayout(value) {
        if (value === 'inline' || value === 'popup') return value;
        return undefined;
    }
    function parsePointDimensionParams(value) {
        var p = ParamsParsers;
        return p.required.object({
            max: p.optional.number,
            min: p.optional.number,
            step: p.optional.number
        })(value).value;
    }
    function normalizeListOptions(options) {
        if (Array.isArray(options)) return options;
        var items = [];
        Object.keys(options).forEach(function(text) {
            items.push({
                text: text,
                value: options[text]
            });
        });
        return items;
    }
    function createListConstraint(options) {
        return !isEmpty(options) ? new ListConstraint(normalizeListOptions(forceCast(options))) : null;
    }
    function findListItems(constraint) {
        var c = constraint ? findConstraint(constraint, ListConstraint) : null;
        if (!c) return null;
        return c.options;
    }
    function findStep(constraint) {
        var c = constraint ? findConstraint(constraint, StepConstraint) : null;
        if (!c) return null;
        return c.step;
    }
    function getSuitableDecimalDigits(constraint, rawValue) {
        var sc = constraint && findConstraint(constraint, StepConstraint);
        if (sc) return getDecimalDigits(sc.step);
        return Math.max(getDecimalDigits(rawValue), 2);
    }
    function getBaseStep(constraint) {
        var step = findStep(constraint);
        return step !== null && step !== void 0 ? step : 1;
    }
    function getSuitableDraggingScale(constraint, rawValue) {
        var _a;
        var sc = constraint && findConstraint(constraint, StepConstraint);
        var base = Math.abs((_a = sc === null || sc === void 0 ? void 0 : sc.step) !== null && _a !== void 0 ? _a : rawValue);
        return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
    }
    var className$d = ClassName('ckb');
    var CheckboxView = /*#__PURE__*/ function() {
        function CheckboxView(doc, config) {
            _helpers.classCallCheck(this, CheckboxView);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.element = doc.createElement('div');
            this.element.classList.add(className$d());
            config.viewProps.bindClassModifiers(this.element);
            var labelElem = doc.createElement('label');
            labelElem.classList.add(className$d('l'));
            this.element.appendChild(labelElem);
            var inputElem = doc.createElement('input');
            inputElem.classList.add(className$d('i'));
            inputElem.type = 'checkbox';
            labelElem.appendChild(inputElem);
            this.inputElement = inputElem;
            config.viewProps.bindDisabled(this.inputElement);
            var wrapperElem = doc.createElement('div');
            wrapperElem.classList.add(className$d('w'));
            labelElem.appendChild(wrapperElem);
            var markElem = createSvgIconElement(doc, 'check');
            wrapperElem.appendChild(markElem);
            config.value.emitter.on('change', this.onValueChange_);
            this.value = config.value;
            this.update_();
        }
        _helpers.createClass(CheckboxView, [
            {
                key: "update_",
                value: function update_() {
                    this.inputElement.checked = this.value.rawValue;
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            }
        ]);
        return CheckboxView;
    }();
    var CheckboxController = /*#__PURE__*/ function() {
        function CheckboxController(doc, config) {
            _helpers.classCallCheck(this, CheckboxController);
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new CheckboxView(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
        }
        _helpers.createClass(CheckboxController, [
            {
                key: "onInputChange_",
                value: function onInputChange_(e) {
                    var inputElem = forceCast(e.currentTarget);
                    this.value.rawValue = inputElem.checked;
                }
            }
        ]);
        return CheckboxController;
    }();
    function createConstraint$5(params) {
        var constraints = [];
        var lc = createListConstraint(params.options);
        if (lc) constraints.push(lc);
        return new CompositeConstraint(constraints);
    }
    var BooleanInputPlugin = {
        id: 'input-bool',
        type: 'input',
        accept: function(value, params) {
            if (typeof value !== 'boolean') return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                options: p.optional.custom(parseListOptions)
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return boolFromUnknown;
            },
            constraint: function(args) {
                return createConstraint$5(args.params);
            },
            writer: function(_args) {
                return writePrimitive;
            }
        },
        controller: function(args) {
            var _a;
            var doc = args.document;
            var value = args.value;
            var c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) return new ListController(doc, {
                props: ValueMap.fromObject({
                    options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value: value,
                viewProps: args.viewProps
            });
            return new CheckboxController(doc, {
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    var className$c = ClassName('col');
    var ColorView = function ColorView(doc, config) {
        _helpers.classCallCheck(this, ColorView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$c());
        config.foldable.bindExpandedClass(this.element, className$c(undefined, 'expanded'));
        bindValueMap(config.foldable, 'completed', valueToClassName(this.element, className$c(undefined, 'cpl')));
        var headElem = doc.createElement('div');
        headElem.classList.add(className$c('h'));
        this.element.appendChild(headElem);
        var swatchElem = doc.createElement('div');
        swatchElem.classList.add(className$c('s'));
        headElem.appendChild(swatchElem);
        this.swatchElement = swatchElem;
        var textElem = doc.createElement('div');
        textElem.classList.add(className$c('t'));
        headElem.appendChild(textElem);
        this.textElement = textElem;
        if (config.pickerLayout === 'inline') {
            var pickerElem = doc.createElement('div');
            pickerElem.classList.add(className$c('p'));
            this.element.appendChild(pickerElem);
            this.pickerElement = pickerElem;
        } else this.pickerElement = null;
    };
    function rgbToHsl(r, g, b) {
        var rp = constrainRange(r / 255, 0, 1);
        var gp = constrainRange(g / 255, 0, 1);
        var bp = constrainRange(b / 255, 0, 1);
        var cmax = Math.max(rp, gp, bp);
        var cmin = Math.min(rp, gp, bp);
        var c = cmax - cmin;
        var h = 0;
        var s = 0;
        var l = (cmin + cmax) / 2;
        if (c !== 0) {
            s = c / (1 - Math.abs(cmax + cmin - 1));
            if (rp === cmax) h = (gp - bp) / c;
            else if (gp === cmax) h = 2 + (bp - rp) / c;
            else h = 4 + (rp - gp) / c;
            h = h / 6 + (h < 0 ? 1 : 0);
        }
        return [
            h * 360,
            s * 100,
            l * 100
        ];
    }
    function hslToRgb(h, s, l) {
        var hp = (h % 360 + 360) % 360;
        var sp = constrainRange(s / 100, 0, 1);
        var lp = constrainRange(l / 100, 0, 1);
        var c = (1 - Math.abs(2 * lp - 1)) * sp;
        var x = c * (1 - Math.abs(hp / 60 % 2 - 1));
        var m = lp - c / 2;
        var rp, gp, bp;
        var ref, ref1, ref2, ref3, ref4, ref5;
        if (hp >= 0 && hp < 60) ref = [
            c,
            x,
            0
        ], rp = ref[0], gp = ref[1], bp = ref[2], ref;
        else if (hp >= 60 && hp < 120) ref1 = [
            x,
            c,
            0
        ], rp = ref1[0], gp = ref1[1], bp = ref1[2], ref1;
        else if (hp >= 120 && hp < 180) ref2 = [
            0,
            c,
            x
        ], rp = ref2[0], gp = ref2[1], bp = ref2[2], ref2;
        else if (hp >= 180 && hp < 240) ref3 = [
            0,
            x,
            c
        ], rp = ref3[0], gp = ref3[1], bp = ref3[2], ref3;
        else if (hp >= 240 && hp < 300) ref4 = [
            x,
            0,
            c
        ], rp = ref4[0], gp = ref4[1], bp = ref4[2], ref4;
        else ref5 = [
            c,
            0,
            x
        ], rp = ref5[0], gp = ref5[1], bp = ref5[2], ref5;
        return [
            (rp + m) * 255,
            (gp + m) * 255,
            (bp + m) * 255
        ];
    }
    function rgbToHsv(r, g, b) {
        var rp = constrainRange(r / 255, 0, 1);
        var gp = constrainRange(g / 255, 0, 1);
        var bp = constrainRange(b / 255, 0, 1);
        var cmax = Math.max(rp, gp, bp);
        var cmin = Math.min(rp, gp, bp);
        var d = cmax - cmin;
        var h;
        if (d === 0) h = 0;
        else if (cmax === rp) h = 60 * (((gp - bp) / d % 6 + 6) % 6);
        else if (cmax === gp) h = 60 * ((bp - rp) / d + 2);
        else h = 60 * ((rp - gp) / d + 4);
        var s = cmax === 0 ? 0 : d / cmax;
        var v = cmax;
        return [
            h,
            s * 100,
            v * 100
        ];
    }
    function hsvToRgb(h, s, v) {
        var hp = loopRange(h, 360);
        var sp = constrainRange(s / 100, 0, 1);
        var vp = constrainRange(v / 100, 0, 1);
        var c = vp * sp;
        var x = c * (1 - Math.abs(hp / 60 % 2 - 1));
        var m = vp - c;
        var rp, gp, bp;
        var ref, ref6, ref7, ref8, ref9, ref10;
        if (hp >= 0 && hp < 60) ref = [
            c,
            x,
            0
        ], rp = ref[0], gp = ref[1], bp = ref[2], ref;
        else if (hp >= 60 && hp < 120) ref6 = [
            x,
            c,
            0
        ], rp = ref6[0], gp = ref6[1], bp = ref6[2], ref6;
        else if (hp >= 120 && hp < 180) ref7 = [
            0,
            c,
            x
        ], rp = ref7[0], gp = ref7[1], bp = ref7[2], ref7;
        else if (hp >= 180 && hp < 240) ref8 = [
            0,
            x,
            c
        ], rp = ref8[0], gp = ref8[1], bp = ref8[2], ref8;
        else if (hp >= 240 && hp < 300) ref9 = [
            x,
            0,
            c
        ], rp = ref9[0], gp = ref9[1], bp = ref9[2], ref9;
        else ref10 = [
            c,
            0,
            x
        ], rp = ref10[0], gp = ref10[1], bp = ref10[2], ref10;
        return [
            (rp + m) * 255,
            (gp + m) * 255,
            (bp + m) * 255
        ];
    }
    function hslToHsv(h, s, l) {
        var sd = l + s * (100 - Math.abs(2 * l - 100)) / 200;
        return [
            h,
            sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0,
            l + s * (100 - Math.abs(2 * l - 100)) / 200, 
        ];
    }
    function hsvToHsl(h, s, v) {
        var sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
        return [
            h,
            sd !== 0 ? s * v / sd : 0,
            v * (200 - s) / 200
        ];
    }
    function removeAlphaComponent(comps) {
        return [
            comps[0],
            comps[1],
            comps[2]
        ];
    }
    function appendAlphaComponent(comps, alpha) {
        return [
            comps[0],
            comps[1],
            comps[2],
            alpha
        ];
    }
    var MODE_CONVERTER_MAP = {
        hsl: {
            hsl: function(h, s, l) {
                return [
                    h,
                    s,
                    l
                ];
            },
            hsv: hslToHsv,
            rgb: hslToRgb
        },
        hsv: {
            hsl: hsvToHsl,
            hsv: function(h, s, v) {
                return [
                    h,
                    s,
                    v
                ];
            },
            rgb: hsvToRgb
        },
        rgb: {
            hsl: rgbToHsl,
            hsv: rgbToHsv,
            rgb: function(r, g, b) {
                return [
                    r,
                    g,
                    b
                ];
            }
        }
    };
    function convertColorMode(components, fromMode, toMode) {
        var _fromMode;
        return (_fromMode = MODE_CONVERTER_MAP[fromMode])[toMode].apply(_fromMode, _helpers.toConsumableArray(components));
    }
    var CONSTRAINT_MAP = {
        hsl: function(comps) {
            var _a;
            return [
                loopRange(comps[0], 360),
                constrainRange(comps[1], 0, 100),
                constrainRange(comps[2], 0, 100),
                constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1), 
            ];
        },
        hsv: function(comps) {
            var _a;
            return [
                loopRange(comps[0], 360),
                constrainRange(comps[1], 0, 100),
                constrainRange(comps[2], 0, 100),
                constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1), 
            ];
        },
        rgb: function(comps) {
            var _a;
            return [
                constrainRange(comps[0], 0, 255),
                constrainRange(comps[1], 0, 255),
                constrainRange(comps[2], 0, 255),
                constrainRange((_a = comps[3]) !== null && _a !== void 0 ? _a : 1, 0, 1), 
            ];
        }
    };
    function isRgbColorComponent(obj, key) {
        if (typeof obj !== 'object' || isEmpty(obj)) return false;
        return key in obj && typeof obj[key] === 'number';
    }
    var Color = /*#__PURE__*/ function() {
        function Color(comps, mode) {
            _helpers.classCallCheck(this, Color);
            this.mode_ = mode;
            this.comps_ = CONSTRAINT_MAP[mode](comps);
        }
        _helpers.createClass(Color, [
            {
                key: "mode",
                get: function get() {
                    return this.mode_;
                }
            },
            {
                key: "getComponents",
                value: function getComponents(opt_mode) {
                    return appendAlphaComponent(convertColorMode(removeAlphaComponent(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
                }
            },
            {
                key: "toRgbaObject",
                value: function toRgbaObject() {
                    var rgbComps = this.getComponents('rgb');
                    return {
                        r: rgbComps[0],
                        g: rgbComps[1],
                        b: rgbComps[2],
                        a: rgbComps[3]
                    };
                }
            }
        ], [
            {
                key: "black",
                value: function black() {
                    return new Color([
                        0,
                        0,
                        0
                    ], 'rgb');
                }
            },
            {
                key: "fromObject",
                value: function fromObject(obj) {
                    var comps = 'a' in obj ? [
                        obj.r,
                        obj.g,
                        obj.b,
                        obj.a
                    ] : [
                        obj.r,
                        obj.g,
                        obj.b
                    ];
                    return new Color(comps, 'rgb');
                }
            },
            {
                key: "toRgbaObject",
                value: function toRgbaObject(color) {
                    return color.toRgbaObject();
                }
            },
            {
                key: "isRgbColorObject",
                value: function isRgbColorObject(obj) {
                    return isRgbColorComponent(obj, 'r') && isRgbColorComponent(obj, 'g') && isRgbColorComponent(obj, 'b');
                }
            },
            {
                key: "isRgbaColorObject",
                value: function isRgbaColorObject(obj) {
                    return this.isRgbColorObject(obj) && isRgbColorComponent(obj, 'a');
                }
            },
            {
                key: "isColorObject",
                value: function isColorObject(obj) {
                    return this.isRgbColorObject(obj);
                }
            },
            {
                key: "equals",
                value: function equals(v1, v2) {
                    if (v1.mode_ !== v2.mode_) return false;
                    var comps1 = v1.comps_;
                    var comps2 = v2.comps_;
                    for(var i = 0; i < comps1.length; i++){
                        if (comps1[i] !== comps2[i]) return false;
                    }
                    return true;
                }
            }
        ]);
        return Color;
    }();
    var className$b = ClassName('colp');
    var ColorPickerView = /*#__PURE__*/ function() {
        function ColorPickerView(doc, config) {
            _helpers.classCallCheck(this, ColorPickerView);
            this.alphaViews_ = null;
            this.element = doc.createElement('div');
            this.element.classList.add(className$b());
            var hsvElem = doc.createElement('div');
            hsvElem.classList.add(className$b('hsv'));
            var svElem = doc.createElement('div');
            svElem.classList.add(className$b('sv'));
            this.svPaletteView_ = config.svPaletteView;
            svElem.appendChild(this.svPaletteView_.element);
            hsvElem.appendChild(svElem);
            var hElem = doc.createElement('div');
            hElem.classList.add(className$b('h'));
            this.hPaletteView_ = config.hPaletteView;
            hElem.appendChild(this.hPaletteView_.element);
            hsvElem.appendChild(hElem);
            this.element.appendChild(hsvElem);
            var rgbElem = doc.createElement('div');
            rgbElem.classList.add(className$b('rgb'));
            this.textView_ = config.textView;
            rgbElem.appendChild(this.textView_.element);
            this.element.appendChild(rgbElem);
            if (config.alphaViews) {
                this.alphaViews_ = {
                    palette: config.alphaViews.palette,
                    text: config.alphaViews.text
                };
                var aElem = doc.createElement('div');
                aElem.classList.add(className$b('a'));
                var apElem = doc.createElement('div');
                apElem.classList.add(className$b('ap'));
                apElem.appendChild(this.alphaViews_.palette.element);
                aElem.appendChild(apElem);
                var atElem = doc.createElement('div');
                atElem.classList.add(className$b('at'));
                atElem.appendChild(this.alphaViews_.text.element);
                aElem.appendChild(atElem);
                this.element.appendChild(aElem);
            }
        }
        _helpers.createClass(ColorPickerView, [
            {
                key: "allFocusableElements",
                get: function get() {
                    var elems = [
                        this.svPaletteView_.element,
                        this.hPaletteView_.element,
                        this.textView_.modeSelectElement, 
                    ].concat(_helpers.toConsumableArray(this.textView_.textViews.map(function(v) {
                        return v.inputElement;
                    })));
                    if (this.alphaViews_) elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
                    return elems;
                }
            }
        ]);
        return ColorPickerView;
    }();
    function parseColorInputParams(params) {
        var p = ParamsParsers;
        return parseParams(params, {
            alpha: p.optional.boolean,
            expanded: p.optional.boolean,
            picker: p.optional.custom(parsePickerLayout)
        });
    }
    function getBaseStepForColor(forAlpha) {
        return forAlpha ? 0.1 : 1;
    }
    function parseCssNumberOrPercentage(text, maxValue) {
        var m = text.match(/^(.+)%$/);
        if (!m) return Math.min(parseFloat(text), maxValue);
        return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
    }
    var ANGLE_TO_DEG_MAP = {
        deg: function(angle) {
            return angle;
        },
        grad: function(angle) {
            return angle * 360 / 400;
        },
        rad: function(angle) {
            return angle * 360 / (2 * Math.PI);
        },
        turn: function(angle) {
            return angle * 360;
        }
    };
    function parseCssNumberOrAngle(text) {
        var m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
        if (!m) return parseFloat(text);
        var angle = parseFloat(m[1]);
        var unit = m[2];
        return ANGLE_TO_DEG_MAP[unit](angle);
    }
    var NOTATION_TO_PARSER_MAP = {
        'func.rgb': function(text) {
            var m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) return null;
            var comps = [
                parseCssNumberOrPercentage(m[1], 255),
                parseCssNumberOrPercentage(m[2], 255),
                parseCssNumberOrPercentage(m[3], 255), 
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) return null;
            return new Color(comps, 'rgb');
        },
        'func.rgba': function(text) {
            var m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) return null;
            var comps = [
                parseCssNumberOrPercentage(m[1], 255),
                parseCssNumberOrPercentage(m[2], 255),
                parseCssNumberOrPercentage(m[3], 255),
                parseCssNumberOrPercentage(m[4], 1), 
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) return null;
            return new Color(comps, 'rgb');
        },
        'func.hsl': function(text) {
            var m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) return null;
            var comps = [
                parseCssNumberOrAngle(m[1]),
                parseCssNumberOrPercentage(m[2], 100),
                parseCssNumberOrPercentage(m[3], 100), 
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) return null;
            return new Color(comps, 'hsl');
        },
        'func.hsla': function(text) {
            var m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
            if (!m) return null;
            var comps = [
                parseCssNumberOrAngle(m[1]),
                parseCssNumberOrPercentage(m[2], 100),
                parseCssNumberOrPercentage(m[3], 100),
                parseCssNumberOrPercentage(m[4], 1), 
            ];
            if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) return null;
            return new Color(comps, 'hsl');
        },
        'hex.rgb': function(text) {
            var mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRgb) return new Color([
                parseInt(mRgb[1] + mRgb[1], 16),
                parseInt(mRgb[2] + mRgb[2], 16),
                parseInt(mRgb[3] + mRgb[3], 16), 
            ], 'rgb');
            var mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRrggbb) return new Color([
                parseInt(mRrggbb[1], 16),
                parseInt(mRrggbb[2], 16),
                parseInt(mRrggbb[3], 16), 
            ], 'rgb');
            return null;
        },
        'hex.rgba': function(text) {
            var mRgb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRgb) return new Color([
                parseInt(mRgb[1] + mRgb[1], 16),
                parseInt(mRgb[2] + mRgb[2], 16),
                parseInt(mRgb[3] + mRgb[3], 16),
                mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1), 
            ], 'rgb');
            var mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRrggbb) return new Color([
                parseInt(mRrggbb[1], 16),
                parseInt(mRrggbb[2], 16),
                parseInt(mRrggbb[3], 16),
                mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1), 
            ], 'rgb');
            return null;
        }
    };
    function getColorNotation(text) {
        var notations = Object.keys(NOTATION_TO_PARSER_MAP);
        return notations.reduce(function(result, notation) {
            if (result) return result;
            var subparser = NOTATION_TO_PARSER_MAP[notation];
            return subparser(text) ? notation : null;
        }, null);
    }
    var CompositeColorParser = function(text) {
        var notation = getColorNotation(text);
        return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
    };
    function hasAlphaComponent(notation) {
        return notation === 'func.hsla' || notation === 'func.rgba' || notation === 'hex.rgba';
    }
    function colorFromString(value) {
        if (typeof value === 'string') {
            var cv = CompositeColorParser(value);
            if (cv) return cv;
        }
        return Color.black();
    }
    function zerofill(comp) {
        var hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
        return hex.length === 1 ? "0".concat(hex) : hex;
    }
    function colorToHexRgbString(value) {
        var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '#';
        var hexes = removeAlphaComponent(value.getComponents('rgb')).map(zerofill).join('');
        return "".concat(prefix).concat(hexes);
    }
    function colorToHexRgbaString(value) {
        var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '#';
        var rgbaComps = value.getComponents('rgb');
        var hexes = [
            rgbaComps[0],
            rgbaComps[1],
            rgbaComps[2],
            rgbaComps[3] * 255
        ].map(zerofill).join('');
        return "".concat(prefix).concat(hexes);
    }
    function colorToFunctionalRgbString(value) {
        var formatter = createNumberFormatter(0);
        var comps = removeAlphaComponent(value.getComponents('rgb')).map(function(comp) {
            return formatter(comp);
        });
        return "rgb(".concat(comps.join(', '), ")");
    }
    function colorToFunctionalRgbaString(value) {
        var aFormatter = createNumberFormatter(2);
        var rgbFormatter = createNumberFormatter(0);
        var comps = value.getComponents('rgb').map(function(comp, index) {
            var formatter = index === 3 ? aFormatter : rgbFormatter;
            return formatter(comp);
        });
        return "rgba(".concat(comps.join(', '), ")");
    }
    function colorToFunctionalHslString(value) {
        var formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage, 
        ];
        var comps = removeAlphaComponent(value.getComponents('hsl')).map(function(comp, index) {
            return formatters[index](comp);
        });
        return "hsl(".concat(comps.join(', '), ")");
    }
    function colorToFunctionalHslaString(value) {
        var formatters = [
            createNumberFormatter(0),
            formatPercentage,
            formatPercentage,
            createNumberFormatter(2), 
        ];
        var comps = value.getComponents('hsl').map(function(comp, index) {
            return formatters[index](comp);
        });
        return "hsla(".concat(comps.join(', '), ")");
    }
    var NOTATION_TO_STRINGIFIER_MAP = {
        'func.hsl': colorToFunctionalHslString,
        'func.hsla': colorToFunctionalHslaString,
        'func.rgb': colorToFunctionalRgbString,
        'func.rgba': colorToFunctionalRgbaString,
        'hex.rgb': colorToHexRgbString,
        'hex.rgba': colorToHexRgbaString
    };
    function getColorStringifier(notation) {
        return NOTATION_TO_STRINGIFIER_MAP[notation];
    }
    var className$a = ClassName('apl');
    var APaletteView = /*#__PURE__*/ function() {
        function APaletteView(doc, config) {
            _helpers.classCallCheck(this, APaletteView);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$a());
            config.viewProps.bindTabIndex(this.element);
            var barElem = doc.createElement('div');
            barElem.classList.add(className$a('b'));
            this.element.appendChild(barElem);
            var colorElem = doc.createElement('div');
            colorElem.classList.add(className$a('c'));
            barElem.appendChild(colorElem);
            this.colorElem_ = colorElem;
            var markerElem = doc.createElement('div');
            markerElem.classList.add(className$a('m'));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            var previewElem = doc.createElement('div');
            previewElem.classList.add(className$a('p'));
            this.markerElem_.appendChild(previewElem);
            this.previewElem_ = previewElem;
            this.update_();
        }
        _helpers.createClass(APaletteView, [
            {
                key: "update_",
                value: function update_() {
                    var c = this.value.rawValue;
                    var rgbaComps = c.getComponents('rgb');
                    var leftColor = new Color([
                        rgbaComps[0],
                        rgbaComps[1],
                        rgbaComps[2],
                        0
                    ], 'rgb');
                    var rightColor = new Color([
                        rgbaComps[0],
                        rgbaComps[1],
                        rgbaComps[2],
                        255
                    ], 'rgb');
                    var gradientComps = [
                        'to right',
                        colorToFunctionalRgbaString(leftColor),
                        colorToFunctionalRgbaString(rightColor), 
                    ];
                    this.colorElem_.style.background = "linear-gradient(".concat(gradientComps.join(','), ")");
                    this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
                    var left = mapRange(rgbaComps[3], 0, 1, 0, 100);
                    this.markerElem_.style.left = "".concat(left, "%");
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            }
        ]);
        return APaletteView;
    }();
    var APaletteController = /*#__PURE__*/ function() {
        function APaletteController(doc, config) {
            _helpers.classCallCheck(this, APaletteController);
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new APaletteView(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.element.addEventListener('keyup', this.onKeyUp_);
        }
        _helpers.createClass(APaletteController, [
            {
                key: "handlePointerEvent_",
                value: function handlePointerEvent_(d, opts) {
                    if (!d.point) return;
                    var alpha = d.point.x / d.bounds.width;
                    var c = this.value.rawValue;
                    var ref = _helpers.slicedToArray(c.getComponents('hsv'), 3), h = ref[0], s = ref[1], v = ref[2];
                    this.value.setRawValue(new Color([
                        h,
                        s,
                        v,
                        alpha
                    ], 'hsv'), opts);
                }
            },
            {
                key: "onPointerDown_",
                value: function onPointerDown_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerMove_",
                value: function onPointerMove_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerUp_",
                value: function onPointerUp_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: true,
                        last: true
                    });
                }
            },
            {
                key: "onKeyDown_",
                value: function onKeyDown_(ev) {
                    var step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
                    if (step === 0) return;
                    var c = this.value.rawValue;
                    var ref = _helpers.slicedToArray(c.getComponents('hsv'), 4), h = ref[0], s = ref[1], v = ref[2], a = ref[3];
                    this.value.setRawValue(new Color([
                        h,
                        s,
                        v,
                        a + step
                    ], 'hsv'), {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onKeyUp_",
                value: function onKeyUp_(ev) {
                    var step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
                    if (step === 0) return;
                    this.value.setRawValue(this.value.rawValue, {
                        forceEmit: true,
                        last: true
                    });
                }
            }
        ]);
        return APaletteController;
    }();
    var className$9 = ClassName('coltxt');
    function createModeSelectElement(doc) {
        var selectElem = doc.createElement('select');
        var items = [
            {
                text: 'RGB',
                value: 'rgb'
            },
            {
                text: 'HSL',
                value: 'hsl'
            },
            {
                text: 'HSV',
                value: 'hsv'
            }, 
        ];
        selectElem.appendChild(items.reduce(function(frag, item) {
            var optElem = doc.createElement('option');
            optElem.textContent = item.text;
            optElem.value = item.value;
            frag.appendChild(optElem);
            return frag;
        }, doc.createDocumentFragment()));
        return selectElem;
    }
    var ColorTextView = /*#__PURE__*/ function() {
        function ColorTextView(doc, config) {
            var _this = this;
            _helpers.classCallCheck(this, ColorTextView);
            this.element = doc.createElement('div');
            this.element.classList.add(className$9());
            var modeElem = doc.createElement('div');
            modeElem.classList.add(className$9('m'));
            this.modeElem_ = createModeSelectElement(doc);
            this.modeElem_.classList.add(className$9('ms'));
            modeElem.appendChild(this.modeSelectElement);
            var modeMarkerElem = doc.createElement('div');
            modeMarkerElem.classList.add(className$9('mm'));
            modeMarkerElem.appendChild(createSvgIconElement(doc, 'dropdown'));
            modeElem.appendChild(modeMarkerElem);
            this.element.appendChild(modeElem);
            var textsElem = doc.createElement('div');
            textsElem.classList.add(className$9('w'));
            this.element.appendChild(textsElem);
            this.textsElem_ = textsElem;
            this.textViews_ = config.textViews;
            this.applyTextViews_();
            bindValue(config.colorMode, function(mode) {
                _this.modeElem_.value = mode;
            });
        }
        _helpers.createClass(ColorTextView, [
            {
                key: "modeSelectElement",
                get: function get() {
                    return this.modeElem_;
                }
            },
            {
                key: "textViews",
                get: function get() {
                    return this.textViews_;
                },
                set: function set(textViews) {
                    this.textViews_ = textViews;
                    this.applyTextViews_();
                }
            },
            {
                key: "applyTextViews_",
                value: function applyTextViews_() {
                    var _this = this;
                    removeChildElements(this.textsElem_);
                    var doc = this.element.ownerDocument;
                    this.textViews_.forEach(function(v) {
                        var compElem = doc.createElement('div');
                        compElem.classList.add(className$9('c'));
                        compElem.appendChild(v.element);
                        _this.textsElem_.appendChild(compElem);
                    });
                }
            }
        ]);
        return ColorTextView;
    }();
    var FORMATTER = createNumberFormatter(0);
    var MODE_TO_CONSTRAINT_MAP = {
        rgb: function() {
            return new RangeConstraint({
                min: 0,
                max: 255
            });
        },
        hsl: function(index) {
            return index === 0 ? new RangeConstraint({
                min: 0,
                max: 360
            }) : new RangeConstraint({
                min: 0,
                max: 100
            });
        },
        hsv: function(index) {
            return index === 0 ? new RangeConstraint({
                min: 0,
                max: 360
            }) : new RangeConstraint({
                min: 0,
                max: 100
            });
        }
    };
    function createComponentController(doc, config, index) {
        return new NumberTextController(doc, {
            arrayPosition: index === 0 ? 'fst' : index === 2 ? 'lst' : 'mid',
            baseStep: getBaseStepForColor(false),
            parser: config.parser,
            props: ValueMap.fromObject({
                draggingScale: 1,
                formatter: FORMATTER
            }),
            value: createValue(0, {
                constraint: MODE_TO_CONSTRAINT_MAP[config.colorMode](index)
            }),
            viewProps: config.viewProps
        });
    }
    var ColorTextController = /*#__PURE__*/ function() {
        function ColorTextController(doc, config) {
            _helpers.classCallCheck(this, ColorTextController);
            this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
            this.parser_ = config.parser;
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.colorMode = createValue(this.value.rawValue.mode);
            this.ccs_ = this.createComponentControllers_(doc);
            this.view = new ColorTextView(doc, {
                colorMode: this.colorMode,
                textViews: [
                    this.ccs_[0].view,
                    this.ccs_[1].view,
                    this.ccs_[2].view
                ]
            });
            this.view.modeSelectElement.addEventListener('change', this.onModeSelectChange_);
        }
        _helpers.createClass(ColorTextController, [
            {
                key: "createComponentControllers_",
                value: function createComponentControllers_(doc) {
                    var _this = this;
                    var cc = {
                        colorMode: this.colorMode.rawValue,
                        parser: this.parser_,
                        viewProps: this.viewProps
                    };
                    var ccs = [
                        createComponentController(doc, cc, 0),
                        createComponentController(doc, cc, 1),
                        createComponentController(doc, cc, 2), 
                    ];
                    ccs.forEach(function(cs, index) {
                        var _this2 = _this;
                        connectValues({
                            primary: _this.value,
                            secondary: cs.value,
                            forward: function(p) {
                                return p.rawValue.getComponents(_this2.colorMode.rawValue)[index];
                            },
                            backward: function(p, s) {
                                var pickedMode = _this2.colorMode.rawValue;
                                var comps = p.rawValue.getComponents(pickedMode);
                                comps[index] = s.rawValue;
                                return new Color(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode);
                            }
                        });
                    });
                    return ccs;
                }
            },
            {
                key: "onModeSelectChange_",
                value: function onModeSelectChange_(ev) {
                    var selectElem = ev.currentTarget;
                    this.colorMode.rawValue = selectElem.value;
                    this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
                    this.view.textViews = [
                        this.ccs_[0].view,
                        this.ccs_[1].view,
                        this.ccs_[2].view, 
                    ];
                }
            }
        ]);
        return ColorTextController;
    }();
    var className$8 = ClassName('hpl');
    var HPaletteView = /*#__PURE__*/ function() {
        function HPaletteView(doc, config) {
            _helpers.classCallCheck(this, HPaletteView);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$8());
            config.viewProps.bindTabIndex(this.element);
            var colorElem = doc.createElement('div');
            colorElem.classList.add(className$8('c'));
            this.element.appendChild(colorElem);
            var markerElem = doc.createElement('div');
            markerElem.classList.add(className$8('m'));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
        }
        _helpers.createClass(HPaletteView, [
            {
                key: "update_",
                value: function update_() {
                    var c = this.value.rawValue;
                    var ref = _helpers.slicedToArray(c.getComponents('hsv'), 1), h = ref[0];
                    this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new Color([
                        h,
                        100,
                        100
                    ], 'hsv'));
                    var left = mapRange(h, 0, 360, 0, 100);
                    this.markerElem_.style.left = "".concat(left, "%");
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            }
        ]);
        return HPaletteView;
    }();
    var HPaletteController = /*#__PURE__*/ function() {
        function HPaletteController(doc, config) {
            _helpers.classCallCheck(this, HPaletteController);
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new HPaletteView(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.element.addEventListener('keyup', this.onKeyUp_);
        }
        _helpers.createClass(HPaletteController, [
            {
                key: "handlePointerEvent_",
                value: function handlePointerEvent_(d, opts) {
                    if (!d.point) return;
                    var hue = mapRange(d.point.x, 0, d.bounds.width, 0, 360);
                    var c = this.value.rawValue;
                    var ref = _helpers.slicedToArray(c.getComponents('hsv'), 4), s = ref[1], v = ref[2], a = ref[3];
                    this.value.setRawValue(new Color([
                        hue,
                        s,
                        v,
                        a
                    ], 'hsv'), opts);
                }
            },
            {
                key: "onPointerDown_",
                value: function onPointerDown_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerMove_",
                value: function onPointerMove_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerUp_",
                value: function onPointerUp_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: true,
                        last: true
                    });
                }
            },
            {
                key: "onKeyDown_",
                value: function onKeyDown_(ev) {
                    var step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
                    if (step === 0) return;
                    var c = this.value.rawValue;
                    var ref = _helpers.slicedToArray(c.getComponents('hsv'), 4), h = ref[0], s = ref[1], v = ref[2], a = ref[3];
                    this.value.setRawValue(new Color([
                        h + step,
                        s,
                        v,
                        a
                    ], 'hsv'), {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onKeyUp_",
                value: function onKeyUp_(ev) {
                    var step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
                    if (step === 0) return;
                    this.value.setRawValue(this.value.rawValue, {
                        forceEmit: true,
                        last: true
                    });
                }
            }
        ]);
        return HPaletteController;
    }();
    var className$7 = ClassName('svp');
    var CANVAS_RESOL = 64;
    var SvPaletteView = /*#__PURE__*/ function() {
        function SvPaletteView(doc, config) {
            _helpers.classCallCheck(this, SvPaletteView);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.element = doc.createElement('div');
            this.element.classList.add(className$7());
            config.viewProps.bindTabIndex(this.element);
            var canvasElem = doc.createElement('canvas');
            canvasElem.height = CANVAS_RESOL;
            canvasElem.width = CANVAS_RESOL;
            canvasElem.classList.add(className$7('c'));
            this.element.appendChild(canvasElem);
            this.canvasElement = canvasElem;
            var markerElem = doc.createElement('div');
            markerElem.classList.add(className$7('m'));
            this.element.appendChild(markerElem);
            this.markerElem_ = markerElem;
            this.update_();
        }
        _helpers.createClass(SvPaletteView, [
            {
                key: "update_",
                value: function update_() {
                    var ctx = getCanvasContext(this.canvasElement);
                    if (!ctx) return;
                    var c = this.value.rawValue;
                    var hsvComps = c.getComponents('hsv');
                    var width = this.canvasElement.width;
                    var height = this.canvasElement.height;
                    var imgData = ctx.getImageData(0, 0, width, height);
                    var data = imgData.data;
                    for(var iy = 0; iy < height; iy++)for(var ix = 0; ix < width; ix++){
                        var s = mapRange(ix, 0, width, 0, 100);
                        var v = mapRange(iy, 0, height, 100, 0);
                        var rgbComps = hsvToRgb(hsvComps[0], s, v);
                        var i = (iy * width + ix) * 4;
                        data[i] = rgbComps[0];
                        data[i + 1] = rgbComps[1];
                        data[i + 2] = rgbComps[2];
                        data[i + 3] = 255;
                    }
                    ctx.putImageData(imgData, 0, 0);
                    var left = mapRange(hsvComps[1], 0, 100, 0, 100);
                    this.markerElem_.style.left = "".concat(left, "%");
                    var top = mapRange(hsvComps[2], 0, 100, 100, 0);
                    this.markerElem_.style.top = "".concat(top, "%");
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            }
        ]);
        return SvPaletteView;
    }();
    var SvPaletteController = /*#__PURE__*/ function() {
        function SvPaletteController(doc, config) {
            _helpers.classCallCheck(this, SvPaletteController);
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onKeyUp_ = this.onKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.view = new SvPaletteView(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.element.addEventListener('keyup', this.onKeyUp_);
        }
        _helpers.createClass(SvPaletteController, [
            {
                key: "handlePointerEvent_",
                value: function handlePointerEvent_(d, opts) {
                    if (!d.point) return;
                    var saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
                    var value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
                    var ref = _helpers.slicedToArray(this.value.rawValue.getComponents('hsv'), 4), h = ref[0], a = ref[3];
                    this.value.setRawValue(new Color([
                        h,
                        saturation,
                        value,
                        a
                    ], 'hsv'), opts);
                }
            },
            {
                key: "onPointerDown_",
                value: function onPointerDown_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerMove_",
                value: function onPointerMove_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerUp_",
                value: function onPointerUp_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: true,
                        last: true
                    });
                }
            },
            {
                key: "onKeyDown_",
                value: function onKeyDown_(ev) {
                    if (isArrowKey(ev.key)) ev.preventDefault();
                    var ref = _helpers.slicedToArray(this.value.rawValue.getComponents('hsv'), 4), h = ref[0], s = ref[1], v = ref[2], a = ref[3];
                    var baseStep = getBaseStepForColor(false);
                    var ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
                    var dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
                    if (ds === 0 && dv === 0) return;
                    this.value.setRawValue(new Color([
                        h,
                        s + ds,
                        v + dv,
                        a
                    ], 'hsv'), {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onKeyUp_",
                value: function onKeyUp_(ev) {
                    var baseStep = getBaseStepForColor(false);
                    var ds = getStepForKey(baseStep, getHorizontalStepKeys(ev));
                    var dv = getStepForKey(baseStep, getVerticalStepKeys(ev));
                    if (ds === 0 && dv === 0) return;
                    this.value.setRawValue(this.value.rawValue, {
                        forceEmit: true,
                        last: true
                    });
                }
            }
        ]);
        return SvPaletteController;
    }();
    var ColorPickerController = /*#__PURE__*/ function() {
        function ColorPickerController(doc, config) {
            _helpers.classCallCheck(this, ColorPickerController);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.hPaletteC_ = new HPaletteController(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            this.svPaletteC_ = new SvPaletteController(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            this.alphaIcs_ = config.supportsAlpha ? {
                palette: new APaletteController(doc, {
                    value: this.value,
                    viewProps: this.viewProps
                }),
                text: new NumberTextController(doc, {
                    parser: parseNumber,
                    baseStep: 0.1,
                    props: ValueMap.fromObject({
                        draggingScale: 0.01,
                        formatter: createNumberFormatter(2)
                    }),
                    value: createValue(0, {
                        constraint: new RangeConstraint({
                            min: 0,
                            max: 1
                        })
                    }),
                    viewProps: this.viewProps
                })
            } : null;
            if (this.alphaIcs_) connectValues({
                primary: this.value,
                secondary: this.alphaIcs_.text.value,
                forward: function(p) {
                    return p.rawValue.getComponents()[3];
                },
                backward: function(p, s) {
                    var comps = p.rawValue.getComponents();
                    comps[3] = s.rawValue;
                    return new Color(comps, p.rawValue.mode);
                }
            });
            this.textC_ = new ColorTextController(doc, {
                parser: parseNumber,
                value: this.value,
                viewProps: this.viewProps
            });
            this.view = new ColorPickerView(doc, {
                alphaViews: this.alphaIcs_ ? {
                    palette: this.alphaIcs_.palette.view,
                    text: this.alphaIcs_.text.view
                } : null,
                hPaletteView: this.hPaletteC_.view,
                supportsAlpha: config.supportsAlpha,
                svPaletteView: this.svPaletteC_.view,
                textView: this.textC_.view
            });
        }
        _helpers.createClass(ColorPickerController, [
            {
                key: "textController",
                get: function get() {
                    return this.textC_;
                }
            }
        ]);
        return ColorPickerController;
    }();
    var className$6 = ClassName('colsw');
    var ColorSwatchView = /*#__PURE__*/ function() {
        function ColorSwatchView(doc, config) {
            _helpers.classCallCheck(this, ColorSwatchView);
            this.onValueChange_ = this.onValueChange_.bind(this);
            config.value.emitter.on('change', this.onValueChange_);
            this.value = config.value;
            this.element = doc.createElement('div');
            this.element.classList.add(className$6());
            config.viewProps.bindClassModifiers(this.element);
            var swatchElem = doc.createElement('div');
            swatchElem.classList.add(className$6('sw'));
            this.element.appendChild(swatchElem);
            this.swatchElem_ = swatchElem;
            var buttonElem = doc.createElement('button');
            buttonElem.classList.add(className$6('b'));
            config.viewProps.bindDisabled(buttonElem);
            this.element.appendChild(buttonElem);
            this.buttonElement = buttonElem;
            this.update_();
        }
        _helpers.createClass(ColorSwatchView, [
            {
                key: "update_",
                value: function update_() {
                    var value = this.value.rawValue;
                    this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            }
        ]);
        return ColorSwatchView;
    }();
    var ColorSwatchController = function ColorSwatchController(doc, config) {
        _helpers.classCallCheck(this, ColorSwatchController);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new ColorSwatchView(doc, {
            value: this.value,
            viewProps: this.viewProps
        });
    };
    var ColorController = /*#__PURE__*/ function() {
        function ColorController(doc, config) {
            var _this = this;
            _helpers.classCallCheck(this, ColorController);
            this.onButtonBlur_ = this.onButtonBlur_.bind(this);
            this.onButtonClick_ = this.onButtonClick_.bind(this);
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = Foldable.create(config.expanded);
            this.swatchC_ = new ColorSwatchController(doc, {
                value: this.value,
                viewProps: this.viewProps
            });
            var buttonElem = this.swatchC_.view.buttonElement;
            buttonElem.addEventListener('blur', this.onButtonBlur_);
            buttonElem.addEventListener('click', this.onButtonClick_);
            this.textC_ = new TextController(doc, {
                parser: config.parser,
                props: ValueMap.fromObject({
                    formatter: config.formatter
                }),
                value: this.value,
                viewProps: this.viewProps
            });
            this.view = new ColorView(doc, {
                foldable: this.foldable_,
                pickerLayout: config.pickerLayout
            });
            this.view.swatchElement.appendChild(this.swatchC_.view.element);
            this.view.textElement.appendChild(this.textC_.view.element);
            this.popC_ = config.pickerLayout === 'popup' ? new PopupController(doc, {
                viewProps: this.viewProps
            }) : null;
            var pickerC = new ColorPickerController(doc, {
                supportsAlpha: config.supportsAlpha,
                value: this.value,
                viewProps: this.viewProps
            });
            pickerC.view.allFocusableElements.forEach(function(elem) {
                elem.addEventListener('blur', _this.onPopupChildBlur_);
                elem.addEventListener('keydown', _this.onPopupChildKeydown_);
            });
            this.pickerC_ = pickerC;
            if (this.popC_) {
                this.view.element.appendChild(this.popC_.view.element);
                this.popC_.view.element.appendChild(pickerC.view.element);
                connectValues({
                    primary: this.foldable_.value('expanded'),
                    secondary: this.popC_.shows,
                    forward: function(p) {
                        return p.rawValue;
                    },
                    backward: function(_, s) {
                        return s.rawValue;
                    }
                });
            } else if (this.view.pickerElement) {
                this.view.pickerElement.appendChild(this.pickerC_.view.element);
                bindFoldable(this.foldable_, this.view.pickerElement);
            }
        }
        _helpers.createClass(ColorController, [
            {
                key: "textController",
                get: function get() {
                    return this.textC_;
                }
            },
            {
                key: "onButtonBlur_",
                value: function onButtonBlur_(e) {
                    if (!this.popC_) return;
                    var elem = this.view.element;
                    var nextTarget = forceCast(e.relatedTarget);
                    if (!nextTarget || !elem.contains(nextTarget)) this.popC_.shows.rawValue = false;
                }
            },
            {
                key: "onButtonClick_",
                value: function onButtonClick_() {
                    this.foldable_.set('expanded', !this.foldable_.get('expanded'));
                    if (this.foldable_.get('expanded')) this.pickerC_.view.allFocusableElements[0].focus();
                }
            },
            {
                key: "onPopupChildBlur_",
                value: function onPopupChildBlur_(ev) {
                    if (!this.popC_) return;
                    var elem = this.popC_.view.element;
                    var nextTarget = findNextTarget(ev);
                    if (nextTarget && elem.contains(nextTarget)) return;
                    if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !supportsTouch(elem.ownerDocument)) return;
                    this.popC_.shows.rawValue = false;
                }
            },
            {
                key: "onPopupChildKeydown_",
                value: function onPopupChildKeydown_(ev) {
                    if (this.popC_) {
                        if (ev.key === 'Escape') this.popC_.shows.rawValue = false;
                    } else if (this.view.pickerElement) {
                        if (ev.key === 'Escape') this.swatchC_.view.buttonElement.focus();
                    }
                }
            }
        ]);
        return ColorController;
    }();
    function colorFromObject(value) {
        if (Color.isColorObject(value)) return Color.fromObject(value);
        return Color.black();
    }
    function colorToRgbNumber(value) {
        return removeAlphaComponent(value.getComponents('rgb')).reduce(function(result, comp) {
            return result << 8 | Math.floor(comp) & 255;
        }, 0);
    }
    function colorToRgbaNumber(value) {
        return value.getComponents('rgb').reduce(function(result, comp, index) {
            var hex = Math.floor(index === 3 ? comp * 255 : comp) & 255;
            return result << 8 | hex;
        }, 0) >>> 0;
    }
    function numberToRgbColor(num) {
        return new Color([
            num >> 16 & 255,
            num >> 8 & 255,
            num & 255
        ], 'rgb');
    }
    function numberToRgbaColor(num) {
        return new Color([
            num >> 24 & 255,
            num >> 16 & 255,
            num >> 8 & 255,
            mapRange(num & 255, 0, 255, 0, 1), 
        ], 'rgb');
    }
    function colorFromRgbNumber(value) {
        if (typeof value !== 'number') return Color.black();
        return numberToRgbColor(value);
    }
    function colorFromRgbaNumber(value) {
        if (typeof value !== 'number') return Color.black();
        return numberToRgbaColor(value);
    }
    function createColorStringWriter(notation) {
        var stringify = getColorStringifier(notation);
        return function(target, value) {
            writePrimitive(target, stringify(value));
        };
    }
    function createColorNumberWriter(supportsAlpha) {
        var colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
        return function(target, value) {
            writePrimitive(target, colorToNumber(value));
        };
    }
    function writeRgbaColorObject(target, value) {
        var obj = value.toRgbaObject();
        target.writeProperty('r', obj.r);
        target.writeProperty('g', obj.g);
        target.writeProperty('b', obj.b);
        target.writeProperty('a', obj.a);
    }
    function writeRgbColorObject(target, value) {
        var obj = value.toRgbaObject();
        target.writeProperty('r', obj.r);
        target.writeProperty('g', obj.g);
        target.writeProperty('b', obj.b);
    }
    function createColorObjectWriter(supportsAlpha) {
        return supportsAlpha ? writeRgbaColorObject : writeRgbColorObject;
    }
    function shouldSupportAlpha$1(inputParams) {
        return 'alpha' in inputParams && inputParams.alpha === true;
    }
    function createFormatter$1(supportsAlpha) {
        return supportsAlpha ? function(v) {
            return colorToHexRgbaString(v, '0x');
        } : function(v) {
            return colorToHexRgbString(v, '0x');
        };
    }
    var NumberColorInputPlugin = {
        id: 'input-color-number',
        type: 'input',
        accept: function(value, params) {
            if (typeof value !== 'number') return null;
            if (!('view' in params)) return null;
            if (params.view !== 'color') return null;
            var result = parseColorInputParams(params);
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(args) {
                return shouldSupportAlpha$1(args.params) ? colorFromRgbaNumber : colorFromRgbNumber;
            },
            equals: Color.equals,
            writer: function(args) {
                return createColorNumberWriter(shouldSupportAlpha$1(args.params));
            }
        },
        controller: function(args) {
            var supportsAlpha = shouldSupportAlpha$1(args.params);
            var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            var picker = 'picker' in args.params ? args.params.picker : undefined;
            return new ColorController(args.document, {
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                formatter: createFormatter$1(supportsAlpha),
                parser: CompositeColorParser,
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                supportsAlpha: supportsAlpha,
                value: args.value,
                viewProps: args.viewProps
            });
        }
    };
    function shouldSupportAlpha(initialValue) {
        return Color.isRgbaColorObject(initialValue);
    }
    var ObjectColorInputPlugin = {
        id: 'input-color-object',
        type: 'input',
        accept: function(value, params) {
            if (!Color.isColorObject(value)) return null;
            var result = parseColorInputParams(params);
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return colorFromObject;
            },
            equals: Color.equals,
            writer: function(args) {
                return createColorObjectWriter(shouldSupportAlpha(args.initialValue));
            }
        },
        controller: function(args) {
            var supportsAlpha = Color.isRgbaColorObject(args.initialValue);
            var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            var picker = 'picker' in args.params ? args.params.picker : undefined;
            var formatter = supportsAlpha ? colorToHexRgbaString : colorToHexRgbString;
            return new ColorController(args.document, {
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                formatter: formatter,
                parser: CompositeColorParser,
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                supportsAlpha: supportsAlpha,
                value: args.value,
                viewProps: args.viewProps
            });
        }
    };
    var StringColorInputPlugin = {
        id: 'input-color-string',
        type: 'input',
        accept: function(value, params) {
            if (typeof value !== 'string') return null;
            if ('view' in params && params.view === 'text') return null;
            var notation = getColorNotation(value);
            if (!notation) return null;
            var result = parseColorInputParams(params);
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return colorFromString;
            },
            equals: Color.equals,
            writer: function(args) {
                var notation = getColorNotation(args.initialValue);
                if (!notation) throw TpError.shouldNeverHappen();
                return createColorStringWriter(notation);
            }
        },
        controller: function(args) {
            var notation = getColorNotation(args.initialValue);
            if (!notation) throw TpError.shouldNeverHappen();
            var stringifier = getColorStringifier(notation);
            var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            var picker = 'picker' in args.params ? args.params.picker : undefined;
            return new ColorController(args.document, {
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                formatter: stringifier,
                parser: CompositeColorParser,
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                supportsAlpha: hasAlphaComponent(notation),
                value: args.value,
                viewProps: args.viewProps
            });
        }
    };
    var PointNdConstraint = /*#__PURE__*/ function() {
        function PointNdConstraint(config) {
            _helpers.classCallCheck(this, PointNdConstraint);
            this.components = config.components;
            this.asm_ = config.assembly;
        }
        _helpers.createClass(PointNdConstraint, [
            {
                key: "constrain",
                value: function constrain(value) {
                    var _this = this;
                    var comps = this.asm_.toComponents(value).map(function(comp, index) {
                        var _a, _b;
                        return (_b = (_a = _this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
                    });
                    return this.asm_.fromComponents(comps);
                }
            }
        ]);
        return PointNdConstraint;
    }();
    var className$5 = ClassName('pndtxt');
    var PointNdTextView = function PointNdTextView(doc, config) {
        var _this = this;
        _helpers.classCallCheck(this, PointNdTextView);
        this.textViews = config.textViews;
        this.element = doc.createElement('div');
        this.element.classList.add(className$5());
        this.textViews.forEach(function(v) {
            var axisElem = doc.createElement('div');
            axisElem.classList.add(className$5('a'));
            axisElem.appendChild(v.element);
            _this.element.appendChild(axisElem);
        });
    };
    function createAxisController(doc, config, index) {
        return new NumberTextController(doc, {
            arrayPosition: index === 0 ? 'fst' : index === config.axes.length - 1 ? 'lst' : 'mid',
            baseStep: config.axes[index].baseStep,
            parser: config.parser,
            props: config.axes[index].textProps,
            value: createValue(0, {
                constraint: config.axes[index].constraint
            }),
            viewProps: config.viewProps
        });
    }
    var PointNdTextController = function PointNdTextController(doc, config) {
        var _this = this;
        _helpers.classCallCheck(this, PointNdTextController);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.acs_ = config.axes.map(function(_, index) {
            return createAxisController(doc, config, index);
        });
        this.acs_.forEach(function(c, index) {
            connectValues({
                primary: _this.value,
                secondary: c.value,
                forward: function(p) {
                    return config.assembly.toComponents(p.rawValue)[index];
                },
                backward: function(p, s) {
                    var comps = config.assembly.toComponents(p.rawValue);
                    comps[index] = s.rawValue;
                    return config.assembly.fromComponents(comps);
                }
            });
        });
        this.view = new PointNdTextView(doc, {
            textViews: this.acs_.map(function(ac) {
                return ac.view;
            })
        });
    };
    function createStepConstraint(params) {
        if ('step' in params && !isEmpty(params.step)) return new StepConstraint(params.step);
        return null;
    }
    function createRangeConstraint(params) {
        if ('max' in params && !isEmpty(params.max) || 'min' in params && !isEmpty(params.min)) return new RangeConstraint({
            max: params.max,
            min: params.min
        });
        return null;
    }
    function createConstraint$4(params) {
        var constraints = [];
        var sc = createStepConstraint(params);
        if (sc) constraints.push(sc);
        var rc = createRangeConstraint(params);
        if (rc) constraints.push(rc);
        var lc = createListConstraint(params.options);
        if (lc) constraints.push(lc);
        return new CompositeConstraint(constraints);
    }
    function findRange(constraint) {
        var c = constraint ? findConstraint(constraint, RangeConstraint) : null;
        if (!c) return [
            undefined,
            undefined
        ];
        return [
            c.minValue,
            c.maxValue
        ];
    }
    function estimateSuitableRange(constraint) {
        var ref = _helpers.slicedToArray(findRange(constraint), 2), min = ref[0], max = ref[1];
        return [
            min !== null && min !== void 0 ? min : 0,
            max !== null && max !== void 0 ? max : 100
        ];
    }
    var NumberInputPlugin = {
        id: 'input-number',
        type: 'input',
        accept: function(value, params) {
            if (typeof value !== 'number') return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                format: p.optional.function,
                max: p.optional.number,
                min: p.optional.number,
                options: p.optional.custom(parseListOptions),
                step: p.optional.number
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return numberFromUnknown;
            },
            constraint: function(args) {
                return createConstraint$4(args.params);
            },
            writer: function(_args) {
                return writePrimitive;
            }
        },
        controller: function(args) {
            var _a, _b;
            var value = args.value;
            var c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) return new ListController(args.document, {
                props: ValueMap.fromObject({
                    options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value: value,
                viewProps: args.viewProps
            });
            var formatter = (_b = 'format' in args.params ? args.params.format : undefined) !== null && _b !== void 0 ? _b : createNumberFormatter(getSuitableDecimalDigits(c, value.rawValue));
            if (c && findConstraint(c, RangeConstraint)) {
                var ref = _helpers.slicedToArray(estimateSuitableRange(c), 2), min = ref[0], max = ref[1];
                return new SliderTextController(args.document, {
                    baseStep: getBaseStep(c),
                    parser: parseNumber,
                    sliderProps: ValueMap.fromObject({
                        maxValue: max,
                        minValue: min
                    }),
                    textProps: ValueMap.fromObject({
                        draggingScale: getSuitableDraggingScale(c, value.rawValue),
                        formatter: formatter
                    }),
                    value: value,
                    viewProps: args.viewProps
                });
            }
            return new NumberTextController(args.document, {
                baseStep: getBaseStep(c),
                parser: parseNumber,
                props: ValueMap.fromObject({
                    draggingScale: getSuitableDraggingScale(c, value.rawValue),
                    formatter: formatter
                }),
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    var Point2d = /*#__PURE__*/ function() {
        function Point2d() {
            var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            _helpers.classCallCheck(this, Point2d);
            this.x = x;
            this.y = y;
        }
        _helpers.createClass(Point2d, [
            {
                key: "getComponents",
                value: function getComponents() {
                    return [
                        this.x,
                        this.y
                    ];
                }
            },
            {
                key: "toObject",
                value: function toObject() {
                    return {
                        x: this.x,
                        y: this.y
                    };
                }
            }
        ], [
            {
                key: "isObject",
                value: function isObject(obj) {
                    if (isEmpty(obj)) return false;
                    var x = obj.x;
                    var y = obj.y;
                    if (typeof x !== 'number' || typeof y !== 'number') return false;
                    return true;
                }
            },
            {
                key: "equals",
                value: function equals(v1, v2) {
                    return v1.x === v2.x && v1.y === v2.y;
                }
            }
        ]);
        return Point2d;
    }();
    var Point2dAssembly = {
        toComponents: function(p) {
            return p.getComponents();
        },
        fromComponents: function(comps) {
            return _helpers.construct(Point2d, _helpers.toConsumableArray(comps));
        }
    };
    var className$4 = ClassName('p2d');
    var Point2dView = function Point2dView(doc, config) {
        _helpers.classCallCheck(this, Point2dView);
        this.element = doc.createElement('div');
        this.element.classList.add(className$4());
        config.viewProps.bindClassModifiers(this.element);
        bindValue(config.expanded, valueToClassName(this.element, className$4(undefined, 'expanded')));
        var headElem = doc.createElement('div');
        headElem.classList.add(className$4('h'));
        this.element.appendChild(headElem);
        var buttonElem = doc.createElement('button');
        buttonElem.classList.add(className$4('b'));
        buttonElem.appendChild(createSvgIconElement(doc, 'p2dpad'));
        config.viewProps.bindDisabled(buttonElem);
        headElem.appendChild(buttonElem);
        this.buttonElement = buttonElem;
        var textElem = doc.createElement('div');
        textElem.classList.add(className$4('t'));
        headElem.appendChild(textElem);
        this.textElement = textElem;
        if (config.pickerLayout === 'inline') {
            var pickerElem = doc.createElement('div');
            pickerElem.classList.add(className$4('p'));
            this.element.appendChild(pickerElem);
            this.pickerElement = pickerElem;
        } else this.pickerElement = null;
    };
    var className$3 = ClassName('p2dp');
    var Point2dPickerView = /*#__PURE__*/ function() {
        function Point2dPickerView(doc, config) {
            _helpers.classCallCheck(this, Point2dPickerView);
            this.onFoldableChange_ = this.onFoldableChange_.bind(this);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.invertsY_ = config.invertsY;
            this.maxValue_ = config.maxValue;
            this.element = doc.createElement('div');
            this.element.classList.add(className$3());
            if (config.layout === 'popup') this.element.classList.add(className$3(undefined, 'p'));
            var padElem = doc.createElement('div');
            padElem.classList.add(className$3('p'));
            config.viewProps.bindTabIndex(padElem);
            this.element.appendChild(padElem);
            this.padElement = padElem;
            var svgElem = doc.createElementNS(SVG_NS, 'svg');
            svgElem.classList.add(className$3('g'));
            this.padElement.appendChild(svgElem);
            this.svgElem_ = svgElem;
            var xAxisElem = doc.createElementNS(SVG_NS, 'line');
            xAxisElem.classList.add(className$3('ax'));
            xAxisElem.setAttributeNS(null, 'x1', '0');
            xAxisElem.setAttributeNS(null, 'y1', '50%');
            xAxisElem.setAttributeNS(null, 'x2', '100%');
            xAxisElem.setAttributeNS(null, 'y2', '50%');
            this.svgElem_.appendChild(xAxisElem);
            var yAxisElem = doc.createElementNS(SVG_NS, 'line');
            yAxisElem.classList.add(className$3('ax'));
            yAxisElem.setAttributeNS(null, 'x1', '50%');
            yAxisElem.setAttributeNS(null, 'y1', '0');
            yAxisElem.setAttributeNS(null, 'x2', '50%');
            yAxisElem.setAttributeNS(null, 'y2', '100%');
            this.svgElem_.appendChild(yAxisElem);
            var lineElem = doc.createElementNS(SVG_NS, 'line');
            lineElem.classList.add(className$3('l'));
            lineElem.setAttributeNS(null, 'x1', '50%');
            lineElem.setAttributeNS(null, 'y1', '50%');
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            var markerElem = doc.createElement('div');
            markerElem.classList.add(className$3('m'));
            this.padElement.appendChild(markerElem);
            this.markerElem_ = markerElem;
            config.value.emitter.on('change', this.onValueChange_);
            this.value = config.value;
            this.update_();
        }
        _helpers.createClass(Point2dPickerView, [
            {
                key: "allFocusableElements",
                get: function get() {
                    return [
                        this.padElement
                    ];
                }
            },
            {
                key: "update_",
                value: function update_() {
                    var ref = _helpers.slicedToArray(this.value.rawValue.getComponents(), 2), x = ref[0], y = ref[1];
                    var max = this.maxValue_;
                    var px = mapRange(x, -max, +max, 0, 100);
                    var py = mapRange(y, -max, +max, 0, 100);
                    var ipy = this.invertsY_ ? 100 - py : py;
                    this.lineElem_.setAttributeNS(null, 'x2', "".concat(px, "%"));
                    this.lineElem_.setAttributeNS(null, 'y2', "".concat(ipy, "%"));
                    this.markerElem_.style.left = "".concat(px, "%");
                    this.markerElem_.style.top = "".concat(ipy, "%");
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_() {
                    this.update_();
                }
            },
            {
                key: "onFoldableChange_",
                value: function onFoldableChange_() {
                    this.update_();
                }
            }
        ]);
        return Point2dPickerView;
    }();
    function computeOffset(ev, baseSteps, invertsY) {
        return [
            getStepForKey(baseSteps[0], getHorizontalStepKeys(ev)),
            getStepForKey(baseSteps[1], getVerticalStepKeys(ev)) * (invertsY ? 1 : -1), 
        ];
    }
    var Point2dPickerController = /*#__PURE__*/ function() {
        function Point2dPickerController(doc, config) {
            _helpers.classCallCheck(this, Point2dPickerController);
            this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
            this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.baseSteps_ = config.baseSteps;
            this.maxValue_ = config.maxValue;
            this.invertsY_ = config.invertsY;
            this.view = new Point2dPickerView(doc, {
                invertsY: this.invertsY_,
                layout: config.layout,
                maxValue: this.maxValue_,
                value: this.value,
                viewProps: this.viewProps
            });
            this.ptHandler_ = new PointerHandler(this.view.padElement);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.padElement.addEventListener('keydown', this.onPadKeyDown_);
            this.view.padElement.addEventListener('keyup', this.onPadKeyUp_);
        }
        _helpers.createClass(Point2dPickerController, [
            {
                key: "handlePointerEvent_",
                value: function handlePointerEvent_(d, opts) {
                    if (!d.point) return;
                    var max = this.maxValue_;
                    var px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
                    var py = mapRange(this.invertsY_ ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
                    this.value.setRawValue(new Point2d(px, py), opts);
                }
            },
            {
                key: "onPointerDown_",
                value: function onPointerDown_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerMove_",
                value: function onPointerMove_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPointerUp_",
                value: function onPointerUp_(ev) {
                    this.handlePointerEvent_(ev.data, {
                        forceEmit: true,
                        last: true
                    });
                }
            },
            {
                key: "onPadKeyDown_",
                value: function onPadKeyDown_(ev) {
                    if (isArrowKey(ev.key)) ev.preventDefault();
                    var ref = _helpers.slicedToArray(computeOffset(ev, this.baseSteps_, this.invertsY_), 2), dx = ref[0], dy = ref[1];
                    if (dx === 0 && dy === 0) return;
                    this.value.setRawValue(new Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
                        forceEmit: false,
                        last: false
                    });
                }
            },
            {
                key: "onPadKeyUp_",
                value: function onPadKeyUp_(ev) {
                    var ref = _helpers.slicedToArray(computeOffset(ev, this.baseSteps_, this.invertsY_), 2), dx = ref[0], dy = ref[1];
                    if (dx === 0 && dy === 0) return;
                    this.value.setRawValue(this.value.rawValue, {
                        forceEmit: true,
                        last: true
                    });
                }
            }
        ]);
        return Point2dPickerController;
    }();
    var Point2dController = /*#__PURE__*/ function() {
        function Point2dController(doc, config) {
            var _this = this;
            _helpers.classCallCheck(this, Point2dController);
            var _a, _b;
            this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
            this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
            this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
            this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.foldable_ = Foldable.create(config.expanded);
            this.popC_ = config.pickerLayout === 'popup' ? new PopupController(doc, {
                viewProps: this.viewProps
            }) : null;
            var padC = new Point2dPickerController(doc, {
                baseSteps: [
                    config.axes[0].baseStep,
                    config.axes[1].baseStep
                ],
                invertsY: config.invertsY,
                layout: config.pickerLayout,
                maxValue: config.maxValue,
                value: this.value,
                viewProps: this.viewProps
            });
            padC.view.allFocusableElements.forEach(function(elem) {
                elem.addEventListener('blur', _this.onPopupChildBlur_);
                elem.addEventListener('keydown', _this.onPopupChildKeydown_);
            });
            this.pickerC_ = padC;
            this.textC_ = new PointNdTextController(doc, {
                assembly: Point2dAssembly,
                axes: config.axes,
                parser: config.parser,
                value: this.value,
                viewProps: this.viewProps
            });
            this.view = new Point2dView(doc, {
                expanded: this.foldable_.value('expanded'),
                pickerLayout: config.pickerLayout,
                viewProps: this.viewProps
            });
            this.view.textElement.appendChild(this.textC_.view.element);
            (_a = this.view.buttonElement) === null || _a === void 0 || _a.addEventListener('blur', this.onPadButtonBlur_);
            (_b = this.view.buttonElement) === null || _b === void 0 || _b.addEventListener('click', this.onPadButtonClick_);
            if (this.popC_) {
                this.view.element.appendChild(this.popC_.view.element);
                this.popC_.view.element.appendChild(this.pickerC_.view.element);
                connectValues({
                    primary: this.foldable_.value('expanded'),
                    secondary: this.popC_.shows,
                    forward: function(p) {
                        return p.rawValue;
                    },
                    backward: function(_, s) {
                        return s.rawValue;
                    }
                });
            } else if (this.view.pickerElement) {
                this.view.pickerElement.appendChild(this.pickerC_.view.element);
                bindFoldable(this.foldable_, this.view.pickerElement);
            }
        }
        _helpers.createClass(Point2dController, [
            {
                key: "onPadButtonBlur_",
                value: function onPadButtonBlur_(e) {
                    if (!this.popC_) return;
                    var elem = this.view.element;
                    var nextTarget = forceCast(e.relatedTarget);
                    if (!nextTarget || !elem.contains(nextTarget)) this.popC_.shows.rawValue = false;
                }
            },
            {
                key: "onPadButtonClick_",
                value: function onPadButtonClick_() {
                    this.foldable_.set('expanded', !this.foldable_.get('expanded'));
                    if (this.foldable_.get('expanded')) this.pickerC_.view.allFocusableElements[0].focus();
                }
            },
            {
                key: "onPopupChildBlur_",
                value: function onPopupChildBlur_(ev) {
                    if (!this.popC_) return;
                    var elem = this.popC_.view.element;
                    var nextTarget = findNextTarget(ev);
                    if (nextTarget && elem.contains(nextTarget)) return;
                    if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) return;
                    this.popC_.shows.rawValue = false;
                }
            },
            {
                key: "onPopupChildKeydown_",
                value: function onPopupChildKeydown_(ev) {
                    if (this.popC_) {
                        if (ev.key === 'Escape') this.popC_.shows.rawValue = false;
                    } else if (this.view.pickerElement) {
                        if (ev.key === 'Escape') this.view.buttonElement.focus();
                    }
                }
            }
        ]);
        return Point2dController;
    }();
    function point2dFromUnknown(value) {
        return Point2d.isObject(value) ? new Point2d(value.x, value.y) : new Point2d();
    }
    function writePoint2d(target, value) {
        target.writeProperty('x', value.x);
        target.writeProperty('y', value.y);
    }
    function createDimensionConstraint$2(params) {
        if (!params) return undefined;
        var constraints = [];
        if (!isEmpty(params.step)) constraints.push(new StepConstraint(params.step));
        if (!isEmpty(params.max) || !isEmpty(params.min)) constraints.push(new RangeConstraint({
            max: params.max,
            min: params.min
        }));
        return new CompositeConstraint(constraints);
    }
    function createConstraint$3(params) {
        return new PointNdConstraint({
            assembly: Point2dAssembly,
            components: [
                createDimensionConstraint$2('x' in params ? params.x : undefined),
                createDimensionConstraint$2('y' in params ? params.y : undefined), 
            ]
        });
    }
    function getSuitableMaxDimensionValue(constraint, rawValue) {
        var rc = constraint && findConstraint(constraint, RangeConstraint);
        if (rc) return Math.max(Math.abs(rc.minValue || 0), Math.abs(rc.maxValue || 0));
        var step = getBaseStep(constraint);
        return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
    }
    function getSuitableMaxValue(initialValue, constraint) {
        var xc = constraint instanceof PointNdConstraint ? constraint.components[0] : undefined;
        var yc = constraint instanceof PointNdConstraint ? constraint.components[1] : undefined;
        var xr = getSuitableMaxDimensionValue(xc, initialValue.x);
        var yr = getSuitableMaxDimensionValue(yc, initialValue.y);
        return Math.max(xr, yr);
    }
    function createAxis$2(initialValue, constraint) {
        return {
            baseStep: getBaseStep(constraint),
            constraint: constraint,
            textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(constraint, initialValue),
                formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
            })
        };
    }
    function shouldInvertY(params) {
        if (!('y' in params)) return false;
        var yParams = params.y;
        if (!yParams) return false;
        return 'inverted' in yParams ? !!yParams.inverted : false;
    }
    var Point2dInputPlugin = {
        id: 'input-point2d',
        type: 'input',
        accept: function(value, params) {
            if (!Point2d.isObject(value)) return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                expanded: p.optional.boolean,
                picker: p.optional.custom(parsePickerLayout),
                x: p.optional.custom(parsePointDimensionParams),
                y: p.optional.object({
                    inverted: p.optional.boolean,
                    max: p.optional.number,
                    min: p.optional.number,
                    step: p.optional.number
                })
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return point2dFromUnknown;
            },
            constraint: function(args) {
                return createConstraint$3(args.params);
            },
            equals: Point2d.equals,
            writer: function(_args) {
                return writePoint2d;
            }
        },
        controller: function(args) {
            var doc = args.document;
            var value = args.value;
            var c = args.constraint;
            if (!(c instanceof PointNdConstraint)) throw TpError.shouldNeverHappen();
            var expanded = 'expanded' in args.params ? args.params.expanded : undefined;
            var picker = 'picker' in args.params ? args.params.picker : undefined;
            return new Point2dController(doc, {
                axes: [
                    createAxis$2(value.rawValue.x, c.components[0]),
                    createAxis$2(value.rawValue.y, c.components[1]), 
                ],
                expanded: expanded !== null && expanded !== void 0 ? expanded : false,
                invertsY: shouldInvertY(args.params),
                maxValue: getSuitableMaxValue(value.rawValue, c),
                parser: parseNumber,
                pickerLayout: picker !== null && picker !== void 0 ? picker : 'popup',
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    var Point3d = /*#__PURE__*/ function() {
        function Point3d() {
            var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
            _helpers.classCallCheck(this, Point3d);
            this.x = x;
            this.y = y;
            this.z = z;
        }
        _helpers.createClass(Point3d, [
            {
                key: "getComponents",
                value: function getComponents() {
                    return [
                        this.x,
                        this.y,
                        this.z
                    ];
                }
            },
            {
                key: "toObject",
                value: function toObject() {
                    return {
                        x: this.x,
                        y: this.y,
                        z: this.z
                    };
                }
            }
        ], [
            {
                key: "isObject",
                value: function isObject(obj) {
                    if (isEmpty(obj)) return false;
                    var x = obj.x;
                    var y = obj.y;
                    var z = obj.z;
                    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') return false;
                    return true;
                }
            },
            {
                key: "equals",
                value: function equals(v1, v2) {
                    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
                }
            }
        ]);
        return Point3d;
    }();
    var Point3dAssembly = {
        toComponents: function(p) {
            return p.getComponents();
        },
        fromComponents: function(comps) {
            return _helpers.construct(Point3d, _helpers.toConsumableArray(comps));
        }
    };
    function point3dFromUnknown(value) {
        return Point3d.isObject(value) ? new Point3d(value.x, value.y, value.z) : new Point3d();
    }
    function writePoint3d(target, value) {
        target.writeProperty('x', value.x);
        target.writeProperty('y', value.y);
        target.writeProperty('z', value.z);
    }
    function createDimensionConstraint$1(params) {
        if (!params) return undefined;
        var constraints = [];
        if (!isEmpty(params.step)) constraints.push(new StepConstraint(params.step));
        if (!isEmpty(params.max) || !isEmpty(params.min)) constraints.push(new RangeConstraint({
            max: params.max,
            min: params.min
        }));
        return new CompositeConstraint(constraints);
    }
    function createConstraint$2(params) {
        return new PointNdConstraint({
            assembly: Point3dAssembly,
            components: [
                createDimensionConstraint$1('x' in params ? params.x : undefined),
                createDimensionConstraint$1('y' in params ? params.y : undefined),
                createDimensionConstraint$1('z' in params ? params.z : undefined), 
            ]
        });
    }
    function createAxis$1(initialValue, constraint) {
        return {
            baseStep: getBaseStep(constraint),
            constraint: constraint,
            textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(constraint, initialValue),
                formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
            })
        };
    }
    var Point3dInputPlugin = {
        id: 'input-point3d',
        type: 'input',
        accept: function(value, params) {
            if (!Point3d.isObject(value)) return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                x: p.optional.custom(parsePointDimensionParams),
                y: p.optional.custom(parsePointDimensionParams),
                z: p.optional.custom(parsePointDimensionParams)
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return point3dFromUnknown;
            },
            constraint: function(args) {
                return createConstraint$2(args.params);
            },
            equals: Point3d.equals,
            writer: function(_args) {
                return writePoint3d;
            }
        },
        controller: function(args) {
            var value = args.value;
            var c = args.constraint;
            if (!(c instanceof PointNdConstraint)) throw TpError.shouldNeverHappen();
            return new PointNdTextController(args.document, {
                assembly: Point3dAssembly,
                axes: [
                    createAxis$1(value.rawValue.x, c.components[0]),
                    createAxis$1(value.rawValue.y, c.components[1]),
                    createAxis$1(value.rawValue.z, c.components[2]), 
                ],
                parser: parseNumber,
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    var Point4d = /*#__PURE__*/ function() {
        function Point4d() {
            var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, w = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
            _helpers.classCallCheck(this, Point4d);
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        _helpers.createClass(Point4d, [
            {
                key: "getComponents",
                value: function getComponents() {
                    return [
                        this.x,
                        this.y,
                        this.z,
                        this.w
                    ];
                }
            },
            {
                key: "toObject",
                value: function toObject() {
                    return {
                        x: this.x,
                        y: this.y,
                        z: this.z,
                        w: this.w
                    };
                }
            }
        ], [
            {
                key: "isObject",
                value: function isObject(obj) {
                    if (isEmpty(obj)) return false;
                    var x = obj.x;
                    var y = obj.y;
                    var z = obj.z;
                    var w = obj.w;
                    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof w !== 'number') return false;
                    return true;
                }
            },
            {
                key: "equals",
                value: function equals(v1, v2) {
                    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
                }
            }
        ]);
        return Point4d;
    }();
    var Point4dAssembly = {
        toComponents: function(p) {
            return p.getComponents();
        },
        fromComponents: function(comps) {
            return _helpers.construct(Point4d, _helpers.toConsumableArray(comps));
        }
    };
    function point4dFromUnknown(value) {
        return Point4d.isObject(value) ? new Point4d(value.x, value.y, value.z, value.w) : new Point4d();
    }
    function writePoint4d(target, value) {
        target.writeProperty('x', value.x);
        target.writeProperty('y', value.y);
        target.writeProperty('z', value.z);
        target.writeProperty('w', value.w);
    }
    function createDimensionConstraint(params) {
        if (!params) return undefined;
        var constraints = [];
        if (!isEmpty(params.step)) constraints.push(new StepConstraint(params.step));
        if (!isEmpty(params.max) || !isEmpty(params.min)) constraints.push(new RangeConstraint({
            max: params.max,
            min: params.min
        }));
        return new CompositeConstraint(constraints);
    }
    function createConstraint$1(params) {
        return new PointNdConstraint({
            assembly: Point4dAssembly,
            components: [
                createDimensionConstraint('x' in params ? params.x : undefined),
                createDimensionConstraint('y' in params ? params.y : undefined),
                createDimensionConstraint('z' in params ? params.z : undefined),
                createDimensionConstraint('w' in params ? params.w : undefined), 
            ]
        });
    }
    function createAxis(initialValue, constraint) {
        return {
            baseStep: getBaseStep(constraint),
            constraint: constraint,
            textProps: ValueMap.fromObject({
                draggingScale: getSuitableDraggingScale(constraint, initialValue),
                formatter: createNumberFormatter(getSuitableDecimalDigits(constraint, initialValue))
            })
        };
    }
    var Point4dInputPlugin = {
        id: 'input-point4d',
        type: 'input',
        accept: function(value, params) {
            if (!Point4d.isObject(value)) return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                x: p.optional.custom(parsePointDimensionParams),
                y: p.optional.custom(parsePointDimensionParams),
                z: p.optional.custom(parsePointDimensionParams),
                w: p.optional.custom(parsePointDimensionParams)
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return point4dFromUnknown;
            },
            constraint: function(args) {
                return createConstraint$1(args.params);
            },
            equals: Point4d.equals,
            writer: function(_args) {
                return writePoint4d;
            }
        },
        controller: function(args) {
            var value = args.value;
            var c = args.constraint;
            if (!(c instanceof PointNdConstraint)) throw TpError.shouldNeverHappen();
            return new PointNdTextController(args.document, {
                assembly: Point4dAssembly,
                axes: value.rawValue.getComponents().map(function(comp, index) {
                    return createAxis(comp, c.components[index]);
                }),
                parser: parseNumber,
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    function createConstraint(params) {
        var constraints = [];
        var lc = createListConstraint(params.options);
        if (lc) constraints.push(lc);
        return new CompositeConstraint(constraints);
    }
    var StringInputPlugin = {
        id: 'input-string',
        type: 'input',
        accept: function(value, params) {
            if (typeof value !== 'string') return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                options: p.optional.custom(parseListOptions)
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return stringFromUnknown;
            },
            constraint: function(args) {
                return createConstraint(args.params);
            },
            writer: function(_args) {
                return writePrimitive;
            }
        },
        controller: function(args) {
            var _a;
            var doc = args.document;
            var value = args.value;
            var c = args.constraint;
            if (c && findConstraint(c, ListConstraint)) return new ListController(doc, {
                props: ValueMap.fromObject({
                    options: (_a = findListItems(c)) !== null && _a !== void 0 ? _a : []
                }),
                value: value,
                viewProps: args.viewProps
            });
            return new TextController(doc, {
                parser: function(v) {
                    return v;
                },
                props: ValueMap.fromObject({
                    formatter: formatString
                }),
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    var Constants = {
        monitor: {
            defaultInterval: 200,
            defaultLineCount: 3
        }
    };
    var className$2 = ClassName('mll');
    var MultiLogView = /*#__PURE__*/ function() {
        function MultiLogView(doc, config) {
            _helpers.classCallCheck(this, MultiLogView);
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement('div');
            this.element.classList.add(className$2());
            config.viewProps.bindClassModifiers(this.element);
            var textareaElem = doc.createElement('textarea');
            textareaElem.classList.add(className$2('i'));
            textareaElem.style.height = "calc(var(--bld-us) * ".concat(config.lineCount, ")");
            textareaElem.readOnly = true;
            config.viewProps.bindDisabled(textareaElem);
            this.element.appendChild(textareaElem);
            this.textareaElem_ = textareaElem;
            config.value.emitter.on('change', this.onValueUpdate_);
            this.value = config.value;
            this.update_();
        }
        _helpers.createClass(MultiLogView, [
            {
                key: "update_",
                value: function update_() {
                    var _this = this;
                    var elem = this.textareaElem_;
                    var shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
                    var lines = [];
                    this.value.rawValue.forEach(function(value) {
                        if (value !== undefined) lines.push(_this.formatter_(value));
                    });
                    elem.textContent = lines.join('\n');
                    if (shouldScroll) elem.scrollTop = elem.scrollHeight;
                }
            },
            {
                key: "onValueUpdate_",
                value: function onValueUpdate_() {
                    this.update_();
                }
            }
        ]);
        return MultiLogView;
    }();
    var MultiLogController = function MultiLogController(doc, config) {
        _helpers.classCallCheck(this, MultiLogController);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new MultiLogView(doc, {
            formatter: config.formatter,
            lineCount: config.lineCount,
            value: this.value,
            viewProps: this.viewProps
        });
    };
    var className$1 = ClassName('sgl');
    var SingleLogView = /*#__PURE__*/ function() {
        function SingleLogView(doc, config) {
            _helpers.classCallCheck(this, SingleLogView);
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.formatter_ = config.formatter;
            this.element = doc.createElement('div');
            this.element.classList.add(className$1());
            config.viewProps.bindClassModifiers(this.element);
            var inputElem = doc.createElement('input');
            inputElem.classList.add(className$1('i'));
            inputElem.readOnly = true;
            inputElem.type = 'text';
            config.viewProps.bindDisabled(inputElem);
            this.element.appendChild(inputElem);
            this.inputElement = inputElem;
            config.value.emitter.on('change', this.onValueUpdate_);
            this.value = config.value;
            this.update_();
        }
        _helpers.createClass(SingleLogView, [
            {
                key: "update_",
                value: function update_() {
                    var values = this.value.rawValue;
                    var lastValue = values[values.length - 1];
                    this.inputElement.value = lastValue !== undefined ? this.formatter_(lastValue) : '';
                }
            },
            {
                key: "onValueUpdate_",
                value: function onValueUpdate_() {
                    this.update_();
                }
            }
        ]);
        return SingleLogView;
    }();
    var SingleLogController = function SingleLogController(doc, config) {
        _helpers.classCallCheck(this, SingleLogController);
        this.value = config.value;
        this.viewProps = config.viewProps;
        this.view = new SingleLogView(doc, {
            formatter: config.formatter,
            value: this.value,
            viewProps: this.viewProps
        });
    };
    var BooleanMonitorPlugin = {
        id: 'monitor-bool',
        type: 'monitor',
        accept: function(value, params) {
            if (typeof value !== 'boolean') return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                lineCount: p.optional.number
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return boolFromUnknown;
            }
        },
        controller: function(args) {
            var _a;
            if (args.value.rawValue.length === 1) return new SingleLogController(args.document, {
                formatter: BooleanFormatter,
                value: args.value,
                viewProps: args.viewProps
            });
            return new MultiLogController(args.document, {
                formatter: BooleanFormatter,
                lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
                value: args.value,
                viewProps: args.viewProps
            });
        }
    };
    var GraphCursor = /*#__PURE__*/ function() {
        function GraphCursor() {
            _helpers.classCallCheck(this, GraphCursor);
            this.emitter = new Emitter();
            this.index_ = -1;
        }
        _helpers.createClass(GraphCursor, [
            {
                key: "index",
                get: function get() {
                    return this.index_;
                },
                set: function set(index) {
                    var changed = this.index_ !== index;
                    if (changed) {
                        this.index_ = index;
                        this.emitter.emit('change', {
                            index: index,
                            sender: this
                        });
                    }
                }
            }
        ]);
        return GraphCursor;
    }();
    var className1 = ClassName('grl');
    var GraphLogView = /*#__PURE__*/ function() {
        function GraphLogView(doc, config) {
            _helpers.classCallCheck(this, GraphLogView);
            this.onCursorChange_ = this.onCursorChange_.bind(this);
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.element = doc.createElement('div');
            this.element.classList.add(className1());
            config.viewProps.bindClassModifiers(this.element);
            this.formatter_ = config.formatter;
            this.minValue_ = config.minValue;
            this.maxValue_ = config.maxValue;
            this.cursor_ = config.cursor;
            this.cursor_.emitter.on('change', this.onCursorChange_);
            var svgElem = doc.createElementNS(SVG_NS, 'svg');
            svgElem.classList.add(className1('g'));
            svgElem.style.height = "calc(var(--bld-us) * ".concat(config.lineCount, ")");
            this.element.appendChild(svgElem);
            this.svgElem_ = svgElem;
            var lineElem = doc.createElementNS(SVG_NS, 'polyline');
            this.svgElem_.appendChild(lineElem);
            this.lineElem_ = lineElem;
            var tooltipElem = doc.createElement('div');
            tooltipElem.classList.add(className1('t'), ClassName('tt')());
            this.element.appendChild(tooltipElem);
            this.tooltipElem_ = tooltipElem;
            config.value.emitter.on('change', this.onValueUpdate_);
            this.value = config.value;
            this.update_();
        }
        _helpers.createClass(GraphLogView, [
            {
                key: "graphElement",
                get: function get() {
                    return this.svgElem_;
                }
            },
            {
                key: "update_",
                value: function update_() {
                    var bounds = this.svgElem_.getBoundingClientRect();
                    var maxIndex = this.value.rawValue.length - 1;
                    var min = this.minValue_;
                    var max = this.maxValue_;
                    var points = [];
                    this.value.rawValue.forEach(function(v, index) {
                        if (v === undefined) return;
                        var x = mapRange(index, 0, maxIndex, 0, bounds.width);
                        var y = mapRange(v, min, max, bounds.height, 0);
                        points.push([
                            x,
                            y
                        ].join(','));
                    });
                    this.lineElem_.setAttributeNS(null, 'points', points.join(' '));
                    var tooltipElem = this.tooltipElem_;
                    var value = this.value.rawValue[this.cursor_.index];
                    if (value === undefined) {
                        tooltipElem.classList.remove(className1('t', 'a'));
                        return;
                    }
                    var tx = mapRange(this.cursor_.index, 0, maxIndex, 0, bounds.width);
                    var ty = mapRange(value, min, max, bounds.height, 0);
                    tooltipElem.style.left = "".concat(tx, "px");
                    tooltipElem.style.top = "".concat(ty, "px");
                    tooltipElem.textContent = "".concat(this.formatter_(value));
                    if (!tooltipElem.classList.contains(className1('t', 'a'))) {
                        tooltipElem.classList.add(className1('t', 'a'), className1('t', 'in'));
                        forceReflow(tooltipElem);
                        tooltipElem.classList.remove(className1('t', 'in'));
                    }
                }
            },
            {
                key: "onValueUpdate_",
                value: function onValueUpdate_() {
                    this.update_();
                }
            },
            {
                key: "onCursorChange_",
                value: function onCursorChange_() {
                    this.update_();
                }
            }
        ]);
        return GraphLogView;
    }();
    var GraphLogController = /*#__PURE__*/ function() {
        function GraphLogController(doc, config) {
            _helpers.classCallCheck(this, GraphLogController);
            this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
            this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
            this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
            this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
            this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
            this.value = config.value;
            this.viewProps = config.viewProps;
            this.cursor_ = new GraphCursor();
            this.view = new GraphLogView(doc, {
                cursor: this.cursor_,
                formatter: config.formatter,
                lineCount: config.lineCount,
                maxValue: config.maxValue,
                minValue: config.minValue,
                value: this.value,
                viewProps: this.viewProps
            });
            if (!supportsTouch(doc)) {
                this.view.element.addEventListener('mousemove', this.onGraphMouseMove_);
                this.view.element.addEventListener('mouseleave', this.onGraphMouseLeave_);
            } else {
                var ph = new PointerHandler(this.view.element);
                ph.emitter.on('down', this.onGraphPointerDown_);
                ph.emitter.on('move', this.onGraphPointerMove_);
                ph.emitter.on('up', this.onGraphPointerUp_);
            }
        }
        _helpers.createClass(GraphLogController, [
            {
                key: "onGraphMouseLeave_",
                value: function onGraphMouseLeave_() {
                    this.cursor_.index = -1;
                }
            },
            {
                key: "onGraphMouseMove_",
                value: function onGraphMouseMove_(ev) {
                    var bounds = this.view.element.getBoundingClientRect();
                    this.cursor_.index = Math.floor(mapRange(ev.offsetX, 0, bounds.width, 0, this.value.rawValue.length));
                }
            },
            {
                key: "onGraphPointerDown_",
                value: function onGraphPointerDown_(ev) {
                    this.onGraphPointerMove_(ev);
                }
            },
            {
                key: "onGraphPointerMove_",
                value: function onGraphPointerMove_(ev) {
                    if (!ev.data.point) {
                        this.cursor_.index = -1;
                        return;
                    }
                    this.cursor_.index = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
                }
            },
            {
                key: "onGraphPointerUp_",
                value: function onGraphPointerUp_() {
                    this.cursor_.index = -1;
                }
            }
        ]);
        return GraphLogController;
    }();
    function createFormatter(params) {
        return 'format' in params && !isEmpty(params.format) ? params.format : createNumberFormatter(2);
    }
    function createTextMonitor(args) {
        var _a;
        if (args.value.rawValue.length === 1) return new SingleLogController(args.document, {
            formatter: createFormatter(args.params),
            value: args.value,
            viewProps: args.viewProps
        });
        return new MultiLogController(args.document, {
            formatter: createFormatter(args.params),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            value: args.value,
            viewProps: args.viewProps
        });
    }
    function createGraphMonitor(args) {
        var _a, _b, _c;
        return new GraphLogController(args.document, {
            formatter: createFormatter(args.params),
            lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
            maxValue: (_b = 'max' in args.params ? args.params.max : null) !== null && _b !== void 0 ? _b : 100,
            minValue: (_c = 'min' in args.params ? args.params.min : null) !== null && _c !== void 0 ? _c : 0,
            value: args.value,
            viewProps: args.viewProps
        });
    }
    function shouldShowGraph(params) {
        return 'view' in params && params.view === 'graph';
    }
    var NumberMonitorPlugin = {
        id: 'monitor-number',
        type: 'monitor',
        accept: function(value, params) {
            if (typeof value !== 'number') return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                format: p.optional.function,
                lineCount: p.optional.number,
                max: p.optional.number,
                min: p.optional.number,
                view: p.optional.string
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            defaultBufferSize: function(params) {
                return shouldShowGraph(params) ? 64 : 1;
            },
            reader: function(_args) {
                return numberFromUnknown;
            }
        },
        controller: function(args) {
            if (shouldShowGraph(args.params)) return createGraphMonitor(args);
            return createTextMonitor(args);
        }
    };
    var StringMonitorPlugin = {
        id: 'monitor-string',
        type: 'monitor',
        accept: function(value, params) {
            if (typeof value !== 'string') return null;
            var p = ParamsParsers;
            var result = parseParams(params, {
                lineCount: p.optional.number,
                multiline: p.optional.boolean
            });
            return result ? {
                initialValue: value,
                params: result
            } : null;
        },
        binding: {
            reader: function(_args) {
                return stringFromUnknown;
            }
        },
        controller: function(args) {
            var _a;
            var value = args.value;
            var multiline = value.rawValue.length > 1 || 'multiline' in args.params && args.params.multiline;
            if (multiline) return new MultiLogController(args.document, {
                formatter: formatString,
                lineCount: (_a = args.params.lineCount) !== null && _a !== void 0 ? _a : Constants.monitor.defaultLineCount,
                value: value,
                viewProps: args.viewProps
            });
            return new SingleLogController(args.document, {
                formatter: formatString,
                value: value,
                viewProps: args.viewProps
            });
        }
    };
    var InputBinding = /*#__PURE__*/ function() {
        function InputBinding(config) {
            _helpers.classCallCheck(this, InputBinding);
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.reader = config.reader;
            this.writer = config.writer;
            this.emitter = new Emitter();
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.target = config.target;
            this.read();
        }
        _helpers.createClass(InputBinding, [
            {
                key: "read",
                value: function read() {
                    var targetValue = this.target.read();
                    if (targetValue !== undefined) this.value.rawValue = this.reader(targetValue);
                }
            },
            {
                key: "write_",
                value: function write_(rawValue) {
                    this.writer(this.target, rawValue);
                }
            },
            {
                key: "onValueChange_",
                value: function onValueChange_(ev) {
                    this.write_(ev.rawValue);
                    this.emitter.emit('change', {
                        options: ev.options,
                        rawValue: ev.rawValue,
                        sender: this
                    });
                }
            }
        ]);
        return InputBinding;
    }();
    function createInputBindingController(plugin, args) {
        var result = plugin.accept(args.target.read(), args.params);
        if (isEmpty(result)) return null;
        var p = ParamsParsers;
        var valueArgs = {
            target: args.target,
            initialValue: result.initialValue,
            params: result.params
        };
        var reader = plugin.binding.reader(valueArgs);
        var constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : undefined;
        var value = createValue(reader(result.initialValue), {
            constraint: constraint,
            equals: plugin.binding.equals
        });
        var binding = new InputBinding({
            reader: reader,
            target: args.target,
            value: value,
            writer: plugin.binding.writer(valueArgs)
        });
        var disabled = p.optional.boolean(args.params.disabled).value;
        var hidden = p.optional.boolean(args.params.hidden).value;
        var controller = plugin.controller({
            constraint: constraint,
            document: args.document,
            initialValue: result.initialValue,
            params: result.params,
            value: binding.value,
            viewProps: ViewProps.create({
                disabled: disabled,
                hidden: hidden
            })
        });
        var label = p.optional.string(args.params.label).value;
        return new InputBindingController(args.document, {
            binding: binding,
            blade: createBlade(),
            props: ValueMap.fromObject({
                label: label || args.target.key
            }),
            valueController: controller
        });
    }
    var MonitorBinding = /*#__PURE__*/ function() {
        function MonitorBinding(config) {
            _helpers.classCallCheck(this, MonitorBinding);
            this.onTick_ = this.onTick_.bind(this);
            this.reader_ = config.reader;
            this.target = config.target;
            this.emitter = new Emitter();
            this.value = config.value;
            this.ticker = config.ticker;
            this.ticker.emitter.on('tick', this.onTick_);
            this.read();
        }
        _helpers.createClass(MonitorBinding, [
            {
                key: "dispose",
                value: function dispose() {
                    this.ticker.dispose();
                }
            },
            {
                key: "read",
                value: function read() {
                    var targetValue = this.target.read();
                    if (targetValue === undefined) return;
                    var buffer = this.value.rawValue;
                    var newValue = this.reader_(targetValue);
                    this.value.rawValue = createPushedBuffer(buffer, newValue);
                    this.emitter.emit('update', {
                        rawValue: newValue,
                        sender: this
                    });
                }
            },
            {
                key: "onTick_",
                value: function onTick_(_) {
                    this.read();
                }
            }
        ]);
        return MonitorBinding;
    }();
    function createTicker(document, interval) {
        return interval === 0 ? new ManualTicker() : new IntervalTicker(document, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
    }
    function createMonitorBindingController(plugin, args) {
        var _a, _b, _c;
        var P = ParamsParsers;
        var result = plugin.accept(args.target.read(), args.params);
        if (isEmpty(result)) return null;
        var bindingArgs = {
            target: args.target,
            initialValue: result.initialValue,
            params: result.params
        };
        var reader = plugin.binding.reader(bindingArgs);
        var bufferSize = (_b = (_a = P.optional.number(args.params.bufferSize).value) !== null && _a !== void 0 ? _a : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(result.params)) !== null && _b !== void 0 ? _b : 1;
        var interval = P.optional.number(args.params.interval).value;
        var binding = new MonitorBinding({
            reader: reader,
            target: args.target,
            ticker: createTicker(args.document, interval),
            value: initializeBuffer(bufferSize)
        });
        var disabled = P.optional.boolean(args.params.disabled).value;
        var hidden = P.optional.boolean(args.params.hidden).value;
        var controller = plugin.controller({
            document: args.document,
            params: result.params,
            value: binding.value,
            viewProps: ViewProps.create({
                disabled: disabled,
                hidden: hidden
            })
        });
        var label = (_c = P.optional.string(args.params.label).value) !== null && _c !== void 0 ? _c : args.target.key;
        return new MonitorBindingController(args.document, {
            binding: binding,
            blade: createBlade(),
            props: ValueMap.fromObject({
                label: label
            }),
            valueController: controller
        });
    }
    var PluginPool = /*#__PURE__*/ function() {
        function PluginPool() {
            _helpers.classCallCheck(this, PluginPool);
            this.pluginsMap_ = {
                blades: [],
                inputs: [],
                monitors: []
            };
        }
        _helpers.createClass(PluginPool, [
            {
                key: "getAll",
                value: function getAll() {
                    return _helpers.toConsumableArray(this.pluginsMap_.blades).concat(_helpers.toConsumableArray(this.pluginsMap_.inputs), _helpers.toConsumableArray(this.pluginsMap_.monitors));
                }
            },
            {
                key: "register",
                value: function register(r) {
                    if (r.type === 'blade') this.pluginsMap_.blades.unshift(r);
                    else if (r.type === 'input') this.pluginsMap_.inputs.unshift(r);
                    else if (r.type === 'monitor') this.pluginsMap_.monitors.unshift(r);
                }
            },
            {
                key: "createInput",
                value: function createInput(document, target, params) {
                    var initialValue = target.read();
                    if (isEmpty(initialValue)) throw new TpError({
                        context: {
                            key: target.key
                        },
                        type: 'nomatchingcontroller'
                    });
                    var bc = this.pluginsMap_.inputs.reduce(function(result, plugin) {
                        return result || createInputBindingController(plugin, {
                            document: document,
                            target: target,
                            params: params
                        });
                    }, null);
                    if (bc) return bc;
                    throw new TpError({
                        context: {
                            key: target.key
                        },
                        type: 'nomatchingcontroller'
                    });
                }
            },
            {
                key: "createMonitor",
                value: function createMonitor(document, target, params) {
                    var bc = this.pluginsMap_.monitors.reduce(function(result, plugin) {
                        return result || createMonitorBindingController(plugin, {
                            document: document,
                            params: params,
                            target: target
                        });
                    }, null);
                    if (bc) return bc;
                    throw new TpError({
                        context: {
                            key: target.key
                        },
                        type: 'nomatchingcontroller'
                    });
                }
            },
            {
                key: "createBlade",
                value: function createBlade(document, params) {
                    var bc = this.pluginsMap_.blades.reduce(function(result, plugin) {
                        return result || createBladeController(plugin, {
                            document: document,
                            params: params
                        });
                    }, null);
                    if (!bc) throw new TpError({
                        type: 'nomatchingview',
                        context: {
                            params: params
                        }
                    });
                    return bc;
                }
            },
            {
                key: "createBladeApi",
                value: function createBladeApi(bc) {
                    var _this = this;
                    if (bc instanceof InputBindingController) return new InputBindingApi(bc);
                    if (bc instanceof MonitorBindingController) return new MonitorBindingApi(bc);
                    if (bc instanceof RackController) return new RackApi(bc, this);
                    var api = this.pluginsMap_.blades.reduce(function(result, plugin) {
                        return result || plugin.api({
                            controller: bc,
                            pool: _this
                        });
                    }, null);
                    if (!api) throw TpError.shouldNeverHappen();
                    return api;
                }
            }
        ]);
        return PluginPool;
    }();
    function createDefaultPluginPool() {
        var pool = new PluginPool();
        [
            Point2dInputPlugin,
            Point3dInputPlugin,
            Point4dInputPlugin,
            StringInputPlugin,
            NumberInputPlugin,
            StringColorInputPlugin,
            ObjectColorInputPlugin,
            NumberColorInputPlugin,
            BooleanInputPlugin,
            BooleanMonitorPlugin,
            StringMonitorPlugin,
            NumberMonitorPlugin,
            ButtonBladePlugin,
            FolderBladePlugin,
            SeparatorBladePlugin,
            TabBladePlugin, 
        ].forEach(function(p) {
            pool.register(p);
        });
        return pool;
    }
    var ListApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(ListApi, BladeApi);
        var _super = _helpers.createSuper(ListApi);
        function ListApi(controller) {
            _helpers.classCallCheck(this, ListApi);
            var _this;
            _this = _super.call(this, controller);
            _this.emitter_ = new Emitter();
            _this.controller_.valueController.value.emitter.on('change', function(ev) {
                _this.emitter_.emit('change', {
                    event: new TpChangeEvent(_helpers.assertThisInitialized(_this), ev.rawValue)
                });
            });
            return _this;
        }
        _helpers.createClass(ListApi, [
            {
                key: "label",
                get: function get() {
                    return this.controller_.props.get('label');
                },
                set: function set(label) {
                    this.controller_.props.set('label', label);
                }
            },
            {
                key: "options",
                get: function get() {
                    return this.controller_.valueController.props.get('options');
                },
                set: function set(options) {
                    this.controller_.valueController.props.set('options', options);
                }
            },
            {
                key: "value",
                get: function get() {
                    return this.controller_.valueController.value.rawValue;
                },
                set: function set(value) {
                    this.controller_.valueController.value.rawValue = value;
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            }
        ]);
        return ListApi;
    }(BladeApi);
    var SliderApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(SliderApi, BladeApi);
        var _super = _helpers.createSuper(SliderApi);
        function SliderApi(controller) {
            _helpers.classCallCheck(this, SliderApi);
            var _this;
            _this = _super.call(this, controller);
            _this.emitter_ = new Emitter();
            _this.controller_.valueController.value.emitter.on('change', function(ev) {
                _this.emitter_.emit('change', {
                    event: new TpChangeEvent(_helpers.assertThisInitialized(_this), ev.rawValue)
                });
            });
            return _this;
        }
        _helpers.createClass(SliderApi, [
            {
                key: "label",
                get: function get() {
                    return this.controller_.props.get('label');
                },
                set: function set(label) {
                    this.controller_.props.set('label', label);
                }
            },
            {
                key: "maxValue",
                get: function get() {
                    return this.controller_.valueController.sliderController.props.get('maxValue');
                },
                set: function set(maxValue) {
                    this.controller_.valueController.sliderController.props.set('maxValue', maxValue);
                }
            },
            {
                key: "minValue",
                get: function get() {
                    return this.controller_.valueController.sliderController.props.get('minValue');
                },
                set: function set(minValue) {
                    this.controller_.valueController.sliderController.props.set('minValue', minValue);
                }
            },
            {
                key: "value",
                get: function get() {
                    return this.controller_.valueController.value.rawValue;
                },
                set: function set(value) {
                    this.controller_.valueController.value.rawValue = value;
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            }
        ]);
        return SliderApi;
    }(BladeApi);
    var TextApi = /*#__PURE__*/ function(BladeApi) {
        _helpers.inherits(TextApi, BladeApi);
        var _super = _helpers.createSuper(TextApi);
        function TextApi(controller) {
            _helpers.classCallCheck(this, TextApi);
            var _this;
            _this = _super.call(this, controller);
            _this.emitter_ = new Emitter();
            _this.controller_.valueController.value.emitter.on('change', function(ev) {
                _this.emitter_.emit('change', {
                    event: new TpChangeEvent(_helpers.assertThisInitialized(_this), ev.rawValue)
                });
            });
            return _this;
        }
        _helpers.createClass(TextApi, [
            {
                key: "label",
                get: function get() {
                    return this.controller_.props.get('label');
                },
                set: function set(label) {
                    this.controller_.props.set('label', label);
                }
            },
            {
                key: "formatter",
                get: function get() {
                    return this.controller_.valueController.props.get('formatter');
                },
                set: function set(formatter) {
                    this.controller_.valueController.props.set('formatter', formatter);
                }
            },
            {
                key: "value",
                get: function get() {
                    return this.controller_.valueController.value.rawValue;
                },
                set: function set(value) {
                    this.controller_.valueController.value.rawValue = value;
                }
            },
            {
                key: "on",
                value: function on(eventName, handler) {
                    var bh = handler.bind(this);
                    this.emitter_.on(eventName, function(ev) {
                        bh(ev.event);
                    });
                    return this;
                }
            }
        ]);
        return TextApi;
    }(BladeApi);
    var ListBladePlugin = function() {
        return {
            id: 'list',
            type: 'blade',
            accept: function(params) {
                var p = ParamsParsers;
                var result = parseParams(params, {
                    options: p.required.custom(parseListOptions),
                    value: p.required.raw,
                    view: p.required.constant('list'),
                    label: p.optional.string
                });
                return result ? {
                    params: result
                } : null;
            },
            controller: function(args) {
                var ic = new ListController(args.document, {
                    props: ValueMap.fromObject({
                        options: normalizeListOptions(args.params.options)
                    }),
                    value: createValue(args.params.value),
                    viewProps: args.viewProps
                });
                return new LabeledValueController(args.document, {
                    blade: args.blade,
                    props: ValueMap.fromObject({
                        label: args.params.label
                    }),
                    valueController: ic
                });
            },
            api: function(args) {
                if (!(args.controller instanceof LabeledValueController)) return null;
                if (!(args.controller.valueController instanceof ListController)) return null;
                return new ListApi(args.controller);
            }
        };
    }();
    /**
     * @hidden
     */ function exportPresetJson(targets) {
        return targets.reduce(function(result, target) {
            return Object.assign(result, _helpers.defineProperty({
            }, target.presetKey, target.read()));
        }, {
        });
    }
    /**
     * @hidden
     */ function importPresetJson(targets, preset) {
        targets.forEach(function(target) {
            var value = preset[target.presetKey];
            if (value !== undefined) target.write(value);
        });
    }
    var RootApi = /*#__PURE__*/ function(FolderApi) {
        _helpers.inherits(RootApi, FolderApi);
        var _super = _helpers.createSuper(RootApi);
        function RootApi(controller, pool) {
            _helpers.classCallCheck(this, RootApi);
            return _super.call(this, controller, pool);
        }
        _helpers.createClass(RootApi, [
            {
                key: "element",
                get: function get() {
                    return this.controller_.view.element;
                }
            },
            {
                /**
         * Imports a preset of all inputs.
         * @param preset The preset object to import.
         */ key: "importPreset",
                value: function importPreset(preset) {
                    var targets = this.controller_.rackController.rack.find(InputBindingController).map(function(ibc) {
                        return ibc.binding.target;
                    });
                    importPresetJson(targets, preset);
                    this.refresh();
                }
            },
            {
                /**
         * Exports a preset of all inputs.
         * @return An exported preset object.
         */ key: "exportPreset",
                value: function exportPreset() {
                    var targets = this.controller_.rackController.rack.find(InputBindingController).map(function(ibc) {
                        return ibc.binding.target;
                    });
                    return exportPresetJson(targets);
                }
            },
            {
                /**
         * Refreshes all bindings of the pane.
         */ key: "refresh",
                value: function refresh() {
                    // Force-read all input bindings
                    this.controller_.rackController.rack.find(InputBindingController).forEach(function(ibc) {
                        ibc.binding.read();
                    });
                    // Force-read all monitor bindings
                    this.controller_.rackController.rack.find(MonitorBindingController).forEach(function(mbc) {
                        mbc.binding.read();
                    });
                }
            }
        ]);
        return RootApi;
    }(FolderApi);
    var RootController = /*#__PURE__*/ function(FolderController) {
        _helpers.inherits(RootController, FolderController);
        var _super = _helpers.createSuper(RootController);
        function RootController(doc, config) {
            _helpers.classCallCheck(this, RootController);
            return _super.call(this, doc, {
                expanded: config.expanded,
                blade: config.blade,
                props: config.props,
                root: true,
                viewProps: config.viewProps
            });
        }
        return RootController;
    }(FolderController);
    var SliderBladePlugin = {
        id: 'slider',
        type: 'blade',
        accept: function(params) {
            var p = ParamsParsers;
            var result = parseParams(params, {
                max: p.required.number,
                min: p.required.number,
                view: p.required.constant('slider'),
                format: p.optional.function,
                label: p.optional.string,
                value: p.optional.number
            });
            return result ? {
                params: result
            } : null;
        },
        controller: function(args) {
            var _a, _b;
            var v = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
            var vc = new SliderTextController(args.document, {
                baseStep: 1,
                parser: parseNumber,
                sliderProps: ValueMap.fromObject({
                    maxValue: args.params.max,
                    minValue: args.params.min
                }),
                textProps: ValueMap.fromObject({
                    draggingScale: getSuitableDraggingScale(undefined, v),
                    formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString
                }),
                value: createValue(v),
                viewProps: args.viewProps
            });
            return new LabeledValueController(args.document, {
                blade: args.blade,
                props: ValueMap.fromObject({
                    label: args.params.label
                }),
                valueController: vc
            });
        },
        api: function(args) {
            if (!(args.controller instanceof LabeledValueController)) return null;
            if (!(args.controller.valueController instanceof SliderTextController)) return null;
            return new SliderApi(args.controller);
        }
    };
    var TextBladePlugin = function() {
        return {
            id: 'text',
            type: 'blade',
            accept: function(params) {
                var p = ParamsParsers;
                var result = parseParams(params, {
                    parse: p.required.function,
                    value: p.required.raw,
                    view: p.required.constant('text'),
                    format: p.optional.function,
                    label: p.optional.string
                });
                return result ? {
                    params: result
                } : null;
            },
            controller: function(args) {
                var _a;
                var ic = new TextController(args.document, {
                    parser: args.params.parse,
                    props: ValueMap.fromObject({
                        formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : function(v) {
                            return String(v);
                        }
                    }),
                    value: createValue(args.params.value),
                    viewProps: args.viewProps
                });
                return new LabeledValueController(args.document, {
                    blade: args.blade,
                    props: ValueMap.fromObject({
                        label: args.params.label
                    }),
                    valueController: ic
                });
            },
            api: function(args) {
                if (!(args.controller instanceof LabeledValueController)) return null;
                if (!(args.controller.valueController instanceof TextController)) return null;
                return new TextApi(args.controller);
            }
        };
    }();
    function createDefaultWrapperElement(doc) {
        var elem = doc.createElement('div');
        elem.classList.add(ClassName('dfw')());
        if (doc.body) doc.body.appendChild(elem);
        return elem;
    }
    function embedStyle(doc, id, css) {
        if (doc.querySelector("style[data-tp-style=".concat(id, "]"))) return;
        var styleElem = doc.createElement('style');
        styleElem.dataset.tpStyle = id;
        styleElem.textContent = css;
        doc.head.appendChild(styleElem);
    }
    var Pane = /**
     * The root pane of Tweakpane.
     */ /*#__PURE__*/ function(RootApi) {
        _helpers.inherits(Pane, RootApi);
        var _super = _helpers.createSuper(Pane);
        function Pane(opt_config) {
            _helpers.classCallCheck(this, Pane);
            var _this;
            var _a;
            var config = opt_config || {
            };
            var doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
            var pool = createDefaultPluginPool();
            var rootController = new RootController(doc, {
                expanded: config.expanded,
                blade: createBlade(),
                props: ValueMap.fromObject({
                    title: config.title
                }),
                viewProps: ViewProps.create()
            });
            _this = _super.call(this, rootController, pool);
            _this.pool_ = pool;
            _this.containerElem_ = config.container || createDefaultWrapperElement(doc);
            _this.containerElem_.appendChild(_this.element);
            _this.doc_ = doc;
            _this.usesDefaultWrapper_ = !config.container;
            _this.setUpDefaultPlugins_();
            return _this;
        }
        _helpers.createClass(Pane, [
            {
                key: "document",
                get: function get() {
                    if (!this.doc_) throw TpError.alreadyDisposed();
                    return this.doc_;
                }
            },
            {
                key: "dispose",
                value: function dispose() {
                    var containerElem = this.containerElem_;
                    if (!containerElem) throw TpError.alreadyDisposed();
                    if (this.usesDefaultWrapper_) {
                        var parentElem = containerElem.parentElement;
                        if (parentElem) parentElem.removeChild(containerElem);
                    }
                    this.containerElem_ = null;
                    this.doc_ = null;
                    _helpers.get(_helpers.getPrototypeOf(Pane.prototype), "dispose", this).call(this);
                }
            },
            {
                key: "registerPlugin",
                value: function registerPlugin(bundle) {
                    var _this = this;
                    var plugins = 'plugin' in bundle ? [
                        bundle.plugin
                    ] : 'plugins' in bundle ? bundle.plugins : [];
                    plugins.forEach(function(p) {
                        _this.pool_.register(p);
                        _this.embedPluginStyle_(p);
                    });
                }
            },
            {
                key: "embedPluginStyle_",
                value: function embedPluginStyle_(plugin) {
                    if (plugin.css) embedStyle(this.document, "plugin-".concat(plugin.id), plugin.css);
                }
            },
            {
                key: "setUpDefaultPlugins_",
                value: function setUpDefaultPlugins_() {
                    var _this = this;
                    // NOTE: This string literal will be replaced with the default CSS by Rollup at the compilation time
                    embedStyle(this.document, 'default', '.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b,.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i,.tp-grlv_g,.tp-sglv_i,.tp-mllv_i,.tp-fldv_b,.tp-rotv_b,.tp-ckbv_i,.tp-coltxtv_ms,.tp-tbiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-lstv_s,.tp-btnv_b,.tp-p2dv_b{background-color:var(--btn-bg);border-radius:var(--elm-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--bld-us);line-height:var(--bld-us);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-lstv_s:hover,.tp-btnv_b:hover,.tp-p2dv_b:hover{background-color:var(--btn-bg-h)}.tp-lstv_s:focus,.tp-btnv_b:focus,.tp-p2dv_b:focus{background-color:var(--btn-bg-f)}.tp-lstv_s:active,.tp-btnv_b:active,.tp-p2dv_b:active{background-color:var(--btn-bg-a)}.tp-lstv_s:disabled,.tp-btnv_b:disabled,.tp-p2dv_b:disabled{opacity:0.5}.tp-colswv_sw,.tp-p2dpv_p,.tp-txtv_i{background-color:var(--in-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--bld-us);line-height:var(--bld-us);min-width:0;width:100%}.tp-colswv_sw:hover,.tp-p2dpv_p:hover,.tp-txtv_i:hover{background-color:var(--in-bg-h)}.tp-colswv_sw:focus,.tp-p2dpv_p:focus,.tp-txtv_i:focus{background-color:var(--in-bg-f)}.tp-colswv_sw:active,.tp-p2dpv_p:active,.tp-txtv_i:active{background-color:var(--in-bg-a)}.tp-colswv_sw:disabled,.tp-p2dpv_p:disabled,.tp-txtv_i:disabled{opacity:0.5}.tp-grlv_g,.tp-sglv_i,.tp-mllv_i{background-color:var(--mo-bg);border-radius:var(--elm-br);box-sizing:border-box;color:var(--mo-fg);height:var(--bld-us);width:100%}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--bs-br: var(--tp-base-border-radius, 6px);--cnt-h-p: var(--tp-container-horizontal-padding, 4px);--cnt-v-p: var(--tp-container-vertical-padding, 4px);--elm-br: var(--tp-element-border-radius, 2px);--bld-s: var(--tp-blade-spacing, 4px);--bld-us: var(--tp-blade-unit-size, 20px);--bs-bg: var(--tp-base-background-color, #2f3137);--bs-sh: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--btn-bg: var(--tp-button-background-color, #adafb8);--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, #2f3137);--cnt-bg: var(--tp-container-background-color, rgba(187,188,196,0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187,188,196,0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187,188,196,0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187,188,196,0.15));--cnt-fg: var(--tp-container-foreground-color, #bbbcc4);--in-bg: var(--tp-input-background-color, rgba(187,188,196,0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187,188,196,0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187,188,196,0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187,188,196,0.15));--in-fg: var(--tp-input-foreground-color, #bbbcc4);--lbl-fg: var(--tp-label-foreground-color, rgba(187,188,196,0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0,0,0,0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187,188,196,0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(0,0,0,0.2))}.tp-fldv_c>.tp-cntv.tp-v-lst,.tp-tabv_c .tp-brkv>.tp-cntv.tp-v-lst,.tp-rotv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1 * var(--cnt-v-p))}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c>*:not(.tp-v-fst),.tp-tabv_c .tp-brkv>*:not(.tp-v-fst),.tp-rotv_c>*:not(.tp-v-fst){margin-top:var(--bld-s)}.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst),.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tabv_c .tp-brkv>.tp-cntv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-v-p)}.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tabv_c .tp-brkv>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-fldv_c>.tp-cntv,.tp-tabv_c .tp-brkv>.tp-cntv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--elm-br);border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-tabv_c .tp-brkv>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c,.tp-tabv_c .tp-brkv .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_c>.tp-tabv>.tp-tabv_i,.tp-tabv_c .tp-brkv>.tp-tabv>.tp-tabv_i{border-top-left-radius:var(--elm-br)}.tp-fldv_c .tp-tabv>.tp-tabv_c,.tp-tabv_c .tp-brkv .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--elm-br)}.tp-fldv_b,.tp-rotv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);overflow:hidden;padding-left:var(--cnt-h-p);padding-right:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_b:hover,.tp-rotv_b:hover{background-color:var(--cnt-bg-h)}.tp-fldv_b:focus,.tp-rotv_b:focus{background-color:var(--cnt-bg-f)}.tp-fldv_b:active,.tp-rotv_b:active{background-color:var(--cnt-bg-a)}.tp-fldv_b:disabled,.tp-rotv_b:disabled{opacity:0.5}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:\'\';display:block;height:6px;right:calc(var(--cnt-h-p) + (var(--bld-us) + 4px - 6px) / 2 - 2px);margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c,.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c{display:none}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-coltxtv_m,.tp-lstv{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-coltxtv_mm,.tp-lstv_m{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-coltxtv_mm svg,.tp-lstv_m svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-coltxtv_mm svg path,.tp-lstv_m svg path{fill:currentColor}.tp-coltxtv_w,.tp-pndtxtv{display:flex}.tp-coltxtv_c,.tp-pndtxtv_a{width:100%}.tp-coltxtv_c+.tp-coltxtv_c,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-pndtxtv_a{margin-left:2px}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--elm-br);cursor:pointer;display:block;height:var(--bld-us);position:relative;width:var(--bld-us)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:0.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--bld-us)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--bld-s);opacity:1}.tp-colv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--bld-s)}.tp-colpv_rgb{display:flex;margin-top:var(--bld-s);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-v-p);padding-top:calc(var(--cnt-v-p) + 2px);position:relative}.tp-colpv_a:before{background-color:var(--grv-fg);content:\'\';height:2px;left:calc(-1 * var(--cnt-h-p));position:absolute;right:calc(-1 * var(--cnt-h-p));top:0}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--elm-br);outline:none;overflow:hidden;position:relative}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--bld-us) * 4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--bld-us);outline:none;position:relative;width:100%}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--elm-br);box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--elm-br);border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--elm-br)}.tp-colswv.tp-v-disabled{opacity:0.5}.tp-colswv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--bld-us);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--bld-us)}.tp-colswv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:var(--elm-br);bottom:0;content:\'\';display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--elm-br);color:var(--lbl-fg);cursor:pointer;height:var(--bld-us);line-height:var(--bld-us);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-not .tp-fldv_b{display:none}.tp-fldv_t{padding-left:4px}.tp-fldv_c{border-left:var(--cnt-bg) solid 4px}.tp-fldv_b:hover+.tp-fldv_c{border-left-color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_c{border-left-color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_c{border-left-color:var(--cnt-bg-a)}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--bld-us) * 3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left 0.05s, top 0.05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:0.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-h-p);padding-right:var(--cnt-h-p)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:0.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding:0 4px}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:0.5}.tp-mllv_i{display:block;height:calc(var(--bld-us) * 3);line-height:var(--bld-us);padding:0 4px;resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:0.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--bld-us);margin-right:4px;position:relative;width:var(--bld-us)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--bld-s);opacity:1}.tp-p2dv .tp-popv{left:calc(-1 * var(--cnt-h-p));right:calc(-1 * var(--cnt-h-p));top:var(--bld-us)}.tp-p2dpv{padding-left:calc(var(--bld-us) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:0.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:0.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:6px;box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:168px;padding:var(--cnt-v-p) var(--cnt-h-p);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sldv.tp-v-disabled{opacity:0.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--bld-us);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:\'\';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:\'\';display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--elm-br);bottom:0;content:\'\';display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv.tp-v-disabled{opacity:0.5}.tp-tabv_i{align-items:flex-end;display:flex;overflow:hidden}.tp-tabv.tp-tabv-nop .tp-tabv_i{height:calc(var(--bld-us) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_i::before{background-color:var(--cnt-bg);bottom:0;content:\'\';height:2px;left:0;position:absolute;right:0}.tp-tabv_c{border-left:var(--cnt-bg) solid 4px;padding-bottom:var(--cnt-v-p);padding-top:var(--cnt-v-p)}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv::before{background-color:var(--cnt-bg);bottom:0;content:\'\';height:2px;left:-2px;position:absolute;width:2px}.tp-tbiv_b{background-color:var(--cnt-bg);display:block;padding-left:calc(var(--cnt-h-p) + 4px);padding-right:calc(var(--cnt-h-p) + 4px);width:100%}.tp-tbiv_b:hover{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active{background-color:var(--cnt-bg-a)}.tp-tbiv_b:disabled{opacity:0.5}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--bld-us) + 4px);line-height:calc(var(--bld-us) + 4px);opacity:0.5;overflow:hidden;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-txtv{position:relative}.tp-txtv_i{padding:0 4px}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:0.3}.tp-txtv_k{cursor:pointer;height:100%;left:-3px;position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:\'\';height:calc(var(--bld-us) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:0.1;position:absolute;top:0;transition:border-radius 0.1s, height 0.1s, transform 0.1s, width 0.1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--elm-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) transparent transparent transparent;border-style:solid;border-width:2px;box-sizing:border-box;content:\'\';font-size:0.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(2px * 2 + var(--bld-us) + var(--cnt-h-p));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv.tp-rotv-not .tp-rotv_b{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c,.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1 * var(--cnt-v-p))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_i{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}');
                    this.pool_.getAll().forEach(function(plugin) {
                        _this.embedPluginStyle_(plugin);
                    });
                    this.registerPlugin({
                        plugins: [
                            SliderBladePlugin,
                            ListBladePlugin,
                            TabBladePlugin,
                            TextBladePlugin, 
                        ]
                    });
                }
            }
        ]);
        return Pane;
    }(RootApi);
    var VERSION = new Semver('3.0.7');
    exports.BladeApi = BladeApi;
    exports.ButtonApi = ButtonApi;
    exports.FolderApi = FolderApi;
    exports.InputBindingApi = InputBindingApi;
    exports.ListApi = ListApi;
    exports.MonitorBindingApi = MonitorBindingApi;
    exports.Pane = Pane;
    exports.SeparatorApi = SeparatorApi;
    exports.SliderApi = SliderApi;
    exports.TabApi = TabApi;
    exports.TabPageApi = TabPageApi;
    exports.TextApi = TextApi;
    exports.TpChangeEvent = TpChangeEvent;
    exports.VERSION = VERSION;
    Object.defineProperty(exports, '__esModule', {
        value: true
    });
});

},{"@swc/helpers":"erO4s"}],"erO4s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyDecoratedDescriptor", ()=>_applyDecoratedDescriptorDefault.default
);
parcelHelpers.export(exports, "arrayWithHoles", ()=>_arrayWithHolesDefault.default
);
parcelHelpers.export(exports, "arrayWithoutHoles", ()=>_arrayWithoutHolesDefault.default
);
parcelHelpers.export(exports, "assertThisInitialized", ()=>_assertThisInitializedDefault.default
);
parcelHelpers.export(exports, "asyncGenerator", ()=>_asyncGeneratorDefault.default
);
parcelHelpers.export(exports, "asyncGeneratorDelegate", ()=>_asyncGeneratorDelegateDefault.default
);
parcelHelpers.export(exports, "asyncIterator", ()=>_asyncIteratorDefault.default
);
parcelHelpers.export(exports, "asyncToGenerator", ()=>_asyncToGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitAsyncGenerator", ()=>_awaitAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "awaitValue", ()=>_awaitValueDefault.default
);
parcelHelpers.export(exports, "classCallCheck", ()=>_classCallCheckDefault.default
);
parcelHelpers.export(exports, "classNameTDZError", ()=>_classNameTdzErrorDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldGet", ()=>_classPrivateFieldGetDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldLooseBase", ()=>_classPrivateFieldLooseBaseDefault.default
);
parcelHelpers.export(exports, "classPrivateFieldSet", ()=>_classPrivateFieldSetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodGet", ()=>_classPrivateMethodGetDefault.default
);
parcelHelpers.export(exports, "classPrivateMethodSet", ()=>_classPrivateMethodSetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecGet", ()=>_classStaticPrivateFieldSpecGetDefault.default
);
parcelHelpers.export(exports, "classStaticPrivateFieldSpecSet", ()=>_classStaticPrivateFieldSpecSetDefault.default
);
parcelHelpers.export(exports, "construct", ()=>_constructDefault.default
);
parcelHelpers.export(exports, "createClass", ()=>_createClassDefault.default
);
parcelHelpers.export(exports, "decorate", ()=>_decorateDefault.default
);
parcelHelpers.export(exports, "defaults", ()=>_defaultsDefault.default
);
parcelHelpers.export(exports, "defineEnumerableProperties", ()=>_defineEnumerablePropertiesDefault.default
);
parcelHelpers.export(exports, "defineProperty", ()=>_definePropertyDefault.default
);
parcelHelpers.export(exports, "extends", ()=>_extendsDefault.default
);
parcelHelpers.export(exports, "get", ()=>_getDefault.default
);
parcelHelpers.export(exports, "getPrototypeOf", ()=>_getPrototypeOfDefault.default
);
parcelHelpers.export(exports, "inherits", ()=>_inheritsDefault.default
);
parcelHelpers.export(exports, "inheritsLoose", ()=>_inheritsLooseDefault.default
);
parcelHelpers.export(exports, "initializerDefineProperty", ()=>_initializerDefinePropertyDefault.default
);
parcelHelpers.export(exports, "initializerWarningHelper", ()=>_initializerWarningHelperDefault.default
);
parcelHelpers.export(exports, "_instanceof", ()=>_instanceofDefault.default
);
parcelHelpers.export(exports, "interopRequireDefault", ()=>_interopRequireDefaultDefault.default
);
parcelHelpers.export(exports, "interopRequireWildcard", ()=>_interopRequireWildcardDefault.default
);
parcelHelpers.export(exports, "isNativeFunction", ()=>_isNativeFunctionDefault.default
);
parcelHelpers.export(exports, "iterableToArray", ()=>_iterableToArrayDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimit", ()=>_iterableToArrayLimitDefault.default
);
parcelHelpers.export(exports, "iterableToArrayLimitLoose", ()=>_iterableToArrayLimitLooseDefault.default
);
parcelHelpers.export(exports, "jsx", ()=>_jsxDefault.default
);
parcelHelpers.export(exports, "newArrowCheck", ()=>_newArrowCheckDefault.default
);
parcelHelpers.export(exports, "nonIterableRest", ()=>_nonIterableRestDefault.default
);
parcelHelpers.export(exports, "nonIterableSpread", ()=>_nonIterableSpreadDefault.default
);
parcelHelpers.export(exports, "objectSpread", ()=>_objectSpreadDefault.default
);
parcelHelpers.export(exports, "objectWithoutProperties", ()=>_objectWithoutPropertiesDefault.default
);
parcelHelpers.export(exports, "objectWithoutPropertiesLoose", ()=>_objectWithoutPropertiesLooseDefault.default
);
parcelHelpers.export(exports, "possibleConstructorReturn", ()=>_possibleConstructorReturnDefault.default
);
parcelHelpers.export(exports, "readOnlyError", ()=>_readOnlyErrorDefault.default
);
parcelHelpers.export(exports, "set", ()=>_setDefault.default
);
parcelHelpers.export(exports, "setPrototypeOf", ()=>_setPrototypeOfDefault.default
);
parcelHelpers.export(exports, "skipFirstGeneratorNext", ()=>_skipFirstGeneratorNextDefault.default
);
parcelHelpers.export(exports, "slicedToArray", ()=>_slicedToArrayDefault.default
);
parcelHelpers.export(exports, "slicedToArrayLoose", ()=>_slicedToArrayLooseDefault.default
);
parcelHelpers.export(exports, "superPropBase", ()=>_superPropBaseDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteral", ()=>_taggedTemplateLiteralDefault.default
);
parcelHelpers.export(exports, "taggedTemplateLiteralLoose", ()=>_taggedTemplateLiteralLooseDefault.default
);
parcelHelpers.export(exports, "_throw", ()=>_throwDefault.default
);
parcelHelpers.export(exports, "toArray", ()=>_toArrayDefault.default
);
parcelHelpers.export(exports, "toConsumableArray", ()=>_toConsumableArrayDefault.default
);
parcelHelpers.export(exports, "toPrimitive", ()=>_toPrimitiveDefault.default
);
parcelHelpers.export(exports, "toPropertyKey", ()=>_toPropertyKeyDefault.default
);
parcelHelpers.export(exports, "typeOf", ()=>_typeOfDefault.default
);
parcelHelpers.export(exports, "wrapAsyncGenerator", ()=>_wrapAsyncGeneratorDefault.default
);
parcelHelpers.export(exports, "wrapNativeSuper", ()=>_wrapNativeSuperDefault.default
);
parcelHelpers.export(exports, "createSuper", ()=>_createSuperDefault.default
);
parcelHelpers.export(exports, "isNativeReflectConstruct", ()=>_isNativeReflectConstructDefault.default
);
var _applyDecoratedDescriptor = require("./_apply_decorated_descriptor");
var _applyDecoratedDescriptorDefault = parcelHelpers.interopDefault(_applyDecoratedDescriptor);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
var _asyncGeneratorDelegate = require("./_async_generator_delegate");
var _asyncGeneratorDelegateDefault = parcelHelpers.interopDefault(_asyncGeneratorDelegate);
var _asyncIterator = require("./_async_iterator");
var _asyncIteratorDefault = parcelHelpers.interopDefault(_asyncIterator);
var _asyncToGenerator = require("./_async_to_generator");
var _asyncToGeneratorDefault = parcelHelpers.interopDefault(_asyncToGenerator);
var _awaitAsyncGenerator = require("./_await_async_generator");
var _awaitAsyncGeneratorDefault = parcelHelpers.interopDefault(_awaitAsyncGenerator);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
var _classCallCheck = require("./_class_call_check");
var _classCallCheckDefault = parcelHelpers.interopDefault(_classCallCheck);
var _classNameTdzError = require("./_class_name_tdz_error");
var _classNameTdzErrorDefault = parcelHelpers.interopDefault(_classNameTdzError);
var _classPrivateFieldGet = require("./_class_private_field_get");
var _classPrivateFieldGetDefault = parcelHelpers.interopDefault(_classPrivateFieldGet);
var _classPrivateFieldLooseBase = require("./_class_private_field_loose_base");
var _classPrivateFieldLooseBaseDefault = parcelHelpers.interopDefault(_classPrivateFieldLooseBase);
var _classPrivateFieldSet = require("./_class_private_field_set");
var _classPrivateFieldSetDefault = parcelHelpers.interopDefault(_classPrivateFieldSet);
var _classPrivateMethodGet = require("./_class_private_method_get");
var _classPrivateMethodGetDefault = parcelHelpers.interopDefault(_classPrivateMethodGet);
var _classPrivateMethodSet = require("./_class_private_method_set");
var _classPrivateMethodSetDefault = parcelHelpers.interopDefault(_classPrivateMethodSet);
var _classStaticPrivateFieldSpecGet = require("./_class_static_private_field_spec_get");
var _classStaticPrivateFieldSpecGetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecGet);
var _classStaticPrivateFieldSpecSet = require("./_class_static_private_field_spec_set");
var _classStaticPrivateFieldSpecSetDefault = parcelHelpers.interopDefault(_classStaticPrivateFieldSpecSet);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _createClass = require("./_create_class");
var _createClassDefault = parcelHelpers.interopDefault(_createClass);
var _decorate = require("./_decorate");
var _decorateDefault = parcelHelpers.interopDefault(_decorate);
var _defaults = require("./_defaults");
var _defaultsDefault = parcelHelpers.interopDefault(_defaults);
var _defineEnumerableProperties = require("./_define_enumerable_properties");
var _defineEnumerablePropertiesDefault = parcelHelpers.interopDefault(_defineEnumerableProperties);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _extends = require("./_extends");
var _extendsDefault = parcelHelpers.interopDefault(_extends);
var _get = require("./_get");
var _getDefault = parcelHelpers.interopDefault(_get);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _inherits = require("./_inherits");
var _inheritsDefault = parcelHelpers.interopDefault(_inherits);
var _inheritsLoose = require("./_inherits_loose");
var _inheritsLooseDefault = parcelHelpers.interopDefault(_inheritsLoose);
var _initializerDefineProperty = require("./_initializer_define_property");
var _initializerDefinePropertyDefault = parcelHelpers.interopDefault(_initializerDefineProperty);
var _initializerWarningHelper = require("./_initializer_warning_helper");
var _initializerWarningHelperDefault = parcelHelpers.interopDefault(_initializerWarningHelper);
var _instanceof = require("./_instanceof");
var _instanceofDefault = parcelHelpers.interopDefault(_instanceof);
var _interopRequireDefault = require("./_interop_require_default");
var _interopRequireDefaultDefault = parcelHelpers.interopDefault(_interopRequireDefault);
var _interopRequireWildcard = require("./_interop_require_wildcard");
var _interopRequireWildcardDefault = parcelHelpers.interopDefault(_interopRequireWildcard);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _iterableToArrayLimit = require("./_iterable_to_array_limit");
var _iterableToArrayLimitDefault = parcelHelpers.interopDefault(_iterableToArrayLimit);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _jsx = require("./_jsx");
var _jsxDefault = parcelHelpers.interopDefault(_jsx);
var _newArrowCheck = require("./_new_arrow_check");
var _newArrowCheckDefault = parcelHelpers.interopDefault(_newArrowCheck);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
var _objectSpread = require("./_object_spread");
var _objectSpreadDefault = parcelHelpers.interopDefault(_objectSpread);
var _objectWithoutProperties = require("./_object_without_properties");
var _objectWithoutPropertiesDefault = parcelHelpers.interopDefault(_objectWithoutProperties);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
var _possibleConstructorReturn = require("./_possible_constructor_return");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
var _readOnlyError = require("./_read_only_error");
var _readOnlyErrorDefault = parcelHelpers.interopDefault(_readOnlyError);
var _set = require("./_set");
var _setDefault = parcelHelpers.interopDefault(_set);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
var _skipFirstGeneratorNext = require("./_skip_first_generator_next");
var _skipFirstGeneratorNextDefault = parcelHelpers.interopDefault(_skipFirstGeneratorNext);
var _slicedToArray = require("./_sliced_to_array");
var _slicedToArrayDefault = parcelHelpers.interopDefault(_slicedToArray);
var _slicedToArrayLoose = require("./_sliced_to_array_loose");
var _slicedToArrayLooseDefault = parcelHelpers.interopDefault(_slicedToArrayLoose);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
var _taggedTemplateLiteral = require("./_tagged_template_literal");
var _taggedTemplateLiteralDefault = parcelHelpers.interopDefault(_taggedTemplateLiteral);
var _taggedTemplateLiteralLoose = require("./_tagged_template_literal_loose");
var _taggedTemplateLiteralLooseDefault = parcelHelpers.interopDefault(_taggedTemplateLiteralLoose);
var _throw = require("./_throw");
var _throwDefault = parcelHelpers.interopDefault(_throw);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toConsumableArray = require("./_to_consumable_array");
var _toConsumableArrayDefault = parcelHelpers.interopDefault(_toConsumableArray);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _wrapAsyncGenerator = require("./_wrap_async_generator");
var _wrapAsyncGeneratorDefault = parcelHelpers.interopDefault(_wrapAsyncGenerator);
var _wrapNativeSuper = require("./_wrap_native_super");
var _wrapNativeSuperDefault = parcelHelpers.interopDefault(_wrapNativeSuper);
var _createSuper = require("./_create_super");
var _createSuperDefault = parcelHelpers.interopDefault(_createSuper);
var _isNativeReflectConstruct = require("./_is_native_reflect_construct");
var _isNativeReflectConstructDefault = parcelHelpers.interopDefault(_isNativeReflectConstruct);

},{"./_apply_decorated_descriptor":"c9NX1","./_array_with_holes":"f2RVY","./_array_without_holes":"9G5hu","./_assert_this_initialized":"hb0Uz","./_async_generator":"3e3Cq","./_async_generator_delegate":"aFowE","./_async_iterator":"kDn5G","./_async_to_generator":"69ywl","./_await_async_generator":"47kVK","./_await_value":"kOPdt","./_class_call_check":"5thSN","./_class_name_tdz_error":"kLeIP","./_class_private_field_get":"hiZIF","./_class_private_field_loose_base":"iIxKI","./_class_private_field_set":"3aItm","./_class_private_method_get":"gKMrA","./_class_private_method_set":"jDhxx","./_class_static_private_field_spec_get":"79XlC","./_class_static_private_field_spec_set":"hKsVp","./_construct":"bLTlt","./_create_class":"cMLkg","./_decorate":"5M3uX","./_defaults":"jPoWh","./_define_enumerable_properties":"8xWnI","./_define_property":"c7yiB","./_extends":"by2GU","./_get":"d3ZpD","./_get_prototype_of":"4Z2sn","./_inherits":"hoEyE","./_inherits_loose":"bpWmo","./_initializer_define_property":"5WZDp","./_initializer_warning_helper":"GCE4p","./_instanceof":"j6WhW","./_interop_require_default":"9sQ50","./_interop_require_wildcard":"ejKpM","./_is_native_function":"8d7fi","./_iterable_to_array":"lY6Yg","./_iterable_to_array_limit":"61jYg","./_iterable_to_array_limit_loose":"bvfpN","./_jsx":"9hq6e","./_new_arrow_check":"4VyBi","./_non_iterable_rest":"d6ywz","./_non_iterable_spread":"29F6O","./_object_spread":"jaxa1","./_object_without_properties":"eJaOZ","./_object_without_properties_loose":"6eqIr","./_possible_constructor_return":"cWetj","./_read_only_error":"3xmWo","./_set":"kehyh","./_set_prototype_of":"hkEkh","./_skip_first_generator_next":"lqj0R","./_sliced_to_array":"k8UMw","./_sliced_to_array_loose":"7tjhK","./_super_prop_base":"lGKRS","./_tagged_template_literal":"d3FCJ","./_tagged_template_literal_loose":"fbTUf","./_throw":"89Ibv","./_to_array":"lrbT1","./_to_consumable_array":"3TaI4","./_to_primitive":"aO5VI","./_to_property_key":"d5hF2","./_type_of":"hGmQp","./_wrap_async_generator":"kfhw9","./_wrap_native_super":"2wCpr","./_create_super":"inTdM","./_is_native_reflect_construct":"b8vXc","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"c9NX1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc1 = {
    };
    Object["keys"](descriptor).forEach(function(key) {
        desc1[key] = descriptor[key];
    });
    desc1.enumerable = !!desc1.enumerable;
    desc1.configurable = !!desc1.configurable;
    if ('value' in desc1 || desc1.initializer) desc1.writable = true;
    desc1 = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator ? decorator(target, property, desc) || desc : desc;
    }, desc1);
    if (context && desc1.initializer !== void 0) {
        desc1.value = desc1.initializer ? desc1.initializer.call(context) : void 0;
        desc1.initializer = undefined;
    }
    if (desc1.initializer === void 0) {
        Object["defineProperty"](target, property, desc1);
        desc1 = null;
    }
    return desc1;
}
exports.default = _applyDecoratedDescriptor;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5oERU":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function get() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"f2RVY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
exports.default = _arrayWithHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9G5hu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)arr2[i] = arr[i];
        return arr2;
    }
}
exports.default = _arrayWithoutHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hb0Uz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
exports.default = _assertThisInitialized;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3e3Cq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function AsyncGenerator(gen) {
    var front, back;
    function send(key, arg) {
        return new Promise(function(resolve, reject) {
            var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
            };
            if (back) back = back.next = request;
            else {
                front = back = request;
                resume(key, arg);
            }
        });
    }
    function resume(key, arg1) {
        try {
            var result = gen[key](arg1);
            var value = result.value;
            var wrappedAwait = value instanceof _awaitValueDefault.default;
            Promise.resolve(wrappedAwait ? value.wrapped : value).then(function(arg) {
                if (wrappedAwait) {
                    resume("next", arg);
                    return;
                }
                settle(result.done ? "return" : "normal", arg);
            }, function(err) {
                resume("throw", err);
            });
        } catch (err) {
            settle("throw", err);
        }
    }
    function settle(type, value) {
        switch(type){
            case "return":
                front.resolve({
                    value: value,
                    done: true
                });
                break;
            case "throw":
                front.reject(value);
                break;
            default:
                front.resolve({
                    value: value,
                    done: false
                });
                break;
        }
        front = front.next;
        if (front) resume(front.key, front.arg);
        else back = null;
    }
    this._invoke = send;
    if (typeof gen.return !== "function") this.return = undefined;
}
exports.default = AsyncGenerator;
if (typeof Symbol === "function" && Symbol.asyncIterator) AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
    return this;
};
AsyncGenerator.prototype.next = function(arg) {
    return this._invoke("next", arg);
};
AsyncGenerator.prototype.throw = function(arg) {
    return this._invoke("throw", arg);
};
AsyncGenerator.prototype.return = function(arg) {
    return this._invoke("return", arg);
};

},{"./_await_value":"kOPdt","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kOPdt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _AwaitValue(value) {
    this.wrapped = value;
}
exports.default = _AwaitValue;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"aFowE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {
    }, waiting = false;
    function pump(key, value) {
        waiting = true;
        value = new Promise(function(resolve) {
            resolve(inner[key](value));
        });
        return {
            done: false,
            value: awaitWrap(value)
        };
    }
    if (typeof Symbol === "function" && Symbol.iterator) iter[Symbol.iterator] = function() {
        return this;
    };
    iter.next = function(value) {
        if (waiting) {
            waiting = false;
            return value;
        }
        return pump("next", value);
    };
    if (typeof inner.throw === "function") iter.throw = function(value) {
        if (waiting) {
            waiting = false;
            throw value;
        }
        return pump("throw", value);
    };
    if (typeof inner.return === "function") iter.return = function(value) {
        return pump("return", value);
    };
    return iter;
}
exports.default = _asyncGeneratorDelegate;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kDn5G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _asyncIterator(iterable) {
    var method;
    if (typeof Symbol === "function") {
        if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
        }
        if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
        }
    }
    throw new TypeError("Object is not async iterable");
}
exports.default = _asyncIterator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"69ywl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
exports.default = _asyncToGenerator;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"47kVK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _awaitValue = require("./_await_value");
var _awaitValueDefault = parcelHelpers.interopDefault(_awaitValue);
function _awaitAsyncGenerator(value) {
    return new _awaitValueDefault.default(value);
}
exports.default = _awaitAsyncGenerator;

},{"./_await_value":"kOPdt","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5thSN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
exports.default = _classCallCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kLeIP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}
exports.default = _classNameTDZError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hiZIF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver).value;
}
exports.default = _classPrivateFieldGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"iIxKI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) throw new TypeError("attempted to use private field on non-instance");
    return receiver;
}
exports.default = _classPrivateFieldBase;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3aItm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    var descriptor = privateMap.get(receiver);
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classPrivateFieldSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"gKMrA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
exports.default = _classPrivateMethodGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jDhxx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
}
exports.default = _classPrivateMethodSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"79XlC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    return descriptor.value;
}
exports.default = _classStaticPrivateFieldSpecGet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hKsVp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) throw new TypeError("Private static access of wrong provenance");
    if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
    return value;
}
exports.default = _classStaticPrivateFieldSpecSet;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"bLTlt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function construct(Parent1, args1, Class1) {
    if (isNativeReflectConstruct()) construct = Reflect.construct;
    else construct = function construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
    };
    return construct.apply(null, arguments);
}
function _construct(Parent, args, Class) {
    return construct.apply(null, arguments);
}
exports.default = _construct;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"cMLkg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
exports.default = _createClass;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5M3uX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _toArray = require("./_to_array");
var _toArrayDefault = parcelHelpers.interopDefault(_toArray);
var _toPropertyKey = require("./_to_property_key");
var _toPropertyKeyDefault = parcelHelpers.interopDefault(_toPropertyKey);
function _decorate(decorators, factory, superClass) {
    var r = factory(function initialize(O) {
        _initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
    _initializeClassElements(r.F, decorated.elements);
    return _runClassFinishers(r.F, decorated.finishers);
}
exports.default = _decorate;
function _createElementDescriptor(def) {
    var key = _toPropertyKeyDefault.default(def.key);
    var descriptor;
    if (def.kind === "method") {
        descriptor = {
            value: def.value,
            writable: true,
            configurable: true,
            enumerable: false
        };
        Object.defineProperty(def.value, "name", {
            value: _typeof(key) === "symbol" ? "" : key,
            configurable: true
        });
    } else if (def.kind === "get") descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
    };
    else if (def.kind === "set") descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
    };
    else if (def.kind === "field") descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
    };
    var element = {
        kind: def.kind === "field" ? "field" : "method",
        key: key,
        placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
        descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;
    return element;
}
function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) other.descriptor.get = element.descriptor.get;
    else other.descriptor.set = element.descriptor.set;
}
function _coalesceClassElements(elements) {
    var newElements = [];
    var isSameElement = function isSameElement(other) {
        return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };
    for(var i = 0; i < elements.length; i++){
        var element = elements[i];
        var other1;
        if (element.kind === "method" && (other1 = newElements.find(isSameElement))) {
            if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other1.descriptor)) {
                if (_hasDecorators(element) || _hasDecorators(other1)) throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
                other1.descriptor = element.descriptor;
            } else {
                if (_hasDecorators(element)) {
                    if (_hasDecorators(other1)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + element.key + ").");
                    other1.decorators = element.decorators;
                }
                _coalesceGetterSetter(element, other1);
            }
        } else newElements.push(element);
    }
    return newElements;
}
function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
}
function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}
function _initializeClassElements(F, elements) {
    var proto = F.prototype;
    [
        "method",
        "field"
    ].forEach(function(kind) {
        elements.forEach(function(element) {
            var placement = element.placement;
            if (element.kind === kind && (placement === "static" || placement === "prototype")) {
                var receiver = placement === "static" ? F : proto;
                _defineClassElement(receiver, element);
            }
        });
    });
}
function _initializeInstanceElements(O, elements) {
    [
        "method",
        "field"
    ].forEach(function(kind) {
        elements.forEach(function(element) {
            if (element.kind === kind && element.placement === "own") _defineClassElement(O, element);
        });
    });
}
function _defineClassElement(receiver, element) {
    var descriptor = element.descriptor;
    if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
    }
    Object.defineProperty(receiver, element.key, descriptor);
}
function _decorateClass(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var placements = {
        static: [],
        prototype: [],
        own: []
    };
    elements.forEach(function(element) {
        _addElementPlacement(element, placements);
    });
    elements.forEach(function(element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = _decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
    });
    if (!decorators) return {
        elements: newElements,
        finishers: finishers
    };
    var result = _decorateConstructor(newElements, decorators);
    finishers.push.apply(finishers, result.finishers);
    result.finishers = finishers;
    return result;
}
function _addElementPlacement(element, placements, silent) {
    var keys = placements[element.placement];
    if (!silent && keys.indexOf(element.key) !== -1) throw new TypeError("Duplicated element (" + element.key + ")");
    keys.push(element.key);
}
function _decorateElement(element, placements) {
    var extras = [];
    var finishers = [];
    for(var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--){
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = _fromElementDescriptor(element);
        var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        _addElementPlacement(element, placements);
        if (elementFinisherExtras.finisher) finishers.push(elementFinisherExtras.finisher);
        var newExtras = elementFinisherExtras.extras;
        if (newExtras) {
            for(var j = 0; j < newExtras.length; j++)_addElementPlacement(newExtras[j], placements);
            extras.push.apply(extras, newExtras);
        }
    }
    return {
        element: element,
        finishers: finishers,
        extras: extras
    };
}
function _decorateConstructor(elements, decorators) {
    var finishers = [];
    for(var i = decorators.length - 1; i >= 0; i--){
        var obj = _fromClassDescriptor(elements);
        var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj);
        if (elementsAndFinisher.finisher !== undefined) finishers.push(elementsAndFinisher.finisher);
        if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;
            for(var j = 0; j < elements.length - 1; j++)for(var k = j + 1; k < elements.length; k++){
                if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) throw new TypeError("Duplicated element (" + elements[j].key + ")");
            }
        }
    }
    return {
        elements: elements,
        finishers: finishers
    };
}
function _fromElementDescriptor(element) {
    var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
    };
    var desc = {
        value: "Descriptor",
        configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    if (element.kind === "field") obj.initializer = element.initializer;
    return obj;
}
function _toElementDescriptors(elementObjects) {
    if (elementObjects === undefined) return;
    return _toArrayDefault.default(elementObjects).map(function(elementObject) {
        var element = _toElementDescriptor(elementObject);
        _disallowProperty(elementObject, "finisher", "An element descriptor");
        _disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
    });
}
function _toElementDescriptor(elementObject) {
    var kind = String(elementObject.kind);
    if (kind !== "method" && kind !== "field") throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + kind + '"');
    var key = _toPropertyKeyDefault.default(elementObject.key);
    var placement = String(elementObject.placement);
    if (placement !== "static" && placement !== "prototype" && placement !== "own") throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + placement + '"');
    var descriptor = elementObject.descriptor;
    _disallowProperty(elementObject, "elements", "An element descriptor");
    var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({
        }, descriptor)
    };
    if (kind !== "field") _disallowProperty(elementObject, "initializer", "A method descriptor");
    else {
        _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
    }
    return element;
}
function _toElementFinisherExtras(elementObject) {
    var element = _toElementDescriptor(elementObject);
    var finisher = _optionalCallableProperty(elementObject, "finisher");
    var extras = _toElementDescriptors(elementObject.extras);
    return {
        element: element,
        finisher: finisher,
        extras: extras
    };
}
function _fromClassDescriptor(elements) {
    var obj = {
        kind: "class",
        elements: elements.map(_fromElementDescriptor)
    };
    var desc = {
        value: "Descriptor",
        configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    return obj;
}
function _toClassDescriptor(obj) {
    var kind = String(obj.kind);
    if (kind !== "class") throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + kind + '"');
    _disallowProperty(obj, "key", "A class descriptor");
    _disallowProperty(obj, "placement", "A class descriptor");
    _disallowProperty(obj, "descriptor", "A class descriptor");
    _disallowProperty(obj, "initializer", "A class descriptor");
    _disallowProperty(obj, "extras", "A class descriptor");
    var finisher = _optionalCallableProperty(obj, "finisher");
    var elements = _toElementDescriptors(obj.elements);
    return {
        elements: elements,
        finisher: finisher
    };
}
function _disallowProperty(obj, name, objectType) {
    if (obj[name] !== undefined) throw new TypeError(objectType + " can't have a ." + name + " property.");
}
function _optionalCallableProperty(obj, name) {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") throw new TypeError("Expected '" + name + "' to be a function");
    return value;
}
function _runClassFinishers(constructor, finishers) {
    for(var i = 0; i < finishers.length; i++){
        var newConstructor = (0, finishers[i])(constructor);
        if (newConstructor !== undefined) {
            if (typeof newConstructor !== "function") throw new TypeError("Finishers must return a constructor.");
            constructor = newConstructor;
        }
    }
    return constructor;
}

},{"./_to_array":"lrbT1","./_to_property_key":"d5hF2","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lrbT1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _toArray(arr) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayDefault.default(arr) || _nonIterableRestDefault.default();
}
exports.default = _toArray;

},{"./_array_with_holes":"f2RVY","./_iterable_to_array":"lY6Yg","./_non_iterable_rest":"d6ywz","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lY6Yg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
exports.default = _iterableToArray;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d6ywz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
exports.default = _nonIterableRest;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d5hF2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
var _toPrimitive = require("./_to_primitive");
var _toPrimitiveDefault = parcelHelpers.interopDefault(_toPrimitive);
function _toPropertyKey(arg) {
    var key = _toPrimitiveDefault.default(arg, "string");
    return _typeOfDefault.default(key) === "symbol" ? key : String(key);
}
exports.default = _toPropertyKey;

},{"./_type_of":"hGmQp","./_to_primitive":"aO5VI","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hGmQp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _typeof(obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}
exports.default = _typeof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"aO5VI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
function _toPrimitive(input, hint) {
    if (_typeOfDefault.default(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeOfDefault.default(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
exports.default = _toPrimitive;

},{"./_type_of":"hGmQp","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jPoWh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) Object.defineProperty(obj, key, value);
    }
    return obj;
}
exports.default = _defaults;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"8xWnI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineEnumerableProperties(obj, descs) {
    for(var key in descs){
        var desc = descs[key];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, key, desc);
    }
    if (Object.getOwnPropertySymbols) {
        var objectSymbols = Object.getOwnPropertySymbols(descs);
        for(var i = 0; i < objectSymbols.length; i++){
            var sym = objectSymbols[i];
            var desc = descs[sym];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, sym, desc);
        }
    }
    return obj;
}
exports.default = _defineEnumerableProperties;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"c7yiB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
exports.default = _defineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"by2GU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}
exports.default = _extends;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d3ZpD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
function get(target1, property1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.get) get = Reflect.get;
    else get = function get(target, property, receiver) {
        var base = _superPropBaseDefault.default(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(receiver || target);
        return desc.value;
    };
    return get(target1, property1, receiver1);
}
function _get(target, property, reciever) {
    return get(target, property, reciever);
}
exports.default = _get;

},{"./_super_prop_base":"lGKRS","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lGKRS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOfDefault.default(object);
        if (object === null) break;
    }
    return object;
}
exports.default = _superPropBase;

},{"./_get_prototype_of":"4Z2sn","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4Z2sn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getPrototypeOf(o1) {
    getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return getPrototypeOf(o1);
}
function _getPrototypeOf(o) {
    return getPrototypeOf(o);
}
exports.default = _getPrototypeOf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hoEyE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOfDefault.default(subClass, superClass);
}
exports.default = _inherits;

},{"./_set_prototype_of":"hkEkh","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"hkEkh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function setPrototypeOf(o1, p1) {
    setPrototypeOf = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return setPrototypeOf(o1, p1);
}
function _setPrototypeOf(o, p) {
    return setPrototypeOf(o, p);
}
exports.default = _setPrototypeOf;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"bpWmo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
exports.default = _inheritsLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"5WZDp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
exports.default = _initializerDefineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"GCE4p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _initializerWarningHelper(descriptor, context) {
    throw new Error("Decorating class property failed. Please ensure that proposal-class-properties is enabled and set to use loose mode. To use proposal-class-properties in spec mode with decorators, wait for the next major version of decorators in stage 2.");
}
exports.default = _initializerWarningHelper;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"j6WhW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) return right[Symbol.hasInstance](left);
    else return left instanceof right;
}
exports.default = _instanceof;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9sQ50":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports.default = _interopRequireDefault;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"ejKpM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                };
                if (desc.get || desc.set) Object.defineProperty(newObj, key, desc);
                else newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
exports.default = _interopRequireWildcard;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"8d7fi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
exports.default = _isNativeFunction;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"61jYg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
exports.default = _iterableToArrayLimit;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"bvfpN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArrayLimitLoose(arr, i) {
    var _arr = [];
    for(var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;){
        _arr.push(_step.value);
        if (i && _arr.length === i) break;
    }
    return _arr;
}
exports.default = _iterableToArrayLimitLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"9hq6e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var REACT_ELEMENT_TYPE;
function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 60103;
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;
    if (!props && childrenLength !== 0) props = {
        children: void 0
    };
    if (props && defaultProps) {
        for(var propName in defaultProps)if (props[propName] === void 0) props[propName] = defaultProps[propName];
    } else if (!props) props = defaultProps || {
    };
    if (childrenLength === 1) props.children = children;
    else if (childrenLength > 1) {
        var childArray = new Array(childrenLength);
        for(var i = 0; i < childrenLength; i++)childArray[i] = arguments[i + 3];
        props.children = childArray;
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key === undefined ? null : '' + key,
        ref: null,
        props: props,
        _owner: null
    };
}
exports.default = _createRawReactElement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4VyBi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) throw new TypeError("Cannot instantiate an arrow function");
}
exports.default = _newArrowCheck;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"29F6O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
exports.default = _nonIterableSpread;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"jaxa1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            _definePropertyDefault.default(target, key, source[key]);
        });
    }
    return target;
}
exports.default = _objectSpread;

},{"./_define_property":"c7yiB","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"eJaOZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _objectWithoutPropertiesLoose = require("./_object_without_properties_loose");
var _objectWithoutPropertiesLooseDefault = parcelHelpers.interopDefault(_objectWithoutPropertiesLoose);
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {
    };
    var target = _objectWithoutPropertiesLooseDefault.default(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
exports.default = _objectWithoutProperties;

},{"./_object_without_properties_loose":"6eqIr","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"6eqIr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {
    };
    var target = {
    };
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
exports.default = _objectWithoutPropertiesLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"cWetj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _assertThisInitialized = require("./_assert_this_initialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _typeOf = require("./_type_of");
var _typeOfDefault = parcelHelpers.interopDefault(_typeOf);
function _possibleConstructorReturn(self, call) {
    if (call && (_typeOfDefault.default(call) === "object" || typeof call === "function")) return call;
    return _assertThisInitializedDefault.default(self);
}
exports.default = _possibleConstructorReturn;

},{"./_assert_this_initialized":"hb0Uz","./_type_of":"hGmQp","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3xmWo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
}
exports.default = _readOnlyError;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kehyh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _defineProperty = require("./_define_property");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _superPropBase = require("./_super_prop_base");
var _superPropBaseDefault = parcelHelpers.interopDefault(_superPropBase);
function set(target1, property1, value1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.set) set = Reflect.set;
    else set = function set(target, property, value, receiver) {
        var base = _superPropBaseDefault.default(target, property);
        var desc;
        if (base) {
            desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.set) {
                desc.set.call(receiver, value);
                return true;
            } else if (!desc.writable) return false;
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
            if (!desc.writable) return false;
            desc.value = value;
            Object.defineProperty(receiver, property, desc);
        } else _definePropertyDefault.default(receiver, property, value);
        return true;
    };
    return set(target1, property1, value1, receiver1);
}
function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) throw new Error('failed to set property');
    return value;
}
exports.default = _set;

},{"./_define_property":"c7yiB","./_super_prop_base":"lGKRS","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"lqj0R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _skipFirstGeneratorNext(fn) {
    return function() {
        var it = fn.apply(this, arguments);
        it.next();
        return it;
    };
}
exports.default = _skipFirstGeneratorNext;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"k8UMw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _slicedToArray(arr, i) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayDefault.default(arr, i) || _nonIterableRestDefault.default();
}
exports.default = _slicedToArray;

},{"./_array_with_holes":"f2RVY","./_iterable_to_array":"lY6Yg","./_non_iterable_rest":"d6ywz","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"7tjhK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHoles = require("./_array_with_holes");
var _arrayWithHolesDefault = parcelHelpers.interopDefault(_arrayWithHoles);
var _iterableToArrayLimitLoose = require("./_iterable_to_array_limit_loose");
var _iterableToArrayLimitLooseDefault = parcelHelpers.interopDefault(_iterableToArrayLimitLoose);
var _nonIterableRest = require("./_non_iterable_rest");
var _nonIterableRestDefault = parcelHelpers.interopDefault(_nonIterableRest);
function _slicedToArrayLoose(arr, i) {
    return _arrayWithHolesDefault.default(arr) || _iterableToArrayLimitLooseDefault.default(arr, i) || _nonIterableRestDefault.default();
}
exports.default = _slicedToArrayLoose;

},{"./_array_with_holes":"f2RVY","./_iterable_to_array_limit_loose":"bvfpN","./_non_iterable_rest":"d6ywz","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"d3FCJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) raw = strings.slice(0);
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
exports.default = _taggedTemplateLiteral;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"fbTUf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) raw = strings.slice(0);
    strings.raw = raw;
    return strings;
}
exports.default = _taggedTemplateLiteralLoose;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"89Ibv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _throw(e) {
    throw e;
}
exports.default = _throw;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3TaI4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithoutHoles = require("./_array_without_holes");
var _arrayWithoutHolesDefault = parcelHelpers.interopDefault(_arrayWithoutHoles);
var _iterableToArray = require("./_iterable_to_array");
var _iterableToArrayDefault = parcelHelpers.interopDefault(_iterableToArray);
var _nonIterableSpread = require("./_non_iterable_spread");
var _nonIterableSpreadDefault = parcelHelpers.interopDefault(_nonIterableSpread);
function _toConsumableArray(arr) {
    return _arrayWithoutHolesDefault.default(arr) || _iterableToArrayDefault.default(arr) || _nonIterableSpreadDefault.default();
}
exports.default = _toConsumableArray;

},{"./_array_without_holes":"9G5hu","./_iterable_to_array":"lY6Yg","./_non_iterable_spread":"29F6O","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kfhw9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _asyncGenerator = require("./_async_generator");
var _asyncGeneratorDefault = parcelHelpers.interopDefault(_asyncGenerator);
function _wrapAsyncGenerator(fn) {
    return function() {
        return new _asyncGeneratorDefault.default(fn.apply(this, arguments));
    };
}
exports.default = _wrapAsyncGenerator;

},{"./_async_generator":"3e3Cq","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"2wCpr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _construct = require("./_construct");
var _constructDefault = parcelHelpers.interopDefault(_construct);
var _isNativeFunction = require("./_is_native_function");
var _isNativeFunctionDefault = parcelHelpers.interopDefault(_isNativeFunction);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _setPrototypeOf = require("./_set_prototype_of");
var _setPrototypeOfDefault = parcelHelpers.interopDefault(_setPrototypeOf);
function wrapNativeSuper(Class1) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    wrapNativeSuper = function wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunctionDefault.default(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _constructDefault.default(Class, arguments, _getPrototypeOfDefault.default(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOfDefault.default(Wrapper, Class);
    };
    return wrapNativeSuper(Class1);
}
function _wrapNativeSuper(Class) {
    return wrapNativeSuper(Class);
}
exports.default = _wrapNativeSuper;

},{"./_construct":"bLTlt","./_is_native_function":"8d7fi","./_get_prototype_of":"4Z2sn","./_set_prototype_of":"hkEkh","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"inTdM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _isNativeReflectConstruct = require("./_is_native_reflect_construct");
var _isNativeReflectConstructDefault = parcelHelpers.interopDefault(_isNativeReflectConstruct);
var _getPrototypeOf = require("./_get_prototype_of");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _possibleConstructorReturn = require("./_possible_constructor_return");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstructDefault.default();
    return function _createSuperInternal() {
        var Super = _getPrototypeOfDefault.default(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOfDefault.default(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturnDefault.default(this, result);
    };
}
exports.default = _createSuper;

},{"./_is_native_reflect_construct":"b8vXc","./_get_prototype_of":"4Z2sn","./_possible_constructor_return":"cWetj","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"b8vXc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
exports.default = _isNativeReflectConstruct;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"cB5bs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HexagonalBokeh", function() {
    return HexagonalBokeh;
});
var _helpers = require("@swc/helpers");
var _glMatrix = require("gl-matrix");
var _orbitControl = require("./orbit-control");
var _noise = require("./noise");
var _drawVert = require("./shader/draw.vert");
var _drawVertDefault = parcelHelpers.interopDefault(_drawVert);
var _drawFrag = require("./shader/draw.frag");
var _drawFragDefault = parcelHelpers.interopDefault(_drawFrag);
var _portalVert = require("./shader/portal.vert");
var _portalVertDefault = parcelHelpers.interopDefault(_portalVert);
var _portalFrag = require("./shader/portal.frag");
var _portalFragDefault = parcelHelpers.interopDefault(_portalFrag);
var _compositeVert = require("./shader/composite.vert");
var _compositeVertDefault = parcelHelpers.interopDefault(_compositeVert);
var _compositeFrag = require("./shader/composite.frag");
var _compositeFragDefault = parcelHelpers.interopDefault(_compositeFrag);
var _hexBlur1Vert = require("./shader/hex-blur-1.vert");
var _hexBlur1VertDefault = parcelHelpers.interopDefault(_hexBlur1Vert);
var _hexBlur1Frag = require("./shader/hex-blur-1.frag");
var _hexBlur1FragDefault = parcelHelpers.interopDefault(_hexBlur1Frag);
var _hexBlur2Vert = require("./shader/hex-blur-2.vert");
var _hexBlur2VertDefault = parcelHelpers.interopDefault(_hexBlur2Vert);
var _hexBlur2Frag = require("./shader/hex-blur-2.frag");
var _hexBlur2FragDefault = parcelHelpers.interopDefault(_hexBlur2Frag);
var _render = new WeakSet(), _renderBlurPass = new WeakSet(), _init = new WeakSet(), _createXYPlaneGeometry = new WeakSet(), _createBuffer = new WeakSet(), _initOrbitControls = new WeakSet(), _createFramebuffer = new WeakSet(), _makeVertexArray = new WeakSet(), _createShader = new WeakSet(), _createProgram = new WeakSet(), _setFramebuffer = new WeakSet(), _createAndSetupTexture = new WeakSet(), _resizeTextures = new WeakSet(), _updateCameraMatrix = new WeakSet(), _updateProjectionMatrix = new WeakSet(), _resizeCanvasToDisplaySize = new WeakSet(), _initTweakpane = new WeakSet(), _createTweakpaneSlider = new WeakSet();
var HexagonalBokeh = /*#__PURE__*/ function() {
    "use strict";
    function HexagonalBokeh(canvas, pane) {
        var oninit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        _helpers.classCallCheck(this, HexagonalBokeh);
        _helpers.defineProperty(this, "oninit", void 0);
        _time.set(this, {
            writable: true,
            value: 0
        });
        _frames.set(this, {
            writable: true,
            value: 0
        });
        _deltaTime.set(this, {
            writable: true,
            value: 0
        });
        _isDestroyed.set(this, {
            writable: true,
            value: false
        });
        _helpers.defineProperty(this, "camera", {
            matrix: _glMatrix.mat4.create(),
            near: 80,
            far: 350,
            distance: 150,
            orbit: _glMatrix.quat.create(),
            position: _glMatrix.vec3.create(),
            rotation: _glMatrix.vec3.create(),
            up: _glMatrix.vec3.fromValues(0, 1, 0)
        });
        _helpers.defineProperty(this, "blur", {
            radius: 7,
            scale: 2
        });
        _render.add(this);
        _renderBlurPass.add(this);
        _init.add(this);
        _createXYPlaneGeometry.add(this);
        _createBuffer.add(this);
        _initOrbitControls.add(this);
        _createFramebuffer.add(this);
        _makeVertexArray.add(this);
        _createShader.add(this);
        _createProgram.add(this);
        _setFramebuffer.add(this);
        _createAndSetupTexture.add(this);
        _resizeTextures.add(this);
        _updateCameraMatrix.add(this);
        _updateProjectionMatrix.add(this);
        _resizeCanvasToDisplaySize.add(this);
        _initTweakpane.add(this);
        _createTweakpaneSlider.add(this);
        this.canvas = canvas;
        this.pane = pane;
        this.oninit = oninit;
        _helpers.classPrivateMethodGet(this, _init, init).call(this);
    }
    _helpers.createClass(HexagonalBokeh, [
        {
            key: "resize",
            value: function resize() {
                var gl = this.gl;
                _helpers.classPrivateMethodGet(this, _resizeCanvasToDisplaySize, resizeCanvasToDisplaySize).call(this, gl.canvas);
                // When you need to set the viewport to match the size of the canvas's
                // drawingBuffer this will always be correct
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                // resize the framebuffer textures
                _helpers.classPrivateMethodGet(this, _resizeTextures, resizeTextures).call(this, gl);
                _helpers.classPrivateMethodGet(this, _updateProjectionMatrix, updateProjectionMatrix).call(this, gl);
            }
        },
        {
            key: "run",
            value: function run() {
                var time = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var _this = this;
                _helpers.classPrivateFieldSet(this, _deltaTime, time - _helpers.classPrivateFieldGet(this, _time));
                _helpers.classPrivateFieldSet(this, _time, time);
                _helpers.classPrivateFieldSet(this, _frames, _helpers.classPrivateFieldGet(this, _frames) + _helpers.classPrivateFieldGet(this, _deltaTime) / 16);
                if (_helpers.classPrivateFieldGet(this, _isDestroyed)) return;
                this.control.update();
                var worldInvers = _glMatrix.mat4.create();
                _glMatrix.mat4.invert(worldInvers, this.drawUniforms.u_worldMatrix);
                _glMatrix.mat4.transpose(this.drawUniforms.u_worldInverseTransposeMatrix, worldInvers);
                _helpers.classPrivateMethodGet(this, _render, render).call(this);
                requestAnimationFrame(function(t) {
                    return _this.run(t);
                });
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                _helpers.classPrivateFieldSet(this, _isDestroyed, true);
            }
        }
    ]);
    return HexagonalBokeh;
}();
var _time = new WeakMap();
var _frames = new WeakMap();
var _deltaTime = new WeakMap();
var _isDestroyed = new WeakMap();
function render() {
    /** @type {WebGLRenderingContext} */ var gl = this.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    // draw depth and color 
    _helpers.classPrivateMethodGet(this, _setFramebuffer, setFramebuffer).call(this, gl, this.drawFramebuffer, this.drawFramebufferWidth, this.drawFramebufferHeight);
    gl.useProgram(this.drawProgram);
    gl.bindVertexArray(this.objectVAO);
    gl.uniformMatrix4fv(this.drawLocations.u_worldMatrix, false, this.drawUniforms.u_worldMatrix);
    gl.uniformMatrix4fv(this.drawLocations.u_viewMatrix, false, this.drawUniforms.u_viewMatrix);
    gl.uniformMatrix4fv(this.drawLocations.u_projectionMatrix, false, this.drawUniforms.u_projectionMatrix);
    gl.uniformMatrix4fv(this.drawLocations.u_worldInverseTransposeMatrix, false, this.drawUniforms.u_worldInverseTransposeMatrix);
    gl.uniform3f(this.drawLocations.u_cameraPosition, this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    gl.uniform1f(this.drawLocations.u_frames, _helpers.classPrivateFieldGet(this, _frames));
    gl.clearBufferfv(gl.COLOR, 0, [
        0,
        0,
        0,
        0
    ]);
    gl.clearBufferfv(gl.DEPTH, 0, [
        1
    ]);
    gl.drawElements(gl.TRIANGLES, this.objectBuffers.numElem, gl.UNSIGNED_SHORT, 0);
    // draw the portal triangle on top
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.SRC_COLOR);
    gl.blendEquation(gl.FUNC_SUBTRACT);
    gl.useProgram(this.portalProgram);
    gl.bindVertexArray(this.centerObjectVAO);
    gl.uniformMatrix4fv(this.portalLocations.u_worldMatrix, false, this.portalUniforms.u_worldMatrix);
    gl.uniformMatrix4fv(this.portalLocations.u_viewMatrix, false, this.drawUniforms.u_viewMatrix);
    gl.uniformMatrix4fv(this.portalLocations.u_projectionMatrix, false, this.drawUniforms.u_projectionMatrix);
    gl.uniform1f(this.portalLocations.u_frames, _helpers.classPrivateFieldGet(this, _frames));
    gl.drawArrays(gl.TRIANGLES, 0, this.centerObjectBuffers.numElem);
    gl.disable(gl.BLEND);
    _helpers.classPrivateMethodGet(this, _setFramebuffer, setFramebuffer).call(this, gl, null, gl.drawingBufferWidth, gl.drawingBufferHeight);
    // blit depth and color
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.drawFramebuffer);
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.blitFramebuffer);
    gl.clearBufferfv(gl.COLOR, 0, [
        0,
        0,
        0,
        1
    ]);
    gl.clearBufferfv(gl.DEPTH, 0, [
        0
    ]);
    gl.blitFramebuffer(0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, gl.COLOR_BUFFER_BIT, gl.NEAREST);
    gl.blitFramebuffer(0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, 0, this.drawFramebufferWidth, this.drawFramebufferHeight, gl.DEPTH_BUFFER_BIT, gl.NEAREST);
    _helpers.classPrivateMethodGet(this, _setFramebuffer, setFramebuffer).call(this, gl, null, gl.drawingBufferWidth, gl.drawingBufferHeight);
    // render first blur pass
    _helpers.classPrivateMethodGet(this, _renderBlurPass, renderBlurPass).call(this, this.hexBlur1Framebuffer, this.drawFramebufferWidth, this.drawFramebufferHeight, this.hexBlur1Program, [
        [
            this.hexBlur1Locations.u_colorTexture,
            this.colorTexture
        ],
        [
            this.hexBlur1Locations.u_depthTexture,
            this.depthTexture
        ]
    ], [
        [
            this.hexBlur1Locations.u_radiusScale,
            this.blur.scale
        ]
    ], [
        [
            this.hexBlur1Locations.u_maxCoCRadius,
            this.blur.radius
        ]
    ]);
    // render second blur pass
    _helpers.classPrivateMethodGet(this, _renderBlurPass, renderBlurPass).call(this, this.hexBlur2Framebuffer, this.drawFramebufferWidth, this.drawFramebufferHeight, this.hexBlur2Program, [
        [
            this.hexBlur2Locations.u_verticalBlurTexture,
            this.hex1VerticalBlurTexture
        ],
        [
            this.hexBlur2Locations.u_diagonalBlurTexture,
            this.hex1DiagonalBlurTexture
        ],
        [
            this.hexBlur2Locations.u_depthTexture,
            this.depthTexture
        ]
    ], [
        [
            this.hexBlur2Locations.u_radiusScale,
            this.blur.scale
        ]
    ], [
        [
            this.hexBlur2Locations.u_maxCoCRadius,
            this.blur.radius
        ]
    ]);
    // draw to the canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.compositeProgram);
    gl.bindVertexArray(this.quadVAO);
    gl.uniform1i(this.compositeLocations.u_texture, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.hex2BlurTexture);
    gl.drawArrays(gl.TRIANGLES, 0, this.quadBuffers.numElem);
}
function renderBlurPass(fbo, w, h, program, locTex) {
    var locFloat = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], locInt = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : [];
    /** @type {WebGLRenderingContext} */ var gl = this.gl;
    _helpers.classPrivateMethodGet(this, _setFramebuffer, setFramebuffer).call(this, gl, fbo, w, h);
    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindVertexArray(this.quadVAO);
    locTex.forEach(function(param, ndx) {
        var _param = _helpers.slicedToArray(param, 2), loc = _param[0], texture = _param[1];
        gl.uniform1i(loc, ndx);
        gl.activeTexture(gl["TEXTURE".concat(ndx)]);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    });
    locFloat.forEach(function(param) {
        var _param = _helpers.slicedToArray(param, 2), loc = _param[0], value = _param[1];
        gl.uniform1f(loc, value);
    });
    locInt.forEach(function(param) {
        var _param = _helpers.slicedToArray(param, 2), loc = _param[0], value = _param[1];
        gl.uniform1i(loc, value);
    });
    gl.drawArrays(gl.TRIANGLES, 0, this.quadBuffers.numElem);
    _helpers.classPrivateMethodGet(this, _setFramebuffer, setFramebuffer).call(this, gl, null, gl.drawingBufferWidth, gl.drawingBufferHeight);
}
function init() {
    this.gl = this.canvas.getContext('webgl2', {
        antialias: false,
        alpha: false
    });
    /** @type {WebGLRenderingContext} */ var gl = this.gl;
    if (!gl) throw new Error('No WebGL 2 context!');
    ///////////////////////////////////  PROGRAM SETUP
    // setup programs
    this.drawProgram = _helpers.classPrivateMethodGet(this, _createProgram, createProgram).call(this, gl, [
        _drawVertDefault.default,
        _drawFragDefault.default
    ], null, {
        a_position: 0,
        a_normal: 1,
        a_uv: 2
    });
    this.portalProgram = _helpers.classPrivateMethodGet(this, _createProgram, createProgram).call(this, gl, [
        _portalVertDefault.default,
        _portalFragDefault.default
    ], null, {
        a_position: 0,
        a_uv: 2
    });
    this.hexBlur1Program = _helpers.classPrivateMethodGet(this, _createProgram, createProgram).call(this, gl, [
        _hexBlur1VertDefault.default,
        _hexBlur1FragDefault.default
    ], null, {
        a_position: 0
    });
    this.hexBlur2Program = _helpers.classPrivateMethodGet(this, _createProgram, createProgram).call(this, gl, [
        _hexBlur2VertDefault.default,
        _hexBlur2FragDefault.default
    ], null, {
        a_position: 0
    });
    this.compositeProgram = _helpers.classPrivateMethodGet(this, _createProgram, createProgram).call(this, gl, [
        _compositeVertDefault.default,
        _compositeFragDefault.default
    ], null, {
        a_position: 0
    });
    // find the locations
    this.drawLocations = {
        a_position: gl.getAttribLocation(this.drawProgram, 'a_position'),
        a_normal: gl.getAttribLocation(this.drawProgram, 'a_normal'),
        a_uv: gl.getAttribLocation(this.drawProgram, 'a_uv'),
        u_worldMatrix: gl.getUniformLocation(this.drawProgram, 'u_worldMatrix'),
        u_viewMatrix: gl.getUniformLocation(this.drawProgram, 'u_viewMatrix'),
        u_projectionMatrix: gl.getUniformLocation(this.drawProgram, 'u_projectionMatrix'),
        u_worldInverseTransposeMatrix: gl.getUniformLocation(this.drawProgram, 'u_worldInverseTransposeMatrix'),
        u_cameraPosition: gl.getUniformLocation(this.drawProgram, 'u_cameraPosition'),
        u_frames: gl.getUniformLocation(this.drawProgram, 'u_frames')
    };
    this.portalLocations = {
        a_position: gl.getAttribLocation(this.portalProgram, 'a_position'),
        a_uv: gl.getAttribLocation(this.portalProgram, 'a_uv'),
        u_worldMatrix: gl.getUniformLocation(this.portalProgram, 'u_worldMatrix'),
        u_viewMatrix: gl.getUniformLocation(this.portalProgram, 'u_viewMatrix'),
        u_projectionMatrix: gl.getUniformLocation(this.portalProgram, 'u_projectionMatrix'),
        u_frames: gl.getUniformLocation(this.portalProgram, 'u_frames')
    };
    this.hexBlur1Locations = {
        a_position: gl.getAttribLocation(this.hexBlur1Program, 'a_position'),
        u_colorTexture: gl.getUniformLocation(this.hexBlur1Program, 'u_colorTexture'),
        u_depthTexture: gl.getUniformLocation(this.hexBlur1Program, 'u_depthTexture'),
        u_maxCoCRadius: gl.getUniformLocation(this.hexBlur1Program, 'u_maxCoCRadius'),
        u_radiusScale: gl.getUniformLocation(this.hexBlur1Program, 'u_radiusScale')
    };
    this.hexBlur2Locations = {
        a_position: gl.getAttribLocation(this.hexBlur2Program, 'a_position'),
        u_verticalBlurTexture: gl.getUniformLocation(this.hexBlur2Program, 'u_verticalBlurTexture'),
        u_diagonalBlurTexture: gl.getUniformLocation(this.hexBlur2Program, 'u_diagonalBlurTexture'),
        u_depthTexture: gl.getUniformLocation(this.hexBlur2Program, 'u_depthTexture'),
        u_maxCoCRadius: gl.getUniformLocation(this.hexBlur2Program, 'u_maxCoCRadius'),
        u_radiusScale: gl.getUniformLocation(this.hexBlur2Program, 'u_radiusScale')
    };
    this.compositeLocations = {
        a_position: gl.getAttribLocation(this.compositeProgram, 'a_position'),
        u_texture: gl.getUniformLocation(this.compositeProgram, 'u_texture')
    };
    // setup uniforms
    this.drawUniforms = {
        u_worldMatrix: _glMatrix.mat4.create(),
        u_viewMatrix: _glMatrix.mat4.create(),
        u_projectionMatrix: _glMatrix.mat4.create(),
        u_worldInverseTransposeMatrix: _glMatrix.mat4.create()
    };
    _glMatrix.mat4.rotate(this.drawUniforms.u_worldMatrix, this.drawUniforms.u_worldMatrix, -Math.PI / 2, [
        1,
        0,
        0
    ]);
    _glMatrix.mat4.scale(this.drawUniforms.u_worldMatrix, this.drawUniforms.u_worldMatrix, [
        50,
        50,
        50
    ]);
    _glMatrix.mat4.translate(this.drawUniforms.u_worldMatrix, this.drawUniforms.u_worldMatrix, [
        0,
        0,
        0
    ]);
    this.portalUniforms = {
        u_worldMatrix: _glMatrix.mat4.create()
    };
    _glMatrix.mat4.translate(this.portalUniforms.u_worldMatrix, this.portalUniforms.u_worldMatrix, [
        0,
        5,
        0
    ]);
    /////////////////////////////////// GEOMETRY / MESH SETUP
    // create object VAO
    var size = 8;
    this.objectGeometry = _helpers.classPrivateMethodGet(this, _createXYPlaneGeometry, createXYPlaneGeometry).call(this, size, size, 110, 110, function(p) {
        var maxHeight = 0.4;
        var scale = 0.9;
        var n = _noise.simplex2(p.x * scale, p.y * scale);
        var l = _glMatrix.vec3.length([
            p.x,
            p.y,
            p.z
        ]);
        var lw = l / 4 * 1;
        var c = Math.sin(Math.acos(p.x / 5)) * Math.cos(Math.asin(p.y / 5));
        return {
            x: p.x,
            y: p.y,
            z: n * maxHeight * lw - c * 6.5 + 5.3
        };
    });
    this.objectBuffers = {
        position: _helpers.classPrivateMethodGet(this, _createBuffer, createBuffer).call(this, gl, this.objectGeometry.vertices),
        normal: _helpers.classPrivateMethodGet(this, _createBuffer, createBuffer).call(this, gl, this.objectGeometry.normals),
        uv: _helpers.classPrivateMethodGet(this, _createBuffer, createBuffer).call(this, gl, this.objectGeometry.uvs),
        numElem: this.objectGeometry.count
    };
    this.objectVAO = _helpers.classPrivateMethodGet(this, _makeVertexArray, makeVertexArray).call(this, gl, [
        [
            this.objectBuffers.position,
            this.drawLocations.a_position,
            3
        ],
        [
            this.objectBuffers.normal,
            this.drawLocations.a_normal,
            3
        ],
        [
            this.objectBuffers.uv,
            this.drawLocations.a_uv,
            2
        ]
    ], this.objectGeometry.indices);
    // create quad VAO
    var quadPositions = [
        -1,
        -1,
        3,
        -1,
        -1,
        3
    ];
    this.quadBuffers = {
        position: _helpers.classPrivateMethodGet(this, _createBuffer, createBuffer).call(this, gl, quadPositions),
        numElem: quadPositions.length / 2
    };
    this.quadVAO = _helpers.classPrivateMethodGet(this, _makeVertexArray, makeVertexArray).call(this, gl, [
        [
            this.quadBuffers.position,
            this.drawLocations.a_position,
            2
        ]
    ]);
    // create center triangle VAO
    var pR = 30;
    var rot = -Math.PI / 2;
    var centerObjectPositions = [
        Math.cos(0 + rot) * pR,
        Math.sin(0 + rot) * pR,
        0,
        Math.cos(2 * Math.PI / 3 + rot) * pR,
        Math.sin(2 * Math.PI / 3 + rot) * pR,
        0,
        Math.cos(4 * Math.PI / 3 + rot) * pR,
        Math.sin(4 * Math.PI / 3 + rot) * pR,
        0
    ];
    this.centerObjectBuffers = {
        position: _helpers.classPrivateMethodGet(this, _createBuffer, createBuffer).call(this, gl, centerObjectPositions),
        uv: _helpers.classPrivateMethodGet(this, _createBuffer, createBuffer).call(this, gl, [
            0,
            0,
            0,
            1,
            1,
            1
        ]),
        numElem: centerObjectPositions.length / 3
    };
    this.centerObjectVAO = _helpers.classPrivateMethodGet(this, _makeVertexArray, makeVertexArray).call(this, gl, [
        [
            this.centerObjectBuffers.position,
            this.portalLocations.a_position,
            3
        ],
        [
            this.centerObjectBuffers.uv,
            this.portalLocations.a_uv,
            2
        ]
    ]);
    // initial client dimensions
    var clientWidth = gl.canvas.clientWidth;
    var clientHeight = gl.canvas.clientHeight;
    /////////////////////////////////// INITIAL DRAW PASS SETUP
    this.drawFramebufferWidth = clientWidth;
    this.drawFramebufferHeight = clientHeight;
    // the initial draw pass renders the scene using multisample renderbuffers for
    // color and depth which are then blitted to separate textures
    // draw framebuffer setup
    this.drawFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.drawFramebuffer);
    // depth render buffer setup
    this.depthRenderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer);
    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, gl.getParameter(gl.MAX_SAMPLES), gl.DEPTH_COMPONENT32F, this.drawFramebufferWidth, this.drawFramebufferHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthRenderbuffer);
    // color renderbuffer setup
    this.colorRenderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer);
    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, gl.getParameter(gl.MAX_SAMPLES), gl.RGBA8, this.drawFramebufferWidth, this.drawFramebufferHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.colorRenderbuffer);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) console.error('could not complete render framebuffer setup');
    // blit framebuffer setup
    this.blitFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.blitFramebuffer);
    // depth texture setup
    this.depthTexture = _helpers.classPrivateMethodGet(this, _createAndSetupTexture, createAndSetupTexture).call(this, gl, gl.NEAREST, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
    gl.texImage2D(this.gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT32F, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
    // color texture setup
    this.colorTexture = _helpers.classPrivateMethodGet(this, _createAndSetupTexture, createAndSetupTexture).call(this, gl, gl.LINEAR, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) console.error('could not complete render framebuffer setup');
    /////////////////////////////////// FIRST BLUR PASS SETUP
    this.hex1VerticalBlurTexture = _helpers.classPrivateMethodGet(this, _createAndSetupTexture, createAndSetupTexture).call(this, gl, gl.LINEAR, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, this.hex1VerticalBlurTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    this.hex1DiagonalBlurTexture = _helpers.classPrivateMethodGet(this, _createAndSetupTexture, createAndSetupTexture).call(this, gl, gl.LINEAR, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, this.hex1DiagonalBlurTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    this.hexBlur1Framebuffer = _helpers.classPrivateMethodGet(this, _createFramebuffer, createFramebuffer).call(this, gl, [
        this.hex1VerticalBlurTexture,
        this.hex1DiagonalBlurTexture
    ]);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) console.error('could not complete blur hexagonal first pass framebuffer setup');
    /////////////////////////////////// SECOND BLUR PASS SETUP
    this.hex2BlurTexture = _helpers.classPrivateMethodGet(this, _createAndSetupTexture, createAndSetupTexture).call(this, gl, gl.LINEAR, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, this.hex2BlurTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    this.hexBlur2Framebuffer = _helpers.classPrivateMethodGet(this, _createFramebuffer, createFramebuffer).call(this, gl, [
        this.hex2BlurTexture
    ]);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) console.error('could not complete blur hexagonal second pass framebuffer setup');
    this.resize();
    _helpers.classPrivateMethodGet(this, _updateCameraMatrix, updateCameraMatrix).call(this);
    _helpers.classPrivateMethodGet(this, _updateProjectionMatrix, updateProjectionMatrix).call(this, gl);
    _helpers.classPrivateMethodGet(this, _initOrbitControls, initOrbitControls).call(this);
    _helpers.classPrivateMethodGet(this, _initTweakpane, initTweakpane).call(this);
    if (this.oninit) this.oninit(this);
}
function createXYPlaneGeometry(w, h, wSegments, hSegments, distort) {
    var sx = -w / 2;
    var sy = -h / 2;
    var dx = w / wSegments;
    var dy = h / hSegments;
    var count = wSegments * hSegments * 6;
    var vertices = [];
    var normals = [];
    var uvs = [];
    var indices = [];
    var wOff = wSegments + 1;
    var dd = Math.min(dx, dy) * 0.5;
    for(var iy = 0; iy <= hSegments; ++iy)for(var ix = 0; ix <= wSegments; ++ix){
        var p = {
            x: sx + dx * ix,
            y: sy + dy * iy,
            z: 0
        };
        var n = {
            x: 0,
            y: 0,
            z: 1
        };
        if (distort) {
            var x1 = _helpers.objectSpread({
            }, p);
            var x2 = _helpers.objectSpread({
            }, p);
            var y1 = _helpers.objectSpread({
            }, p);
            var y2 = _helpers.objectSpread({
            }, p);
            x1.x -= dd;
            x2.x += dd;
            y1.y -= dd;
            y2.y += dd;
            x1 = distort(x1);
            x2 = distort(x2);
            y1 = distort(y1);
            y2 = distort(y2);
            var t = _glMatrix.vec3.fromValues(x2.x - x1.x, x2.y - x1.y, x2.z - x1.z);
            var b = _glMatrix.vec3.fromValues(y2.x - y1.x, y2.y - y1.y, y2.z - y1.z);
            var normal = _glMatrix.vec3.cross(_glMatrix.vec3.create(), t, b);
            _glMatrix.vec3.normalize(normal, normal);
            n.x = normal[0];
            n.y = normal[1];
            n.z = normal[2];
            p = distort(p);
        }
        vertices.push(p.x, p.y, p.z);
        normals.push(n.x, n.y, n.z);
        uvs.push(ix / wSegments, iy / hSegments);
    }
    for(var iy1 = 0; iy1 < hSegments; ++iy1)for(var ix1 = 0; ix1 < wSegments; ++ix1){
        indices.push(iy1 * wOff + ix1, iy1 * wOff + ix1 + 1, (iy1 + 1) * wOff + ix1 + 1);
        indices.push((iy1 + 1) * wOff + ix1 + 1, (iy1 + 1) * wOff + ix1, iy1 * wOff + ix1);
    }
    return {
        vertices: vertices,
        normals: normals,
        uvs: uvs,
        indices: indices,
        count: count
    };
}
function createBuffer(gl, data) {
    var buffer = this.gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
}
function initOrbitControls() {
    var _this = this;
    this.control = new _orbitControl.OrbitControl(this.canvas, this.camera, function() {
        return _helpers.classPrivateMethodGet(_this, _updateCameraMatrix, updateCameraMatrix).call(_this);
    });
}
function createFramebuffer(gl, colorAttachements) {
    var fbo = gl.createFramebuffer();
    var drawBuffers = [];
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    colorAttachements.forEach(function(texture, ndx) {
        var attachmentPoint = gl["COLOR_ATTACHMENT".concat(ndx)];
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, texture, 0);
        drawBuffers.push(attachmentPoint);
    });
    gl.drawBuffers(drawBuffers);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return fbo;
}
function makeVertexArray(gl, bufLocNumElmPairs, indices) {
    var va = gl.createVertexArray();
    gl.bindVertexArray(va);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = bufLocNumElmPairs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _value = _helpers.slicedToArray(_step.value, 3), buffer = _value[0], loc = _value[1], numElem = _value[2];
            if (loc == -1) continue;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (indices) {
        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }
    gl.bindVertexArray(null);
    return va;
}
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
function createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {
    var _this = this;
    var program = gl.createProgram();
    [
        gl.VERTEX_SHADER,
        gl.FRAGMENT_SHADER
    ].forEach(function(type, ndx) {
        var shader = _helpers.classPrivateMethodGet(_this, _createShader, createShader).call(_this, gl, type, shaderSources[ndx]);
        gl.attachShader(program, shader);
    });
    if (transformFeedbackVaryings) gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
    if (attribLocations) for(var attrib in attribLocations)gl.bindAttribLocation(program, attribLocations[attrib], attrib);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
function setFramebuffer(gl, fbo, width, height) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); // all draw commands will affect the framebuffer
    gl.viewport(0, 0, width, height);
}
function createAndSetupTexture(gl, minFilter, magFilter) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    return texture;
}
function resizeTextures(gl) {
    var clientWidth = gl.canvas.clientWidth;
    var clientHeight = gl.canvas.clientHeight;
    this.drawFramebufferWidth = clientWidth;
    this.drawFramebufferHeight = clientHeight;
    // resize draw/blit textures and buffers
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer);
    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.DEPTH_COMPONENT32F, clientWidth, clientHeight);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer);
    gl.renderbufferStorageMultisample(gl.RENDERBUFFER, gl.getParameter(gl.MAX_SAMPLES), gl.RGBA8, clientWidth, clientHeight);
    gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
    gl.texImage2D(this.gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT32F, clientWidth, clientHeight, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
    gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, clientWidth, clientHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    // resize blur texture
    gl.bindTexture(gl.TEXTURE_2D, this.hex1VerticalBlurTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, this.hex1DiagonalBlurTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, this.hex2BlurTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.drawFramebufferWidth, this.drawFramebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    // reset bindings
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
}
function updateCameraMatrix() {
    _glMatrix.mat4.targetTo(this.camera.matrix, this.camera.position, [
        0,
        0,
        0
    ], this.camera.up);
    _glMatrix.mat4.invert(this.drawUniforms.u_viewMatrix, this.camera.matrix);
}
function updateProjectionMatrix(gl) {
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    _glMatrix.mat4.perspective(this.drawUniforms.u_projectionMatrix, Math.PI / 4, aspect, this.camera.near, this.camera.far);
}
function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    // Check if the canvas is not the same size.
    var needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}
function initTweakpane() {
    if (this.pane) {
        var _this = this;
        var maxFar = 700;
        var cameraFolder = this.pane.addFolder({
            title: 'Camera'
        });
        _helpers.classPrivateMethodGet(this, _createTweakpaneSlider, createTweakpaneSlider).call(this, cameraFolder, this.camera, 'near', 'near', 1, maxFar, null, function() {
            return _helpers.classPrivateMethodGet(_this, _updateProjectionMatrix, updateProjectionMatrix).call(_this, _this.gl);
        });
        _helpers.classPrivateMethodGet(this, _createTweakpaneSlider, createTweakpaneSlider).call(this, cameraFolder, this.camera, 'far', 'far', 1, maxFar, null, function() {
            return _helpers.classPrivateMethodGet(_this, _updateProjectionMatrix, updateProjectionMatrix).call(_this, _this.gl);
        });
        var blurSettings = this.pane.addFolder({
            title: 'Blur Settings'
        });
        _helpers.classPrivateMethodGet(this, _createTweakpaneSlider, createTweakpaneSlider).call(this, blurSettings, this.blur, 'radius', 'radius', 0, 30, 1);
        _helpers.classPrivateMethodGet(this, _createTweakpaneSlider, createTweakpaneSlider).call(this, blurSettings, this.blur, 'scale', 'scale', 1, 5, 0.1);
    }
}
function createTweakpaneSlider(folder, obj, propName, label, min, max) {
    var stepSize = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : null, callback = arguments.length > 7 ? arguments[7] : void 0;
    var slider = folder.addBlade({
        view: 'slider',
        label: label,
        min: min,
        max: max,
        step: stepSize,
        value: obj[propName]
    });
    slider.on('change', function(e) {
        obj[propName] = e.value;
        if (callback) callback();
    });
}

},{"@swc/helpers":"erO4s","gl-matrix":"kiQSi","./orbit-control":"in93W","./noise":"ffLkj","./shader/draw.vert":"ap6ev","./shader/draw.frag":"28anX","./shader/portal.vert":"aHok2","./shader/portal.frag":"6IoVS","./shader/composite.vert":"hXDWY","./shader/composite.frag":"dg13f","./shader/hex-blur-1.vert":"7yRTB","./shader/hex-blur-1.frag":"lMFKN","./shader/hex-blur-2.vert":"2YiGt","./shader/hex-blur-2.frag":"ekbgU","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kiQSi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "glMatrix", function() {
    return _commonJs;
});
parcelHelpers.export(exports, "mat2", function() {
    return _mat2Js;
});
parcelHelpers.export(exports, "mat2d", function() {
    return _mat2DJs;
});
parcelHelpers.export(exports, "mat3", function() {
    return _mat3Js;
});
parcelHelpers.export(exports, "mat4", function() {
    return _mat4Js;
});
parcelHelpers.export(exports, "quat", function() {
    return _quatJs;
});
parcelHelpers.export(exports, "quat2", function() {
    return _quat2Js;
});
parcelHelpers.export(exports, "vec2", function() {
    return _vec2Js;
});
parcelHelpers.export(exports, "vec3", function() {
    return _vec3Js;
});
parcelHelpers.export(exports, "vec4", function() {
    return _vec4Js;
});
var _commonJs = require("./common.js");
var _mat2Js = require("./mat2.js");
var _mat2DJs = require("./mat2d.js");
var _mat3Js = require("./mat3.js");
var _mat4Js = require("./mat4.js");
var _quatJs = require("./quat.js");
var _quat2Js = require("./quat2.js");
var _vec2Js = require("./vec2.js");
var _vec3Js = require("./vec3.js");
var _vec4Js = require("./vec4.js");

},{"./common.js":"6oUFo","./mat2.js":"4KWD9","./mat2d.js":"k96Ni","./mat3.js":"300HW","./mat4.js":"eMvnq","./quat.js":"kG86h","./quat2.js":"4nIB7","./vec2.js":"6eLVl","./vec3.js":"3mnNb","./vec4.js":"cAjV1","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"6oUFo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EPSILON", function() {
    return EPSILON;
});
parcelHelpers.export(exports, "ARRAY_TYPE", function() {
    return ARRAY_TYPE;
});
parcelHelpers.export(exports, "RANDOM", function() {
    return RANDOM;
});
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */ parcelHelpers.export(exports, "setMatrixArrayType", function() {
    return setMatrixArrayType;
});
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */ parcelHelpers.export(exports, "toRadian", function() {
    return toRadian;
});
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
function setMatrixArrayType(type) {
    ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
function toRadian(a) {
    return a * degree;
}
function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function() {
    var y = 0, i = arguments.length;
    while(i--)y += arguments[i] * arguments[i];
    return Math.sqrt(y);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4KWD9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 2x2 Matrix
 * @module mat2
 */ /**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "identity", function() {
    return identity;
});
/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "transpose", function() {
    return transpose;
});
/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "invert", function() {
    return invert;
});
/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "adjoint", function() {
    return adjoint;
});
/**
 * Calculates the determinant of a mat2
 *
 * @param {ReadonlyMat2} a the source matrix
 * @returns {Number} determinant of a
 */ parcelHelpers.export(exports, "determinant", function() {
    return determinant;
});
/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "rotate", function() {
    return rotate;
});
/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "fromRotation", function() {
    return fromRotation;
});
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "fromScaling", function() {
    return fromScaling;
});
/**
 * Returns a string representation of a mat2
 *
 * @param {ReadonlyMat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns Frobenius norm of a mat2
 *
 * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */ parcelHelpers.export(exports, "frob", function() {
    return frob;
});
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {ReadonlyMat2} L the lower triangular matrix
 * @param {ReadonlyMat2} D the diagonal matrix
 * @param {ReadonlyMat2} U the upper triangular matrix
 * @param {ReadonlyMat2} a the input matrix to factorize
 */ parcelHelpers.export(exports, "LDU", function() {
    return LDU;
});
/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "multiplyScalar", function() {
    return multiplyScalar;
});
/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */ parcelHelpers.export(exports, "multiplyScalarAndAdd", function() {
    return multiplyScalarAndAdd;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(4);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
    }
    out[0] = 1;
    out[3] = 1;
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}
function fromValues(m00, m01, m10, m11) {
    var out = new _commonJs.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
}
function set(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
}
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    return out;
}
function invert(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3]; // Calculate the determinant
    var det = a0 * a3 - a2 * a1;
    if (!det) return null;
    det = 1 / det;
    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
}
function adjoint(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;
    return out;
}
function determinant(a) {
    return a[0] * a[3] - a[2] * a[1];
}
function multiply(out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
}
function rotate(out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
}
function scale(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
}
function fromRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}
function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}
function str(a) {
    return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3]);
}
function LDU(L, D, U, a) {
    L[2] = a[2] / a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [
        L,
        D,
        U
    ];
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _commonJs.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}
function multiplyScalarAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    out[2] = a[2] + b[2] * scale1;
    out[3] = a[3] + b[3] * scale1;
    return out;
}
var mul = multiply;
var sub = subtract;

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"k96Ni":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 2x3 Matrix
 * @module mat2d
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */ /**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "identity", function() {
    return identity;
});
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "invert", function() {
    return invert;
});
/**
 * Calculates the determinant of a mat2d
 *
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {Number} determinant of a
 */ parcelHelpers.export(exports, "determinant", function() {
    return determinant;
});
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "rotate", function() {
    return rotate;
});
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/ parcelHelpers.export(exports, "translate", function() {
    return translate;
});
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "fromRotation", function() {
    return fromRotation;
});
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "fromScaling", function() {
    return fromScaling;
});
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "fromTranslation", function() {
    return fromTranslation;
});
/**
 * Returns a string representation of a mat2d
 *
 * @param {ReadonlyMat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {ReadonlyMat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */ parcelHelpers.export(exports, "frob", function() {
    return frob;
});
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "multiplyScalar", function() {
    return multiplyScalar;
});
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */ parcelHelpers.export(exports, "multiplyScalarAndAdd", function() {
    return multiplyScalarAndAdd;
});
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(6);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[4] = 0;
        out[5] = 0;
    }
    out[0] = 1;
    out[3] = 1;
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
}
function fromValues(a, b, c, d, tx, ty) {
    var out = new _commonJs.ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
}
function set(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
}
function invert(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3];
    var atx = a[4], aty = a[5];
    var det = aa * ad - ab * ac;
    if (!det) return null;
    det = 1 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
}
function determinant(a) {
    return a[0] * a[3] - a[1] * a[2];
}
function multiply(out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
}
function rotate(out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
}
function scale(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
}
function translate(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
}
function fromRotation(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}
function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}
function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}
function str(a) {
    return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
}
function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
}
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
}
function multiplyScalarAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    out[2] = a[2] + b[2] * scale1;
    out[3] = a[3] + b[3] * scale1;
    out[4] = a[4] + b[4] * scale1;
    out[5] = a[5] + b[5] * scale1;
    return out;
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _commonJs.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _commonJs.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _commonJs.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5));
}
var mul = multiply;
var sub = subtract;

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"300HW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 3x3 Matrix
 * @module mat3
 */ /**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {ReadonlyMat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "fromMat4", function() {
    return fromMat4;
});
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "identity", function() {
    return identity;
});
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "transpose", function() {
    return transpose;
});
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "invert", function() {
    return invert;
});
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "adjoint", function() {
    return adjoint;
});
/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */ parcelHelpers.export(exports, "determinant", function() {
    return determinant;
});
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "translate", function() {
    return translate;
});
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "rotate", function() {
    return rotate;
});
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "fromTranslation", function() {
    return fromTranslation;
});
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "fromRotation", function() {
    return fromRotation;
});
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "fromScaling", function() {
    return fromScaling;
});
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to copy
 * @returns {mat3} out
 **/ parcelHelpers.export(exports, "fromMat2d", function() {
    return fromMat2d;
});
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "fromQuat", function() {
    return fromQuat;
});
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "normalFromMat4", function() {
    return normalFromMat4;
});
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "projection", function() {
    return projection;
});
/**
 * Returns a string representation of a mat3
 *
 * @param {ReadonlyMat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */ parcelHelpers.export(exports, "frob", function() {
    return frob;
});
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "multiplyScalar", function() {
    return multiplyScalar;
});
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */ parcelHelpers.export(exports, "multiplyScalarAndAdd", function() {
    return multiplyScalarAndAdd;
});
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(9);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
}
function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new _commonJs.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
}
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    return out;
}
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant
    var det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) return null;
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
}
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
}
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b00 = b[0], b01 = b[1], b02 = b[2];
    var b10 = b[3], b11 = b[4], b12 = b[5];
    var b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
}
function translate(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
}
function rotate(out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
}
function scale(out, a, v) {
    var x = v[0], y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}
function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}
function fromRotation(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}
function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}
function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
}
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
}
function normalFromMat4(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
}
function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}
function str(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
}
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
}
function multiplyScalarAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    out[2] = a[2] + b[2] * scale1;
    out[3] = a[3] + b[3] * scale1;
    out[4] = a[4] + b[4] * scale1;
    out[5] = a[5] + b[5] * scale1;
    out[6] = a[6] + b[6] * scale1;
    out[7] = a[7] + b[7] * scale1;
    out[8] = a[8] + b[8] * scale1;
    return out;
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _commonJs.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _commonJs.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _commonJs.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _commonJs.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _commonJs.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _commonJs.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
}
var mul = multiply;
var sub = subtract;

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"eMvnq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */ /**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "identity", function() {
    return identity;
});
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "transpose", function() {
    return transpose;
});
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "invert", function() {
    return invert;
});
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "adjoint", function() {
    return adjoint;
});
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */ parcelHelpers.export(exports, "determinant", function() {
    return determinant;
});
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "translate", function() {
    return translate;
});
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "rotate", function() {
    return rotate;
});
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "rotateX", function() {
    return rotateX;
});
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "rotateY", function() {
    return rotateY;
});
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "rotateZ", function() {
    return rotateZ;
});
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromTranslation", function() {
    return fromTranslation;
});
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromScaling", function() {
    return fromScaling;
});
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromRotation", function() {
    return fromRotation;
});
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromXRotation", function() {
    return fromXRotation;
});
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromYRotation", function() {
    return fromYRotation;
});
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromZRotation", function() {
    return fromZRotation;
});
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromRotationTranslation", function() {
    return fromRotationTranslation;
});
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */ parcelHelpers.export(exports, "fromQuat2", function() {
    return fromQuat2;
});
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */ parcelHelpers.export(exports, "getTranslation", function() {
    return getTranslation;
});
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */ parcelHelpers.export(exports, "getScaling", function() {
    return getScaling;
});
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */ parcelHelpers.export(exports, "getRotation", function() {
    return getRotation;
});
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromRotationTranslationScale", function() {
    return fromRotationTranslationScale;
});
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromRotationTranslationScaleOrigin", function() {
    return fromRotationTranslationScaleOrigin;
});
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "fromQuat", function() {
    return fromQuat;
});
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "frustum", function() {
    return frustum;
});
/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "perspectiveNO", function() {
    return perspectiveNO;
});
parcelHelpers.export(exports, "perspective", function() {
    return perspective;
});
/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "perspectiveZO", function() {
    return perspectiveZO;
});
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "perspectiveFromFieldOfView", function() {
    return perspectiveFromFieldOfView;
});
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "orthoNO", function() {
    return orthoNO;
});
parcelHelpers.export(exports, "ortho", function() {
    return ortho;
});
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "orthoZO", function() {
    return orthoZO;
});
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "lookAt", function() {
    return lookAt;
});
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "targetTo", function() {
    return targetTo;
});
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */ parcelHelpers.export(exports, "frob", function() {
    return frob;
});
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "multiplyScalar", function() {
    return multiplyScalar;
});
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */ parcelHelpers.export(exports, "multiplyScalarAndAdd", function() {
    return multiplyScalarAndAdd;
});
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(16);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new _commonJs.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
}
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3];
        var a12 = a[6], a13 = a[7];
        var a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    return out;
}
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
}
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
}
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]; // Cache only the current line of the second matrix
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
}
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;
    if (len < _commonJs.EPSILON) return null;
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
}
function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    } // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
}
function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    } // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
}
function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    } // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
}
function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}
function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function fromRotation(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    if (len < _commonJs.EPSILON) return null;
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c; // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}
function fromQuat2(out, a) {
    var translation = new _commonJs.ARRAY_TYPE(3);
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense
    if (magnitude > 0) {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    fromRotationTranslation(out, a, translation);
    return out;
}
function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
}
function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
}
function getRotation(out, mat) {
    var scaling = new _commonJs.ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;
    if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
    } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
    }
    return out;
}
function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
}
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
    } else {
        out[10] = -1;
        out[14] = -2 * near;
    }
    return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = far * nf;
        out[14] = far * near * nf;
    } else {
        out[10] = -1;
        out[14] = -near;
    }
    return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    var xScale = 2 / (leftTan + rightTan);
    var yScale = 2 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = yScale;
    out[6] = 0;
    out[7] = 0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near / (near - far);
    out[15] = 0;
    return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = near * nf;
    out[15] = 1;
    return out;
}
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];
    if (Math.abs(eyex - centerx) < _commonJs.EPSILON && Math.abs(eyey - centery) < _commonJs.EPSILON && Math.abs(eyez - centerz) < _commonJs.EPSILON) return identity(out);
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
}
function targetTo(out, eye, target, up) {
    var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    var len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
    }
    var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
}
function str(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
}
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
}
function multiplyScalarAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    out[2] = a[2] + b[2] * scale1;
    out[3] = a[3] + b[3] * scale1;
    out[4] = a[4] + b[4] * scale1;
    out[5] = a[5] + b[5] * scale1;
    out[6] = a[6] + b[6] * scale1;
    out[7] = a[7] + b[7] * scale1;
    out[8] = a[8] + b[8] * scale1;
    out[9] = a[9] + b[9] * scale1;
    out[10] = a[10] + b[10] * scale1;
    out[11] = a[11] + b[11] * scale1;
    out[12] = a[12] + b[12] * scale1;
    out[13] = a[13] + b[13] * scale1;
    out[14] = a[14] + b[14] * scale1;
    out[15] = a[15] + b[15] * scale1;
    return out;
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
    var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
    var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
    var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
    var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _commonJs.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _commonJs.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _commonJs.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _commonJs.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _commonJs.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _commonJs.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _commonJs.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _commonJs.EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _commonJs.EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _commonJs.EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _commonJs.EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _commonJs.EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _commonJs.EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul = multiply;
var sub = subtract;

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"kG86h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Quaternion
 * @module quat
 */ /**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */ parcelHelpers.export(exports, "identity", function() {
    return identity;
});
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/ parcelHelpers.export(exports, "setAxisAngle", function() {
    return setAxisAngle;
});
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */ parcelHelpers.export(exports, "getAxisAngle", function() {
    return getAxisAngle;
});
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {ReadonlyQuat} a     Origin unit quaternion
 * @param  {ReadonlyQuat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */ parcelHelpers.export(exports, "getAngle", function() {
    return getAngle;
});
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */ parcelHelpers.export(exports, "rotateX", function() {
    return rotateX;
});
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */ parcelHelpers.export(exports, "rotateY", function() {
    return rotateY;
});
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */ parcelHelpers.export(exports, "rotateZ", function() {
    return rotateZ;
});
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */ parcelHelpers.export(exports, "calculateW", function() {
    return calculateW;
});
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */ parcelHelpers.export(exports, "exp", function() {
    return exp;
});
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */ parcelHelpers.export(exports, "ln", function() {
    return ln;
});
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */ parcelHelpers.export(exports, "pow", function() {
    return pow;
});
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */ parcelHelpers.export(exports, "slerp", function() {
    return slerp;
});
/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */ parcelHelpers.export(exports, "random", function() {
    return random;
});
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */ parcelHelpers.export(exports, "invert", function() {
    return invert;
});
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */ parcelHelpers.export(exports, "conjugate", function() {
    return conjugate;
});
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */ parcelHelpers.export(exports, "fromMat3", function() {
    return fromMat3;
});
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */ parcelHelpers.export(exports, "fromEuler", function() {
    return fromEuler;
});
/**
 * Returns a string representation of a quatenion
 *
 * @param {ReadonlyQuat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
parcelHelpers.export(exports, "clone", function() {
    return clone;
});
parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
parcelHelpers.export(exports, "copy", function() {
    return copy;
});
parcelHelpers.export(exports, "set", function() {
    return set;
});
parcelHelpers.export(exports, "add", function() {
    return add;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "scale", function() {
    return scale;
});
parcelHelpers.export(exports, "dot", function() {
    return dot;
});
parcelHelpers.export(exports, "lerp", function() {
    return lerp;
});
parcelHelpers.export(exports, "length", function() {
    return length;
});
parcelHelpers.export(exports, "len", function() {
    return len;
});
parcelHelpers.export(exports, "squaredLength", function() {
    return squaredLength;
});
parcelHelpers.export(exports, "sqrLen", function() {
    return sqrLen;
});
parcelHelpers.export(exports, "normalize", function() {
    return normalize;
});
parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "rotationTo", function() {
    return rotationTo;
});
parcelHelpers.export(exports, "sqlerp", function() {
    return sqlerp;
});
parcelHelpers.export(exports, "setAxes", function() {
    return setAxes;
});
var _commonJs = require("./common.js");
var _mat3Js = require("./mat3.js");
var _vec3Js = require("./vec3.js");
var _vec4Js = require("./vec4.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(4);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
    }
    out[3] = 1;
    return out;
}
function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}
function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
}
function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2;
    var s = Math.sin(rad / 2);
    if (s > _commonJs.EPSILON) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
}
function getAngle(a, b) {
    var dotproduct = dot(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
}
function rotateX(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
}
function rotateY(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
}
function rotateZ(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
}
function calculateW(out, a) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
    return out;
}
function exp(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var et = Math.exp(w);
    var s = r > 0 ? et * Math.sin(r) / r : 0;
    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
}
function ln(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var t = r > 0 ? Math.atan2(r, w) / r : 0;
    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
    return out;
}
function pow(out, a, b) {
    ln(out, a);
    scale(out, out, b);
    exp(out, out);
    return out;
}
function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)
    if (cosom < 0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    } // calculate coefficients
    if (1 - cosom > _commonJs.EPSILON) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1 - t;
        scale1 = t;
    } // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
}
function random(out) {
    // Implementation of http://planning.cs.uiuc.edu/node198.html
    // TODO: Calling random 3 times is probably not the fastest solution
    var u1 = _commonJs.RANDOM();
    var u2 = _commonJs.RANDOM();
    var u3 = _commonJs.RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
    return out;
}
function invert(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var dot1 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot1 ? 1 / dot1 : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
}
function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
}
function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;
    if (fTrace > 0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1); // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;
        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
}
function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
}
function str(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone = _vec4Js.clone;
var fromValues = _vec4Js.fromValues;
var copy = _vec4Js.copy;
var set = _vec4Js.set;
var add = _vec4Js.add;
var mul = multiply;
var scale = _vec4Js.scale;
var dot = _vec4Js.dot;
var lerp = _vec4Js.lerp;
var length = _vec4Js.length;
var len = length;
var squaredLength = _vec4Js.squaredLength;
var sqrLen = squaredLength;
var normalize = _vec4Js.normalize;
var exactEquals = _vec4Js.exactEquals;
var equals = _vec4Js.equals;
var rotationTo = function() {
    var tmpvec3 = _vec3Js.create();
    var xUnitVec3 = _vec3Js.fromValues(1, 0, 0);
    var yUnitVec3 = _vec3Js.fromValues(0, 1, 0);
    return function(out, a, b) {
        var dot2 = _vec3Js.dot(a, b);
        if (dot2 < -0.999999) {
            _vec3Js.cross(tmpvec3, xUnitVec3, a);
            if (_vec3Js.len(tmpvec3) < 0.000001) _vec3Js.cross(tmpvec3, yUnitVec3, a);
            _vec3Js.normalize(tmpvec3, tmpvec3);
            setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot2 > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            _vec3Js.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot2;
            return normalize(out, out);
        }
    };
}();
var sqlerp = function() {
    var temp1 = create();
    var temp2 = create();
    return function(out, a, b, c, d, t) {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
    };
}();
var setAxes = function() {
    var matr = _mat3Js.create();
    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return normalize(out, fromMat3(out, matr));
    };
}();

},{"./common.js":"6oUFo","./mat3.js":"300HW","./vec3.js":"3mnNb","./vec4.js":"cAjV1","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"3mnNb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 3 Dimensional Vector
 * @module vec3
 */ /**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */ parcelHelpers.export(exports, "length", function() {
    return length;
});
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "divide", function() {
    return divide;
});
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "ceil", function() {
    return ceil;
});
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "floor", function() {
    return floor;
});
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "min", function() {
    return min;
});
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "max", function() {
    return max;
});
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "round", function() {
    return round;
});
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "scaleAndAdd", function() {
    return scaleAndAdd;
});
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */ parcelHelpers.export(exports, "distance", function() {
    return distance;
});
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */ parcelHelpers.export(exports, "squaredDistance", function() {
    return squaredDistance;
});
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */ parcelHelpers.export(exports, "squaredLength", function() {
    return squaredLength;
});
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "negate", function() {
    return negate;
});
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "inverse", function() {
    return inverse;
});
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "normalize", function() {
    return normalize;
});
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */ parcelHelpers.export(exports, "dot", function() {
    return dot;
});
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "cross", function() {
    return cross;
});
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "lerp", function() {
    return lerp;
});
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "hermite", function() {
    return hermite;
});
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "bezier", function() {
    return bezier;
});
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "random", function() {
    return random;
});
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "transformMat4", function() {
    return transformMat4;
});
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "transformMat3", function() {
    return transformMat3;
});
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "transformQuat", function() {
    return transformQuat;
});
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "rotateX", function() {
    return rotateX;
});
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "rotateY", function() {
    return rotateY;
});
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "rotateZ", function() {
    return rotateZ;
});
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */ parcelHelpers.export(exports, "angle", function() {
    return angle;
});
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "zero", function() {
    return zero;
});
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "div", function() {
    return div;
});
parcelHelpers.export(exports, "dist", function() {
    return dist;
});
parcelHelpers.export(exports, "sqrDist", function() {
    return sqrDist;
});
parcelHelpers.export(exports, "len", function() {
    return len;
});
parcelHelpers.export(exports, "sqrLen", function() {
    return sqrLen;
});
parcelHelpers.export(exports, "forEach", function() {
    return forEach;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(3);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
    }
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
}
function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
}
function fromValues(x, y, z) {
    var out = new _commonJs.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
}
function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
}
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
}
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
}
function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
}
function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
}
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
}
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
}
function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
}
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
}
function scaleAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    out[2] = a[2] + b[2] * scale1;
    return out;
}
function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
}
function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
}
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
}
function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
}
function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len1 = x * x + y * y + z * z;
    if (len1 > 0) //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
    out[0] = a[0] * len1;
    out[1] = a[1] * len1;
    out[2] = a[2] * len1;
    return out;
}
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2];
    var bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
}
function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
}
function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
}
function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
}
function random(out, scale2) {
    scale2 = scale2 || 1;
    var r = _commonJs.RANDOM() * 2 * Math.PI;
    var z = _commonJs.RANDOM() * 2 - 1;
    var zScale = Math.sqrt(1 - z * z) * scale2;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale2;
    return out;
}
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
}
function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
}
function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var x = a[0], y = a[1], z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);
    var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);
    var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);
    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
}
function rotateX(out, a, b, rad) {
    var p = [], r = []; //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
}
function rotateY(out, a, b, rad) {
    var p = [], r = []; //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation
    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
}
function rotateZ(out, a, b, rad) {
    var p = [], r = []; //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation
    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2]; //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
}
function angle(a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
}
function str(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub = subtract;
var mul = multiply;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
    var vec = create();
    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) stride = 3;
        if (!offset) offset = 0;
        if (count) l = Math.min(count * stride + offset, a.length);
        else l = a.length;
        for(i = offset; i < l; i += stride){
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
        }
        return a;
    };
}();

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"cAjV1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 4 Dimensional Vector
 * @module vec4
 */ /**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "divide", function() {
    return divide;
});
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "ceil", function() {
    return ceil;
});
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "floor", function() {
    return floor;
});
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "min", function() {
    return min;
});
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "max", function() {
    return max;
});
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "round", function() {
    return round;
});
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "scaleAndAdd", function() {
    return scaleAndAdd;
});
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */ parcelHelpers.export(exports, "distance", function() {
    return distance;
});
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */ parcelHelpers.export(exports, "squaredDistance", function() {
    return squaredDistance;
});
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */ parcelHelpers.export(exports, "length", function() {
    return length;
});
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */ parcelHelpers.export(exports, "squaredLength", function() {
    return squaredLength;
});
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "negate", function() {
    return negate;
});
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "inverse", function() {
    return inverse;
});
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "normalize", function() {
    return normalize;
});
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */ parcelHelpers.export(exports, "dot", function() {
    return dot;
});
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */ parcelHelpers.export(exports, "cross", function() {
    return cross;
});
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "lerp", function() {
    return lerp;
});
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "random", function() {
    return random;
});
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "transformMat4", function() {
    return transformMat4;
});
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "transformQuat", function() {
    return transformQuat;
});
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */ parcelHelpers.export(exports, "zero", function() {
    return zero;
});
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "div", function() {
    return div;
});
parcelHelpers.export(exports, "dist", function() {
    return dist;
});
parcelHelpers.export(exports, "sqrDist", function() {
    return sqrDist;
});
parcelHelpers.export(exports, "len", function() {
    return len;
});
parcelHelpers.export(exports, "sqrLen", function() {
    return sqrLen;
});
parcelHelpers.export(exports, "forEach", function() {
    return forEach;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(4);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
    }
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
function fromValues(x, y, z, w) {
    var out = new _commonJs.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
function set(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
}
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
}
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
}
function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
}
function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
}
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
}
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
}
function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
}
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}
function scaleAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    out[2] = a[2] + b[2] * scale1;
    out[3] = a[3] + b[3] * scale1;
    return out;
}
function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return Math.hypot(x, y, z, w);
}
function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
}
function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.hypot(x, y, z, w);
}
function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
}
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
}
function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    out[3] = 1 / a[3];
    return out;
}
function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len1 = x * x + y * y + z * z + w * w;
    if (len1 > 0) len1 = 1 / Math.sqrt(len1);
    out[0] = x * len1;
    out[1] = y * len1;
    out[2] = z * len1;
    out[3] = w * len1;
    return out;
}
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross(out, u, v, w) {
    var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
    var G = u[0];
    var H = u[1];
    var I = u[2];
    var J = u[3];
    out[0] = H * F - I * E + J * D;
    out[1] = -(G * F) + I * C - J * B;
    out[2] = G * E - H * C + J * A;
    out[3] = -(G * D) + H * B - I * A;
    return out;
}
function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
}
function random(out, scale2) {
    scale2 = scale2 || 1; // Marsaglia, George. Choosing a Point from the Surface of a
    // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
    // http://projecteuclid.org/euclid.aoms/1177692644;
    var v1, v2, v3, v4;
    var s1, s2;
    do {
        v1 = _commonJs.RANDOM() * 2 - 1;
        v2 = _commonJs.RANDOM() * 2 - 1;
        s1 = v1 * v1 + v2 * v2;
    }while (s1 >= 1)
    do {
        v3 = _commonJs.RANDOM() * 2 - 1;
        v4 = _commonJs.RANDOM() * 2 - 1;
        s2 = v3 * v3 + v4 * v4;
    }while (s2 >= 1)
    var d = Math.sqrt((1 - s1) / s2);
    out[0] = scale2 * v1;
    out[1] = scale2 * v2;
    out[2] = scale2 * v3 * d;
    out[3] = scale2 * v4 * d;
    return out;
}
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
}
function transformQuat(out, a, q) {
    var x = a[0], y = a[1], z = a[2];
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3]; // calculate quat * vec
    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
}
function zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
}
function str(a) {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _commonJs.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub = subtract;
var mul = multiply;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
    var vec = create();
    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) stride = 4;
        if (!offset) offset = 0;
        if (count) l = Math.min(count * stride + offset, a.length);
        else l = a.length;
        for(i = offset; i < l; i += stride){
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
            a[i + 3] = vec[3];
        }
        return a;
    };
}();

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"4nIB7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */ /**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */ parcelHelpers.export(exports, "fromRotationTranslationValues", function() {
    return fromRotationTranslationValues;
});
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q a normalized quaternion
 * @param {ReadonlyVec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */ parcelHelpers.export(exports, "fromRotationTranslation", function() {
    return fromRotationTranslation;
});
/**
 * Creates a dual quat from a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyVec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */ parcelHelpers.export(exports, "fromTranslation", function() {
    return fromTranslation;
});
/**
 * Creates a dual quat from a quaternion
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */ parcelHelpers.export(exports, "fromRotation", function() {
    return fromRotation;
});
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {ReadonlyMat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */ parcelHelpers.export(exports, "fromMat4", function() {
    return fromMat4;
});
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "identity", function() {
    return identity;
});
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
parcelHelpers.export(exports, "getReal", function() {
    return getReal;
});
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} dual part
 */ parcelHelpers.export(exports, "getDual", function() {
    return getDual;
});
parcelHelpers.export(exports, "setReal", function() {
    return setReal;
});
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */ parcelHelpers.export(exports, "setDual", function() {
    return setDual;
});
/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */ parcelHelpers.export(exports, "getTranslation", function() {
    return getTranslation;
});
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "translate", function() {
    return translate;
});
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "rotateX", function() {
    return rotateX;
});
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "rotateY", function() {
    return rotateY;
});
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "rotateZ", function() {
    return rotateZ;
});
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "rotateByQuatAppend", function() {
    return rotateByQuatAppend;
});
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "rotateByQuatPrepend", function() {
    return rotateByQuatPrepend;
});
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "rotateAroundAxis", function() {
    return rotateAroundAxis;
});
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 * @function
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
parcelHelpers.export(exports, "dot", function() {
    return dot;
});
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "lerp", function() {
    return lerp;
});
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "invert", function() {
    return invert;
});
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */ parcelHelpers.export(exports, "conjugate", function() {
    return conjugate;
});
parcelHelpers.export(exports, "length", function() {
    return length;
});
parcelHelpers.export(exports, "len", function() {
    return len;
});
parcelHelpers.export(exports, "squaredLength", function() {
    return squaredLength;
});
parcelHelpers.export(exports, "sqrLen", function() {
    return sqrLen;
});
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */ parcelHelpers.export(exports, "normalize", function() {
    return normalize;
});
/**
 * Returns a string representation of a dual quatenion
 *
 * @param {ReadonlyQuat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat2} a the first dual quaternion.
 * @param {ReadonlyQuat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat2} a the first dual quat.
 * @param {ReadonlyQuat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
var _commonJs = require("./common.js");
var _quatJs = require("./quat.js");
var _mat4Js = require("./mat4.js");
function create() {
    var dq = new _commonJs.ARRAY_TYPE(8);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        dq[0] = 0;
        dq[1] = 0;
        dq[2] = 0;
        dq[4] = 0;
        dq[5] = 0;
        dq[6] = 0;
        dq[7] = 0;
    }
    dq[3] = 1;
    return dq;
}
function clone(a) {
    var dq = new _commonJs.ARRAY_TYPE(8);
    dq[0] = a[0];
    dq[1] = a[1];
    dq[2] = a[2];
    dq[3] = a[3];
    dq[4] = a[4];
    dq[5] = a[5];
    dq[6] = a[6];
    dq[7] = a[7];
    return dq;
}
function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
    var dq = new _commonJs.ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    dq[4] = x2;
    dq[5] = y2;
    dq[6] = z2;
    dq[7] = w2;
    return dq;
}
function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
    var dq = new _commonJs.ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
    dq[4] = ax * w1 + ay * z1 - az * y1;
    dq[5] = ay * w1 + az * x1 - ax * z1;
    dq[6] = az * w1 + ax * y1 - ay * x1;
    dq[7] = -ax * x1 - ay * y1 - az * z1;
    return dq;
}
function fromRotationTranslation(out, q, t) {
    var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
    out[0] = bx;
    out[1] = by;
    out[2] = bz;
    out[3] = bw;
    out[4] = ax * bw + ay * bz - az * by;
    out[5] = ay * bw + az * bx - ax * bz;
    out[6] = az * bw + ax * by - ay * bx;
    out[7] = -ax * bx - ay * by - az * bz;
    return out;
}
function fromTranslation(out, t) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = t[0] * 0.5;
    out[5] = t[1] * 0.5;
    out[6] = t[2] * 0.5;
    out[7] = 0;
    return out;
}
function fromRotation(out, q) {
    out[0] = q[0];
    out[1] = q[1];
    out[2] = q[2];
    out[3] = q[3];
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
}
function fromMat4(out, a) {
    //TODO Optimize this
    var outer = _quatJs.create();
    _mat4Js.getRotation(outer, a);
    var t = new _commonJs.ARRAY_TYPE(3);
    _mat4Js.getTranslation(t, a);
    fromRotationTranslation(out, outer, t);
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    return out;
}
function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
}
function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
    out[0] = x1;
    out[1] = y1;
    out[2] = z1;
    out[3] = w1;
    out[4] = x2;
    out[5] = y2;
    out[6] = z2;
    out[7] = w2;
    return out;
}
var getReal = _quatJs.copy;
function getDual(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    out[2] = a[6];
    out[3] = a[7];
    return out;
}
var setReal = _quatJs.copy;
function setDual(out, q) {
    out[4] = q[0];
    out[5] = q[1];
    out[6] = q[2];
    out[7] = q[3];
    return out;
}
function getTranslation(out, a) {
    var ax = a[4], ay = a[5], az = a[6], aw = a[7], bx = -a[0], by = -a[1], bz = -a[2], bw = a[3];
    out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    return out;
}
function translate(out, a, v) {
    var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3], bx1 = v[0] * 0.5, by1 = v[1] * 0.5, bz1 = v[2] * 0.5, ax2 = a[4], ay2 = a[5], az2 = a[6], aw2 = a[7];
    out[0] = ax1;
    out[1] = ay1;
    out[2] = az1;
    out[3] = aw1;
    out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
    out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
    out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
    out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
    return out;
}
function rotateX(out, a, rad) {
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
    _quatJs.rotateX(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
}
function rotateY(out, a, rad) {
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
    _quatJs.rotateY(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
}
function rotateZ(out, a, rad) {
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
    _quatJs.rotateZ(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
}
function rotateByQuatAppend(out, a, q) {
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3], ax = a[0], ay = a[1], az = a[2], aw = a[3];
    out[0] = ax * qw + aw * qx + ay * qz - az * qy;
    out[1] = ay * qw + aw * qy + az * qx - ax * qz;
    out[2] = az * qw + aw * qz + ax * qy - ay * qx;
    out[3] = aw * qw - ax * qx - ay * qy - az * qz;
    ax = a[4];
    ay = a[5];
    az = a[6];
    aw = a[7];
    out[4] = ax * qw + aw * qx + ay * qz - az * qy;
    out[5] = ay * qw + aw * qy + az * qx - ax * qz;
    out[6] = az * qw + aw * qz + ax * qy - ay * qx;
    out[7] = aw * qw - ax * qx - ay * qy - az * qz;
    return out;
}
function rotateByQuatPrepend(out, q, a) {
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
    out[0] = qx * bw + qw * bx + qy * bz - qz * by;
    out[1] = qy * bw + qw * by + qz * bx - qx * bz;
    out[2] = qz * bw + qw * bz + qx * by - qy * bx;
    out[3] = qw * bw - qx * bx - qy * by - qz * bz;
    bx = a[4];
    by = a[5];
    bz = a[6];
    bw = a[7];
    out[4] = qx * bw + qw * bx + qy * bz - qz * by;
    out[5] = qy * bw + qw * by + qz * bx - qx * bz;
    out[6] = qz * bw + qw * bz + qx * by - qy * bx;
    out[7] = qw * bw - qx * bx - qy * by - qz * bz;
    return out;
}
function rotateAroundAxis(out, a, axis, rad) {
    //Special case for rad = 0
    if (Math.abs(rad) < _commonJs.EPSILON) return copy(out, a);
    var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
    rad = rad * 0.5;
    var s = Math.sin(rad);
    var bx = s * axis[0] / axisLength;
    var by = s * axis[1] / axisLength;
    var bz = s * axis[2] / axisLength;
    var bw = Math.cos(rad);
    var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
    out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    var ax = a[4], ay = a[5], az = a[6], aw = a[7];
    out[4] = ax * bw + aw * bx + ay * bz - az * by;
    out[5] = ay * bw + aw * by + az * bx - ax * bz;
    out[6] = az * bw + aw * bz + ax * by - ay * bx;
    out[7] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    return out;
}
function multiply(out, a, b) {
    var ax0 = a[0], ay0 = a[1], az0 = a[2], aw0 = a[3], bx1 = b[4], by1 = b[5], bz1 = b[6], bw1 = b[7], ax1 = a[4], ay1 = a[5], az1 = a[6], aw1 = a[7], bx0 = b[0], by0 = b[1], bz0 = b[2], bw0 = b[3];
    out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
    out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
    out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
    out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
    out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
    out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
    out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
    out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
    return out;
}
var mul = multiply;
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    return out;
}
var dot = _quatJs.dot;
function lerp(out, a, b, t) {
    var mt = 1 - t;
    if (dot(a, b) < 0) t = -t;
    out[0] = a[0] * mt + b[0] * t;
    out[1] = a[1] * mt + b[1] * t;
    out[2] = a[2] * mt + b[2] * t;
    out[3] = a[3] * mt + b[3] * t;
    out[4] = a[4] * mt + b[4] * t;
    out[5] = a[5] * mt + b[5] * t;
    out[6] = a[6] * mt + b[6] * t;
    out[7] = a[7] * mt + b[7] * t;
    return out;
}
function invert(out, a) {
    var sqlen = squaredLength(a);
    out[0] = -a[0] / sqlen;
    out[1] = -a[1] / sqlen;
    out[2] = -a[2] / sqlen;
    out[3] = a[3] / sqlen;
    out[4] = -a[4] / sqlen;
    out[5] = -a[5] / sqlen;
    out[6] = -a[6] / sqlen;
    out[7] = a[7] / sqlen;
    return out;
}
function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    out[4] = -a[4];
    out[5] = -a[5];
    out[6] = -a[6];
    out[7] = a[7];
    return out;
}
var length = _quatJs.length;
var len = length;
var squaredLength = _quatJs.squaredLength;
var sqrLen = squaredLength;
function normalize(out, a) {
    var magnitude = squaredLength(a);
    if (magnitude > 0) {
        magnitude = Math.sqrt(magnitude);
        var a0 = a[0] / magnitude;
        var a1 = a[1] / magnitude;
        var a2 = a[2] / magnitude;
        var a3 = a[3] / magnitude;
        var b0 = a[4];
        var b1 = a[5];
        var b2 = a[6];
        var b3 = a[7];
        var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
        out[0] = a0;
        out[1] = a1;
        out[2] = a2;
        out[3] = a3;
        out[4] = (b0 - a0 * a_dot_b) / magnitude;
        out[5] = (b1 - a1 * a_dot_b) / magnitude;
        out[6] = (b2 - a2 * a_dot_b) / magnitude;
        out[7] = (b3 - a3 * a_dot_b) / magnitude;
    }
    return out;
}
function str(a) {
    return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _commonJs.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _commonJs.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _commonJs.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _commonJs.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _commonJs.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _commonJs.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7));
}

},{"./common.js":"6oUFo","./quat.js":"kG86h","./mat4.js":"eMvnq","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"6eLVl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 2 Dimensional Vector
 * @module vec2
 */ /**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */ parcelHelpers.export(exports, "create", function() {
    return create;
});
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */ parcelHelpers.export(exports, "clone", function() {
    return clone;
});
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */ parcelHelpers.export(exports, "fromValues", function() {
    return fromValues;
});
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "copy", function() {
    return copy;
});
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "set", function() {
    return set;
});
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "add", function() {
    return add;
});
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "subtract", function() {
    return subtract;
});
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "multiply", function() {
    return multiply;
});
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "divide", function() {
    return divide;
});
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "ceil", function() {
    return ceil;
});
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "floor", function() {
    return floor;
});
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "min", function() {
    return min;
});
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "max", function() {
    return max;
});
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "round", function() {
    return round;
});
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "scale", function() {
    return scale;
});
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "scaleAndAdd", function() {
    return scaleAndAdd;
});
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */ parcelHelpers.export(exports, "distance", function() {
    return distance;
});
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */ parcelHelpers.export(exports, "squaredDistance", function() {
    return squaredDistance;
});
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */ parcelHelpers.export(exports, "length", function() {
    return length;
});
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */ parcelHelpers.export(exports, "squaredLength", function() {
    return squaredLength;
});
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "negate", function() {
    return negate;
});
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "inverse", function() {
    return inverse;
});
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "normalize", function() {
    return normalize;
});
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */ parcelHelpers.export(exports, "dot", function() {
    return dot;
});
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */ parcelHelpers.export(exports, "cross", function() {
    return cross;
});
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "lerp", function() {
    return lerp;
});
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "random", function() {
    return random;
});
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "transformMat2", function() {
    return transformMat2;
});
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "transformMat2d", function() {
    return transformMat2d;
});
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "transformMat3", function() {
    return transformMat3;
});
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "transformMat4", function() {
    return transformMat4;
});
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "rotate", function() {
    return rotate;
});
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */ parcelHelpers.export(exports, "angle", function() {
    return angle;
});
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */ parcelHelpers.export(exports, "zero", function() {
    return zero;
});
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */ parcelHelpers.export(exports, "str", function() {
    return str;
});
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ parcelHelpers.export(exports, "exactEquals", function() {
    return exactEquals;
});
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ parcelHelpers.export(exports, "equals", function() {
    return equals;
});
parcelHelpers.export(exports, "len", function() {
    return len;
});
parcelHelpers.export(exports, "sub", function() {
    return sub;
});
parcelHelpers.export(exports, "mul", function() {
    return mul;
});
parcelHelpers.export(exports, "div", function() {
    return div;
});
parcelHelpers.export(exports, "dist", function() {
    return dist;
});
parcelHelpers.export(exports, "sqrDist", function() {
    return sqrDist;
});
parcelHelpers.export(exports, "sqrLen", function() {
    return sqrLen;
});
parcelHelpers.export(exports, "forEach", function() {
    return forEach;
});
var _commonJs = require("./common.js");
function create() {
    var out = new _commonJs.ARRAY_TYPE(2);
    if (_commonJs.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
    }
    return out;
}
function clone(a) {
    var out = new _commonJs.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
}
function fromValues(x, y) {
    var out = new _commonJs.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
}
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}
function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
}
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
}
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
}
function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
}
function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
}
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
}
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
}
function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
}
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}
function scaleAndAdd(out, a, b, scale1) {
    out[0] = a[0] + b[0] * scale1;
    out[1] = a[1] + b[1] * scale1;
    return out;
}
function distance(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return Math.hypot(x, y);
}
function squaredDistance(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return x * x + y * y;
}
function length(a) {
    var x = a[0], y = a[1];
    return Math.hypot(x, y);
}
function squaredLength(a) {
    var x = a[0], y = a[1];
    return x * x + y * y;
}
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}
function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    return out;
}
function normalize(out, a) {
    var x = a[0], y = a[1];
    var len1 = x * x + y * y;
    if (len1 > 0) //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
    out[0] = a[0] * len1;
    out[1] = a[1] * len1;
    return out;
}
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}
function cross(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
}
function lerp(out, a, b, t) {
    var ax = a[0], ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}
function random(out, scale2) {
    scale2 = scale2 || 1;
    var r = _commonJs.RANDOM() * 2 * Math.PI;
    out[0] = Math.cos(r) * scale2;
    out[1] = Math.sin(r) * scale2;
    return out;
}
function transformMat2(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
}
function transformMat2d(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}
function transformMat3(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}
function transformMat4(out, a, m) {
    var x = a[0];
    var y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}
function rotate(out, a, b, rad) {
    //Translate point to the origin
    var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad); //perform rotation and translate to correct position
    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
}
function angle(a, b) {
    var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], // mag is the product of the magnitudes of a and b
    mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), // mag &&.. short circuits if mag == 0
    cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
    out[0] = 0;
    out[1] = 0;
    return out;
}
function str(a) {
    return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
function equals(a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return Math.abs(a0 - b0) <= _commonJs.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _commonJs.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len = length;
var sub = subtract;
var mul = multiply;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var sqrLen = squaredLength;
var forEach = function() {
    var vec = create();
    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) stride = 2;
        if (!offset) offset = 0;
        if (count) l = Math.min(count * stride + offset, a.length);
        else l = a.length;
        for(i = offset; i < l; i += stride){
            vec[0] = a[i];
            vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
        }
        return a;
    };
}();

},{"./common.js":"6oUFo","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"in93W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OrbitControl", function() {
    return OrbitControl;
});
var _helpers = require("@swc/helpers");
var _glMatrix = require("gl-matrix");
var OrbitControl = /*#__PURE__*/ function() {
    "use strict";
    function OrbitControl(canvas, camera, updateCallback) {
        var _this = this;
        _helpers.classCallCheck(this, OrbitControl);
        this.pointerDown = false;
        this.pointerDownPos = {
            x: 0,
            y: 0
        };
        this.pointerPos = {
            x: 0,
            y: 0
        };
        this.followPos = {
            x: 0,
            y: 0
        };
        this.prevFollowPos = {
            x: 0,
            y: 0
        };
        this.phi = 0;
        this.theta = 0;
        this.camera = camera;
        this.updateCallback = updateCallback;
        canvas.style.touchAction = 'none';
        canvas.addEventListener('pointerdown', function(e) {
            _this.pointerDownPos = {
                x: e.clientX,
                y: e.clientY
            };
            _this.followPos = {
                x: e.clientX,
                y: e.clientY
            };
            _this.pointerPos = {
                x: e.clientX,
                y: e.clientY
            };
            _this.prevFollowPos = {
                x: e.clientX,
                y: e.clientY
            };
            _this.pointerDownCameraUp = _helpers.toConsumableArray(_this.camera.up);
            _this.pointerDownRotation = _helpers.toConsumableArray(_this.camera.rotation);
            _this.pointerDown = true;
        });
        canvas.addEventListener('pointerup', function(e) {
            _this.pointerDown = false;
        });
        canvas.addEventListener('pointermove', function(e) {
            if (_this.pointerDown) _this.pointerPos = {
                x: e.clientX,
                y: e.clientY
            };
        });
    }
    _helpers.createClass(OrbitControl, [
        {
            key: "update",
            value: function update() {
                if (this.pointerDown) {
                    var damping = 10;
                    this.followPos.x += (this.pointerPos.x - this.followPos.x) / damping;
                    this.followPos.y += (this.pointerPos.y - this.followPos.y) / damping;
                    var delta = {
                        x: this.followPos.x - this.prevFollowPos.x,
                        y: this.followPos.y - this.prevFollowPos.y
                    };
                    this.prevFollowPos = _helpers.objectSpread({
                    }, this.followPos);
                    var speed = 0.2;
                    this.phi = delta.x * speed;
                    this.theta = delta.y * speed;
                } else {
                    this.phi *= 0.96;
                    this.theta *= 0.96;
                }
                this.camera.rotation[0] -= this.theta;
                this.camera.rotation[1] -= this.phi;
                var thetaLimitUp = -8;
                var thetaLimitDown = -80;
                if (this.camera.rotation[0] > thetaLimitUp) this.camera.rotation[0] = thetaLimitUp;
                else if (this.camera.rotation[0] < thetaLimitDown) this.camera.rotation[0] = thetaLimitDown;
                _glMatrix.quat.fromEuler(this.camera.orbit, this.camera.rotation[0], this.camera.rotation[1], this.camera.rotation[2]);
                _glMatrix.vec3.transformQuat(this.camera.position, [
                    0,
                    0,
                    this.camera.distance
                ], this.camera.orbit);
                this.updateCallback();
            }
        }
    ]);
    return OrbitControl;
}();

},{"@swc/helpers":"erO4s","gl-matrix":"kiQSi","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"ffLkj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "seed", function() {
    return seed1;
});
parcelHelpers.export(exports, "simplex2", function() {
    return simplex2;
});
parcelHelpers.export(exports, "simplex3", function() {
    return simplex3;
});
parcelHelpers.export(exports, "perlin2", function() {
    return perlin2;
});
parcelHelpers.export(exports, "perlin3", function() {
    return perlin3;
});
/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */ function Grad(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}
Grad.prototype.dot2 = function(x, y) {
    return this.x * x + this.y * y;
};
Grad.prototype.dot3 = function(x, y, z) {
    return this.x * x + this.y * y + this.z * z;
};
var grad3 = [
    new Grad(1, 1, 0),
    new Grad(-1, 1, 0),
    new Grad(1, -1, 0),
    new Grad(-1, -1, 0),
    new Grad(1, 0, 1),
    new Grad(-1, 0, 1),
    new Grad(1, 0, -1),
    new Grad(-1, 0, -1),
    new Grad(0, 1, 1),
    new Grad(0, -1, 1),
    new Grad(0, 1, -1),
    new Grad(0, -1, -1)
];
var p = [
    151,
    160,
    137,
    91,
    90,
    15,
    131,
    13,
    201,
    95,
    96,
    53,
    194,
    233,
    7,
    225,
    140,
    36,
    103,
    30,
    69,
    142,
    8,
    99,
    37,
    240,
    21,
    10,
    23,
    190,
    6,
    148,
    247,
    120,
    234,
    75,
    0,
    26,
    197,
    62,
    94,
    252,
    219,
    203,
    117,
    35,
    11,
    32,
    57,
    177,
    33,
    88,
    237,
    149,
    56,
    87,
    174,
    20,
    125,
    136,
    171,
    168,
    68,
    175,
    74,
    165,
    71,
    134,
    139,
    48,
    27,
    166,
    77,
    146,
    158,
    231,
    83,
    111,
    229,
    122,
    60,
    211,
    133,
    230,
    220,
    105,
    92,
    41,
    55,
    46,
    245,
    40,
    244,
    102,
    143,
    54,
    65,
    25,
    63,
    161,
    1,
    216,
    80,
    73,
    209,
    76,
    132,
    187,
    208,
    89,
    18,
    169,
    200,
    196,
    135,
    130,
    116,
    188,
    159,
    86,
    164,
    100,
    109,
    198,
    173,
    186,
    3,
    64,
    52,
    217,
    226,
    250,
    124,
    123,
    5,
    202,
    38,
    147,
    118,
    126,
    255,
    82,
    85,
    212,
    207,
    206,
    59,
    227,
    47,
    16,
    58,
    17,
    182,
    189,
    28,
    42,
    223,
    183,
    170,
    213,
    119,
    248,
    152,
    2,
    44,
    154,
    163,
    70,
    221,
    153,
    101,
    155,
    167,
    43,
    172,
    9,
    129,
    22,
    39,
    253,
    19,
    98,
    108,
    110,
    79,
    113,
    224,
    232,
    178,
    185,
    112,
    104,
    218,
    246,
    97,
    228,
    251,
    34,
    242,
    193,
    238,
    210,
    144,
    12,
    191,
    179,
    162,
    241,
    81,
    51,
    145,
    235,
    249,
    14,
    239,
    107,
    49,
    192,
    214,
    31,
    181,
    199,
    106,
    157,
    184,
    84,
    204,
    176,
    115,
    121,
    50,
    45,
    127,
    4,
    150,
    254,
    138,
    236,
    205,
    93,
    222,
    114,
    67,
    29,
    24,
    72,
    243,
    141,
    128,
    195,
    78,
    66,
    215,
    61,
    156,
    180
];
// To remove the need for index wrapping, double the permutation table length
var perm = new Array(512);
var gradP = new Array(512);
var seed1 = function seed1(seed) {
    if (seed > 0 && seed < 1) // Scale the seed out
    seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for(var i = 0; i < 256; i++){
        var v;
        if (i & 1) v = p[i] ^ seed & 255;
        else v = p[i] ^ seed >> 8 & 255;
        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
};
seed1(0);
/*
for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
}*/ // Skewing and unskewing factors for 2, 3, and 4 dimensions
var F2 = 0.5 * (Math.sqrt(3) - 1);
var G2 = (3 - Math.sqrt(3)) / 6;
var F3 = 1 / 3;
var G3 = 1 / 6;
var simplex2 = function simplex2(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin + yin) * F2; // Hairy factor for 2D
    var i = Math.floor(xin + s);
    var j = Math.floor(yin + s);
    var t = (i + j) * G2;
    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin - j + t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if (x0 > y0) {
        i1 = 1;
        j1 = 0;
    } else {
        i1 = 0;
        j1 = 1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    var gi0 = gradP[i + perm[j]];
    var gi1 = gradP[i + i1 + perm[j + j1]];
    var gi2 = gradP[i + 1 + perm[j + 1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0;
    else {
        t0 *= t0;
        n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0;
    else {
        t1 *= t1;
        n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0;
    else {
        t2 *= t2;
        n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
};
var simplex3 = function simplex3(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin + yin + zin) * F3; // Hairy factor for 2D
    var i = Math.floor(xin + s);
    var j = Math.floor(yin + s);
    var k = Math.floor(zin + s);
    var t = (i + j + k) * G3;
    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin - j + t;
    var z0 = zin - k + t;
    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if (x0 >= y0) {
        if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
        } else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
        } else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
        }
    } else {
        if (y0 < z0) {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 0;
            j2 = 1;
            k2 = 1;
        } else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
        } else {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
        }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;
    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;
    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;
    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i + perm[j + perm[k]]];
    var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
    var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
    var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];
    // Calculate the contribution from the four corners
    var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0;
    else {
        t0 *= t0;
        n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0;
    else {
        t1 *= t1;
        n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0;
    else {
        t2 *= t2;
        n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0;
    else {
        t3 *= t3;
        n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);
};
// ##### Perlin noise stuff
function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}
var perlin2 = function perlin2(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X;
    y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255;
    Y = Y & 255;
    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X + perm[Y]].dot2(x, y);
    var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
    var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
    var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
    // Compute the fade curve value for x
    var u = fade(x);
    // Interpolate the four results
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
};
var perlin3 = function perlin3(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X;
    y = y - Y;
    z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;
    // Calculate noise contributions from each of the eight corners
    var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
    var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
    var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
    var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
    var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
    var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
    var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
    var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);
    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);
    // Interpolate
    return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}],"ap6ev":[function(require,module,exports) {
module.exports = "#version 300 es\n#define GLSLIFY 1\n\nuniform mat4 u_worldMatrix;\nuniform mat4 u_viewMatrix;\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_worldInverseTransposeMatrix;\nuniform vec3 u_cameraPosition;\n\nin vec3 a_position;\nin vec3 a_normal;\nin vec2 a_uv;\n\nout vec3 v_position;\nout vec3 v_viewPosition;\nout vec3 v_normal;\nout vec2 v_uv;\nout vec3 v_surfaceToView;\n\nvoid main() {\n    v_uv = a_uv;\n    v_normal = (u_worldInverseTransposeMatrix * vec4(a_normal, 0.)).xyz;\n    vec4 worldPosition = u_worldMatrix * vec4(a_position, 1.);\n    vec4 viewPosition = u_viewMatrix * worldPosition;\n    gl_Position = u_projectionMatrix * viewPosition;\n    v_surfaceToView = u_cameraPosition - worldPosition.xyz;\n    v_position = a_position.xyz;\n    v_viewPosition = viewPosition.xyz;\n}\n";

},{}],"28anX":[function(require,module,exports) {
module.exports = "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform float u_frames;\n\nin vec3 v_position;\nin vec3 v_normal;\nin vec2 v_uv;\nin vec3 v_surfaceToView;\nin vec3 v_viewPosition;\n\nout vec4 outColor;\n\nfloat hash(vec2 p) {\n    p = fract(p * vec2(153.343, 414.3234));\n    p += dot(p, p + 44.463);\n    return fract(p.x * p.y);\n}\n\n//\tSimplex 3D Noise \n//\tby Ian McEwan, Ashima Arts\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  // First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n  // Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C \n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n  // Permutations\n  i = mod(i, 289.0 ); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n  // Gradients\n  // ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n  //Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  // Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat sparkle(vec2 p, float seed) {\n    vec2 id = floor(p);\n    vec2 suv = fract(p) * 2. - 1.;\n    \n    float r = hash(id);\n    float x = fract(r * 54.32);\n    float y = fract(r * 432.33);\n    vec2 offs = vec2(x, y) * 2. - 1.;\n    \n    float d = length(suv - offs);\n    float m = 1. - smoothstep(.0, .12, d);\n    \n    m *= pow(sin(seed + r), 5.);\n    return abs(m);\n}\n\nvoid main() {\n    vec3 pos = v_position;\n    vec3 n = normalize(v_normal);\n    vec3 v = normalize(v_surfaceToView);\n    vec3 l = vec3(0., 1., 0.);\n\n    float nDL = dot(n, l);\n\n    // calculate the reflection vector\n    float nDv = dot(n, v);\n    vec3 r = nDv * n * 2. - v;\n    r = normalize(r);\n\n    // fade the color to black by the distance from the center\n    float fade = 1. - smoothstep(0.2, 1., length(pos.xy) * 0.25);\n    float sparkleFade = 1. - smoothstep(0.9, 1., length(pos.xy) * 0.25);\n\n    // surface shade\n    float shade = nDL * 0.8 + (snoise(r * .5)) * 0.3;\n    shade *= 0.7;\n\n    // create the sand sparkle effect\n    float t = u_frames * 0.0;\n    float sLayer1 = sparkle(pos.xy * 6., t + abs(dot(r + v_viewPosition * 0.01, vec3(10.))));\n    float sLayer2 = sparkle(pos.xy * 12., t + abs(dot(r + v_viewPosition * 0.01, vec3(9.))));\n\n    outColor = vec4(vec3(shade * shade * fade + sLayer1 * sparkleFade + sLayer2 * sparkleFade * 0.7), 1.);\n    outColor.rgb += r * 0.02;\n}\n";

},{}],"aHok2":[function(require,module,exports) {
module.exports = "#version 300 es\n#define GLSLIFY 1\n\nuniform mat4 u_worldMatrix;\nuniform mat4 u_viewMatrix;\nuniform mat4 u_projectionMatrix;\n\nin vec3 a_position;\nin vec2 a_uv;\n\nout vec3 v_position;\nout vec2 v_uv;\n\nvoid main() {\n    v_uv = a_uv;\n    vec4 worldPosition = u_worldMatrix * vec4(a_position, 1.);\n    vec4 viewPosition = u_viewMatrix * worldPosition;\n    gl_Position = u_projectionMatrix * viewPosition;\n}\n";

},{}],"6IoVS":[function(require,module,exports) {
module.exports = "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform float u_frames;\n\nin vec3 v_position;\nin vec2 v_uv;\n\nout vec4 outColor;\n\nfloat hash(vec2 p) {\n    p = fract(p * vec2(153.343, 414.3234));\n    p += dot(p, p + 44.463);\n    return fract(p.x * p.y);\n}\n\n//\tSimplex 3D Noise \n//\tby Ian McEwan, Ashima Arts\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  // First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n  // Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C \n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n  // Permutations\n  i = mod(i, 289.0 ); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n  // Gradients\n  // ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n  //Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  // Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvoid main() {\n    vec3 pos = v_position;\n    float n = snoise(vec3(vec2(v_uv.x * 0.001, v_uv.y * 2. - u_frames * 0.008) * 2., u_frames * 0.01)) * 2. - 1.;\n    vec3 color = vec3(0.); //vec3(0.8, 0.9, 1.) * (n * 0.5);\n    outColor = vec4(color, .7);\n    outColor = vec4(0.6, 0.8, 0.8, 1.) * 0.7;\n}\n";

},{}],"hXDWY":[function(require,module,exports) {
module.exports = "#version 300 es\n#define GLSLIFY 1\n\nin vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4(a_position, 0., 1.);\n}";

},{}],"dg13f":[function(require,module,exports) {
module.exports = "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D u_texture;\n\nout vec4 outColor;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_texture, 0));\n    vec4 color = texture(u_texture, uv);\n    float s1 = 0.5;\n    float s2 = 0.8;\n    vec4 boost = smoothstep(s1, s2, color) - smoothstep(s2, s2 + 0.1 , color);\n    outColor = color + boost.rrra * 0.6;\n}";

},{}],"7yRTB":[function(require,module,exports) {
module.exports = "#version 300 es\n#define GLSLIFY 1\n\nin vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4(a_position, 0., 1.);\n}";

},{}],"lMFKN":[function(require,module,exports) {
module.exports = "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D u_colorTexture;\nuniform sampler2D u_depthTexture;\nuniform int u_maxCoCRadius;\nuniform float u_radiusScale;\n\nlayout(location = 0) out vec4 verticalBlurColor;\nlayout(location = 1) out vec4 diagnoalBlurColor;\n\nbool inNearField(float radiusPixels) {\n    return radiusPixels > 0.25;\n}\n\nfloat getRadius(float depth) {\n    return clamp(smoothstep(.65, 1., depth), 0.001, 1.);\n}\n\nvoid blur(\n    in vec2 A,\n    in vec2 direction,\n    in int maxCoCRadius,\n    in float radiusScale,\n    in sampler2D inTexture,\n    in sampler2D depthTexture,\n    in vec2 off,\n    out vec4 outColor\n) {\n    vec4 resultColor = vec4(0.);\n    float weightSum = 0.;\n\n    // position of the current pixel\n    vec2 texelSize = 1. / vec2(textureSize(inTexture, 0));\n    vec4 colorA = texture(inTexture, A);\n    float depthA = texture(depthTexture, A).x;\n    float rA = getRadius(depthA) * float(maxCoCRadius);\n    int irA = int(floor(rA)) * 2;\n\n    // scatter as you gather loop\n    for(int delta = 0; delta <= irA; ++delta) {\n\n        // get the CoC radius at this tap\n        vec2 B = A + direction * ((float(delta) * radiusScale + off) * texelSize);\n        vec4 colorB = texture(inTexture, B);\n        float depthB = texture(depthTexture, B).x;\n        float rB = getRadius(depthB) * float(maxCoCRadius);\n\n        // get the effect of the CoC at B on the current pixel at A\n        float blurWeight = clamp((rB / float(maxCoCRadius)) * 4., 0., 1.);\n\n        // only consider if B is in front of A\n        float bNearerWeight = clamp(abs(rA) - abs(rB) + 1.5, 0., 1.);\n\n        // get the weight for mid and far field values\n        float weight = bNearerWeight * blurWeight;\n\n        // update the mid/far result\n        weightSum += weight;\n        resultColor.rgb += colorB.rgb * weight;\n    }\n\n    // apply total weights\n    resultColor.rgb /= weightSum;\n    resultColor.a = rA / float(maxCoCRadius);\n\n    outColor = resultColor;\n}\n\n#define PI 3.141593\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_colorTexture, 0));\n\n    blur(\n        uv,\n        vec2(0., -1.),\n        u_maxCoCRadius,\n        u_radiusScale,\n        u_colorTexture,\n        u_depthTexture,\n        vec2(0.5),\n        verticalBlurColor\n    );\n\n    blur(\n        uv,\n        vec2(cos(PI / 6.), sin(PI / 6.)),\n        u_maxCoCRadius,\n        u_radiusScale,\n        u_colorTexture,\n        u_depthTexture,\n        vec2(0.5),\n        diagnoalBlurColor\n    );\n\n    diagnoalBlurColor = verticalBlurColor + diagnoalBlurColor;\n}";

},{}],"2YiGt":[function(require,module,exports) {
module.exports = "#version 300 es\n#define GLSLIFY 1\n\nin vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4(a_position, 0., 1.);\n}";

},{}],"ekbgU":[function(require,module,exports) {
module.exports = "#version 300 es\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D u_verticalBlurTexture;\nuniform sampler2D u_diagonalBlurTexture;\nuniform sampler2D u_depthTexture;\nuniform int u_maxCoCRadius;\nuniform float u_radiusScale;\n\nlayout(location = 0) out vec4 outColor;\n\nbool inNearField(float radiusPixels) {\n    return radiusPixels > 0.25;\n}\n\nfloat getRadius(float depth) {\n    return clamp(smoothstep(.65, 1., depth), 0.001, 1.);\n}\n\nvoid blur(\n    in vec2 A,\n    in vec2 direction,\n    in int maxCoCRadius,\n    in float radiusScale,\n    in sampler2D inTexture,\n    in sampler2D depthTexture,\n    in vec2 off,\n    out vec4 outColor\n) {\n    vec4 resultColor = vec4(0.);\n    float weightSum = 0.;\n\n    // position of the current pixel\n    vec2 texelSize = 1. / vec2(textureSize(inTexture, 0));\n    vec4 colorA = texture(inTexture, A);\n    float depthA = texture(depthTexture, A).x;\n    float rA = getRadius(depthA) * float(maxCoCRadius);\n    int irA = int(floor(rA)) * 2;\n\n    // scatter as you gather loop\n    for(int delta = 0; delta <= irA; ++delta) {\n\n        // get the CoC radius at this tap\n        vec2 B = A + direction * ((float(delta) * radiusScale + off) * texelSize);\n        vec4 colorB = texture(inTexture, B);\n        float depthB = texture(depthTexture, B).x;\n        float rB = getRadius(depthB) * float(maxCoCRadius);\n\n        // get the effect of the CoC at B on the current pixel at A\n        float blurWeight = clamp((rB / float(maxCoCRadius)) * 4., 0., 1.);\n\n        // only consider if B is in front of A\n        float bNearerWeight = clamp(abs(rA) - abs(rB) + 1.5, 0., 1.);\n\n        // get the weight for mid and far field values\n        float weight = bNearerWeight * blurWeight;\n\n        // update the mid/far result\n        weightSum += weight;\n        resultColor.rgb += colorB.rgb * weight;\n    }\n\n    // apply total weights\n    resultColor.rgb /= weightSum;\n    resultColor.a = rA / float(maxCoCRadius);\n\n    outColor = resultColor;\n}\n\n#define PI 3.141593\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_verticalBlurTexture, 0));\n    vec4 verticalBlurColor = texture(u_verticalBlurTexture, uv);\n    vec4 diagnoalBlurColor = texture(u_diagonalBlurTexture, uv);\n    float depth = texture(u_depthTexture, uv).x;\n    vec4 resultColor1;\n    vec4 resultColor2;\n\n    blur(\n        uv,\n        vec2(cos(PI / 6.), sin(PI / 6.)),\n        u_maxCoCRadius,\n        u_radiusScale,\n        u_verticalBlurTexture,\n        u_depthTexture,\n        vec2(0.5),\n        resultColor1\n    );\n\n    blur(\n        uv,\n        vec2(cos((5. * PI) / 6.), sin((5. * PI) / 6.)),\n        u_maxCoCRadius,\n        u_radiusScale,\n        u_diagonalBlurTexture,\n        u_depthTexture,\n        vec2(0.5),\n        resultColor2\n    );\n\n    diagnoalBlurColor = (resultColor1 + resultColor2) * .5;\n\n    outColor = diagnoalBlurColor;\n}";

},{}]},["3nzkr"], "3nzkr", "parcelRequire9217")

//# sourceMappingURL=index.0c100a0a.js.map
