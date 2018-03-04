/**
 * Contains code and logic for generating linear gradients.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { List } from "../../utils/List";
import { system } from "../../System";
import * as $iter from "../../utils/Iterator";
import * as $math from "../../utils/Math";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Linear gradient class.
 */
var LinearGradient = /** @class */ (function (_super) {
    __extends(LinearGradient, _super);
    /**
     * Constructor.
     */
    function LinearGradient() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * List of colors switch definitions in a gradient.
         *
         * @type {List<IGradientStop>}
         */
        _this._stops = new List();
        /**
         * Gradient direction.
         *
         * @type {number}
         */
        _this._rotation = 0;
        _this.className = "LinearGradient";
        _this._stops.events.on("setIndex", _this.validate, _this);
        _this._stops.events.on("insert", _this.validate, _this);
        // Create element
        _this.element = _this.paper.addGroup("linearGradient");
        _this.id = "gradient-" + system.getUniqueId();
        _this.element.attr({ "id": _this.id });
        _this._disposers.push(_this.element);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws gradient.
     *
     * @ignore Exclude from docs
     */
    LinearGradient.prototype.validate = function () {
        var _this = this;
        var rotation = this._rotation * $math.RADIANS;
        var x1 = Math.round(50 + Math.sin(rotation + Math.PI) * 50) + '%';
        var y1 = Math.round(50 + Math.cos(rotation) * 50) + '%';
        var x2 = Math.round(50 + Math.sin(rotation) * 50) + '%';
        var y2 = Math.round(50 + Math.cos(rotation + Math.PI) * 50) + '%';
        var gradientElement = this.element;
        gradientElement.removeChildNodes();
        //		gradientElement.attr({"x1": x1, "x2":x2, "y1": y1, "y2":y2});
        $iter.each($iter.indexed(this._stops.iterator()), function (a) {
            var i = a[0];
            var stop = a[1];
            var offset = stop.offset;
            if (!$type.isNumber(offset)) {
                offset = i / (_this._stops.length - 1);
            }
            var gradientStop = _this.paper.add("stop");
            gradientStop.attr({ "stop-color": stop.color });
            if ($type.isNumber(stop.opacity)) {
                gradientStop.attr({ "stop-opacity": stop.opacity });
            }
            if ($type.isNumber(offset)) {
                gradientStop.attr({ "offset": offset });
            }
            gradientElement.add(gradientStop);
        });
    };
    /**
     * Clears the gradient.
     *
     * @ignore Exclude from docs
     */
    LinearGradient.prototype.clear = function () {
        this._stops.clear();
    };
    /**
     * Adds a color step to the gradient.
     *
     * @param {Color}   color    Color (hex code or named color)
     * @param {number}  opacity  Opacity (value from 0 to 1; 0 completely transaprent, 1 fully opaque)
     * @param {number}  offset   Position of color in the gradient (value 0 to 1; 0 meaning start of the gradient and 1 end)
     */
    LinearGradient.prototype.addColor = function (color, opacity, offset) {
        this._stops.push({ color: color, opacity: opacity, offset: offset });
    };
    Object.defineProperty(LinearGradient.prototype, "stops", {
        /**
         * A list of color stops in the gradient.
         *
         * @return {List<IGradientStop>} Stops
         */
        get: function () {
            return this._stops;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearGradient.prototype, "paper", {
        /**
         * @ignore Exclude from docs
         * @return {Paper} Paper
         */
        get: function () {
            if (this._paper) {
                return this._paper;
            }
            return system.ghostPaper;
        },
        /**
         * [[Paper]] instace to use for the gradient.
         *
         * @ignore Exclude from docs
         * @param {Paper}  paper  Paper
         */
        set: function (paper) {
            if (this._paper != paper) {
                this._paper = paper;
                this.validate();
                paper.appendDef(this.element);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearGradient.prototype, "rotation", {
        /**
         * @return {number} Rotation
         */
        get: function () {
            return this._rotation;
        },
        /**
         * Rotation (direction) of the gradient in degrees.
         *
         * @param {number}  value  Rotation
         */
        set: function (value) {
            this.element.attr({ "gradientTransform": "rotate(" + value + ")" });
            this._rotation = value;
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    return LinearGradient;
}(BaseObject));
export { LinearGradient };
//# sourceMappingURL=LinearGradient.js.map