# project-social-styles repo
このプロジェクトはreact、django、nginx、MySQLのコンテナを立ててることで開発環境を構築している。

## developブランチをpullすることで動作確認可能
アプリのデモ
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/79680980/228167164-540796d4-4b04-49b9-bc82-f2c76bff5340.gif)


## installation
上から順に実行

・各自のPCにdocker、docker-composeをインストール

### run server
social-stylesディレクトリにて実行

~~・M1チップのmacを使ってたらおそらくMySQLコンテナが走らないので、MySQLコンテナをbuild(M1以外のPCなら飛ばしてOK)~~

~~docker build --platform linux/amd64 ./mysql~~  
(2022/9/4追記:M1であっても上記作業は不要になりました。)  
・コンテナを立てる

```
docker-compose up -d
```

### create superuser

・django admin用のユーザ名、メールアドレス、パスワードを登録
```
docker-compose run --rm web-back sh -c "python manage.py createsuperuser"
```

## localhostについて

localhost:3000
 - react
localhost:8080/admin
 - django admin ページ (createsuperuserコマンドで作成したユーザ名とパスワードでログイン)
localhost:8080/api
 - django Rest framework　ページ



