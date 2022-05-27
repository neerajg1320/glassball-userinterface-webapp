import React from "react";
import Switch from "react-switch";

function ToggleSwitch({ children, ...attrs }) {
  return (
    <div
      style={{
        display: "block",
        overflow: "auto",
      }}
    >
      <label
        style={{
          float: "right",
          marginRight: "1em",
        }}
      >
        <div
          style={{
            display: "inline-block",
            overflow: "auto",
            paddingBottom: "0.2em",
          }}
        >
          <span
            style={{
              marginRight: "1em",
            }}
          >
            {children}
          </span>
        </div>
        <div
          style={{
            display: "inline-block",
            overflow: "auto",
            paddingTop: "0.2em",
          }}
        >
          <Switch
            {...attrs}
            uncheckedIcon={false}
            height={20}
            width={40}
            handleDiameter={18}
          />
        </div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
