import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { useState } from "react";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);
    const addedValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        dispatch(reset());
        setIncrementAmount(0);
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center space-y-6">
            <p className="text-7xl font-bold">{count}</p>
            <div className="space-x-4">
                <button
                    className="bg-slate-300 hover:bg-slate-400 border rounded-md px-3 py-1 text-3xl font-semibold"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                <button
                    className="bg-slate-300 hover:bg-slate-400 border rounded-md px-3 py-1 text-3xl font-semibold"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
            </div>

            <input
                type="text"
                className="p-4 text-7xl text-center w-56 border rounded-md mx-auto"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />

            <div className="space-x-4">
                <button
                    className="bg-slate-300 hover:bg-slate-400 border rounded-md px-3 py-1 text-3xl font-semibold"
                    onClick={() => dispatch(incrementByAmount(addedValue))}
                >
                    Add Amount
                </button>
                <button
                    className="bg-slate-300 hover:bg-slate-400 border rounded-md px-3 py-1 text-3xl font-semibold"
                    onClick={resetAll}
                >
                    Reset
                </button>
            </div>
        </section>
    );
};

export default Counter;
