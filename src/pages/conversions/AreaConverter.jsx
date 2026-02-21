import ConverterPage from '../../components/ConverterPage';
const UNITS = [{ value: 'mm2', label: 'mm²' }, { value: 'cm2', label: 'cm²' }, { value: 'm2', label: 'm²' }, { value: 'km2', label: 'km²' }, { value: 'ha', label: 'Hectare' }, { value: 'ac', label: 'Acre' }, { value: 'ft2', label: 'ft²' }, { value: 'yd2', label: 'yd²' }, { value: 'mi2', label: 'mi²' }];
const TO_M2 = { mm2: 1e-6, cm2: 1e-4, m2: 1, km2: 1e6, ha: 10000, ac: 4046.86, ft2: 0.0929, yd2: 0.836, mi2: 2589988 };
const convert = (v, from, to) => v * TO_M2[from] / TO_M2[to];
export default () => <ConverterPage title="Area Converter" category="conversions" units={UNITS} convert={convert} description="Convert square meters, km², acres, hectares, square feet, and more." />;
