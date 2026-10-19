import { NextResponse } from "next/server";
import { INITIAL_BOOKS } from "@/data/books";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const genre = searchParams.get("genre") || "Barcha kitoblar";
    const sort = searchParams.get("sort") || "default";

    let filtered = [...INITIAL_BOOKS];

    if (query) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.genre.toLowerCase().includes(query)
      );
    }

    if (genre && genre !== "Barcha kitoblar") {
      filtered = filtered.filter((b) => {
        if (genre === "Romanlar") return b.genre === "Roman" || b.genre === "Falsafiy roman";
        return b.genre.toLowerCase() === genre.toLowerCase();
      });
    }

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
