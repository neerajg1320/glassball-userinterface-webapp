import React, {useState, useCallback, useEffect} from 'react';

const useRefState = initialValue => {
    const [state, setState] = useState(initialValue)
    const stateRef = useRef(state)


    useEffect(
      () => { stateRef.current = state },
      [state]
    )
    return [state, stateRef, setState]
}

// Usage
// Ref: https://scastiel.dev/posts/2019-02-19-react-hooks-get-current-state-back-to-the-future/
const Counter = () => {
    const [counter, counterRef, setCounter] = useRefState(0)
    const onButtonClick = useCallback(() => setCounter(counter + 1), [counter])
  
    const onAlertButtonClick = useCallback(() => {
      setTimeout(() => {
        alert('Value: ' + counterRef.current)
      }, 5000)
    }, [])
  
    return (
      <div>
        <p>You clicked {counter} times.</p>
        <button onClick={onButtonClick}>Click me</button>
        <button onClick={onAlertButtonClick}>
          Show me the value in 5 seconds
        </button>
      </div>
    )
}