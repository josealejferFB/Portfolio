// Verificación de contraste WCAG 2.2 con la fórmula del Anexo D.
const hex = (h) => h.replace('#', '').match(/../g).map((v) => parseInt(v, 16));
const lum = (h) => {
  const [r, g, b] = hex(h).map((c) => c / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const blend = (fg, bg, alpha) => {
  const f = hex(fg); const b = hex(bg);
  return '#' + f.map((c, i) => Math.round(c * alpha + b[i] * (1 - alpha)).toString(16).padStart(2, '0')).join('');
};
const pairs = [
  ['verde / papel', '#215C50', '#FFFFFF', 4.5],
  ['verde / crema', '#215C50', '#FBF7F2', 4.5],
  ['verde-700 / papel', '#17453B', '#FFFFFF', 4.5],
  ['verde-700 / crema', '#17453B', '#FBF7F2', 4.5],
  ['verde-900 / coral', '#0E2F28', '#FF6D4D', 4.5],
  ['coral-700 / papel', '#CC3F1C', '#FFFFFF', 4.5],
  ['coral-700 / crema', '#CC3F1C', '#FBF7F2', 4.5],
  ['tinta / papel', '#141414', '#FFFFFF', 4.5],
  ['tinta / crema', '#141414', '#FBF7F2', 4.5],
  ['tinta / coral', '#141414', '#FF6D4D', 4.5],
  ['mute / papel', '#5C5C57', '#FFFFFF', 4.5],
  ['mute / crema', '#5C5C57', '#FBF7F2', 4.5],
  ['papel / verde', '#FFFFFF', '#215C50', 4.5],
  ['papel 72% / verde', blend('#FFFFFF', '#215C50', 0.72), '#215C50', 4.5],
  ['papel 74% / verde', blend('#FFFFFF', '#215C50', 0.74), '#215C50', 4.5],
  ['papel / verde-900', '#FFFFFF', '#0E2F28', 4.5],
  ['papel / coral-700 (disco)', '#FFFFFF', '#CC3F1C', 4.5],
  ['papel / coral-600 (solo gráfico)', '#FFFFFF', '#E8552F', 3],
];
let fail = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${r.toFixed(2).padStart(5)}  ${name}  (mín ${min})`);
}
console.log(`\n${pairs.length - fail}/${pairs.length} pares pasan.`);
