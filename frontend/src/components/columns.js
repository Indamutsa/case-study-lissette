export const getHeaders = (attributes = false) => {

    return [
        {
            Header: 'Item',
            accessor: 'item',
        },
        {
            Header: 'Item-Type',
            accessor: 'itemType',
        },

        {
            Header: 'Correct',
            accessor: 'correct',
        },
        {
            Header: 'Obvious',
            accessor: 'obvious',
        },
        {
            Header: 'Redundant',
            accessor: 'redundant',
        },
        {
            Header: 'Contextualized',
            accessor: 'contextualized',
        },
        {
            Header: 'Generalizable',
            accessor: 'generalizable',
        },
    ]
}