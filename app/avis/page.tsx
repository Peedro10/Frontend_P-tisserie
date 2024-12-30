import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import "./avis.scss"; // Ajoutez un fichier SCSS pour personnaliser le style des avis

const GET_REVIEWS = gql`
  query {
    avis {
      username
      rating
      comment {
        text
        html
      }
    }
  }
`;

export default async function AvisPage() {
  let avis = [];

  try {
    const { data } = await client.query({ query: GET_REVIEWS });
    avis = data.avis;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  }

  return (
    <main className="p-6 bg-gradient-to-r from-gray-50 to-white">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Avis des Clients
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {avis.length > 0 ? (
          avis.map((avi: any) => (
            <div
              key={avi.username}
              className="border rounded-xl shadow-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Nom d'utilisateur */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {avi.username}
              </h2>

              {/* Note (Rating) */}
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-400 ${
                      index < avi.rating ? "fas fa-star" : "far fa-star"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Commentaire */}
              <div className="text-gray-600 mb-4">
                {avi.comment?.html ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: avi.comment.html,
                    }}
                  />
                ) : (
                  <p>{avi.comment?.text}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Aucun avis disponible pour le moment.
          </p>
        )}
      </div>
    </main>
  );
}
