import React, { Component } from "react";
import PropTypes from "prop-types";
import { UID } from "react-uid";
import setter from "../setter";
import Errorable from "global/components/form/Errorable";

import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { DOMParser } from "prosemirror-model";
import { baseKeymap } from "prosemirror-commands";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

require("prosemirror-view/style/prosemirror.css");

class FormTextArea extends Component {
  static displayName = "Form.TextArea";

  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    height: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string,
    errors: PropTypes.array,
    name: PropTypes.string,
    instructions: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    wide: PropTypes.bool
  };

  static defaultProps = {
    height: 100
  };

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  get initialValue() {
    return "<p>This is a paragraph</p>";
    return this.props.value;
  }

  componentDidMount() {
    console.log(DOMParser.fromSchema(schema).parse(this.initialValue));
    const state = EditorState.create({
      schema,
      doc: DOMParser.fromSchema(schema).parse(this.initialValue),
      plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap)
      ]
    });
    const view = new EditorView(this.editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        console.log(
          "Document size went from",
          transaction.before.content.size,
          "to",
          transaction.doc.content.size
        );
        const newState = view.state.apply(transaction);
        view.updateState(newState);
      }
    });
  }

  get idPrefix() {
    return "textarea";
  }

  get idForErrorPrefix() {
    return "textarea-error";
  }

  get idForInstructionsPrefix() {
    return "textarea-instructions";
  }

  render() {
    return (
      <UID>
        {id => (
          <Errorable
            className="form-input"
            name={this.props.name}
            errors={this.props.errors}
            label={this.props.label}
            idForError={`${this.idForErrorPrefix}-${id}`}
          >
            <label htmlFor={`${this.idPrefix}-${id}`}>{this.props.label}</label>
            <div
              style={{
                height: 400,
                marginBottom: 20,
                border: "1px solid red"
              }}
              ref={this.editorRef}
            />
            <textarea
              id={`${this.idPrefix}-${id}`}
              aria-describedby={`${this.idForErrorPrefix}-${id} ${this.idForInstructionsPrefix}-${id}`}
              style={{ height: this.props.height }}
              placeholder={this.props.placeholder}
              onChange={this.props.onChange}
              value={this.props.value || ""}
            />
          </Errorable>
        )}
      </UID>
    );
  }
}

export default setter(FormTextArea);
