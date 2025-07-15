"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

interface GraphProps {
  data: Point[];
  setData: React.Dispatch<React.SetStateAction<Point[]>>;
}

interface allGraphsProps {
  title: String;
  X_Values: [Number];
  Y_Values: [Number];
}

export default function Graph({ data, setData }: GraphProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  const [allGraphs, setAllGraphs] = useState<allGraphsProps[]>([]);
  const [error, setError] = useState<String>("");

  const fetchAllGraphs = async () => {
    try {
      const res = await fetch("http://localhost:3001/graph");
      const json = await res.json();
      setAllGraphs(json);
    } catch (err) {
      console.error("Failed to fetch graphs", err);
    }
  };

  useEffect(() => {
    fetchAllGraphs();
  }, []);

  const handleAddGraph = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const title = titleRef.current?.value || "";
    const X_Values = data.map((point) => point.x);
    const Y_Values = data.map((point) => point.y);

    try {
      const res = await fetch("http://localhost:3001/graph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, X_Values, Y_Values }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        setError(errJson.error || "Failed to save graph");
        return;
      }
      alert("Graph saved successfully!");
      await fetchAllGraphs();
    } catch (err: any) {
      setError(err.error || "Something went wrong");
    }
  };

  return (
    <div className="p-20 w-full h-full">
      <LineChart width={700} height={500} data={data}>
        <Line dataKey={"y"} />
        <XAxis dataKey={"x"} />
        <YAxis />
      </LineChart>
      {error && <p className="text-red-700">{error}</p>}
      <form onSubmit={handleAddGraph} className=" flex gap-5 ">
        <input
          ref={titleRef}
          type="text"
          placeholder="Enter graph title"
          className="border bg-gray-100 rounded-md p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-400 rounded-md px-2 cursor-pointer"
        >
          Save Graph
        </button>
      </form>
      <div className="mt-10 w-full flex flex-col gap-5">
        <h1 className="text-2xl font-bold">All Saved Graphs</h1>
        <table>
          <thead>
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">X Values</th>
              <th className="p-2 border">Y Values</th>
              <th className="p-2 border">--</th>
            </tr>
          </thead>
          <tbody>
            {allGraphs.map((graph, index) => {
              return (
                <tr key={index}>
                  <td className="p-2 border text-center">{graph.title}</td>
                  <td className="p-2 border text-center">
                    {graph.X_Values.toString()}
                  </td>
                  <td className="p-2 border text-center">
                    {graph.Y_Values.toString()}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => {
                        const points = graph.X_Values.map((x, i) => ({
                          x,
                          y: graph.Y_Values[i],
                        }));
                        setData(points);
                      }}
                      className="bg-blue-300 px-2 rounded-md cursor-pointer"
                    >
                      display
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
