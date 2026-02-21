import ConverterPage from '../../components/ConverterPage';
const UNITS = [
    { value: 'ml', label: 'Milliliter (ml)' }, { value: 'l', label: 'Liter (L)' }, { value: 'm3', label: 'Cubic Meter (m³)' },
    { value: 'floz', label: 'Fl Oz (US)' }, { value: 'cup', label: 'Cup (US)' }, { value: 'pt', label: 'Pint (US)' },
    { value: 'qt', label: 'Quart (US)' }, { value: 'gal', label: 'Gallon (US)' }, { value: 'in3', label: 'Cubic Inch (in³)' },
    { value: 'ft3', label: 'Cubic Foot (ft³)' },
];
const TO_ML = { ml: 1, l: 1000, m3: 1e6, floz: 29.5735, cup: 236.588, pt: 473.176, qt: 946.353, gal: 3785.41, in3: 16.3871, ft3: 28316.8 };
const convert = (v, from, to) => v * TO_ML[from] / TO_ML[to];
export default () => <ConverterPage title="Volume Converter" category="conversions" units={UNITS} convert={convert} description="Convert between milliliters, liters, gallons, cups, pints, and more." />;
