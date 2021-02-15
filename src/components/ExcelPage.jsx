import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import axios from 'axios';
export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     nom:null,prenom:null,email:null,pwd:null,
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "nom",
          dataIndex: "nom",
          editable: false
        },
        {
          title: "prenom",
          dataIndex: "prenom",
          editable: false
        },
        {
          title: "email",
          dataIndex: "email",
          editable: false
        },
        {
          title: "password",
          dataIndex: "password",
          editable: false
        }
        
      ]
    };
  }

  handleSave = (row) => {
    const newData = [...this.state.rows];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = (fileList) => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              nom: row[0],
              prenom: row[1],
              email: row[2], password: row[3]
            });

            axios.post('http://localhost:3001/register', {
              nom:row[0],
             prenom:row[1],
               email:row[2],
               password:row[3],
              
               
             })


          }

         
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {
    console.log("submitting: ", this.state.rows);
    //submit to API
    //if successful, banigate and clear the data
    //this.setState({ rows: [] })
  };

  render() {
   
    const columns = this.state.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <>
        <h1>Importing Excel Component</h1>
        <Row gutter={16}>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {this.state.rows.length > 0 && <></>}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Click to Upload Excel File
            </Button>
          </Upload>

          <Button>
              <Icon type="save" />save data
            </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
          
        </div>
      </>
    );
  }
}
