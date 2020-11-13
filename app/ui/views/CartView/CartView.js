import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {SafeAreaView, ScrollView} from 'react-native';
import {Appbar, List, IconButton, Button, Snackbar} from 'react-native-paper';
import {NumberService} from '../../../data/services/NumberService';
import {CartContext} from '../../providers/CartProvider';
import styled from 'styled-components/native';
import {cartRemoveProduct, cartClear} from '../../../data/actions/CartActions';
import {ApiService} from '../../../data/services/ApiService';

const BtnAdicionar = styled(Button)`
  margin: 15px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
`;

export default function CartView(props) {
  const [{products}, cartDispatch] = useContext(CartContext);
  const [isMessageVisible, setMessageVisible] = useState(false);

  function removeFromCart(item) {
    cartDispatch(cartRemoveProduct(item));
  }

  function finish() {
    ApiService.post('pedidos', {pedido: products}).then(() =>
      setMessageVisible(true),
    );
    cartDispatch(cartClear());
  }

  function getTotal() {
    const value = products
      .map((item) => item.product.price)
      .reduce((previous, current) => previous + current, 0);
    return NumberService.currency(value);
  }

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title={'Carrinho'} />
      </Appbar.Header>
      <ScrollView>
        <List.Section>
          {products.map((item, index) => (
            <List.Item
              key={index}
              title={item.product.name}
              description={NumberService.currency(item.product.price)}
              right={() => (
                <IconButton
                  onPress={() => removeFromCart(item)}
                  icon={({size, color}) => (
                    <FontAwesomeIcon icon={faTimes} size={size} color={color} />
                  )}
                />
              )}
            />
          ))}
          {products.length !== 0 && (
            <BtnAdicionar mode={'contained'} onPress={finish}>
              Finalizar Compra ({getTotal()})
            </BtnAdicionar>
          )}
        </List.Section>
      </ScrollView>
      <Snackbar
        visible={isMessageVisible}
        onDismiss={() => setMessageVisible(false)}
        duration={3000}>
        Seu pedido foi enviado
      </Snackbar>
    </Container>
  );
}

// CartView
