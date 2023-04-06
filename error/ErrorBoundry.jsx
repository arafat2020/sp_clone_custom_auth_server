import React, { Component } from "react";

export default class ErrorBoundry extends Component {
  state = { hasError: false, msg: "fdgfd" };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-black flex items-center justify-around">
          <h1 className="text-3xl text-green-500 font-sans font-semibold">
            Opps, error occured!{" "}
            <span className="text-lg font-sans !text-red-300 ">
              Open your console for more info
            </span>
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}
