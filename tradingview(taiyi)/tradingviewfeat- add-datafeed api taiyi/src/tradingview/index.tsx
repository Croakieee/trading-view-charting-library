import { useEffect } from "react";
import DataFeed from "./datafeed";

declare global {
  interface Window {
    TradingView: any;
    Datafeeds: any;
  }
}

const index = () => {
  useEffect(() => {
    const tvWidget = new window.TradingView.widget({
      container: "chartContainer",
      locale: "zh_TW",
      library_path: "charting_library/",
      datafeed: DataFeed,
      symbol: "GI:DXY:INDEX",
      interval: "1D",
      fullscreen: true,
    });

    return () => {
      tvWidget.remove();
    };
  }, []);

  return <div id="chartContainer"></div>;
};

export default index;
