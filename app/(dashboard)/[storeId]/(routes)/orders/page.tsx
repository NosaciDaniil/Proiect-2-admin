import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { OrderClient } from "./components/client";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    try {
        const orders = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    }
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const formattedOrders: OrderColumn[] = orders.map((item) => ({
            id: item.id,
            phone: item.phone,
            address: item.address,
            products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
            totalPrice: formatter.format(
                item.orderItems.reduce((total, orderItem) => {
                    return total + Number(orderItem.product.price);
                }, 0)
            ),
            isPaid: item.isPaid,
            createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
        }));

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <OrderClient data={formattedOrders} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching orders:', error);
        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Error Loading Orders</h2>
                        <p className="text-muted-foreground mt-2">
                            There was an error loading the orders. Please check the database connection.
                        </p>
                        <p className="text-sm text-red-500 mt-2">
                            Error: {error instanceof Error ? error.message : 'Unknown error'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrdersPage;