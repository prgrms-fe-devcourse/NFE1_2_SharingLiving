import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/style.css';

import Layout from './components/layouts/Layout';
import LandingPage from './components/LandingPage';
import ProductWrite from './pages/ProductWrite';
import KnowledgeWrite from './pages/KnowledgeWrite';

const baseRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/product',
    element: <ProductWrite />
  },
  {
    path: '/knowledge',
    element: <KnowledgeWrite />
  }
]);

function App() {
  return (
    <>
      <Layout>
        <RouterProvider router={ baseRouter } />
      </Layout>
    </>
  );
}

export default App;