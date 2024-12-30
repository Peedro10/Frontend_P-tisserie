import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import './page.scss';


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
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nos Produits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((produit: any) => (
            <div
              key={produit.name}
              className="border rounded-md shadow-md p-4 text-center"
            >
              {/* Vérification pour l'image */}
              {produit.image ? (
                <img
                  src={produit.image.url}
                  alt={produit.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
              <h2 className="text-xl font-medium">{produit.name}</h2>
              <div className="text-gray-600">
                {/* Affichage de la description */}
                {produit.description.html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: produit.description.html,
                    }}
                  />
                ) : (
                  <p>{produit.description.text}</p>
                )}
              </div>
              <p className="text-lg text-gray-800 font-bold">
                Prix : {produit.price} €
              </p>
              <p className="text-sm text-gray-500">Catégorie : {produit.category}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucun produit disponible pour le moment.</p>
        )}
      </div>
    </main>
  );
}