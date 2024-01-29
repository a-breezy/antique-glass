/* eslint-disable react/prop-types */
import React from "react";
import { GlassSingleCard } from "./GlassSingleCard";

export default function GlassCard({ glasses }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {glasses.map((item) => (
        <GlassSingleCard key={item._id} glass={item} />
      ))}
    </div>
  );
}
