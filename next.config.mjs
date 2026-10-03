/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...[
        "/menu/:path*",
        "/productos/:path*",
        "/categorias/:path*",
        "/marcas/:path*",
        "/carrito",
        "/checkout",
      ].map((source) => ({ source, destination: "/#pedido", permanent: true })),
      {
        source: "/acerca-de-nosotros",
        destination: "/#historia",
        permanent: true,
      },
      ...[
        "/login",
        "/registro",
        "/recuperar-contrasena",
        "/verificar-email",
        "/cuenta/:path*",
        "/admin/:path*",
      ].map((source) => ({ source, destination: "/", permanent: true })),
    ];
  },
};

export default nextConfig;
