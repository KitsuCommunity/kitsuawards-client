import { useState } from 'react';
import { Provider } from 'urql';
import { client } from './apiConfig';
import { Judges } from './components/Judges';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Provider value={client}>
			<Judges />
		</Provider>
	);
}

export default App;
