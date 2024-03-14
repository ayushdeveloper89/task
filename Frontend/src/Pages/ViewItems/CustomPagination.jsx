import React from 'react'

const CustomPagination = (props) => {
  const totalPages = props.totalPages;
  const setCurrentpage = props.setCurrentpage;

  const handleSetCurrentPage = (val) => {
    console.log(val)
    setCurrentpage(Number(val))
  }
  return (
    <div className='customPagination'>
      {[...Array(totalPages).keys()].map((value) => {
        return ( <span onClick={()=> {handleSetCurrentPage(value + 1)}}>{value + 1}</span>)
      })}
    </div>
  )
}

export default CustomPagination
