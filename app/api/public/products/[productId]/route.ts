import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const { productId } = params;
        const { searchParams } = new URL(req.url);
        const storeId = searchParams.get('storeId');

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const product = await prismadb.product.findFirst({
            where: {
                id: productId,
                storeId: storeId,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
        });

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PUBLIC_PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
