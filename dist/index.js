"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2; var _class3; var _class4; var _class5; var _class6; var _class7; var _class8; var _class9; var _class10; var _class11; var _class12;



var _chunkEX5VYLFXjs = require('./chunk-EX5VYLFX.js');

// node_modules/eventemitter3/index.js
var require_eventemitter3 = _chunkEX5VYLFXjs.__commonJS.call(void 0, {
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    _chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/rfdc/index.js
var require_rfdc = _chunkEX5VYLFXjs.__commonJS.call(void 0, {
  "node_modules/rfdc/index.js"(exports, module) {
    "use strict";
    _chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );
    module.exports = rfdc2;
    function copyBuffer(cur) {
      if (cur instanceof Buffer) {
        return Buffer.from(cur);
      }
      return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
    }
    function rfdc2(opts) {
      opts = opts || {};
      if (opts.circles) return rfdcCircles(opts);
      return opts.proto ? cloneProto : clone2;
      function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur instanceof Date) {
            a2[k] = new Date(cur);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            a2[k] = fn(cur);
          }
        }
        return a2;
      }
      function clone2(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, clone2);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone2));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone2));
        var o2 = {};
        for (var k in o) {
          if (Object.hasOwnProperty.call(o, k) === false) continue;
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), clone2));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), clone2));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = clone2(cur);
          }
        }
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {};
        for (var k in o) {
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = cloneProto(cur);
          }
        }
        return o2;
      }
    }
    function rfdcCircles(opts) {
      var refs = [];
      var refsNew = [];
      return opts.proto ? cloneProto : clone2;
      function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur instanceof Date) {
            a2[k] = new Date(cur);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            var index = refs.indexOf(cur);
            if (index !== -1) {
              a2[k] = refsNew[index];
            } else {
              a2[k] = fn(cur);
            }
          }
        }
        return a2;
      }
      function clone2(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, clone2);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone2));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone2));
        var o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (var k in o) {
          if (Object.hasOwnProperty.call(o, k) === false) continue;
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), clone2));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), clone2));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            var i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = clone2(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null) return o;
        if (o instanceof Date) return new Date(o);
        if (Array.isArray(o)) return cloneArray(o, cloneProto);
        if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (var k in o) {
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            var i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = cloneProto(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
    }
  }
});

// src/index.ts
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );

// src/task.ts
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );

// node_modules/listr2/dist/index.js
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );

