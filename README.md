# electron-Windows-window
# electronのアプリのタイトルバーの色を変える。

## DEMO Image
https://github.com/Oya-Tomo/electron-Windows-window/issues/1#issue-972402515

## electron
　electronはアプリの中にブラウザー(chromium)が埋め込まれており、HTML・CSS・JSでデスクトップアプリを手軽にデザインできるフレームワークである。有名なコードエディターVisual Studio Codeもこのフレームワークによって開発されている。<br>
 そんな、electronですが．．．あれ？　タイトルバーの色を変えるAPIがないぞ？　Visual Studio Codeは黒いのにな～と思いながら調べていました。
 
## electronにはタイトルバーの色を変えるAPIが無い．．．
　ひたすらにWEBページをあさりましたが、無理や．．．<br>
 そんでどうしたかというと、フレームを消します。そして自分でボタンを作ります。ただし、DOM操作をできるのはrenderer.js(レンダラープロセス)、アプリの停止をできるのはmain.js(メインプロセス)なので、icpMain/ipcRendererで通信します。しかもpreload.jsを経由して．．．
 
## やっとできた。
　HTML・CSS・JSでボタンを配置・色を設定、ビルドして実行。ボタンがぼやけたり、preload.jsが読み込めなかったり、エラー沢山。やっとできました。
 ```css
#title_bar {
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
    background: "ここを変えると色が指定できる。";
}
```
 
## 苦労したポイント
　苦労したポイントは、ipcMain/ipcRendererの通信．．．ではなく、環境構築です。もともとは「electron .」で動かしていましたが、ここで呼び出していたelectronは実はグローバル環境のelectronでした。しかも、そのバージョンが古いせいでelectron-storeが使えませんでした。そしてアップデートしようとすると今度はそこでエラーを吐き大変でした。しかし、なんとかアップデートしelecctron-storeをrequireした時のエラーも消すことができました。よくやった、俺．．．
