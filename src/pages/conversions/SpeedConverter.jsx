import ConverterPage from '../../components/ConverterPage';
const UNITS = [{ value: 'ms', label: 'm/s' }, { value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }, { value: 'kn', label: 'Knots' }, { value: 'fps', label: 'ft/s' }];
const TO_MS = { ms: 1, kmh: 1 / 3.6, mph: 0.44704, kn: 0.514444, fps: 0.3048 };
const convert = (v, from, to) => v * TO_MS[from] / TO_MS[to];
export default () => <ConverterPage title="Speed Converter" category="conversions" units={UNITS} convert={convert} description="Convert m/s, km/h, mph, knots, and feet per second instantly." />;
