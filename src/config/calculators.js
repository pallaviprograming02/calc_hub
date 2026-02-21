import { Calculator, FlaskConical, ArrowRightLeft, HeartPulse, Building2, Wrench } from 'lucide-react';

export const CATEGORIES = [
    { id: 'math', label: 'Math', icon: Calculator, color: '#3355ff', lightBg: '#f0f4ff' },
    { id: 'finance', label: 'Finance', icon: FlaskConical, color: '#059669', lightBg: '#ecfdf5' },
    { id: 'conversions', label: 'Conversions', icon: ArrowRightLeft, color: '#d97706', lightBg: '#fffbeb' },
    { id: 'health', label: 'Health & Fitness', icon: HeartPulse, color: '#e11d48', lightBg: '#fff1f2' },
    { id: 'construction', label: 'Construction', icon: Building2, color: '#7c3aed', lightBg: '#f5f3ff' },
    { id: 'utility', label: 'Utility', icon: Wrench, color: '#0891b2', lightBg: '#ecfeff' },
];

export const CALCULATORS = [
    // ─── MATH ───────────────────────────────────────────────────────────────
    { id: 'basic-calculator', name: 'Basic Calculator', category: 'math', path: '/math/basic-calculator', description: 'Standard calculator with button pad for everyday arithmetic.', tags: ['add', 'subtract', 'multiply', 'divide', 'arithmetic'] },
    { id: 'scientific-calculator', name: 'Scientific Calculator', category: 'math', path: '/math/scientific-calculator', description: 'Trigonometry, logarithms, exponents, and advanced functions.', tags: ['trig', 'sin', 'cos', 'tan', 'log', 'exp', 'scientific'] },
    { id: 'percentage-calculator', name: 'Percentage Calculator', category: 'math', path: '/math/percentage-calculator', description: 'Find percentages, percentage change, and X% of Y.', tags: ['percent', '%', 'ratio', 'proportion'] },
    { id: 'fraction-calculator', name: 'Fraction Calculator', category: 'math', path: '/math/fraction-calculator', description: 'Add, subtract, multiply, and divide fractions with steps.', tags: ['fraction', 'numerator', 'denominator'] },
    { id: 'ratio-calculator', name: 'Ratio Calculator', category: 'math', path: '/math/ratio-calculator', description: 'Simplify and scale ratios between two or more numbers.', tags: ['ratio', 'proportion', 'scale'] },
    { id: 'log-calculator', name: 'Log Calculator', category: 'math', path: '/math/log-calculator', description: 'Calculate logarithms for any base including natural log.', tags: ['logarithm', 'ln', 'log10', 'base'] },
    { id: 'exponent-calculator', name: 'Exponent Calculator', category: 'math', path: '/math/exponent-calculator', description: 'Compute base raised to any power with step-by-step solution.', tags: ['power', 'exponent', 'squared', 'cubed'] },
    { id: 'root-calculator', name: 'Root Calculator', category: 'math', path: '/math/root-calculator', description: 'Calculate square roots and nth roots of any number.', tags: ['square root', 'nth root', 'radical', 'sqrt'] },
    { id: 'matrix-calculator', name: 'Matrix Calculator', category: 'math', path: '/math/matrix-calculator', description: 'Add, multiply matrices and find determinants and inverses.', tags: ['matrix', 'determinant', 'inverse', 'linear algebra'] },
    { id: 'random-number', name: 'Random Number Generator', category: 'math', path: '/math/random-number', description: 'Generate random numbers within a range with custom options.', tags: ['random', 'range', 'generate', 'seed'] },
    { id: 'lcm-gcf-calculator', name: 'LCM & GCF Calculator', category: 'math', path: '/math/lcm-gcf-calculator', description: 'Find the LCM and GCF of two or more numbers instantly.', tags: ['lcm', 'gcf', 'gcd', 'least common multiple', 'greatest common factor'] },

    // ─── FINANCE ────────────────────────────────────────────────────────────
    { id: 'gst-calculator', name: 'GST Calculator', category: 'finance', path: '/finance/gst-calculator', description: 'Add or remove GST from any amount with configurable rate.', tags: ['gst', 'tax', 'vat', 'goods services tax'] },
    { id: 'emi-calculator', name: 'EMI Calculator', category: 'finance', path: '/finance/emi-calculator', description: 'Calculate monthly EMI and view full amortization schedule.', tags: ['emi', 'loan', 'mortgage', 'installment', 'amortization'] },
    { id: 'loan-calculator', name: 'Loan Calculator', category: 'finance', path: '/finance/loan-calculator', description: 'Total interest, monthly payments, and payoff timeline.', tags: ['loan', 'interest', 'payment', 'bank'] },
    { id: 'simple-interest', name: 'Simple Interest', category: 'finance', path: '/finance/simple-interest', description: 'Calculate simple interest: SI = P × R × T / 100.', tags: ['simple interest', 'si', 'principal', 'rate'] },
    { id: 'compound-interest', name: 'Compound Interest', category: 'finance', path: '/finance/compound-interest', description: 'Compound interest with frequency options and growth chart.', tags: ['compound interest', 'ci', 'compounding', 'investment'] },
    { id: 'margin-calculator', name: 'Margin Calculator', category: 'finance', path: '/finance/margin-calculator', description: 'Calculate gross profit margin and markup percentage.', tags: ['margin', 'profit', 'markup', 'gross', 'revenue'] },
    { id: 'discount-calculator', name: 'Discount Calculator', category: 'finance', path: '/finance/discount-calculator', description: 'Find final price and savings amount from any discount.', tags: ['discount', 'sale', 'off', 'price reduction', 'savings'] },
    { id: 'roi-calculator', name: 'ROI Calculator', category: 'finance', path: '/finance/roi-calculator', description: 'Return on investment and annualized ROI calculation.', tags: ['roi', 'return', 'investment', 'profit', 'yield'] },
    { id: 'sip-calculator', name: 'SIP Calculator', category: 'finance', path: '/finance/sip-calculator', description: 'Systematic Investment Plan growth with interactive chart.', tags: ['sip', 'mutual fund', 'investment', 'growth', 'monthly'] },
    { id: 'inflation-calculator', name: 'Inflation Calculator', category: 'finance', path: '/finance/inflation-calculator', description: 'Find the future or past value of money adjusted for inflation.', tags: ['inflation', 'cpi', 'purchasing power', 'money value'] },

    // ─── CONVERSIONS ─────────────────────────────────────────────────────────
    { id: 'length-converter', name: 'Length Converter', category: 'conversions', path: '/conversions/length', description: 'Convert between mm, cm, m, km, inches, feet, yards, miles.', tags: ['length', 'distance', 'meter', 'feet', 'miles', 'km', 'convert'] },
    { id: 'weight-converter', name: 'Weight Converter', category: 'conversions', path: '/conversions/weight', description: 'Convert kg, lbs, grams, ounces, stone, and more.', tags: ['weight', 'mass', 'kg', 'lb', 'gram', 'ounce', 'stone'] },
    { id: 'temperature-converter', name: 'Temperature Converter', category: 'conversions', path: '/conversions/temperature', description: 'Convert Celsius, Fahrenheit, Kelvin, and Rankine.', tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'convert'] },
    { id: 'currency-converter', name: 'Currency Converter', category: 'conversions', path: '/conversions/currency', description: 'Live exchange rates for 150+ world currencies.', tags: ['currency', 'exchange rate', 'usd', 'inr', 'eur', 'forex'] },
    { id: 'speed-converter', name: 'Speed Converter', category: 'conversions', path: '/conversions/speed', description: 'Convert m/s, km/h, mph, knots instantly.', tags: ['speed', 'velocity', 'kmh', 'mph', 'knots', 'm/s'] },
    { id: 'area-converter', name: 'Area Converter', category: 'conversions', path: '/conversions/area', description: 'Convert square meters, acres, square feet, hectares.', tags: ['area', 'square meter', 'acre', 'hectare', 'sqft'] },
    { id: 'volume-converter', name: 'Volume Converter', category: 'conversions', path: '/conversions/volume', description: 'Convert liters, gallons, cups, ml, cubic meters.', tags: ['volume', 'liter', 'gallon', 'cup', 'ml', 'cubic'] },
    { id: 'data-storage-converter', name: 'Data Storage Converter', category: 'conversions', path: '/conversions/data-storage', description: 'Convert bytes, KB, MB, GB, TB, PB instantly.', tags: ['data', 'bytes', 'kb', 'mb', 'gb', 'tb', 'storage', 'computer'] },

    // ─── HEALTH & FITNESS ───────────────────────────────────────────────────
    { id: 'bmi-calculator', name: 'BMI Calculator', category: 'health', path: '/health/bmi-calculator', description: 'Body Mass Index with visual healthy range indicator.', tags: ['bmi', 'body mass index', 'weight', 'height', 'obesity'] },
    { id: 'bmr-calculator', name: 'BMR Calculator', category: 'health', path: '/health/bmr-calculator', description: 'Basal Metabolic Rate via Harris-Benedict & Mifflin-St Jeor.', tags: ['bmr', 'basal metabolic rate', 'calories', 'metabolism'] },
    { id: 'calorie-calculator', name: 'Calorie Calculator', category: 'health', path: '/health/calorie-calculator', description: 'Daily calorie intake based on goals and activity level.', tags: ['calorie', 'intake', 'diet', 'weight loss', 'nutrition'] },
    { id: 'body-fat-calculator', name: 'Body Fat Calculator', category: 'health', path: '/health/body-fat-calculator', description: 'Body fat percentage using the US Navy circumference method.', tags: ['body fat', 'navy method', 'fitness', 'health'] },
    { id: 'tdee-calculator', name: 'TDEE Calculator', category: 'health', path: '/health/tdee-calculator', description: 'Total Daily Energy Expenditure based on activity level.', tags: ['tdee', 'calories', 'activity', 'maintenance', 'energy'] },

    // ─── CONSTRUCTION ────────────────────────────────────────────────────────
    { id: 'concrete-calculator', name: 'Concrete Calculator', category: 'construction', path: '/construction/concrete-calculator', description: 'Calculate concrete volume needed from slab dimensions.', tags: ['concrete', 'cement', 'slab', 'volume', 'construction'] },
    { id: 'tile-calculator', name: 'Tile Calculator', category: 'construction', path: '/construction/tile-calculator', description: 'Tiles needed for any room size with wastage percentage.', tags: ['tiles', 'flooring', 'room', 'wastage', 'construction'] },
    { id: 'paint-calculator', name: 'Paint Calculator', category: 'construction', path: '/construction/paint-calculator', description: 'Litres of paint needed for walls based on area and coats.', tags: ['paint', 'wall', 'coverage', 'litres', 'construction'] },
    { id: 'sq-footage-calculator', name: 'Square Footage Calc', category: 'construction', path: '/construction/square-footage', description: 'Calculate area for rectangles, circles, and triangles.', tags: ['square footage', 'area', 'floor', 'room', 'measurement'] },

    // ─── UTILITY ─────────────────────────────────────────────────────────────
    { id: 'age-calculator', name: 'Age Calculator', category: 'utility', path: '/utility/age-calculator', description: 'Exact age in years, months, days, and hours from a date.', tags: ['age', 'birthday', 'dob', 'years', 'date'] },
    { id: 'time-calculator', name: 'Time Calculator', category: 'utility', path: '/utility/time-calculator', description: 'Add or subtract time durations easily.', tags: ['time', 'duration', 'hours', 'minutes', 'seconds'] },
    { id: 'gpa-calculator', name: 'GPA Calculator', category: 'utility', path: '/utility/gpa-calculator', description: 'Calculate GPA from grades and credit hours.', tags: ['gpa', 'grade', 'credit', 'cgpa', 'academic'] },
    { id: 'fuel-cost-calculator', name: 'Fuel Cost Calculator', category: 'utility', path: '/utility/fuel-cost-calculator', description: 'Trip fuel cost from distance, efficiency, and fuel price.', tags: ['fuel', 'petrol', 'diesel', 'cost', 'mileage', 'trip'] },
];

export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id);
export const getCalculatorsByCategory = (catId) => CALCULATORS.filter(c => c.category === catId);
export const searchCalculators = (query) => {
    if (!query.trim()) return CALCULATORS;
    const q = query.toLowerCase();
    return CALCULATORS.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.includes(q))
    );
};
