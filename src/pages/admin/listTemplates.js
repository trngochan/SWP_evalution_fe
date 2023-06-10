import { useState } from "react";
import Button from "~/components/button";
import classNames from "classnames/bind";

import styles from './admin.module.scss'
import AddTemplate from "../create/AddTemplate";

const cx = classNames.bind(styles);

function ListTemplatesAdmin() {
    const [isShowAdd, setShowAdd] = useState(false);

    const semesterList = ["1", "2"]
  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <AddTemplate />
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
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Subject Id</th>
                  <th scope="col">Status</th>
                  <th scope="col">Apply Date</th>
                </tr>
              </thead>
              <tbody>
                    <tr >
                        <td>1</td>
                        <td>2</td>
                        <td>2</td>
                        <td>2</td>
                        <td>2</td>
                      </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ListTemplatesAdmin;
