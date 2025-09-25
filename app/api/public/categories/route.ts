import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
    try {
        // Get storeId from query parameters
        const { searchParams } = new URL(req.url);
        const storeId = searchParams.get('storeId');
        
        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        console.log('🔍 Public API: Fetching categories for storeId:', storeId);

        const categories = await prismadb.category.findMany({
            where: {
                storeId: storeId,
            },
            include: {
                billboard: true,
            },
        });

        console.log('🔍 Public API: Found categories:', categories.length);
        return NextResponse.json(categories);
    } catch (error) {
        console.log('[PUBLIC_CATEGORIES_GET] Error:', error);
        // Return empty array instead of error for now
        return NextResponse.json([]);
    }
}
