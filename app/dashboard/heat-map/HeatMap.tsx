const coins = [
  { name: "BTC", price: "$1,754,176", change: "+9.5%", color: "green", size: "lg" },
  { name: "ETH", price: "$1,754,176", change: "+9.5%", color: "green", size: "lg" },
  { name: "SOL", price: "$148.441", change: "+5%", color: "green", size: "sm" },
  { name: "ADA", price: "$0.74", change: "+6%", color: "green", size: "sm" },
  { name: "DOGE", price: "$0.179", change: "+8%", color: "green", size: "sm" },
  { name: "TRX", price: "$0.246", change: "+4%", color: "green", size: "sm" },
  { name: "STETH", price: "$1735.877", change: "+9%", color: "green", size: "sm" },
  { name: "AVAX", price: "$27.073", change: "+7%", color: "green", size: "sm" },
  { name: "USDC", price: "$1.000", change: "0%", color: "gray", size: "sm" },
  { name: "LEO", price: "$5.856", change: "+1%", color: "green", size: "xs" },
  { name: "USDT", price: "$1.000", change: "0%", color: "gray", size: "xs" },
];

const HeatMap = () => {
  return (
    <div className="border border-[#0C3766] bg-[rgba(0,7,20,0.5)] backdrop-blur-md rounded-lg h-full">
      <div className="grid grid-cols-6 gap-2 h-full">
        <div className="col-span-3 row-span-3 bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-3 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <img src="/Daniel.png" alt="BTC" className="w-10 h-10 rounded-full" />
          </div>
          <div className="text-lg font-bold mt-2">BTC</div>
          <div className="text-2xl font-bold">$615</div>
        </div>
        
        <div className="col-span-3 row-span-3 bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-3 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <img src="/Daniel.png" alt="ETH" className="w-10 h-10 rounded-full" />
          </div>
          <div className="text-lg font-bold mt-2">ETH</div>
          <div className="text-2xl font-bold">$1,754,176</div>
          <div className="text-green-400">+9.5%</div>
        </div>
        
        {coins.slice(2).map((coin, i) => {
          let colSpan = "col-span-1";
          let rowSpan = "row-span-1";
          
          if (coin.size === "lg") {
            colSpan = "col-span-3";
            rowSpan = "row-span-2";
          } else if (coin.size === "md") {
            colSpan = "col-span-2";
            rowSpan = "row-span-1";
          }
          
          const bgColor = coin.color === "green" ? "from-green-900 to-green-800" : 
                          coin.color === "red" ? "from-red-900 to-red-800" : "from-gray-700 to-gray-600";
          
          return (
            <div 
              key={i} 
              className={`${colSpan} ${rowSpan} bg-gradient-to-br ${bgColor} rounded-lg p-2 flex flex-col justify-center items-center`}
            >
              <div className="text-sm font-bold">{coin.name}</div>
              <div className={`text-xs font-bold ${coin.color === "green" ? "text-green-400" : coin.color === "red" ? "text-red-400" : "text-gray-400"}`}>
                {coin.price}
              </div>
              <div className={`text-xs ${coin.color === "green" ? "text-green-400" : coin.color === "red" ? "text-red-400" : "text-gray-400"}`}>
                {coin.change}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeatMap;