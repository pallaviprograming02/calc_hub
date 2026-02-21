import ConverterPage from '../../components/ConverterPage';
const UNITS = [
    { value: 'mm', label: 'Millimeter (mm)' }, { value: 'cm', label: 'Centimeter (cm)' }, { value: 'm', label: 'Meter (m)' },
    { value: 'km', label: 'Kilometer (km)' }, { value: 'in', label: 'Inch (in)' }, { value: 'ft', label: 'Foot (ft)' },
    { value: 'yd', label: 'Yard (yd)' }, { value: 'mi', label: 'Mile (mi)' }, { value: 'nmi', label: 'Nautical Mile' },
];
const TO_METER = { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344, nmi: 1852 };
const convert = (v, from, to) => v * TO_METER[from] / TO_METER[to];
export default () => <ConverterPage title="Length Converter" category="conversions" units={UNITS} convert={convert} description="Convert between mm, cm, m, km, inches, feet, yards, miles, and nautical miles." />;
