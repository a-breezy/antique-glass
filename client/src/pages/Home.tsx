import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/assets/imgs/home-banner.jpg)",
          width: "100vw",
          height: "calc(100vh - 9rem)",
        }}
        className="flex flex-wrap place-content-center bg-no-repeat lg:bg-center-bottom bg-center bg-cover"
      >
        <div className="flex flex-wrap place-content-center border border-slate-600 bg-slate-200 hover:bg-slate-400 opacity-80 hover:opacity-70 w-60 h-24">
          <Link to="/store">
            <h2 className="font-mono">See Our Store</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
