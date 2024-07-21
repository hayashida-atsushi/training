# useFieldArrayとuseFormContextの相性問題

## 前提

画面上でカードの選択、解除が行えるFormがある。そのカードの内部には数字を入力できるformがさらに存在するものがある。<br/>
このカードの情報はAPIから取得され、画面読み込み時に表示される枚数から、枚数自体の変更はされない。(選択、解除、数字の入力のみが可変。数字の入力は選択状態のみ可能)<br/>
次の画面に遷移する際に別のAPIを呼び出し、選択したカードの情報を渡している。

## 事象

最後のAPIを呼び出す際に、カードの選択、解除順によってはリクエストの型エラーが発生する。<br/>
一例としては選択した順とは逆に解除しないと発生した。<br/>
より具体的内容としては、リクエストのオブジェクトの内の一つのプロパティのみを持つオブジェクトが作成されてしまっており、
それが原因で型エラーに引っかかっている。

## 原因

### 直接の原因

カードオブジェクトに数字を入力できるformを紐づける(マウント)する際、存在しないカードオブジェクトに紐づけてしまっていた。

```ts
return checked ? (
    <NumberField
      {...registerForMUI(
        register(`hogeOptions.${hogeIndexInForm}.numberOfFactor`, {
          shouldUnregister: true,
          valueAsNumber: true,
        }),
      )}
      {...commonProps}
    />
  ) : (
    <NumberField {...commonProps} />
  );
};
```
```hogeIndexInForm```がカードのindexを示しているが、正しいindexをとれてきていなかった。

### さらに見る

じゃあ```hogeIndexInForm```はどうやって取得しているのか。

```ts
 const {
    formState: {isSubmitted},
    control,
    trigger,
  } = useFormContext<HogeOptionForm>();
  const fieldArray = useFieldArray({
    name: 'hogeOptions',
    control,
  });
  const {fields, append, remove} = fieldArray;

  // ほげIDに紐づくフォームのindex（なければ-1になる）
  const [hogeIndexInForm, checked] = useMemo(() => {
    const index = fields.findIndex((field) => field.hogeId === hogeId);
    return [index, index > -1];
  }, [fields, hogeId]);

  const handleClick = useCallback(() => {
    if (checked) {
      // フォームから除く
      const filterIndexes = fields.flatMap((field, index) => (field.hogeId === hogeId ? index : []));
      remove(filterIndexes);
    } else if (!checked) {
      // フォームに追加する
      append({
        hogeId,
        hogeName,
      });
      if (isSubmitted) void trigger();
    }
  }, [append, checked, fields, isSubmitted, remove, hogeId, trigger]);
```

