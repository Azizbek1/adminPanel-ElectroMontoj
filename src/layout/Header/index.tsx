import { Header } from "antd/es/layout/layout";
import React, { ReactElement } from "react";
import HeaderStyled  from "./Style";

export default function HeaderLayout(): ReactElement {
  return (
    <HeaderStyled>
      <Header className="site-layout-background">
        Header
      </Header>
    </HeaderStyled>
  );
}
