import { OnReadyCallback, LibrarySymbolInfo, ResolutionString, PeriodParams, HistoryCallback, Bar } from "@/public/charting_library";
import { getQuoteBySymbol, getSymbolHistories } from "../api";
import { formatTime } from "../utils";

const DataFeed = {
  onReady: (callback: OnReadyCallback) => {
    console.log("[onReady]: Method call");
    const config = {};
    setTimeout(() => callback(config));
  },
  resolveSymbol: async (symbolName: string, onSymbolResolvedCallback: (info: LibrarySymbolInfo) => void) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const [market, code] = symbolName.split(":");
    const name = `${market}:${code}`;
    const res = await getQuoteBySymbol(symbolName, { column: "D_FORMAT" });
    const chineseName = res?.data?.[0]?.["200009"];
    const price = res?.data?.[0]?.["200026"]; // 字串小數位數由後端控制
    const countDecimal = price.toString().split(".")[1].length; // 有幾位小數
    const pricescale = Math.pow(10, countDecimal);

    const symbolInfo = {
      description: chineseName || symbolName /* 顯示的名稱 */,
      name: symbolName,
      ticker: name,
      session: "24x7",
      timezone: "Asia/Taipei",
      type: "forex",
      has_intraday: true,
      has_daily: true,
      exchange: "",
      minmov: 1,
      minmove2: 0,
      fractional: false,
      currency_code: "",
      pricescale,
      supported_resolutions: ["1", "5", "10", "15", "30", "60", "D", "W", "M"],
    } as LibrarySymbolInfo;
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ) => {
    // tradingview會設定每個尺度(resolution)下要有幾個bars,如果沒有滿足數量可能會造成一直call getBars的無窮迴圈
    const symbol = symbolInfo.name;
    const { from, to } = periodParams;

    if (symbol) {
      try {
        const { data, statusCode } = await getSymbolHistories({
          resolution,
          symbol,
          to,
          from,
        });

        console.log("[getBars]: Method call");
        console.table({
          from: formatTime(from, "YYYYMMDD"),
          to: formatTime(to, "YYYYMMDD"),
          resolution,
          "api data length": data?.t?.length,
        });

        if (statusCode !== 200 || data?.t?.length === 0) {
          onHistoryCallback([], { noData: true });
          return;
        }

        const { l, h, o, c, t } = data;

        const bars = t?.reduce((acc: Bar[], timestamp: number, index: number) => {
          acc.push({
            time: timestamp * 1000,
            low: l[index],
            high: h[index],
            open: o[index],
            close: c[index],
          });
          return acc;
        }, [] as Bar[]);

        bars.sort((a: Bar, b: Bar) => a.time - b.time);

        onHistoryCallback(bars, { noData: false });
      } catch (error) {
        console.log(error);
      }
    }
  },
  subscribeBars: () => {
    console.log("[subscribeBars]: Method call with subscriberUID:");
  },
  unsubscribeBars: () => {
    console.log("[unsubscribeBars]: Method call with subscriberUID:");
  },
};

export default DataFeed;
