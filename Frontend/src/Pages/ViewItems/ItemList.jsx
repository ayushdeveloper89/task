import React from 'react'

const ItemList = (props) => {
    const selectedItems = props.selectedItems;
    return (
        <table className='itemListTable'>
            <tbody>
                {selectedItems.map((value, index) => {
                    return (<tr key={index} className='itemListRow'>
                        <td className='itemListCell itemListCellImage'>
                            <img src={`/images/${value.image}`} alt="dcfd" width={150} />
                        </td>
                        <td className='itemListCell'>
                            <div>
                                <h3>{value.title}</h3>
                                <span>{`Quantity - ${value.quantity}, `}</span>
                                <span>{` Price - ${value.price}`}</span>
                                <p>{value.description}</p>
                            </div>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    )
}

export default ItemList