// node_modules/eventemitter3/index.mjs
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );
var import_index = _chunkEX5VYLFXjs.__toESM.call(void 0, require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// node_modules/colorette/index.js
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );
var _tty = require('tty'); var tty = _interopRequireWildcard(_tty);
var {
  env = {},
  argv = [],
  platform = ""
} = typeof process === "undefined" ? {} : process;
var isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
var isForced = "FORCE_COLOR" in env || argv.includes("--color");
var isWindows = platform === "win32";
var isDumbTerminal = env.TERM === "dumb";
var isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
var isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
var isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
var replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
var clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
var filterEmpty = (open, close, replace = open, at = open.length + 1) => (string) => string || !(string === "" || string === void 0) ? clearBleed(
  ("" + string).indexOf(close, at),
  string,
  open,
  close,
  replace
) : "";
var init = (open, close, replace) => filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
var colors = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1B[22m\x1B[1m"),
  dim: init(2, 22, "\x1B[22m\x1B[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};
var createColors = ({ useColor = isColorSupported } = {}) => useColor ? colors : Object.keys(colors).reduce(
  (colors2, key) => ({ ...colors2, [key]: String }),
  {}
);
var {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright
} = createColors();

// node_modules/listr2/dist/index.js
var import_rfdc = _chunkEX5VYLFXjs.__toESM.call(void 0, require_rfdc(), 1);
var _util = require('util');
var _os = require('os');
var _string_decoder = require('string_decoder');

var _stream = require('stream');

var _crypto = require('crypto');
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var ANSI_ESCAPE = "\x1B[";
var ANSI_ESCAPE_CODES = {
  CURSOR_HIDE: ANSI_ESCAPE + "?25l",
  CURSOR_SHOW: ANSI_ESCAPE + "?25h"
};
var ListrTaskState = /* @__PURE__ */ ((ListrTaskState2) => {
  ListrTaskState2["WAITING"] = "WAITING";
  ListrTaskState2["STARTED"] = "STARTED";
  ListrTaskState2["COMPLETED"] = "COMPLETED";
  ListrTaskState2["FAILED"] = "FAILED";
  ListrTaskState2["SKIPPED"] = "SKIPPED";
  ListrTaskState2["ROLLING_BACK"] = "ROLLING_BACK";
  ListrTaskState2["ROLLED_BACK"] = "ROLLED_BACK";
  ListrTaskState2["RETRY"] = "RETRY";
  ListrTaskState2["PAUSED"] = "PAUSED";
  ListrTaskState2["PROMPT"] = "PROMPT";
  ListrTaskState2["PROMPT_COMPLETED"] = "PROMPT_COMPLETED";
  ListrTaskState2["PROMPT_FAILED"] = "PROMPT_FAILED";
  return ListrTaskState2;
})(ListrTaskState || {});
var EventManager = (_class = class {constructor() { _class.prototype.__init.call(this); }
  static {
    __name(this, "EventManager");
  }
  __init() {this.emitter = new eventemitter3_default()}
  emit(dispatch, args) {
    this.emitter.emit(dispatch, args);
  }
  on(dispatch, handler) {
    this.emitter.addListener(dispatch, handler);
  }
  once(dispatch, handler) {
    this.emitter.once(dispatch, handler);
  }
  off(dispatch, handler) {
    this.emitter.off(dispatch, handler);
  }
  complete() {
    this.emitter.removeAllListeners();
  }
}, _class);
var BaseEventMap = class {
  static {
    __name(this, "BaseEventMap");
  }
};
function isObservable(obj) {
  return !!obj && typeof obj === "object" && typeof obj.lift === "function" && typeof obj.subscribe === "function";
}
__name(isObservable, "isObservable");
function isReadable(obj) {
  return !!obj && typeof obj === "object" && obj.readable === true && typeof obj.read === "function" && typeof obj.on === "function";
}
__name(isReadable, "isReadable");
function isUnicodeSupported() {
  return !!process.env[
    "LISTR_FORCE_UNICODE"
    /* FORCE_UNICODE */
  ] || process.platform !== "win32" || !!process.env.CI || !!process.env.WT_SESSION || process.env.TERM_PROGRAM === "vscode" || process.env.TERM === "xterm-256color" || process.env.TERM === "alacritty";
}
__name(isUnicodeSupported, "isUnicodeSupported");
var CLEAR_LINE_REGEX = "(?:\\u001b|\\u009b)\\[[\\=><~/#&.:=?%@~_-]*[0-9]*[\\a-ln-tqyz=><~/#&.:=?%@~_-]+";
var BELL_REGEX = /\u0007/;
function cleanseAnsi(chunk) {
  return String(chunk).replace(new RegExp(CLEAR_LINE_REGEX, "gmi"), "").replace(new RegExp(BELL_REGEX, "gmi"), "").trim();
}
__name(cleanseAnsi, "cleanseAnsi");
var color = createColors();
function indent(string, count) {
  return string.replace(/^(?!\s*$)/gm, " ".repeat(count));
}
__name(indent, "indent");
var FIGURES_MAIN = {
  warning: "\u26A0",
  cross: "\u2716",
  arrowDown: "\u2193",
  tick: "\u2714",
  arrowRight: "\u2192",
  pointer: "\u276F",
  checkboxOn: "\u2612",
  arrowLeft: "\u2190",
  squareSmallFilled: "\u25FC",
  pointerSmall: "\u203A"
};
var FIGURES_FALLBACK = {
  ...FIGURES_MAIN,
  warning: "\u203C",
  cross: "\xD7",
  tick: "\u221A",
  pointer: ">",
  checkboxOn: "[\xD7]",
  squareSmallFilled: "\u25A0"
};
var figures = isUnicodeSupported() ? FIGURES_MAIN : FIGURES_FALLBACK;
function splat(message, ...splat2) {
  return _util.format.call(void 0, String(message), ...splat2);
}
__name(splat, "splat");
var LISTR_LOGGER_STYLE = {
  icon: {
    [
      "STARTED"
      /* STARTED */
    ]: figures.pointer,
    [
      "FAILED"
      /* FAILED */
    ]: figures.cross,
    [
      "SKIPPED"
      /* SKIPPED */
    ]: figures.arrowDown,
    [
      "COMPLETED"
      /* COMPLETED */
    ]: figures.tick,
    [
      "OUTPUT"
      /* OUTPUT */
    ]: figures.pointerSmall,
    [
      "TITLE"
      /* TITLE */
    ]: figures.arrowRight,
    [
      "RETRY"
      /* RETRY */
    ]: figures.warning,
    [
      "ROLLBACK"
      /* ROLLBACK */
    ]: figures.arrowLeft,
    [
      "PAUSED"
      /* PAUSED */
    ]: figures.squareSmallFilled
  },
  color: {
    [
      "STARTED"
      /* STARTED */
    ]: color.yellow,
    [
      "FAILED"
      /* FAILED */
    ]: color.red,
    [
      "SKIPPED"
      /* SKIPPED */
    ]: color.yellow,
    [
      "COMPLETED"
      /* COMPLETED */
    ]: color.green,
    [
      "RETRY"
      /* RETRY */
    ]: color.yellowBright,
    [
      "ROLLBACK"
      /* ROLLBACK */
    ]: color.redBright,
    [
      "PAUSED"
      /* PAUSED */
    ]: color.yellowBright
  }
};
var LISTR_LOGGER_STDERR_LEVELS = [
  "RETRY",
  "ROLLBACK",
  "FAILED"
  /* FAILED */
];
var ListrLogger = class {
  constructor(options) {
    this.options = options;
    this.options = {
      useIcons: true,
      toStderr: [],
      ..._nullishCoalesce(options, () => ( {}))
    };
    this.options.fields ??= {};
    this.options.fields.prefix ??= [];
    this.options.fields.suffix ??= [];
    this.process = _nullishCoalesce(this.options.processOutput, () => ( new ProcessOutput()));
  }
  static {
    __name(this, "ListrLogger");
  }
  
  log(level, message, options) {
    const output = this.format(level, message, options);
    if (this.options.toStderr.includes(level)) {
      this.process.toStderr(output);
      return;
    }
    this.process.toStdout(output);
  }
  toStdout(message, options, eol = true) {
    this.process.toStdout(this.format(null, message, options), eol);
  }
  toStderr(message, options, eol = true) {
    this.process.toStderr(this.format(null, message, options), eol);
  }
  wrap(message, options) {
    if (!message) {
      return message;
    }
    return this.applyFormat(`[${message}]`, options);
  }
  splat(...args) {
    const message = _nullishCoalesce(args.shift(), () => ( ""));
    return args.length === 0 ? message : splat(message, args);
  }
  suffix(message, ...suffixes) {
    suffixes.filter(Boolean).forEach((suffix) => {
      message += this.spacing(message);
      if (typeof suffix === "string") {
        message += this.wrap(suffix);
      } else if (typeof suffix === "object") {
        suffix.args ??= [];
        if (typeof suffix.condition === "function" ? !suffix.condition(...suffix.args) : !(_nullishCoalesce(suffix.condition, () => ( true)))) {
          return message;
        }
        message += this.wrap(typeof suffix.field === "function" ? suffix.field(...suffix.args) : suffix.field, {
          format: _optionalChain([suffix, 'optionalAccess', _ => _.format, 'call', _2 => _2(...suffix.args)])
        });
      }
    });
    return message;
  }
  prefix(message, ...prefixes) {
    prefixes.filter(Boolean).forEach((prefix) => {
      message = this.spacing(message) + message;
      if (typeof prefix === "string") {
        message = this.wrap(prefix) + message;
      } else if (typeof prefix === "object") {
        prefix.args ??= [];
        if (typeof prefix.condition === "function" ? !prefix.condition(...prefix.args) : !(_nullishCoalesce(prefix.condition, () => ( true)))) {
          return message;
        }
        message = this.wrap(typeof prefix.field === "function" ? prefix.field(...prefix.args) : prefix.field, {
          format: _optionalChain([prefix, 'optionalAccess', _3 => _3.format, 'call', _4 => _4()])
        }) + message;
      }
    });
    return message;
  }
  fields(message, options) {
    if (_optionalChain([this, 'access', _5 => _5.options, 'optionalAccess', _6 => _6.fields, 'optionalAccess', _7 => _7.prefix])) {
      message = this.prefix(message, ...this.options.fields.prefix);
    }
    if (_optionalChain([options, 'optionalAccess', _8 => _8.prefix])) {
      message = this.prefix(message, ...options.prefix);
    }
    if (_optionalChain([options, 'optionalAccess', _9 => _9.suffix])) {
      message = this.suffix(message, ...options.suffix);
    }
    if (_optionalChain([this, 'access', _10 => _10.options, 'optionalAccess', _11 => _11.fields, 'optionalAccess', _12 => _12.suffix])) {
      message = this.suffix(message, ...this.options.fields.suffix);
    }
    return message;
  }
  icon(level, icon) {
    if (!level) {
      return null;
    }
    icon ||= _optionalChain([this, 'access', _13 => _13.options, 'access', _14 => _14.icon, 'optionalAccess', _15 => _15[level]]);
    const coloring = _optionalChain([this, 'access', _16 => _16.options, 'access', _17 => _17.color, 'optionalAccess', _18 => _18[level]]);
    if (icon && coloring) {
      icon = coloring(icon);
    }
    return icon;
  }
  format(level, message, options) {
    if (!Array.isArray(message)) {
      message = [message];
    }
    message = this.splat(message.shift(), ...message).toString().split(_os.EOL).filter((m) => !m || m.trim() !== "").map((m) => {
      return this.style(
        level,
        this.fields(m, {
          prefix: Array.isArray(_optionalChain([options, 'optionalAccess', _19 => _19.prefix])) ? options.prefix : [_optionalChain([options, 'optionalAccess', _20 => _20.prefix])],
          suffix: Array.isArray(_optionalChain([options, 'optionalAccess', _21 => _21.suffix])) ? options.suffix : [_optionalChain([options, 'optionalAccess', _22 => _22.suffix])]
        })
      );
    }).join(_os.EOL);
    return message;
  }
  style(level, message) {
    if (!level || !message) {
      return message;
    }
    const icon = this.icon(level, !this.options.useIcons && this.wrap(level));
    if (icon) {
      message = icon + " " + message;
    }
    return message;
  }
  applyFormat(message, options) {
    if (_optionalChain([options, 'optionalAccess', _23 => _23.format])) {
      return options.format(message);
    }
    return message;
  }
  spacing(message) {
    return typeof message === "undefined" || message.trim() === "" ? "" : " ";
  }
};
var ProcessOutputBuffer = (_class2 = class {
  constructor(options) {;_class2.prototype.__init2.call(this);_class2.prototype.__init3.call(this);
    this.options = options;
  }
  static {
    __name(this, "ProcessOutputBuffer");
  }
  __init2() {this.buffer = []}
  __init3() {this.decoder = new (0, _string_decoder.StringDecoder)()}
  get all() {
    return this.buffer;
  }
  get last() {
    return this.buffer.at(-1);
  }
  get length() {
    return this.buffer.length;
  }
  write(data, ...args) {
    const callback = args[args.length - 1];
    this.buffer.push({
      time: Date.now(),
      stream: _optionalChain([this, 'access', _24 => _24.options, 'optionalAccess', _25 => _25.stream]),
      entry: this.decoder.write(typeof data === "string" ? Buffer.from(data, typeof args[0] === "string" ? args[0] : void 0) : Buffer.from(data))
    });
    if (_optionalChain([this, 'access', _26 => _26.options, 'optionalAccess', _27 => _27.limit])) {
      this.buffer = this.buffer.slice(-this.options.limit);
    }
    if (typeof callback === "function") {
      callback();
    }
    return true;
  }
  reset() {
    this.buffer = [];
  }
}, _class2);
var ProcessOutputStream = class {
  constructor(stream) {
    this.stream = stream;
    this.method = stream.write;
    this.buffer = new ProcessOutputBuffer({ stream });
  }
  static {
    __name(this, "ProcessOutputStream");
  }
  
  
  get out() {
    return Object.assign({}, this.stream, {
      write: this.write.bind(this)
    });
  }
  hijack() {
    this.stream.write = this.buffer.write.bind(this.buffer);
  }
  release() {
    this.stream.write = this.method;
    const buffer = [...this.buffer.all];
    this.buffer.reset();
    return buffer;
  }
  write(...args) {
    return this.method.apply(this.stream, args);
  }
};
var ProcessOutput = class {
  constructor(stdout, stderr, options) {
    this.options = options;
    this.stream = {
      stdout: new ProcessOutputStream(_nullishCoalesce(stdout, () => ( process.stdout))),
      stderr: new ProcessOutputStream(_nullishCoalesce(stderr, () => ( process.stderr)))
    };
    this.options = {
      dump: ["stdout", "stderr"],
      leaveEmptyLine: true,
      ...options
    };
  }
  static {
    __name(this, "ProcessOutput");
  }
  
  
  get stdout() {
    return this.stream.stdout.out;
  }
  get stderr() {
    return this.stream.stderr.out;
  }
  hijack() {
    if (this.active) {
      throw new Error("ProcessOutput has been already hijacked!");
    }
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE);
    Object.values(this.stream).forEach((stream) => stream.hijack());
    this.active = true;
  }
  release() {
    const output = Object.entries(this.stream).map(([name, stream]) => ({ name, buffer: stream.release() })).filter((output2) => this.options.dump.includes(output2.name)).flatMap((output2) => output2.buffer).sort((a, b) => a.time - b.time).map((message) => {
      return {
        ...message,
        entry: cleanseAnsi(message.entry)
      };
    }).filter((message) => message.entry);
    if (output.length > 0) {
      if (this.options.leaveEmptyLine) {
        this.stdout.write(_os.EOL);
      }
      output.forEach((message) => {
        const stream = _nullishCoalesce(message.stream, () => ( this.stdout));
        stream.write(message.entry + _os.EOL);
      });
    }
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW);
    this.active = false;
  }
  toStdout(buffer, eol = true) {
    if (eol) {
      buffer = buffer + _os.EOL;
    }
    return this.stream.stdout.write(buffer);
  }
  toStderr(buffer, eol = true) {
    if (eol) {
      buffer = buffer + _os.EOL;
    }
    return this.stream.stderr.write(buffer);
  }
};
function createWritable(cb) {
  const writable = new (0, _stream.Writable)();
  writable.write = (chunk) => {
    cb(chunk.toString());
    return true;
  };
  return writable;
}
__name(createWritable, "createWritable");
var ListrPromptAdapter = class {
  constructor(task, wrapper) {
    this.task = task;
    this.wrapper = wrapper;
  }
  static {
    __name(this, "ListrPromptAdapter");
  }
  
  reportStarted() {
    this.state = this.task.state;
    if (this.task.prompt) {
      throw new PromptError("There is already an active prompt attached to this task which may not be cleaned up properly.");
    }
    this.task.prompt = this;
    this.task.state$ = "PROMPT";
  }
  reportFailed() {
    this.task.state$ = "PROMPT_FAILED";
    this.restoreState();
  }
  reportCompleted() {
    this.task.state$ = "PROMPT_COMPLETED";
    this.restoreState();
  }
  restoreState() {
    this.task.prompt = void 0;
    if (this.state) {
      this.task.state = this.state;
    }
  }
};
var Spinner = (_class3 = class {constructor() { _class3.prototype.__init4.call(this);_class3.prototype.__init5.call(this); }
  static {
    __name(this, "Spinner");
  }
  __init4() {this.spinner = !isUnicodeSupported() ? ["-", "\\", "|", "/"] : ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"]}
  
  __init5() {this.spinnerPosition = 0}
  spin() {
    this.spinnerPosition = ++this.spinnerPosition % this.spinner.length;
  }
  fetch() {
    return this.spinner[this.spinnerPosition];
  }
  isRunning() {
    return !!this.id;
  }
  start(cb, interval = 100) {
    this.id = setInterval(() => {
      this.spin();
      if (cb) {
        cb();
      }
    }, interval);
  }
  stop() {
    clearInterval(this.id);
  }
}, _class3);
var LISTR_DEFAULT_RENDERER_STYLE = {
  icon: {
    [
      "SKIPPED_WITH_COLLAPSE"
      /* SKIPPED_WITH_COLLAPSE */
    ]: figures.arrowDown,
    [
      "SKIPPED_WITHOUT_COLLAPSE"
      /* SKIPPED_WITHOUT_COLLAPSE */
    ]: figures.warning,
    [
      "OUTPUT"
      /* OUTPUT */
    ]: figures.pointerSmall,
    [
      "OUTPUT_WITH_BOTTOMBAR"
      /* OUTPUT_WITH_BOTTOMBAR */
    ]: figures.pointerSmall,
    [
      "PENDING"
      /* PENDING */
    ]: figures.pointer,
    [
      "COMPLETED"
      /* COMPLETED */
    ]: figures.tick,
    [
      "COMPLETED_WITH_FAILED_SUBTASKS"
      /* COMPLETED_WITH_FAILED_SUBTASKS */
    ]: figures.warning,
    [
      "COMPLETED_WITH_SISTER_TASKS_FAILED"
      /* COMPLETED_WITH_FAILED_SISTER_TASKS */
    ]: figures.squareSmallFilled,
    [
      "RETRY"
      /* RETRY */
    ]: figures.warning,
    [
      "ROLLING_BACK"
      /* ROLLING_BACK */
    ]: figures.warning,
    [
      "ROLLED_BACK"
      /* ROLLED_BACK */
    ]: figures.arrowLeft,
    [
      "FAILED"
      /* FAILED */
    ]: figures.cross,
    [
      "FAILED_WITH_SUBTASKS"
      /* FAILED_WITH_FAILED_SUBTASKS */
    ]: figures.pointer,
    [
      "WAITING"
      /* WAITING */
    ]: figures.squareSmallFilled,
    [
      "PAUSED"
      /* PAUSED */
    ]: figures.squareSmallFilled
  },
  color: {
    [
      "SKIPPED_WITH_COLLAPSE"
      /* SKIPPED_WITH_COLLAPSE */
    ]: color.yellow,
    [
      "SKIPPED_WITHOUT_COLLAPSE"
      /* SKIPPED_WITHOUT_COLLAPSE */
    ]: color.yellow,
    [
      "PENDING"
      /* PENDING */
    ]: color.yellow,
    [
      "COMPLETED"
      /* COMPLETED */
    ]: color.green,
    [
      "COMPLETED_WITH_FAILED_SUBTASKS"
      /* COMPLETED_WITH_FAILED_SUBTASKS */
    ]: color.yellow,
    [
      "COMPLETED_WITH_SISTER_TASKS_FAILED"
      /* COMPLETED_WITH_FAILED_SISTER_TASKS */
    ]: color.red,
    [
      "RETRY"
      /* RETRY */
    ]: color.yellowBright,
    [
      "ROLLING_BACK"
      /* ROLLING_BACK */
    ]: color.redBright,
    [
      "ROLLED_BACK"
      /* ROLLED_BACK */
    ]: color.redBright,
    [
      "FAILED"
      /* FAILED */
    ]: color.red,
    [
      "FAILED_WITH_SUBTASKS"
      /* FAILED_WITH_FAILED_SUBTASKS */
    ]: color.red,
    [
      "WAITING"
      /* WAITING */
    ]: color.dim,
    [
      "PAUSED"
      /* PAUSED */
    ]: color.yellowBright
  }
};
function parseTimer(duration) {
  const seconds = Math.floor(duration / 1e3);
  const minutes = Math.floor(seconds / 60);
  let parsedTime;
  if (seconds === 0 && minutes === 0) {
    parsedTime = `0.${Math.floor(duration / 100)}s`;
  }
  if (seconds > 0) {
    parsedTime = `${seconds % 60}s`;
  }
  if (minutes > 0) {
    parsedTime = `${minutes}m${parsedTime}`;
  }
  return parsedTime;
}
__name(parseTimer, "parseTimer");
var PRESET_TIMER = {
  condition: true,
  field: parseTimer,
  format: () => color.dim
};
function parseTimestamp() {
  const now = /* @__PURE__ */ new Date();
  return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + ":" + String(now.getSeconds()).padStart(2, "0");
}
__name(parseTimestamp, "parseTimestamp");
var DefaultRenderer = (_class4 = class _DefaultRenderer {
  constructor(tasks, options, events) {;_class4.prototype.__init6.call(this);_class4.prototype.__init7.call(this);
    this.tasks = tasks;
    this.options = options;
    this.events = events;
    this.options = {
      ..._DefaultRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_DEFAULT_RENDERER_STYLE.icon,
        ..._nullishCoalesce(_optionalChain([options, 'optionalAccess', _28 => _28.icon]), () => ( {}))
      },
      color: {
        ...LISTR_DEFAULT_RENDERER_STYLE.color,
        ..._nullishCoalesce(_optionalChain([options, 'optionalAccess', _29 => _29.color]), () => ( {}))
      }
    };
    this.spinner = _nullishCoalesce(this.options.spinner, () => ( new Spinner()));
    this.logger = _nullishCoalesce(this.options.logger, () => ( new ListrLogger({ useIcons: true, toStderr: [] })));
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
  }
  static {
    __name(this, "DefaultRenderer");
  }
  static __initStatic() {this.nonTTY = false}
  static __initStatic2() {this.rendererOptions = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapseSubtasks: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: false,
    collapseErrors: true,
    showErrorMessage: true,
    suffixRetries: true,
    lazy: false,
    removeEmptyLines: true,
    formatOutput: "wrap",
    pausedTimer: {
      ...PRESET_TIMER,
      format: () => color.yellowBright
    }
  }}
  static __initStatic3() {this.rendererTaskOptions = {
    outputBar: true
  }}
  
  
  
  
  
  
  
  __init6() {this.buffer = {
    output: /* @__PURE__ */ new Map(),
    bottom: /* @__PURE__ */ new Map()
  }}
  __init7() {this.cache = {
    render: /* @__PURE__ */ new Map(),
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  }}
  async render() {
    const { createLogUpdate } = await Promise.resolve().then(() => _interopRequireWildcard(require("./log-update-LFDXPHX6.js")));
    const { default: truncate } = await Promise.resolve().then(() => _interopRequireWildcard(require("./cli-truncate-QX4SFRBN.js")));
    const { default: wrap } = await Promise.resolve().then(() => _interopRequireWildcard(require("./wrap-ansi-UYEBFQ4Y.js")));
    this.updater = createLogUpdate(this.logger.process.stdout);
    this.truncate = truncate;
    this.wrap = wrap;
    this.logger.process.hijack();
    if (!_optionalChain([this, 'access', _30 => _30.options, 'optionalAccess', _31 => _31.lazy])) {
      this.spinner.start(() => {
        this.update();
      });
    }
    this.events.on("SHOUD_REFRESH_RENDER", () => {
      this.update();
    });
  }
  update() {
    this.updater(this.create());
  }
  end() {
    this.spinner.stop();
    this.updater.clear();
    this.updater.done();
    if (!this.options.clearOutput) {
      this.logger.process.toStdout(this.create({ prompt: false }));
    }
    this.logger.process.release();
  }
  create(options) {
    options = {
      tasks: true,
      bottomBar: true,
      prompt: true,
      ...options
    };
    const render = [];
    const renderTasks = this.renderer(this.tasks);
    const renderBottomBar = this.renderBottomBar();
    const renderPrompt = this.renderPrompt();
    if (options.tasks && renderTasks.length > 0) {
      render.push(...renderTasks);
    }
    if (options.bottomBar && renderBottomBar.length > 0) {
      if (render.length > 0) {
        render.push("");
      }
      render.push(...renderBottomBar);
    }
    if (options.prompt && renderPrompt.length > 0) {
      if (render.length > 0) {
        render.push("");
      }
      render.push(...renderPrompt);
    }
    return render.join(_os.EOL);
  }
  // eslint-disable-next-line complexity
  style(task, output = false) {
    const rendererOptions = this.cache.rendererOptions.get(task.id);
    if (task.isSkipped()) {
      if (output || rendererOptions.collapseSkips) {
        return this.logger.icon(
          "SKIPPED_WITH_COLLAPSE"
          /* SKIPPED_WITH_COLLAPSE */
        );
      } else if (rendererOptions.collapseSkips === false) {
        return this.logger.icon(
          "SKIPPED_WITHOUT_COLLAPSE"
          /* SKIPPED_WITHOUT_COLLAPSE */
        );
      }
    }
    if (output) {
      if (this.shouldOutputToBottomBar(task)) {
        return this.logger.icon(
          "OUTPUT_WITH_BOTTOMBAR"
          /* OUTPUT_WITH_BOTTOMBAR */
        );
      }
      return this.logger.icon(
        "OUTPUT"
        /* OUTPUT */
      );
    }
    if (task.hasSubtasks()) {
      if (task.isStarted() || task.isPrompt() && rendererOptions.showSubtasks !== false && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
        return this.logger.icon(
          "PENDING"
          /* PENDING */
        );
      } else if (task.isCompleted() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return this.logger.icon(
          "COMPLETED_WITH_FAILED_SUBTASKS"
          /* COMPLETED_WITH_FAILED_SUBTASKS */
        );
      } else if (task.hasFailed()) {
        return this.logger.icon(
          "FAILED_WITH_SUBTASKS"
          /* FAILED_WITH_FAILED_SUBTASKS */
        );
      }
    }
    if (task.isStarted() || task.isPrompt()) {
      return this.logger.icon("PENDING", !_optionalChain([this, 'access', _32 => _32.options, 'optionalAccess', _33 => _33.lazy]) && this.spinner.fetch());
    } else if (task.isCompleted()) {
      return this.logger.icon(
        "COMPLETED"
        /* COMPLETED */
      );
    } else if (task.isRetrying()) {
      return this.logger.icon("RETRY", !_optionalChain([this, 'access', _34 => _34.options, 'optionalAccess', _35 => _35.lazy]) && this.spinner.fetch());
    } else if (task.isRollingBack()) {
      return this.logger.icon("ROLLING_BACK", !_optionalChain([this, 'access', _36 => _36.options, 'optionalAccess', _37 => _37.lazy]) && this.spinner.fetch());
    } else if (task.hasRolledBack()) {
      return this.logger.icon(
        "ROLLED_BACK"
        /* ROLLED_BACK */
      );
    } else if (task.hasFailed()) {
      return this.logger.icon(
        "FAILED"
        /* FAILED */
      );
    } else if (task.isPaused()) {
      return this.logger.icon(
        "PAUSED"
        /* PAUSED */
      );
    }
    return this.logger.icon(
      "WAITING"
      /* WAITING */
    );
  }
  format(message, icon, level) {
    if (message.trim() === "") {
      return [];
    }
    if (icon) {
      message = icon + " " + message;
    }
    let parsed;
    const columns = (_nullishCoalesce(process.stdout.columns, () => ( 80))) - level * this.options.indentation - 2;
    switch (this.options.formatOutput) {
      case "truncate":
        parsed = message.split(_os.EOL).map((s, i) => {
          return this.truncate(this.indent(s, i), columns);
        });
        break;
      case "wrap":
        parsed = this.wrap(message, columns, { hard: true }).split(_os.EOL).map((s, i) => this.indent(s, i));
        break;
      default:
        throw new ListrRendererError("Format option for the renderer is wrong.");
    }
    if (this.options.removeEmptyLines) {
      parsed = parsed.filter(Boolean);
    }
    return parsed.map((str) => indent(str, level * this.options.indentation));
  }
  shouldOutputToOutputBar(task) {
    const outputBar = this.cache.rendererTaskOptions.get(task.id).outputBar;
    return typeof outputBar === "number" && outputBar !== 0 || typeof outputBar === "boolean" && outputBar !== false;
  }
  shouldOutputToBottomBar(task) {
    const bottomBar = this.cache.rendererTaskOptions.get(task.id).bottomBar;
    return typeof bottomBar === "number" && bottomBar !== 0 || typeof bottomBar === "boolean" && bottomBar !== false || !task.hasTitle();
  }
  renderer(tasks, level = 0) {
    return tasks.flatMap((task) => {
      if (!task.isEnabled()) {
        return [];
      }
      if (this.cache.render.has(task.id)) {
        return this.cache.render.get(task.id);
      }
      this.calculate(task);
      this.setupBuffer(task);
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      const output = [];
      if (task.isPrompt()) {
        if (this.activePrompt && this.activePrompt !== task.id) {
          throw new ListrRendererError("Only one prompt can be active at the given time, please re-evaluate your task design.");
        } else if (!this.activePrompt) {
          task.on("PROMPT", (prompt) => {
            const cleansed = cleanseAnsi(prompt);
            if (cleansed) {
              this.prompt = cleansed;
            }
          });
          task.on("STATE", (state) => {
            if (state === "PROMPT_COMPLETED" || task.hasFinalized() || task.hasReset()) {
              this.prompt = null;
              this.activePrompt = null;
              task.off(
                "PROMPT"
                /* PROMPT */
              );
            }
          });
          this.activePrompt = task.id;
        }
      }
      if (task.hasTitle()) {
        if (!(tasks.some((task2) => task2.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
          if (task.hasFailed() && rendererOptions.collapseErrors) {
            output.push(...this.format(!task.hasSubtasks() && task.message.error && rendererOptions.showErrorMessage ? task.message.error : task.title, this.style(task), level));
          } else if (task.isSkipped() && rendererOptions.collapseSkips) {
            output.push(
              ...this.format(
                this.logger.suffix(task.message.skip && rendererOptions.showSkipMessage ? task.message.skip : task.title, {
                  field: "SKIPPED",
                  condition: rendererOptions.suffixSkips,
                  format: () => color.dim
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isRetrying()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  field: `${"RETRY"}:${task.message.retry.count}`,
                  format: () => color.yellow,
                  condition: rendererOptions.suffixRetries
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isCompleted() && task.hasTitle() && assertFunctionOrSelf(_optionalChain([rendererTaskOptions, 'access', _38 => _38.timer, 'optionalAccess', _39 => _39.condition]), task.message.duration)) {
            output.push(
              ...this.format(
                this.logger.suffix(_optionalChain([task, 'optionalAccess', _40 => _40.title]), {
                  ...rendererTaskOptions.timer,
                  args: [task.message.duration]
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isPaused()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  ...rendererOptions.pausedTimer,
                  args: [task.message.paused - Date.now()]
                }),
                this.style(task),
                level
              )
            );
          } else {
            output.push(...this.format(task.title, this.style(task), level));
          }
        } else {
          output.push(...this.format(task.title, this.logger.icon(
            "COMPLETED_WITH_SISTER_TASKS_FAILED"
            /* COMPLETED_WITH_FAILED_SISTER_TASKS */
          ), level));
        }
      }
      if (!task.hasSubtasks() || !rendererOptions.showSubtasks) {
        if (task.hasFailed() && rendererOptions.collapseErrors === false && (rendererOptions.showErrorMessage || !rendererOptions.showSubtasks)) {
          output.push(...this.dump(
            task,
            level,
            "FAILED"
            /* FAILED */
          ));
        } else if (task.isSkipped() && rendererOptions.collapseSkips === false && (rendererOptions.showSkipMessage || !rendererOptions.showSubtasks)) {
          output.push(...this.dump(
            task,
            level,
            "SKIPPED"
            /* SKIPPED */
          ));
        }
      }
      if (task.isPending() || rendererTaskOptions.persistentOutput) {
        output.push(...this.renderOutputBar(task, level));
      }
      if (
        // check if renderer option is on first
        rendererOptions.showSubtasks !== false && // if it doesnt have subtasks no need to check
        task.hasSubtasks() && (task.isPending() || task.hasFinalized() && !task.hasTitle() || // have to be completed and have subtasks
        task.isCompleted() && rendererOptions.collapseSubtasks === false && !task.subtasks.some((subtask) => _optionalChain([this, 'access', _41 => _41.cache, 'access', _42 => _42.rendererOptions, 'access', _43 => _43.get, 'call', _44 => _44(subtask.id), 'optionalAccess', _45 => _45.collapseSubtasks]) === true) || // if any of the subtasks have the collapse option of
        task.subtasks.some((subtask) => _optionalChain([this, 'access', _46 => _46.cache, 'access', _47 => _47.rendererOptions, 'access', _48 => _48.get, 'call', _49 => _49(subtask.id), 'optionalAccess', _50 => _50.collapseSubtasks]) === false) || // if any of the subtasks has failed
        task.subtasks.some((subtask) => subtask.hasFailed()) || // if any of the subtasks rolled back
        task.subtasks.some((subtask) => subtask.hasRolledBack()))
      ) {
        const subtaskLevel = !task.hasTitle() ? level : level + 1;
        const subtaskRender = this.renderer(task.subtasks, subtaskLevel);
        output.push(...subtaskRender);
      }
      if (task.hasFinalized()) {
        if (!rendererTaskOptions.persistentOutput) {
          this.buffer.bottom.delete(task.id);
          this.buffer.output.delete(task.id);
        }
      }
      if (task.isClosed()) {
        this.cache.render.set(task.id, output);
        this.reset(task);
      }
      return output;
    });
  }
  renderOutputBar(task, level) {
    const output = this.buffer.output.get(task.id);
    if (!output) {
      return [];
    }
    return output.all.flatMap((o) => this.dump(task, level, "OUTPUT", o.entry));
  }
  renderBottomBar() {
    if (this.buffer.bottom.size === 0) {
      return [];
    }
    return Array.from(this.buffer.bottom.values()).flatMap((output) => output.all).sort((a, b) => a.time - b.time).map((output) => output.entry);
  }
  renderPrompt() {
    if (!this.prompt) {
      return [];
    }
    return [this.prompt];
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._DefaultRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  setupBuffer(task) {
    if (this.buffer.bottom.has(task.id) || this.buffer.output.has(task.id)) {
      return;
    }
    const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
    if (this.shouldOutputToBottomBar(task) && !this.buffer.bottom.has(task.id)) {
      this.buffer.bottom.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.bottomBar === "number" ? rendererTaskOptions.bottomBar : 1 }));
      task.on("OUTPUT", (output) => {
        const data = this.dump(task, -1, "OUTPUT", output);
        this.buffer.bottom.get(task.id).write(data.join(_os.EOL));
      });
      task.on("STATE", (state) => {
        switch (state) {
          case "RETRY":
            this.buffer.bottom.delete(task.id);
            break;
        }
      });
    } else if (this.shouldOutputToOutputBar(task) && !this.buffer.output.has(task.id)) {
      this.buffer.output.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.outputBar === "number" ? rendererTaskOptions.outputBar : 1 }));
      task.on("OUTPUT", (output) => {
        this.buffer.output.get(task.id).write(output);
      });
      task.on("STATE", (state) => {
        switch (state) {
          case "RETRY":
            this.buffer.output.delete(task.id);
            break;
        }
      });
    }
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
    this.buffer.output.delete(task.id);
  }
  dump(task, level, source = "OUTPUT", data) {
    if (!data) {
      switch (source) {
        case "OUTPUT":
          data = task.output;
          break;
        case "SKIPPED":
          data = task.message.skip;
          break;
        case "FAILED":
          data = task.message.error;
          break;
      }
    }
    if (task.hasTitle() && source === "FAILED" && data === task.title || typeof data !== "string") {
      return [];
    }
    if (source === "OUTPUT") {
      data = cleanseAnsi(data);
    }
    return this.format(data, this.style(task, true), level + 1);
  }
  indent(str, i) {
    return i > 0 ? indent(str.trim(), this.options.indentation) : str.trim();
  }
}, _class4.__initStatic(), _class4.__initStatic2(), _class4.__initStatic3(), _class4);
var SilentRenderer = (_class5 = class {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
  }
  static {
    __name(this, "SilentRenderer");
  }
  static __initStatic4() {this.nonTTY = true}
  
  
  render() {
    return;
  }
  end() {
    return;
  }
}, _class5.__initStatic4(), _class5);
var SimpleRenderer = (_class6 = class _SimpleRenderer {
  constructor(tasks, options) {;_class6.prototype.__init8.call(this);
    this.tasks = tasks;
    this.options = options;
    this.options = {
      ..._SimpleRenderer.rendererOptions,
      ...options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ..._nullishCoalesce(_optionalChain([options, 'optionalAccess', _51 => _51.icon]), () => ( {}))
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ..._nullishCoalesce(_optionalChain([options, 'optionalAccess', _52 => _52.color]), () => ( {}))
      }
    };
    this.logger = _nullishCoalesce(this.options.logger, () => ( new ListrLogger({ useIcons: true, toStderr: LISTR_LOGGER_STDERR_LEVELS })));
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp);
    }
  }
  static {
    __name(this, "SimpleRenderer");
  }
  static __initStatic5() {this.nonTTY = true}
  static __initStatic6() {this.rendererOptions = {
    pausedTimer: {
      ...PRESET_TIMER,
      field: (time) => `${"PAUSED"}:${time}`,
      format: () => color.yellowBright
    }
  }}
  static __initStatic7() {this.rendererTaskOptions = {}}
  
  __init8() {this.cache = {
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  }}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  render() {
    this.renderer(this.tasks);
  }
  renderer(tasks) {
    tasks.forEach((task) => {
      this.calculate(task);
      task.once("CLOSED", () => {
        this.reset(task);
      });
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      task.on("SUBTASK", (subtasks) => {
        this.renderer(subtasks);
      });
      task.on("STATE", (state) => {
        if (!task.hasTitle()) {
          return;
        }
        if (state === "STARTED") {
          this.logger.log("STARTED", task.title);
        } else if (state === "COMPLETED") {
          const timer = _optionalChain([rendererTaskOptions, 'optionalAccess', _53 => _53.timer]);
          this.logger.log(
            "COMPLETED",
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!_optionalChain([task, 'access', _54 => _54.message, 'optionalAccess', _55 => _55.duration]) && timer.condition,
                args: [task.message.duration]
              }
            }
          );
        } else if (state === "PROMPT") {
          this.logger.process.hijack();
          task.on("PROMPT", (prompt) => {
            this.logger.process.toStderr(prompt, false);
          });
        } else if (state === "PROMPT_COMPLETED") {
          task.off(
            "PROMPT"
            /* PROMPT */
          );
          this.logger.process.release();
        }
      });
      task.on("OUTPUT", (output) => {
        this.logger.log("OUTPUT", output);
      });
      task.on("MESSAGE", (message) => {
        if (message.error) {
          this.logger.log("FAILED", task.title, {
            suffix: {
              field: `${"FAILED"}: ${message.error}`,
              format: () => color.red
            }
          });
        } else if (message.skip) {
          this.logger.log("SKIPPED", task.title, {
            suffix: {
              field: `${"SKIPPED"}: ${message.skip}`,
              format: () => color.yellow
            }
          });
        } else if (message.rollback) {
          this.logger.log("ROLLBACK", task.title, {
            suffix: {
              field: `${"ROLLBACK"}: ${message.rollback}`,
              format: () => color.red
            }
          });
        } else if (message.retry) {
          this.logger.log("RETRY", task.title, {
            suffix: {
              field: `${"RETRY"}:${message.retry.count}`,
              format: () => color.red
            }
          });
        } else if (message.paused) {
          const timer = _optionalChain([rendererOptions, 'optionalAccess', _56 => _56.pausedTimer]);
          this.logger.log(
            "PAUSED",
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!_optionalChain([message, 'optionalAccess', _57 => _57.paused]) && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          );
        }
      });
    });
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._SimpleRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
  }
}, _class6.__initStatic5(), _class6.__initStatic6(), _class6.__initStatic7(), _class6);
var TestRendererSerializer = class {
  constructor(options) {
    this.options = options;
  }
  static {
    __name(this, "TestRendererSerializer");
  }
  serialize(event, data, task) {
    return JSON.stringify(this.generate(event, data, task));
  }
  generate(event, data, task) {
    const output = {
      event,
      data
    };
    if (typeof _optionalChain([this, 'access', _58 => _58.options, 'optionalAccess', _59 => _59.task]) !== "boolean") {
      const t = Object.fromEntries(
        this.options.task.map((entity) => {
          const property = task[entity];
          if (typeof property === "function") {
            return [entity, property.call(task)];
          }
          return [entity, property];
        })
      );
      if (Object.keys(task).length > 0) {
        output.task = t;
      }
    }
    return output;
  }
};
var TestRenderer = (_class7 = class _TestRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = { ..._TestRenderer.rendererOptions, ...this.options };
    this.logger = _nullishCoalesce(this.options.logger, () => ( new ListrLogger({ useIcons: false })));
    this.serializer = new TestRendererSerializer(this.options);
  }
  static {
    __name(this, "TestRenderer");
  }
  static __initStatic8() {this.nonTTY = true}
  static __initStatic9() {this.rendererOptions = {
    subtasks: true,
    state: Object.values(ListrTaskState),
    output: true,
    prompt: true,
    title: true,
    messages: ["skip", "error", "retry", "rollback", "paused"],
    messagesToStderr: ["error", "rollback", "retry"],
    task: [
      "hasRolledBack",
      "isRollingBack",
      "isCompleted",
      "isSkipped",
      "hasFinalized",
      "hasSubtasks",
      "title",
      "hasReset",
      "hasTitle",
      "isPrompt",
      "isPaused",
      "isPending",
      "isSkipped",
      "isStarted",
      "hasFailed",
      "isEnabled",
      "isRetrying",
      "path"
    ]
  }}
  
  
  
  render() {
    this.renderer(this.tasks);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  // verbose renderer multi-level
  renderer(tasks) {
    tasks.forEach((task) => {
      if (this.options.subtasks) {
        task.on("SUBTASK", (subtasks) => {
          this.renderer(subtasks);
        });
      }
      if (this.options.state) {
        task.on("STATE", (state) => {
          this.logger.toStdout(this.serializer.serialize("STATE", state, task));
        });
      }
      if (this.options.output) {
        task.on("OUTPUT", (data) => {
          this.logger.toStdout(this.serializer.serialize("OUTPUT", data, task));
        });
      }
      if (this.options.prompt) {
        task.on("PROMPT", (prompt) => {
          this.logger.toStdout(this.serializer.serialize("PROMPT", prompt, task));
        });
      }
      if (this.options.title) {
        task.on("TITLE", (title) => {
          this.logger.toStdout(this.serializer.serialize("TITLE", title, task));
        });
      }
      task.on("MESSAGE", (message) => {
        const parsed = Object.fromEntries(
          Object.entries(message).map(([key, value]) => {
            if (this.options.messages.includes(key)) {
              return [key, value];
            }
          }).filter(Boolean)
        );
        if (Object.keys(parsed).length > 0) {
          const output = this.serializer.serialize("MESSAGE", parsed, task);
          if (this.options.messagesToStderr.some((state) => Object.keys(parsed).includes(state))) {
            this.logger.toStderr(output);
          } else {
            this.logger.toStdout(output);
          }
        }
      });
    });
  }
}, _class7.__initStatic8(), _class7.__initStatic9(), _class7);
var VerboseRenderer = (_class8 = class _VerboseRenderer {
  constructor(tasks, options) {;_class8.prototype.__init9.call(this);
    this.tasks = tasks;
    this.options = options;
    this.options = {
      ..._VerboseRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ..._nullishCoalesce(_optionalChain([options, 'optionalAccess', _60 => _60.icon]), () => ( {}))
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ..._nullishCoalesce(_optionalChain([options, 'optionalAccess', _61 => _61.color]), () => ( {}))
      }
    };
    this.logger = _nullishCoalesce(this.options.logger, () => ( new ListrLogger({ useIcons: false, toStderr: LISTR_LOGGER_STDERR_LEVELS })));
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp);
    }
  }
  static {
    __name(this, "VerboseRenderer");
  }
  static __initStatic10() {this.nonTTY = true}
  static __initStatic11() {this.rendererOptions = {
    logTitleChange: false,
    pausedTimer: {
      ...PRESET_TIMER,
      format: () => color.yellowBright
    }
  }}
  
  
  __init9() {this.cache = {
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  }}
  render() {
    this.renderer(this.tasks);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  renderer(tasks) {
    tasks.forEach((task) => {
      this.calculate(task);
      task.once("CLOSED", () => {
        this.reset(task);
      });
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      task.on("SUBTASK", (subtasks) => {
        this.renderer(subtasks);
      });
      task.on("STATE", (state) => {
        if (!task.hasTitle()) {
          return;
        }
        if (state === "STARTED") {
          this.logger.log("STARTED", task.title);
        } else if (state === "COMPLETED") {
          const timer = rendererTaskOptions.timer;
          this.logger.log(
            "COMPLETED",
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!_optionalChain([task, 'access', _62 => _62.message, 'optionalAccess', _63 => _63.duration]) && timer.condition,
                args: [task.message.duration]
              }
            }
          );
        }
      });
      task.on("OUTPUT", (data) => {
        this.logger.log("OUTPUT", data);
      });
      task.on("PROMPT", (prompt) => {
        const cleansed = cleanseAnsi(prompt);
        if (cleansed) {
          this.logger.log("PROMPT", cleansed);
        }
      });
      if (_optionalChain([this, 'access', _64 => _64.options, 'optionalAccess', _65 => _65.logTitleChange]) !== false) {
        task.on("TITLE", (title) => {
          this.logger.log("TITLE", title);
        });
      }
      task.on("MESSAGE", (message) => {
        if (_optionalChain([message, 'optionalAccess', _66 => _66.error])) {
          this.logger.log("FAILED", message.error);
        } else if (_optionalChain([message, 'optionalAccess', _67 => _67.skip])) {
          this.logger.log("SKIPPED", message.skip);
        } else if (_optionalChain([message, 'optionalAccess', _68 => _68.rollback])) {
          this.logger.log("ROLLBACK", message.rollback);
        } else if (_optionalChain([message, 'optionalAccess', _69 => _69.retry])) {
          this.logger.log("RETRY", task.title, { suffix: message.retry.count.toString() });
        } else if (_optionalChain([message, 'optionalAccess', _70 => _70.paused])) {
          const timer = _optionalChain([rendererOptions, 'optionalAccess', _71 => _71.pausedTimer]);
          this.logger.log(
            "PAUSED",
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!_optionalChain([message, 'optionalAccess', _72 => _72.paused]) && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          );
        }
      });
    });
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._VerboseRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
  }
}, _class8.__initStatic10(), _class8.__initStatic11(), _class8);
var RENDERERS = {
  default: DefaultRenderer,
  simple: SimpleRenderer,
  verbose: VerboseRenderer,
  test: TestRenderer,
  silent: SilentRenderer
};
function isRendererSupported(renderer) {
  return process.stdout.isTTY === true || renderer.nonTTY === true;
}
__name(isRendererSupported, "isRendererSupported");
function getRendererClass(renderer) {
  if (typeof renderer === "string") {
    return _nullishCoalesce(RENDERERS[renderer], () => ( RENDERERS.default));
  }
  return typeof renderer === "function" ? renderer : RENDERERS.default;
}
__name(getRendererClass, "getRendererClass");
function getRenderer(options) {
  if (assertFunctionOrSelf(_optionalChain([options, 'optionalAccess', _73 => _73.silentRendererCondition]))) {
    return {
      renderer: getRendererClass("silent"),
      selection: "SILENT"
      /* SILENT */
    };
  }
  const r = {
    renderer: getRendererClass(options.renderer),
    options: options.rendererOptions,
    selection: "PRIMARY"
    /* PRIMARY */
  };
  if (!isRendererSupported(r.renderer) || assertFunctionOrSelf(_optionalChain([options, 'optionalAccess', _74 => _74.fallbackRendererCondition]))) {
    return {
      renderer: getRendererClass(options.fallbackRenderer),
      options: options.fallbackRendererOptions,
      selection: "SECONDARY"
      /* SECONDARY */
    };
  }
  return r;
}
__name(getRenderer, "getRenderer");
function assertFunctionOrSelf(functionOrSelf, ...args) {
  if (typeof functionOrSelf === "function") {
    return functionOrSelf(...args);
  } else {
    return functionOrSelf;
  }
}
__name(assertFunctionOrSelf, "assertFunctionOrSelf");
var clone = (0, import_rfdc.default)({ circles: true });
function cloneObject(obj) {
  return clone(obj);
}
__name(cloneObject, "cloneObject");
var Concurrency = class {
  static {
    __name(this, "Concurrency");
  }
  
  
  
  constructor(options) {
    this.concurrency = options.concurrency;
    this.count = 0;
    this.queue = /* @__PURE__ */ new Set();
  }
  add(fn) {
    if (this.count < this.concurrency) {
      return this.run(fn);
    }
    return new Promise((resolve) => {
      const callback = /* @__PURE__ */ __name(() => resolve(this.run(fn)), "callback");
      this.queue.add(callback);
    });
  }
  flush() {
    for (const callback of this.queue) {
      if (this.count >= this.concurrency) {
        break;
      }
      this.queue.delete(callback);
      callback();
    }
  }
  run(fn) {
    this.count++;
    const promise = fn();
    const cleanup = /* @__PURE__ */ __name(() => {
      this.count--;
      this.flush();
    }, "cleanup");
    promise.then(cleanup, () => {
      this.queue.clear();
    });
    return promise;
  }
};
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
__name(delay, "delay");
var ListrError = class extends Error {
  constructor(error, type, task) {
    super(error.message);
    this.error = error;
    this.type = type;
    this.task = task;
    this.name = "ListrError";
    this.path = task.path;
    if (_optionalChain([task, 'optionalAccess', _75 => _75.options, 'access', _76 => _76.collectErrors]) === "full") {
      this.task = cloneObject(task);
      this.ctx = cloneObject(task.listr.ctx);
    }
    this.stack = _optionalChain([error, 'optionalAccess', _77 => _77.stack]);
  }
  static {
    __name(this, "ListrError");
  }
  
  
};
var ListrRendererError = class extends Error {
  static {
    __name(this, "ListrRendererError");
  }
};
var PromptError = class extends Error {
  static {
    __name(this, "PromptError");
  }
};
var TaskWrapper = class {
  constructor(task) {
    this.task = task;
  }
  static {
    __name(this, "TaskWrapper");
  }
  /* istanbul ignore next */
  get title() {
    return this.task.title;
  }
  /**
   * Title of the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/title.html}
   */
  set title(title) {
    title = Array.isArray(title) ? title : [title];
    this.task.title$ = splat(title.shift(), ...title);
  }
  /* istanbul ignore next */
  get output() {
    return this.task.output;
  }
  /* istanbul ignore next */
  /**
   * Send output from the current task to the renderer.
   *
   * @see {@link https://listr2.kilic.dev/task/output.html}
   */
  set output(output) {
    output = Array.isArray(output) ? output : [output];
    this.task.output$ = splat(output.shift(), ...output);
  }
  /* istanbul ignore next */
  /** Send an output to the output channel as prompt. */
  set promptOutput(output) {
    this.task.promptOutput$ = output;
  }
  /**
   * Creates a new set of Listr subtasks.
   *
   * @see {@link https://listr2.kilic.dev/task/subtasks.html}
   */
  newListr(task, options) {
    let tasks;
    if (typeof task === "function") {
      tasks = task(this);
    } else {
      tasks = task;
    }
    return new Listr(tasks, options, this.task);
  }
  /**
   * Report an error that has to be collected and handled.
   *
   * @see {@link https://listr2.kilic.dev/task/error-handling.html}
   */
  report(error, type) {
    if (this.task.options.collectErrors !== false) {
      this.task.listr.errors.push(new ListrError(error, type, this.task));
    }
    this.task.message$ = { error: _nullishCoalesce(error.message, () => ( _optionalChain([this, 'access', _78 => _78.task, 'optionalAccess', _79 => _79.title]))) };
  }
  /**
   * Skip the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/skip.html}
   */
  skip(message, ...metadata) {
    this.task.state$ = "SKIPPED";
    if (message) {
      this.task.message$ = { skip: message ? splat(message, ...metadata) : _optionalChain([this, 'access', _80 => _80.task, 'optionalAccess', _81 => _81.title]) };
    }
  }
  /**
   * Check whether this task is currently in a retry state.
   *
   * @see {@link https://listr2.kilic.dev/task/retry.html}
   */
  isRetrying() {
    return this.task.isRetrying() ? this.task.retry : { count: 0 };
  }
  /* istanbul ignore next */
  /**
   * Create a new prompt for getting user input through the prompt adapter.
   * This will create a new prompt through the adapter if the task is not currently rendering a prompt or will return the active instance.
   *
   * This part of the application requires optional peer dependencies, please refer to documentation.
   *
   * @see {@link https://listr2.kilic.dev/task/prompt.html}
   */
  prompt(adapter) {
    if (this.task.prompt) {
      return this.task.prompt;
    }
    return new adapter(this.task, this);
  }
  /* istanbul ignore next */
  /**
   * Generates a fake stdout for your use case, where it will be tunnelled through Listr to handle the rendering process.
   *
   * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
   */
  stdout(type) {
    return createWritable((chunk) => {
      switch (type) {
        case "PROMPT":
          this.promptOutput = chunk;
          break;
        default:
          this.output = chunk;
      }
    });
  }
  /** Run this task. */
  run(ctx) {
    return this.task.run(ctx, this);
  }
};
var ListrTaskEventManager = class extends EventManager {
  static {
    __name(this, "ListrTaskEventManager");
  }
};
var Task = (_class9 = class extends ListrTaskEventManager {
  constructor(listr, task, options, rendererOptions, rendererTaskOptions) {
    super();_class9.prototype.__init10.call(this);_class9.prototype.__init11.call(this);_class9.prototype.__init12.call(this);;
    this.listr = listr;
    this.task = task;
    this.options = options;
    this.rendererOptions = rendererOptions;
    this.rendererTaskOptions = rendererTaskOptions;
    if (task.title) {
      const title = Array.isArray(_optionalChain([task, 'optionalAccess', _82 => _82.title])) ? task.title : [task.title];
      this.title = splat(title.shift(), ...title);
      this.initialTitle = this.title;
    }
    this.taskFn = task.task;
    this.parent = listr.parentTask;
  }
  static {
    __name(this, "Task");
  }
  /** Unique id per task, can be used for identifying a Task. */
  __init10() {this.id = _crypto.randomUUID.call(void 0, )}
  /** The current state of the task. */
  __init11() {this.state = "WAITING"}
  /** Subtasks of the current task. */
  
  /** Title of the task. */
  
  /** Initial/Untouched version of the title for using whenever task has a reset. */
  
  /** Output channel for the task. */
  
  /** Current state of the retry process whenever the task is retrying. */
  
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  __init12() {this.message = {}}
  /** Current prompt instance or prompt error whenever the task is prompting. */
  
  /** Parent task of the current task. */
  
  /** Enable flag of this task. */
  
  /** User provided Task callback function to run. */
  
  /** Marks the task as closed. This is different from finalized since this is not really related to task itself. */
  
  /**
   * Update the current state of the Task and emit the neccassary events.
   */
  set state$(state) {
    this.state = state;
    this.emit("STATE", state);
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks) {
        if (subtask.state === "STARTED") {
          subtask.state$ = "FAILED";
        }
      }
    }
    this.listr.events.emit(
      "SHOUD_REFRESH_RENDER"
      /* SHOULD_REFRESH_RENDER */
    );
  }
  /**
   * Update the current output of the Task and emit the neccassary events.
   */
  set output$(data) {
    this.output = data;
    this.emit("OUTPUT", data);
    this.listr.events.emit(
      "SHOUD_REFRESH_RENDER"
      /* SHOULD_REFRESH_RENDER */
    );
  }
  /**
   * Update the current prompt output of the Task and emit the neccassary events.
   */
  set promptOutput$(data) {
    this.emit("PROMPT", data);
    if (cleanseAnsi(data)) {
      this.listr.events.emit(
        "SHOUD_REFRESH_RENDER"
        /* SHOULD_REFRESH_RENDER */
      );
    }
  }
  /**
   * Update or extend the current message of the Task and emit the neccassary events.
   */
  set message$(data) {
    this.message = { ...this.message, ...data };
    this.emit("MESSAGE", data);
    this.listr.events.emit(
      "SHOUD_REFRESH_RENDER"
      /* SHOULD_REFRESH_RENDER */
    );
  }
  /**
   * Update the current title of the Task and emit the neccassary events.
   */
  set title$(title) {
    this.title = title;
    this.emit("TITLE", title);
    this.listr.events.emit(
      "SHOUD_REFRESH_RENDER"
      /* SHOULD_REFRESH_RENDER */
    );
  }
  /**
   * Current task path in the hierarchy.
   */
  get path() {
    return [...this.listr.path, this.initialTitle];
  }
  /**
   * Checks whether the current task with the given context should be set as enabled.
   */
  async check(ctx) {
    if (this.state === "WAITING") {
      this.enabled = await assertFunctionOrSelf(_nullishCoalesce(_optionalChain([this, 'access', _83 => _83.task, 'optionalAccess', _84 => _84.enabled]), () => ( true)), ctx);
      this.emit("ENABLED", this.enabled);
      this.listr.events.emit(
        "SHOUD_REFRESH_RENDER"
        /* SHOULD_REFRESH_RENDER */
      );
    }
    return this.enabled;
  }
  /** Returns whether this task has subtasks. */
  hasSubtasks() {
    return _optionalChain([this, 'access', _85 => _85.subtasks, 'optionalAccess', _86 => _86.length]) > 0;
  }
  /** Returns whether this task is finalized in someform. */
  hasFinalized() {
    return this.isCompleted() || this.hasFailed() || this.isSkipped() || this.hasRolledBack();
  }
  /** Returns whether this task is in progress. */
  isPending() {
    return this.isStarted() || this.isPrompt() || this.hasReset();
  }
  /** Returns whether this task has started. */
  isStarted() {
    return this.state === "STARTED";
  }
  /** Returns whether this task is skipped. */
  isSkipped() {
    return this.state === "SKIPPED";
  }
  /** Returns whether this task has been completed. */
  isCompleted() {
    return this.state === "COMPLETED";
  }
  /** Returns whether this task has been failed. */
  hasFailed() {
    return this.state === "FAILED";
  }
  /** Returns whether this task has an active rollback task going on. */
  isRollingBack() {
    return this.state === "ROLLING_BACK";
  }
  /** Returns whether the rollback action was successful. */
  hasRolledBack() {
    return this.state === "ROLLED_BACK";
  }
  /** Returns whether this task has an actively retrying task going on. */
  isRetrying() {
    return this.state === "RETRY";
  }
  /** Returns whether this task has some kind of reset like retry and rollback going on. */
  hasReset() {
    return this.state === "RETRY" || this.state === "ROLLING_BACK";
  }
  /** Returns whether enabled function resolves to true. */
  isEnabled() {
    return this.enabled;
  }
  /** Returns whether this task actually has a title. */
  hasTitle() {
    return typeof _optionalChain([this, 'optionalAccess', _87 => _87.title]) === "string";
  }
  /** Returns whether this task has a prompt inside. */
  isPrompt() {
    return this.state === "PROMPT" || this.state === "PROMPT_COMPLETED";
  }
  /** Returns whether this task is currently paused. */
  isPaused() {
    return this.state === "PAUSED";
  }
  /** Returns whether this task is closed. */
  isClosed() {
    return this.closed;
  }
  /** Pause the given task for certain time. */
  async pause(time) {
    const state = this.state;
    this.state$ = "PAUSED";
    this.message$ = {
      paused: Date.now() + time
    };
    await delay(time);
    this.state$ = state;
    this.message$ = {
      paused: null
    };
  }
  /** Run the current task. */
  async run(context, wrapper) {
    const handleResult = /* @__PURE__ */ __name((result) => {
      if (result instanceof Listr) {
        result.options = { ...this.options, ...result.options };
        result.rendererClass = getRendererClass("silent");
        this.subtasks = result.tasks;
        result.errors = this.listr.errors;
        this.emit("SUBTASK", this.subtasks);
        result = result.run(context);
      } else if (result instanceof Promise) {
        result = result.then(handleResult);
      } else if (isReadable(result)) {
        result = new Promise((resolve, reject) => {
          result.on("data", (data) => {
            this.output$ = data.toString();
          });
          result.on("error", (error) => reject(error));
          result.on("end", () => resolve(null));
        });
      } else if (isObservable(result)) {
        result = new Promise((resolve, reject) => {
          result.subscribe({
            next: (data) => {
              this.output$ = data;
            },
            error: reject,
            complete: resolve
          });
        });
      }
      return result;
    }, "handleResult");
    const startTime = Date.now();
    this.state$ = "STARTED";
    const skipped = await assertFunctionOrSelf(_nullishCoalesce(_optionalChain([this, 'access', _88 => _88.task, 'optionalAccess', _89 => _89.skip]), () => ( false)), context);
    if (skipped) {
      if (typeof skipped === "string") {
        this.message$ = { skip: skipped };
      } else if (this.hasTitle()) {
        this.message$ = { skip: this.title };
      } else {
        this.message$ = { skip: "Skipped task without a title." };
      }
      this.state$ = "SKIPPED";
      return;
    }
    try {
      const retryCount = typeof _optionalChain([this, 'access', _90 => _90.task, 'optionalAccess', _91 => _91.retry]) === "number" && this.task.retry > 0 ? this.task.retry + 1 : typeof _optionalChain([this, 'access', _92 => _92.task, 'optionalAccess', _93 => _93.retry]) === "object" && this.task.retry.tries > 0 ? this.task.retry.tries + 1 : 1;
      const retryDelay = typeof this.task.retry === "object" && this.task.retry.delay;
      for (let retries = 1; retries <= retryCount; retries++) {
        try {
          await handleResult(this.taskFn(context, wrapper));
          break;
        } catch (err) {
          if (retries !== retryCount) {
            this.retry = { count: retries, error: err };
            this.message$ = { retry: this.retry };
            this.title$ = this.initialTitle;
            this.output = void 0;
            wrapper.report(
              err,
              "WILL_RETRY"
              /* WILL_RETRY */
            );
            this.state$ = "RETRY";
            if (retryDelay) {
              await this.pause(retryDelay);
            }
          } else {
            throw err;
          }
        }
      }
      if (this.isStarted() || this.isRetrying()) {
        this.message$ = { duration: Date.now() - startTime };
        this.state$ = "COMPLETED";
      }
    } catch (error) {
      if (this.prompt instanceof PromptError) {
        error = this.prompt;
      }
      if (_optionalChain([this, 'access', _94 => _94.task, 'optionalAccess', _95 => _95.rollback])) {
        wrapper.report(
          error,
          "WILL_ROLLBACK"
          /* WILL_ROLLBACK */
        );
        try {
          this.state$ = "ROLLING_BACK";
          await this.task.rollback(context, wrapper);
          this.message$ = { rollback: this.title };
          this.state$ = "ROLLED_BACK";
        } catch (err) {
          this.state$ = "FAILED";
          wrapper.report(
            err,
            "HAS_FAILED_TO_ROLLBACK"
            /* HAS_FAILED_TO_ROLLBACK */
          );
          this.close();
          throw err;
        }
        if (_optionalChain([this, 'access', _96 => _96.listr, 'access', _97 => _97.options, 'optionalAccess', _98 => _98.exitAfterRollback]) !== false) {
          this.close();
          throw error;
        }
      } else {
        this.state$ = "FAILED";
        if (this.listr.options.exitOnError !== false && await assertFunctionOrSelf(_optionalChain([this, 'access', _99 => _99.task, 'optionalAccess', _100 => _100.exitOnError]), context) !== false) {
          wrapper.report(
            error,
            "HAS_FAILED"
            /* HAS_FAILED */
          );
          this.close();
          throw error;
        } else if (!this.hasSubtasks()) {
          wrapper.report(
            error,
            "HAS_FAILED_WITHOUT_ERROR"
            /* HAS_FAILED_WITHOUT_ERROR */
          );
        }
      }
    } finally {
      this.close();
    }
  }
  close() {
    this.emit(
      "CLOSED"
      /* CLOSED */
    );
    this.listr.events.emit(
      "SHOUD_REFRESH_RENDER"
      /* SHOULD_REFRESH_RENDER */
    );
    this.complete();
  }
}, _class9);
var ListrEventManager = class extends EventManager {
  static {
    __name(this, "ListrEventManager");
  }
};
var Listr = (_class10 = class {
  constructor(task, options, parentTask) {;_class10.prototype.__init13.call(this);_class10.prototype.__init14.call(this);_class10.prototype.__init15.call(this);
    this.task = task;
    this.options = options;
    this.parentTask = parentTask;
    this.options = {
      concurrent: false,
      renderer: "default",
      fallbackRenderer: "simple",
      exitOnError: true,
      exitAfterRollback: true,
      collectErrors: false,
      registerSignalListeners: true,
      ..._nullishCoalesce(_optionalChain([this, 'access', _101 => _101.parentTask, 'optionalAccess', _102 => _102.options]), () => ( {})),
      ...options
    };
    if (this.options.concurrent === true) {
      this.options.concurrent = Infinity;
    } else if (typeof this.options.concurrent !== "number") {
      this.options.concurrent = 1;
    }
    this.concurrency = new Concurrency({ concurrency: this.options.concurrent });
    if (parentTask) {
      this.path = [...parentTask.listr.path, parentTask.title];
      this.errors = parentTask.listr.errors;
    }
    if (_optionalChain([this, 'access', _103 => _103.parentTask, 'optionalAccess', _104 => _104.listr, 'access', _105 => _105.events]) instanceof ListrEventManager) {
      this.events = this.parentTask.listr.events;
    } else {
      this.events = new ListrEventManager();
    }
    const renderer = getRenderer({
      renderer: this.options.renderer,
      rendererOptions: this.options.rendererOptions,
      fallbackRenderer: this.options.fallbackRenderer,
      fallbackRendererOptions: this.options.fallbackRendererOptions,
      fallbackRendererCondition: _optionalChain([this, 'access', _106 => _106.options, 'optionalAccess', _107 => _107.fallbackRendererCondition]),
      silentRendererCondition: _optionalChain([this, 'access', _108 => _108.options, 'optionalAccess', _109 => _109.silentRendererCondition])
    });
    this.rendererClass = renderer.renderer;
    this.rendererClassOptions = renderer.options;
    this.rendererSelection = renderer.selection;
    this.add(_nullishCoalesce(task, () => ( [])));
    if (this.options.registerSignalListeners) {
      this.boundSignalHandler = this.signalHandler.bind(this);
      process.once("SIGINT", this.boundSignalHandler).setMaxListeners(0);
    }
    if (_optionalChain([this, 'access', _110 => _110.options, 'optionalAccess', _111 => _111.forceTTY]) || process.env[
      "LISTR_FORCE_TTY"
      /* FORCE_TTY */
    ]) {
      process.stdout.isTTY = true;
      process.stderr.isTTY = true;
    }
    if (_optionalChain([this, 'access', _112 => _112.options, 'optionalAccess', _113 => _113.forceUnicode])) {
      process.env[
        "LISTR_FORCE_UNICODE"
        /* FORCE_UNICODE */
      ] = "1";
    }
  }
  static {
    __name(this, "Listr");
  }
  __init13() {this.tasks = []}
  __init14() {this.errors = []}
  
  
  __init15() {this.path = []}
  
  
  
  
  
  
  /**
   * Whether this is the root task.
   */
  isRoot() {
    return !this.parentTask;
  }
  /**
   * Whether this is a subtask of another task list.
   */
  isSubtask() {
    return !!this.parentTask;
  }
  /**
   * Add tasks to current task list.
   *
   * @see {@link https://listr2.kilic.dev/task/task.html}
   */
  add(tasks) {
    this.tasks.push(...this.generate(tasks));
  }
  /**
   * Run the task list.
   *
   * @see {@link https://listr2.kilic.dev/listr/listr.html#run-the-generated-task-list}
   */
  async run(context) {
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions, this.events);
    }
    await this.renderer.render();
    this.ctx = _nullishCoalesce(_nullishCoalesce(_optionalChain([this, 'access', _114 => _114.options, 'optionalAccess', _115 => _115.ctx]), () => ( context)), () => ( {}));
    await Promise.all(this.tasks.map((task) => task.check(this.ctx)));
    try {
      await Promise.all(this.tasks.map((task) => this.concurrency.add(() => this.runTask(task))));
      this.renderer.end();
      this.removeSignalHandler();
    } catch (err) {
      if (this.options.exitOnError !== false) {
        this.renderer.end(err);
        this.removeSignalHandler();
        throw err;
      }
    }
    return this.ctx;
  }
  generate(tasks) {
    tasks = Array.isArray(tasks) ? tasks : [tasks];
    return tasks.map((task) => {
      let rendererTaskOptions;
      if (this.rendererSelection === "PRIMARY") {
        rendererTaskOptions = task.rendererOptions;
      } else if (this.rendererSelection === "SECONDARY") {
        rendererTaskOptions = task.fallbackRendererOptions;
      }
      return new Task(
        this,
        task,
        this.options,
        this.rendererClassOptions,
        rendererTaskOptions
      );
    });
  }
  async runTask(task) {
    if (!await task.check(this.ctx)) {
      return;
    }
    return new TaskWrapper(task).run(this.ctx);
  }
  signalHandler() {
    _optionalChain([this, 'access', _116 => _116.tasks, 'optionalAccess', _117 => _117.forEach, 'call', _118 => _118(async (task) => {
      if (task.isPending()) {
        task.state$ = "FAILED";
      }
    })]);
    if (this.isRoot()) {
      this.renderer.end(new Error("Interrupted."));
      process.exit(127);
    }
  }
  removeSignalHandler() {
    if (this.boundSignalHandler) {
      process.removeListener("SIGINT", this.boundSignalHandler);
    }
  }
}, _class10);

