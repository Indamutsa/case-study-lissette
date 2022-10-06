import React from 'react'
import "../styles/table.css"

export const Table1 = ({ item }) => {
  let data = item.data;
  let title = item.title;
  return (
    <div>
      <table id="table">
        <tbody>
          <tr>
            <th>{title}</th>
            <th width="15%">Correct</th>
            <th>Obvious</th>
            <th>Redundant</th>
            <th width="18%">Contextualized</th>
            <th width="18%">Generalizable</th>
          </tr>
          {data.map((attribute, i) => (
            <tr key={i}>
              <td>{attribute.itemName}</td>
              <td>
                <input
                  className="checkInput"
                  type="checkbox"
                  id={`correct-${attribute.itemName}`}
                  name={`correct-${attribute.itemName}`}
                />
              </td>
              <td>
                <input
                  className="checkInput"
                  type="checkbox"
                  id={`pobvious-${attribute.itemName}`}
                  name={`pobvious-${attribute.itemName}`}
                />
              </td>
              <td>
                <input
                  className="checkInput"
                  type="checkbox"
                  id={`redudant-${attribute.itemName}`}
                  name={`redudant-${attribute.itemName}`}
                />
              </td>
              <td>
                <input
                  className="checkInput"
                  type="checkbox"
                  id={`context-${attribute.itemName}`}
                  name={`context-${attribute.itemName}`}
                />
              </td>
              <td>
                <input
                  className="checkInput"
                  type="checkbox"
                  id={`general-${attribute.itemName}`}
                  name={`general-${attribute.itemName}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
