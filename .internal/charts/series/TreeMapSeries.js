/**
 * TreeMap series module.
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
import { ColumnSeries, ColumnSeriesDataItem } from "./ColumnSeries";
import { system } from "../../core/System";
import * as $type from "../../core/utils/Type";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[TreeMapSeries]].
 *
 * @see {@link DataItem}
 */
var TreeMapSeriesDataItem = /** @class */ (function (_super) {
    __extends(TreeMapSeriesDataItem, _super);
    /**
     * Constructor
     */
    function TreeMapSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "TreeMapSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "dataContext", {
        /**
         * @return {Object} Item's data
         */
        get: function () {
            // It's because data of tree series is TreeMapDataItems.
            if (this._dataContext) {
                return this._dataContext.dataContext;
            }
        },
        /**
         * Data for the this particular item.
         *
         * @param {Object}  value  Item's data
         */
        set: function (value) {
            this._dataContext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "parentName", {
        /**
         * The name of the item's parent item.
         *
         * @return {string} Parent name
         */
        get: function () {
            var treeMapDataItem = this.treeMapDataItem;
            if (treeMapDataItem && treeMapDataItem.parent) {
                return treeMapDataItem.parent.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "value", {
        /**
         * Item's numeric value.
         *
         * @readonly
         * @return {number} Value
         */
        get: function () {
            return this.treeMapDataItem.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMapSeriesDataItem.prototype, "treeMapDataItem", {
        /**
         * A corresponding data item from the tree map.
         *
         * @readonly
         * @return {TreeMapDataItem} Data item
         */
        get: function () {
            return this._dataContext;
        },
        enumerable: true,
        configurable: true
    });
    return TreeMapSeriesDataItem;
}(ColumnSeriesDataItem));
export { TreeMapSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines Series for a TreeMap chart.
 *
 * @see {@link ITreeMapSeriesEvents} for a list of available Events
 * @see {@link ITreeMapSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var TreeMapSeries = /** @class */ (function (_super) {
    __extends(TreeMapSeries, _super);
    /**
     * Constructor
     */
    function TreeMapSeries() {
        var _this = _super.call(this) || this;
        _this.className = "TreeMapSeries";
        _this.applyTheme();
        _this.fillOpacity = 1;
        _this.strokeOpacity = 1;
        _this.minBulletDistance = 0;
        _this.columns.template.tooltipText = "{parentName} {name}: ${value.formatNumber()}"; //@todo review this when value Field will be adde to treeMapSeries
        _this.columns.template.configField = "config";
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("stroke");
        _this.dataFields.openValueX = "x0";
        _this.dataFields.valueX = "x1";
        _this.dataFields.openValueY = "y0";
        _this.dataFields.valueY = "y1";
        _this.sequencedInterpolation = false;
        // otherwise nodes don't stack nicely to each other
        _this.columns.template.pixelPerfect = false;
        return _this;
    }
    /**
     * Processes data item.
     *
     * @param {TreeMapSeriesDataItem}  dataItem     Data item
     * @param {Object}                 dataContext  Raw data
     * @param {number}                 index        Index of the data item
     */
    TreeMapSeries.prototype.processDataItem = function (dataItem, dataContext, index) {
        dataContext.seriesDataItem = dataItem; // save a reference here. dataContect is TreeMapDataItem and we need to know dataItem sometimes
        _super.prototype.processDataItem.call(this, dataItem, dataContext, index);
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return {TreeMapSeriesDataItem} Data Item
     */
    TreeMapSeries.prototype.createDataItem = function () {
        return new TreeMapSeriesDataItem();
    };
    /**
     * Shows series.
     *
     * @param  {number}     duration  Duration of fade in (ms)
     * @return {Animation}            Animation
     */
    TreeMapSeries.prototype.show = function (duration) {
        return this.showReal(duration);
    };
    /**
     * Hides series.
     *
     * @param  {number}     duration  Duration of fade out (ms)
     * @return {Animation}            Animation
     */
    TreeMapSeries.prototype.hide = function (duration) {
        return this.hideReal(duration);
    };
    /**
     * Process values.
     *
     * @ignore Exclude from docs
     */
    TreeMapSeries.prototype.processValues = function () {
        // Just overriding so that inherited method does not kick in.
    };
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param {object}  config  Config
     */
    TreeMapSeries.prototype.processConfig = function (config) {
        if (config) {
            // Add empty data fields if the they are not set, so that XYSeries
            // dataField check does not result in error.
            if (!$type.hasValue(config.dataFields) || !$type.isObject(config.dataFields)) {
                config.dataFields = {};
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    return TreeMapSeries;
}(ColumnSeries));
export { TreeMapSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
system.registeredClasses["TreeMapSeries"] = TreeMapSeries;
system.registeredClasses["TreeMapSeriesDataItem"] = TreeMapSeriesDataItem;
//# sourceMappingURL=TreeMapSeries.js.map