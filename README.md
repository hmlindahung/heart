# 心心｜個人品牌官網 V1

「從想法，到完成。」— 教育 × 社群 × AI × 視覺設計整合者

單頁式（One Page）品牌官網框架，純 HTML5 / CSS3 / Vanilla JS，無框架依賴，可直接部署至 GitHub Pages。

## 檔案結構

```
site/
├── index.html              # 主頁面（Nav + Hero + About + Services + Portfolio + Contact + Footer）
├── css/
│   └── style.css           # 視覺系統（色彩變數、排版、RWD、動畫）
├── js/
│   └── main.js             # 導覽互動、平滑捲動、滑動出現動畫、作品卡片生成
├── assets/
│   ├── images/
│   │   ├── logo-placeholder.svg
│   │   ├── portrait-placeholder.svg   # 找不到對應表情圖時的 fallback
│   │   └── portrait/                  # 放不同表情/手勢圖檔，見下方「人物形象」說明
│   └── icons/                # 保留：未來社群 / UI icon 素材
├── ai-lab/    .gitkeep      # 預留：AI Lab 專頁（V1 未啟用）
├── blog/      .gitkeep      # 預留：Blog 專頁（V1 未啟用）
└── case-study/.gitkeep      # 預留：Case Study 專頁（V1 未啟用）
```

## 目前狀態（V1）

- 已完成：版型、視覺層次、RWD（Desktop / Tablet / Mobile）、動畫（淡入、滑動出現、hover）
- 內容全為假文 / 假資料，包含 About 文字、12 個 Portfolio 卡片、Email/社群連結
- Logo 與人物形象圖為 SVG 佔位圖，路徑：`assets/images/logo-placeholder.svg`、`portrait-placeholder.svg`

## 人物形象（Brand Avatar）

人物照在 V1 是「點綴」，不是主視覺：Hero 右上角一顆小圓徽章、About 標題旁一顆更小的圓點綴、Contact 上方一顆置中點綴，尺寸都在 56–108px 之間，不佔版面主格。

不同區塊可以放不同表情/手勢的圖，靠 `js/main.js` 開頭的 `PORTRAIT_MOODS` 對照表控制：

```js
var PORTRAIT_MOODS = {
  greeting: 'assets/images/portrait/portrait-greeting.png', // Hero：打招呼
  explain:  'assets/images/portrait/portrait-explain.png',  // About：說明手勢
  wave:     'assets/images/portrait/portrait-wave.png'      // Contact：揮手道別
};
```

把對應檔案放進 `assets/images/portrait/` 資料夾、檔名對上即可自動套用；還沒放檔案前，會自動 fallback 顯示 `portrait-placeholder.svg`，不會破版。要新增區塊點綴，就在 HTML 加一個 `<figure class="brand-avatar" data-mood="xxx">` 並在對照表補上對應 key。

## 替換正式素材

1. 將正式 Logo 檔案覆蓋 `assets/images/logo-placeholder.svg`（建議另存新檔名並更新 `index.html` 中兩處 `<img>` 的 `src`：導覽列與 Footer）
2. 人物形象依上方「人物形象」段落放入 `assets/images/portrait/` 對應檔名
3. Portfolio 12 組卡片資料在 `js/main.js` 的 `placeholderData` 陣列中，替換 `name`／`category`，並可將 `thumb.style.background` 改為 `thumb.style.backgroundImage`
4. Contact 區塊的 Email／Facebook／Instagram／Threads 連結在 `index.html` `#contact` 區塊中，替換 `href`
5. Services 三張卡片內容取自報價單「教育品牌內容轉譯員」的服務分類，價格尚未上架；要上價格時直接在對應 `<p class="card__desc">` 下方加一行即可

## 部署到 GitHub Pages

1. 將 `site/` 資料夾內容（不含此 README）推送至 GitHub repo 根目錄，或推送整個 repo 並設定 GitHub Pages 來源為 `/site` 資料夾
2. GitHub repo → Settings → Pages → Source 選擇對應分支與資料夾
3. 儲存後約 1–2 分鐘生效，網址為 `https://<username>.github.io/<repo>/`
4. 若使用自訂網域，於 `site/` 根目錄新增 `CNAME` 檔案（內容為網域名稱），並在網域註冊商設定 DNS 指向 GitHub Pages

## 未來擴充架構（V1 尚未實作）

程式碼中已預留以下擴充點，實作時不需重構現有架構：

- **AI Lab**：`ai-lab/` 資料夾已建立，可新增獨立頁面並在導覽列加入連結
- **Blog**：`blog/` 資料夾已建立，同上
- **Case Study**：`case-study/` 資料夾已建立，適合放深度作品案例頁
- **SEO**：`index.html` `<head>` 內已註解預留 Open Graph meta 標籤位置
- **Google Analytics**：`index.html` `<head>` 內已註解預留 gtag 腳本位置
- **自訂網域**：見上方部署說明的 CNAME 設定

## 技術備註

- 無外部框架，僅使用 Google Fonts（Noto Sans TC + Poppins）
- 動畫使用 CSS transition + IntersectionObserver，效能輕量
- 已加入 `prefers-reduced-motion` 支援，尊重使用者的動態效果偏好
- 色彩系統以 CSS variable 定義於 `style.css` 頂部 `:root`，調整品牌色只需改一處
