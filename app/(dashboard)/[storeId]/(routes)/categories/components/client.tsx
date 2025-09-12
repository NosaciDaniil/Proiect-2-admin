"use client";

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
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
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button onClick={() => router.push(`/${storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading
                title="API"
                description="API calls for Categories"
            />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}