import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import CustomPagination from './CustomPagination';

const ViewItems = () => {
    const [allitems, setAllitems] = useState([]);
    const pageSize = 10;

    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentpage] = useState(1);

    const totalPages = Math.ceil(allitems.length / pageSize)

    useEffect(() => {
        getAllItems()
    }, [])

    useEffect(() => {
        let count = Number(currentPage * pageSize - pageSize)
        setSelectedItems(allitems.slice(count, count + pageSize))
    }, [currentPage])

    const getAllItems = async () => {
        const fetchAllItems = await axios.get('/getAllItems');
        setAllitems(fetchAllItems.data)
        setSelectedItems(fetchAllItems.data.slice(0, pageSize))
    }
    return (
        <div className='App'>
            <h2>Item List</h2>
            {selectedItems ?
                <ItemList selectedItems={selectedItems} />
                : null}
            <CustomPagination totalPages={totalPages} setCurrentpage={setCurrentpage} />
        </div>
    )
}

export default ViewItems
