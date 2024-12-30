import { gql } from "@apollo/client";
import client from "../lib/apolloClient";

const GET_PRODUCTS = gql`
  query {
    produits {
      name
      description {
        text
        html
      }
      price
      image {
        url
      }
      category
    }
  }
`;

export default async function HomePage() {
  let products = [];

  try {
    const { data } = await client.query({ query: GET_PRODUCTS });
    products = data.produits;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
  }

  return (
    <main className="p-6 bg-gradient-to-r from-indigo-50 to-white">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
      Welcome to my store
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((produit: any) => (
            <div
              key={produit.name}
              className="border rounded-xl shadow-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Image avec effet de transition */}
              {produit.image?.url ? (
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={produit.image.url}
                    alt={produit.name}
                    className="w-full h-48 object-cover transition-transform transform hover:scale-110"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
              {/* Nom du produit */}
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                {produit.name}
              </h2>
              {/* Description */}
              <div className="text-gray-600 mb-4">
                {produit.description?.html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: produit.description.html,
                    }}
                  />
                ) : (
                  <p>{produit.description?.text}</p>
                )}
              </div>
              {/* Prix et catégorie */}
              <p className="text-xl font-bold text-gray-800 mb-2">
                Prix : {produit.price} €
              </p>
              <p className="text-sm text-indigo-500 uppercase">
                Catégorie : {produit.category}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Aucun produit disponible pour le moment.
          </p>
        )}
      </div>
    </main>
  );
}
