import React, { Component } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import setter from "./setter";
import Base from "./Upload/Base";
import get from "lodash/get";

export class FormUpload extends Component {
  static types = {
    images: {
      accepts: "image/*",
      extensions: "gif, jpeg, jpg, png"
    },
    audio: {
      accepts: "audio/*",
      extensions: "mp3, flac, wav, ogg, oga"
    },
    video: {
      accepts: "video/x-flv,video/*",
      extensions: "mp4, webm, flv, mov, avi"
    },
    pdf: {
      accepts: "application/pdf",
      extensions: "pdf"
    },
    document: {
      accepts:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
        "application/msword,text/*," +
        "application/vnd.oasis.opendocument.text",
      extensions: "doc, docx, txt, odt"
    },
    csv: {
      accepts: "text/plain, text/csv",
      extensions: "txt, csv"
    },
    spreadsheet: {
      accepts:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
        "application/vnd.ms-excel," +
        "application/vnd.oasis.opendocument.spreadsheet,",
      extensions: "xls, xlsx, ods"
    },
    presentation: {
      accepts:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation," +
        "application/vnd.ms-powerpoint," +
        "application/vnd.oasis.opendocument.presentation",
      extensions: "ppt, pptx, odp"
    },
    texts: {
      accepts: "application/epub+zip,application/zip,text/*",
      extensions: "epub, zip, md"
    },
    json: {
      accepts: "application/json",
      extensions: "json"
    },
    any: {
      accepts: null,
      extensions: null
    }
  };

  static displayName = "Form.Upload";

  static propTypes = {
    set: PropTypes.func.isRequired, // set is called when the value changes
    setOther: PropTypes.func, // used to set another prop, eg removed, in session
    label: PropTypes.string,
    instructions: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    inlineStyle: PropTypes.object,
    name: PropTypes.string, // name of the model field: attributes[avatar]
    layout: PropTypes.oneOf([
      "square",
      "portrait",
      "landscape",
      "horizontal",
      "embed"
    ]),
    placeholder: PropTypes.string, // Allows override of placeholder graphic
    remove: PropTypes.string, // name of the model remove field: attributes[removeAvatar]
    accepts: PropTypes.string,
    value: PropTypes.any, // the current value of the field in the connected model
    initialValue: PropTypes.string, // the initial value of the input when it's rendered
    errors: PropTypes.array,
    inputId: PropTypes.string,
    idForError: PropTypes.string
  };

  static defaultProps = {
    layout: "square",
    accepts: "any",
    inputId: uniqueId("upload-"),
    idForError: uniqueId("upload-error-")
  };

  updateValue = state => {
    const { attachment, removed } = state;
    const { set, setOther, remove: removeName } = this.props;
    if (setOther && removeName) setOther(removed, removeName);
    if (attachment) {
      const { type, name } = attachment;
      const reader = new FileReader();
      reader.onload = eventIgnored => {
        set({ data: reader.result, content_type: type, filename: name });
      };
      reader.readAsDataURL(attachment);
    } else {
      set(null);
    }
  };

  accepts(props) {
    const key = props.accepts;
    let config;
    config = get(FormUpload.types, key);
    if (!config) config = FormUpload.types.any;
    return config;
  }

  render() {
    const { set: _set, setOther: _setOther, ...baseProps } = this.props;
    return (
      <Base
        {...baseProps}
        accepts={this.accepts(this.props)}
        updateValue={this.updateValue}
      />
    );
  }
}

export default setter(FormUpload);
