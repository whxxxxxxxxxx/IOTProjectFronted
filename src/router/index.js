import {createBrowserRouter} from 'react-router-dom';
import Lay from '../pages/Lay/Layout';
import Data from '../pages/Data/data ';
import Searchdata from '../pages/SearchData/Search'
import Charts from '../pages/Chart/Charts'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Lay/>,
        children: [
            {
                path: '/Data',
                element: <Data/>,   
            },
            {
                path: '/Searchdata',
                element: <Searchdata/>,
            },
            {
                path: '/chart',
                element: <Charts/>,
            },
        ],
    },
    
]);

export default router;