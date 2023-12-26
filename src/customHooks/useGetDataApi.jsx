import { useReducer, useEffect } from 'react';

const INITIAL_STATE = {
  products: [],
  error: false,
  loading: false,
};

function setDataReducer(state, action) {
  if (action.type === 'Loading') {
    return { ...state, loading: true, error: false };
  }
  if (action.type === 'setData') {
    return { ...state, loading: false, error: false, products: action.payload };
  }
  if (action.type === 'error') {
    return { ...state, loading: false, error: true, products: [] };
  }
  return state;
}

function useGetDataApi(URL) {
  const [state, dispatch] = useReducer(setDataReducer, INITIAL_STATE);

  useEffect(() => {
    async function getData() {
      try {
        dispatch({ type: 'Loading' });
        const res = await fetch(URL);
        const data = await res.json();
        if (data.error) {
          throw new Error('Error cargando datos');
        }
        dispatch({ type: 'setData', payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'error' });
      }
    }
    getData();
  }, [URL]);
  return state;
}

export default useGetDataApi;