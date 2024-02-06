/* eslint-disable react/prop-types */
import { SingleGlass } from "./SingleGlass";

export default function GlassCard({ glasses }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {glasses.map((item) => (
        <SingleGlass key={item._id} {...item} />
      ))}
    </div>
  );
}
