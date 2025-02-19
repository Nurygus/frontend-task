import "./App.css";
import Loading from "./components/loading";
import ViewerComponent from "./components/viewer-component";
import HierarchyComponent from "./components/hierarchy";

function App() {
  return (
    <>
      <ViewerComponent>
        <Loading />
        <HierarchyComponent />
      </ViewerComponent>
    </>
  );
}

export default App;
