
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LicenseFeaturesProps {
  features: string[];
  restrictions: string[];
}

export const LicenseFeatures = ({ features, restrictions }: LicenseFeaturesProps) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Features & Restrictions</CardTitle>
        <CardDescription>Included features and usage restrictions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-2">Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">Restrictions</h3>
            <ul className="space-y-2">
              {restrictions.map((restriction, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  {restriction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
