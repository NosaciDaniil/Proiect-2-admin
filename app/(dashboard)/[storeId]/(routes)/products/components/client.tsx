"use client";

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const storeId = Array.isArray((params as any)?.storeId)
        ? (params as any).storeId[0]
        : (params as any)?.storeId as string;

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button onClick={() => router.push(`/${storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading
                title="API"
                description="API calls for products"
            />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}