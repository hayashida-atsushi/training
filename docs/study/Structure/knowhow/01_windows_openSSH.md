# Windows で OpenSSH を使う場合の注意点

## なぜ書くか

RSA 使う上で、理解が浅くはまったため。

## Windows で公開鍵認証を行う

基本的に Windows で ssh を使用する場合は、OpenSSH を有効化することで使用することができる。<br/>
そもそも RSA 認証を行う場合は、サーバー側に公開鍵を、クライアント側に秘密鍵を置く必要がある。<br/>
このキーペアの作成は`ssh-keygen -b 4096 -t rsa -C "コメント"`で作成できる。`.pub`が公開鍵である。<br/>
サーバー側が Linux の場合は管理者、通常のユーザー問わず、`~/.ssh/authorized_keys`に`.pub`の内容を追記すればよいが、Windows だとそうはいかなかった。<br/>

Windows では`sshd_config`に記載のように、管理者アカウントの鍵は`C:\Program Data\ssh\administrators_authorized_keys`に登録する必要がある。

## 参考

- [Windows の openSSH の公開鍵を管理者アカウントで登録するときの注意点](https://zenn.dev/ohashi_reon/articles/4c0ccf6d64ed07)
