// Bitcoin Data Types
export interface BitcoinPriceDataPoint {
    time: string;
    price: number;
  }
  
  export interface BitcoinData {
    priceData: BitcoinPriceDataPoint[];
    currentPrice: number;
    dominance: number;
  }
  
  // Fear & Greed Index Types
  export interface FearGreedDataPoint {
    time: string;
    value: number;
  }
  
  export interface FearGreedData {
    historicalData: FearGreedDataPoint[];
    currentValue: number;
  }
  
  // Altcoin Season Index Types
  export interface AltcoinDataPoint {
    time: string;
    value: number;
  }
  
  export interface AltcoinData {
    historicalData: AltcoinDataPoint[];
    currentValue: number;
  }
  
  // Type for time labels component props
  export interface TimeLabelsProps {
    data: BitcoinPriceDataPoint[];
  }
  
  // Component prop types
  export interface CryptoChartProps {
    dataUrl?: string;
  }
  
  export interface FearGreedIndexProps {
    dataUrl?: string;
  }
  
  export interface AltcoinIndexProps {
    dataUrl?: string;
  }