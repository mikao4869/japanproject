"use client";

import React from "react";

import Boxflot from "./component/boxflot"; 
import Graph from "./component/graph";
import {Table} from "./component/table";
import LanguageButton from "./component/LanguageButton";
import { useTranslation } from "react-i18next";

import Main2 from "./pages/main-google"
const HOME: React.FC = () => {
  return (
    <>
      <Main2/>
    </>
  );
};

export default HOME;
