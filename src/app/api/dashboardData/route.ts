import { getTotalStaked } from "@/backend/bnbUtils/staking";
import { calcEMYCCS } from "@/backend/emnUtils/supply";
import { NextResponse } from "next/server";

// 🔹 API Route to Serve Cached Data (Revalidates Every 5 Sec)
export async function GET() {
  const res = await calcEMYCCS()
  const totalStaked = await getTotalStaked();
  return NextResponse.json({cs:res,totalStaked},{ headers: { "Cache-Control": "s-maxage=5" } });
}

