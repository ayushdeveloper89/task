import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import CustomPagination from './CustomPagination';
import {
    TextField,
} from '@mui/material';

const ViewItems = () => {
    const [searchItem, setSearchItem] = useState('');
    const [allitems, setAllitems] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const pageSize = 10;

    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentpage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(allitems.length / pageSize));


    // let totalPages = Math.ceil(allitems.length / pageSize)

    useEffect(() => {
        console.log(searchItem)
        let arr = allitems.filter((item) => {
            if (searchItem === "") {
                return item;
            } else if (item.title.toLowerCase().includes(searchItem.toLowerCase())) {
                return item;
            }
        })
        setFilteredData(arr)
    }, [searchItem]);

    useEffect(() => {
        getAllItems()
    }, [])

    useEffect(() => {
        console.log(filteredData)
        if(filteredData.length > 0 ){
            setSelectedItems(filteredData.slice(0, pageSize))
        }
        setTotalPages(Math.ceil(filteredData.length / pageSize))
    }, [filteredData])

    useEffect(() => {
        let count = Number(currentPage * pageSize - pageSize)
        setSelectedItems(filteredData.slice(count, count + pageSize))
    }, [currentPage])

    const getAllItems = async () => {
        const fetchAllItems = await axios.get('/getAllItems');
        setAllitems(fetchAllItems.data)
        setSelectedItems(fetchAllItems.data.slice(0, pageSize))
    }
    return (
        <div className='App'>
            <h2>Item List</h2>
            <TextField
                label="Search"
                id="title"
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
            {selectedItems ?
                <ItemList selectedItems={selectedItems} />
                : null}
            <CustomPagination totalPages={totalPages} setCurrentpage={setCurrentpage} />
        </div>
    )
}

export default ViewItems
