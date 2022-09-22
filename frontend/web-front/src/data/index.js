// 問題
export const questions = [
  { "question": "聞くよりも話すほうが好きだ", "select-type": 2, "pos": "X" },
  { "question": "自分はせっかちなほうだ", "select-type": 2, "pos": "X" },
  { "question": "人をまとめるのが得意だ", "select-type": 2, "pos": "X" },
  { "question": "相手の目を見て話すほうだ", "select-type": 2, "pos": "X" },
  { "question": "人を動かすことができる", "select-type": 2, "pos": "X" },
  { "question": "思ったことがすぐ口から出てしまうほうだ", "select-type": 2, "pos": "X" },
  { "question": "組体操より、かけっこが好きだ", "select-type": 2, "pos": "X" },
  { "question": "他人と話すのが好きだ", "select-type": 2, "pos": "X" },
  { "question": "話し合いでは、みんなの意見を尊重するより自分の意見を主張するほうだ", "select-type": 2, "pos": "X" },
  { "question": "自分は感情豊かだ", "select-type": 2, "pos": "Y" },
  { "question": "「元気だね」とよく言われる", "select-type": 2, "pos": "Y" },
  { "question": "仕事よりプライベートを大切にしたい", "select-type": 2, "pos": "Y" },
  { "question": "自分はクールだと言われない", "select-type": 2, "pos": "Y" },
  { "question": "自分の気持ちを表すのが得意だ", "select-type": 2, "pos": "Y" },
  { "question": "自分は陽気な方だと思う", "select-type": 2, "pos": "Y" },
  { "question": "データより人の意見を信じるほうだ", "select-type": 2, "pos": "Y" },
  { "question": "自分は感情豊かで涙もろいほうだと思う。", "select-type": 2, "pos": "Y" },
  { "question": "会話では、抑揚をつけて話すほうだ", "select-type": 2, "pos": "Y" },
];


// 結果
export const style_result = {
  // [ x軸, y軸]
  x: 70,
  y: 60,
  // socialstyle
  style: "ドライバー",
  // 特徴
  feature: [
    {
      id: 1, character: "感情は出さないがメリハリがあり強い話し方をする"
    },
    { id: 2, character: "しっかり目を合わせて話す" },
    { id: 3, character: "短めの文章で、結論からハッキリと断定的に話す" }
  ],
  // 仕事
  work: [
    { id: 1, job: "営業" },
    { id: 2, job: "弁護士" },
    { id: 3, job: "コンサルタント" }
  ],
}

