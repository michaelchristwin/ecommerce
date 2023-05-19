import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "btke354p",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-18",
  token:
    "skccUQXPQbyKXK4ft1xI0h7YPOJvk6uSEQXC0WOUtnclRFss5Gf5AvGmOpq6SJrLIaOCGZQ1eU4qLmfNx5xAQAlMnzDIUjTFNlphVawmzaMoSdERnWURrRD8nFRwIvsSlRvL2oSMmQqgzRBPETnoY0f4emyWt52n5TsuQuSyw6arpeV7mkVP",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
