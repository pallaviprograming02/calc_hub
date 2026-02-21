import ConverterPage from '../../components/ConverterPage';
const UNITS = [
    { value: 'mg', label: 'Milligram (mg)' }, { value: 'g', label: 'Gram (g)' }, { value: 'kg', label: 'Kilogram (kg)' },
    { value: 't', label: 'Metric Ton (t)' }, { value: 'lb', label: 'Pound (lb)' }, { value: 'oz', label: 'Ounce (oz)' },
    { value: 'stone', label: 'Stone' }, { value: 'ct', label: 'Carat (ct)' },
];
const TO_KG = { mg: 1e-6, g: 0.001, kg: 1, t: 1000, lb: 0.453592, oz: 0.0283495, stone: 6.35029, ct: 0.0002 };
const convert = (v, from, to) => v * TO_KG[from] / TO_KG[to];
export default () => <ConverterPage title="Weight Converter" category="conversions" units={UNITS} convert={convert} description="Convert between milligrams, grams, kilograms, pounds, ounces, stone, and more." />;
