export interface ProductOption {
  id: string;
  name: string;
  singular: string;
  plural: string;
  price: number;
}

export const siteConfig = {
  name: "Alicia · Comida en casa",
  product: {
    name: "Papas rellenas criollas",
    maxQuantity: 20,
    options: [
      {
        id: "tradicional",
        name: "Papa rellena tradicional",
        singular: "papa rellena tradicional",
        plural: "papas rellenas tradicionales",
        price: 15,
      },
      {
        id: "lomo-saltado",
        name: "Papa rellena de lomo saltado",
        singular: "papa rellena de lomo saltado",
        plural: "papas rellenas de lomo saltado",
        price: 17,
      },
    ] satisfies readonly ProductOption[],
    creams: ["Crema huancaína", "Crema de ocopa", "Ají"],
  },
  serviceArea: "Lince, Lima",
} as const;
