import { useState } from "react";

import { Navbar } from "@/components/navigation/navbar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Link as LinkIcon,
  Shield,
  AlertTriangle,
  Check,
} from "lucide-react";

export const ManageYourDataPage = () => {
  const [dataRequestStatus, setDataRequestStatus] = useState<
    "idle" | "pending" | "completed"
  >("idle");
  const [integrations, setIntegrations] = useState({
    google: true,
    facebook: false,
    twitter: true,
  });

  const handleDataRequest = () => {
    setDataRequestStatus("pending");
    setTimeout(() => setDataRequestStatus("completed"), 3000);
  };

  const handleIntegrationToggle = (integration: string) => {
    // @ts-expect-error any
    setIntegrations((prev) => ({ ...prev, [integration]: !prev[integration] }));
  };

  return (
    <div>
      <Navbar />
      <main className="p-10">
        <div>
          <h1 className="text-2xl font-bold">Manage your data</h1>
          <hr className="mt-5" />
        </div>
        <div className="mt-5">
          <div className="px-4 py-6 sm:px-0">
            <Tabs defaultValue="data-request" className="space-y-4">
              <TabsList>
                <TabsTrigger value="data-request">Data Request</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Notice</TabsTrigger>
              </TabsList>

              <TabsContent value="data-request">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Your Data</CardTitle>
                    <CardDescription>
                      Download a copy of your personal data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      You can request a copy of all the personal data we have
                      stored about you. This process may take up to 48 hours to
                      complete.
                    </p>
                    {dataRequestStatus === "idle" && (
                      <Button onClick={handleDataRequest}>
                        <Download className="mr-2 h-4 w-4" /> Request Data
                        Download
                      </Button>
                    )}
                    {dataRequestStatus === "pending" && (
                      <Alert>
                        <AlertTitle>Processing Your Request</AlertTitle>
                        <AlertDescription>
                          We're preparing your data. This may take some time.
                          We'll notify you when it's ready.
                        </AlertDescription>
                      </Alert>
                    )}
                    {dataRequestStatus === "completed" && (
                      <Alert>
                        <Check className="h-4 w-4" />
                        <AlertTitle>Data Ready</AlertTitle>
                        <AlertDescription>
                          Your data is ready for download.{" "}
                          <Button variant="link" className="p-0">
                            Click here to download
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Integrations</CardTitle>
                    <CardDescription>
                      Control which third-party services can access your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(integrations).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <LinkIcon className="h-4 w-4" />
                            <span className="font-medium capitalize">
                              {key}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={value ? "default" : "secondary"}>
                              {value ? "Connected" : "Disconnected"}
                            </Badge>
                            <Switch
                              checked={value}
                              onCheckedChange={() =>
                                handleIntegrationToggle(key)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Manage which third-party services can access and use your
                      data. Turning off an integration may limit some features.
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Notice</CardTitle>
                    <CardDescription>
                      Our commitment to protecting your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertTitle>Your Privacy is Important</AlertTitle>
                        <AlertDescription>
                          We are committed to protecting your personal
                          information and your right to privacy.
                        </AlertDescription>
                      </Alert>
                      <h3 className="text-lg font-semibold">
                        What information do we collect?
                      </h3>
                      <p>
                        We collect personal information that you provide to us
                        such as name, address, contact information, passwords
                        and security data, and payment information.
                      </p>
                      <h3 className="text-lg font-semibold">
                        How do we use your information?
                      </h3>
                      <p>
                        We use personal information collected via our website
                        for a variety of business purposes described below. We
                        process your personal information for these purposes in
                        reliance on our legitimate business interests, in order
                        to enter into or perform a contract with you, with your
                        consent, and/or for compliance with our legal
                        obligations.
                      </p>
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          We never sell your personal information to third
                          parties.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Read Full Privacy Policy</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};
