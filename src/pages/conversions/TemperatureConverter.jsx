import ConverterPage from '../../components/ConverterPage';
const UNITS = [{ value: 'c', label: 'Celsius (°C)' }, { value: 'f', label: 'Fahrenheit (°F)' }, { value: 'k', label: 'Kelvin (K)' }, { value: 'r', label: 'Rankine (°R)' }];
const convert = (v, from, to) => {
    let c;
    if (from === 'c') c = v; else if (from === 'f') c = (v - 32) * 5 / 9; else if (from === 'k') c = v - 273.15; else c = (v - 491.67) * 5 / 9;
    if (to === 'c') return c; if (to === 'f') return c * 9 / 5 + 32; if (to === 'k') return c + 273.15; return c * 9 / 5 + 491.67;
};
export default () => <ConverterPage title="Temperature Converter" category="conversions" units={UNITS} convert={convert} description="Convert between Celsius, Fahrenheit, Kelvin, and Rankine instantly." />;
