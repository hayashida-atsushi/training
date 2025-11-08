# IntelliJ × Continue × Bedrock × Claude Code で AI コーディング をやってみる

## なぜやるか

AWS 社が提供する Bedrock はフルマネージドかつサーバレスなサービスで導入が容易である。このため、IDE のプラグインとの組み合わせでセキュアで簡単にコーディングエージェントの機能を使用することができる。<br/>
VSCode では Cline をはじめとするエージェントの拡張機能が様々あるが、IntelliJ ではあまりなく、これらの設定に関するナレッジなども限られている。<br/>
ここではタイトルの構成の知見を整理し、今後の参考のためナレッジとして残しておく。

## できること

1. IntelliJ で画像 1 のような Chat, Agent などの機能を利用できる
2. IntelliJ で画像 2 のようなコード生成機能を利用できる
   ![画像1](../../../../static/img/imageAI.png)
   ![画像2](../../../../static/img/imageAI2.png)

### 未検証なこと

1. モデルによるコスト、質の比較
2. 特定の社内環境に向けた検証

## 事前に準備するもの

必要な設定があるので、それらは各自で用意する必要がある。これらの設定は省略する。<br/>
[参考](#参考)などを参照すること。

- AWS CLI
- IntelliJ
- Bedrock を利用できる AWS アカウント(適切な IAM policy が付与されている)

## 設定編

今回は Claude Code の推論プロファイルのモデルを使うための設定を記載する。

1. まず IntelliJ の Settings > Plugin から Continue を Install する。
2. `~/.continue/config.yaml`または IntelliJ の GUI から`config.yaml`を開いて、以下の設定を記載する。

```yaml title="config.yaml"
name: "Config"
version: "1"
models:
  - name: "Bedrock: Claude 4.5 Sonnet" # ここは表示名
    provider: bedrock # 今回はBedrockを使用するのでここは固定。
    model: jp.anthropic.claude-sonnet-4-5-20250929-v1:0 # modelのID、詳細は後述
    env:
      region: ap-northeast-1 # 使用するregion
      profile: default # awsのcredentialsに記載のprofile。使用するものを記載する。
    roles:
      - chat # chat機能を使いたい場合は記載。
      - edit # Agentでのコード編集や、IDEで開いているファイルに対して、コメントから生成させる(GithubCopilotのちょっと手間かかる版)場合は記載。
  - name: "Bedrock: Claude 4.0 Sonnet"
    provider: bedrock
    model: arn:aws:bedrock:ap-northeast-1:XXXXXX:inference-profile/apac.anthropic.claude-sonnet-4-20250514-v1:0
    env:
      region: ap-northeast-1
      profile: default
    roles:
      - chat
      - edit
      - apply
```

Bedrock を使用する場合の公式ドキュメントは[こちら](https://docs.continue.dev/customize/model-providers/top-level/bedrock#how-to-configure-amazon-bedrock-with-continue)を参照すること。<br/>
モデルは Bedrock の[推論プロファイルでサポートされているリージョンとモデル](https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/inference-profiles-support.html)または、
マネコン左のクロスリージョン推論から、使いたいモデルの推論プロファイル ID または推論プロファイル ARN を指定する(違いはリソースが一意かどうか)。<br/>
なお、Claude Code 4.5 系は基盤のモデル ID を直接指定して chat を実行することができなかった。上記の推論プロファイルを指定するとうまくできた。<br/>
![画像3](../../../../static/img/imageAI3.png)
![画像4](../../../../static/img/imageAI4.png)

3. 以上で準備完了

## 今後の展望

- 性能面、コストの調査
- コーディングだけでなく、AWS の他サービスとの連携を使って何かできないかなどの検討

## 参考

- [Amazon Bedrock のアイデンティティベースのポリシー例](https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/security_iam_id-based-policy-examples.html)
- [Continue](https://www.continue.dev/)
