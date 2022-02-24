import React from "react";
import { Modal, Input } from "antd";
import "antd/dist/antd.css";

class DialogCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  handleOk = () => {
    this.props.onOk(this.state.text);
    this.props.onClose();
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { visible, onClose } = this.props;

    return (
      <Modal
        title="设置文案"
        visible={visible}
        onOk={this.handleOk}
        onCancel={onClose}
      >
        <Input value={this.state.text} onChange={this.onChange} />
      </Modal>
    );
  }
}

export default DialogCustom;
