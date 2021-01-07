// Author: Dan Abramov
// Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import React from 'react';

function useInterval(callback, delay) {
    const savedCallback = React.useRef();

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function tick() {
        savedCallback.current();
        }

        if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
    }, [delay])
}


export default useInterval;