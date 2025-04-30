import { useEffect } from "react";

declare global {
  interface Window {
    TradingView: any;
    Datafeeds: any;
  }
}

const index = () => {
  useEffect(() => {
    new window.TradingView.widget({
      container: "chartContainer",
      locale: "zh_TW",
      library_path: "charting_library/",
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
      symbol: "AAPL",
      interval: "1D",
      fullscreen: true,
    });
  }, []);

  return <div id="chartContainer"></div>;
};

export default index;
