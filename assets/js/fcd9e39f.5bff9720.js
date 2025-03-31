"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3446],{452:(r,n,e)=>{e.r(n),e.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var a=e(4848),t=e(8453);const s={tags:["TypeScript","Frontend"]},i="\u914d\u5217\u64cd\u4f5c(\u30d5\u30ed\u30f3\u30c8\u30a8\u30f3\u30c9)",l={id:"study/Programing/Knowhow/array",title:"\u914d\u5217\u64cd\u4f5c(\u30d5\u30ed\u30f3\u30c8\u30a8\u30f3\u30c9)",description:"\u306a\u305c\u66f8\u3044\u3066\u3044\u308b\u304b",source:"@site/docs/study/Programing/Knowhow/01_array.md",sourceDirName:"study/Programing/Knowhow",slug:"/study/Programing/Knowhow/array",permalink:"/training/docs/study/Programing/Knowhow/array",draft:!1,unlisted:!1,tags:[{label:"TypeScript",permalink:"/training/docs/tags/type-script"},{label:"Frontend",permalink:"/training/docs/tags/frontend"}],version:"current",lastUpdatedAt:1741844772e3,sidebarPosition:1,frontMatter:{tags:["TypeScript","Frontend"]},sidebar:"study",previous:{title:"\u6280\u8853\u30e1\u30e2",permalink:"/training/docs/category/\u6280\u8853\u30e1\u30e2"},next:{title:"useFieldArray\u3068useFormContext\u306e\u76f8\u6027\u554f\u984c",permalink:"/training/docs/study/Programing/Knowhow/useFieldArray"}},o={},d=[{value:"\u306a\u305c\u66f8\u3044\u3066\u3044\u308b\u304b",id:"\u306a\u305c\u66f8\u3044\u3066\u3044\u308b\u304b",level:2},{value:"\u914d\u5217\u30c7\u30fc\u30bf\u53d7\u3051\u53d6\u308a\u65b9",id:"\u914d\u5217\u30c7\u30fc\u30bf\u53d7\u3051\u53d6\u308a\u65b9",level:2},{value:"\u914d\u5217\u8981\u7d20\u306e\u6307\u5b9a\u306e\u4ed5\u65b9",id:"\u914d\u5217\u8981\u7d20\u306e\u6307\u5b9a\u306e\u4ed5\u65b9",level:2},{value:"\u914d\u5217\u306e\u64cd\u4f5c\u3092\u884c\u3046\u7d44\u307f\u8fbc\u307f\u95a2\u6570",id:"\u914d\u5217\u306e\u64cd\u4f5c\u3092\u884c\u3046\u7d44\u307f\u8fbc\u307f\u95a2\u6570",level:2},{value:"\u53c2\u8003",id:"\u53c2\u8003",level:2}];function c(r){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...r.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"\u914d\u5217\u64cd\u4f5c\u30d5\u30ed\u30f3\u30c8\u30a8\u30f3\u30c9",children:"\u914d\u5217\u64cd\u4f5c(\u30d5\u30ed\u30f3\u30c8\u30a8\u30f3\u30c9)"}),"\n",(0,a.jsx)(n.h2,{id:"\u306a\u305c\u66f8\u3044\u3066\u3044\u308b\u304b",children:"\u306a\u305c\u66f8\u3044\u3066\u3044\u308b\u304b"}),"\n",(0,a.jsxs)(n.p,{children:["\u30d0\u30c3\u30af\u30a8\u30f3\u30c9\u304b\u3089\u8fd4\u3063\u3066\u304f\u308b\u30c7\u30fc\u30bf\u306f\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u3067\u3042\u308b\u3053\u3068\u304c\u591a\u3044\u304c\u3001\u914d\u5217\u3067\u8fd4\u3063\u3066\u304f\u308b\u3053\u3068\u3082\u591a\u3044\u3002\u305d\u306e\u305f\u3081\u3001\u914d\u5217\u3092\u4f7f\u3044\u3053\u306a\u305b\u308b\u3088\u3046\u306b\u306a\u308b\u306e\u306f\u91cd\u8981\u3067\u3042\u308b\u3002",(0,a.jsx)("br",{}),"\r\n\u3053\u3053\u3067\u306f\u914d\u5217\u3067\u8fd4\u3063\u3066\u304d\u305f\u30c7\u30fc\u30bf\u3092\u81ea\u5206\u306e\u4f7f\u3044\u305f\u3044\u5f62\u306b\u6574\u5f62\u3059\u308b\u305f\u3081\u306e\u4f8b\u3092\u7d39\u4ecb\u3059\u308b\u3002"]}),"\n",(0,a.jsx)(n.h2,{id:"\u914d\u5217\u30c7\u30fc\u30bf\u53d7\u3051\u53d6\u308a\u65b9",children:"\u914d\u5217\u30c7\u30fc\u30bf\u53d7\u3051\u53d6\u308a\u65b9"}),"\n",(0,a.jsx)(n.p,{children:"\u914d\u5217\u306e\u53d7\u3051\u53d6\u308a\u65b9\u306f\u305d\u306e\u307e\u307e\u914d\u5217\u3068\u3057\u3066\u53d7\u3051\u53d6\u308b\u65b9\u6cd5\u3068\u3001\u8981\u7d20\u3092\u5909\u6570\u306b\u5165\u308c\u308b\u65b9\u6cd5(\u5206\u5272\u4ee3\u5165)\u304c\u3042\u308a\u307e\u3059\u3002\u4ee5\u4e0b\u306f\u305d\u308c\u305e\u308c\u306e\u4f8b\u3067\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:'const array: string[] = ["apple", "orange", "grape"];\r\n\r\n// \u4ee3\u5165\r\nconst arr = array; // ["apple", "orange", "grape"]\r\n\r\n// \u5206\u5272\u4ee3\u51651\r\nconst [fruit1, fruit2, fruit3] = array; // "apple", "orange", "grape"\r\n\r\n//\u5206\u5272\u4ee3\u51652\r\nconst [fruit4, ...fruit] = array // "apple", ["orange", "grape"]\r\n\n'})}),"\n",(0,a.jsx)(n.h2,{id:"\u914d\u5217\u8981\u7d20\u306e\u6307\u5b9a\u306e\u4ed5\u65b9",children:"\u914d\u5217\u8981\u7d20\u306e\u6307\u5b9a\u306e\u4ed5\u65b9"}),"\n",(0,a.jsx)(n.p,{children:"\u914d\u5217\u306e\u7279\u5b9a\u306e\u8981\u7d20\u3092\u6307\u5b9a\u3057\u3066\u53d6\u5f97\u3057\u305f\u3044\u5834\u5408\u3001\u69d8\u3005\u306a\u6307\u5b9a\u306e\u4ed5\u65b9\u304c\u3042\u308a\u307e\u3059\u3002\u72b6\u6cc1\u306b\u5fdc\u3058\u3066\u9069\u5207\u306a\u4f7f\u3044\u65b9\u3092\u9078\u3076\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:'const array: string[] = ["apple", "orange", "grape", "melon"];\r\n\r\n// index\u3092\u6307\u5b9a\u3057\u3066\u53d6\u5f971\r\nconst fruit1 = array[0]; // "apple"\r\n\r\n// index\u3092\u6307\u5b9a\u3057\u3066\u53d6\u5f972 (es2022\uff5e)\r\nconst fruit2 = array.at(1); // "orange"\r\n\r\n// \u6761\u4ef6\u306b\u4e00\u81f4\u3059\u308b\u3082\u306e\u3092\u53d6\u5f971(find)\r\nconst fruit3 = array.find((e) => e === "grape"); // "grape"\r\n\r\n// \u6761\u4ef6\u306b\u4e00\u81f4\u3059\u308b\u3082\u306e\u3092\u53d6\u5f972(filter)\r\nconst fruit4 = array.filter((e) => e === "melon"); // ["melon"]\r\n\n'})}),"\n",(0,a.jsxs)(n.admonition,{title:"find( )\u3068filter( )\u306e\u9055\u3044",type:"tip",children:[(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"#%E9%85%8D%E5%88%97%E3%81%AE%E6%93%8D%E4%BD%9C%E3%82%92%E8%A1%8C%E3%81%86%E7%B5%84%E3%81%BF%E8%BE%BC%E3%81%BF%E9%96%A2%E6%95%B0",children:"\u7d44\u307f\u8fbc\u307f\u95a2\u6570"}),"\u3068\u547c\u3070\u308c\u308b\u95a2\u6570\u3067\u3001\u6761\u4ef6\u304c\u4e00\u81f4\u3059\u308b\u3082\u306e\u3092\u8fd4\u3059find()\u3068filter()\u3067\u3059\u304c\u3001\u4f7f\u3044\u65b9\u304c\u7570\u306a\u308a\u307e\u3059\u3002"]}),(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{}),(0,a.jsx)(n.th,{children:"find( )"}),(0,a.jsx)(n.th,{children:"filter( )"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u8fd4\u3059\u3082\u306e"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u6761\u4ef6\u306b\u4e00\u81f4\u3057\u305f\u6700\u521d\u306e\u4e00\u3064"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u6761\u4ef6\u306b\u8a72\u5f53\u3059\u308b\u3082\u306e\u3059\u3079\u3066"})})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u8fd4\u3059\u5f62\u5f0f"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u5909\u6570"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u914d\u5217"})})]})]})]})]}),"\n",(0,a.jsx)(n.h2,{id:"\u914d\u5217\u306e\u64cd\u4f5c\u3092\u884c\u3046\u7d44\u307f\u8fbc\u307f\u95a2\u6570",children:"\u914d\u5217\u306e\u64cd\u4f5c\u3092\u884c\u3046\u7d44\u307f\u8fbc\u307f\u95a2\u6570"}),"\n",(0,a.jsx)(n.p,{children:"\u7d44\u307f\u8fbc\u307f\u95a2\u6570\u3068\u306f\u30c7\u30d5\u30a9\u30eb\u30c8\u3067\u7528\u610f\u3055\u308c\u3001\u81ea\u7531\u306b\u4f7f\u3046\u3053\u3068\u306e\u3067\u304d\u308b\u95a2\u6570\u3067\u3059\u3002\u914d\u5217\u306e\u64cd\u4f5c\u3092\u884c\u3046\u969b\u306b\u3088\u304f\u4f7f\u3046\u7d44\u307f\u8fbc\u307f\u95a2\u6570\u306b\u3064\u3044\u3066\u7d39\u4ecb\u3057\u307e\u3059\u3002"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:'const array: string[] = ["apple", "orange", "grape", "melon"];\r\nconst array2: string[][] = [["water", "wine"], ["whisky", "rice wine"]];\r\n\r\n// \u914d\u5217\u306b\u8981\u7d20\u3092\u8ffd\u52a0\u3059\u308b\r\n\r\n  // \u6700\u5f8c\u306b\u8ffd\u52a0\r\n  array.push("strawberry"); // ["apple", "orange", "grape", "melon", "strawberry"]\r\n  // \u6700\u521d\u306b\u8ffd\u52a0\r\n  array.unshift("strawberry"); // ["strawberry", "apple", "orange", "grape", "melon"]\r\n\r\n// \u914d\u5217\u306e\u8981\u7d20\u3092\u524a\u9664\u3059\u308b\r\n\r\n  // \u6700\u521d\u3092\u524a\u9664\r\n  array.shift(); // ["orange", "grape", "melon"]\r\n\r\n  //\u3000\u6700\u5f8c\u3092\u524a\u9664\r\n  array.pop();  // ["apple", "orange", "grape"]\r\n\r\n// \u914d\u5217\u306e\u8981\u7d20\u3092\u5909\u66f4\u3059\u308b\r\nconst newArray = array.splice(2,3,"orange","orange"); // ["orange", "orange"] \r\nconsole.log(array); // ["apple", "orange", "orange", "orange"] \r\n\r\n// \u914d\u5217\u306e\u8981\u7d20\u3059\u3079\u3066\u306b\u540c\u3058\u64cd\u4f5c\u3092\u3059\u308b1(map)\r\nconst newArray2 = array.map((e) => `${e}xxx`); // ["applexxx", "orangexxx", "grapexxx", "melonxxx"]\r\nconsole.log(array); // ["apple", "orange", "grape", "melon"]\r\n\r\n// \u914d\u5217\u306e\u8981\u7d20\u3059\u3079\u3066\u306b\u540c\u3058\u64cd\u4f5c\u3092\u3059\u308b2(forEach)\r\narray.forEach((e) => array.push(e)) // ["apple", "orange", "grape", "melon", "apple", "orange", "grape", "melon"]\r\n\r\n// \u914d\u5217\u306e\u5e73\u5766\u5316\u3092\u884c\u3046 (es2019\uff5e)\r\narray2.flatMap(e => e) // ["water", "wine", "whisky", "rice wine"] \r\n\n'})}),"\n",(0,a.jsxs)(n.admonition,{title:"\ud83d\udea7\u3000splice( )\u306e\u4f7f\u3044\u65b9",type:"info",children:[(0,a.jsx)(n.p,{children:"splice( )\u306f\u3067\u304d\u308b\u3053\u3068\u304c\u305f\u304f\u3055\u3093\u3042\u308a\u307e\u3059\u3002\u4e0a\u8a18\u3067\u306f\u8981\u7d20\u3092\u5909\u66f4\u3059\u308b\u4f8b\u3092\u6319\u3052\u307e\u3057\u305f\u304c\u3001\u524a\u9664\u3001\u8ffd\u52a0\u306a\u3069\u3082\u884c\u3048\u307e\u3059\u3002"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts"})})]}),"\n",(0,a.jsxs)(n.admonition,{title:"map( )\u3068forEach( )\u306e\u9055\u3044",type:"tip",children:[(0,a.jsx)(n.p,{children:"\u914d\u5217\u306e\u8981\u7d20\u306b\u5bfe\u3057\u3066\u3001\u305d\u308c\u305e\u308c\u5f15\u6570\u306e\u4e2d\u306e\u51e6\u7406\u3092\u884c\u3046\u3053\u3068\u304c\u3067\u304d\u308b\u70b9\u3068\u3001\u5143\u306e\u914d\u5217\u3092\u5909\u5316\u3055\u305b\u306a\u3044\u70b9\u306b\u95a2\u3057\u3066\u306f\u540c\u3058\u3067\u3059\u3002"}),(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{}),(0,a.jsx)(n.th,{children:"map( )"}),(0,a.jsx)(n.th,{children:"forEach( )"})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u623b\u308a\u5024"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u65b0\u3057\u3044\u914d\u5217"})}),(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:"\u306a\u3057(void)"})})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:"(\u53c2\u8003)\u5143\u306e\u914d\u5217"}),(0,a.jsx)(n.td,{children:"\u5909\u5316\u306a\u3057"}),(0,a.jsx)(n.td,{children:"\u5909\u5316\u306a\u3057"})]})]})]})]}),"\n",(0,a.jsxs)(n.admonition,{title:"\ud83d\udea7 flatMap(\u3000)\u306e\u4f7f\u3044\u65b9",type:"info",children:[(0,a.jsx)(n.p,{children:"flatMap( )\u306f\u3084\u3084\u3053\u3057\u3044\u3067\u3059\u304c\u4f7f\u3044\u3053\u306a\u305b\u308b\u3068\u4fbf\u5229\u3067\u3059\u3002"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts"})})]}),"\n",(0,a.jsx)(n.h2,{id:"\u53c2\u8003",children:"\u53c2\u8003"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array",children:"Array\u306e\u7d44\u307f\u8fbc\u307f\u95a2\u6570"})}),"\n"]})]})}function p(r={}){const{wrapper:n}={...(0,t.R)(),...r.components};return n?(0,a.jsx)(n,{...r,children:(0,a.jsx)(c,{...r})}):c(r)}},8453:(r,n,e)=>{e.d(n,{R:()=>i,x:()=>l});var a=e(6540);const t={},s=a.createContext(t);function i(r){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof r?r(n):{...n,...r}}),[n,r])}function l(r){let n;return n=r.disableParentContext?"function"==typeof r.components?r.components(t):r.components||t:i(r.components),a.createElement(s.Provider,{value:n},r.children)}}}]);