import { React, useState } from 'react'

const Counter = () => {

    const [count, setCount] = useState(0);

    const addValue = () => {
        setCount(count + 1);
    }
    return (
        <>
            <h2>Counter: {count}</h2>
            <button
                onClick={addValue}
            >Increase Count</button>
        </>
    );
};

export default Counter;
