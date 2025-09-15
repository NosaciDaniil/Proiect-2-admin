import prismadb from "@/lib/prismadb";
import { ProductForm } from "../[productId]/components/product-form";

const NewProductPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                    initialData={null}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </div>
    );
}

export default NewProductPage;
