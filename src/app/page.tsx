import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-green-300">
      <p className="text-2xl">hello</p>
      <p>Click &nbsp;<Link href="/documents/fhfe"><span className="text-blue-700 underline">here</span> </Link></p>
    </div>
  );
}
