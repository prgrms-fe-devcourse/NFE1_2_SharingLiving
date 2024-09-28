import './assets/css/style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Header />

      <LandingPage />

      <Footer />
      <Layout>
        <p>Hello World!</p>
      </Layout>
    </>
  );
}

export default App;