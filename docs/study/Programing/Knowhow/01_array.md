# 配列操作(フロントエンド)

## なぜ書いているか

バックエンドから返ってくるデータはオブジェクトであることが多いが、配列で返ってくることも多い。そのため、配列を使いこなせるようになるのは重要である。<br/>
ここでは配列で返ってきたデータを自分の使いたい形に整形するための例を紹介する。

## 配列データ受け取り方

配列の受け取り方はそのまま配列として受け取る方法と、要素を変数に入れる方法(分割代入)があります。以下はそれぞれの例です。

```ts
const array: string[] = ["apple", "orange", "grape"];

// 代入
const arr = array; // ["apple", "orange", "grape"]

// 分割代入1
const [fruit1, fruit2, fruit3] = array; // "apple", "orange", "grape"

//分割代入2
const [fruit4, ...fruit] = array // "apple", ["orange", "grape"]

```

## 配列要素の指定の仕方

配列の特定の要素を指定して取得したい場合、様々な指定の仕方があります。状況に応じて適切な使い方を選ぶ必要があります。

```ts
const array: string[] = ["apple", "orange", "grape", "melon"];

// indexを指定して取得1
const fruit1 = array[0]; // "apple"

// indexを指定して取得2 (es2022～)
const fruit2 = array.at(1); // "orange"

// 条件に一致するものを取得1(find)
const fruit3 = array.find((e) => e === "grape"); // "grape"

// 条件に一致するものを取得2(filter)
const fruit4 = array.filter((e) => e === "melon"); // ["melon"]

```

:::tip find( )とfilter( )の違い

[組み込み関数](#配列の操作を行う組み込み関数)と呼ばれる関数で、条件が一致するものを返すfind()とfilter()ですが、使い方が異なります。
| | find( ) | filter( ) |
| ---- | ---- | ---- |
| **返すもの** | **条件に一致した最初の一つ** | **条件に該当するものすべて** |
| **返す形式** | **変数** | **配列** |

:::

## 配列の操作を行う組み込み関数

組み込み関数とはデフォルトで用意され、自由に使うことのできる関数です。配列の操作を行う際によく使う組み込み関数について紹介します。

```ts
const array: string[] = ["apple", "orange", "grape", "melon"];
const array2: string[][] = [["water", "wine"], ["whisky", "rice wine"]];

// 配列に要素を追加する

  // 最後に追加
  array.push("strawberry"); // ["apple", "orange", "grape", "melon", "strawberry"]
  // 最初に追加
  array.unshift("strawberry"); // ["strawberry", "apple", "orange", "grape", "melon"]

// 配列の要素を削除する

  // 最初を削除
  array.shift(); // ["orange", "grape", "melon"]

  //　最後を削除
  array.pop();  // ["apple", "orange", "grape"]

// 配列の要素を変更する
const newArray = array.splice(2,3,"orange","orange"); // ["orange", "orange"] 
console.log(array); // ["apple", "orange", "orange", "orange"] 

// 配列の要素すべてに同じ操作をする1(map)
const newArray2 = array.map((e) => `${e}xxx`); // ["applexxx", "orangexxx", "grapexxx", "melonxxx"]
console.log(array); // ["apple", "orange", "grape", "melon"]

// 配列の要素すべてに同じ操作をする2(forEach)
array.forEach((e) => array.push(e)) // ["apple", "orange", "grape", "melon", "apple", "orange", "grape", "melon"]

// 配列の平坦化を行う (es2019～)
array2.flatMap(e => e) // ["water", "wine", "whisky", "rice wine"] 

```

:::info 🚧　splice( )の使い方
splice( )はできることがたくさんあります。上記では要素を変更する例を挙げましたが、削除、追加なども行えます。

```ts

```

:::

:::tip map( )とforEach( )の違い
配列の要素に対して、それぞれ引数の中の処理を行うことができる点と、元の配列を変化させない点に関しては同じです。

| | map( ) | forEach( ) |
| ---- | ---- | ---- |
| **戻り値** | **新しい配列** | **なし(void)** |
| (参考)元の配列 | 変化なし | 変化なし |

:::

:::info 🚧 flatMap(　)の使い方
flatMap( )はややこしいですが使いこなせると便利です。

```ts

```

:::

## 参考

* [Arrayの組み込み関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)