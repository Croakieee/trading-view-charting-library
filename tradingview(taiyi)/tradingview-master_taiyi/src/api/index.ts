import { ResolutionString } from "@/public/charting_library";

type HistroyParams = {
  resolution?: number | string;
  symbol: string;
  from?: number;
  to?: number;
  quote?: number;
  compress?: number;
};

export const getQuoteBySymbol = (symbol: string, params?: { column?: string }) => {
  const url = `https://ws.api.beta.cnyes.cool/ws/api/v2/quote/quotes/${symbol}?`;

  return fetch(url + new URLSearchParams(params)).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });
};

// 將tradingview的resolution轉成api的resolution, 1c是跨日
const formatResolution = (resolution: ResolutionString) => {
  switch (resolution) {
    case "1":
    case "5":
    case "10":
    case "15":
    case "30":
    case "60":
      return "1c";
    default:
      return /[0-9]+[DWM]/.test(resolution) ? String(resolution).replace(/[0-9]/g, "") : resolution;
  }
};

type HistoryProps = {
  from: number;
  to: number;
  resolution: ResolutionString;
  symbol: string;
};

export const getSymbolHistories = async ({ from, to, resolution, symbol }: HistoryProps) => {
  const apiResolution = formatResolution(resolution);
  const res = await GETv1HistoryBySymbol({
    resolution: apiResolution,
    symbol,
    quote: 1,
    to: from /* api的from是比較大的值,和tradingview相反 */,
    from: to,
  });
  const statusCode = res?.statusCode;
  const data = res?.data;

  return { statusCode, data };
};

export const GETv1HistoryBySymbol = ({ resolution = 5, symbol, from, to, quote = 0, compress }: HistroyParams) => {
  const url = "https://ws.api.beta.cnyes.cool/ws/api/v1/charting/history?";
  const params: any = {
    symbol,
    quote,
    resolution,
  };

  if (from) params.from = from;
  if (to) params.to = to;
  if (compress) params.compress = compress;

  return fetch(url + new URLSearchParams(params)).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });
};
