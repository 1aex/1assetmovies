
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const FormHeader = () => {
  return (
    <>
      <div className="text-center mb-10">
        <h1 className="mb-3">Register Your IP</h1>
        <p className="text-xl text-muted-foreground">
          Protect your creative works by registering them on Story Protocol
        </p>
      </div>

      <CardHeader>
        <CardTitle>IP Registration Form</CardTitle>
        <CardDescription>
          Fill in the details below to register your intellectual property
        </CardDescription>
      </CardHeader>
    </>
  );
};
