# useReducerを使ったContextの更新

## なぜ書いているか

状態管理のために新たにContextを実装する必要があった。<br/>
その状態をうまくContextに登録したり、引っ張ってきたりすることができなかったので、その原因分析と使い方についてまとめておくため。

## 前提

一覧画面ではステータスに応じたfilter機能を実装していた。また、一覧画面に表示されているコンテンツを選択すると詳細画面に遷移する。<br/>
ここに対して以下の条件に沿った状態管理を行いたい。<br/>

* 一覧画面でステータスに対するfilterを設定後詳細画面に遷移し、ブラウザバックまたは、パンくずリストの押下で一覧画面に戻ってきた際にfilterを維持したい。
* それ以外のルートで一覧画面を表示した際は(今回だとグローバルなサイドバーがあり、そこからも遷移できた。)、filterを解除したい。

現状はどのような遷移であってもfilterは解除される実装になっている。

## 現状の実装

ごく普通にstateで管理している。

```ts title="Component.tsx"
...省略
[selectedStatus, setSelectedStatus] = useState(initialStatus);
...省略
```

## Contextを作る前にReducerを理解する

このままだと遷移すると状態を維持できないので、とりあえずContextを作る。<br/>
Contextは親コンポーネントから子コンポーネントに情報を受け渡す際に、propsの受け渡しが不要でやり取りできる。(=コンポーネント外に情報をおいておける。)<br/>
今回はこの**コンポーネント外に情報をおいておける**特性を使う<br/>
Contextについて詳しくは、[Context(React公式)](https://ja.react.dev/learn/passing-data-deeply-with-context)、[createContext(React公式)](https://ja.react.dev/reference/react/createContext)、[useContext公式](https://ja.react.dev/reference/react/useContext#usecontext)を読んでください。
今回は状態管理が目的なので、Contextの内部で**Reducer**を使う。

### Reducerとは

reducerを使うことで、コンポーネント内部ではなく、外部にstateの更新ロジックを集約できる。<br/>
stateだけの実装だと複雑になってしまうことを防ぐ。<br/>
詳しくは、[Reducer(React公式)](https://ja.react.dev/learn/extracting-state-logic-into-a-reducer)

### useReducerとは

上記のReducerをComponentで使うためのReactフック。
基本は以下のような構成をとる。

```ts title='ExampleReducer.tsx'
import {useReducer} from 'react';

type ExampleState = {
    id: number;
    name: string;
};

// 初期値
const initialState: ExampleState = {
    id: 0,
    name: 'example',
};

// ここはアクションの種類(type)とその時行う操作に必要な情報を入れる引数の型(payload)を定義する。
type Action = 
   | {
    type: 'set'
    payload: ExampleState
     }
   | {
    type: 'reset'
   };

// stateの変更を定義した関数
function reducer(state: ExampleState, action: Action): ExampleState {
    // typeによって操作を変える。
    switch(action.type) {
        case 'set': {
            // 新しい値を返す(payloadでstateを更新して)
            return {...state, ...action.payload}
        }
        case 'reset': {
            // 初期値を返す(初期値でstateを更新して)
            return {...state, ...initialState}
        }
    }
}
// このコンポーネントでstateを管理
const ExampleComponent: React.FC = () => {
    // useReducerはstateとdispatch関数を返す。
    // そして、stateの変更を定義した関数(reducer)と初期値(initialState)を引数にもつ
    // stateは現在のstateを示し、dispatch関数の実行でstateを更新する。
    // dispatch関数の詳細は以下、
    const [state, dispatch] = useReducer(reducer, initialState)
    ...省略
}
```

#### dispatch関数を使って、stateを更新する

```ts title="Component.tsx"
// この処理が呼ばれるとコンポーネント内のstateが更新される。
const handleSetClick = () => {
    // typeを指定して、reducerのどの処理を行いたいかを指定する。
    // reducerに渡したい値をpayloadに指定する。
    dispatch({type: 'set', payload:{id: 3, name: 'さん'}})
};
```

詳しくは、[useReducer(React公式)](https://ja.react.dev/reference/react/useReducer)

## Contextを作って呼び出す

やることはほぼReducerのつくり方と同じ。<br/>
最後のComponentをProviderに変更して、Providerの間でContextが維持されるようにするだけ。

### Contextを定義

```ts title="Context.tsx"
import {useReducer} from 'react';

type ExampleState = {
    id: number;
    name: string;
};

const initialState: ExampleState = {
    id: 0,
    name: 'example',
};

type Action = 
   | {
    type: 'set'
    payload: ExampleState
     }
   | {
    type: 'reset'
   };

function reducer(state: ExampleState, action: Action): ExampleState {
    switch(action.type) {
        case 'set': {
            return {...state, ...action.payload}
        }
        case 'reset': {
            return {...state, ...initialState}
        }
    }
}

// カスタムフック(呼び出し側で簡潔に読むために定義)
export const usePagesContext = (): PagesContextType => useContext(PagesContext);

// Providerを定義
const ExampleProvider: React.FC = () => { 
    const [state, dispatch] = useReducer(reducer, initialState)
    return <PagesContext.Provider value={{state, dispatch}}>{children}</PagesContext.Provider>;
}

```

### Contextを呼び出す

普通に使うだけ<br/>
Provider(上の例だと```<ExampleProvider></ExampleProvider>```)内でContextは呼び出せるので、適宜Providerを定義する。

```ts title="Component.tsx"
const Component: React.FC = () => {
    // Contextの呼び出し
    const {state, dispatch} = usePagesContext();
    ...省略

    // 状態の更新例
    pagesDispatch({
      type: 'set',
      payload: {id: hoge.id, name: hoge.name},
    });
    pagesDispatch({
        type: 'reset'
    })
    ...省略
}
```
