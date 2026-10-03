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
        name: "Papa rellena + ensalada especial",
        singular: "papa rellena + ensalada especial",
        plural: "papas rellenas + ensalada especial",
        price: 7,
      },
      {
        id: "lomo-saltado",
        name: "Papa rellena + ensalada especial + arroz chaufa",
        singular: "papa rellena + ensalada especial + arroz chaufa",
        plural: "papas rellenas + ensalada especial + arroz chaufa",
        price: 12,
      },
      {
        id: "aji-de-gallina",
        name: "Papa rellena de ají de gallina",
        singular: "papa rellena de ají de gallina",
        plural: "papas rellenas de ají de gallina",
        price: 16,
      },
    ] satisfies readonly ProductOption[],
    creams: ["Crema huancaína", "Crema de ocopa", "Ají"],
  },
  serviceArea: "Lince, Lima",
} as const;
