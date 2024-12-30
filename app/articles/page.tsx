import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import "./articles.scss"
const GET_ARTICLES = gql`
  query {
    articles {
      title
      image {
        url
      }
      description {
        text
        html
      }
      publishedDate
    }
  }
`;

export default async function ArticlesPage() {
  let articles = [];

  try {
    const { data } = await client.query({ query: GET_ARTICLES });
    articles = data.articles;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
  }

  return (
    <main className="p-6 bg-gradient-to-r from-gray-50 to-white">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Nos Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article: any) => (
            <div
              key={article.title}
              className="border rounded-xl shadow-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Vérifiez si l'image est un tableau */}
              {article.image && article.image[0]?.url ? (
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={article.image[0].url} // Accéder au premier élément du tableau
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform transform hover:scale-110"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
              {/* Titre de l'article */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              {/* Description */}
              <div className="text-gray-600 mb-4">
                {article.description?.html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: article.description.html,
                    }}
                  />
                ) : (
                  <p>{article.description?.text}</p>
                )}
              </div>
              {/* Date de publication */}
              <p className="text-sm text-gray-500">
                Publié le :{" "}
                {new Date(article.publishedDate).toLocaleDateString("fr-FR")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Aucun article disponible pour le moment.
          </p>
        )}
      </div>
    </main>
  );
}
