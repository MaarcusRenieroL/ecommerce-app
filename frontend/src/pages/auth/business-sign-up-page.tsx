import { CreateBusinessForm } from "@/components/forms/create-business-form";

export const BusinessSignUpPage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="w-full h-full">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-3/4 gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create a business</h1>
            </div>
            <div className="grid gap-4">
              <CreateBusinessForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
