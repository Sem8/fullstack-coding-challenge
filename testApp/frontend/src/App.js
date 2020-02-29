// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome</h1>

//     </div>
//   );
// }

// export default App;

import React from 'react';
import Main from './components/Main';
import Navigate from './components/Navigate';

function App() {
  return (
    <div className='main-wrapper-app'>
      <div className='component-wrapper'>
        {localStorage.getItem('councilToken') ? <Navigate /> : <Main />}
      </div>
    </div>
  );
}

export default App;



