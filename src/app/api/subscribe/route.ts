import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { success: false, message: "Iltimos, haqiqiy email manzilini kiriting!" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tashakkur! Siz muvaffaqiyatli obuna bo‘ldingiz. Yangi kitoblar haqidagi xabarlar emailingizga yuboriladi (Demo).",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
