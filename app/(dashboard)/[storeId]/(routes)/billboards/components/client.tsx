"use client";

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";

interface BillboardClientProps {
    data: Billboard[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
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
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((billboard) => (
                    <div key={billboard.id} className="border rounded-lg p-4">
                        <div className="aspect-video relative mb-4">
                            <img 
                                src={billboard.imageUrl} 
                                alt={billboard.label}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <h3 className="font-medium">{billboard.label}</h3>
                        <div className="flex gap-2 mt-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push(`/${storeId}/billboards/${billboard.id}`)}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}