import React from "react";
import Loader from "react-loader-spinner";
import { usePromiseTracker } from "react-promise-tracker";

export default () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <div className="loading">
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  ) : null;
};
