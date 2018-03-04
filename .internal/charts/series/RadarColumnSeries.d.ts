/**
 * Radar column series module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, IColumnSeriesProperties, IColumnSeriesDataFields, IColumnSeriesAdapters, IColumnSeriesEvents, ColumnSeriesDataItem } from "../series/ColumnSeries";
import { Sprite, SpriteEventDispatcher, AMEvent } from "../../core/Sprite";
import { RadarChart } from "../types/RadarChart";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[RadarColumnSeries]].
 *
 * @see {@link DataItem}
 */
export declare class RadarColumnSeriesDataItem extends ColumnSeriesDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     *
     * @type {RadarColumnSeries}
     */
    _component: RadarColumnSeries;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[RadarColumnSeries]].
 */
export interface IRadarColumnSeriesDataFields extends IColumnSeriesDataFields {
}
/**
 * Defines properties for [[RadarColumnSeries]].
 */
export interface IRadarColumnSeriesProperties extends IColumnSeriesProperties {
}
/**
 * Defines events for [[RadarColumnSeries]].
 */
export interface IRadarColumnSeriesEvents extends IColumnSeriesEvents {
}
/**
 * Defines adapters for [[RadarColumnSeries]].
 *
 * @see {@link Adapter}
 */
export interface IRadarColumnSeriesAdapters extends IColumnSeriesAdapters, IRadarColumnSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a 3D column graph.
 *
 * @see {@link IRadarColumnSeriesEvents} for a list of available Events
 * @see {@link IRadarColumnSeriesAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
export declare class RadarColumnSeries extends ColumnSeries {
    /**
     * Defines the type of data fields used for the series.
     *
     * @ignore Exclude from docs
     * @type {IRadarColumnSeriesDataFields}
     */
    _dataFields: IRadarColumnSeriesDataFields;
    /**
     * Defines available properties.
     *
     * @ignore Exclude from docs
     * @type {IRadarColumnSeriesProperties}
     */
    _properties: IRadarColumnSeriesProperties;
    /**
     * Defines available adapters.
     *
     * @ignore Exclude from docs
     * @type {IRadarColumnSeriesAdapters}
     */
    _adapter: IRadarColumnSeriesAdapters;
    /**
     * Event dispacther.
     *
     * @type {SpriteEventDispatcher<AMEvent<RadarColumnSeries, IRadarColumnSeriesEvents>>} Event dispatcher instance
     */
    events: SpriteEventDispatcher<AMEvent<RadarColumnSeries, IRadarColumnSeriesEvents>>;
    /**
     * A chart series belongs to.
     *
     * @ignore Exclude from docs
     * @type {RadarChart}
     */
    _chart: RadarChart;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates and returns a Slice element to use as column in radar chart.
     *
     * @return {Sprite} Clice/column.
     */
    protected getColumnTemplate(): Sprite;
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Validates data item's element, effectively redrawing it.
     *
     * @ignore Exclude from docs
     * @param {RadarColumnSeriesDataItem}  dataItem  Data item
     */
    validateDataElementReal(dataItem: this["_dataItem"]): void;
    /**
     * Returnsan SVG path that is used as mask for the series.
     *
     * @return {string} SVG path
     */
    protected getMaskPath(): string;
    /**
     * [getPoint description]
     *
     * @todo Description
     * @param {RadarColumnSeriesDataItem} dataItem  [description]
     * @param {string}                    xKey      [description]
     * @param {string}                    yKey      [description]
     * @param {number}                    locationX [description]
     * @param {number}                    locationY [description]
     * @param {string}                    stackKeyX [description]
     * @param {string}                    stackKeyY [description]
     */
    protected getPoint(dataItem: RadarColumnSeriesDataItem, xKey: string, yKey: string, locationX?: number, locationY?: number, stackKeyX?: string, stackKeyY?: string): {
        x: number;
        y: number;
    };
}
