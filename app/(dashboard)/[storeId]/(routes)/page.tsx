import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCardIcon, DollarSignIcon, PackageIcon } from "lucide-react";
import { OverviewChart } from "@/components/overview-chart";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
    params: Promise<{ storeId: string }>
};


const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const { storeId } = await params;
    const totalRevenue = await getTotalRevenue(storeId);
    const salesCount = await getSalesCount(storeId);
    const stockCount = await getStockCount(storeId);
    const graphRevenue = await getGraphRevenue(storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview of your store" />
                <Separator />
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
                        <PackageIcon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                         <CardContent>
                             <div className="text-2xl font-bold">
                                 {stockCount}
                             </div>
                         </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 grid-cols-1">
                    <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OverviewChart data={graphRevenue} />
                    </CardContent>
                    </Card>
                </div>
        </div>
        </div>
    );
};

export default DashboardPage;