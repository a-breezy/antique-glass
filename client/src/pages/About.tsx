import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="m-14 min-h-full">
      <div className="w-1/2 grid justify-items-center py-4">
        <h1 className="text-xl">Antique Glass</h1>
      </div>
      <div className="flex justify-center">
        <div className="basis-1/2">
          <p className="py-4">
            Based in New York City with pieces sourced from all over the United
            States, Antique Glass houses unique glassware for all occasions.
            Born from the idea that there aren't enough sources of curated
            pieces glassware, we aim to bring unique glassware to a liquor
            cabinet near you.
          </p>
          <p className="py-4">
            At heart we're Bartenders. We've put in countless hours slinging
            drinks, finished our evenings with syrup coated fingers, sticky from
            a night of mixing.
          </p>
          <p className="py-4">
            After years in the industry we've learnt that the drink is only
            three quarters of the jigger. The last quarter is the glass it's
            served in. In order for a drink to stand out in the appropriate way,
            it should be served in the proper way.
          </p>
          <p className="py-4">
            There's a reason why a Manhattan is served up while an Old Fashioned
            is served down. We believe that your glassware should express that.
          </p>

          <Link to="/">
            <button className="min-w-full text-lg my-8 py-5 text-center border-y-2 border-y-black bg-slate-200 hover:bg-slate-500 hover:text-slate-200">
              Come See Our Unique Pieces
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
