import styled from 'styled-components';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from '../components';
import { getStockOptions, getStockTable } from '../api';

const StyledApp = styled.div`
  // Your style here
`;
getStockOptions();
getStockTable({
  stockID: 2330,
  mock: true,
}).then((r) => {
  console.log(r.data.data);
});

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
