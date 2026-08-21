// Fetch 4 major stock indices from Yahoo Finance and write indices.json
// Runs on GitHub Actions (server-side, no CORS restriction).
const fs = require('fs');

const INDICES = [
  { s: '^HSI', name: '恒生指數' },
  { s: '^DJI', name: '道瓊斯指數' },
  { s: '^IXIC', name: '納斯達克指數' },
  { s: '^GSPC', name: '標普500' },
];

function round(n, p = 2) {
  const f = Math.pow(10, p);
  return Math.round(n * f) / f;
}

async function fetchYahoo(sym) {
  const enc = encodeURIComponent(sym);
  const hosts = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];
  for (const host of hosts) {
    try {
      const url = `https://${host}/v8/finance/chart/${enc}?interval=1d&range=1d`;
      const r = await fetch(url);
      if (!r.ok) continue;
      const j = await r.json();
      const meta = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
      if (meta && meta.regularMarketPrice != null) {
        const prev = meta.chartPreviousClose || meta.previousClose;
        const ch = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : null;
        return { price: meta.regularMarketPrice, ch: ch == null ? null : round(ch) };
      }
    } catch (e) { /* try next */ }
  }
  return null;
}

async function fetchViaProxy(sym) {
  const inner = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d`;
  try {
    const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(inner)}`);
    if (!r.ok) return null;
    const j = await r.json();
    const parsed = JSON.parse(j.contents);
    const meta = parsed && parsed.chart && parsed.chart.result && parsed.chart.result[0] && parsed.chart.result[0].meta;
    if (meta && meta.regularMarketPrice != null) {
      const prev = meta.chartPreviousClose || meta.previousClose;
      const ch = prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : null;
      return { price: meta.regularMarketPrice, ch: ch == null ? null : round(ch) };
    }
  } catch (e) { /* ignore */ }
  return null;
}

(async () => {
  const list = [];
  for (const idx of INDICES) {
    let data = await fetchYahoo(idx.s);
    if (!data) data = await fetchViaProxy(idx.s);
    list.push({ s: idx.s, name: idx.name, price: data ? data.price : null, ch: data ? data.ch : null });
  }
  const out = { ts: Date.now(), list };
  fs.writeFileSync('indices.json', JSON.stringify(out, null, 2));
  console.log('Wrote indices.json:', JSON.stringify(out));
})();
