/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from "react";
import { Header } from "antd/lib/layout/layout";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import appRoutes, { publicRoutes } from "../../../routes/routes";
import { useTypedSelector } from "../../../hooks/redux";
import { AppRoutesInterface } from "../../../interfaces/routes";

interface MenuLink {
  key: string;
  label: string;
}

const getLinksFromRoutes = (routes: AppRoutesInterface[]) => {
  return routes
    .map((route) => {
      return route.isInNavigation
        ? {
            key: `${route.route}`,
            label: route.name,
            path: route.route,
          }
        : null;
    })
    .filter((link) => link);
};

export const AppHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isCitiesExacts } = useTypedSelector((state) => state.cities);

  const [selectedKeys, setSelectedKeys] = useState([""]);

  const publicLinks = getLinksFromRoutes(publicRoutes);

  const allLinks = getLinksFromRoutes(appRoutes);

  const navigateToPageAfterClick = (link: MenuLink) => {
    navigate(link.key);
  };

  const menuItems = isCitiesExacts ? allLinks : publicLinks;

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
        items={menuItems}
        onClick={navigateToPageAfterClick as any}
      />
    </Header>
  );
};
