import React from 'react'

const column = [
    {
        Header: 'Coin',
        id: 'coin',
        accessor: d => d.coin
    },
    {
        Header: 'Volume',
        id: 'volume',
        accessor: d => d.volume
    },
    {
        Header: 'Buying',
        id: 'buying',
        accessor: d => d.buying
    },
    {
        Header: 'Current',
        id: 'current',
        accessor: d => d.current
    },
    {
        Header: 'Total',
        id: 'total',
        accessor: d => d.total
    },
    {
        Header: 'Profit',
        id: 'profit',
        accessor: d => d.profit,
        Cell: props => {
            const Profit = props.value < 0
                ? <span style={{color: 'red'}}>{props.value}</span>
                : <span style={{color: 'green'}}>{props.value}</span>;
            return (
                <div>
                    {Profit}
                </div>
            );
        },
    }
];

export {column}