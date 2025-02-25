import React from "react";
import {
  AdrianContributor,
  JackContributor,
  ThaiContributor,
} from "../contributors/Contributors";
import "./contributors.css";
export default function Contributors() {
  return (
    <div className="contributors-page">
      <div className="contributors">
        <AdrianContributor />
        <JackContributor />
        <ThaiContributor />
      </div>
    </div>
  );
}
