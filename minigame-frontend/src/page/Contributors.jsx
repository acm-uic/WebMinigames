import React from "react";
import {
  AdrianContributor,
  JackContributor,
  ThaiContributor,
  MinhContributor
} from "../contributors/Contributors";
import "./contributors.css";
export default function Contributors() {
  return (
    <div className="contributors-page">
      <div className="contributors">
        <AdrianContributor />
        <JackContributor />
        <ThaiContributor />
        <MinhContributor />
      </div>
    </div>
  );
}
