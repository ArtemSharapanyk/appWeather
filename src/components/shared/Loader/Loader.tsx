/* eslint-disable react/function-component-definition */

import { CircularProgress } from "@mui/material";
import React, { FC } from "react";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
};

export default Loader;
