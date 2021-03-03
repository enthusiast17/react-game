import React from 'react';
import { useDispatch } from 'react-redux';
import { useTable } from 'react-table';
import { getStats } from '../../localstorage';
import { goHomePage } from '../Home/home.slice';
import './index.scss';

const Statistics = () => {
  const data = React.useMemo(
    () => getStats(),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Level',
        accessor: 'level',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
    ],
    []
  );
  
  const tableInstance = useTable<{}>({ columns, data })
  const dispatch = useDispatch();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div className="statistics">
      <div className="content">
        <h1 className="title">Statistics</h1>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <button
          className="btn btn-outline-danger"
          onClick={() => dispatch(goHomePage())}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Statistics;
