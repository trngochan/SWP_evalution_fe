import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "~/components/button";
import AddTemplate from "../create/AddTemplate";
import classNames from "classnames/bind";
import styles from "./generateTable.module.scss";

const cx = classNames.bind(styles);

const TableGenerator = ({ haddleAddTemplate }) => {
  const [numRows, setNumRows] = useState(0);
  const [tableData, setTableData] = useState([]);

  const handleRowInputChange = (event) => {
    const { value } = event.target;
    setNumRows(Number(value));
  };

  const handleGenerateTable = () => {
    const table = [];
    for (let i = 0; i < numRows; i++) {
      table.push({ name: "", percent: "" });
    }
    setTableData(table);
  };

  const handleNameInputChange = (event, rowIndex) => {
    const { value } = event.target;
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].name = value;
    setTableData(updatedTableData);
  };

  const handlePercentInputChange = (event, rowIndex) => {
    const { value } = event.target;
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].percent = value;
    setTableData(updatedTableData);
  };

  const renderTable = () => {
    return (
      <>
        <div>
          <h2>You must create score column for template score</h2>
          <div>
            <label>Number of Rows:</label>
            <input
              type="number"
              className={cx("input")}
              onChange={handleRowInputChange}
            />
          </div>
          <button className={cx("button")} onClick={handleGenerateTable}>
            Generate Table
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(event) => handleNameInputChange(event, rowIndex)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.percent}
                    onChange={(event) =>
                      handlePercentInputChange(event, rowIndex)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>

          <Button
            primary
            onClick={() => {
              haddleAddTemplate(tableData);
            }}
          >
            Confirm
          </Button>
        </Table>
      </>
    );
  };

  return <div>{renderTable()}</div>;
};

export default TableGenerator;
