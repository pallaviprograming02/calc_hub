import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

// Loading fallback
const Loader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--text-muted)' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--border-color)', borderTopColor: '#3355ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
      <div style={{ fontSize: 14 }}>Loading calculator…</div>
    </div>
  </div>
);

// Math
const BasicCalculator = lazy(() => import('./pages/math/BasicCalculator'));
const ScientificCalculator = lazy(() => import('./pages/math/ScientificCalculator'));
const PercentageCalculator = lazy(() => import('./pages/math/PercentageCalculator'));
const FractionCalculator = lazy(() => import('./pages/math/FractionCalculator'));
const RatioCalculator = lazy(() => import('./pages/math/RatioCalculator'));
const LogCalculator = lazy(() => import('./pages/math/LogCalculator'));
const ExponentCalculator = lazy(() => import('./pages/math/ExponentCalculator'));
const RootCalculator = lazy(() => import('./pages/math/RootCalculator'));
const MatrixCalculator = lazy(() => import('./pages/math/MatrixCalculator'));
const RandomNumber = lazy(() => import('./pages/math/RandomNumber'));
const LcmGcfCalculator = lazy(() => import('./pages/math/LcmGcfCalculator'));

// Finance
const GstCalculator = lazy(() => import('./pages/finance/GstCalculator'));
const EmiCalculator = lazy(() => import('./pages/finance/EmiCalculator'));
const LoanCalculator = lazy(() => import('./pages/finance/LoanCalculator'));
const SimpleInterest = lazy(() => import('./pages/finance/SimpleInterest'));
const CompoundInterest = lazy(() => import('./pages/finance/CompoundInterest'));
const MarginCalculator = lazy(() => import('./pages/finance/MarginCalculator'));
const DiscountCalculator = lazy(() => import('./pages/finance/DiscountCalculator'));
const RoiCalculator = lazy(() => import('./pages/finance/RoiCalculator'));
const SipCalculator = lazy(() => import('./pages/finance/SipCalculator'));
const InflationCalculator = lazy(() => import('./pages/finance/InflationCalculator'));

// Conversions
const LengthConverter = lazy(() => import('./pages/conversions/LengthConverter'));
const WeightConverter = lazy(() => import('./pages/conversions/WeightConverter'));
const TemperatureConverter = lazy(() => import('./pages/conversions/TemperatureConverter'));
const CurrencyConverter = lazy(() => import('./pages/conversions/CurrencyConverter'));
const SpeedConverter = lazy(() => import('./pages/conversions/SpeedConverter'));
const AreaConverter = lazy(() => import('./pages/conversions/AreaConverter'));
const VolumeConverter = lazy(() => import('./pages/conversions/VolumeConverter'));
const DataStorageConverter = lazy(() => import('./pages/conversions/DataStorageConverter'));

// Health
const BmiCalculator = lazy(() => import('./pages/health/BmiCalculator'));
const BmrCalculator = lazy(() => import('./pages/health/BmrCalculator'));
const CalorieCalculator = lazy(() => import('./pages/health/CalorieCalculator'));
const BodyFatCalculator = lazy(() => import('./pages/health/BodyFatCalculator'));
const TdeeCalculator = lazy(() => import('./pages/health/TdeeCalculator'));

// Construction
const ConcreteCalculator = lazy(() => import('./pages/construction/ConcreteCalculator'));
const TileCalculator = lazy(() => import('./pages/construction/TileCalculator'));
const PaintCalculator = lazy(() => import('./pages/construction/PaintCalculator'));
const SqFootageCalculator = lazy(() => import('./pages/construction/SquareFootage'));

// Utility
const AgeCalculator = lazy(() => import('./pages/utility/AgeCalculator'));
const TimeCalculator = lazy(() => import('./pages/utility/TimeCalculator'));
const GpaCalculator = lazy(() => import('./pages/utility/GpaCalculator'));
const FuelCostCalculator = lazy(() => import('./pages/utility/FuelCostCalculator'));

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />

              {/* Math */}
              <Route path="/math/basic-calculator" element={<BasicCalculator />} />
              <Route path="/math/scientific-calculator" element={<ScientificCalculator />} />
              <Route path="/math/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/math/fraction-calculator" element={<FractionCalculator />} />
              <Route path="/math/ratio-calculator" element={<RatioCalculator />} />
              <Route path="/math/log-calculator" element={<LogCalculator />} />
              <Route path="/math/exponent-calculator" element={<ExponentCalculator />} />
              <Route path="/math/root-calculator" element={<RootCalculator />} />
              <Route path="/math/matrix-calculator" element={<MatrixCalculator />} />
              <Route path="/math/random-number" element={<RandomNumber />} />
              <Route path="/math/lcm-gcf-calculator" element={<LcmGcfCalculator />} />

              {/* Finance */}
              <Route path="/finance/gst-calculator" element={<GstCalculator />} />
              <Route path="/finance/emi-calculator" element={<EmiCalculator />} />
              <Route path="/finance/loan-calculator" element={<LoanCalculator />} />
              <Route path="/finance/simple-interest" element={<SimpleInterest />} />
              <Route path="/finance/compound-interest" element={<CompoundInterest />} />
              <Route path="/finance/margin-calculator" element={<MarginCalculator />} />
              <Route path="/finance/discount-calculator" element={<DiscountCalculator />} />
              <Route path="/finance/roi-calculator" element={<RoiCalculator />} />
              <Route path="/finance/sip-calculator" element={<SipCalculator />} />
              <Route path="/finance/inflation-calculator" element={<InflationCalculator />} />

              {/* Conversions */}
              <Route path="/conversions/length" element={<LengthConverter />} />
              <Route path="/conversions/weight" element={<WeightConverter />} />
              <Route path="/conversions/temperature" element={<TemperatureConverter />} />
              <Route path="/conversions/currency" element={<CurrencyConverter />} />
              <Route path="/conversions/speed" element={<SpeedConverter />} />
              <Route path="/conversions/area" element={<AreaConverter />} />
              <Route path="/conversions/volume" element={<VolumeConverter />} />
              <Route path="/conversions/data-storage" element={<DataStorageConverter />} />

              {/* Health */}
              <Route path="/health/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/health/bmr-calculator" element={<BmrCalculator />} />
              <Route path="/health/calorie-calculator" element={<CalorieCalculator />} />
              <Route path="/health/body-fat-calculator" element={<BodyFatCalculator />} />
              <Route path="/health/tdee-calculator" element={<TdeeCalculator />} />

              {/* Construction */}
              <Route path="/construction/concrete-calculator" element={<ConcreteCalculator />} />
              <Route path="/construction/tile-calculator" element={<TileCalculator />} />
              <Route path="/construction/paint-calculator" element={<PaintCalculator />} />
              <Route path="/construction/square-footage" element={<SqFootageCalculator />} />

              {/* Utility */}
              <Route path="/utility/age-calculator" element={<AgeCalculator />} />
              <Route path="/utility/time-calculator" element={<TimeCalculator />} />
              <Route path="/utility/gpa-calculator" element={<GpaCalculator />} />
              <Route path="/utility/fuel-cost-calculator" element={<FuelCostCalculator />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
