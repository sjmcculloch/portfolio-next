import React from "react";
import HoverMenu from "./HoverMenu";
import ControllMenu from "./ControllMenu";
import { Editor } from "slate-react";
import { initialValue } from "./initial-value";
import { renderMark, renderNode } from "./renderers";
import Html from "slate-html-serializer";
import { Value } from "slate";

import { rules } from "./rules";
const html = new Html({ rules });

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

function BoldMark(props) {
  return <strong>{props.children}</strong>;
}

class SlateEditor extends React.Component {
  state = {
    value: Value.create(),
    isLoaded: false
  };

  componentDidMount() {
    const valueFromProps = this.props.initialValue;
    const value = valueFromProps
      ? Value.fromJSON(html.deserialize(valueFromProps))
      : Value.fromJSON(initialValue);

    this.setState({ isLoaded: true, value });
    this.updateMenu();
  }

  componentDidUpdate = () => {
    this.updateMenu();
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, change, next) => {
    const { isLoading } = this.props;

    if (!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.save();
      return;
    }
    next();
  };

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  };

  getTitle() {
    const { value } = this.state;
    const firstBlock = value.document.getBlocks().get(0);
    const secondBlock = value.document.getBlocks().get(1);

    const title = firstBlock && firstBlock.text ? firstBlock.text : "no Title";
    const subTitle =
      secondBlock && secondBlock.text ? secondBlock.text : "no SubTitle";

    return {
      title,
      subTitle
    };
  }

  save() {
    const { value } = this.state;
    const { save, isLoading } = this.props;

    const headingValues = this.getTitle();
    const text = html.serialize(value);

    !isLoading && save(text, headingValues);
  }

  // Render the editor.
  render() {
    const { isLoaded } = this.state;

    return (
      <React.Fragment>
        {isLoaded && (
          <Editor
            {...this.props}
            placeholder="Enter some text..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={renderMark}
            renderNode={renderNode}
            renderEditor={this.renderEditor}
          />
        )}
      </React.Fragment>
    );
  }

  renderEditor = (props, editor, next) => {
    const children = next();
    const { isLoading } = props;
    return (
      <React.Fragment>
        <ControllMenu isLoading={isLoading} save={() => this.save()} />
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    );
  };
}

export default SlateEditor;
