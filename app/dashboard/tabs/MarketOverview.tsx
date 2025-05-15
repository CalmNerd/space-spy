import { CryptoChart } from '../crypto-chart/CryptoGraph'
import { FearGreedIndex } from '../index/FearGreedIndex'
import { AltcoinIndex } from '../index/AltcoinIndex'

const MarketOverview = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12">
            <div className="lg:col-span-1">
                <CryptoChart />
            </div>

            <div className="lg:col-span-1">
                <FearGreedIndex />
            </div>

            <div className="lg:col-span-1">
                <AltcoinIndex />
            </div>
        </div>
    )
}

export default MarketOverview
