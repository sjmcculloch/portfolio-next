import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
});

class SlateEditor extends React.Component {
  state = {
    value: initialValue,
    isLoaded: false
  };

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    // Return with no changes if the keypress is not '&'
    if (event.key !== "&") return next();

    // Prevent the ampersand character from being inserted.
    event.preventDefault();

    // Change the value by inserting 'and' at the cursor's position.
    editor.insertText("and");
    return true;
  };

  // Render the editor.
  render() {
    const { isLoaded } = this.state;

    return (
      <React.Fragment>
        {isLoaded && (
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        )}
      </React.Fragment>
    );
  }
}

export default SlateEditor;
