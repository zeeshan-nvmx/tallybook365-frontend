import React from "react";
import Styles from "./Dashboard.module.scss";
import Self from "./Self";
import CurrentMonthTotal from "./CurrentMonthTotal";

export default function Dashboard() {
  return (
    <div className={Styles.main}>
      <Self />
      <CurrentMonthTotal/>
    </div>
  );
}
