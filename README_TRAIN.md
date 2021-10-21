## 動画・学習データを提供してくださる人へ
### 準備（ライブラリDL）
0. ```git clone https://github.com/Yum-git/muscle_app.git```
1. ```cd muscle_app```
2. ```yarn install``` or ```npm install```
### データ提供方法
1. ```yarn start``` or ```npm start```
2. localhost:3000にアクセス
3. **Training**という文字列があるのでクリック
4. **START POSENETを押す**
5. 上（スクワットの立ち・腕立ての腕伸ばし状態）を取りたいときは**UPを押す**
6. 5秒後に撮影が開始され，そこから10秒間録画される
7. 下（スクワットの屈み・腕立ての腕押し状態）を取りたいときは**DOWNを押す**
8. 5秒後に撮影が開始され，そこから10秒間録画される
9. **DATASAVEを押す**とデータが入ったjsonがダウンロードできる
10. jsonをslackとかで送っていただければ嬉しいです

- 撮影されている時は **training**  されていない時は**not training**と表示されています

### Docker-composeで動かす際（実験中）
0. ```git clone https://github.com/Yum-git/muscle_app.git```
1. ```cd muscle_app```
2. ```docker-compose build```
3. ```docker-compose up -d```

### Option. データ学習方法
作成中...