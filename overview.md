# MyHub · 個人工作台（深色 Cyberpunk 版）

## 連結
- 即時預覽（本地）：`http://127.0.0.1:8765/`
- 資料夾：`MyHub/`

## 設計風格
深色 cyberpunk：近黑底（#05050d）+ 透視霓虹格仔背景 + 青色 #00f0ff 為主色，配洋紅 #ff2e88 點綴。標題、數字、按鈕、輸入框聚焦全部自帶發光效果。

## 4 個工具（功能與第一版相同）
1. **倉頡碼** — 貼中文字即查；2.9 萬字香港常用倉頡碼表（`cangjie-data.js`）
2. **繁簡轉換** — OpenCC CDN
3. **貨幣轉換** — 22 幣種，`open.er-api.com` 即時 + 6 小時 localStorage 快取 + 離線備援
4. **單位轉換** — 9 類別即時雙向

## 與初版差異（按你要求改）
1. **主 Logo**：用色彩突出度（藍 B 通道 vs 紅綠）做 mask，將原圖黑色背景全數透明化，再裁緊到藍色範圍並 pad 成 754×754 透明正方形。貼上深色 site 時直接透出底色，沒有黑框。
2. **背景改深色 + 去解釋文字**：全站改 dark cyberpunk；移除「歡迎來到 MyHub」、品牌下「個人小工具集」、每個工具卡片下嘅解釋段、每個工具頂部嘅描述句、底部 footer。
3. **主視覺只有「MyHub」**：首頁只留發光霓虹 wordmark（My 青色 / Hub 洋紅）+ 一條漸變細線。
4. **4 個工具 icon 重新設計（cyberpunk）**：
   - 倉頡：青色全息鍵盤 + 游標 caret + HUD 角框
   - 繁簡：青+洋紅循環箭頭 + 抽象字塊
   - 貨幣：螢光綠 $ 幣 + 軌道幣符 + 電路紋
   - 單位：紫+橙全息間尺 + 尺寸標註
   全部裁走右下「AI生成」水印，pad 成 1024×1024 深色 tile。
5. **整站 cyberpunk 化**：grid 透視背景、霓虹光暈、monospace 標題、霓虹按鈕（含 ghost 變體）、捲動發光下劃線、頂部 / 底部導航 active 態發光、貨幣結果用左邊 cyan 發光條 + 內發光。

## 檔案
- `index.html` — 主檔（內嵌全部 CSS/JS）
- `cangjie-data.js` — 29,669 個繁中字嘅倉頡碼
- `assets/logo.png` — 754×754 透明藍色 icon
- `assets/icon-cangjie.png`、`icon-convert.png`、`icon-currency.png`、`icon-unit.png` — 1024×1024 cyberpunk 深色 tile
- `assets/thumbnail.png` — 1216×773 Blade Runner 風格深色 banner（OG 圖）

## 相容性
- 手機：底部固定導航 + iPhone safe area
- 桌面 ≥768px：頂部 tabs
- 鍵盤可操作、focus 有 cyan 發光環

## 部署
之後可部署到 CloudStudio 拎 `app.workbuddy.link` 短鏈。
