# VOLTLAB – Web Application Studio

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. フォントファイルの配置

`public/fonts/` ディレクトリを作成し、以下のフォントファイルを配置してください。
各フォントは Google Fonts からダウンロードできます。

```
public/
└── fonts/
    ├── BebasNeue-Regular.woff2          # https://fonts.google.com/specimen/Bebas+Neue
    ├── PlusJakartaSans-Light.woff2      # https://fonts.google.com/specimen/Plus+Jakarta+Sans
    ├── PlusJakartaSans-Regular.woff2
    ├── PlusJakartaSans-Medium.woff2
    ├── PlusJakartaSans-SemiBold.woff2
    ├── PlusJakartaSans-Bold.woff2
    ├── SpaceMono-Regular.woff2          # https://fonts.google.com/specimen/Space+Mono
    └── SpaceMono-Bold.woff2
```

> フォントを配置しない場合はシステムフォントにフォールバックします。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開く。

### 4. 本番ビルド

```bash
npm run build
```

`dist/` フォルダにすべてのファイルが出力されます。

---

## ファイル構成

```
voltlab/
├── index.html                    # エントリーポイント
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── main.tsx                  # React マウント
    ├── App.tsx                   # ルートコンポーネント
    ├── data.ts                   # サービス・テキストデータ
    ├── hooks/
    │   └── useInView.ts          # スクロールアニメーション用フック
    ├── styles/
    │   ├── global.css            # グローバルスタイル・アニメーション
    │   └── fonts.css             # ローカルフォント定義
    └── components/
        ├── Nav.tsx               # ナビゲーション
        ├── Hero.tsx              # ヒーローセクション
        ├── TechMarquee.tsx       # テクノロジーマーキー
        ├── Services.tsx          # サービス紹介（メイン）
        ├── Process.tsx           # 開発フロー
        ├── Contact.tsx           # お問い合わせフォーム
        └── Footer.tsx            # フッター
```

## カスタマイズ

- **会社名・カラー**: `src/data.ts` と `src/styles/global.css` の CSS変数を変更
- **サービス内容**: `src/data.ts` の `SERVICES` 配列を編集
- **テキスト全般**: `src/data.ts` を編集
