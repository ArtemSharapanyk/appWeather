/* eslint-disable react/function-component-definition */
import { Spin } from "antd";
import React, { FC } from "react";

interface Props {
  isLoading: boolean;
}

export const Loader: FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader">
      <div className="loader__block">
        <Spin size="large" />
      </div>
    </div>
  );
};
