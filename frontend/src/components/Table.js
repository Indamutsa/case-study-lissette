import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';

// import { getHeaders } from '../components/columns'
// // import { useAppContext } from "../context/AppContext";
// import { getUserData, makeData } from "../data/makeData";

import "../styles/table.css";

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    // // If the initialValue is changed external, sync it up with our state
    // const onChange = e => {
    //     setValue(e.target.checked);
    //     updateMyData(index, id, value)
    // }

    // // We'll only update the external data when the input is blurred
    // const onBlur = () => {
    //     updateMyData(index, id, value)
    // }



    return <input
        type="checkbox"
        defaultChecked={value}
        onChange={(e) => {
            setValue(e.target.checked);
            updateMyData(index, id, e.target.checked)
        }
        } />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
export default function Table({ COLUMNS, useCaseData, param }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.


    const columns = useMemo(() => COLUMNS, [])
    const [data, setData] = useState(useCaseData)
    const [originalData] = useState(data)
    const [skipPageReset, setSkipPageReset] = useState(false)
    const navigate = useNavigate();


    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    // After data CHANGES, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    // Let's add a data resetter
    // illustrate that flow...
    const resetData = () => {
        setData(originalData)
        axios.post('http://localhost:8080/receive', {
            data, param
        })
        navigate("/Finish")
    }


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        // pageCount,
        // gotoPage,
        nextPage,
        previousPage,
        // setPageSize,
        state: { pageIndex, }, //pageSize },
    } = useTable({
        columns,
        data,
        defaultColumn,
        // // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        initialState: { pageSize: 15 },
        // // updateMyData isn't part of the API, but
        // // anything we put into these options will
        // // automatically be available on the instance.
        // // That way we can call this function from our
        // // cell renderer!
        updateMyData,
    }, usePagination)

    return (
        <>
            { }
            <div className="container">
                <div className="leftBlock">
                    <div className="image">
                        <img
                            src={`/img/${page[0].original.photo}.png`}
                            alt="first"
                        />
                    </div>
                    <div className="description">
                        <h3>Information</h3>
                        <br />
                        <p>
                            The figure shows a class diagram with a class in blue. This class
                            is the target class subject to the recommendations. The target
                            class is the class subject to the recommendations. The other
                            classes of the class diagram, shown in grey, are the context
                            information of the target class.
                        </p>
                        <br />
                        <p>
                            Evaluate the recommended items presented in the list to the right
                            using the following criteria:
                        </p>
                        <ul>
                            <li>
                                <b>Correct:</b> The recommended item is correct for the target
                                class
                            </li>
                            <li>
                                <b>Obvious:</b> The recommended item is an item you could have
                                easily come up with yourself
                            </li>
                            <li>
                                <b>Redundant:</b> The recommended item exists or is similar to
                                an existing one
                            </li>
                            <li>
                                <b>Contextualized:</b> The recommended item belongs to the
                                diagram domain
                            </li>
                            <li>
                                <b>Generalizable:</b> The recommended item is also applicable to
                                other classes of the diagram
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rightBlock">
                    <div>
                        <h3>Recommended items</h3>
                        <table  {...getTableProps()}>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        row.original.item ?
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, i) => {
                                                    return <td {...cell.getCellProps()}>{i === 0 || i === 1 ? cell.value : cell.render('Cell')}</td>
                                                })}
                                            </tr> : ''
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="submi">
                            <h4> Provide here your recommendation</h4>
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Your recommendation"
                            />
                            <button onClick={() => {
                                previousPage();
                            }} disabled={!canPreviousPage}>
                                Previous
                            </button>
                            {canNextPage ?
                                <button onClick={(e) => {
                                    nextPage()
                                }} disabled={!canNextPage}>
                                    Next
                                </button>
                                : <button onClick={resetData}>Submit</button>
                            }
                            <span>
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length} Page
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
