import React, { useState } from "react";
import "./EmployeeFormPage.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

import EmployeeFormInput from "../../component/employee-from-input/EmployeeFormInput";
import EmployeeFormRadio from "../../component/employee-form-checkbox/EmployeeFormRadio";
import MyTextarea from "../../component/employee-form-textarea/EmployeeFormTextarea";

function EmployeeForm({ currentEmployee }) {
  const [course, setCourse] = useState("");
  const [time, setTime] = useState("");
  const [hour, setHour] = useState("");
  const [file, setFile] = useState("");
  const [explanation, setExplanation] = useState("");
  const [category, setCategory] = useState("");
  const [quota, setQuota] = useState("");

  let categoryId = "";
  switch (category) {
    case "有氧教室":
      categoryId = 1;
      break;
    case "瑜伽教室":
      categoryId = 2;
      break;
    default:
      categoryId = 3;
      break;
  }

  async function handleSubmit() {
    const row = {
      "staffId": currentEmployee.Eid,
      "courseCategoryId": categoryId,
      "courseName": course,
      "categoryName": category,
      "courseImg": file,
      "courseIntroduce": explanation,
      "courseTime": time,
      "courseHour": hour,
      "numberOfCourse": 0,
      "courseQuoda": quota,
    };

    const request = new Request("http://localhost:5000/api/courses", {
      method: "POST",
      body: JSON.stringify(row),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    await response.json();

    alert("課程上傳成功");
  }

  return (
    <>
      <form className="form-box">
        <EmployeeFormInput
          title={"課程名稱："}
          type={"text"}
          placeholder={"請輸入課程名稱"}
          value={course}
          onChange={(event) => {
            setCourse(event.target.value);
          }}
        />
        <EmployeeFormInput
          title={"開課時間："}
          type={"datetime-local"}
          value={time}
          onChange={(event) => {
            setTime(event.target.value);
          }}
        />
        <EmployeeFormInput
          title={"課程時數："}
          type={"number"}
          placeholder={"請選擇課程總時數"}
          value={hour}
          onChange={(event) => {
            setHour(event.target.value);
          }}
        />
        <EmployeeFormInput
          title={"課程名額："}
          type={"number"}
          placeholder={"請選擇課程上限名額"}
          value={quota}
          onChange={(event) => {
            setQuota(event.target.value);
          }}
        />
        <MyTextarea
          title={"課程說明："}
          placeholder={"請詳述課程介紹"}
          value={explanation}
          onChange={(event) => {
            setExplanation(event.target.value);
          }}
        />
        <label className="label">
          課程分類：
          <EmployeeFormRadio
            title={"有氧教室"}
            value={category}
            onClick={() => {
              setCategory("有氧教室");
            }}
          />
          <EmployeeFormRadio
            title={"瑜伽教室"}
            value={category}
            onClick={() => {
              setCategory("瑜伽教室");
            }}
          />
          <EmployeeFormRadio
            title={"飛輪教室"}
            value={category}
            onClick={() => {
              setCategory("飛輪教室");
            }}
          />
        </label>
        <div className="file">
        <div className="file-container">
        <EmployeeFormInput
          title={"課程圖片："}
          type={"file"}
          accept=".jpg,.png"
          onChange={(event) => {
            setFile(URL.createObjectURL(event.target.files[0]));
          }}
        />
        </div>
        <div className="file-box">
          <img className="file-img" alt="" src={file} />
        </div>
        </div> 
        <div>
          <button
            className="submit"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            送出
          </button>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(EmployeeForm));