// 計算用データ定義
const baseStaminaCost = { C:10, U:20, R:30, E:40, L:50 };
const coinTable = {
  C:[0,10,11,12,13,14],
  U:[0,16,20,24,28,32],
  R:[0,30,36,42,48,54],
  E:[0,48,56,64,72,80],
  L:[0,70,80,90,100,110],
};
const dropRateTable = {
  C:[0,0.01,0.02,0.03,0.04,0.06],
  U:[0,0.002,0.004,0.006,0.008,0.012],
  R:[0,0.004,0.008,0.012,0.016,0.024],
  E:[0,0.007,0.014,0.021,0.028,0.042],
  L:[0,0.01,0.02,0.03,0.04,0.06],
};
const avgDropCount = { C:1, U:20, R:30, E:40, L:50 };

// 計算関数
function calcExpected({ rarity, stage, stamina, exSum=0, discount=0 }) {
  const cost = baseStaminaCost[rarity] * (1 - discount/100);
  const runs = Math.floor(stamina / cost);
  const totalCoins = runs * coinTable[rarity][stage];
  const items = Math.floor(
    dropRateTable[rarity][stage] * (1 + exSum*0.01) * runs * avgDropCount[rarity]
  );
  return { runs, totalCoins, expectedItems: items };
}

// イベントバインド
document.getElementById('calcBtn').addEventListener('click', () => {
  const r = document.getElementById('rarity').value;
  const s = Number(document.getElementById('stage').value);
  const st = Number(document.getElementById('stamina').value);
  const ex = Number(document.getElementById('exSum').value) || 0;
  const d = Number(document.getElementById('discount').value);
  if (st <= 0) { alert('スタミナは1以上を入力してください'); return; }
  const { runs, totalCoins, expectedItems } = calcExpected({
    rarity: r, stage: s, stamina: st, exSum: ex, discount: d
  });
  const out = `
    <p>▶️ 周回可能数: ${runs} 回</p>
    <p>▶️ 獲得ガチャコイン合計: ${totalCoins} 枚</p>
    <p>▶️ 聖偽物 期待値: ${expectedItems} 個</p>
  `;
  document.getElementById('result').innerHTML = out;
});
