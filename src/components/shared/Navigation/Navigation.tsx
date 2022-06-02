import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appRoutes from "../../../routes/routes";
import { useTypedSelector } from "../../../hooks/redux";

export default function Navigation() {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { baseCurrency } = useTypedSelector((state) => state.currency);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    setValue(pathname);
    navigate(pathname);
  }, [pathname]);

  return (
    <div className="navigation">
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {baseCurrency
          ? appRoutes.map((route) => {
              return (
                <BottomNavigationAction
                  key={`${route.name}_navigaion`}
                  label={route.name}
                  value={route.route}
                />
              );
            })
          : appRoutes.map((route) => {
              return route.closed ? null : (
                <BottomNavigationAction
                  key={`${route.name}_navigaion`}
                  label={route.name}
                  value={route.route}
                />
              );
            })}
      </BottomNavigation>
    </div>
  );
}
