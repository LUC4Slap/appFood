import numeral from 'numeral';
export const NumberService = {
  currency(value) {
    // const formatter = new Intl.NumberFormat('pt-BR', {
    //   style: 'currency',
    //   currency: 'BRL',
    // });
    // return formatter.format(value);
    return numeral(value).format('0.0[,]00');
  },
};
