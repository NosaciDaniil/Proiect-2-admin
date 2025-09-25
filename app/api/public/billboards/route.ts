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

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: storeId,
            },
        });

        return NextResponse.json(billboards);
    } catch (error) {
        console.log('[PUBLIC_BILLBOARDS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
