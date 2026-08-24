import { Panel } from "./components/Panel";
import { Badge } from "./components/Badge";

function App() {
  return (
    <main>
      <h1>Lab 03 - React TypeScript</h1>

      <Panel title="Student Information">
        <p>Name: Johnalvin</p>
        <p>Course: Information Technology</p>
      </Panel>

      <Panel title="Appointment Status">
        <Badge tone="success">Confirmed</Badge>
      </Panel>

      <Panel title="Warning">
        <Badge tone="warning">Pending</Badge>
      </Panel>

      <Panel title="Error">
        <Badge tone="error">Cancelled</Badge>
      </Panel>
    </main>
  );
}

export default App;