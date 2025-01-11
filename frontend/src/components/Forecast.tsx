import clsx from "clsx";
import { memo } from "react";
import { Link } from "react-router-dom";

export const Forecast = memo(
  ({
    event,
    duedate,
    community,
    probability
  }: {
    event: string;
    duedate: string;
    community: string;
    probability: number;
  }) => {
    const { alpha, beta } = {
      alpha: Math.round(Math.random() * 15),
      beta: Math.round(Math.random() * 15)
    };
    const gammaFunction = (x: number): number => {
      if (x === 1) return 1;
      return (x - 1) * gammaFunction(x - 1);
    };
    const betaConstant =
      (gammaFunction(alpha) * gammaFunction(beta)) /
      gammaFunction(alpha + beta);
    const betaDistPDF = (x: number) => {
      return (
        (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) / betaConstant
      );
    };
    const consensus = [
      0,
      Array.from({ length: 5 }, (_, i) => {
        let x = (i + 1) / 6;
        return betaDistPDF(x);
      }),
      0
    ]
      .flat()
      .map((x, i, arr) => x / Math.max(...arr));

    const mle = alpha / (alpha + beta);
    const color0 = "#b91c1c";
    const color1 = "#2563eb";
    const textColor =
      betaDistPDF(probability) / betaDistPDF(mle) < 0.2 ? "white" : "";
    const mixColor = `color-mix(in oklab, white ${(100 * betaDistPDF(probability)) / betaDistPDF(mle)}%, ${probability < mle ? color0 : color1})`;

    return (
      <div
        className={"mt-2 rounded-lg text-gray-950"}
        style={{
          color: textColor,
          backgroundColor: mixColor,
          boxShadow: `0 0 10px color-mix(in oklab, transparent 50%, ${mixColor}), 0 0 32px color-mix(in oklab, transparent 50%, ${mixColor}), 0 0 64px color-mix(in oklab, transparent 50%, ${mixColor})`
        }}
      >
        <div className="border-b border-white/30 px-2 py-1 text-sm font-semibold">
          <span className="text-[${textColor}]/80">Prediction in </span>
          <Link
            to="/l/tech"
            className="group decoration-2 underline-offset-2 hover:underline"
          >
            <span className="underline">l/{community}</span>
          </Link>
        </div>
        <div className="overflow-hidden break-words p-2">
          <div className="relative float-start me-2 mt-0 flex flex-col items-center">
            <span className="text-4xl font-bold">
              {Math.round(100 * probability)}%
            </span>
            <div className="relative mt-2 h-2 w-full rounded-full border border-white bg-white/20">
              <div
                className={clsx(`absolute h-full w-full rounded-full`)}
                style={{
                  backgroundImage: `linear-gradient(to right, ${consensus.map((el, i) => `color-mix(in oklab, white ${100 * el}%, ${i / 6 < mle ? color0 : color1}) ${(100 * i) / 6}%`).join(", ")})`
                }}
              ></div>
            </div>
          </div>
          <div className="clear-end">
            <span className={clsx(`text-[${textColor}]/80 me-1`)}>chance</span>
            <span className="font-semibold">{event}</span>{" "}
            <span className={clsx(`text-[${textColor}]/80`)}>by</span> {duedate}
          </div>
        </div>
      </div>
    );
  }
);
