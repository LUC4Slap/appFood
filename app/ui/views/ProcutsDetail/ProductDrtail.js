import React from 'react';
import {ScrollView} from 'react-native';
import {List, Checkbox, TextInput, Button} from 'react-native-paper';
import styled from 'styled-components/native';

const NoteImput = styled(TextInput)`
  margin: 16px;
`;

export default function ProcutsDetail() {
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Opções</List.Subheader>
        <List.Item
          title={'Mostarda'}
          right={(props) => (
            <Checkbox {...props} status={'checked'} onPress={() => {}} />
          )}
        />
      </List.Section>
      <NoteImput label={'Observação'} mode={'outlined'} multiline={true} />
      <Button mode={'contained'}>Adicionar ou Carrinho</Button>
    </ScrollView>
  );
}
