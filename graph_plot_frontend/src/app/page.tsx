"use client";
import { useRef, useState } from "react";
import Graph from "./Components/Graph";

export default function Home() {
  const [data, setData] = useState<Point[]>([]);

  const xref = useRef<HTMLInputElement>(null);
  const yref = useRef<HTMLInputElement>(null);

  const handleAddPoint = () => {
    const x = Number(xref.current?.value);
    const y = Number(yref.current?.value);

    setData((prev) => [...prev, { x: x, y: y }]);
  };

  return (
    <div className="flex">
      <div className="flex  flex-col gap-10 w-[30vw] pt-10 bg-gray-300">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPoint();
          }}
          className="flex flex-col px-8 gap-5"
        >
          <div>
            X:{" "}
            <input
              name="X"
              ref={xref}
              type="number"
              placeholder="Enter X value"
              className="bg-white rounded-sm"
              required
            />
          </div>
          <div>
            Y:{" "}
            <input
              name="Y"
              ref={yref}
              type="number"
              placeholder="Enter Y value"
              className="bg-white rounded-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-blue-400 rounded-md w-fit px-4 py-2"
          >
            Add Point
          </button>
        </form>

        <div className="w-full flex justify-center overflow-auto">
          <table className="w-1/2">
            <thead>
              <tr>
                <th className="border">X</th>
                <th className="border">Y</th>
              </tr>
            </thead>
            <tbody>
              {data.map((point, index) => {
                return (
                  <tr key={index}>
                    <td className="text-black text-center border">{point.x.toString()}</td>
                    <td className="text-black text-center border">{point.y.toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Graph data={data} setData={setData} />
    </div>
  );
}
