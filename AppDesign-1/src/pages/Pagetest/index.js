/*
 * 弹窗-普通标签
 *
 * 只能通过标签展示弹窗
 * 需要增加 visible state 控制弹窗状态
 */
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
import { DialogCustom } from "./dialogCustom";

// 使用
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      text: ""
    };
  }

  handleOk = (v) => {
    this.setState({ text: v });
  };

  showDialog = () => {
    this.setState({ visible: true });
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.showDialog}>设置文案</Button>
        <DialogCustom
          visible={this.state.visible}
          onOk={this.handleOk}
          onClose={this.handleClose}
        />
        <div>{this.state.text}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
