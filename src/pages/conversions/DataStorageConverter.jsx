import ConverterPage from '../../components/ConverterPage';
const UNITS = [
    { value: 'b', label: 'Byte (B)' }, { value: 'kb', label: 'Kilobyte (KB)' }, { value: 'mb', label: 'Megabyte (MB)' },
    { value: 'gb', label: 'Gigabyte (GB)' }, { value: 'tb', label: 'Terabyte (TB)' }, { value: 'pb', label: 'Petabyte (PB)' },
    { value: 'kib', label: 'Kibibyte (KiB)' }, { value: 'mib', label: 'Mebibyte (MiB)' }, { value: 'gib', label: 'Gibibyte (GiB)' }, { value: 'tib', label: 'Tebibyte (TiB)' },
];
const TO_B = { b: 1, kb: 1000, mb: 1e6, gb: 1e9, tb: 1e12, pb: 1e15, kib: 1024, mib: 1048576, gib: 1073741824, tib: 1099511627776 };
const convert = (v, from, to) => v * TO_B[from] / TO_B[to];
export default () => <ConverterPage title="Data Storage Converter" category="conversions" units={UNITS} convert={convert} description="Convert between bytes, KB, MB, GB, TB, PB and their binary (KiB, MiB…) equivalents." />;
