import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { name, price, categoryId, sizeId, colorId, images, isFeatured, isArchived } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                sizeId,
                colorId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        console.log(`[PRODUCTS_GET] API called for store: ${params.storeId}`);
        
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                isArchived: false,
            },
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

        console.log(`[PRODUCTS_GET] Found ${products.length} products for store ${params.storeId}`);
        return NextResponse.json(products);
    } catch (error) {
        console.log('[PRODUCTS_GET] Error:', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
