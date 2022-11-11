import './App.css';
import Container from "./components/container/container";
import { WeatherProvider } from "./context/WeatherContext"

function App() {



  return (
    <WeatherProvider>
      <Container />
    </WeatherProvider>
  );
}
export default App;