ここで[useFieldsArray](https://react-hook-form.com/docs/usefieldarray)による```fields```からindex取得していることがわかる。<br/>
(そもそも可変フォームではないのに何でuseFieldsArray使ってるんだというのは一旦おいておく。)<br/>
この実装を見ると、```fields```が変化すると```hogeIndexInForm```も変化しそうである。
だがconsoleとかで確認すると、きちんと更新されていないっぽい。<br/>

**次にオブジェクトのプロパティに、不要なオブジェクトが追加されているタイミングについて調査した。**<br/>

これは、```remove()```が呼ばれたすぐ後だった。<br/>
もう少し正確に書くと、```remove()```が実行後に、選択状態にあるカードの内、カード内部にformを持つオブジェクトがある場合に実行されているようだ。<br/>
したがって、```remove()```実行後```fields```の更新をとらえられず、```hogeIndexInForm```が存在しないindex(=FormContextでは更新されて消えてしまっているindex)を保持し続けてしまうのが問題になっていそうだ。

### なぜ更新がとらえられないのか

どうやらuseFieldsArrayでは最新の値をとってくるには、```watch()```または```useWatch()```を使った明示的な処理が必要っぽい。<br/>
[react-hook-formの関連のissue](https://github.com/react-hook-form/react-hook-form/issues/10335#issuecomment-1521588280)

## 修正方針

以下の3つの方針に沿って修正

* そもそもuseFieldsArray必要がないので、使わない方針に変更。
* FormContextに値が渡ればよいので、```setValues()```を使用して、それぞれのカードが選択中なのかそうでないのかを管理する実装にした。
* ```watch()```で必要な値を監視し、最新の値をとってこれるようにする。

```ts
const {
    formState: {isSubmitted},
    trigger,
    watch,
    setValue,
    getValues,
  } = useFormContext<HogeOptionForm>();

  const formKeyChecked = `hogeOptions.${index}.checked` as const;
  const checked = watch(formKeyChecked);

  const handleClick = useCallback(() => {
    setValue(formKeyChecked, !checked);
    if (isSubmitted) void trigger();
  }, [checked, formKeyChecked, isSubmitted, setValue, trigger]);
```

## 修正前のコード

一部プロパティ名などを変更しています。
<details>
<summary>全文を表示</summary>
```ts
const HogeReactForm: React.VFC<{
  hogeOption: Option;
  required?: boolean;
}> = ({hogeOption, required}) => {
  const {
    hogeId,
    hogeName,
  } = hogeOption;
  const {
    formState: {isSubmitted},
    control,
    trigger,
  } = useFormContext<HogeOptionForm>();
  const fieldArray = useFieldArray({
    name: 'hogeOptions',
    control,
  });
  const {fields, append, remove} = fieldArray;

  // ほげIDに紐づくフォームのindex（なければ-1になる）
  const [hogeIndexInForm, checked] = useMemo(() => {
    const index = fields.findIndex((field) => field.hogeId === hogeId);
    return [index, index > -1];
  }, [fields, hogeId]);

  const handleClick = useCallback(() => {
    if (checked) {
      // フォームから除く
      const filterIndexes = fields.flatMap((field, index) => (field.hogeId === hogeId ? index : []));
      remove(filterIndexes);
    } else if (!checked) {
      // フォームに追加する
      append({
        hogeId,
        hogeName,
      });
      if (isSubmitted) void trigger();
    }
  }, [append, checked, fields, isSubmitted,  remove, hogeId, trigger]);

  return (
    <HogeCheckBox
      hogeOption={hogeOption}
      checked={checked}
      onClick={required ? undefined : handleClick}
      card={
        (
          <Box p={1} width="100%">
            <HogeNumberTextField
             hogeIndexInForm={hogeIndexInForm}
             checked={checked}
            />
          </Box>
        )
      }
    />
  );
};

const HogeNumberTextField: React.VFC<{
  hogeIndexInForm: number;
  checked: boolean;
}> = ({hogeIndexInForm, checked}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext<HogeOptionForm>();

...省略

  const commonProps: Exclude<ComponentProps<typeof NumberField>, UseFormRegisterReturnForMUI> = {
    ...省略
  };

  return checked ? (
    <NumberField
      {...registerForMUI(
        register(`hogeOptions.${hogeIndexInFormIn}.numberOfFactor`, {
          shouldUnregister: true,
          valueAsNumber: true,
        }),
      )}
      {...commonProps}
    />
  ) : (
    <NumberField {...commonProps} />
  );
};
```
</details>

## 修正後のコード

一部プロパティ名などを変更しています。
<details>
<summary>全文を表示</summary>

```ts
const HogeReactForm: React.VFC<{
  hogeOption: Option;
  required?: boolean;
}> = ({hogeOption, required}) => {
  const {
    hogeId,
    hogeName,
  } = hogeOption;
  const {
    formState: {isSubmitted},
    trigger,
    watch,
    setValue,
    getValues,
  } = useFormContext<HogeOptionForm>();

  const formKeyChecked = `hogeOptions.${index}.checked` as const;
  const checked = watch(formKeyChecked);

  const handleClick = useCallback(() => {
    setValue(formKeyChecked, !checked);
    if (isSubmitted) void trigger();
  }, [checked, formKeyChecked, isSubmitted, setValue, trigger]);

  return (
    <HogeCheckBox
      hogeOption={hogeOption}
      checked={checked}
      onClick={required ? undefined : handleClick}
      card={
        (
          <Box p={1} width="100%">
            <HogeNumberTextField
             hogeIndexInForm={hogeIndexInForm}
             checked={checked}
            />
          </Box>
        )
      }
    />
  );
};

const HogeNumberTextField: React.VFC<{
  hogeIndexInForm: number;
  checked: boolean;
}> = ({hogeIndexInForm, checked}) => {
  const {
    register,
    formState: {errors, isSubmitted},
    trigger,
  } = useFormContext<HogeOptionForm>();

   ...省略
  const commonProps: Exclude<ComponentProps<typeof NumberField>, UseFormRegisterReturnForMUI> = {
   ...省略
  };

  useEffect(() => {
    if (isSubmitted) void trigger(`hogeOptions.${index}.numberOfFactor`);
  }, [checked, index, isSubmitted, trigger]);

  return checked ? (
    <NumberField
      {...registerForMUI(
        register(`hogeOptions.${index}.numberOfFactor`, {
          shouldUnregister: true,
          valueAsNumber: true,
        }),
      )}
      {...commonProps}
    />
  ) : (
    <NumberField {...commonProps} />
  );
};
```
</details>