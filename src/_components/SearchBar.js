import { useSearchParams } from 'react-router-dom';

function InputBar() {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <input placeholder='Search...'
        value={searchParams.get('filter') || ''}
        onChange={(event) => {
          let filter = event.target.value;
          let category = searchParams.get('category') 
          if (!category) {
              category = 'all';
            }
          if (filter) {
            setSearchParams({ filter, category });
            // setSearchParams({ filter });
          } else {
            setSearchParams({ category })
          }
        }} style={{ padding: '0.5rem' }} />
    )
}

function SelectBar() {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <select name="Collections" 
        value={searchParams.get('category') || ''}
        onChange={(event) => {
          let category = event.target.value;
          let filter = searchParams.get('filter')
          if (category) {
            if (filter) {
              setSearchParams({ filter, category });
            } else {
              setSearchParams({ category });
            }
          } else {
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({})
            }
            }
            }} style={{ padding: '0.5rem' }}
        >
            <option value='all'>All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelries</option>
        </select>
    )
}

export { InputBar, SelectBar }