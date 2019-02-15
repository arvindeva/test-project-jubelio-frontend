// compare helper function to sort array by id.
export const compare = (a, b) => {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
};

export const formatMoney = amount => {
  var rupiah = '';
  var amountReversed = amount
    .toString()
    .split('')
    .reverse()
    .join('');
  for (var i = 0; i < amountReversed.length; i++)
    if (i % 3 === 0) rupiah += amountReversed.substr(i, 3) + '.';
  return (
    'Rp' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
};
