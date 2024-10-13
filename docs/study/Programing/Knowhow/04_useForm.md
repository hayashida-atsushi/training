# React Hook FormのSubmitはいつ行われるのか

## なぜ書いているか

React Hook Formでsubmitのタイミングを工夫したかった。<br/>
具体的にはボタン押下でsubmitではなく、ボタン押下でダイアログを出して、submitにしたい。<br/>
この操作について大したことではないがまとめておくため。

## 方針

```<form>```タグに記載する```handleSubmit(onSubmit)```の場所をダイアログ内に持ってくる。

## 現状

通常のform、formタグの中でonSubmit属性にサブミット時の処理を渡す

```ts
const Hoge: React.FC = () => {
    ...省略
    const methods = useForm<HogeForm>();
    const {handleSubmit, control} = methods;

    ...省略
    // submitするときの処理を記載
    const onSubmit = () => {
        ...省略
    };

    return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
          ...省略
          <Button type="submit">サブミットボタン</Button>
          </form>
        </>
    )
}
```

## やりたいことを踏まえて

```ts
const Hoge: React.FC = () => {
    ...省略
    const methods = useForm<HogeForm>();
    const {handleSubmit, control} = methods;

    // カスタムhook、ほぼReducerと同じ使い方
    const {state, dialogDisPatch} = useDialog();

    ...省略
    // submitするときの処理を記載
    const onSubmit = () => {
        ...省略
    };

    return (
        <>
        {/*submitをここでは行わないので、formタグからonSubmitを削除。*/}
          <form>
          ...省略
          {/*dialogの作成*/}
          <Button onClick={() => dialogDisPatch(CREATE_DIALOG)}>ダイアログ表示ボタン</Button>
          </form>
        </>
    )
}
const HogeDialog: () => {

// ここでも呼び出す
        const methods = useForm<HogeForm>();
        const {handleSubmit, control} = methods;
        return(
            <>
            ...省略
            <Button type="submit" onClick={} />
            </>
        ) 
}

```