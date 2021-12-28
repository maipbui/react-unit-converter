import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100px",
        alignItems: "center",
      }}
    >
      <div color="blue">
        <div>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://github.com/maipbui/"> Mai Bui</a> &amp;{" "}
          <a href="https://github.com/loctran15"> Loc Tran </a>
        </div>
      </div>
    </div>
  );
}
