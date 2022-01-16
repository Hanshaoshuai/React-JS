import { useState } from 'react';

const App = () => {
  const [text, setText] = useState('11');
  return <div>{text}</div>;
};
export default App;
