import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./features/counter/Counter";

function App() {
    const [count, setCount] = useState(0);

    return (
        <main className="min-h-screen">
            <Counter />
        </main>
    );
}

export default App;
