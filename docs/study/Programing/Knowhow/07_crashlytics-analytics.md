---
tags: [TypeScript, Mobile, React, SaaS]
---
# Firebase のサービスを使う

## なぜ書いているか

Android アプリ開発に伴い、使用状況や crash 状況のログが取りたい場面があった。Web と同じように datadog でのログ収集が困難なため、このサービスを使い収集することにした。これらのサービスの使い方についてまとめておく。

## Firebase crashlytics の使い方

### 概要

[こちら](https://firebase.google.com/docs/crashlytics/get-started?hl=ja&_gl=1*5itz63*_up*MQ..*_ga*MTQyODQwMDA3LjE3MzkyMzM0Mjg.*_ga_CW55HF8NVT*MTczOTIzMzQyOC4xLjAuMTczOTIzMzQyOC4wLjAuMA..&platform=android)を参考

### 手順

1. 始める前に、[こちら](https://firebase.google.com/docs/android/setup?hl=ja&_gl=1*7k1d34*_up*MQ..*_ga*MTQyODQwMDA3LjE3MzkyMzM0Mjg.*_ga_CW55HF8NVT*MTczOTIzMzQyOC4xLjAuMTczOTIzMzQyOC4wLjAuMA..)を行っていなければ先に行う。
   1. ここでは Firebase コンソールに該当のアプリの登録を行う。パッケージ名は`com.XXX.XXX`のようなものでアプリで一意となる。
   2. 登録後、`google-services.json`が取得できるので、こちらをモジュールルートディレクトリに配置。`/android/app/`配下
   3. 上記ページの後続作業を進める。`/android/app/`配下の`build.gradle`に記載。

:::info build.gradle について

`build.gradle`は配置場所によって役割が異なる。`/android/`配下はすべてのサブプロジェクトと、モジュールに共通する設定を記載。`/android/app/`配下はサブプロジェクトごとに必要な依存関係などを記載。

:::

2. [こちら](https://firebase.google.com/docs/crashlytics/get-started?hl=ja&_gl=1*5itz63*_up*MQ..*_ga*MTQyODQwMDA3LjE3MzkyMzM0Mjg.*_ga_CW55HF8NVT*MTczOTIzMzQyOC4xLjAuMTczOTIzMzQyOC4wLjAuMA..&platform=android)を実行。記載場所は`/android/app/`配下の`build.gradle`(1 と同じ)
3. 以後適当に crash させてイベントを確認する。リアルタイムで確認できる。
4. 以下 react-native での実装例

```ts title="firebaseCrashlytics.ts"
import crashlytics from "@react-native-firebase/crashlytics";

import { LogLevel } from "./Logger";
import { Transport } from "./Transport";

/**
 * Firebase Crashlyticsに出力するトランスポートです。
 */
class FirebaseCrashlyticsTransport implements Transport {
  /**
   * Firebase Crashlyticsにログ出力します。
   * @param level ログレベル
   * @param message 出力するメッセージ
   * @param errorCode エラーコード
   * @see {@link https://rnfirebase.io/crashlytics/usage#usage}
   * @see {@link FirebaseCrashlyticsTypes.Module.recordError}
   */
  log(level: LogLevel, message: string, errorCode?: string) {
    // FirebaseCrashlyticsTransportはエラーレベルのログしか出力しないため、errorCodeは必ず存在している想定
    crashlytics().recordError(new Error(message), errorCode);
  }

  /**
   * traceログは、Firebase Crashlyticsに出力しません。
   * @param message 出力するメッセージ
   */
  trace(message: string) {
    // nop
  }

  /**
   * debugログは、Firebase Crashlyticsに出力しません。
   * @param message 出力するメッセージ
   */
  debug(message: string) {
    // nop
  }

  /**
   * infoログは、Firebase Crashlyticsに出力しません。
   * @param message 出力するメッセージ
   */
  info(message: string) {
    // nop
  }

  /**
   * warnログは、Firebase Crashlyticsに出力しません。
   * @param message 出力するメッセージ
   */
  warn(message: string) {
    // nop
  }

  /**
   * Firebase Crashlyticsにerrorログを出力します。
   * @param message 出力するメッセージ
   * @param errorCode エラーコード
   */
  error(message: string, errorCode?: string) {
    this.log("error", message, errorCode);
  }
}

export { FirebaseCrashlyticsTransport };
```

<details>
<summary>Logger.ts</summary>

```ts title="Logger.ts"
import { ConsoleTransport } from "./ConsoleTransport";
import { SimpleLogFormatter } from "./SimpleLogFormatter";
import { Transport } from "./Transport";
import { isObject, isString } from "../type-guard";

/**
 * ロガーです。
 * ログレベルや、出力先をオプションで指定できます。
 */
class Logger {
  private level: number;
  private formatter: LogFormatter;
  private transports: Transport[];

  /**
   * ロガーのコンストラクタです。
   * @param options ロガーオプション
   */
  constructor(options?: LoggerOptions) {
    const mergedOptions = { ...DEFAULT_LOGGER_OPTIONS, ...options };
    this.level = LogLevelSet[mergedOptions.level];
    this.formatter = mergedOptions.formatter;
    this.transports = mergedOptions.transports;
  }

  /**
   * 指定されたログレベルが、ログ出力適用対象かを判定します。
   * @param level ログレベル
   */
  private isLevelEnabled(level: LogLevel): boolean {
    return this.level <= LogLevelSet[level];
  }

  /**
   * ログレベルを設定します。
   * @param level ログレベル
   * @returns ロガーインスタンス
   */
  setLevel(level: LogLevel): Logger {
    this.level = LogLevelSet[level];
    return this;
  }

  /**
   * traceレベルのログを出力します。
   * @param message ログメッセージ
   * @returns ロガーインスタンス
   */
  trace(message: string | LogMessageSupplier | object): Logger {
    if (this.isLevelEnabled("trace")) {
      const formatted = this.formatMessage("trace", message);
      this.transports.forEach((t) => t.trace(formatted));
    }
    return this;
  }

  /**
   * debugレベルのログを出力します。
   * @param message ログメッセージ
   * @returns ロガーインスタンス
   */
  debug(message: string | LogMessageSupplier | object): Logger {
    if (this.isLevelEnabled("debug")) {
      const formatted = this.formatMessage("debug", message);
      this.transports.forEach((t) => t.debug(formatted));
    }
    return this;
  }

  /**
   * infoレベルのログを出力します。
   * @param message ログメッセージ
   * @returns ロガーインスタンス
   */
  info(message: string | LogMessageSupplier | object): Logger {
    if (this.isLevelEnabled("info")) {
      const formatted = this.formatMessage("info", message);
      this.transports.forEach((t) => t.info(formatted));
    }
    return this;
  }

  /**
   * warnレベルのログを出力します。
   * @param message ログメッセージ
   * @returns ロガーインスタンス
   */
  warn(message: string | LogMessageSupplier | object): Logger {
    if (this.isLevelEnabled("warn")) {
      const formatted = this.formatMessage("warn", message);
      this.transports.forEach((t) => t.warn(formatted));
    }
    return this;
  }

  /**
   * errorレベルのログを出力します。
   * @param message ログメッセージ
   * @param errorCode エラーコード
   * @returns ロガーインスタンス
   */
  error(
    message: string | LogMessageSupplier | object | unknown,
    errorCode?: string
  ): Logger {
    if (this.isLevelEnabled("error")) {
      const formatted = this.formatMessage("error", message, errorCode);
      this.transports.forEach((t) => t.error(formatted, errorCode));
    }
    return this;
  }

  /**
   * LogFormatterを使用してメッセージをフォーマットします。
   * @param level ログレベル
   * @param message ログメッセージ
   * @param errorCode エラーコード
   * @returns メッセージ
   */
  formatMessage(
    level: LogLevel,
    message: string | LogMessageSupplier | object | unknown,
    errorCode?: string
  ) {
    if (isString(message)) {
      return this.formatter.format(level, message, errorCode);
    } else if (isObject(message)) {
      return this.formatter.format(level, JSON.stringify(message), errorCode);
    } else if (implementsLogMessageSupplier(message)) {
      return this.formatter.format(level, message(), errorCode);
    }
    // unknownが来た場合はパース可否が不明のため、固定文字列を表示する
    return this.formatter.format(level, "Unknown", errorCode);
  }
}

/**
 * ログレベルのセットです。
 */
const LogLevelSet = {
  trace: -1,
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};
type LogLevel = keyof typeof LogLevelSet;

/**
 * ログに出力するメッセージを取得するためのインターフェースです。
 */
interface LogMessageSupplier {
  (): string;
}

const implementsLogMessageSupplier = (arg: any): arg is LogMessageSupplier => {
  return arg !== null && typeof arg === "function";
};

/**
 * ログに出力するメッセージのフォーマッタです。
 */
interface LogFormatter {
  /**
   * メッセージをフォーマットします。
   * @param level ログレベル
   * @param message メッセージ
   * @param errorCode エラーコード
   * @returns フォーマット後のメッセージ
   */
  format(level: LogLevel, message: string, errorCode?: string): string;
}

/**
 * ロガーに設定できるオプションです。
 */
type LoggerOptions = {
  level?: LogLevel;
  formatter?: LogFormatter;
  transports?: Transport[];
};

/**
 * ロガーのデフォルトオプションです。
 */
const DEFAULT_LOGGER_OPTIONS: Required<LoggerOptions> = {
  level: "info",
  formatter: new SimpleLogFormatter(),
  transports: [new ConsoleTransport()],
};

/**
 * ロガーを生成します。
 * @param options ロガーオプション
 */
function createLogger(options?: LoggerOptions): Logger {
  return new Logger(options);
}

export type { LogLevel, LoggerOptions, LogMessageSupplier, LogFormatter };
export { Logger, createLogger, LogLevelSet };
```

</details>

<details>
<summary>Transport.ts</summary>

```ts title="Transport.ts"
import { LogLevel } from "./Logger";

interface Transport {
  log: TransportMethod;
  error: LeveledTransportMethodWithErrorCode;
  warn: LeveledTransportMethod;
  info: LeveledTransportMethod;
  debug: LeveledTransportMethod;
  trace: LeveledTransportMethod;
}

interface TransportMethod {
  (level: LogLevel, message: string, errorCode?: string): void;
}

interface LeveledTransportMethod {
  (message: string): void;
}

interface LeveledTransportMethodWithErrorCode {
  (message: string, errorCode?: string): void;
}

export type { Transport };
```

</details>

## Firebase analytics の使い方

### 概要

[こちら](https://firebase.google.com/docs/analytics?hl=ja&_gl=1*1sgg7lz*_up*MQ..*_ga*MTM5Mzg4MDI0MS4xNzM5MjM0ODI4*_ga_CW55HF8NVT*MTczOTIzNDgyOC4xLjAuMTczOTIzNDgyOC4wLjAuMA..)、crashlytics とほぼ同じ。

### 手順

1. リポジトリ側の設定は crashlytics と同じなので、省略。概要から確認して自分でやること。crashlytics の設定と差分があるかもしれないので、各自確認。
2. 概要のリンクの通り行う。React Native で使用する場合も`@react-native-firebase/analytics`を使ってイベントを送信できる。取得できるイベントはデフォルトで定義されているものの他、自分でイベントをカスタマイズすることもできる。イベントのカスタムは以下のように行える。

```ts firebase.ts
import analytics from '@react-native-firebase/analytics';
import {log} from 'framework/logging';

import {AnalyticsEvent} from './types';

class FirebaseAnalyticsTracker {
  initialize() {
    return analytics()
      .getAppInstanceId()
      .then(appInstanceId => analytics().setDefaultEventParameters({appInstanceId}));
  }

  event({name, params}: AnalyticsEvent) {
    analytics()
      .logEvent(name, params)
      .catch(e => log.error(e));
  }

  sendDisplayEvent({param, index}: data): void {
      firebaseAnalyticsTracker.event({
        name: 'AppDisplay',
        params: {
          id: param.id,
          index: index.toString(), // 基本文字列に変換する。理由は後述。
        },
      });
    }
  }

  sendErrorLog(errorCode: number, errorMessage: string): void {
    firebaseAnalyticsTracker.event({
      name: 'AppDetectError',
      params: {
        errorCode: errorCode.toString(),　// 基本文字列に変換する。理由は後述。
        errorMessage,
      },
    });
  }

export const firebaseAnalyticsTracker = new FirebaseAnalyticsTracker();

```

3. コンソールのイベントタブで、自動で取得するパラメータを設定できる。ここに登録することで、イベントに定義したパラメータの取得が行える。ここでのプロパティ名はプログラムで定義しているプロパティと一致させる。

:::warning カスタム属性とカスタム指標
カスタム属性に定義する場合は`文字列`、カスタム指標に定義する場合は`数値`で設定すること。自身が使った際は、`数値`としてほしいデータはなかったため、`文字列`に変換してカスタム属性に定義した。
:::

### 動作確認

1. [参考ページ](https://firebase.google.com/docs/analytics/debugview?hl=ja#android)。以下コマンドで debug view からリアルタイムに確認できる。
   1. `adb shell setprop debug.firebase.analytics.app PACKAGE_NAME`
      1. 実行中は普通にボードにイベントが送信されないため注意。以後、ボードで確認したい場合、2 に記載の手順で debug を無効にすること。
   2. `adb shell setprop debug.firebase.analytics.app .none.`で無効になる。
2. 普通にボードで確認するには 24 時間程度かかるため、すぐには行えない。

## 参考

- https://firebase.google.com/docs/analytics?hl=ja
- https://firebase.google.com/docs/crashlytics?hl=ja
