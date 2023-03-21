import { createContext, useContext, useEffect, useState } from 'react';
import { DataTable } from './components/DataTable'
import { Form } from './components/Form';
import { type Item } from './components/Form/types';
import { request } from './utils/request';


export const DataContext = createContext<{ setData?: React.Dispatch<React.SetStateAction<Item[]>>, data?: Item[] }>({})
export const useData = () => useContext(DataContext)

function App() {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    (async () => {
      const storedData = localStorage.getItem('rc-data');
      if (!!storedData) {
        setData(JSON.parse(storedData));
      } else {
        const dataApi = await request("https://jsonplaceholder.typicode.com/todos")
        const slicedArray = dataApi.slice(0,10)
        setData(slicedArray)
        localStorage.setItem('rc-data', JSON.stringify(slicedArray));
      }
    })()
  }, [])
  
  return (
    <DataContext.Provider value={{ data, setData }}>
      <Form />
      <DataTable />
    </DataContext.Provider>
  );
}

/**
 * axios
 * Material ui
 * clean code
 * responsive desktop and mobile
 * 
 * retrieve data from https://jsonplaceholder.typicode.com/todos ok
 * Displays a list of items retrieved from an API endpoint. ok
 * Allows the user to add a new item to the list. ok
 * Allows the user to delete an item from the list.
 * Allows the user to edit an item from the list.
 * Persists the list of items to the local storage so that it persists even if the user
 *  refreshes the page
 * 
 */

export default App;
