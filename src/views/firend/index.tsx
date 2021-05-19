import React from "react";
import Editor from "@/components/Editor";

export default class FriendShipPage extends React.Component<{}, { value: string }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { value: "" };
  }

  onChange(value: string) {
    this.setState({ value });
  }

  render() {
    return <Editor value={this.state.value} onChange={value => this.onChange(value)} />;
  }
}
