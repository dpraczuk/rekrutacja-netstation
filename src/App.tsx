import { Navigation } from "./components/Navigation/Navigation";
import { TagsProvider } from "./stores/TagsContext";

function App() {
  return (
    <TagsProvider>
      <Navigation />
    </TagsProvider>
  );
}

export default App;
