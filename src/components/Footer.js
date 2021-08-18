import React from "react";

export default function Footer() {
  return (
    <div style={{position:"fixed", bottom:"5vh", left:'50vw', transform:'translateX(-50%)'}}>
        <div color="blue" >
            <div>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/maipbui/"> Mai Bui</a> &amp; <a href="https://github.com/loctran15"> Loc Tran </a>
            </div>
        </div>
    </div>
  );
}
