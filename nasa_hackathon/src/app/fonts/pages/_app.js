// pages/_app.js
import '../styles/globals.css'; // Import your global CSS file
import { ParticlesContainer } from '../components/ParticlesContainer'; // Adjust the import path based on your project structure

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ParticlesContainer /> {/* This will render on every page */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;