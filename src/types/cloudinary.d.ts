declare module "cloudinary" {
  export const v2: {
    config: (options: { cloud_name: string; api_key: string; api_secret: string }) => void;
    uploader: {
      upload: (
        path: string,
        options: {
          folder: string;
        }
      ) => Promise<{
        secure_url: string;
      }>;
    };
  };
}
