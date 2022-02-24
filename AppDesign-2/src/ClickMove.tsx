// Carousel component
import React, { Component } from 'react';

interface CarouselProps {
    width : number;
    height : number;
}

interface CState {
    currentIndex : number;
}

export default class Carousel extends Component<CarouselProps,CState> {
  constructor(props:CarouselProps) {
    super(props);
    this.state = { currentIndex: 0 };
    this.renderChildren = this.renderChildren.bind(this);
    this.setIndex = this.setIndex.bind(this);
  }

  renderChildren() {
    const { children, width, height } = this.props;
    const childStyle = {
      width: width,
      height: height
    };

    return React.Children.map(children, child => {
        
      const childClone = React.cloneElement(child as React.ReactElement<any>, { style: childStyle });
      return (
        <div
          style={{
            display: 'inline-block'
          }}
        >
          {childClone}
        </div>
      );
    });
  }

  setIndex(index : number) {
    // const len = this.props.children.length;
    // const nextIndex = (index + len) % len;

    const nextIndex = index;

    this.setState({ currentIndex: nextIndex });
  }

  render() {
    const { width, height } = this.props;
    const { currentIndex } = this.state;

    const offset = -currentIndex * width;

    const frameStyle = (props: CarouselProps): React.CSSProperties => ({
      width: props.width,
      height: props.height,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      position: 'relative',
      margin: 'auto'
    })

    const imageRowStyle = (): React.CSSProperties => ({
      marginLeft: offset,
      transition: '.2s'
    })

    const buttonStyle = (): React.CSSProperties => ({
      position: 'absolute',
      top: '40%',
      bottom: '40%',
      width: '10%',
      background: 'rgba(0,0,0,0.2)',
      outline: 'none',
      border: 'none'
    })

    const leftButtonStyle = {
      ...buttonStyle,
      left: 0
    };

    const rightButtonStyle = {
      ...buttonStyle,
      right: 0
    };

    return (
      <div className="carousel">
        <div className="frame" style={frameStyle(this.props)}>
          <button
            onClick={() => this.setIndex(currentIndex - 1)}
            style={leftButtonStyle}
          >
            &lt;
          </button>
          <div style={imageRowStyle()}>{this.renderChildren()}</div>
          <button
            onClick={() => this.setIndex(currentIndex + 1)}
            style={rightButtonStyle}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}