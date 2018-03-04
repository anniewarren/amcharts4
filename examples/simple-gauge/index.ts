import * as amcharts4 from "@amcharts/amcharts4";
import * as gauge from "@amcharts/amcharts4/gauge";
import AnimatedTheme from "@amcharts/amcharts4/themes/animated";

amcharts4.system.useTheme(AnimatedTheme);

// create chart
let chart = amcharts4.create("chartdiv", gauge.GaugeChart);
chart.innerRadius = -15;

let axis = chart.xAxes.push(new gauge.ValueAxis<gauge.AxisRendererCircular>());
axis.min = 0;
axis.max = 100;
axis.strictMinMax = true;

let colorSet = new amcharts4.ColorSet();

let range0 = axis.axisRanges.create();
range0.startValue = 0;
range0.endValue = 50;
range0.axisFill.fillOpacity = 1;
range0.axisFill.fill = colorSet.getIndex(0);

let range1 = axis.axisRanges.create();
range1.startValue = 50;
range1.endValue = 80;
range1.axisFill.fillOpacity = 1;
range1.axisFill.fill = colorSet.getIndex(2);

let range2 = axis.axisRanges.create();
range2.startValue = 80;
range2.endValue = 100;
range2.axisFill.fillOpacity = 1;
range2.axisFill.fill = colorSet.getIndex(4);

let hand = chart.hands.push(new gauge.ClockHand());

setInterval(() => {
  hand.showValue(Math.random() * 100, 1000, amcharts4.ease.cubicOut);
}, 2000)