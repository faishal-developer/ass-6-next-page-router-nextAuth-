// interfaces/Product.ts

export interface IProduct {
  id: string;
  ProductName: string;
  Category: number; // You might want to create an enum for categories
  Status: "In Stock" | "Out of Stock";
  Price: string;
  Description: string;
  KeyFeatures: {
    Brand?: string;
    Model?: string;
    Specification?: string;
    ClockSpeed?: string;
    Socket?: string;
    ScreenSize?: string;
    Resolution?: string;
    PanelType?: string;
    RefreshRate?: string;
    ResponseTime?: string;
    Ports?: string;
    Capacity?: string;
    Interface?: string;
    FormFactor?: string;
    ReadSpeed?: string;
    WriteSpeed?: string;
    Wattage?: string;
    Efficiency?: string;
    Modularity?: string;
    Connectors?: string;
    Fan?: string;
  };
  Rating: number;
  Image: string;
  Reviews: string[];
}

export interface ICategory {
  id: number;
  name: string;
}

export type Repo = {
  products: IProduct[];
};

export type IProductDetailsProps = {
  product: IProduct;
};

export interface IHomeProps {
  products: { status: boolean; data: IProduct[] };
  categories: { status: boolean; data: ICategory[] };
}
// export interface IPcBuilderProps {
//   products: { status: boolean; data: IProduct[] };
//   category:
// }
export interface ICategoriesProps {
  products: { status: boolean; data: IProduct[] };
  category: { status: boolean; data: ICategory };
}

export interface IProductCardProps {
  product: IProduct;
  key: string;
  category?: { status: boolean; data: ICategory };
}

export interface IStaticPath {
  params: { productId: string };
}
// export interface IStaticPaths{

// }
