import { Layout } from "./components/layout";
import { RouteProvider } from "./components/route";
import { View } from "./pages/view";

export function App() {
  return (
    <RouteProvider>
      <Layout>
        <View />
      </Layout>
    </RouteProvider>
  );
}
