import {useEffect} from 'react';

function useESCPress(handler = () => {}) {
  const targetKeyCode = 27;
  // If pressed key is our target key then set to true
  function downHandler({keyCode}) {
    if (keyCode === targetKeyCode) {
      handler();
    }
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount
}

export default useESCPress;
