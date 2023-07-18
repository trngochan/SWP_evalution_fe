import styles from "./details.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Header2 } from "~/components/layouts/header";


const cx = classNames.bind(styles);

function TemplateDetail() {
  return (
    <div>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of Template</h2>
        <div className="row">
          <div className="">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Template ID</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Template name</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Subject Id </th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row"> Apply Date</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateDetail;
