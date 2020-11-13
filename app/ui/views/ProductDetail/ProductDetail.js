import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';
import {List, Checkbox, TextInput, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import {ProductContext} from '../../providers/ProductProvider';
import {CartContext} from '../../providers/CartProvider';
import {cartAddProduct} from '../../../data/actions/CartActions';
import {productSelect} from '../../../data/actions/ProductActions';

const NoteImput = styled(TextInput)`
  margin: 16px;
`;

const ButtonAdd = styled(Button)`
  margin: 16px;
`;

export default function ProductDetail() {
  const [{selectedProduct}, productDispatch] = useContext(ProductContext);
  const [, cartDispatch] = useContext(CartContext);
  const [selectedOptions, setSelectedOption] = useState([]);
  const [note, setNote] = useState('');

  function sendToCart() {
    const {id, name, price} = selectedProduct;
    cartDispatch(
      cartAddProduct({
        product: {id, name, price},
        note,
        selectedOptions,
      }),
    );
    back();
  }

  function isOptionSelected(option) {
    return selectedOptions.includes(option);
  }

  function toggleOption(option) {
    let newOptionsList;
    if (isOptionSelected(option)) {
      newOptionsList = selectedOptions.filter((item) => item !== option);
    } else {
      newOptionsList = [...selectedOptions, option];
    }
    setSelectedOption(newOptionsList);
  }

  function back() {
    productDispatch(productSelect(null));
  }

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Opções</List.Subheader>
        {selectedProduct.options.map((option) => (
          <List.Item
            key={option}
            title={option}
            right={(props) => (
              <Checkbox
                {...props}
                status={isOptionSelected(option) ? 'checked' : 'unchecked'}
                onPress={() => toggleOption(option)}
              />
            )}
          />
        ))}
      </List.Section>
      <NoteImput
        label={'Observação'}
        value={note}
        mode={'outlined'}
        multiline={true}
        onChangeText={setNote}
      />
      <ButtonAdd mode={'contained'} onPress={sendToCart}>
        Adicionar ou Carrinho
      </ButtonAdd>
    </ScrollView>
  );
}
