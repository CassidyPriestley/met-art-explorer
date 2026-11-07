import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

function Greeting({ name }: { name: string }) {
  return (
    <View>
      <Text>Welcome to the Met, {name}!</Text>
    </View>
  );
}

describe('Sample test', () => {
  it('renders the greeting with the given name', async () => {
    await render(<Greeting name="Cassidy" />);

    expect(screen.getByText('Welcome to the Met, Cassidy!')).toBeTruthy();
  });
});
