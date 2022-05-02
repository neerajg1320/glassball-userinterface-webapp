import React from "react";
import { css } from "@emotion/css";

function TextAreaCustom(props) {
  return (
    <textarea
      {...props}
      className={css`
        width: 96%;
        margin-top: 20px;
        border-radius: 5px;
        padding: 5px;
        // font-family: "Times New Roman", Times, serif;
        font-size: 15px;
        // Enable scroll and prevent text wrapping
        overflow-y: scroll;
        white-space: pre;
        overflow-wrap: normal;
        overflow-x: scroll;
      `}
    />
  );
}

export default TextAreaCustom;