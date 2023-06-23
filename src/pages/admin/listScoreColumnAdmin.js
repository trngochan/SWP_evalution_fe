import { useState } from "react";
import Button from "~/components/button";
import classNames from "classnames/bind";
import Table from 'react-bootstrap/Table';

import styles from './admin.module.scss'
import AddScoreColumn from "../create/AddScoreColumn";

const cx = classNames.bind(styles);

function ListScoreColumnAdmin() {
    const [isShowAdd, setShowAdd] = useState(false);

    const semesterList = ["1", "2"]
  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <AddScoreColumn />
      ) : (
        <>
          <div className="col-2">
            <select
                className={cx('form-select')}
                aria-label="Default select example"
                defaultValue={""}
              //   onClick    
              >
                <option value="0">All Semester</option>
                {semesterList.map((semester, i) => {
                  return (
                    <option key={i} >
                      {semester}
                    </option>
                  );
                })}
            </select>
          </div>
  
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Adress</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
        </tbody>
      </Table>
        </>
      )}
    </div>
  );
}

export default ListScoreColumnAdmin;
