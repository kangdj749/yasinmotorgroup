import { NextResponse } from "next/server";

export async function GET() {
  const sitemapUrl =
    "https://yasinmotorgroup.com/sitemap.xml";

  try {
    await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(
        sitemapUrl
      )}`
    );

    return NextResponse.json({
      success: true,
      message: "Sitemap pinged successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to ping sitemap",
      },
      { status: 500 }
    );
  }
}
