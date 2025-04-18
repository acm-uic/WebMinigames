import React from "react";
import {
  AdrianContributor,
  JackContributor,
  ThaiContributor,
  TrentonContributor,
  MinhContributor,
  DanielContributor,
  MichaelContributor,
} from "../contributors/Contributors";
import "./contributors.css";
export default function Contributors() {
  return (
    <div className="contributors-page">
      <div className="contributors">
        <AdrianContributor />
        <JackContributor />
        <ThaiContributor />
        <TrentonContributor />
        <MinhContributor />
        <DanielContributor />
        <MichaelContributor />
      </div>
    </div>
  );
}