// src/task-manager.ts
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );
var TaskManagerClass = (_class11 = class {constructor() { _class11.prototype.__init16.call(this); }
  __init16() {this.taskTypes = {}}
  registerTaskType(taskType) {
    this.taskTypes[taskType.type] = taskType;
  }
  createTask(cfg) {
    const taskType = this.taskTypes[cfg.type];
    if (!taskType) throw new Error(`Task type ${cfg.type} not registered`);
    return new taskType(cfg);
  }
}, _class11);
var TaskManager = new TaskManagerClass();

// src/task.ts
var Task2 = (_class12 = class _Task {
  static __initStatic12() {this.type = "task"}
  
  __init17() {this.tasks = []}
  __init18() {this.config = {}}
  __init19() {this.enabled = true}
  __init20() {this.skip = false}
  
  
  __init21() {this.options = {
    concurrent: false,
    exitOnError: true,
    renderer: "default",
    rendererOptions: {
      showSubtasks: true,
      collapseSubtasks: true,
      showSkipMessage: true,
      collapseSkips: true,
      suffixSkips: false,
      showErrorMessage: false,
      collapseErrors: true,
      timer: void 0
    }
  }}
  __init22() {this._props = {}}
  constructor(cfg = {}) {;_class12.prototype.__init17.call(this);_class12.prototype.__init18.call(this);_class12.prototype.__init19.call(this);_class12.prototype.__init20.call(this);_class12.prototype.__init21.call(this);_class12.prototype.__init22.call(this);
    this._props = cfg;
    this.parseOptions(cfg.options);
    this.registerTaskTypes(cfg.taskTypes);
    this.registerTasks(cfg.tasks);
    this.parseMeta(cfg);
    return this;
  }
  build() {
    const task = {
      title: this.name === false ? void 0 : this.name || this.constructor.name,
      task: this.runTask.bind(this),
      exitOnError: this.options.exitOnError,
      rendererOptions: this.options.rendererOptions,
      enabled: this.enabled,
      skip: this.skip,
      retry: this.retry,
      rollback: this.rollback
    };
    return task;
  }
  async runTask(ctx, task) {
    const data = typeof this.config === "function" ? await this.config(ctx) : this.config;
    return await this.run(data, ctx, task);
  }
  async run(cfg, ctx, task) {
    if (!task) {
      const task2 = new Listr(this.tasks, this.options);
      return await task2.run(cfg);
    }
    return task.newListr(this.tasks, this.options);
  }
  parseMeta(cfg) {
    const meta = ["name", "enabled", "skip", "retry", "rollback", "config", "run"];
    for (const key of meta) {
      const value = typeof cfg[key] === "function" ? cfg[key].bind(this) : cfg[key];
      if (typeof cfg[key] !== "undefined") this[key] = value;
    }
  }
  parseOptions(opts = {}) {
    const baseOptions = ["concurrent", "exitOnError", "exitAfterRollback"];
    for (const opt of baseOptions) {
      if (typeof opts[opt] !== "undefined") this.options[opt] = opts[opt];
    }
    const rendererOptions = ["showSubtasks", "collapseSubtasks", "showSkipMessage", "collapseSkips", "suffixSkips", "showErrorMessage", "collapseErrors"];
    for (const opt of rendererOptions) {
      if (typeof opts[opt] !== "undefined") this.options.rendererOptions[opt] = opts[opt];
    }
    if (typeof opts.timer !== "undefined") this.options.rendererOptions.timer = PRESET_TIMER;
    if (typeof opts.$custom !== "undefined") {
      for (const key in opts.$custom) {
        if (typeof opts.$custom[key] === "object")
          this.options[key] = { ...this.options[key], ...opts.$custom[key] };
        else this.options[key] = opts.$custom[key];
      }
    }
  }
  registerTaskTypes(taskTypes) {
    _optionalChain([taskTypes, 'optionalAccess', _119 => _119.forEach, 'call', _120 => _120((t) => TaskManager.registerTaskType(t))]);
  }
  registerTasks(tasks = []) {
    for (const t of tasks) {
      let task;
      if (t instanceof _Task) task = t;
      else if (typeof t === "function") task = new t();
      else {
        if (t.type) {
          task = TaskManager.createTask(t);
        } else task = new _Task(t);
      }
      this.tasks.push(task.build());
    }
  }
}, _class12.__initStatic12(), _class12);

// src/task.types.ts
_chunkEX5VYLFXjs.init_cjs_shims.call(void 0, );



exports.Task = Task2; exports.TaskManager = TaskManager;
