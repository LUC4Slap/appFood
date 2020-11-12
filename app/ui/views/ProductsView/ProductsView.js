import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {Appbar, Card, Button, Paragraph} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {ApiService} from '../../../data/services/ApiService';
import {ProductContext} from '../../providers/ProductProvider';
import {
  productSelect,
  productsResponse,
} from '../../../data/actions/ProductActions';
import {NumberService} from '../../../data/services/NumberService';

const ViewContainer = styled.SafeAreaView`
  flex: 1;
`;

const ProductCard = styled(Card)`
  margin: 8px;
`;

export default function ProductsView(props) {
  const [{productList, selectdProduct}, productDispatch] = useContext(
    ProductContext,
  );

  useEffect(() => {
    ApiService.get('products').then((productList) => {
      productDispatch(productsResponse(productList));
    });
  }, []);

  function selectProduct(product) {
    console.log(selectdProduct);
    productDispatch(productSelect(product));
  }

  if (selectdProduct) {
    return (
      <ViewContainer>
        <Appbar.Header>
          <Appbar.Content title={selectdProduct.name} />
        </Appbar.Header>
        <ProductDatail />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      <Appbar.Header>
        <Appbar.Content title={'Produtos'} />
      </Appbar.Header>
      <ScrollView>
        {productList.map((item) => (
          <ProductCard key={item.id}>
            <Card.Cover
              source={{
                uri: item.picture,
              }}
            />
            <Card.Title
              title={item.name}
              right={(props) => (
                <Button onPress={() => selectProduct(item)}>Adicionar</Button>
              )}
            />
            <Card.Content>
              <Paragraph>R$ {NumberService.currency(item.price)}</Paragraph>
            </Card.Content>
          </ProductCard>
        ))}
      </ScrollView>
    </ViewContainer>
  );
}
