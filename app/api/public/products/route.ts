import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
    try {
        // Get storeId from query parameters
        const { searchParams } = new URL(req.url);
        const storeId = searchParams.get('storeId');
        const isFeatured = searchParams.get('isFeatured');
        
        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const whereClause: any = {
            storeId: storeId,
            isArchived: false,
        };

        // Add isFeatured filter if specified
        if (isFeatured === 'true') {
            whereClause.isFeatured = true;
        }

        const products = await prismadb.product.findMany({
            where: whereClause,
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log('[PUBLIC_PRODUCTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
